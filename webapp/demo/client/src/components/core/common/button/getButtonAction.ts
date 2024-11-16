// ******************************************************************************************************** //
//      処理名  ：ボタンアクション取得処理
//      説明    ：ボタンのアクションを動的に取得する処理
// ******************************************************************************************************** //

// 全てのボタン要素を取得
const buttons = document.querySelectorAll("button");

// 各ボタンにイベントリスナーを追加
buttons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const target = event.target as HTMLButtonElement;

    // data-api-type 属性を取得
    const apiType = target.dataset.apiType;

    if (!apiType) {
      console.error("APIタイプが指定されていません");
      return;
    }

    // REST APIの種類を判定
    switch (apiType) {
      case "login":
        await handleLogin();
        break;
      case "register":
        await handleRegister();
        break;
      case "search":
        await handleSearch();
        break;
      default:
        console.error(`未定義のAPIタイプ: ${apiType}`);
    }
  });
});

// 各処理の実装
async function handleLogin() {
  console.log("ログインAPIを実行します");
  // REST API呼び出しの例
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username: "test", password: "password" }),
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log("ログイン結果:", result);
}

async function handleRegister() {
  console.log("新規登録APIを実行します");
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ username: "newUser", email: "email@example.com" }),
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log("登録結果:", result);
}

async function handleSearch() {
  console.log("検索APIを実行します");
  const response = await fetch("/api/search", {
    method: "GET",
  });
  const result = await response.json();
  console.log("検索結果:", result);
}
