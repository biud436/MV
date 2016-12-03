/*:
 * @plugindesc <RS_TimedTouchInput>
 * @author biud436
 *
 * @param Time to stop
 * @desc Specify the time to stop the mouse
 * (30 = 30 Frames)
 * @default 30
 *
 * @help
 * -----------------------------------------------------------------------------
 * How to change the time to lock the touch input
 * -----------------------------------------------------------------------------
 * You can be available the code as below.
 * RS.TimedTouchInput.Params.waitFrames = x;
 * -----------------------------------------------------------------------------
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.12.03 (v1.0.0) - First Release.
 */
 /*:ko
  * @plugindesc <RS_TimedTouchInput>
  * @author biud436
  *
  * @param Time to stop
  * @desc 터치 입력을 멈출 시간을 지정하세요
  * (30 = 30 프레임)
  * @default 30
  *
  * @help
  * -----------------------------------------------------------------------------
  * 터치 입력 멈춤 시간을 변경하는 방법
  * -----------------------------------------------------------------------------
  * 다음 코드를 사용하시기 바랍니다.
  * RS.TimedTouchInput.Params.waitFrames = x;
  * -----------------------------------------------------------------------------
  * Change Log
  * -----------------------------------------------------------------------------
  * 2016.12.03 (v1.0.0) - First Release.
  */

var Imported = Imported || {};
Imported.RS_TimedTouchInput = true;

var RS = RS || {};
RS.TimedTouchInput = RS.TimedTouchInput || {};

(function ($) {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_TimedTouchInput>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  $.Params = {};
  $.Params.waitFrames = parseInt(parameters['Time to stop'] || 30);

  var alias_Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function () {
    alias_Game_Message_clear.call(this);
    this._mouseWait = $.Params.waitFrames;
  };

  Scene_Map.prototype.isMapTouchOk = function() {
      return this.isActive() && $gamePlayer.canMove() && !this.isMouseLock();
  };

  Scene_Map.prototype.isMouseLock = function() {
      if($gameMessage._mouseWait > 0) $gameMessage._mouseWait--;
      return $gameMessage._mouseWait > 0;
  };

})(RS.TimedTouchInput);
