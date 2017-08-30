/*:
 * @plugindesc Start Local Server
 * @author biud436
 * @help
 * To use this, On Windows you have to install the node module called 'harp'
 * using the command line tool.
 *
 *    npm install -g harp
 *
 */

var Imported = Imported || {};
Imported.StartLocalServer = true;

var RS = RS || {};
RS.LocalServer = RS.LocalServer || {};

(function ($) {

    var nw = require('nw.gui');
    var nw_Window = nw.Window.get();

    $.getParentFolder = function () {
      var path = require('path');
      var base = path.dirname(process.mainModule.filename);
      return base;
    };

    if( Utils.isNwjs() ) {
      if(process && process.platform && process.platform === 'win32') {
        $.startLocalServer = function(value) {
          "use strict";
          var child_process = require('child_process');
          var fileName = $.getParentFolder();
          var cmdProcess = child_process.exec(`cmd.exe /K harp server "${fileName}"`);
          cmdProcess.stdout.on('data', function(data) {
            console.log(data);
          });
          process.on('exit', function () {
            cmdProcess.kill();
          });
        };
      }
    }

    nw_Window.on('loaded', function () {
      $.startLocalServer();
    });

})(RS.LocalServer);
