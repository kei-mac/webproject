package com.kitafw.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * index.html コントローラクラス
 * 
 */
@Controller
public class ControllerRequestIndex {
    @GetMapping
    public String index() {
        return "index";
    }
}
