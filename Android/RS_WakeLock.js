/*:
 * @plugindesc This plugin provides a function that would not turn off the screen during the game on Android
 * @author biud436
 * @help
 * var pointer;
 * WakeLock.getScreenWidth(pointer);
 * WakeLock.getScreenHeight(pointer);
 * WakeLock.getScreenDestiny(pointer);
 */

var Imported = Imported || {};
Imported.RS_WakeLock = true;

(function () {

  if((!!window.WakeLock) === false) {
    function NwjsInterface_WakeLock() {
      throw new Error("This is a static class");
    }
    NwjsInterface_WakeLock.init = function () {
      console.warn('WakeLock object is not defined.');
    };
    NwjsInterface_WakeLock.getScreenWidth = function (pointer) {
      console.warn('WakeLock object is not defined.');
    };
    NwjsInterface_WakeLock.getScreenHeight = function (pointer) {
      console.warn('WakeLock object is not defined.');
    };
    NwjsInterface_WakeLock.getScreenDestiny = function (pointer) {
      console.warn('WakeLock object is not defined.');
    };
    window.WakeLock = NwjsInterface_WakeLock;
  };

  WakeLock.init();

})();
