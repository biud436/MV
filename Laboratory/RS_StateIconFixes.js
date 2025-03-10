//================================================================
// RS_StateIconFixes.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:ko
 * @plugindesc 최대 텍스처 사이즈 제한 때문에 상태 아이콘이 그려지지 않는 문제를 해결할 수 있습니다.
 * @author biud436
 * @help
 * 2016.09.05 (v1.0.0) - First Release.
 */
/*:
 * @plugindesc RMMV can occur the error related with MAX_TEXTURE_SIZE when using 16K texture.
 * @author biud436
 * @help
 * In battle, If you were used this plugin, you could use the texture bigger than 16K (2^14) size.
 * But, It can be slow with the animation speed when using 2d context.
 *
 * 2016.09.05 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_StateIconFixes = true;

(function () {
  var alias_Sprite_StateIcon_initMembers =
    Sprite_StateIcon.prototype.initMembers;
  Sprite_StateIcon.prototype.initMembers = function () {
    alias_Sprite_StateIcon_initMembers.call(this);
    this._prevIconIndex = -1;
    this._isAlias = false;
    if (Graphics.isWebGL()) {
      var gl = Graphics._renderer.gl;
      this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
  };

  var alias_Sprite_StateIcon_loadBitmap = Sprite_StateIcon.prototype.loadBitmap;
  Sprite_StateIcon.prototype.loadBitmap = function () {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    if (Graphics.isWebGL()) {
      if (
        this._maxTextureSize - bitmap.height < 0 ||
        this._maxTextureSize - bitmap.width < 0
      ) {
        this.bitmap = new Bitmap(pw, ph);
      } else {
        this._isAlias = true;
        alias_Sprite_StateIcon_loadBitmap.call(this);
      }
    } else {
      this._isAlias = true;
      alias_Sprite_StateIcon_loadBitmap.call(this);
    }
  };

  var alias_Sprite_StateIcon_updateFrame =
    Sprite_StateIcon.prototype.updateFrame;
  Sprite_StateIcon.prototype.updateFrame = function () {
    if (this._prevIconIndex === this._iconIndex) return;
    if (this._isAlias) {
      return alias_Sprite_StateIcon_updateFrame.call(this);
    }
    this._prevIconIndex = this._iconIndex;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    var sx = (this._iconIndex % 16) * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
    this.bitmap.clear();
    this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
  };
})();
