package com.kitafw.demo.nospring;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;

/**
 * Marker annotation used by the simple Injector in this project.
 *
 * Usage:
 * - Put on fields to request field injection: `@Inject private Foo foo;`
 * - Works on constructors so Lombok can place the annotation on generated constructors
 *   (e.g. `@RequiredArgsConstructor(onConstructor = @__(@Inject))`).
 * - Also allowed on parameters for completeness.
 *
 * The annotation is retained at runtime so the custom Injector can read it via reflection.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.CONSTRUCTOR, ElementType.PARAMETER})
public @interface Inject {
}
