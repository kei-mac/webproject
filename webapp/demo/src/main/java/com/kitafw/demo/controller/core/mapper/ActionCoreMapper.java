package com.kitafw.demo.controller.core.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.kitafw.demo.controller.core.mapper.parameter.SelectActionResult;

public interface ActionCoreMapper {

    /**
     * アクション明細情報取得処理
     * データ名、アクション名からアクション明細情報を取得します。
     * 
     * @param data   :データ
     * @param action :アクション
     * @return
     */
    public List<SelectActionResult> SelectActionResult(@Param("data") String data, @Param("action") String action);
}
