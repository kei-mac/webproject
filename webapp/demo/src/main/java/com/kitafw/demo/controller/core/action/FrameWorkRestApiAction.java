package com.kitafw.demo.controller.core.action;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * クラス名 ：RESTApiクラス
 * 処理内容 ：RESTAPIの定義クラス
 * 作成者   ：来田 圭汰朗
 * 日付     ：2024年11月16日（土）
 *  
 */
@RestController
@RequestMapping("/api")
public class FrameWorkRestApiAction {

    @Value("${myapp.cors.allowed-origins}")
    private String allowedOrigins;

    /**
     * 検索処理の場合
     * 
     * 検索処理のリクエスト処理を受信した場合の処理
     * 
     * @param operationRequest 操作内容を含むリクエストボディ
     * @return 処理結果
     */
    @PostMapping("/search")
    public String requestApiSerch(@RequestBody Map<String, Object> operationRequest) {
        // データ名、アクション名を取得
        return "OK";
    }

    /**
     * 追加処理の場合
     * 
     * 追加処理のリクエスト処理を受信した場合の処理
     * 
     * @param operationRequest 操作内容を含むリクエストボディ
     * @return 処理結果
     */
    @PostMapping("/add")
    public String requestApiadd(@RequestBody Map<String, Object> operationRequest) {

        return "OK";
    }

    /**
     * 更新処理の場合
     * 
     * 更新処理のリクエスト処理を受信した場合の処理
     * 
     * @param operationRequest 操作内容を含むリクエストボディ
     * @return 処理結果
     */
    @PostMapping("/update")
    public String requestApiUpdate(@RequestBody Map<String, Object> operationRequest) {

        return "OK";
    }

    /**
     * 削除処理の場合
     * 
     * 削除処理のリクエスト処理を受信した場合の処理
     * 
     * @param operationRequest 操作内容を含むリクエストボディ
     * @return 処理結果
     */
    @PostMapping("/delete")
    public String requestApiDelete(@RequestBody Map<String, Object> operationRequest) {

        return "OK";
    }

    /**
     * クラス実行処理
     * 
     * アクション明細に定義されているクラスとメソッドを実行する処理
     */
    public void runClassMethod(){
        // データ名とアクション名を取得

        // 表示順序でクラス名とメソッド名を取得

        // 削除状態がＯＮであるかをチェックする。

        // 削除状態がＯＮの場合次の処理を継続する。

        // クラスのメソッドを実行する。

    }
}
