import { systemConstat } from "../const/ModelConstant";

/**
 * Mainメニューレイアウト作成クラス
 * 画面のレイアウトを作成します。
 */
export class ScreenMain {

    constructor() {
    }

    /**
     * 要素を作成します。
     * @param params - 要素を作成するためのパラメータ
     * @returns 作成された要素
     */
    public createElement(params: { dataName: string }): HTMLElement {
        const root = document.createElement('div');
        root.id = params.dataName;
        return root;
    }

    // リクエスト処理
    // データベースにアクセスして、コンテンツ情報を取得する。
    // リクエストの情報として、選択したメニュー定義を渡す。

    // データベースから取得した値を反映する

    /**
     * サイドメニューを作成します。
     * @param userId - ユーザーID
     */
    public async createSidebar(userId: string): Promise<void> {
        // リクエストURL
        const URL = systemConstat.URL + 'topmenu';

        try {
            // APIリクエストを送信する（仮の処理）
            const response = await fetch(URL + `?userId=${userId}`);
            const data = await response.json();

            // サイドメニューの内容を反映する処理（仮の処理）
            console.log(data);
        } catch (error) {
            console.error('サイドメニュー作成時にエラーが発生しました:', error);
        }
    }

    // 検索フレームの作成
    // 一覧フレームの作成
    // 詳細フレームの作成
    // 関連データの作成

    // /**
    //  * REST APIを呼び出し、URLを返します。
    //  * @returns URL
    //  */
    // public getRestApiUrl(): string {
    //     return systemConstat.API_URL;
    // }
}
