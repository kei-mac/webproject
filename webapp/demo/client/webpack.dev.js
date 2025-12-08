const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'source-map',  // ソースマップを生成
  mode: 'development',
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    }
  },  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build/static/js'), // 開発用の出力先
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/templates'), // コピー元
          to: path.resolve(__dirname, 'build/static/js/templates'),  // コピー先
        },
        {
          from: path.resolve(__dirname, 'templates'), // コピー元
          to: path.resolve(__dirname, 'build/templates'),  // コピー先
          globOptions: {
            ignore: ['**/css/**'],
          },
        },
      ],
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      // sourceRoot: '/src/',
    }),
  ],
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
      {
        directory: path.resolve(__dirname, './build/static/js'), //　buildディレクトリ
      },
    ],
    port: 4200,
    historyApiFallback: true,
  },
});
