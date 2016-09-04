//==============================================================================
// RS_StateIconFixes.js
//==============================================================================
/*:
 * @pluindesc State Icon MAX_TEXTURE_SIZE Error fixed.
 * @author biud436
 */

(function () {

  Sprite_StateIcon.prototype.loadBitmap = function() {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    this.bitmap = new Bitmap(pw, ph);
  };

  Sprite_StateIcon.prototype.updateFrame = function() {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    var sx = this._iconIndex % 16 * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
    this.bitmap.clear();
    this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
  };

})();
