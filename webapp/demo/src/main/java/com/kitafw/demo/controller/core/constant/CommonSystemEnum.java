package com.kitafw.demo.controller.core.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 共有システム定数
 */
@Getter
@RequiredArgsConstructor
public enum CommonSystemEnum {

    FUNCTION_OK("OK"),
    FUNCTION_NG("NG"),
    ;

    private final String key;
}
