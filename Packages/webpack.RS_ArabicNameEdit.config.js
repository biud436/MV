const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: './lib/RS_ArabicNameEdit/index.js',
    output: {
      path: path.resolve(__dirname, 'bin'),
      filename: 'RS_ArabicNameEdit.js'
    },
  };