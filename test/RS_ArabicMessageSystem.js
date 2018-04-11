/*:
 * @plugindesc right-to-left language support for RMMV <RS_ArabicMessageSystem>
 * @author biud436
 *
 * @param Message Mode
 * @type select
 * @desc this parameter sets up the text direction.
 * default : arabic
 * @default arabic
 * @option Arabic Mode
 * @value arabic
 * @option Normal Mode
 * @value normal
 *
 * @param Arabic Font
 * @desc Choose your font that can indicate Arabic text from your system font folder.
 * @default Simplified Arabic, Times New Roman, Segoe UI
 *
 * @param Font Size
 * @type number
 * @desc Specifies up the text size as integer type.
 * (default : 28)
 * @default 28
 *
 * @param Text Animation
 *
 * @param Text Wait Time
 * @parent Text Animation
 * @type number
 * @desc Specify up the wait time for Arabic texts
 * (1000 Millisecond = 1 Sec)
 * @default 10
 *
 * @param Animated Text
 * @parent Text Animation
 * @type boolean
 * @desc Set whether the text has animated.
 * (Important : The performance may be lower in the mobile)
 * @default false
 * @on Enable
 * @off Disable
 *
 * @param Binder
 * @type note[]
 * @desc Can run the scripts
 * @default ["\"  // YEP_MessageCore\\n  if(Imported.YEP_MessageCore) {\\n\\n    Window_Message.prototype.standardFontFace = function () {\\n      return Window_Base.prototype.standardFontFace.call(this);\\n    };\\n\\n    var alias_Window_NameBox_initialize = Window_NameBox.prototype.initialize;\\n    Window_NameBox.prototype.initialize = function(parentWindow) {\\n      alias_Window_NameBox_initialize.call(this, parentWindow);\\n      RS.ArabicMessageSystem.createArabicLayer.call(this);\\n      RS.ArabicMessageSystem.defineProtoype(Window_NameBox);\\n    };\\n\\n    Window_NameBox.prototype.standardFontFace = function() {\\n      return Window_Base.prototype.standardFontFace.call(this);\\n    };\\n\\n    Window_NameBox.prototype.refresh = function(text, position) {\\n      this.show();\\n      this._lastNameText = text;\\n      this._text = Yanfly.Param.MSGNameBoxText + text;\\n      this._position = position;\\n      this.width = this.windowWidth();\\n      this.createContents();\\n      this.contents.clear();\\n      RS.ArabicMessageSystem.createArabicLayer.call(this);\\n      this.resetFontSettings();\\n      this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));\\n      var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;\\n      this.drawTextEx(this._text, padding, 0);\\n      this._parentWindow.adjustWindowSettings();\\n      this._parentWindow.updatePlacement();\\n      this.adjustPositionX();\\n      this.adjustPositionY();\\n      this.open();\\n      this.activate();\\n      this._closeCounter = 4;\\n      return '';\\n    };\\n  };\"","\"  // YEP_EventMiniLabel\\n  if(Imported.YEP_EventMiniLabel) {\\n    RS.ArabicMessageSystem.defineInitialize(Window_EventMiniLabel);\\n    Window_EventMiniLabel.prototype.textWidthEx = function(text) {\\n      var temp = messageMode.slice(0);\\n      messageMode = 'normal';\\n      var result = Window_Base.prototype.drawTextEx.call(this, text, 0, this.contents.height);\\n      messageMode = temp;\\n      return result;\\n    };\\n  }\\n\"","\"  // YEP_GabWindow\\n  if(Imported.YEP_GabWindow) {\\n    var alias_Window_Gab_initialize = Window_Gab.prototype.initialize;\\n    Window_Gab.prototype.initialize = function(battle) {\\n      alias_Window_Gab_initialize.call(this, battle);\\n      RS.ArabicMessageSystem.createArabicLayer.call(this);\\n      RS.ArabicMessageSystem.defineRefresh(Window_Gab);\\n      RS.ArabicMessageSystem.defineProtoype(Window_Gab);\\n    };\\n\\n    Window_Gab.prototype.standardFontFace = function() {\\n      return Window_Base.prototype.standardFontFace.call(this);\\n    };\\n  }\"","\"  // YEP_ItemCore\\n  if(Imported.YEP_ItemCore) {\\n    var alias_Window_ItemActionCommand_initialize = Window_ItemActionCommand.prototype.initialize;\\n    Window_ItemActionCommand.prototype.initialize = function(x, y) {\\n      alias_Window_ItemActionCommand_initialize.call(this, x, y);\\n      RS.ArabicMessageSystem.createArabicLayer.call(this);\\n    };\\n    Window_ItemActionCommand.prototype.drawAllItems = function() {\\n      RS.ArabicMessageSystem.createArabicLayer.call(this);\\n      var topIndex = this.topIndex();\\n      for (var i = 0; i < this.maxPageItems(); i++) {\\n          var index = topIndex + i;\\n          if (index < this.maxItems()) {\\n              this.drawItem(index);\\n          }\\n      }\\n    };\\n  }\"","\"  // YEP_SaveCore\\n\\n  if(Imported.YEP_SaveCore) {\\n\\n    Window_Base.prototype.drawSvActor = function(actor, x, y) {\\n      var filename = actor.battlerName();\\n      var bitmap = ImageManager.loadSvActor(filename);\\n      var pw = bitmap.width / 9;\\n      var ph = bitmap.height / 6;\\n      var sx = 0;\\n      var sy = 0;\\n      this.contents.RTLblt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);\\n    };\\n\\n    Window_Base.prototype.textWidthEx = function(text) {\\n      var temp = messageMode.slice(0);\\n      messageMode = 'normal';\\n      var result = this.drawTextEx.call(this, text, 0, this.contents.height);\\n      messageMode = temp;\\n      return result;\\n    };\\n\\n    var alias_Window_SaveInfo_initialize = Window_SaveInfo.prototype.initialize;\\n    Window_SaveInfo.prototype.initialize = function(x, y, width, height, mode) {\\n      alias_Window_SaveInfo_initialize.call(this, x, y, width, height, mode);\\n      RS.ArabicMessageSystem.createArabicLayer.call(this);\\n    };\\n\\n    Window_SaveInfo.prototype.refresh = function() {\\n      this.contents.clear();\\n      RS.ArabicMessageSystem.createArabicLayer.call(this);\\n      this.resetFontSettings();\\n      var dy = 0;\\n      dy = this.drawGameTitle(dy);\\n      if (!this._valid) return this.drawInvalidText(dy);\\n      this._saveContents = StorageManager.load(this.savefileId());\\n      this.drawContents(dy);\\n    };\\n\\n    RS.ArabicMessageSystem.defineInitialize(Window_SaveConfirm);\\n\\n  }\"","\"// Specify the symbol name\\nrtlWindowButtonSymbol = \\\"Right to Left\\\";\""]
 *
 * @help
 * =============================================================================
 * Please read this stuff before you begin using this plugin
 * -----------------------------------------------------------------------------
 * This plugin will rewrite everything that is required for Arabic so you will
 * have to notice that it may occur the collision issue with another similar
 * plugin when using this plugin. Please notice to me if it is not working
 * due to the collision issue with another plugin. In that case, I'll react for
 * your comment in some way (This plugin exists purely to help Arabic user or
 * someone else)
 * =============================================================================
 * Text codes
 * -----------------------------------------------------------------------------
 * This text code is available to implement the left-to-right language.
 * \LTR<Hello, World!>
 * =============================================================================
 * Plugin Commands
 * -----------------------------------------------------------------------------
 *
 * This plugin command allows you to indicate by delaying the text in milliseconds
 * and the text is displayed slowly at right to left.
 *
 *    EnableArabicTextAnimation
 *
 * This plugin command allows you to immediately indicate the text without
 * the delay.
 *
 *    DisableArabicTextAnimation
 *
 * =============================================================================
 * Compatibility List
 * -----------------------------------------------------------------------------
 * These are some compatible plugin list that are showing up properly Arabic so
 * if it does not have in this list, it may not work properly.
 *
 * Window_Help
 * Window_Status
 * Window_BattleLog
 * Window_MapName
 * Window_Message
 * Window_Command
 * Window_ScrollText
 * Window_ChoiceList
 * YEP_ItemCore >=1.26
 * YEP_X_ItemUpgradeSlots >=1.07
 * YEP_X_ItemDurability >=1.02
 * YEP_MessageCore >=1.15
 * YEP_X_ExtMesPack1 >=1.10
 * YEP_EventMiniLabel
 * YEP_GabWindow
 * YEP_StatusMenuCore >=1.01a
 *
 * When used the Arabic texts into the custom window object that other people
 * are made, It does not automatically change a text align direction. If you want
 * to be used in another plugin, it must be bound all of required code for
 * Arabic texts into it.
 *
 * If you have problems with other plugin after enabling this plugin,
 * Point your web browser to http://biud436.tistory.com/62 and you'll be in
 * contact with me.
 *
 * =============================================================================
 * Change Log
 * -----------------------------------------------------------------------------
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
 * 2017.06.03 (v1.1.9) - Fixed an issue that is incorrectly displayed a non-character word : !, @, #, $, dot.
 * 2017.06.14 (v1.2.0) :
 * - Added a new feature that can draw the text one by one.
 * 2017.06.14 (v1.2.1) :
 * - Fixed to appear the text slowly at the right to left.
 * - Added plugin commands for animating text.
 * - Fixed an incorrect text padding in command button.
 * 2017.07.13 (v1.2.2) :
 * - When painting the normal text without processing a text code, Fixed an issue that is incorrectly displayed a non-character word : !, @, #, $, dot
 * 2017.08.03 (v1.2.3) :
 * - Fixed the bug that didn't show up a icon when using a text animation option.
 * - Added a feature that can shows up texts fast.
 * 2017.10.29 (v1.2.4) - Added the scripts binder.
 * 2017.12.12 (v1.2.5) :
 * - Fixed the bug of the swap code that changes the message mode as the normal mode when calculating the text width.
 * - Added a feature that changes a text direction in the Game Option.
 * - Added a feature that saves the config of the text direction as file.
 */

var Imported = Imported || {};
Imported.RS_ArabicMessageSystem = '1.2.5';

var RS = RS || {};
RS.ArabicMessageSystem = RS.ArabicMessageSystem || {};
RS.ArabicMessageSystem.alias = RS.ArabicMessageSystem.alias || {};

function ArabicUtils() {
  throw new Error("This is a static class")
};

(function () {

  if(Utils.RPGMAKER_VERSION < '1.5.0') {
    console.warn('Note that RS_ArabicMessageSystem plugin can use only in RMMV v1.5.0 or above.');
    return;
  }

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ArabicMessageSystem>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var messageMode = String(parameters["Message Mode"] || "arabic");
  var arabicFont = String(parameters["Arabic Font"] || "Simplified Arabic, Times New Roman, Segoe UI");

  var useFilters = false;

  var rtlWindowButtonSymbol = "Right to Left";

  RS.ArabicMessageSystem.Params = RS.ArabicMessageSystem.Params || {};
  RS.ArabicMessageSystem.Params.fontSize = parseInt(parameters['Font Size'] || 28);
  RS.ArabicMessageSystem.Params.textWaitTime = parseInt(parameters["Text Wait Time"] || 10);
  RS.ArabicMessageSystem.Params.isAnimatedText = Boolean(parameters["Animated Text"] === 'true');
  RS.ArabicMessageSystem.Params.bindScripts = (function () {
    var src = parameters["Binder"];
    var jsonParse = function (str) {
      var retData = JSON.parse(str, function (k, v) {
        try { return jsonParse(v); } catch (e) { return v; }
      });
      return retData;
    };
    var data = jsonParse(src);
    var items = [];
    if(data instanceof Array) {
        return data;
    }
    return [];
  })();

  //============================================================================
  // ArabicUtils
  // http://www.unicode.org/Public/UNIDATA/Scripts.txt
  //============================================================================

  ArabicUtils.LEFT_TO_RIGHT_EMBEDDING = "\u202A";
  ArabicUtils.RIGHT_TO_LEFT_EMBEDDING = "\u202B";
  ArabicUtils.POP_DIRECTIONAL_FORMATTING = "\u202C";
  ArabicUtils.LEFT_TO_RIGHT_OVERRIDE = "\u202D";
  ArabicUtils.RIGHT_TO_LEFT_OVERRIDE = "\u202E";
  ArabicUtils.LEFT_TO_RIGHT_ISOLATE = "\u2066";
  ArabicUtils.RIGHT_TO_LEFT_ISOLATE = "\u2067";
  ArabicUtils.FIRST_STRONG_ISOLATE = "\u2068";
  ArabicUtils.POP_DIRECTIONAL_ISOLATE = "\u2069";
  ArabicUtils.DefaultEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[!@#$%^&*()_+?]/i;

  ArabicUtils.isArabic = function (text) {
    var pattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFD\uFE70-\uFEFF\u10E600-\u10E7E\u1EE00-\u1EEFF]/;
    return pattern.test(text);
  };

  ArabicUtils.makeText = function (text) {
    return String(ArabicUtils.RIGHT_TO_LEFT_EMBEDDING + text);
  };

  //============================================================================
  // RS.ArabicMessageSystem
  //============================================================================

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

      this._arabicTexts.setTransform( -1 * (this._padding * 2) , 0, -1, 1, 0, 0, 0, this.width, 0);

      this._arabicTexts.visible = true;

      if(this.initWithArabic) {
        this.initWithArabic();
      }

      if(!(this instanceof Window_ScrollText)) {
          this._windowContentsSprite.addChild( this._arabicTexts );
      }
    } else {
      if(this.initWithArabic) {
        this.initWithArabic();
      }
    }
  };

  RS.ArabicMessageSystem.defineProtoype = function (className) {
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

  RS.ArabicMessageSystem.defineInitialize2 = function (className, initializer) {
    var aliasName = 'alias_%1_initialize'.format(className);
    RS.ArabicMessageSystem.alias[aliasName] = className.prototype.initialize;
    className.prototype.initialize = initializer.bind(className.prototype);
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

  //============================================================================
  // Bitmap
  //============================================================================

  var alias_Bitmap_drawText = Bitmap.prototype.drawText;
  Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    var isArabic = ArabicUtils.isArabic(text);
    if(isArabic) {
      var retText = ArabicUtils.makeText(text);
      alias_Bitmap_drawText.call(this, retText, x, y, maxWidth, lineHeight, align);
    } else {
      alias_Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
    }
  };

  Bitmap.prototype.RTLblt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
      dw = dw || sw;
      dh = dh || sh;
      if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
              sx + sw <= source.width && sy + sh <= source.height) {

        // a c e
        // b d f
        // 0 0 1

        var mat = new PIXI.Matrix();
        mat.setTransform(0, 0, sw, 0, -1, 1, 0, 0, 0);
        this._context.setTransform( mat.a, mat.b, mat.c, mat.d, mat.tx, mat.ty );
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        this._context.setTransform(1, 0, 0, 1, 0, 0);
        this._setDirty();
      }
  };

  //============================================================================
  // RS.ArabicFlipFilter
  //============================================================================

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
  //============================================================================

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
  // ArabicTextContainer
  //============================================================================

  function ArabicTextContainer() {
    this.initialize.apply(this, arguments);
  };

  ArabicTextContainer.prototype = Object.create(Sprite.prototype);
  ArabicTextContainer.prototype.constructor = ArabicTextContainer;

  ArabicTextContainer.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.on('next', this.next, this);
  };

  var alias_ArabicTextContainer_destroy = ArabicTextContainer.prototype.destroy;
  ArabicTextContainer.prototype.destroy = function () {
    alias_ArabicTextContainer_destroy.call(this);
    this.off('next', this.next, this);
  };

  ArabicTextContainer.prototype.next = function (child) {
    if(!this.children) return false;
    if(child) {
      var index = this.getChildIndex(child);
      var id = index + 1;
      var nextChild = this.children[id];
      if(nextChild !== undefined && nextChild instanceof ArabicTextSprite) {
        nextChild.emit('startTextAnimation');
      } else {
        nextChild = this.children[++id];
        while(nextChild !== undefined && nextChild instanceof Sprite) {
          nextChild.emit('startTextAnimation');
          nextChild = this.children[++id];
        }
      }
    }
  };

  //============================================================================
  // AtabicTextSprite
  //============================================================================

  function ArabicTextSprite() {
    this.initialize.apply(this, arguments);
  };

  ArabicTextSprite.prototype = Object.create(Sprite.prototype);
  ArabicTextSprite.prototype.constructor = ArabicTextSprite;

  ArabicTextSprite.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.initMembers();
  };

  ArabicTextSprite.prototype.initMembers = function () {

    // when concating the text
    this._isStarted = false;
    this._isFinished = false;
    this._finishedText = ArabicUtils.RIGHT_TO_LEFT_EMBEDDING;
    this._text = [];
    this._tx = 0;
    this._ty = 0;
    this._tMaxWidth = 0;
    this._tLineHeight = 0;
    this._tAlign = "left";
    this._maxTextLength = 0;
    this._iTextNumber = 0;

    this.visible = false;

  };

  ArabicTextSprite.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateContaingText();
  };

  ArabicTextSprite.prototype.updateContaingText = function () {
    if(this._isStarted && performance.now() - this._deltaTime >= RS.ArabicMessageSystem.Params.textWaitTime) {
      this.updateTextAnimation();
      this._deltaTime = performance.now();
    }
  };

  ArabicTextSprite.prototype.textWidth = function (text) {
    return this.bitmap.measureTextWidth(text);
  };

  /**
   * Dealing with a text animation.
   * TODO: This will have to be changed on later because a poor performance.
   * and so there is a bug that is not performed the render method of a last child.
   * @method updateTextAnimation
   */
  ArabicTextSprite.prototype.updateTextAnimation = function () {

    var deltaX = 0;

    // Don't need to always increase (So if the text is already drawn, don't need it)
    if(!this._isFinished) this._iTextNumber++;

    if(this._iTextNumber >= this._maxTextLength && !this._isFinished) {
      this._iTextNumber = this._maxTextLength;

      this._isFinished = true;

      if(this.parent) {
        // Sometimes it is causing a bug at this code.
        this.parent.emit('next', this);
      }

    }

    // Try putting the text until a last text index.
    if(this._text[this._iTextNumber] !== undefined) {
      this._finishedText += this._text[this._iTextNumber];
    }

    this.bitmap.clear();

    // We first compute the size between a first character and the last character.
    deltaX = this.textWidth(this._text) - this.textWidth(this._finishedText);

    if(this._isFinished) {
        this.bitmap.drawText(this._text, this._tx, this._ty, this._tMaxWidth, this._tLineHeight, this._tAlign);
    } else {
        this.bitmap.drawText(this._finishedText, this._tx + deltaX, this._ty, this._tMaxWidth, this._tLineHeight, this._tAlign);
    }

    if(!this.visible) {
      this.visible = true;
    }

  };

  ArabicTextSprite.prototype.startTextAnimation = function (text, x, y, maxWidth, lineHeight, align) {
    this._text = text;
    this._maxTextLength = text.length;
    this._tx = x;
    this._ty = y;
    this._tMaxWidth = maxWidth;
    this._tLineHeight = lineHeight;
    this._tAlign = align || 'left';
    this.on('startTextAnimation', this.onStarted, this);
  };

  ArabicTextSprite.prototype.onStarted = function () {
    this._isStarted = true;
    this._deltaTime = performance.now();
    this.off('startTextAnimation', this.onStarted, this);
  };

  //============================================================================
  // Window_Base
  //============================================================================

  Window_Base.ARAB = {
    READY: -1,
    NEWLINE: 0,
    NEWPAGE: 1,
    ESCAPECODE: 2,
    NORMAL: 3,
    BOX: {
      x: 0,
      text: "",
      image: false
    }
  };

  Window_Base.ARAB_BASE = {
    status: Window_Base.ARAB.READY,
    previousStatus: Window_Base.ARAB.READY,
    dirty: false,
    texts: [],
    index: -1
  };

  var alias_Window_Base_initialize_status = Window_Base.prototype.initialize;
  Window_Base.prototype.initialize = function(x, y, width, height) {
    alias_Window_Base_initialize_status.call(this, x, y, width, height);
    RS.ArabicMessageSystem.createArabicLayer.call(this);
  };

  Window_Base.prototype.createArabicTextBox = function () {
    var newText = Object.create(Window_Base.ARAB.BOX);
    return newText;
  };

  Window_Base.prototype.initWithArabic = function () {
    this.arabic = Object.create(Window_Base.ARAB_BASE);
    this.arabic.status = Window_Base.ARAB.READY;
  };

  var alias_Window_Base_standardFontFace = Window_Base.prototype.standardFontFace;
  Window_Base.prototype.standardFontFace = function() {
    if (messageMode === "arabic" || navigator.language.match(/^ar/)) {
      return arabicFont;
    } else {
      return alias_Window_Base_standardFontFace.call(this);
    }
  };

  Window_Base.prototype.drawTextEx = function(text, x, y) {
      if (text) {
          var textState = { index: 0, x: x, y: y, left: x };

          textState.text = this.convertEscapeCharacters(text);
          textState.height = this.calcTextHeight(textState, false);

          if(messageMode === "arabic") {
            if( y >= this.height - this._padding * 2 ) {
              this.arabic.dirty = true;
            }
          }

          this.resetFontSettings();

          while (textState.index < textState.text.length) {
              this.processCharacter(textState);
          }

          if(messageMode === "arabic") {
            this.arabic.status = Window_Base.ARAB.READY;
            this.arabic.dirty = false;
          }

          return textState.x - x;
      } else {
          return 0;
      }
  };

  var alias_Window_Base_processNewLine_status = Window_Base.prototype.processNewLine;
  Window_Base.prototype.processNewLine = function(textState) {
    alias_Window_Base_processNewLine_status.call(this, textState);
    if(messageMode !== "arabic") return;
    if(this.arabic.status !== Window_Base.ARAB.DISABLE) {
      this.arabic.status = Window_Base.ARAB.NEWLINE;
    }
  };

  var alias_Window_Base_processNewPage_status = Window_Base.prototype.processNewPage;
  Window_Base.prototype.processNewPage = function(textState) {
    alias_Window_Base_processNewPage_status.call(this, textState);
    if(messageMode !== "arabic") return;
    RS.ArabicMessageSystem.createArabicLayer.call(this);
  };

  var alias_Window_Base_processEscapeCharacter_status = Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    alias_Window_Base_processEscapeCharacter_status.call(this, code, textState);
    if(messageMode !== "arabic") return;
    this.arabic.status = Window_Base.ARAB.ESCAPECODE;
  };

  Window_Base.prototype.initWithFirstCharacterPosition = function (textState) {
    var temp = this.createArabicTextBox();
    temp.x = textState.x;
    this.arabic.index += 1;
    this.arabic.texts[this.arabic.index] = temp;
  }

  Window_Base.prototype.processNormalCharacter = function(textState) {

    var c = textState.text[textState.index++];
    var w = this.textWidth(c);

    if(messageMode === "arabic") {

      // 이전 상태 저장
      this.arabic.previousStatus = this.arabic.status;

      // 현재 상태 변경
      this.arabic.status = Window_Base.ARAB.NORMAL;

      // 이전 글자가 특수한 처리였다면, 시작 위치로 설정
      if(this.arabic.previousStatus !== this.arabic.status) {
        this.initWithFirstCharacterPosition(textState);
      }

      // 시작 위치에서 한 문장을 완성할 때까지 재생성...
      var idx = this.arabic.index;
      var box = this.arabic.texts[idx];

      box.text += c;
      box.text = box.text.split("").join("");

      var arabic = this.arabic;
      var maxWidth = this.textWidth(box.text);

      box.text = ArabicUtils.makeText(box.text);
      this.arabic.texts[idx] = box;

      this.createArabicText(box.text, box.x, textState.y, maxWidth * 2, textState.height);

    } else {

      this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);

    }

    textState.x += w;

  };

  Window_Base.prototype.clearArabicText = function (index) {
    if(messageMode !== "arabic") return;
    if(this._arabicTexts.children[index]) {
      this._arabicTexts.removeChildAt(index);
    }
  };

  Window_Base.prototype.copyBitmapToBitmap = function (bitmap) {
    bitmap.fontFace = this.contents.fontFace;
    bitmap.fontSize = this.contents.fontSize;
    bitmap.fontItalic = this.contents.fontItalic;
    bitmap.textColor = this.contents.textColor;
    bitmap.outlineColor = this.contents.outlineColor;
    bitmap.outlineWidth = this.contents.outlineWidth;
  };

  Window_Base.prototype.addArabicText = function (sprite, clear) {
    if(messageMode !== "arabic") return;
    clear = clear || true;
    if(!this._arabicTexts) return;
    if(clear) this.clearArabicText(this.arabic.index);
    this._arabicTexts.addChild(sprite);
  };

  Window_Base.prototype.addArabicImage = function (sprite) {
    if(messageMode !== "arabic") return;
    if(!this._arabicTexts) return;
    var box = this.createArabicTextBox();
    this.arabic.index += 1;
    box.image = true;
    this.arabic.texts[this.arabic.index] = box;
    this._arabicTexts.addChild(sprite);
  };

  Window_Base.prototype.createArabicText = function (text, x, y, maxWidth, lineHeight, align) {
    if(messageMode !== "arabic") return;
    if(ArabicUtils.isArabic(text)) {
      text = ArabicUtils.makeText(text);
    }

    var maxHeight = lineHeight + Math.floor(lineHeight * 0.5);

    var bitmap = new Bitmap(maxWidth, maxHeight);
    var sprite = new Sprite(bitmap);

    var yPad = Math.round(this.contents.fontSize * 0.09);

    // Set by copying the text properties
    this.copyBitmapToBitmap(bitmap);

    // 밖으로 나간거 안보이게 하기
    if(this.arabic.dirty) {
      sprite.visible = false;
    };

    sprite.bitmap.drawText(text, this.textPadding(), yPad, maxWidth, lineHeight, align);

    sprite.setTransform(x, y, -1, 1, 0, 0, 0, (maxWidth / 2), 0);

    this.addArabicText(sprite);

  };

  Window_Base.prototype.isOutBoundedText = function (sprite) {

    var width = this.width - this._padding * 2;
    var height = this.height - this._padding * 2;

    var isHit = false;
    if((sprite.width > this.x) && (sprite.x < width) ) {
      if( (sprite.height > this.y) && (sprite.y < height) ) {
        isHit = true;
      }
    }

    return isHit;

  };

  Window_Base.prototype.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = ArabicUtils.DefaultEscapeCode;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[0].toUpperCase();
    } else {
      return '';
    }
  };

  var alias_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function(code, textState) {

      switch (code) {
      case 'MODE':
        if(this.obtainLTRText(textState) === "arabic") {
          messageMode = "arabic";
        } else {
          messageMode = "normal";
        }
        break;
      case 'LTR':
          if(messageMode === "arabic") {
            this.drawLeftToRightText( this.obtainLTRText(textState), textState );
          }
          break;
      default:
          alias_Window_Base_processEscapeCharacter.call(this, code, textState);
      }

  };

  Window_Base.prototype.obtainLTRText = function(textState) {
      var arr = /^<(.+)>/.exec(textState.text.slice(textState.index));
      if (arr) {
          textState.index += arr[0].length;
          return String(arr[1]);
      } else {
          return '';
      }
  };

  Window_Base.prototype.drawLeftToRightText = function (text, textState) {
    if(messageMode !== "arabic") return;
    var c = ArabicUtils.LEFT_TO_RIGHT_EMBEDDING + text;
    var w = this.textWidth(c);

    this.initWithFirstCharacterPosition(textState);
    this.createArabicText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
  };

  var alias_Window_Base_drawIcon = Window_Base.prototype.drawIcon;
  Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
    if(messageMode === "arabic" && this._arabicTexts) {

      var bitmap = ImageManager.loadSystem('IconSet');

      var pw = Window_Base._iconWidth;
      var ph = Window_Base._iconHeight;

      var sx = iconIndex % 16 * pw;
      var sy = Math.floor(iconIndex / 16) * ph;

      var tempBitmap = new Bitmap(pw, ph);
      var sprite = new Sprite(tempBitmap);

      var pivotX = (pw - 2);
      sprite.setTransform( x, y, -1, 1, 0, 0, 0, pivotX, 0 );

      if(!this.isOutBoundedText(sprite)) {
        sprite.visible = false;
      };

      sprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);

      this.addArabicImage(sprite);

    } else {
      alias_Window_Base_drawIcon.call(this, iconIndex, x, y);
    }
  };

  //============================================================================
  // Window_Selectable
  //============================================================================

  var alias_Window_Selectable_drawAllItems_refresh = Window_Selectable.prototype.drawAllItems;
  Window_Selectable.prototype.drawAllItems = function() {
      if(messageMode !== "arabic") {
        return alias_Window_Selectable_drawAllItems_refresh.call(this);
      }
      RS.ArabicMessageSystem.createArabicLayer.call(this);
      alias_Window_Selectable_drawAllItems_refresh.call(this);
  };

  var alias_Window_Selectable_clearItem_refresh = Window_Selectable.prototype.clearItem;
  Window_Selectable.prototype.clearItem = function(index) {
      alias_Window_Selectable_clearItem_refresh.call(this, index);

      var rect = this.itemRect(index);

      if(messageMode !== "arabic") return;

      if(!this._arabicTexts) return;

      // 범위에 해당하는 것을 찾는다.
      var validGroup = this._arabicTexts.children.filter(function (i) {
        return (i.x >= rect.x && i.x <= rect.width) && (i.y >= rect.y && i.y <= rect.height);
      }, this);

      // 해당 범위에 있는 스프라이트를 모두 제거 한다.
      validGroup.forEach(function (i) {
        this._arabicTexts.removeChild(i);
      }, this);

  };

  //============================================================================
  // Window_Message
  //============================================================================

  var alias_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function() {
    alias_Window_Message_initialize.call(this);
  };

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

  Window_Message.prototype.standardFontSize = function() {
    return RS.ArabicMessageSystem.Params.fontSize;
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
      this._arabicTexts = new ArabicTextContainer();
      this._arabicTexts.visible = true;
      this._windowContentsSprite.addChild( this._arabicTexts );
      this._arabicPause = false;
      this.on('arabicPause', this.onArabicPause, this);
      this.arabic = Object.create(Window_Base.ARAB_BASE);
      this.arabic.status = Window_Base.ARAB.NEWPAGE;
    } else {
      this._windowContentsSprite.pivot.x = 0;
      this._windowContentsSprite.scale.x = 1;
    }
    alias_Window_Message_newPage.call(this, textState);
  };

  var alias_Window_Message_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
  Window_Message.prototype.processNormalCharacter = function(textState) {
    alias_Window_Message_processNormalCharacter.call(this, textState);
    if(!this._showFast) {
      this.startWait(RS.ArabicMessageSystem.Params.textWaitTime);
    }
  };

  Window_Message.prototype.onArabicPause = function () {
    this._arabicPause = true;
    this.off('arabicPause', this.onArabicPause, this);
  };

  var alias_Window_Message_drawIcon = Window_Message.prototype.drawIcon;
  Window_Message.prototype.drawIcon = function(iconIndex, x, y) {
    if(messageMode === "arabic") {

      var bitmap = ImageManager.loadSystem('IconSet');

      var pw = Window_Base._iconWidth;
      var ph = Window_Base._iconHeight;

      var sx = iconIndex % 16 * pw;
      var sy = Math.floor(iconIndex / 16) * ph;

      var tempBitmap = new Bitmap(pw, ph);

      var isAnimatedText = RS.ArabicMessageSystem.Params.isAnimatedText;
      var sprite = new Sprite(tempBitmap);

      sprite.setTransform( x, y, -1, 1, 0, 0, 0, pw - 2, 0 );

      setTimeout(function() {
        sprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
      }, 0);

      if(this._arabicTexts) {
        var box = this.createArabicTextBox();
        this.arabic.index += 1;
        box.image = true;
        this.arabic.texts[this.arabic.index] = box;
        this._arabicTexts.addChild(sprite);
      }

    } else {
      alias_Window_Message_drawIcon.call(this, iconIndex, x, y);
    }
  };

  var alias_Window_Message_drawFace = Window_Message.prototype.drawFace;
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

      var tempBitmap = new Bitmap(pw, ph);
      var sprite = new Sprite(tempBitmap);

      sprite.setTransform( x, y, -1, 1, 0, 0, 0, pw, 0 );
      sprite.bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy);

      if(this._arabicTexts) {
        var box = this.createArabicTextBox();
        this.arabic.index += 1;
        box.image = true;
        this.arabic.texts[this.arabic.index] = box;
        this._arabicTexts.addChild(sprite);
      }

    } else {
      alias_Window_Message_drawFace.call(this, faceName, faceIndex, x, y, width, height);
    }
  };

  var alias_Window_Message_onEndOfText = Window_Message.prototype.onEndOfText;
  Window_Message.prototype.onEndOfText = function() {
    alias_Window_Message_onEndOfText.call(this);
    var isAnimatedText = RS.ArabicMessageSystem.Params.isAnimatedText;
    if(isAnimatedText) {
      var startChild = this._arabicTexts.children[0];
      if(this._arabicTexts && this._arabicTexts.children[0]) {
        startChild.emit('startTextAnimation');
      }
    }
  };

  //============================================================================
  // Window_Command
  //============================================================================

  var alias_Window_Command_drawItem = Window_Command.prototype.drawItem;
  Window_Command.prototype.drawItem = function(index) {
    if(messageMode !== "arabic") {
      return alias_Window_Command_drawItem.call(this, index);
    }
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    if(align !== 'center' && align !== 'right') {
      var x = rect.x + rect.width - this.textWidth(this.commandName(index));
    } else {
      var x = rect.x;
    }
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), x, rect.y, rect.width, align);
  };

  //============================================================================
  // Define Classes
  //============================================================================

  RS.ArabicMessageSystem.defineInitialize2(Window_Help, function (numLines) {
    var aliasName = 'alias_%1_initialize'.format(Window_Help);
    RS.ArabicMessageSystem.alias[aliasName].call(this, numLines);
    RS.ArabicMessageSystem.createArabicLayer.call(this);
  });

  RS.ArabicMessageSystem.defineInitialize(Window_Status);
  RS.ArabicMessageSystem.defineInitialize(Window_BattleLog);
  RS.ArabicMessageSystem.defineInitialize(Window_MapName);

  //============================================================================
  // Script Binder
  //============================================================================
  RS.ArabicMessageSystem.Params.bindScripts.forEach(function (el) {
    try {
      eval(el);
    } catch (e) {
      console.warn(e);
    }
  });

  //============================================================================
  // Window_QuestData
  //============================================================================

  if(Imported.YEP_QuestJournal) {
    Window_QuestData.prototype.refresh = function() {
      if (this._countdown > 0) return;
      this.contents.clear();

      RS.ArabicMessageSystem.createArabicLayer.call(this);

      this._lastOriginY = -200;
      this.origin.y = 0;
      this._allTextHeight = 0;
      if (this._questId > 0) {
        this.drawQuestData();
      } else {
        this.drawEmpty();
      }
    };
  }

  //============================================================================
  // Window_ScrollText
  //============================================================================

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
  //============================================================================

  var alias_Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function(messageWindow) {
    alias_Window_ChoiceList_initialize.call(this, messageWindow);
    if(messageMode === "arabic") {
      RS.ArabicMessageSystem.createArabicLayer.call(this);
      RS.ArabicMessageSystem.defineProtoype(Window_ChoiceList);
    }
  };

  Window_ChoiceList.prototype.textWidthEx = function(text) {
    var temp = messageMode.slice(0);
    messageMode = 'normal';
    var ret = Window_Base.prototype.drawTextEx.call(this, text, 0, this.contents.height);
    messageMode = temp;
    return ret;
  };

  Window_ChoiceList.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    if (this.contents) {
        this.contents.clear();
        if(messageMode === "arabic") {
          RS.ArabicMessageSystem.createArabicLayer.call(this);
        }
        this.drawAllItems();
    }
  };

  //===========================================================================
  // ConfigManager
  //===========================================================================

  Object.defineProperty(ConfigManager, "rtlText", {
    get: function () {
      return messageMode === "arabic";
    },
    set: function (value) {
      messageMode = value === true ? "arabic" : "normal";
    }
  });

  ConfigManager.rtlText = messageMode === "arabic";

  var alias_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = alias_makeData.call(this);
    config.rtlText = ConfigManager.rtlText;
    return config;
  };

  var alias_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    alias_applyData.call(this, config);
    var value = config.rtlText;
    if (value !== undefined) {
      this.rtlText = value;
    } else {
      if(messageMode === "arabic") {
        this.rtlText = true;
      } else {
        this.rtlText = false;
      }
    }
  };

  //===========================================================================
  // Window_Options
  //===========================================================================

  var alias_addVolumeOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function() {
    alias_addVolumeOptions.call(this);
    this.addCommand(rtlWindowButtonSymbol, 'rtlText');
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);

    if(command === "DisableArabicTextAnimation") {
      RS.ArabicMessageSystem.Params.isAnimatedText = false;
    }
    if(command === "EnableArabicTextAnimation") {
      RS.ArabicMessageSystem.Params.isAnimatedText = true;
    }

  };

})();
