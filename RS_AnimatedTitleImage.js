/*:
 * RS_AnimatedTitleImage.js
 * @plugindesc This plugin changes a title screen image at specific time intervals.
 * @author biud436
 * @date 2015.11.09
 *
 * @param Title Image 1
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 2
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default Castle
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 3
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default CrossedSwords
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 4
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default Crystal
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 5
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default DemonCastle
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 6
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 7
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 8
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 9
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Title Image 10
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Time Intervals
 * @desc redraw the title screen image at specific time intervals.
 * @default 2
 *
 * @param Preload
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
 * 2017.06.08 (v1.0.3) :
 * - Fixed the bug that is not working in RMMV 1.5.0
 */

var Imported = Imported || {};
var RS = RS || {};
RS.AnimatedTitleImage = RS.AnimatedTitleImage || {};
Imported.AnimatedTitleImage = true;

(function() {

  var parameters = PluginManager.parameters('RS_AnimatedTitleImage');
  RS.AnimatedTitleImage.Params = RS.AnimatedTitleImage.Params || {};
  RS.AnimatedTitleImage.Params.isPreload = Boolean(parameters['Preload'] === 'true');
  RS.AnimatedTitleImage.Params.images = [];
  RS.AnimatedTitleImage.Params.iTimeIntervals = Number(parameters['Time Intervals'] || 2);

  Object.keys(parameters).forEach(function(e,i,a) {
    if(e.indexOf('Title Image') != -1) {
      RS.AnimatedTitleImage.Params.images.push(parameters[e]);
    }
  }, this);

  var alias_Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    alias_Scene_Boot_loadSystemImages.call(this);
    if(!RS.AnimatedTitleImage.Params.isPreload) return;
    RS.AnimatedTitleImage.Params.images.forEach(function(i) {
      ImageManager.loadTitle1(i);
    }, this);
  };

  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function () {
    alias_Scene_Title_create.call(this);
    this._titleFile = RS.AnimatedTitleImage.Params.images.filter(function (e) {
      return !!e;
    }, this);
    this._nSavingTime = Date.now();
    this._nTitleTime = RS.AnimatedTitleImage.Params.iTimeIntervals;
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
        this._spriteIndex = (this._nSavingTime % this._titleFile.length) || 0;
        this._backSprite1.bitmap = ImageManager.loadTitle1(this._titleFile[this._spriteIndex]);
        this._nSavingTime = Date.now();
    }
  };

})();
