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
      {
        test: /\.scss$|\.sass$/,
        // no loaders here; handled in dev/prod configs
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
} 