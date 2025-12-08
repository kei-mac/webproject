## 起動方法
クライアントプロジェクトを実行するためには、以下のコマンドを追加します。
```TypeScript

```

### SCSS を使う手順

1. .scss ファイルを `src/` 以下に追加します（例: `src/styles/main.scss`）。
2. TypeScript エントリまたは任意のモジュールで `import '../styles/main.scss'` を記述します。
3. 開発ビルド: `npm run build:dev` を実行します。プロダクションビルド: `npm run build:prod` を実行します。

（webpack は開発環境で `style-loader`、本番で `MiniCssExtractPlugin` を使って CSS を抽出する設定になっています。）
