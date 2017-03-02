/*:
 * @plugindesc Stop Movie
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_StopMovie = true;

(function () {

  var alias_Scene_Map_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function() {
      if(Graphics._isVideoVisible()) {
        this.menuCalling = false;
        if(Graphics._video.src) {
          Graphics._video.pause();
          Graphics._video.currentTime = 0.0;
          Graphics._onVideoEnd();
        }
      } else {
        alias_Scene_Map_callMenu.call(this);
      }
  };

})();
