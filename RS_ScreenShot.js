/*
 * RS_ScreenShot.js (PC)
 * @plugindesc This plugin creates the screenshot file in ScreenShots folder when you press on the 'F7' key.
 * @author biud436
 * @version 1.0
 * @date 2015.12.22
 *
 * @reference http://stackoverflow.com/questions/32613060/how-to-take-screenshot-with-node-webkit
 *
 * @help
 * This plugin creates the screenshot file in ScreenShots folder when you press on the 'F7' key.
 */

var RS = RS || {};
RS.ScreenShot = RS.ScreenShot || new function() {};

(function($) {

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
        case 118:   // F7
          RS.ScreenShot.takeSnapshot();
        break;
        }
      }
  }

})(RS.ScreenShot);
