package com.kitafw.demo.controller.core.service.common;

import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

/**
 * リクエスト処理共通クラス
 * リクエスト処理に対する共通クラスを定義します。
 * 
 */
@Service
@RequiredArgsConstructor
public class ActionCommon {
    
    /**
     * 値取得処理
     * 画面入力値を取得します。
     * 
     * @param operationRequest
     * @param paramName
     * @return
     */
    public String getInputValue(final Map<String, Object> operationRequest, final String paramName){
        return String.valueOf(operationRequest.get(paramName));
    }
}
