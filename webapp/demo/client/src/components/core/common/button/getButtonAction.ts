// ******************************************************************************************************** //
//      処理名  ：ボタンアクション取得処理
//      説明    ：ボタンのアクションを動的に取得する処理
// ******************************************************************************************************** //

import { ScreenMain } from "../../model/ScreenMain.js";

// 全てのボタン要素を取得
const buttons = document.querySelectorAll("button");

// 各ボタンにイベントリスナーを追加
buttons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const target = event.target as HTMLButtonElement;
    const apiType = target.dataset.apiType;
    const action = target.id;

    if (!apiType) {
      console.error("APIタイプが指定されていません");
      return;
    }

    // REST APIの種類を判定
    switch (apiType) {
      case "search":
        // 検索ボタンの場合
        await sendSearchRequest(apiType, action);
        break;
      case "add":
        // 追加ボタンの場合
        await sendAddRequest(apiType);
        break;
      case "update":
        // 更新ボタンの場合
        await sendUpdateRequest(apiType);
        break;
      case "delete":
        // 削除ボタンの場合
        await sendDeleteRequest(apiType);
        break;
      case "screen":
      // 画面遷移の場合

      default:
        console.error(`未定義のAPIタイプ: ${apiType}`);
    }
  });
});

/**
 * リクエスト送信処理
 * 検索処理のリクエストをサーバに送信し、レスポンス処理を受信します。
 * 
 * @param apiType 
 */
async function sendSearchRequest(apiType: string, actionName: string) {
  try {
    // リクエストURL
    const URL = "http://localhost:8080/api/" + apiType;

    // FormDataをオブジェクトに変換
    let data: Record<string, string> = getFormValuesAsJson(actionName);

    // サーバーにPOSTリクエストを送信
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // レスポンスの処理
    if (response.ok) {
      const responseData = await response.json();
      const create = new ScreenMain();
      create.createElement(responseData);
      console.log('検索結果:', responseData);
    } else {
      // const create = new ScreenMain();
      // const responseData = await response.json();
      // create.createElement(responseData);
      console.error('検索処理に失敗しました:', response.statusText);
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

/**
 * 追加処理
 * 追加処理のリクエスト処理
 * 
 * @param apiType :リクエストtype
 */
async function sendAddRequest(apiType: string) {
  try {
    // リクエストURL
    const URL = 'http://localhost:8080/api/' + apiType;

    // フォームデータを取得（フォームのinputやtextareaなどから）
    const formData = new FormData(document.querySelector('form') as HTMLFormElement);

    // FormDataをオブジェクトに変換
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // サーバーにPOSTリクエストを送信
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // レスポンスの処理
    if (response.ok) {
      const responseData = await response.json();
      console.log('検索結果:', responseData);
    } else {
      console.error('検索処理に失敗しました:', response.statusText);
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

/**
 * 更新処理
 * 更新処理のリクエスト処理
 * 
 * @param apiType :リクエストtype
 */
async function sendUpdateRequest(apiType: string) {
  try {
    // リクエストURL
    const URL = 'http://localhost:8080/api/' + apiType;

    // フォームデータを取得（フォームのinputやtextareaなどから）
    const formData = new FormData(document.querySelector('form') as HTMLFormElement);

    // FormDataをオブジェクトに変換
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // サーバーにPOSTリクエストを送信
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // レスポンスの処理
    if (response.ok) {
      const responseData = await response.json();
      console.log('検索結果:', responseData);
    } else {
      console.error('検索処理に失敗しました:', response.statusText);
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

/**
 * 削除処理
 * 削除処理のリクエスト処理
 * 
 * @param apiType :リクエストtype
 */
async function sendDeleteRequest(apiType: string) {
  try {
    // リクエストURL
    const URL = 'http://localhost:8080/api/' + apiType;

    // フォームデータを取得（フォームのinputやtextareaなどから）
    const formData = new FormData(document.querySelector('form') as HTMLFormElement);

    // FormDataをオブジェクトに変換
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // サーバーにPOSTリクエストを送信
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // レスポンスの処理
    if (response.ok) {
      const responseData = await response.json();
      console.log('検索結果:', responseData);
    } else {
      console.error('検索処理に失敗しました:', response.statusText);
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

/**
 * リクエスト値格納処理
 * リクエストで使用する値を格納します。
 * 
 * @param actionName 
 * @returns 
 */
function getFormValuesAsJson(actionName: string): Record<string, string> {
  const formElements = document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLFormElement>('input, select, textarea, form');
  const formData: Record<string, string> = {};

  // 画面入力値をJSON形式で取得する処理
  formElements.forEach(element => {
    const name = element.name;

    if (name == 'data') {
      formData[name] = element.id;
    }
    else {
      formData[name] = element.value;
    }
  });

  formData['action'] = actionName;
  return formData;
}
