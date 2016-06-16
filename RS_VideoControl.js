/*:
 * RS_VideoControl.js
 * @plugindesc This plugin shows the play control bar of a video,
 * and the player stops the movement while playing the video.
 * @author biud436
 *
 * @param zIndex
 * @desc range of the z-index is a number between 0 and 2147483647.
 * @default 1000
 *
 * @param Show Control Bar
 * @desc shows a control bar on a video
 * @default true
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 * VideoControl show true
 * VideoControl show false
 * VideoControl zIndex 1000
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.07 - First Release
 */

var Imported = Imported || {};
Imported.RS_VideoControl = true;
var RS = RS || {};
RS.VideoControl = RS.VideoControl || {};

(function() {

  var parameters = PluginManager.parameters('RS_VideoControl');
  RS.VideoControl.zIndex = Number(parameters['zIndex'] || 1000);
  RS.VideoControl.enabledContol = parameters['Show Control Bar'] === 'true';

  //----------------------------------------------------------------------------
  // Game_Player
  //
  //
  var alias_Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    alias_Game_Player_initMembers.call(this);
    this._locked = false;
    this._prelockDirection = 2;
  }

  Game_Player.prototype.lock = function() {
      if (!this._locked) {
          this._prelockDirection = this.direction();
          this._locked = true;
      }
  };

  Game_Player.prototype.unlock = function() {
      if (this._locked) {
          this._locked = false;
          this.setDirection(this._prelockDirection);
      }
  };

  var alias_Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
      if(this._locked) {
        return false;
      }
      return alias_Game_Player_canMove.call(this);
  };

  //----------------------------------------------------------------------------
  // Graphics
  //
  //
  Graphics._updateVideo = function() {
      this._video.width = this._width;
      this._video.height = this._height;
      this._video.style.zIndex = RS.VideoControl.zIndex;
      this._video.controls = RS.VideoControl.enabledContol;
      this._centerElement(this._video);
  };

  Graphics._onVideoLoad = function() {
      this._video.play();
      this._updateVisibility(true);
      $gamePlayer.lock();
  };

  Graphics._onVideoEnd = function() {
      this._updateVisibility(false);
      $gamePlayer.unlock();
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //
  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);
      if(command === "VideoControl") {
        switch (args[0].toLowerCase()) {
          case 'show':
            RS.VideoControl.enabledContol = Boolean(args[1] === 'true');
            break;
          case 'zIndex':
            RS.VideoControl.zIndex = Number(args[1] || 1000);
            break;
        }
      }
  };

})();
