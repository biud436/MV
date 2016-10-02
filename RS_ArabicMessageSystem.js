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
 * 2016.09.20 (v1.1.0) - Fixed Arabic text sturcture.
 * 2016.09.21 (v1.1.1) - Fixed processNormalCharacter function.
 * 2016.09.23 (v1.1.2) - Fixed the window classes that could be displaying
 * the battle log and map name windows, which have used a drawTextEx function in Arabic.
 * 2016.10.02 (v1.1.3) - Fixed the Arabic compatibility issues with the name box for YEP Message Core.
 */

var Imported = Imported || {};
Imported.RS_ArabicMessageSystem = '1.1.3';

var RS = RS || {};
RS.ArabicMessageSystem = RS.ArabicMessageSystem || {};
RS.ArabicMessageSystem.alias = RS.ArabicMessageSystem.alias || {};

(function () {
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ArabicMessageSystem>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var messageMode = String(parameters["Message Mode"] || "arabic");
  var arabicFont = String(parameters["Arabic Font"] || "Simplified Arabic, Times New Roman, Segoe UI");

  //============================================================================
  // Bitmap
  //
  // provides the mirror mode.

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

  //============================================================================
  // RS.ArabicMessageSystem
  //
  // provides the mirror mode.

  RS.ArabicMessageSystem.createArabicLayer = function () {
    if(messageMode === "arabic" || navigator.language.match(/^ar/)) {
      var canvas = document.querySelector('canvas');
      if(canvas.dir !=='rtl') canvas.dir = 'rtl';
      if(this._arabicTexts) {
        this._windowContentsSprite.removeChild( this._arabicTexts );
        this._arabicTexts = null;
      }
      this._arabicTexts = new Sprite();
      this._arabicTexts.pivot.x = this.contentsWidth();
      this._arabicTexts.scale.x = -1;
      this._arabicTexts.visible = true;
      this._windowContentsSprite.addChild( this._arabicTexts );
    }
  };

  RS.ArabicMessageSystem.addArabicText = function (text) {
    if(this._arabicLayer) {
      this._arabicLayer.addChild(text);
    }
  };

  RS.ArabicMessageSystem.removeArabicText = function (text) {
    if(this._arabicLayer) {
      this._arabicLayer.removeChild(text);
    }
  };

  RS.ArabicMessageSystem.defineProtoype = function (className) {
    className.prototype.processNormalCharacter = Window_Message.prototype.processNormalCharacter;
    className.prototype.processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    className.prototype.drawIcon = Window_Message.prototype.drawIcon;
    className.prototype.createArabicText = Window_Message.prototype.createArabicText;
    className.prototype.obtainLTRText = Window_Message.prototype.obtainLTRText;
    className.prototype.drawLeftToRightText = Window_Message.prototype.drawLeftToRightText;
  };

  RS.ArabicMessageSystem.defineInitialize = function (className) {
    var aliasName = 'alias_%1_initialize'.format(className);
    RS.ArabicMessageSystem.alias[aliasName] = className.prototype.initialize;
    className.prototype.initialize = function() {
      RS.ArabicMessageSystem.alias[aliasName].call(this);
      RS.ArabicMessageSystem.createArabicLayer.call(this);
    };
    RS.ArabicMessageSystem.defineRefresh(className);
    RS.ArabicMessageSystem.defineProtoype(className);
  };

  RS.ArabicMessageSystem.defineRefresh = function (className) {
    var aliasRefresh = 'alias_%1_refresh'.format(className);
    RS.ArabicMessageSystem.alias[aliasRefresh] = className.prototype.refresh;
    className.prototype.refresh = function() {
      RS.ArabicMessageSystem.createArabicLayer.call(this);
      RS.ArabicMessageSystem.alias[aliasRefresh].call(this);
    };
  };

  RS.ArabicMessageSystem.defineAlias = function (className) {
    var aliasRefresh = 'alias_%1_refresh'.format(className);
    RS.ArabicMessageSystem.alias[aliasRefresh] = className.prototype.refresh;
    return RS.ArabicMessageSystem.alias[aliasRefresh];
  };

  RS.ArabicMessageSystem.getRealX = function (rect, textWidth, textPadding, align) {
    if(align !== 'center' && align !== 'right') {
      var x = rect.x + rect.width - textWidth + textPadding;
    } else {
      var x = rect.x;
    }
    return x;
  };

  RS.ArabicMessageSystem.getMirrorX = function (width, sx) {
    return Graphics.boxWidth - (Graphics.boxWidth - width - sx);
  };

  //============================================================================
  // Window_Base
  //
  // This provides an escape arabic text.

  var alias_Window_Base_standardFontFace = Window_Base.prototype.standardFontFace;
  Window_Base.prototype.standardFontFace = function() {
    if (messageMode === "arabic" || navigator.language.match(/^ar/)) {
      return arabicFont;
    } else {
      return alias_Window_Base_standardFontFace.call(this);
    }
  };

  //============================================================================
  // Window_Message
  //
  // This provides an escape arabic text.

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
      document.querySelector('canvas').dir = 'rtl';
      this._arabicTexts = new Sprite();
      this._arabicTexts.visible = true;
      this._windowContentsSprite.addChild( this._arabicTexts );
    } else {
      this._windowContentsSprite.pivot.x = 0;
      this._windowContentsSprite.scale.x = 1;
    }
    alias_Window_Message_newPage.call(this, textState);
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
    bitmap._canvas.dir = "rtl";
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

    // Extracting to work a part of the text.
    var szCompositionText = textState.text.slice(textState.index).split('\n');
    var szValidText = szCompositionText[0];
    var szResultText = '', szWhitespace = "";

    // Check the escase character and line break
    for(var i = 0; i < szValidText.length; i++) {
      if(szValidText[i + 1] === '\x1b') {
        szWhitespace = [szValidText.slice(0, i)];
        break;
      }
      if(szValidText[i] === '\r' && szValidText[i + 1] === '\n') {
        szWhitespace = [szValidText.slice(0, i)];
        break;
      }
    }

    // Calculate text index
    if(szWhitespace) {
      textState.index += szWhitespace[0].length + 1;
      szResultText = szWhitespace[0];
    } else {
      szResultText = szValidText;
      textState.index += szValidText.length;
    }

    // Draw Text
    var c = szResultText;
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

  //============================================================================
  // String
  //
  //

  String.prototype.toArray = function(){
      return this.split("");
  };

  String.prototype.reverse = function(){
      return this.toArray().reverse().join("");
  };

  //============================================================================
  // Window_Command
  //
  // This provides a normal arabic text.

  var alias_Window_Command_drawItem = Window_Command.prototype.drawItem;
  Window_Command.prototype.drawItem = function(index) {
    if(messageMode !== "arabic") {
      return alias_Window_Command_drawItem.call(this, index);
    }
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    if(align !== 'center' && align !== 'right') {
      var x = rect.x + rect.width - this.textWidth(this.commandName(index)) + this.textPadding();
    } else {
      var x = rect.x;
    }
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), x, rect.y, rect.width, align);
  };

  //============================================================================
  // Define Classes
  //
  //

  RS.ArabicMessageSystem.defineInitialize(Window_Help);
  RS.ArabicMessageSystem.defineInitialize(Window_Status);
  RS.ArabicMessageSystem.defineInitialize(Window_BattleLog);
  RS.ArabicMessageSystem.defineInitialize(Window_MapName);

  //============================================================================
  // YEP_MessageCore
  //
  //

  if(Imported.YEP_MessageCore) {

    Window_Message.prototype.standardFontFace = function () {
      return Window_Base.prototype.standardFontFace.call(this);
    };

    var alias_Window_NameBox_initialize = Window_NameBox.prototype.initialize;
    Window_NameBox.prototype.initialize = function(parentWindow) {
      alias_Window_NameBox_initialize.call(this, parentWindow);
      RS.ArabicMessageSystem.createArabicLayer.call(this);
      RS.ArabicMessageSystem.defineProtoype(Window_NameBox);
    };

    Window_NameBox.prototype.standardFontFace = function() {
      return Window_Base.prototype.standardFontFace.call(this);
    };

    Window_NameBox.prototype.standardFontSize = function() {
      return Window_Base.prototype.standardFontSize.call(this);
    };

    Window_NameBox.prototype.refresh = function(text, position) {
        this.show();
        this._lastNameText = text;
        this._text = Yanfly.Param.MSGNameBoxText + text;
        this._position = position;
        this.width = this.windowWidth();
        this.createContents();
        this.contents.clear();
        RS.ArabicMessageSystem.createArabicLayer.call(this);
        this.resetFontSettings();
        this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
        var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
        this.drawTextEx(this._text, padding, 0);
        this._parentWindow.adjustWindowSettings();
        this._parentWindow.updatePlacement();
        this.adjustPositionX();
        this.adjustPositionY();
        this.open();
        this.activate();
        this._closeCounter = 4;
        return '';
    };
  }

})();
