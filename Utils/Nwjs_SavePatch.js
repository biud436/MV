/*:
 * Nwjs_SavePatch.js
 * @plugindesc This plugin provides a function to solve the problem related to a path of Save.
 * @author biud436
 *
 * @help
 */
 /*:ko
  * Nwjs_SavePatch.js
  * @plugindesc 저장 경로를 재설정 할 수 있습니다.
  * @author biud436
  *
  * @help
  */

var Imported = Imported || {};
Imported.Nwjs_SavePatch = true;

(function () {

  StorageManager.getParentFolder = function (url2) {
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

  StorageManager.localFileDirectoryPath = function() {
      return StorageManager.getParentFolder() + 'save/';
  };

})();
