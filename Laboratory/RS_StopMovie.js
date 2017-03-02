/*:
 * @plugindesc This plugin allows you to quit the video completely when you press the Esc key during playing the video..
 * @author biud436
 */
 /*:ko
  * @plugindesc 동영상 재생 중에 메뉴 키를 누르면 동영상이 종료 됩니다.
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
