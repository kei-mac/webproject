/**
 * ログイン画面作成処理
 */
import '../../styles/style.scss';

function main(): void {
    const container = document.getElementById('container') as HTMLDivElement;

    // 全体のコンテナを作成
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');
    container.appendChild(mainContainer);

    // ログインボックス
    const loginBox = document.createElement('div');
    loginBox.classList.add('login-box');
    mainContainer.appendChild(loginBox);

    // ロゴ画像
    const logo = document.createElement('img');
    logo.src = '../static/js/templates/logo/logo.png';
    logo.alt = 'ロゴ';
    logo.classList.add('logo');
    loginBox.appendChild(logo);

    // タイトル
    const title = document.createElement('h2');
    title.textContent = '業務系システム';
    loginBox.appendChild(title);

    // フォーム
    const form = document.createElement('form');
    form.id = 'login';
    form.name = 'data';
    loginBox.appendChild(form);

    // ユーザー名の入力フィールド
    const usernameGroup = document.createElement('div');
    usernameGroup.classList.add('input-group');
    form.appendChild(usernameGroup);

    const usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.textContent = 'ユーザ名';
    usernameGroup.appendChild(usernameLabel);

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.placeholder = 'ユーザ名を入力してください';
    usernameInput.required = true;
    usernameGroup.appendChild(usernameInput);

    // パスワードの入力フィールド
    const passwordGroup = document.createElement('div');
    passwordGroup.classList.add('input-group');
    form.appendChild(passwordGroup);

    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.textContent = 'パスワード';
    passwordGroup.appendChild(passwordLabel);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'パスワードを入力してください';
    passwordInput.required = true;
    passwordGroup.appendChild(passwordInput);

    // ログインボタン
    const loginButton = document.createElement('button');
    loginButton.type = 'button';
    loginButton.id = 'loginButton';
    loginButton.name = 'action';
    loginButton.classList.add('login-button');
    loginButton.textContent = 'ログイン';
    form.appendChild(loginButton);

    // // 新規登録ボタン
    // const registerButton = document.createElement('button');
    // registerButton.type = 'button';
    // registerButton.id = 'registerButton';
    // registerButton.name = 'action';
    // registerButton.classList.add('register-button');
    // registerButton.textContent = '新規登録';
    // form.appendChild(registerButton);

    // ログインボタン押下時の処理（サーバに送信して結果がOKならメニューへ遷移）
    loginButton.addEventListener('click', async () => {
        const username = (usernameInput as HTMLInputElement).value.trim();
        const password = (passwordInput as HTMLInputElement).value;

        if (!username || !password) {
            alert('ユーザ名とパスワードを入力してください');
            return;
        }

        loginButton.disabled = true;
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                // HTTP レベルのエラー
                const text = await res.text();
                console.error('login failed', res.status, text);
                alert('ログインに失敗しました（通信エラー）');
                return;
            }

            const data = await res.json();
            // 想定レスポンス例: { ok: true } または { ok: false, message: '...' }
            if (data && data.ok) {
                // 成功時はメニュー画面へ遷移（パスは環境に合わせて調整してください）
                window.location.href = '/templates/menu.html';
            } else {
                alert(data && data.message ? data.message : 'ユーザ名またはパスワードが正しくありません');
            }
        } catch (err) {
            console.error('login error', err);
            alert('ログイン処理でエラーが発生しました');
        } finally {
            loginButton.disabled = false;
        }
    });
}

// ページ読み込み後にフォームを作成
window.addEventListener('load', () => {
    console.log(__dirname);
    main();
});

