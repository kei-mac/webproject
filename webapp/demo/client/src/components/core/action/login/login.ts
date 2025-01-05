// ******************************************************************************************************** //
//      イベント処理
// ******************************************************************************************************** //

// ログインボタンのクリックイベント
const loginButton = document.getElementById('loginButton') as HTMLButtonElement | null;
if (loginButton) {
    loginButton.addEventListener('click', handleLoginq);
}

// 新規登録ボタンのクリックイベント
const registerButton = document.getElementById('registerButton') as HTMLButtonElement | null;
if (registerButton) {
    registerButton.addEventListener('click', handleLoginq);
}

// ******************************************************************************************************** //

// ログイン処理関数
function handleLoginq(): void {
    // ログインボタンがクリックされた時の処理
    console.log("ログインボタンがクリックされました");
    
    
}

// 新規登録処理関数
function handleRegisterq(): void {
    // 新規登録ボタンがクリックされた時の処理
    console.log("新規登録ボタンがクリックされました");
    // 他の処理をここに追加
}

