/*:
 * RS_AnimatedTitleImage.js
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
 * 2016.10.30 (v1.0.2) :
 * - Fixed the name of the incorrect file.
 * - Fixed the bug that occurs when the main program lost focus.
 */

var Imported = Imported || {};
Imported.AnimatedTitleImage = true;

(function() {

  var alias_Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
      alias_Scene_Boot_loadSystemImages.call(this);
      var parameters = PluginManager.parameters('RS_AnimatedTitleImage');
      var titleFile = parameters['files'].split(/[^\w]/gi);
      var isPreload = Boolean(parameters['preload'] === 'true');
      if(!isPreload) return;
      titleFile.forEach(function(i) {
        ImageManager.loadTitle1(i);
      }, this);
  };

  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function () {
      alias_Scene_Title_create.call(this);
      var parameters = PluginManager.parameters('RS_AnimatedTitleImage');
      this._titleFile = parameters['files'].split(/[^\w]/gi);
      this._nSavingTime = Date.now();
      this._nTitleTime = Number(parameters['time intervals'] || 2);
  };

  var alias_Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function() {
      alias_Scene_Title_update.call(this);
      this.chooseIndex();
  };

  Scene_Title.prototype.isRefresh = function () {
      return Date.now() - this._nSavingTime >= Math.floor(this._nTitleTime * 1000);
  };

  Scene_Title.prototype.chooseIndex = function() {
      if( this.isRefresh() ) {
          this._spriteIndex = (this._nSavingTime % titleFile.length) || 0;
          this._backSprite1.bitmap = ImageManager.loadTitle1(this._titleFile[this._spriteIndex]);
          this._nSavingTime = Date.now();
      }
  };

})();
