const path = require('path')

module.exports = {
  entry: './src/components/core/login.ts',
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
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../src/main/resources/static/javascript'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 4200,
    historyApiFallback: true,
  }
}