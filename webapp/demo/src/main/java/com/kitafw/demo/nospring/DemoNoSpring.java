package com.kitafw.demo.nospring;

import java.io.InputStream;
import java.util.Properties;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.kitafw.demo.controller.core.mapper.ActionCoreMapper;
import com.kitafw.demo.controller.core.mapper.parameter.SelectActionResult;

import java.util.List;

import lombok.RequiredArgsConstructor;

/**
 * Demo application that does NOT use Spring.
 *
 * Notes:
 * - Uses Lombok's @RequiredArgsConstructor(onConstructor = @__(@Inject)) to generate a constructor
 *   annotated with our custom `@Inject`. The `Injector` will detect that constructor and
 *   resolve its parameters automatically.
 * - The mapper field is final and injected via constructor injection (preferred).
 * - This class is a lightweight example; in real applications consider robust lifecycle,
 *   error handling and transaction management.
 */
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class DemoNoSpring {

    private final ActionCoreMapper mapper;

    public void runDemo() {
        System.out.println("Mapper implementation class: " + (mapper == null ? "null" : mapper.getClass().getName()));
        if (mapper == null) {
            System.out.println("Mapper was not injected.");
            return;
        }

        try {
            List<SelectActionResult> rows = mapper.SelectActionResult("dummy", "dummy");
            System.out.println("Query returned " + (rows == null ? 0 : rows.size()) + " rows.");
        } catch (Throwable t) {
            System.out.println("Calling mapper failed (likely DB not available): " + t.getMessage());
        }
    }

    public static void main(String[] args) throws Exception {
        // load application.properties for DB connection info
        Properties props = new Properties();
        try (InputStream is = Resources.getResourceAsStream("application.properties")) {
            if (is != null) props.load(is);
        }

        // build SqlSessionFactory from mybatis-config.xml using the properties
        try (InputStream mybatisConfig = Resources.getResourceAsStream("mybatis-config.xml")) {
            if (mybatisConfig == null) {
                throw new IllegalStateException("mybatis-config.xml not found on classpath");
            }
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(mybatisConfig, props);

            Injector injector = new Injector(sqlSessionFactory);
            DemoNoSpring app = injector.create(DemoNoSpring.class);
            app.runDemo();
        }
    }
}
