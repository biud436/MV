/*:
 * @plugindesc <RS_ScreenOrientation>
 * @author biud436
 *
 * @param Fullscreen Image
 * @desc
 * @default fullscreen
 * @require 1
 * @dir img/system
 * @type file
 *
 * @param default orientation
 * @desc landscape, portrait
 * @default landscape
 *
 * @help
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2017.02.15 (v1.0.0) - First Release
 */

var Imported = Imported || {};
Imported.ScreenOrientation = true;

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenOrientation>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  Graphics._convertScreenOrientation = function (event) {
    Graphics._requestFullScreen();
    if(!!window.screen.orientation) {
      screen.orientation.lock(parameters["default orientation"]).then(null, function(error) {});
    }
    if(event) event.preventDefault();
    document.removeEventListener('touchstart', Graphics._convertScreenOrientation);
  };

  var alias_Scene_Boot_loadSystemImagese = Scene_Boot.loadSystemImages;
  Scene_Boot.loadSystemImages = function() {
    alias_Scene_Boot_loadSystemImagese.call(this);
    var preload = ImageManager.loadSystem(parameters['Fullscreen Image']);
    document.addEventListener('touchstart', Graphics._convertScreenOrientation);
  };

  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function () {
    alias_Scene_Title_create.call(this);
    if(Utils.isMobileDevice()) {
      this.createFullscreenImage();
    }
  };

  Scene_Title.prototype.createFullscreenImage = function () {
    var bitmap = ImageManager.loadSystem(parameters['Fullscreen Image']);
    var w = bitmap.width / 2;
    var h = bitmap.height;
    var pad = 10;
    this._requestFullscreenButton = new Sprite_Button();
    this._requestFullscreenButton.bitmap = bitmap;
    this._requestFullscreenButton.setColdFrame(0, 0, w, h);
    this._requestFullscreenButton.setHotFrame(w, 0, w, h);
    this._requestFullscreenButton.setClickHandler(function () {
      Graphics._convertScreenOrientation();
      this.removeChild(this._requestFullscreenButton);
      this._requestFullscreenButton = null;
    }.bind(this));
    this._requestFullscreenButton.x = Graphics.boxWidth - w - pad;
    this._requestFullscreenButton.y = pad;
    this.addChild(this._requestFullscreenButton);
  };

  var alias_Scene_Title_terminate = Scene_Title.prototype.terminate;
  Scene_Title.prototype.terminate = function () {
    alias_Scene_Title_terminate.call(this);
    if(this._requestFullscreenButton) this.removeChild(this._requestFullscreenButton);
  };

})();
