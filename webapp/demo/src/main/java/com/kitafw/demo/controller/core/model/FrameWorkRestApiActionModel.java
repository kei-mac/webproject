package com.kitafw.demo.controller.core.model;

import lombok.Data;

@Data
public class FrameWorkRestApiActionModel {
    
    // 操作種別: "search", "create", "update", "delete"
    private String type;
    
    // 検索条件
    private String searchCriteria;

    // 追加・更新するデータ
    private String data;
        
    // 削除する対象のID
    private String id;
}
