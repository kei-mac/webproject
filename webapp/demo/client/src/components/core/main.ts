// ログインフォームを動的に作成する関数
function createMainPage(): void {
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

    // 新規登録ボタン
    const registerButton = document.createElement('button');
    registerButton.type = 'button';
    registerButton.id = 'registerButton';
    registerButton.name = 'action';
    registerButton.classList.add('register-button');
    registerButton.textContent = '新規登録';
    form.appendChild(registerButton);
}


function loadMainCSS(filename: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = filename;

    link.onerror = () => {
        console.error(`Failed to load CSS file: ${filename}`);
    };

    document.head.appendChild(link);
}

