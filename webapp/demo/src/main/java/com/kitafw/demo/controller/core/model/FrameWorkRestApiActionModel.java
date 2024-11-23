package com.kitafw.demo.controller.core.model;

import org.springframework.beans.factory.annotation.Value;

import lombok.Data;

/**
 * RESTApiで使用する定数
 */
@Data
public class FrameWorkRestApiActionModel {
    
    // 操作種別: "search"
    public String APITYPE_SEARCH = "search";
    
    // 操作種別: "create"
    public String APITYPE_CREATE = "create";
        
    // 操作種別: "update"
    public String APITYPE_UPDATE = "update";
        
    // 操作種別: "delete"
    public String APITYPE_DELETE = "delete";

    // 検索条件
    private String searchCriteria;

    // 追加・更新するデータ
    private String data;
        
    // 削除する対象のID
    private String id;

    // URL（開発時のみ使用）
    @Value("${client.url}")
    public String userurl;
}
