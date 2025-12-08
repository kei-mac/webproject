package com.kitafw.demo.controller.core.service.action;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.kitafw.demo.controller.core.constant.CommonSystemEnum;
import com.kitafw.demo.controller.core.mapper.ActionCoreMapper;
import com.kitafw.demo.controller.core.mapper.parameter.SelectActionResult;
import com.kitafw.demo.controller.core.service.common.ActionCommon;

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
public class ActionRun extends ActionAbstract<Long, Void> {

    private final ActionCommon common;
    private final ActionCoreMapper mapper;

    // リクエスト情報格納
    public Map<String, Object> getParam;

    // レスポンス生成
    public Map<String, Object> response;

    // 戻り値
    public Object returnValue;
    public String messageId;

    @Autowired
    private PlatformTransactionManager transactionManager;

    /**
     * アクション明細実行
     * アクション明細情報を取得し、アクションを実行します。
     * 
     * @param operationRequest  :リクエスト情報
     * @return
     */
    public String runAction(final Map<String, Object> operationRequest) {
        getParam = operationRequest;
        final String dataName = this.common.getInputValue(operationRequest, "data");
        final String actionName = this.common.getInputValue(operationRequest, "action");

        // トランザクション開始
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);

        try {
            // アクション実行明細取得
            List<SelectActionResult> actionDetailLists = this.mapper.SelectActionResult(dataName, actionName);
            for (SelectActionResult actionDetailList : actionDetailLists) {
                this.runActionMethod(actionDetailList.getS1ClassName(), actionDetailList.getS2MethodName(),
                        actionDetailList.getS3ActionDetailName());
            }

            transactionManager.commit(status);
            return CommonSystemEnum.FUNCTION_OK.getKey();
        } catch (Exception ex) {
            log.error("アクションを実行できませんでした。データ名：{}, アクション名：{} {}", dataName, actionName, ex.getMessage());
            transactionManager.rollback(status);
            return CommonSystemEnum.FUNCTION_NG.getKey();
        }
    }

    /**
     * アクション実行
     * データ名、アクション名、アクション詳細名から実行アクションを特定し
     * 対象のクラスとメソッドを実行します。
     * 
     * @param className  :クラス名
     * @param methodName :メソッド名
     */
    private void runActionMethod(final String className, final String methodName, final String actionDetailName)
            throws Exception {

        // 削除状態フラグ取得
        final String dataName = String.valueOf(this.getParam.get("data"));
        final String actionName = String.valueOf(this.getParam.get("action"));
        final boolean deleteFlag = this.getDeleteRun(dataName, actionName, actionDetailName);

        if (deleteFlag) {
            log.info("アクション明細{}は、削除フラグONのため、実行しませんでした。", actionDetailName);
        } else {
            Class<?> clazz = Class.forName(className);
            Object obj = clazz.getDeclaredConstructor().newInstance();
            Method method = clazz.getMethod(methodName);
            method.invoke(obj);
        }
    }

    /**
     * 削除状態取得
     * データ名、アクション名、アクション詳細名から削除状態を取得します。
     * 
     * @param dataName         :データ名
     * @param actionName       :アクション名
     * @param actionDetailName :アクション詳細名
     * @return (削除状態結果 true:削除状態ON, false:削除状態OFF)
     */
    private boolean getDeleteRun(final String dataName, final String actionName, final String actionDetailName) {

        // データ名とアクションから削除状態を取得

        // 削除状態ＯＮの場合
        return true;

        // 削除状態ＯＦＦの場合
        // return false;
    }
}
