/*:
 * RS_Chaser.js
 * @plugindesc This plugin provides functions that chases an event or the player
 * @author biud436
 *
 * @param Default Search Limit
 * @desc The default value is to 12
 * @default 12
 *
 * @help
 * this.chasingPlayer(range)
 * this.chasingEvent(id, range)
 */

var Imported = Imported || {};
Imported.RS_Chaser = true;

(function() {

  var parameters = PluginManager.parameters("RS_Chaser");
  var _limit = Number(parameters['Default Search Limit'] || 12);

  var alias_Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    alias_Game_Event_initMembers.call(this);
    this._limit = _limit || 12;
  };

  Game_Event.prototype.searchLimit = function() {
      return this._limit;
  };

  Game_Event.prototype.chasePlayer = function(range) {
    this._limit = range || 12;
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    var dir = this.findDirectionTo(x, y);
    if(dir !== 0 ) this.moveStraight(dir);
  };

  Game_Event.prototype.chaseEvent = function(id, range) {
    this._limit = range || 12;
    var x = $gameMap.event(id).x;
    var y = $gameMap.event(id).y;
    var dir = this.findDirectionTo(x, y);
    if(dir !== 0 ) this.moveStraight(dir);
  };

})();
