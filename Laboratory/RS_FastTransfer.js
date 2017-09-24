/*:
 * @plugindesc This plugin allows you to transfer the player without downloading the data when transferring as same map.
 * @author biud436
 * @help
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * DisableFastTransfer : This command allows you to disable a fast transfer.
 * EnableFastTransfer : This command allows you to enable a fast transfer.
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.09.24 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_FastTransfer = true;

(function () {

  var isFastTransfer = true;

  //===========================================================================
  // Scene_Map
  //===========================================================================

  var alias_Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
  Scene_Map.prototype.updateTransferPlayer = function() {
    if(isFastTransfer) {
      if ($gamePlayer.isTransferring()) {
        if($gamePlayer && $gamePlayer._newMapId !== $gameMap.mapId()) {
          SceneManager.goto(Scene_Map);
        } else {
          if($gamePlayer) $gamePlayer.performTransfer();
        }
      }
    } else {
      alias_Scene_Map_updateTransferPlayer.call(this);
    }
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);

    if(command === "DisableFastTransfer") {
      isFastTransfer = false;
    }
    if(command === "EnableFastTransfer") {
      isFastTransfer = true;
    }

  };

})();
