/*:
 * RS_EventTouch.js
 * @plugindesc This plugin allows you to execute the event when you are clicking
 * the event.
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
 * 2016.07.03(v1.0.0) - First Release
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
      lEvent.list().forEach(function(i) {
        if(i.code === 108 || i.code === 408) {
          if( i.parameters[0].match(regex) ) {
            if( lEvent && lEvent._trigger < 3 ) {
              lEvent.start();
            }
          }
        }
      }, this);

    }
  };

  var alias_Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    alias_Game_Map_update.call(this, sceneActive);
    this.executeTouchEvent();
  };

})();
