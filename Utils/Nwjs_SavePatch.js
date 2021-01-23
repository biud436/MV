/*:
 * Nwjs_SavePatch.js
 * @plugindesc This plugin allows you to save all save files for your game to another folder instead of the default save folder.
 * @author biud436
 *
 * @help
 * ============================================================================
 * Introductions
 * ============================================================================
 * This plugin allows you to save all save files for your game to another folder
 * instead of the default save folder.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2016.01.30 (v1.0.0) - First Release.
 * 2017.09.29 (v1.0.1) :
 * -Fixed the issue that didn't create the save file when running the game with
 * the independent executable file.
 * 2021.01.23 (v1.0.2) :
 * - Fixed the bug that is not working in Enigma Virtual Box.
 */
 /*:ko
  * Nwjs_SavePatch.js
  * @plugindesc 저장 경로를 재설정 할 수 있습니다.
  * @author biud436
  *
  * @help
  * ============================================================================
  * Change Log
  * ============================================================================
  * 2016.01.30 (v1.0.0) - First Release.
  * 2017.09.29 (v1.0.1) - 게임 파일 단일화 시 저장 및 로드가 되지 않는 문제를 수정했습니다.
  * 2021.01.23 (v1.0.2) :
  * - Fixed the bug that is not working in Enigma Virtual Box.
  */

var Imported = Imported || {};
Imported.Nwjs_SavePatch = true;

(function () {

  StorageManager.getParentFolder = function (url2) {
    var isNwJs = this.isLocalMode();
    var path = require('path');
    var ret;

    if(!isNwJs) return;

    var isTest = !!Utils.isOptionValid('test');

    var nw = require('nw.gui');
    var realPath = path.resolve(nw.App.startPath).replace(/\\/g, "/");

    if(isTest) {
      ret = path.dirname(url2 || process.mainModule.filename);
    } else {
      ret = realPath;
    }
    
    return ret;
  };

  StorageManager.localFileDirectoryPath = function() {
      return StorageManager.getParentFolder() + '/save/';
  };

})();
