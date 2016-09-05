//==============================================================================
// RS_StateIconFixes.js
//==============================================================================
/*:
 * @plugindesc State Icon MAX_TEXTURE_SIZE Error fixed.
 * @author biud436
 */

(function () {

  var alias_Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
  Sprite_StateIcon.prototype.initMembers = function() {
    alias_Sprite_StateIcon_initMembers.call(this);
    this._prevIconIndex = -1;
    this._isAlias = false;
    if(Graphics.isWebGL()) {
      var gl = Graphics._renderer.gl;
      this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
  };

  var alias_Sprite_StateIcon_loadBitmap = Sprite_StateIcon.prototype.loadBitmap;
  Sprite_StateIcon.prototype.loadBitmap = function() {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    if(Graphics.isWebGL()) {
      if( (this._maxTextureSize - bitmap.height) < 0 ||
          (this._maxTextureSize - bitmap.width) < 0
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

  var alias_Sprite_StateIcon_updateFrame = Sprite_StateIcon.prototype.updateFrame;
  Sprite_StateIcon.prototype.updateFrame = function() {
    if(this._prevIconIndex === this._iconIndex) return;
    if(this._isAlias) {
      return alias_Sprite_StateIcon_updateFrame.call(this);
    }
    this._prevIconIndex = this._iconIndex;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    var sx = this._iconIndex % 16 * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
    this.bitmap.clear();
    this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
  };

})();
