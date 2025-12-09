package com.kitafw.demo.nospring;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

/**
 * Very small injector that supports field injection via @Inject.
 * - If the field type is an interface and looks like a MyBatis mapper (package check),
 *   it will obtain the mapper from a SqlSession opened from the provided SqlSessionFactory.
 * - Otherwise it will try to instantiate the field type with a no-arg constructor and inject into it recursively.
 *
 * Note: this is a demo/simple implementation. Mapper proxies open a SqlSession per method call and close it
 * to ensure strict SqlSession lifecycle management.
 */
public class Injector {

    // SqlSessionFactory used to obtain SqlSession instances for MyBatis mapper calls
    private final SqlSessionFactory sqlSessionFactory;

    // Simple singleton cache for created objects and proxies. Note: this is a tiny
    // demo cache and not a full-featured DI scope manager.
    private final Map<Class<?>, Object> singletons = new HashMap<>();

    // Note: Objenesis is used for constructor-less instantiation only if present on the classpath.
    // To keep this injector compile-time-lightweight we load & use Objenesis reflectively when needed.

    /**
     * Create an Injector bound to the provided SqlSessionFactory.
     *
     * @param sqlSessionFactory factory to create SqlSessions for MyBatis mappers
     */
    public Injector(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    @SuppressWarnings("unchecked")
    public <T> T create(Class<T> cls) {
        try {
            // reuse singletons to avoid multiple sessions for same mapper types
            if (singletons.containsKey(cls)) {
                return (T) singletons.get(cls);
            }

            // 1) Try constructor injection: prefer constructors annotated with @Inject.
            //    This supports Lombok usage like:
            //      @RequiredArgsConstructor(onConstructor = @__(@Inject))
            T instance = null;
            for (Constructor<?> ctor : cls.getDeclaredConstructors()) {
                if (ctor.isAnnotationPresent(Inject.class)) {
                    ctor.setAccessible(true);
                    Class<?>[] paramTypes = ctor.getParameterTypes();
                    Object[] params = new Object[paramTypes.length];
                    for (int i = 0; i < paramTypes.length; i++) {
                        params[i] = resolveDependency(paramTypes[i]);
                    }
                    instance = (T) ctor.newInstance(params);
                    break;
                }
            }

            // 2) Fallback: try no-arg constructor (private allowed)
            if (instance == null) {
                try {
                    Constructor<T> ctor = (Constructor<T>) cls.getDeclaredConstructor();
                    ctor.setAccessible(true);
                    instance = ctor.newInstance();
                } catch (NoSuchMethodException nsme) {
                    // 3) If annotated with @AutoConstruct, use Objenesis to instantiate
                    if (cls.isAnnotationPresent(AutoConstruct.class)) {
                        instance = createWithoutConstructor(cls);
                    } else {
                        // Provide a helpful error message for users
                        throw new RuntimeException(
                                "No suitable constructor for " + cls + ".\n" +
                                " - To use constructor injection with Lombok add: @RequiredArgsConstructor(onConstructor = @__(@Inject))\n" +
                                " - Or provide a no-arg constructor (can be private),\n" +
                                " - Or annotate the class with @AutoConstruct to force-instantiation without constructor.", nsme);
                    }
                }
            }

            // Cache, perform field injection and return
            singletons.put(cls, instance);
            injectFields(instance);
            return instance;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create instance of " + cls + ": " + e.getMessage(), e);
        }
    }

    private void injectFields(Object target) throws IllegalAccessException {
        Class<?> clazz = target.getClass();
        for (Field f : clazz.getDeclaredFields()) {
            if (f.isAnnotationPresent(Inject.class)) {
                f.setAccessible(true);
                Class<?> fieldType = f.getType();
                Object toInject = resolveDependency(fieldType);
                f.set(target, toInject);
            }
        }
    }

    private Object resolveDependency(Class<?> fieldType) {
        try {
            // If it's already created as singleton, return it
            if (singletons.containsKey(fieldType)) {
                return singletons.get(fieldType);
            }
            // Heuristic: MyBatis mapper interfaces are interfaces under the mapper package
            if (fieldType.isInterface() && fieldType.getPackage() != null && fieldType.getPackage().getName().contains("controller.core.mapper")) {
                // create a dynamic proxy that opens a session per invocation and closes it afterwards
                Object proxy = Proxy.newProxyInstance(fieldType.getClassLoader(), new Class<?>[] { fieldType }, new MapperInvocationHandler(fieldType, sqlSessionFactory));
                singletons.put(fieldType, proxy);
                return proxy;
            }

            // Otherwise instantiate concrete type and inject recursively (allow private constructors)
            Object instance;
            try {
                Constructor<?> ctor = fieldType.getDeclaredConstructor();
                ctor.setAccessible(true);
                instance = ctor.newInstance();
            } catch (NoSuchMethodException nsme) {
                if (fieldType.isAnnotationPresent(AutoConstruct.class)) {
                    instance = createWithoutConstructor(fieldType);
                } else {
                    throw new RuntimeException("No no-arg constructor for " + fieldType + ". Annotate with @AutoConstruct or provide a no-arg constructor.", nsme);
                }
            }
            singletons.put(fieldType, instance);
            injectFields(instance);
            return instance;
        } catch (Exception e) {
            throw new RuntimeException("Failed to resolve dependency for " + fieldType, e);
        }
    }

    /**
     * Try to instantiate the given class without invoking a constructor.
     * This method loads Objenesis reflectively so that the project does not
     * require Objenesis at compile time. If Objenesis is not available, this
     * throws an informative RuntimeException guiding the user to add the
     * dependency or to provide a constructor.
     */
    @SuppressWarnings({"unchecked"})
    private <T> T createWithoutConstructor(Class<T> cls) {
        try {
            // Try to load ObjenesisStd class reflectively
            Class<?> objenesisStdClass = Class.forName("org.objenesis.ObjenesisStd");
            Object objenesis = objenesisStdClass.getDeclaredConstructor().newInstance();
            Method newInstanceMethod = objenesisStdClass.getMethod("newInstance", Class.class);
            return (T) newInstanceMethod.invoke(objenesis, cls);
        } catch (ClassNotFoundException cnfe) {
            throw new RuntimeException("Objenesis is required to instantiate " + cls + " without a constructor.\n" +
                    "Add dependency 'org.objenesis:objenesis' to your build or provide a no-arg constructor or annotate with @AutoConstruct.", cnfe);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create instance of " + cls + " using Objenesis: " + e.getMessage(), e);
        }
    }

    private static class MapperInvocationHandler implements InvocationHandler {
        private final Class<?> mapperInterface;
        private final SqlSessionFactory sqlSessionFactory;

        MapperInvocationHandler(Class<?> mapperInterface, SqlSessionFactory sqlSessionFactory) {
            this.mapperInterface = mapperInterface;
            this.sqlSessionFactory = sqlSessionFactory;
        }

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            try (SqlSession session = sqlSessionFactory.openSession(true)) {
                Object mapper = session.getMapper(mapperInterface);
                try {
                    return method.invoke(mapper, args);
                } catch (InvocationTargetException ite) {
                    throw ite.getTargetException();
                }
            }
        }
    }
}
