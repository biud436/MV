/*:
 * @plugindesc right-to-left language support for RMMV <RS_ArabicMessageSystem>
 * @author biud436
 *
 * @param Message Mode
 * @desc this parameter sets up the text direction.
 * default : arabic
 * @default arabic
 *
 * @param Arabic Font
 * @desc
 * @default Simplified Arabic, Times New Roman, Segoe UI
 *
 * @help
 * =============================================================================
 * Additional Text Code
 * =============================================================================
 * This text code is available to implement the left-to-right language.
 * \LTR<Hello, World!>
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.09.19 (v1.0.0) - First Release.
 * 2016.09.19 (v1.0.1) - Fixed DrawIcon, DrawFace function.
 */

var Imported = Imported || {};
Imported.RS_ArabicMessageSystem = '1.0.1';

(function () {
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ArabicMessageSystem>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var messageMode = String(parameters["Message Mode"] || "arabic");
  var arabicFont = String(parameters["Arabic Font"] || "Simplified Arabic, Times New Roman, Segoe UI");

  /**
   * Alias
   * @method newPage
   * @param {Object} textState
   */
  var alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function(textState) {
    if(messageMode === "arabic" || navigator.language.match(/^ar/)) {
      if(this._arabicTexts) {
        this._windowContentsSprite.removeChild(this._arabicTexts);
        this._arabicTexts = null;
      }
      this._windowContentsSprite.pivot.x = this.contentsWidth();
      this._windowContentsSprite.scale.x = -1;
      this._arabicTexts = new Sprite();
      this._arabicTexts.visible = true;
      this._windowContentsSprite.addChild( this._arabicTexts );
    } else {
      this._windowContentsSprite.pivot.x = 0;
      this._windowContentsSprite.scale.x = 1;
    }
    alias_Window_Message_newPage.call(this, textState);
  };

  var alias_Window_Message_standardFontFace = Window_Message.prototype.standardFontFace;
  Window_Message.prototype.standardFontFace = function() {
    if (messageMode === "arabic" || navigator.language.match(/^ar/)) {
      return arabicFont;
    } else {
      return alias_Window_Message_standardFontFace.call(this);
    }
  };

  /**
   * @method createArabicText
   * @param {String} text
   * @param {Number} x
   * @param {Number} maxWidth
   * @param {lineHeight} lineHeight
   * @param {String} align
   */
  Window_Message.prototype.createArabicText = function (text, x, y, maxWidth, lineHeight, align) {

    // Initialize
    var bitmap = new Bitmap(maxWidth, lineHeight);
    var sprite = new Sprite(bitmap);

    // Set the Text Properties
    bitmap.fontFace = this.contents.fontFace;
    bitmap.fontSize = this.contents.fontSize;
    bitmap.fontItalic = this.contents.fontItalic;
    bitmap.textColor = this.contents.textColor;
    bitmap.outlineColor = this.contents.outlineColor;
    bitmap.outlineWidth = this.contents.outlineWidth;

    // Draw Text
    sprite.bitmap.drawText(text, 0, 0, maxWidth, lineHeight, align);

    // Set Flip Text
    sprite.x = x;
    sprite.y = y;
    sprite.pivot.x = maxWidth / 2;
    sprite.scale.x = -1;

    // Add Child
    this._arabicTexts.addChild(sprite);

  };

  /**
   * Override
   * @method processNormalCharacter
   * @param {Object} textState
   */
  Window_Message.prototype.processNormalCharacter = function(textState) {
    var c = textState.text[textState.index++];
    var w = this.textWidth(c);
    if(messageMode === "arabic") {
      this.createArabicText(c, textState.x, textState.y, w * 2, textState.height);
    } else {
      this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
    }
    textState.x += w;
  };

  /**
   * @method processEscapeCharacter
   * @param {Number} code
   * @param {textState} textState
   */
  var alias_Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {

      switch (code) {
      case 'LTR':
          if(messageMode === "arabic") {
            this.drawLeftToRightText( this.obtainLTRText(textState), textState );
          }
          break;
      default:
          alias_Window_Message_processEscapeCharacter.call(this, code, textState);
      }

  };

  /**
   * @method obtainLTRText
   * @param {Object} textState
   * @return {String} str
   */
  Window_Message.prototype.obtainLTRText = function(textState) {
      var arr = /^<(.+)>/.exec(textState.text.slice(textState.index));
      if (arr) {
          textState.index += arr[0].length;
          return String(arr[1]);
      } else {
          return '';
      }
  };

  /**
   * @method drawLeftToRightText
   * @param {String} text
   * @param {Object} textState
   */
  Window_Message.prototype.drawLeftToRightText = function (text, textState) {
    var c = text;
    var w = this.textWidth(c);
    this.createArabicText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
  };

  /**
   * Performs a block transfer.
   *
   * @method RTLblt
   * @param {Bitmap} source The bitmap to draw
   * @param {Number} sx The x coordinate in the source
   * @param {Number} sy The y coordinate in the source
   * @param {Number} sw The width of the source image
   * @param {Number} sh The height of the source image
   * @param {Number} dx The x coordinate in the destination
   * @param {Number} dy The y coordinate in the destination
   * @param {Number} [dw=sw] The width to draw the image in the destination
   * @param {Number} [dh=sh] The height to draw the image in the destination
   */
  Bitmap.prototype.RTLblt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
      dw = dw || sw;
      dh = dh || sh;
      if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
              sx + sw <= source.width && sy + sh <= source.height) {
        this._context.setTransform(-1, 0, 0, 1, sw, 0);
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        this._context.setTransform(1, 0, 0, 1, 0, 0);
        this._setDirty();
      }
  };

  var original_Window_Message_drawIcon = Window_Message.prototype.drawIcon;
  Window_Message.prototype.drawIcon = function(iconIndex, x, y) {
    if(messageMode === "arabic") {
      var bitmap = ImageManager.loadSystem('IconSet');
      var pw = Window_Base._iconWidth;
      var ph = Window_Base._iconHeight;
      var sx = iconIndex % 16 * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      var tempBitmap = new Bitmap(pw, ph);
      var sprite = new Sprite(tempBitmap);
      sprite.x = x;
      sprite.y = y;
      sprite.pivot.x = pw;
      sprite.scale.x = -1;
      tempBitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
      this._arabicTexts.addChild(sprite);
    } else {
      original_Window_Message_drawIcon.call(this, iconIndex, x, y);
    }
  };

  var original_Window_Message_drawFace = Window_Message.prototype.drawFace;
  Window_Message.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    if(messageMode === "arabic") {
      width = width || Window_Base._faceWidth;
      height = height || Window_Base._faceHeight;
      var bitmap = ImageManager.loadFace(faceName);
      var pw = Window_Base._faceWidth;
      var ph = Window_Base._faceHeight;
      var sw = Math.min(width, pw);
      var sh = Math.min(height, ph);
      var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
      var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
      var sx = faceIndex % 4 * pw + (pw - sw) / 2;
      var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
      this.contents.RTLblt(bitmap, sx, sy, sw, sh, dx, dy);
    } else {
      original_Window_Message_drawFace.call(this, faceName, faceIndex, x, y, width, height);
    }
  };

  String.prototype.toArray = function(){
      return this.split("");
  };

  String.prototype.reverse = function(){
      return this.toArray().reverse().join("");
  };

})();
