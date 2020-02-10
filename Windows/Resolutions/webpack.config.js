const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    mode: "production", // development or production
    entry: './lib/index.js',
    output: {
      path: path.resolve(__dirname, 'bin'),
      filename: 'RS_ScreenManager.js'
    },
    target: "node-webkit",
    node: {
      global: true,
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.EvalSourceMapDevToolPlugin({
        filename: '[name].js.map',
      })
    ]
  };