// ********************************************************************************************************
//      処理名  ：ボタンアクション共有処理
//      説明    ：各画面のボタン押下時に呼び出す共通のリクエスト送信処理を提供します。
//                - 初期化関数: initButtonActions
//                - 汎用送信関数: sendAction
//                画面側で任意に上書きできるコールバックを受け取れます。
// ********************************************************************************************************

import { postJson, getJson, ApiResponse } from '../request';
import { handleApiResponse } from '../responseHandler';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type SendActionOptions = {
  url?: string; // フルURLを渡すと apiType を無視します
  method?: HttpMethod;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  showLoading?: boolean;
};

const DEFAULT_BASE = 'http://localhost:8080/api/';

function showLoading() {
  let el = document.getElementById('__global_loading_overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = '__global_loading_overlay';
    Object.assign(el.style, {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '9999'
    });
    el.innerHTML = '<div style="padding:12px 20px;background:#fff;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2)">処理中...</div>';
    document.body.appendChild(el);
  }
}

function hideLoading() {
  const el = document.getElementById('__global_loading_overlay');
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

async function sendAction(apiTypeOrUrl: string, actionName: string, options: SendActionOptions = {}) {
  const baseOrUrl = options.url ?? (DEFAULT_BASE + apiTypeOrUrl);
  const method = options.method ?? 'POST';
  const payload = options.data ?? getFormValuesAsJson(actionName);

  if (options.showLoading ?? true) showLoading();

    try {
      // request.ts のユーティリティを使う
  let res: ApiResponse<any>;
  const requestUrl = baseOrUrl;

      if (method === 'GET') {
        res = await getJson(requestUrl);
      } else {
        res = await postJson(requestUrl, payload);
      }

      const handled = handleApiResponse(res, { onSuccess: options.onSuccess, onError: options.onError });
      if (handled && (handled as any).error) return Promise.reject((handled as any).error);
      return (handled as any).data;
    } catch (error) {
      (options.onError ?? defaultErrorHandler)(error);
      return Promise.reject(error);
    } finally {
      if (options.showLoading ?? true) hideLoading();
    }
}

function defaultErrorHandler(err: any) {
  console.error('通信エラー', err);
  try {
    // 画面上でエラーメッセージを表示したい場合はここで DOM 操作
    alert('エラーが発生しました。詳細はコンソールを確認してください。');
  } catch (e) {
    // ignore
  }
}

/**
 * ページ上の input/select/textarea/form から値を取得して JSON にする
 */
function getFormValuesAsJson(actionName: string): Record<string, any> {
  const elements = document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input[name], select[name], textarea[name]');
  const data: Record<string, any> = {};
  elements.forEach(el => {
    const name = el.name;
    if (!name) return;
    if ((el as HTMLInputElement).type === 'checkbox') {
      data[name] = (el as HTMLInputElement).checked;
    } else if ((el as HTMLInputElement).type === 'radio') {
      if ((el as HTMLInputElement).checked) data[name] = (el as HTMLInputElement).value;
    } else {
      data[name] = (el as HTMLInputElement).value;
    }
  });
  data['action'] = actionName;
  return data;
}

/**
 * ボタンに対して共通の処理をバインドします。
 * - data-api-type 属性で API 種別を指定
 * - id 属性は action 名として送信
 *
 * 例: <button id="searchBtn" data-api-type="search">検索</button>
 */
export function initButtonActions(root: Document | Element = document) {
  const buttons = root.querySelectorAll('button[data-api-type]');
  buttons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const target = event.currentTarget as HTMLButtonElement;
      const apiType = target.dataset.apiType || '';
      const action = target.id || '';

      // 必要に応じて data-method 等から上書き可能
      const methodAttr = (target.dataset.method as HttpMethod) || undefined;

      try {
        await sendAction(apiType, action, { method: methodAttr, showLoading: true });
      } catch (e) {
        // 既に sendAction 側でハンドリング
      }
    });
  });
}

// デフォルトで初期化（既存のページの互換のため）
if (typeof document !== 'undefined') {
  // DOMContentLoaded を待たないで呼ばれる場合があるため、遅延実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initButtonActions(document));
  } else {
    initButtonActions(document);
  }
}

// 開発者向けの簡易使用例（コメント）
/*
  // 画面固有の処理をしたい場合
  import { initButtonActions } from './getButtonAction';
  initButtonActions();

  // 直接呼び出して細かい制御をする場合
  sendAction('user/update', 'updateUser', {
    method: 'POST',
    data: { id: 1, name: 'hoge' },
    onSuccess: (res) => { console.log('更新成功', res); }
  });
*/

export { sendAction };
