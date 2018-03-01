/*:
 * @plugindesc <RS_ScreenOrientation>
 * @author biud436
 *
 * @param Image
 * @desc Prevent deletion.
 * @default btn_fullscr
 * @require 1
 * @dir img/system
 * @type file
 *
 * @param default orientation
 * @type select
 * @desc landscape, portrait
 * @default landscape
 * @option landscape
 * @option portrait
 *
 * @help
 * =============================================================================
 * Test Devices (테스트 기기)
 * =============================================================================
 * Android Chrome (64.0.3282.137) - Supported (지원)
 * iOS Safari (iPhone8) - Not Supported (미지원)
 * =============================================================================
 * How to setup an image
 * =============================================================================
 * Download an image from
 * https://github.com/biud436/MV/blob/master/docs/images/btn_fullscr.png
 * and then place it in your img/pictures folder.
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2017.02.16 (v1.0.0) - First Release
 * 2018.03.01 (v1.0.1) :
 * - Changed the image and works.
 * - Added the feature that can automatically hide the image when changing the screen orientation is to a landscape.
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
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if(orientation) {
      orientation.lock(parameters["default orientation"]).then(null, function(error) {});
    }
    if(event) event.preventDefault();
  };

  //============================================================================
  // Scene_Title
  //============================================================================

  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function () {
    alias_Scene_Title_create.call(this);
    if(Utils.isMobileDevice()) {
      var userAgent = window.navigator.userAgent;
      if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        // A Safari Mobile is not supported in ScreenOrientation API.
      } else if(userAgent.match(/Chrome/i) || userAgent.match(/Chromium/i) || userAgent.match(/Firefox/i)) {
        this.createFullscreenImage();
      }
    }
  };

  Scene_Title.prototype.createFullscreenImage = function () {
    var div, path, filePath, img, imgName;

    div = document.createElement("div");
    div.id = "div_fullscr";

    imgName = parameters["Image"] + ".png";

    if (Utils.RPGMAKER_VERSION >= "1.6.0" && Utils.isNwjs()) {
      path = require('path');
      var base, root;
      base = path.dirname(process.mainModule.filename);
      root = path.join(base, "img", "pictures");
      filePath = path.join(root, imgName);
    } else {
      filePath = "img/pictures/" + imgName;
    }

    img = new Image();
    img.id = "btn_fullscr";
    img.src = filePath;

    img.width = 96;
    img.height = 96;

    img.addEventListener("click", function (e) {
      Graphics._convertScreenOrientation(e);
    }, false);

    img.addEventListener("touchend", function (e) {
      Graphics._convertScreenOrientation(e);
    }, false);

    div.appendChild(img);
    div.style.zIndex = 98;

    Graphics._centerElement(div);
    document.body.appendChild(div);

    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if(orientation) {
      window.addEventListener("orientationchange", Scene_Title.prototype.onorientationchange.bind(this), false);
    }

    this.on('removed', function () {
      var target_div = document.querySelector("#div_fullscr");
      if(target_div) document.body.removeChild(target_div);
    }, this);
  };

  Scene_Title.prototype.onorientationchange = function () {
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if(!orientation) return;
    if (orientation.type.match(/(?:landscape)/)) {
      var target_div = document.querySelector("#div_fullscr");
      if(target_div) {
        target_div.hidden = true;
      }
    } else {
      var target_div = document.querySelector("#div_fullscr");
      if(target_div) {
        target_div.hidden = false;
      }
    }
  };

})();
