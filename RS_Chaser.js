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
 * =============================================================================
 * Script Functions
 * =============================================================================
 * this.chasePlayer(range)
 * this.chaseEvent(id, range)
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * Chase range x : Set the depth of the search.
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.04.26 (v1.0.0) - First Release
 * 2016.07.16 (v1.0.1) - Fixed the variable called "_limit" for setting
 * the default value and added the plugin command that could set the depth of
 * the search.
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
    this._limit = range || _limit;
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    var dir = this.findDirectionTo(x, y);
    if(dir !== 0 ) this.moveStraight(dir);
  };

  Game_Event.prototype.chaseEvent = function(id, range) {
    this._limit = range || _limit;
    var x = $gameMap.event(id).x;
    var y = $gameMap.event(id).y;
    var dir = this.findDirectionTo(x, y);
    if(dir !== 0 ) this.moveStraight(dir);
  };

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Chase") {
      switch (args[0].toLowerCase()) {
        case 'range':
          _limit = Number(args[1] || 12);
          break;
      }
    }
  };

})();
