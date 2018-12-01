/*:
 * RS_ScreenShot.js
 * @plugindesc <RS_ScreenShot>
 *
 * @author biud436
 * @date 2015.12.22
 *
 * @param key
 * @type number
 * @desc Type the keyCode.
 * @default 118
 *
 * @param Screenshot Preview Window
 * @type boolean
 * @desc
 * @default true
 *
 * @param Play Se
 * @type boolean
 * @desc Yes - true, No - false
 * @default true
 *
 * @param Se Name
 * @desc Specify a sound file from audio/se folder.
 * @default Save
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param file format
 * @text File Format
 * @type select
 * @desc Select desired file format in the game screenshot.
 * @default png
 * @option png
 * @value png
 * @option jpeg
 * @value jpeg
 *
 * @reference http://stackoverflow.com/questions/32613060/how-to-take-screenshot-with-node-webkit
 *
 * @help
 * - Key Code Link
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 *
 * - Change Log
 * 2015.12.22 (v1.0.0) - First Release.
 * 2016.03.20 (v1.0.1) - Added parameter called key.
 * 2016.08.13 (v1.0.2) - Added previewWindow.
 * 2016.11.27 (v1.0.3) - Added the code that can delete the texture from the memory.
 * 2016.11.27 (v1.0.4) : Fixed preview window in the html format instead of an image.
 * - Displays the name of the screen shot file in the preview window.
 * - Plays the sound when you are taking a screenshot.
 * 2016.12.08 (v1.0.42) - Added code to remove references to URL objects.
 * 2018.02.27 (v1.0.5) :
 * - Fixed the getPath function issue in RMMV 1.6.0.
 * - Changed the source code for RMMV 1.6.0.
 * 2018.04.25 (v1.0.6) - Added a feature that allows you to select the file format in the screenshot.
 */
/*:ko
* RS_ScreenShot.js
* @plugindesc <RS_ScreenShot>
*
* @author biud436
* @date 2015.12.22
*
* @param key
* @type number
* @desc 키 코드를 입력하세요
* @default 118
*
* @param Screenshot Preview Window
* @type boolean
* @desc 스크린샷을 미리 볼 지 여부를 결정합니다.
* @default true
*
* @param Play Se
* @type boolean
* @desc 재생 - true, 재생하지 않음 - false
* @default true
*
* @param Se Name
* @desc audio/se 폴더에 있는 사운드 파일을 지정하세요.
* @default Save
* @require 1
* @dir audio/se/
* @type file
*
* @param file format
* @text 파일 형식
* @type select
* @desc 원하는 스크린샷 파일 형식을 지정하세요.
* @default png
* @option png
* @value png
* @option jpeg
* @value jpeg
*
* @reference http://stackoverflow.com/questions/32613060/how-to-take-screenshot-with-node-webkit
*
* @help
* - Key Code Link
* https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
*
* - Change Log
* 2015.12.22 (v1.0.0) - First Release.
* 2016.03.20 (v1.0.1) - Added parameter called key.
* 2016.08.13 (v1.0.2) - Added preview window.
* 2016.11.27 (v1.0.3) - Added the code that can delete the texture from the memory.
* 2016.11.27 (v1.0.4) : Fixed preview window in the html format instead of an image.
* - Displays the name of the screen shot file in the preview window.
* - Plays the sound when you are taking a screenshot.
* 2016.12.08 (v1.0.42) - Added code to remove references to URL objects.
* 2018.02.27 (v1.0.5) :
* - Fixed the getPath function issue in RMMV 1.6.0.
* - Changed the source code for RMMV 1.6.0.
* 2018.04.25 (v1.0.6) - Added a feature that allows you to select the file format in the screenshot.
*/

var Imported = Imported || {};
Imported.RS_ScreenShot = true;

var RS = RS || {};
RS.ScreenShot = RS.ScreenShot || {};

(function($) {

  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<RS_ScreenShot>");
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  $.KEY = Number(parameters['key'] || 118 );
  $.isPreviewWindow = Boolean(parameters['Screenshot Preview Window'] === 'true');
  $.isPlaySe = Boolean(parameters['Play Se'] === 'true');
  $.seName = parameters['Se Name'] || 'Save';
  $.fileFormat = parameters["file format"] || "png";

  $.localFilePath = function (fileName) {
    if(!Utils.isNwjs()) return '';
    var path, base;
    path = require('path');
    base = path.dirname(process.mainModule.filename);
    return path.join(base, 'ScreenShots/');
  };

  $.getPath = function () {
    if(Utils.RPGMAKER_VERSION >= "1.6.0") return $.localFilePath();
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/ScreenShots/');
    if (path.match(/^\/([A-Z]\:)/)) {
      path = path.slice(1);
    }
    return decodeURIComponent(path);
  };

  $.getParentFolder = function (url2) {
    url2 = url2 || location.href;
    var i = 0;
    var ret = '';
    while(url2[i] !== undefined) {
     i++;
    }
    while(url2[i] !== '/') {
     i--;
    }
    ret = url2.slice(0, i).concat('/');
    return ret;
  };

  $.previewScreenShot = function (fileName) {
    var renderer = Graphics._renderer;
    var renderTexture = PIXI.RenderTexture.create(renderer.width, renderer.height);
    var stage = SceneManager._scene;
    if(stage) {
      renderer.render(stage, renderTexture);
      var canvas = renderer.extract.base64(renderTexture);
      var html = [
        '<!DOCTYPE html>',
        '<html>',
        '  <head>',
        '    <meta charset="utf-8">',
        '  <style>',
        '  .preview {',
        '   position: absolute;',
        '   background-color: #888888;',
        '   font-size: 18px;',
        '   color: white;',
        '   text-align: center;',
        '   width: 256px;',
        '   height: 19px;',
        '   opacity: 0.7;',
        '   word-wrap: break-word;',
        '}',
        '  </style>',
        '  <title>ScreenShots Preview</title>',
        '  </head>',
        '<div class="preview">%1.%2</div>'.format(fileName, $.fileFormat),
        '<body>',
        '<img src=\'%1\'>'.format(canvas),
        '</body>',
        '</html>'
      ].join('\n');
      var blob = new Blob([html], {type : 'text/html'});
      var url = URL.createObjectURL(blob);
      var win = window.open(url, '_blank');
      // var url2 = canvas.toDataURL("image/png");
      // var win = window.open(url2, '_blank');
    }
    if(renderTexture) renderTexture.destroy( { destroyBase: true } );

    // Call this method when it doesn't need to keep the reference to URL object any longer.
    URL.revokeObjectURL(url);

  };

  $.takeSnapshot = function() {

    if(!StorageManager.isLocalMode()) {
      console.warn('takeSnapshot function does not support on your mobile device');
      return;
    }

    var gui = require('nw.gui');
    var win = gui.Window.get();
    var fs = require('fs');
    var filePath;

    var result = win.capturePage(function(buffer) {
      if(!fs.existsSync(this.getPath()) ) {
        fs.mkdirSync(this.getPath());
      }
      var fileName = new Date().toJSON().replace(/[.:]+/g, "-");
      filePath = this.getPath() + '%1.%2'.format(fileName, $.fileFormat);
      fs.writeFile(filePath, buffer, function (err) {
        if (err) throw err;
        if($.isPlaySe) {
          AudioManager.playStaticSe({name: $.seName, pan: 0, pitch: 100, volume: ConfigManager.seVolume});
        }
        if($.isPreviewWindow) $.previewScreenShot(fileName);
      });

    }.bind(this), { format : $.fileFormat, datatype : 'buffer'} );

  };

  var alias_SceneManager_onKeyDown = SceneManager.onKeyDown;
  SceneManager.onKeyDown = function(event) {
      alias_SceneManager_onKeyDown.apply(this, arguments);
      if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case $.KEY:   // F7
          $.takeSnapshot();
        break;
        }
      }
  };

})(RS.ScreenShot);
