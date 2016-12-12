/*:
 * @plugindesc Big Character Screen Z-Coordinates Control <RS_BigCharacterScreenZControl>
 * @author biud436
 *
 * @param Region ID
 * @desc
 * @default 128
 *
 * @help
 * 2016.12.12 (v1.0.0) - First Release
 */

var Imported = Imported || {};
var RS = RS || {};

Imported.RS_BigCharacterScreenZControl = true;

RS.BigCharacterScreenZControl = RS.BigCharacterScreenZControl || {};
RS.BigCharacterScreenZControl.Params = RS.BigCharacterScreenZControl.Params || {};

(function($) {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_BigCharacterScreenZControl>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  $.regionId = parseInt(parameters['Region ID'] || 128);

  Sprite_Character.prototype.isBigCharacterHasPattern = function() {
      return this.patternHeight() > $gameMap.tileHeight() && !this._tileId > 0;
  };

  Sprite_Character.prototype.isBigCharacterHasRegion = function() {
      return this._character.regionId() >= $.regionId;
  };

  Sprite_Character.prototype.updatePosition = function() {
      this.x = this._character.screenX();
      this.y = this._character.screenY();
      if(this.isBigCharacterHasPattern() && this.isBigCharacterHasRegion()) {
        this.z = this._character.screenZ() + $gameMap.tileHeight();
      } else {
        this.z = this._character.screenZ();
      }
  };

})(RS.BigCharacterScreenZControl.Params);
