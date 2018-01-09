/*:ko
 * @plugindesc 게임 시작 시 로컬 서버를 자동으로 실행합니다. 이 플러그인은 실험 용도입니다.
 * @author biud436
 * @help
 * =============================================================================
 * 플러그인 동작 환경
 * =============================================================================
 * 사용하려면 npm으로 harp를 설치하시기 바랍니다.
 *
 *    npm install -g harp
 *
 * 웹브라우저 localhost:9000으로 접속하여 게임을 플레이하세요.
 *
 * 프로세스에 남아있는 버그가 있을 수 있으니 테스트 플레이 종료 후,
 * 작업 관리자로 확인 바랍니다.
 *
 */
/*:
 * @plugindesc Creating the local server when starting the test play. This plugin is used for experimental purposes.
 * @author biud436
 * @help
 * =============================================================================
 * Test Environment
 * =============================================================================
 * Windows Only
 * Chrome
 *
 * =============================================================================
 * Required
 * =============================================================================
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

    $.getPath = function () {
      var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/ScreenShots/');
      if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
      }
      return decodeURIComponent(path);
    };

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
          var fileName = $.getPath();
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
