//================================================================
// RS_EventTouch.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_EventTouch.js
 * @plugindesc This plugin allows you to execute the event when you are clicking the event.
 * @author biud436
 *
 * @param Event Regex
 * @desc this parameter define a RegExp
 * @default /Event[ ]*Click/ig
 *
 * @help
 * 1. Adding the command called 'Comment' into the event
 * 2. The event's setup is simplify. It is done that you are to enter the comment
 * called 'Event Click' into the event's list.
 *
 * - Change Log
 * 2016.07.03 (v1.0.0) - First Release
 * 2017.01.30 (v1.0.1) - Fixed the bug that is not working when using event starting conditions
 * 2017.01.31 (v1.0.2) - Fixed the bug is not working this plugin properly
 * 2018.06.20 (v1.0.3) - Fixed the issue that wouldn't check the event has the invalid page.
 */
/*:ko
 * @plugindesc 이벤트를 마우스로 클릭했을 때 즉각 실행합니다.
 * @author 러닝은빛(biud436)
 *
 * @param Event Regex
 * @text 이벤트 터치 정규표현식
 * @desc 정규표현식을 정의할 수 있습니다 (정규표현식 가능자만 수정 바랍니다)
 * @default /Event[ ]*Click/ig
 *
 * @help
 * ========================================================================
 * 사용법
 * ========================================================================
 * 굉장히 간단합니다! 
 * 
 * 이벤트에 Event Click이라는 메모를 작성하면 설정이 끝납니다.
 * 
 * 정규표현식을 변경했다면, 변경된 정규표현식에 맞는 메모를 작성하시기 바랍니다.
 *
 * ========================================================================
 * 변동 사항
 * ========================================================================
 * 2016.07.03 (v1.0.0) - First Release
 * 2017.01.30 (v1.0.1) - Fixed the bug that is not working when using event starting conditions
 * 2017.01.31 (v1.0.2) - Fixed the bug is not working this plugin properly
 * 2018.06.20 (v1.0.3) - Fixed the issue that wouldn't check the event has the invalid page.
 */

var Imported = Imported || {};
Imported.RS_EventTouch = true;

(function () {

  var parameters = PluginManager.parameters('RS_EventTouch');
  var regex = eval(parameters['Event Regex']) || /Event[ ]*Click/ig;

  Game_Map.prototype.executeTouchEvent = function() {
    var x, y, id, lEvent;

    if(TouchInput.isTriggered()) {
      x = $gameMap.canvasToMapX(TouchInput._x),
      y = $gameMap.canvasToMapY(TouchInput._y),
      id = $gameMap.eventIdXy(x, y);
      lEvent = this.event(id);
      if(!lEvent) return false;
      if(lEvent.findProperPageIndex() < 0) return false;
      if(!lEvent.page()) return false;
      lEvent.list().forEach(function(i) {
        if(i.code === 108 || i.code === 408) {
          if( i.parameters[0].match(regex) ) {
            if(lEvent._trigger < 3) lEvent.start();
          }
        }
      }, this);
    }
  };

  var alias_Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    alias_Game_Map_update.call(this, sceneActive);
    if(sceneActive) this.executeTouchEvent();
  };

})();
