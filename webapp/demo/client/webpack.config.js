const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/components/core/login.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../src/main/resources/static/javascript'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../src/main/resources/templates'),
    },
    port: 4200,
    historyApiFallback: false,
  }
} 