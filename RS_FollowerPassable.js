/*:
 * RS_FollowerPassable.js
 * @plugindesc If you are using this plugin, the player will be impossible
 * to pass other party members.
 *
 * @author biud436
 *
 * @param Enabled
 * @desc
 * @default true
 *
 * @help
 * [Plugin Command]
 * FollowerPassable enabled true
 * FollowerPassable enabled false
 */

var Imported = Imported || {};
Imported.RS_FollowerPassable = true;

(function() {

  var parameters = PluginManager.parameters('RS_FollowerPassable');
  var enabled = Boolean(parameters['Enabled'] === 'true');

  //============================================================================
  // Game_Player

  var alias_Game_Player_canPass = Game_Player.prototype.canPass;
  Game_Player.prototype.canPass = function(x, y, d) {
      var x2 = $gameMap.roundXWithDirection(x, d);
      var y2 = $gameMap.roundYWithDirection(y, d);
      if(this.isFollowerPassable(x2, y2) && enabled) {
        return false;
      }
      return alias_Game_Player_canPass.call(this, x, y, d);
  }

  Game_Player.prototype.isFollowerPassable = function (x, y) {
      return this._followers.isFollowerPassable(x, y);
  };

  //============================================================================
  // Game_Follower

  var alias_Game_Follower_initialize = Game_Follower.prototype.initialize;
  Game_Follower.prototype.initialize = function(memberIndex) {
      alias_Game_Follower_initialize.call(this, memberIndex);
      this.setThrough(false);
  };

  //============================================================================
  // Game_Followers
  Game_Followers.prototype.isFollowerPassable = function(x, y) {
      var result = this._data.some(function(follower) {
        return follower.posNt(x, y);
      }, this);
      return result;
  };

  //============================================================================
  // Game_Interpreter
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "FollowerPassable") {
      switch (args[0].toLowerCase()) {
        case 'enabled':
          enabled = Boolean(args[1] === 'true');
          break;
      }
    }
  };

})();
