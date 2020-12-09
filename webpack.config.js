const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      ml: 'D:\\pro\\tinker\\modules',
      //ml: '/media/cosmin/Data/pro/tinker/modules',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],

  devServer: {
    https: true,

    stats: {
      colors: true,
      chunks: false,
      errorStack: false,
      loggingTrace: false,
      moduleTrace: false,
      assets: false,
      moduleAssets: false,
      depth: false,
    },
  },
};
