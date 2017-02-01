/*:
 * @plugindesc This plugin allows you to except the picture container when applying a KAG filter.
 * @author biud436
 */

var Imported = Imported;
Imported.RS_KAG_PictureFixes = true;

(function() {

var alias_Scene_Map_createMapNameWindow =
    Scene_Map.prototype.createMapNameWindow;
  Scene_Map.prototype.createMapNameWindow = function() {
    alias_Scene_Map_createMapNameWindow.call(this);
    this._pictureContainer = new Sprite();
    this.addChild(this._pictureContainer);
    this._spriteset._pictureContainer.setParent(this._pictureContainer);
  };

})();
