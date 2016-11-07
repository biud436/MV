/*:
 * @plugindesc The screen will not turn off until the end of the game.
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_WakeLock = true;
(function () {
  if(!Utils.isMobileDevice() || (!!window.WakeLock) === false) {
    Imported.RS_WakeLock = undefined;
    return false;
  }
  if(!!navigator.userAgent.match(/Android/)) {
    WakeLock.init();
  }
})();
