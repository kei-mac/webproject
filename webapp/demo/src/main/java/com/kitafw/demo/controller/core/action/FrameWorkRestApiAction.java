package com.kitafw.demo.controller.core.action;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kitafw.demo.controller.core.model.FrameWorkRestApiActionModel;


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
    
    // application.properties からエンドポイント名を取得
    @Value("${api.endpoint.name}")
    private String endpointName;

    /**
     * 操作種別に応じて処理を分岐する共通のAPIエンドポイント
     * 
     * @param operationRequest 操作内容を含むリクエストボディ
     * @return 処理結果
     */
    @PostMapping("${api.endpoint.name}")
    public String handleOperation(@RequestBody FrameWorkRestApiActionModel operationRequest) {
        switch (operationRequest.getType()) {
            case "search":
                return search(operationRequest.getSearchCriteria());
            case "create":
                return create(operationRequest.getId());
            case "update":
                return update(operationRequest.getId());
            case "delete":
                return delete(operationRequest.getId());
            default:
                return "Invalid operation type";
        }
    }

    /**
     * 検索処理
     * @param searchCriteria 検索条件
     * @return 検索結果
     */
    private String search(String searchCriteria) {
        // 検索ロジックをここに実装
        return "Search result for: " + searchCriteria;
    }

    /**
     * 追加処理
     * @param data 追加するデータ
     * @return 追加結果
     */
    private String create(String data) {
        // 追加ロジックをここに実装
        return "Created: " + data;
    }

    /**
     * 更新処理
     * @param data 更新するデータ
     * @return 更新結果
     */
    private String update(String data) {
        // 更新ロジックをここに実装
        return "Updated: " + data;
    }

    /**
     * 削除処理
     * @param id 削除対象のID
     * @return 削除結果
     */
    private String delete(String id) {
        // 削除ロジックをここに実装
        return "Deleted: " + id;
    }
}
