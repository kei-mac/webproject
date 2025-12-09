import { ApiResponse } from './request';
import { ScreenMain } from '../model/ScreenMain.js';

export type ResponseHandlerOptions = {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
};

export function handleApiResponse<T = any>(res: ApiResponse<T>, options: ResponseHandlerOptions = {}) {
  if (res.ok) {
    const data: any = (res as any).data;
    if (options.onSuccess) {
      options.onSuccess(data);
      return { handled: true, data };
    }

    // デフォルトの成功処理: search は ScreenMain による描画
    if (data && typeof data === 'object' && (data as any).redirect) {
      window.location.href = (data as any).redirect;
      return { handled: true, data };
    }

    try {
      // 互換のため search 判定
      // eslint-disable-next-line eqeqeq
      if ((data && data.result) || (window && (window as any).location)) {
        const create = new ScreenMain();
        create.createElement(data);
        return { handled: true, data };
      }
    } catch (e) {
      // ignore
    }

    console.log('API success', data);
    return { handled: true, data };
  } else {
    const err = { message: res.message || 'Unknown error', status: (res as any).status };
    if (options.onError) options.onError(err);
    else defaultErrorHandler(err);
    return { handled: false, error: err };
  }
}

function defaultErrorHandler(err: any) {
  console.error('API Error:', err);
  try { alert('エラーが発生しました。詳細はコンソールをご確認ください。'); } catch (e) { /* ignore */ }
}

export default { handleApiResponse };
