//==============================================================================
// RS_WindowManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_WindowManager = true;

/*:
 * @plugindesc (v1.0.0) <RS_WindowManager>
 * @author biud436
 *
 * @help
 * The x is the number between 0 and 255
 *
 *    WindowManager.alpha = x;
 *
 *
 */

var RS = RS || {};

function WindowManager() {
  throw new Error("This is a static class");
}

(function ($) {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_WindowManager>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  $.getPath = function () {
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/js/libs');
    if (path.match(/^\/([A-Z]\:)/)) {
      path = path.slice(1);
    }
    return decodeURIComponent(path);
  };

  if( Utils.isNwjs() ) {
    if(process && process.platform && process.platform === 'win32') {
      $.setAlpha = function(value) {
        "use strict";
        var child_process = require('child_process');
        var fileName = $.getPath() + "/WindowManager.exe";
        var projectName = document.querySelector('title').text;
        child_process.exec(`cmd.exe /K ${fileName} /c ${value} ${projectName}`);
      };
    }
  }

  Object.defineProperty(WindowManager, 'alpha', {
    set: function(value) {
      RS.WindowManager.setAlpha(value);
    }
  });

})(WindowManager);
