/*:
 * RS_ScreenShot.js
 * @plugindesc This plugin creates the screenshot file in ScreenShots
 * folder when you press on the specific key.
 *
 * @author biud436
 * @version 1.0.0
 * @date 2015.12.22
 *
 * @param key
 * @desc Type the keyCode.
 * @default 118
 *
 * @reference http://stackoverflow.com/questions/32613060/how-to-take-screenshot-with-node-webkit
 *
 * @help
 * - Key Code Link
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 *
 * - Change Log
 * 2016.03.20 - Added parameter called key
 */

var RS = RS || {};
RS.ScreenShot = RS.ScreenShot || new function() {};

(function($) {

  var parameters = PluginManager.parameters('RS_ScreenShot');
  RS.ScreenShot.KEY = Number(parameters['key'] || 118 );

  $.getPath = function () {
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/ScreenShots/');
    if (path.match(/^\/([A-Z]\:)/)) {
      path = path.slice(1);
    }
    return decodeURIComponent(path);
  };

  $.takeSnapshot = function() {

    if(!StorageManager.isLocalMode()) {
      return;
    }

    var gui = require('nw.gui');
    var win = gui.Window.get();
    var fs = require('fs');
    var filePath;

    win.capturePage(function(buffer) {
      if(!fs.existsSync(this.getPath()) ) {
        fs.mkdirSync(this.getPath());
      }
      filePath = this.getPath() + '%1.png'.format(new Date().toJSON().replace(/[.:]+/g, "-"));
      fs.writeFile(filePath, buffer, function (err) {
        if (err) throw err;
      });

    }.bind(this), { format : 'png', datatype : 'buffer'} );
  };

  var alias_SceneManager_onKeyDown = SceneManager.onKeyDown;
  SceneManager.onKeyDown = function(event) {
      alias_SceneManager_onKeyDown.apply(this, arguments);
      if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case RS.ScreenShot.KEY:   // F7
          RS.ScreenShot.takeSnapshot();
        break;
        }
      }
  }

})(RS.ScreenShot);
