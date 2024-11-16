"use strict";
// ******************************************************************************************************** //
//      イベント処理
// ******************************************************************************************************** //
// ログインボタンのクリックイベント
const loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', handleLogin);
}
// 新規登録ボタンのクリックイベント
const registerButton = document.getElementById('registerButton');
if (registerButton) {
    registerButton.addEventListener('click', handleRegister);
}
// ******************************************************************************************************** //
// ログイン処理関数
function handleLoginq() {
    // ログインボタンがクリックされた時の処理
    console.log("ログインボタンがクリックされました");
    // 他の処理をここに追加
}
// 新規登録処理関数
function handleRegisterq() {
    // 新規登録ボタンがクリックされた時の処理
    console.log("新規登録ボタンがクリックされました");
    // 他の処理をここに追加
}
//# sourceMappingURL=login.js.map