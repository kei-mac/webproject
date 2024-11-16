"use strict";
// ******************************************************************************************************** //
//      処理名  ：ボタンアクション取得処理
//      説明    ：ボタンのアクションを動的に取得する処理
// ******************************************************************************************************** //
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 全てのボタン要素を取得
const buttons = document.querySelectorAll("button");
// 各ボタンにイベントリスナーを追加
buttons.forEach((button) => {
    button.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        // data-api-type 属性を取得
        const apiType = target.dataset.apiType;
        if (!apiType) {
            console.error("APIタイプが指定されていません");
            return;
        }
        // REST APIの種類を判定
        switch (apiType) {
            case "login":
                yield handleLogin();
                break;
            case "register":
                yield handleRegister();
                break;
            case "search":
                yield handleSearch();
                break;
            default:
                console.error(`未定義のAPIタイプ: ${apiType}`);
        }
    }));
});
// 各処理の実装
function handleLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("ログインAPIを実行します");
        // REST API呼び出しの例
        const response = yield fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username: "test", password: "password" }),
            headers: { "Content-Type": "application/json" },
        });
        const result = yield response.json();
        console.log("ログイン結果:", result);
    });
}
function handleRegister() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("新規登録APIを実行します");
        const response = yield fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ username: "newUser", email: "email@example.com" }),
            headers: { "Content-Type": "application/json" },
        });
        const result = yield response.json();
        console.log("登録結果:", result);
    });
}
function handleSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("検索APIを実行します");
        const response = yield fetch("/api/search", {
            method: "GET",
        });
        const result = yield response.json();
        console.log("検索結果:", result);
    });
}
//# sourceMappingURL=getButtonAction.js.map