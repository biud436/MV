const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const myFileName = __filename.split(".")[1];

module.exports = {
    mode: "production",
    // entry: ['@babel/polyfill', `./lib/${myFileName}/index.js`],
    entry: `./lib/${myFileName}/index.js`,
    output: {
      path: path.resolve(__dirname, 'bin'),
      filename: `${myFileName}.js`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'lib', myFileName)
          ],
          exclude: /node_modules/,     
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }       
          }
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      // new MinifyPlugin({},{}),
    ]
  };