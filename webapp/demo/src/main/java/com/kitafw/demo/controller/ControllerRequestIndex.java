package com.kitafw.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * index.html コントローラクラス
 * 
 * inex.htmlからログイン画面を表示するコントローラクラス
 * 
 */
@Controller
public class ControllerRequestIndex {
    @GetMapping("/")
    public String index() {
        return "index"; // index.htmlを返す
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // login.htmlを返す
    }
}
    