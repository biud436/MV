/*:
 * @plugindesc <RS_MirrorArea>
 * @author biud436
 *
 * @param Mirror
 * @desc [w, h, mask_ox, mask_oy, char_ox, char_oy]
 * @default [28, 42, 10, 25, 10, 25]
 *
 * @param Dresser
 * @desc [w, h, mask_ox, mask_oy, char_ox, char_oy]
 * @default [34, 15, 10, -5, 10, 70]
 *
 * @param Blur
 * @desc Blurring is very poor performance.
 * 0 = blur off / 0.1 or more = blur on
 * @default 0.0
 *
 * @help
 * =============================================================================
 * How to Use
 * =============================================================================
 * You can set up the comment in your mirror event and change an image as mirror.
 *
 *   Try to set up this comment to player and player's followers :
 *       <MIRROR_NORMAL : 0>
 *
 *   Try to set up this comment to certain event :
 *       <MIRROR_NORMAL : EVENT_ID>
 *
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * Mirror Enable
 * Mirror Diable
 * Mirror Blur x
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.12.07 (v1.0.0) - First Release.
 * 2016.12.08 (v1.0.1) :
 * - Fixed an issue that events are not displayed in the mirror.
 * - Added a dresser for a decoration.
 */

var Imported = Imported || {};
Imported.RS_MirrorArea = true;

var RS = RS || {};
RS.MirrorArea = RS.MirrorArea || {};
RS.MirrorArea.Params = RS.MirrorArea.Params || {};

function Sprite_Mirror() {
  this.initialize.apply(this, arguments);
}

(function ($) {

  "use strict";

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MirrorArea>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  $.oMirror = JSON.parse(parameters['Mirror'] || '[28, 42, 10, 25, 10, 25]');
  $.oDresser = JSON.parse(parameters['Dresser'] || '[34, 15, 10, -5, 10, 70]');
  $.fBlur = parseFloat(parameters['Blur'] || 0.0);
  $.allImagesVisible = true;

  //============================================================================
  // Game_System
  //============================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
      alias_Game_System_initialize.call(this);
      this._restoreMirrors = null;
  };

  Game_System.prototype.saveMirrors = function (obj) {
      this._restoreMirrors = JsonEx.stringify(obj);
  };

  Game_System.prototype.restoreMirrors = function (raw) {
      return JsonEx.parse(this._restoreMirrors);
  };

  //============================================================================
  // Sprite_Mirror
  //============================================================================

  Sprite_Mirror.prototype = Object.create(Sprite_Character.prototype);
  Sprite_Mirror.prototype.constructor = Sprite_Mirror;

  Sprite_Mirror.prototype.initialize = function (character) {
      Sprite_Character.prototype.initialize.call(this, character);
      this._offset = [0, 0, 0, 0];


      // TODO: Blurring is very poor performance.

      if(Graphics.isWebGL() && ($.fBlur > 0.0)) {
        this._blurFilter = new PIXI.filters.BlurFilter();
        this._blurFilter.blur = $.fBlur;
        this.filters = [this._blurFilter];
        this._initBlur = true;
      }

  };

  Sprite_Mirror.prototype.updateVisibility = function () {
      Sprite_Character.prototype.updateVisibility.call(this);
      this.visible = this.mask && $.allImagesVisible;

      // TODO: Blurring is very poor performance.

      if(this._initBlur && this._blurFilter) {
        this._blurFilter.blur = $.fBlur;
      }

  };

  Sprite_Mirror.prototype.updatePosition = function() {
      //  graphics's height.
      var maskY = this._offset[1];
      this.x = this._character.screenX();
      // this.y = this._character.screenY() - maskY - this._offset[3] / 2;
      this.y = this._character.screenY() - maskY - this._offset[5] / 2;
      this.z = this._character.screenZ() + 4;
      this.updateMask();
  };

  var alias_Sprite_Mirror_characterPatternY = Sprite_Mirror.prototype.characterPatternY;
  Sprite_Mirror.prototype.characterPatternY = function() {
      var idx = alias_Sprite_Mirror_characterPatternY.call(this);
      return (3 ^ idx) === 1 ? 2 : (3 ^ idx) === 2 ? 1 : (3 ^ idx);
  };

  var alias_Sprite_Mirror_destroy = Sprite_Mirror.prototype.destroy;
  Sprite_Mirror.prototype.destroy = function () {
      alias_Sprite_Mirror_destroy.call(this);
      this._maskGraphics = null;
      this._targetEvent = null;
      this.mask = null;
  };

  Sprite_Mirror.prototype.setProperties = function (mask, targetEvent, offset) {
      this._maskGraphics = mask;
      this._targetEvent = targetEvent;
      this._offset = offset;
      this.mask = mask;
  };

  Sprite_Mirror.prototype.updateMask = function () {
      if(this._targetEvent && this._maskGraphics) {
        var x = this._targetEvent.screenX() - $gameMap.tileWidth() / 2 + this._offset[2];
        var y = this._targetEvent.screenY() - $gameMap.tileHeight() - this._offset[3];
        this._maskGraphics.x = x;
        this._maskGraphics.y = y;
      }
  };

  //============================================================================
  // Spriteset_Map
  //============================================================================

  var alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer
  Spriteset_Map.prototype.createLowerLayer = function() {
      alias_Spriteset_Map_createLowerLayer.call(this);
      this.initMirrorMembers();
      this.findAllTypeMirrors();
  };

  Spriteset_Map.prototype.initMirrorMembers = function () {
      this._mirrorCharacters = [];
  };

  var alias_Spriteset_Map_hideCharacters = Spriteset_Map.prototype.hideCharacters;
  Spriteset_Map.prototype.hideCharacters = function() {
      alias_Spriteset_Map_hideCharacters.call(this);
      for (var i = 0; i < this._mirrorCharacters.length; i++) {
          var sprite = this._mirrorCharacters[i];
          if (!sprite.isTile()) {
              sprite.hide();
          }
      }
  };

  Spriteset_Map.prototype.createMirrorImage = function (event, type, id) {

      var offset = [0, 0, 0, 0];
      var target = (id <= 0) ? $gamePlayer : $gameMap.events()[id - 1];

      if(type === 'mirror') offset = $.oMirror;
      if(type === 'dresser') offset = $.oDresser;

      var x = event.screenX() - offset[2];
      var y = event.screenY() - offset[3];
      var w = offset[0];
      var h = offset[1];

      var graphics = new PIXI.Graphics();
      graphics.beginFill(0xffffff, 0.5 );
      graphics.x = x;
      graphics.y = y;
      graphics.drawRoundedRect( 0, 0, w, h, 3 );
      graphics.endFill();

      this.addChild( graphics );

      // TODO: If it creates the sprites for every mirror event, it will call many functions that do not need.
      // So I'll fix them later.

      var mirrorCharacter = new Sprite_Mirror( target );
      mirrorCharacter.setProperties( graphics, event, offset );
      this._mirrorCharacters.push( mirrorCharacter );
      this._tilemap.addChild( mirrorCharacter );

      if(target instanceof Game_Player) {
        $gamePlayer._followers.forEach(function (e, i, a) {
          mirrorCharacter = new Sprite_Mirror( e );
          mirrorCharacter.setProperties( graphics, event, offset );
          this._mirrorCharacters.push( mirrorCharacter );
          this._tilemap.addChild( mirrorCharacter );
        }, this);
      }

  };

  Spriteset_Map.prototype.findAllTypeMirrors = function() {
      var self = this;
      var id = -1;
      $gameMap.events().forEach(function (event) {
        var eventList = event.findProperPageIndex() > -1 && event.list();
        eventList && eventList.forEach(function (list, i ,a) {
          if(list.code === 108 || list.code === 408) {
            if(list.parameters[0].match(/<(?:MIRROR_NORMAL).W*\:.\W*(.+?)>/gi)) {
              id = parseInt(RegExp.$1);
              self.createMirrorImage(event, 'mirror', id);
            } else if(list.parameters[0].match(/<(?:MIRROR_DRESSER).W*\:.\W*(.+?)>/gi)) {
              id = parseInt(RegExp.$1);
              self.createMirrorImage(event, 'dresser', id);
            }
          }
        });
      }, this);
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Mirror") {
        switch(args[0]) {
          case 'Enable':
            $.allImagesVisible = true;
          break;
          case 'Disable':
            $.allImagesVisible = false;
          break;
          case 'Blur':
            $.fBlur = parseFloat(args[1] || 0.0);
          break;
        }
      }
  };

})(RS.MirrorArea.Params);
