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
 * 2017.02.16 (v1.0.1) - Fixed bugs
 */

var Imported = Imported || {};
Imported.ScreenOrientation = true;

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenOrientation>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var tempEvent;

  //============================================================================
  // Graphics
  //============================================================================

  Graphics._convertScreenOrientation = function (event) {
    Graphics._requestFullScreen();
    if(!!window.screen.orientation) {
      screen.orientation.lock(parameters["default orientation"]).then(null, function(error) {});
    }
    if(event) event.preventDefault();
  };

  //============================================================================
  // Scene_Boot
  //============================================================================

  var alias_Scene_Boot_loadSystemImagese = Scene_Boot.loadSystemImages;
  Scene_Boot.loadSystemImages = function() {
    alias_Scene_Boot_loadSystemImagese.call(this);
    var preload = ImageManager.loadSystem(parameters['Fullscreen Image']);
  };

  //============================================================================
  // Scene_Title
  //============================================================================

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
    this._requestFullscreenButton = new Sprite_FullscreenButton();
    this._requestFullscreenButton.bitmap = bitmap;
    this._requestFullscreenButton.setColdFrame(0, 0, w, h);
    this._requestFullscreenButton.setHotFrame(w, 0, w, h);
    this._requestFullscreenButton.setClickHandler(function (event) {
      Graphics._convertScreenOrientation(event);
    }.bind(this));
    document.addEventListener('touchstart', this.executeButtonTouches.bind(this));
    this._requestFullscreenButton.x = Graphics.boxWidth - w - pad;
    this._requestFullscreenButton.y = pad;
    this.addChild(this._requestFullscreenButton);
  };

  Scene_Title.prototype.executeButtonTouches = function (event) {
    this._requestFullscreenButton.callClickHandler(event);
  };

  var alias_Scene_Title_terminate = Scene_Title.prototype.terminate;
  Scene_Title.prototype.terminate = function () {
    alias_Scene_Title_terminate.call(this);
    if(this._requestFullscreenButton) {
      document.removeEventListener('touchstart', this.executeButtonTouches.bind(this));
      this.removeChild(this._requestFullscreenButton);
    }
  };

  //============================================================================
  // Sprite_FullscreenButton
  //============================================================================

  function Sprite_FullscreenButton() {
      this.initialize.apply(this, arguments);
  }

  Sprite_FullscreenButton.prototype = Object.create(Sprite_Button.prototype);
  Sprite_FullscreenButton.prototype.constructor = Sprite_FullscreenButton;

  Sprite_FullscreenButton.prototype.initialize = function() {
    Sprite_Button.prototype.initialize.call(this);
    this._executeCallbck = false;
  };

  Sprite_FullscreenButton.prototype.destroy = function () {
    Sprite_Button.prototype.destroy.call(this);
  };

  Sprite_FullscreenButton.prototype.update = function() {
    this.updateFrame();
    this.processTouch();
  };

  Sprite_FullscreenButton.prototype.processTouch = function() {
      if (this.isActive()) {
          if (TouchInput.isTriggered() && this.isButtonTouched()) {
              this._touching = true;
              this._executeCallbck = true;
          }
          if (this._touching) {
              if (TouchInput.isReleased() || !this.isButtonTouched()) {
                  this._touching = false;
                  if (TouchInput.isReleased()) {
                      this._executeCallbck = true;
                  }
              }
          }
      } else {
          this._touching = false;
          this._executeCallbck = false;
      }
  };

  Sprite_FullscreenButton.prototype.callClickHandler = function(event) {
      setTimeout(function () {
        if (this._clickHandler && this._executeCallbck) {
            this._clickHandler(event);
            this._executeCallbck = false;
        }
      }.bind(this), 0);
  };

})();
