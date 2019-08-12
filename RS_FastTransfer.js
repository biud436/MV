//================================================================
// RS_FastTransfer.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
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
/*:ko
 * @plugindesc 같은 맵이라면 플레이어의 위치만 재설정되는 것이므로 맵을 새로 생성하지 않습니다.
 * @author 러닝은빛(biud436)
 * @help
 * =============================================================================
 * 플러그인 소개 및 플러그인 명령에 대한 설명
 * =============================================================================
 * 크로미움 개발자 문서에 의하면, 맵이 새로 생성되면 네트워크 쓰레드를 통해 리소스를 내려받는 작업이 이뤄집니다.
 * 데이터를 새로 받아야 하므로 성능에 불이익이 될 수 있습니다.
 * 
 * 따라서 이 플러그인은 같은 맵일 때 플레이어의 위치만 재설정하여 맵을 새로 생성하지 않습니다.
 * 
 * DisableFastTransfer : 빠른 이동을 비활성화하고 같은 맵으로 이동해도 맵을 재생성합니다.
 * EnableFastTransfer : 같은 맵으로 이동할 때 맵을 재생성하지 않습니다.
 * 
 * =============================================================================
 * 변동 사항
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
