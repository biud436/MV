/*:
 * @plugindesc This plugin allows you to except the picture container when applying a KAG filter.
 * @author biud436
 * @help
 * ===============================================================================================
 * Change Log
 * ===============================================================================================
 * 2017.02.03 (v1.0.1) - Added calling a removeChild function for resolving memory leak in scene terminate process.
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

  var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    alias_Scene_Map_terminate.call(this);
    if(this._pictureContainer) this.removeChild(this._pictureContainer);
  };

})();
