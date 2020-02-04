const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: './lib/RS_MessageEffects/index.js',
    output: {
      path: path.resolve(__dirname, 'bin'),
      filename: 'RS_MessageEffects.js'
    },
    // plugins: [
    //     new webpack.BannerPlugin({
    //         raw: false,
    //         banner: () => {
    //             return fs.readFileSync('./lib/desc.js', "utf8");
    //         }
    //     })
    // ]
  };