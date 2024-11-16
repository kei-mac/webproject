const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build/static/js'), // 開発用の出力先
  },
  devServer: {
    static:[
      {
        directory: path.resolve(__dirname, './build'), //　buildディレクトリ
      },
      {
        directory: path.resolve(__dirname, './build/static'), // 静的ディレクトリの指定
      },
      {
        directory: path.resolve(__dirname, './build/templates'), // HTMLのディレクトリ指定
      },
    ],
    port: 4200,
    historyApiFallback: false,
  },
});
