export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  message?: string;
}

async function request<T = any>(url: string, method = 'GET', body?: any): Promise<ApiResponse<T>> {
  const opts: RequestInit = { method, headers: {} };
  if (body != null) {
    opts.headers = { 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, opts);
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, message: `HTTP ${res.status}: ${text}` };
    }

    // Try parse JSON, but tolerate empty responses
    const text = await res.text();
    if (!text) return { ok: true };
    const json = JSON.parse(text) as T;
    return { ok: true, data: json };
  } catch (err: any) {
    return { ok: false, message: err && err.message ? err.message : String(err) };
  }
}

export async function postJson<T = any, R = any>(path: string, body: T): Promise<ApiResponse<R>> {
  return request<R>(path, 'POST', body);
}

export async function getJson<R = any>(path: string): Promise<ApiResponse<R>> {
  return request<R>(path, 'GET');
}

export default { postJson, getJson };
