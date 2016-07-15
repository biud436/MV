/*:
 * RS_ChangeTitle.js
 * @plugindesc This plugin changes a title screen image at specific time intervals.
 * @author biud436
 * @date 2015.11.09
 *
 * @param files
 * @desc Write the list of the title screen image. (Distinguish to the blank)
 * @default Book Castle CrossedSwords Crystal DemonCastle
 *
 * @param time intervals
 * @desc redraw the title screen image at specific time intervals.
 * @default 2
 *
 * @param preload
 * @desc Decides whether it will be preloading title images.
 * @default true
 *
 * @help
 * This plugin changes a title screen image at specific time intervals.
 *
 * - Change Log
 * 2015.11.09 (v1.0.0) - First Release.
 * 2016.07.16 (v1.0.1) - Added the plugin parameter that could be decided
 * whether it will be preloading title images.
 */

var Imported = Imported || {};
Imported.RS_ChangeTitle = true;

(function() {

  var parameters = PluginManager.parameters('RS_ChangeTitle');
  var titleFile = (function() {
    return parameters['files'].split(/[^\w]/gi);
  })();
  var titleTime = Number(parameters['time intervals'] || 2);
  var isPreload = Boolean(parameters['preload'] === 'true');

  var _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    _Scene_Boot_loadSystemImages.call(this);
    if(!isPreload) return;
    titleFile.forEach(function(i) {
      ImageManager.loadTitle1(i);
    }, this);
  };

  var _Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function() {
    _Scene_Title_update.call(this);
    this.chooseIndex();
  };

  if(!!Graphics) {
    Graphics.frameRate = function() {
      return Graphics._fpsMeter.fps || 60;
    }
  }

  Scene_Title.prototype.getTime = function() {
    return ((Graphics.frameCount / Graphics.frameRate() ) | 0);
  };

  Scene_Title.prototype.chooseIndex = function() {
    if(this.getTime() % titleTime > 0) return;
    this._spriteIndex = (this.getTime() % titleFile.length) || 0;
    this._backSprite1.bitmap = ImageManager.loadTitle1(titleFile[this._spriteIndex]);
  };

})();
