//==============================================================================
// RS_WindowManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_WindowManager = true;

/*:
 * @plugindesc (v1.0.3) This plugin allows you to indicate the transparent window <RS_WindowManager>
 * @author biud436
 *
 * @help
 * =============================================================================
 * Introductions
 * =============================================================================
 * When you set this property, it will set the transparent window.
 * The alpha property can set as the number between 0 and 255.
 * Here is an example code that easily sets up like this.
 *
 *  WindowManager.alpha = x;
 *
 * Note that the features are limited to Windows target.
 * And to use this you should have installed an extension program called
 * 'WindowManager.exe' to js/libs folder.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.08.29 (v1.0.1) - Fixed the library with an executable file for Windows
 * 2017.08.30 (v1.0.2) :
 * - Fixed the issue that causes the error when calling the code called 'WindowManager.alpha'
 * 2017.08.30 (v1.0.3) :
 * - Fixed the project name didn't recognize that has the white space.
 * - Fixed issue that incorrectly gets the path after deploying the game as Windows target.
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

  $.getParentFolder = function () {
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var ret = path.join(base, 'js/libs');
    return ret;
  };

  if( Utils.isNwjs() ) {
    if(process && process.platform && process.platform === 'win32') {
      $.setAlpha = function(value) {
        "use strict";
        var child_process = require('child_process');
        var fileName = $.getParentFolder() + "/WindowManager.exe";
        var projectName = document.querySelector('title').text;
        var cmdProcess = child_process.exec(`cmd.exe /K ${fileName} /c ${value} "${projectName}"`);
        cmdProcess.stdout.on('data', function(data) {
          console.log(data);
        });
      };
    }
  }

  Object.defineProperty(WindowManager, 'alpha', {
    set: function(value) {
      $.setAlpha(value);
    }
  });

})(WindowManager);
