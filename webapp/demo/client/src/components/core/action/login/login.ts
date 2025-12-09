// ******************************************************************************************************** //
//      イベント処理
// ******************************************************************************************************** //

import { postJson, ApiResponse } from '../../common/request';

// ログインボタンのクリックイベント
const loginButton = document.getElementById('loginButton') as HTMLButtonElement | null;
if (loginButton) {
    loginButton.addEventListener('click', handleLoginq);
}

// 新規登録ボタンのクリックイベント
const registerButton = document.getElementById('registerButton') as HTMLButtonElement | null;
if (registerButton) {
    registerButton.addEventListener('click', handleRegisterq);
}

// ******************************************************************************************************** //

// ログイン処理関数
// login 関数をエクスポートして他からも呼べるようにする
export async function login(username: string, password: string): Promise<ApiResponse> {
    if (!username || !password) {
        return { ok: false, message: 'ユーザ名とパスワードを入力してください' };
    }

    // ここで共通の postJson を使ってサーバへ送信
    const res = await postJson('/api/login', { username, password });
    return res;
}

function handleLoginq(): void {
    // ログインボタンがクリックされた時の処理
    console.log('ログインボタンがクリックされました');

    const usernameInput = document.getElementById('username') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const btn = document.getElementById('loginButton') as HTMLButtonElement | null;
    if (!usernameInput || !passwordInput || !btn) {
        console.error('login: required DOM elements not found');
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    btn.disabled = true;
    login(username, password).then((result) => {
        if (result.ok) {
            // サーバ側がデータオブジェクトを返す場合は result.data を確認しても良い
            window.location.href = '/templates/menu.html';
        } else {
            alert(result.message || 'ログインに失敗しました');
        }
    }).catch((err) => {
        console.error('login error', err);
        alert('ログイン処理でエラーが発生しました');
    }).finally(() => {
        btn.disabled = false;
    });
}

// 新規登録処理関数
function handleRegisterq(): void {
    // 新規登録ボタンがクリックされた時の処理
    console.log("新規登録ボタンがクリックされました");
    // 他の処理をここに追加
}

