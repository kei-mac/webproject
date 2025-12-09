package com.kitafw.demo.nospring;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;

/**
 * Marker annotation: when present on a class, the Injector will instantiate it
 * without invoking a constructor (using Objenesis). This allows classes with
 * private/final fields to be created without writing an explicit no-arg constructor.
 *
 * Note: Lombok can also be used (e.g. @NoArgsConstructor(force=true)) but this
 * marker provides a runtime alternative.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface AutoConstruct {
}
