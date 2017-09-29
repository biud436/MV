/*:
 * Nwjs_SavePatch.js
 * @plugindesc This plugin provides a function to solve the problem related to a path of Save.
 * @author biud436
 *
 * @help
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2017.09.29 (v1.0.1) - Fixed the bug that is not saving the save file
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
  * 2017.09.29 (v1.0.1) - 게임 파일 단일화 시 생기는 버그 수정
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
