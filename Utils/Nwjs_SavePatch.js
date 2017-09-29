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
 * 2017.09.29 (v1.0.1) :
 * -Fixed the issue that didn't create the save file when running the game with
 * the independent executable file.
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
  * 2017.09.29 (v1.0.1) - 게임 파일 단일화 시 저장 및 로드가 되지 않는 문제를 수정했습니다.
  */

var Imported = Imported || {};
Imported.Nwjs_SavePatch = true;

(function () {

  StorageManager.getParentFolder = function (url2) {
    var isNwJs = this.isLocalMode();
    var path = require('path');
    var ret;

    if(!isNwJs) return;

    if(!Utils.isOptionValid('test')) {
      ret = path.dirname(url2 || process.execPath).concat('/');
    } else {
      ret = path.dirname(url2 || process.mainModule.filename).concat('/');
    }
    return ret;
  };

  StorageManager.localFileDirectoryPath = function() {
      return StorageManager.getParentFolder() + 'save/';
  };

})();
