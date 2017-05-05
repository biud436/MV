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
 * Arabic Message System with YEP_MessageCore
 * =============================================================================
 * YEP_MessageCore.js - v1.15
 * YEP_X_ExtMesPack1.js - v1.10
 * YEP_StatusMenuCore.js - v1.01a
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
 * 2016.10.23 (v1.1.4) : Fixed the bug that is not working in RMMV 1.3.2 or more.
 * - Fixed the issue that the scrolling text is not working.
 * - Fixed the issue that YEP Message Core is not working.
 * 2016.10.24 (v1.1.5) - Fixed the renderCanvas function in Scroll Text
 * 2016.11.26 (v1.1.6) - Added certain code to remove the texture from memory.
 * 2017.01.06 (v1.1.7) :
 * - Supported YEP_GabWindow plugin
 * - Supported YEP_EventMiniLabel plugin
 * - Fixed the processNormalCharacter method.
 * 2017.05.05 (v1.1.8) - Fixed the issue that does not properly show up Arabic when using a choice window.
 */

var Imported = Imported || {};
Imported.RS_ArabicMessageSystem = '1.1.8';

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

  var useFilters = false;

  //============================================================================
  // Bitmap
  //
  // provides the mirror mode.

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
  // RS.ArabicFlipFilter
  //
  //

  RS.ArabicFlipFilter = function () {

    var defaultVertexSrc = [
      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',

      'uniform mat3 projectionMatrix;',

      'varying vec2 vTextureCoord;',

      'void main(void)',
      '{',
          'gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
          'vTextureCoord = aTextureCoord;',
      '}      '
    ].join('\n');

    var fragmentSrc = [
      'uniform mediump float;',
      'varying vec2 vTextureCoord;',
      'uniform sampler2D uSampler;',
      'uniform vec2 offset;',
      'uniform float dir;',

      'void main(void)',
      '{',
      '  vec2 flip = vec4(vTextureCoord, 0.0, 0.0).xy;',
      '  if(dir == 1.0) {',
      '    flip.y = 1.0 - flip.y;',
      '  } else if(dir == 2.0) {',
      '    flip.x = 1.0 - flip.x;',
      '  }',
      '  gl_FragColor = texture2D(uSampler, flip + offset);',
      '}      '
    ].join('\n');
    PIXI.Filter.call( this, defaultVertexSrc, fragmentSrc );
    this.uniforms.dir = 2;
    this.uniforms.offset = {'x': 0.0, 'y': 0.0};
  };

  RS.ArabicFlipFilter.prototype = Object.create( PIXI.Filter.prototype );
  RS.ArabicFlipFilter.prototype.constructor = RS.ArabicFlipFilter;

  Object.defineProperties(RS.ArabicFlipFilter.prototype, {
      direction: {
        get: function() {
            return this.uniforms.dir;
        },
        set: function(value) {
            this.uniforms.dir = value;
        }
      },
      offsetX: {
        get: function() {
            return this.uniforms.offset.x;
        },
        set: function(value) {
            this.uniforms.offset.x = 1 / value;;
        }
      }
    });

  //============================================================================
  // ArabicFlipSprite
  //
  //

  function ArabicFlipSprite() {
    this.initialize.apply(this, arguments);
  }

  ArabicFlipSprite.prototype = Object.create(Sprite.prototype);
  ArabicFlipSprite.prototype.constructor = ArabicFlipSprite;

  ArabicFlipSprite.prototype.initialize = function (bitmap) {
    this._offset = new Point();
    Sprite.prototype.initialize.call(this, bitmap);
    this._isMessageAracbic = false;
    if(Graphics.isWebGL()) {
      this.filters = [Sprite.voidFilter];
    }
  };

  ArabicFlipSprite.prototype.createAracbicFilter = function () {
    if(Graphics.isWebGL()) {
      this._arabicFlipFilter = new RS.ArabicFlipFilter();
      this._arabicFlipFilter.dir = 2;
      this.filters = [this._arabicFlipFilter];
      this.filterArea = new PIXI.Rectangle(this.x, this.y, Graphics.boxWidth, Graphics.boxHeight);
    }
  };

  ArabicFlipSprite.prototype._refresh = function() {
      var frameX = Math.floor(this._frame.x);
      var frameY = Math.floor(this._frame.y);
      var frameW = Math.floor(this._frame.width);
      var frameH = Math.floor(this._frame.height);
      var bitmapW = this._bitmap ? this._bitmap.width : 0;
      var bitmapH = this._bitmap ? this._bitmap.height : 0;
      var realX = frameX.clamp(0, bitmapW);
      var realY = frameY.clamp(0, bitmapH);
      var realW = (frameW - realX + frameX).clamp(0, bitmapW - realX);
      var realH = (frameH - realY + frameY).clamp(0, bitmapH - realY);

      this._realFrame.x = realX;
      this._realFrame.y = realY;
      this._realFrame.width = realW;
      this._realFrame.height = realH;
      if(this._isMessageAracbic) {
        this.pivot.x = frameW - frameX - realX;
      } else {
        this.pivot.x = frameX - realX;
      }
      this.pivot.y = frameY - realY;

      if (realW > 0 && realH > 0) {
          if (this._needsTint()) {
              this._createTinter(realW, realH);
              this._executeTint(realX, realY, realW, realH);
              this._tintTexture.update();
              this.texture.baseTexture = this._tintTexture;
              this.texture.frame = new Rectangle(0, 0, realW, realH);
          } else {
              if (this._bitmap) {
                  this.texture.baseTexture = this._bitmap.baseTexture;
              }
              this.texture.frame = this._realFrame;
          }
      } else if (this._bitmap) {
          this.texture.frame = Rectangle.emptyRectangle;
      } else {
          //TODO: remove this
          this.texture.baseTexture.width = Math.max(this.texture.baseTexture.width, this._frame.x + this._frame.width);
          this.texture.baseTexture.height = Math.max(this.texture.baseTexture.height, this._frame.y + this._frame.height);
          this.texture.frame = this._frame;
      }
      this.texture._updateID++;
  };

  Object.defineProperties(ArabicFlipSprite.prototype, {
    'offsetX': {
     get: function () {
       if(this._arabicFlipFilter) {
         return this._arabicFlipFilter.offsetX;
       }
     },
     set: function (value) {
       if(this._arabicFlipFilter) {
         this._arabicFlipFilter.offsetX = value;
       }
     }
   }
  });

  //============================================================================
  // Window_ArabicView
  //
  //

  function Window_ArabicView() {
    this.initialize.apply(this, arguments);
  }

  Window_ArabicView.prototype = Object.create(Window.prototype);
  Window_ArabicView.prototype.constructor = Window_ArabicView;

  Window_ArabicView.prototype.initialize = function() {
    Window.prototype.initialize.call(this);
  };

  Window_ArabicView.prototype._createAllParts = function() {
    this._windowSpriteContainer = new PIXI.Container();
    this._windowBackSprite = new Sprite();
    this._windowCursorSprite = new Sprite();
    this._windowFrameSprite = new Sprite();
    this._windowContentsSprite = new ArabicFlipSprite();
    this._downArrowSprite = new Sprite();
    this._upArrowSprite = new Sprite();
    this._windowPauseSignSprite = new Sprite();
    this._windowBackSprite.bitmap = new Bitmap(1, 1);
    this._windowBackSprite.alpha = 192 / 255;
    this.addChild(this._windowSpriteContainer);
    this._windowSpriteContainer.addChild(this._windowBackSprite);
    this._windowSpriteContainer.addChild(this._windowFrameSprite);
    this.addChild(this._windowCursorSprite);
    this.addChild(this._windowContentsSprite);
    this.addChild(this._downArrowSprite);
    this.addChild(this._upArrowSprite);
    this.addChild(this._windowPauseSignSprite);
  };

  //============================================================================
  // RS.ArabicMessageSystem
  //
  //

  RS.ArabicMessageSystem.createArabicLayer = function () {
    if(messageMode === "arabic" || navigator.language.match(/^ar/)) {
      var canvas = document.querySelector('canvas');
      if(canvas.dir !=='rtl') canvas.dir = 'rtl';
      if(this._arabicTexts) {
        this._windowContentsSprite.removeChild( this._arabicTexts );
        this._arabicTexts = null;
      }
      this._arabicTexts = new ArabicFlipSprite();
      this._arabicTexts._isMessageAracbic = true;
      this._arabicTexts.pivot.x = this.contentsWidth();
      this._arabicTexts.scale.x = -1;
      this._arabicTexts.visible = true;
      if(!(this instanceof Window_ScrollText)) {
          this._windowContentsSprite.addChild( this._arabicTexts );
      }
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

  // Flip Horizontal
  RS.ArabicMessageSystem.setFlipHorizontal = function (target, b) {
    if(b) {
      target.scale.x *= -1;
      target.x += target.width * target.scale;
    }
  };

  // Flip Vertical
  RS.ArabicMessageSystem.setFlipVertical = function (target, b) {
    if(b) {
      target.scale.y *= -1;
      target.y += target.height * target.scale;
    }
  };

  /**
   * @method sandboxExec
   * @param {Object} this
   * @param {Function} function
   * @param {args} args1, args2, args...
   */
  RS.ArabicMessageSystem.sandboxExec = function () {
    messageMode = 'normal';
    var self = arguments[0];
    if(typeof arguments[1] === 'function') {
      var func = arguments[1];
      var args = arguments.slice(2);
      func.apply(self, args);
    }
    messageMode = 'arabic';
  };

  /**
   * @method findWindowClasses
   * @return {Array} resultWindowClasses
   */
  RS.ArabicMessageSystem.findWindowClasses = function () {
    var allWindowObjects = Object.keys(window);
    var resultWindowClasses = allWindowObjects.filter(function(i) {
      return i.includes("Window_")
    });
    return resultWindowClasses;
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

  Window_Message.prototype._createAllParts = function() {
    this._windowSpriteContainer = new PIXI.Container();
    this._windowBackSprite = new Sprite();
    this._windowCursorSprite = new Sprite();
    this._windowFrameSprite = new Sprite();
    this._windowContentsSprite = new ArabicFlipSprite();
    this._downArrowSprite = new Sprite();
    this._upArrowSprite = new Sprite();
    this._windowPauseSignSprite = new Sprite();
    this._windowBackSprite.bitmap = new Bitmap(1, 1);
    this._windowBackSprite.alpha = 192 / 255;
    this.addChild(this._windowSpriteContainer);
    this._windowSpriteContainer.addChild(this._windowBackSprite);
    this._windowSpriteContainer.addChild(this._windowFrameSprite);
    this.addChild(this._windowCursorSprite);
    this.addChild(this._windowContentsSprite);
    this.addChild(this._downArrowSprite);
    this.addChild(this._upArrowSprite);
    this.addChild(this._windowPauseSignSprite);
  };

  var alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function(textState) {
    if(messageMode === "arabic" || navigator.language.match(/^ar/)) {
      if(this._arabicTexts) {
        this._windowContentsSprite.removeChild(this._arabicTexts);
        this._arabicTexts = null;
      }
      this._windowContentsSprite.pivot.x = this.contentsWidth();
      this._windowContentsSprite.scale.x = -1;
      this._windowContentsSprite._isMessageAracbic = true;
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

  Window_Message.prototype.processNormalCharacter = function(textState) {

    // Extracting to work a part of the text.
    var szCompositionText = textState.text.slice(textState.index).split('\n');
    var szValidText = szCompositionText[0];
    var szResultText = '', szWhitespace = "";

    // Check the escase character and line break
    for(var i = 0; i < szValidText.length; i++) {
      if(szValidText[i + 1] === '\x1b') {
        szWhitespace = [szValidText.slice(0, i + 1)];
        break;
      }
      if(szValidText[i] === '\r' && szValidText[i + 1] === '\n') {
        szWhitespace = [szValidText.slice(0, i)];
        break;
      }
    }

    // Calculate text index
    if(szWhitespace) {
      textState.index += szWhitespace[0].length;
      szResultText = szWhitespace[0].substr(0);
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

  Window_Message.prototype.obtainLTRText = function(textState) {
      var arr = /^<(.+)>/.exec(textState.text.slice(textState.index));
      if (arr) {
          textState.index += arr[0].length;
          return String(arr[1]);
      } else {
          return '';
      }
  };

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
  };

  //============================================================================
  // YEP_EventMiniLabel
  //
  //

  if(Imported.YEP_EventMiniLabel) {
    RS.ArabicMessageSystem.defineInitialize(Window_EventMiniLabel);
    Window_EventMiniLabel.prototype.textWidthEx = function(text) {
      messageMode = 'normal';
      var result = Window_Base.prototype.drawTextEx.call(this, text, 0, this.contents.height);
      messageMode = 'arabic';
      return result;
    };
    Window_EventMiniLabel.prototype.refresh = function() {
      if (Imported.YEP_SelfSwVar) {
        $gameTemp.setSelfSwVarEvent(this._character._mapId, this._character._eventId);
      }
      this.contents.clear();
      var txWidth = this.textWidthEx(this._text);
      txWidth += this.textPadding() * 2;
      var width = txWidth;
      this.width = Math.max(width, Yanfly.Param.EMWMinWidth);
      this.width += this.standardPadding() * 2;
      this.height = this.windowHeight();
      this.createContents();
      var wx = (this.contents.width - txWidth) / 2;
      var wy = 0;
      this.drawTextEx(this._text, wx + this.textPadding(), wy);
      if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvent();
    };
  }

  //============================================================================
  // YEP_GabWindow
  //
  //

  if(Imported.YEP_GabWindow) {
    RS.ArabicMessageSystem.defineInitialize(Window_Gab);
    Window_Gab.prototype.standardFontFace = function() {
      return Window_Base.prototype.standardFontFace.call(this);
    };
  }

  //============================================================================
  // Window_ScrollText
  //
  //

  RS.ArabicMessageSystem.defineInitialize(Window_ScrollText);

  var alias_Window_ScrollText_initialize = Window_ScrollText.prototype.initialize;
  Window_ScrollText.prototype.initialize = function() {
    alias_Window_ScrollText_initialize.call(this);

    var self = this;
    var gl = Graphics._renderer.gl;

    // Create RenderTexture
    self._renderTexture = PIXI.RenderTexture.create(self.width,
                                                    self.height,
                                                    PIXI.SCALE_MODES.NEAREST);

    // Create RenderTarget
    if(Graphics.isWebGL()) {
      self._renderTarget = new PIXI.RenderTarget(gl, self.width,
                                                    self.height,
                                                    PIXI.SCALE_MODES.NEAREST);
    } else {
      self._renderTarget = new PIXI.CanvasRenderTarget(self.width, self.height);
    }

    // Create Sprite
    self._renderSprite = new Sprite();

  };

  var alias_Window_ScrollText_standardFontFace = Window_ScrollText.prototype.standardFontFace;
  Window_ScrollText.prototype.standardFontFace = function() {
    if (messageMode === "arabic" || navigator.language.match(/^ar/)) {
      return arabicFont;
    } else {
      return alias_Window_Base_standardFontFace.call(this);
    }
  };

  var alias_Window_ScrollText_update = Window_ScrollText.prototype.update;
  Window_ScrollText.prototype.update = function () {
    alias_Window_ScrollText_update.call(this);
    if(this._arabicTexts && this._arabicTexts.visible) {
      this._arabicTexts.pivot.y = this.origin.y;
    }
  };

  var alias_Window_ScrollText_destroy = Window_ScrollText.prototype.destroy;
  Window_ScrollText.prototype.destroy = function (options) {
    if(alias_Window_ScrollText_destroy) alias_Window_ScrollText_destroy.call(this, options);
    if( this._renderTexture ) this._renderTexture.destroy({ destroyBase: true });
    if( this._renderSprite ) this._renderSprite.destroy({ children: true });
    if( this._renderTarget ) this._renderTarget.destroy();
    this._renderTexture = null;
    this._renderSprite = null;
    this._renderTarget = null;
  };

  var alias_Window_ScrollText_renderCanvas = Window_ScrollText.prototype.renderCanvas;
  Window_ScrollText.prototype.renderCanvas = function (renderer) {

    if (!this.visible || !this.renderable) {
        return;
    }

    var layers = this.children;
    for (var i = 0; i < layers.length; i++)
        layers[i].renderCanvas(renderer);

    if(this._arabicTexts && this._arabicTexts.parent !== this) {
      this._arabicTexts.setParent(this);
    }

    for (var i = 0; i <this._arabicTexts.children.length; i++ ) {
      var child = this._arabicTexts.children[i];
      if(child) renderer.plugins.sprite.render(child);
    }

  };

  Window_ScrollText.prototype.renderWebGL = function (renderer) {
    if(!this.visible || !this.renderable) {
      return;
    }

    renderer.bindRenderTexture(this._renderTexture);

    for(var i = 0; i < this.children.length; ++i) {
        var child = this.children[i];
        if(child.visible) renderer.render(child, this._renderTexture);
    }

    if(this._arabicTexts.visible) renderer.render(this._arabicTexts, this._renderTexture);

    renderer.bindRenderTarget(this._renderTarget);

    if(this._arabicTexts.visible) {
      this._renderSprite.texture = this._renderTexture;
    }

  };

  //============================================================================
  // Window_ChoiceList
  //
  //

  var alias_Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function(messageWindow) {
    alias_Window_ChoiceList_initialize.call(this, messageWindow);
    RS.ArabicMessageSystem.createArabicLayer.call(this);
    RS.ArabicMessageSystem.defineProtoype(Window_ChoiceList);
  };

  Window_ChoiceList.prototype.textWidthEx = function(text) {
    messageMode = 'normal';
    var ret = Window_Base.prototype.drawTextEx.call(this, text, 0, this.contents.height);
    messageMode = 'arabic';
    return ret;
  };

  Window_ChoiceList.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    if (this.contents) {
        this.contents.clear();
        RS.ArabicMessageSystem.createArabicLayer.call(this);
        this.drawAllItems();
    }
  };

})();
