//================================================================
// RS_FastTransfer.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
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
(() => {
  let isFastTransfer = true;

  //===========================================================================
  // Scene_Map
  //===========================================================================

  const aliasSceneMapUpdateTransferPlayer =
    Scene_Map.prototype.updateTransferPlayer;
  Scene_Map.prototype.updateTransferPlayer = function () {
    if (!isFastTransfer) {
      aliasSceneMapUpdateTransferPlayer.call(this);
      return;
    }

    if (!$gamePlayer.isTransferring()) {
      return;
    }

    const isMoveNewMap =
      $gamePlayer && $gamePlayer._newMapId !== $gameMap.mapId();

    if (isMoveNewMap) {
      SceneManager.goto(Scene_Map);
    } else if ($gamePlayer) {
      $gamePlayer.performTransfer();
    }
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  const aliasGameInterpreterPluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    aliasGameInterpreterPluginCommand.call(this, command, args);

    if (command === 'DisableFastTransfer') {
      isFastTransfer = false;
    } else if (command === 'EnableFastTransfer') {
      isFastTransfer = true;
    }
  };
})();
