"use strict";
// ******************************************************************************************************** //
//      画面入力値をすべて取得する処理
//      画面でinputで定義されているエレメントをすべてnameとidで定義しているすべて
//      画面入力値をJSON形式で取得します。
// ******************************************************************************************************** //
function getFormValuesAsJson() {
    const formElements = document.querySelectorAll('input, select, textarea');
    const formData = {};
    // 画面入力値をJSON形式で取得する処理
    formElements.forEach(element => {
        const name = element.name || element.id; // name属性がない場合はidをキーとして使用
        if (name) {
            formData[name] = element.value;
        }
    });
    return formData;
}
//# sourceMappingURL=getValueSelectAll.js.map