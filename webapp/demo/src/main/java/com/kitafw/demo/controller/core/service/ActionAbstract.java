package com.kitafw.demo.controller.core.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.kitafw.demo.controller.core.constant.CommonSystemEnum;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

/**
 * 検索処理実行 クラス
 * 検索処理として受け取った処理を実行します。
 * 
 */
@Service
@RequiredArgsConstructor
@Log4j2
public class ActionAbstract {

    private final ActionCommon common;
    public Map<String, Object> getParam;

    /**
     * アクション明細実行
     * 
     * @param operationRequest
     * @return
     */
    public String runAction(final Map<String, Object> operationRequest) {

        getParam = operationRequest;
        String dataName = this.common.getInputValue(operationRequest, "data");
        String actionName = this.common.getInputValue(operationRequest, "action");

        try {

            // アクション明細を検索
            
            // アクション明細を実行

            return String.valueOf(CommonSystemEnum.FUNCTION_OK);
        } catch (Exception ex) {
            log.error("アクションを実行できませんでした。データ名：{}, アクション名：", dataName, actionName);
            return String.valueOf(CommonSystemEnum.FUNCTION_NG);
        }
    }
}
