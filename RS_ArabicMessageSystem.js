/* eslint-disable prefer-rest-params */
/* eslint-disable-next-line prefer-spread */
//================================================================
// RS_ArabicMessageSystem.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
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

(() => {
  'use strict';

  const Imported = window.Imported || {};
  const RS = window.RS || {};

  Imported.RS_ArabicMessageSystem = '1.2.5';

  RS.ArabicMessageSystem = RS.ArabicMessageSystem || {};
  RS.ArabicMessageSystem.alias = RS.ArabicMessageSystem.alias || {};

  let parameters = $plugins.filter(i => {
    return i.description.contains('<RS_ArabicMessageSystem>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  let messageMode = String(parameters['Message Mode'] || 'arabic');
  const arabicFont = String(
    parameters['Arabic Font'] || 'Simplified Arabic, Times New Roman, Segoe UI'
  );

  const rtlWindowButtonSymbol = 'Right to Left';

  RS.ArabicMessageSystem.Params = RS.ArabicMessageSystem.Params || {};
  RS.ArabicMessageSystem.Params.fontSize = parseInt(
    parameters['Font Size'] || 28,
    10
  );
  RS.ArabicMessageSystem.Params.textWaitTime = parseInt(
    parameters['Text Wait Time'] || 10,
    10
  );
  RS.ArabicMessageSystem.Params.isAnimatedText = Boolean(
    parameters['Animated Text'] === 'true'
  );
  RS.ArabicMessageSystem.Params.bindScripts = (function () {
    const src = parameters.Binder;
    const jsonParse = function (str) {
      const retData = JSON.parse(str, (k, v) => {
        try {
          return jsonParse(v);
        } catch (e) {
          return v;
        }
      });
      return retData;
    };
    const data = jsonParse(src);
    if (data instanceof Array) {
      return data;
    }
    return [];
  })();

  //============================================================================
  // ArabicUtils
  // http://www.unicode.org/Public/UNIDATA/Scripts.txt
  //============================================================================

  function ArabicUtils() {
    throw new Error('This is a static class');
  }

  ArabicUtils.LEFT_TO_RIGHT_EMBEDDING = '\u202A';
  ArabicUtils.RIGHT_TO_LEFT_EMBEDDING = '\u202B';
  ArabicUtils.POP_DIRECTIONAL_FORMATTING = '\u202C';
  ArabicUtils.LEFT_TO_RIGHT_OVERRIDE = '\u202D';
  ArabicUtils.RIGHT_TO_LEFT_OVERRIDE = '\u202E';
  ArabicUtils.LEFT_TO_RIGHT_ISOLATE = '\u2066';
  ArabicUtils.RIGHT_TO_LEFT_ISOLATE = '\u2067';
  ArabicUtils.FIRST_STRONG_ISOLATE = '\u2068';
  ArabicUtils.POP_DIRECTIONAL_ISOLATE = '\u2069';

  ArabicUtils.isArabic = function (text) {
    const pattern =
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFD\uFE70-\uFEFF\u10E600-\u10E7E\u1EE00-\u1EEFF]/;
    return pattern.test(text);
  };

  ArabicUtils.makeText = function (text) {
    return String(ArabicUtils.RIGHT_TO_LEFT_EMBEDDING + text);
  };

  window.ArabicUtils = ArabicUtils;

  //============================================================================
  // RS.ArabicMessageSystem
  //============================================================================

  RS.ArabicMessageSystem.createArabicLayer = function () {
    if (messageMode === 'arabic' || navigator.language.match(/^ar/)) {
      const canvas = document.querySelector('canvas');
      if (canvas.dir !== 'rtl') canvas.dir = 'rtl';
      if (this._arabicTexts) {
        this._windowContentsSprite.removeChild(this._arabicTexts);
        this._arabicTexts = null;
      }
      this._arabicTexts = new ArabicFlipSprite();
      this._arabicTexts._isMessageAracbic = true;
      this._arabicTexts.pivot.x = this.contentsWidth() - this.textPadding();
      this._arabicTexts.scale.x = -1;
      this._arabicTexts.visible = true;

      if (!(this instanceof Window_ScrollText)) {
        this._windowContentsSprite.addChild(this._arabicTexts);
      }
    }
  };

  RS.ArabicMessageSystem.defineProtoype = function () {};

  RS.ArabicMessageSystem.defineInitialize = function (className) {
    const aliasName = 'alias_%1_initialize'.format(className);
    RS.ArabicMessageSystem.alias[aliasName] = className.prototype.initialize;
    className.prototype.initialize = function () {
      RS.ArabicMessageSystem.alias[aliasName].call(this);
      RS.ArabicMessageSystem.createArabicLayer.call(this);
    };
    RS.ArabicMessageSystem.defineRefresh(className);
    RS.ArabicMessageSystem.defineProtoype(className);
  };

  RS.ArabicMessageSystem.defineInitialize2 = function (className, initializer) {
    const aliasName = 'alias_%1_initialize'.format(className);
    RS.ArabicMessageSystem.alias[aliasName] = className.prototype.initialize;
    className.prototype.initialize = initializer.bind(className.prototype);
    RS.ArabicMessageSystem.defineRefresh(className);
    RS.ArabicMessageSystem.defineProtoype(className);
  };

  RS.ArabicMessageSystem.defineRefresh = function (className) {
    const aliasRefresh = 'alias_%1_refresh'.format(className);
    RS.ArabicMessageSystem.alias[aliasRefresh] = className.prototype.refresh;
    className.prototype.refresh = function () {
      RS.ArabicMessageSystem.createArabicLayer.call(this);
      RS.ArabicMessageSystem.alias[aliasRefresh].call(this);
    };
  };

  RS.ArabicMessageSystem.defineAlias = function (className) {
    const aliasRefresh = 'alias_%1_refresh'.format(className);
    RS.ArabicMessageSystem.alias[aliasRefresh] = className.prototype.refresh;
    return RS.ArabicMessageSystem.alias[aliasRefresh];
  };

  //============================================================================
  // Bitmap
  //============================================================================

  const alias_Bitmap_drawText = Bitmap.prototype.drawText;
  Bitmap.prototype.drawText = function (
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    align
  ) {
    const isArabic = ArabicUtils.isArabic(text);
    if (isArabic) {
      const retText = ArabicUtils.makeText(text);
      alias_Bitmap_drawText.call(
        this,
        retText,
        x,
        y,
        maxWidth,
        lineHeight,
        align
      );
    } else {
      alias_Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
    }
  };

  Bitmap.prototype.RTLblt = function (source, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw || sw;
    dh = dh || sh;
    if (
      sx >= 0 &&
      sy >= 0 &&
      sw > 0 &&
      sh > 0 &&
      dw > 0 &&
      dh > 0 &&
      sx + sw <= source.width &&
      sy + sh <= source.height
    ) {
      this._context.setTransform(-1, 0, 0, 1, sw, 0);
      this._context.globalCompositeOperation = 'source-over';
      this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
      this._context.setTransform(1, 0, 0, 1, 0, 0);
      this._setDirty();
    }
  };

  //============================================================================
  // ArabicFlipSprite
  //============================================================================

  function ArabicFlipSprite(...args) {
    // eslint-disable-next-line prefer-spread
    this.initialize.apply(this, args);
  }

  ArabicFlipSprite.prototype = Object.create(Sprite.prototype);
  ArabicFlipSprite.prototype.constructor = ArabicFlipSprite;

  ArabicFlipSprite.prototype.initialize = function (bitmap) {
    this._offset = new Point();
    Sprite.prototype.initialize.call(this, bitmap);
    this._isMessageAracbic = false;
    if (Graphics.isWebGL()) {
      this.filters = [Sprite.voidFilter];
    }
  };

  ArabicFlipSprite.prototype._refresh = function () {
    const frameX = Math.floor(this._frame.x);
    const frameY = Math.floor(this._frame.y);
    const frameW = Math.floor(this._frame.width);
    const frameH = Math.floor(this._frame.height);
    const bitmapW = this._bitmap ? this._bitmap.width : 0;
    const bitmapH = this._bitmap ? this._bitmap.height : 0;
    const realX = frameX.clamp(0, bitmapW);
    const realY = frameY.clamp(0, bitmapH);
    const realW = (frameW - realX + frameX).clamp(0, bitmapW - realX);
    const realH = (frameH - realY + frameY).clamp(0, bitmapH - realY);

    this._realFrame.x = realX;
    this._realFrame.y = realY;
    this._realFrame.width = realW;
    this._realFrame.height = realH;
    if (this._isMessageAracbic) {
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
      this.texture.baseTexture.width = Math.max(
        this.texture.baseTexture.width,
        this._frame.x + this._frame.width
      );
      this.texture.baseTexture.height = Math.max(
        this.texture.baseTexture.height,
        this._frame.y + this._frame.height
      );
      this.texture.frame = this._frame;
    }
    this.texture._updateID++;
  };

  Object.defineProperties(ArabicFlipSprite.prototype, {
    offsetX: {
      get() {
        if (this._arabicFlipFilter) {
          return this._arabicFlipFilter.offsetX;
        }
        return 0;
      },
      set(value) {
        if (this._arabicFlipFilter) {
          this._arabicFlipFilter.offsetX = value;
        }
      },
    },
  });

  //============================================================================
  // ArabicTextContainer
  //============================================================================

  function ArabicTextContainer() {
    // eslint-disable-next-line prefer-spread
    this.initialize.apply(this, arguments);
  }

  ArabicTextContainer.prototype = Object.create(Sprite.prototype);
  ArabicTextContainer.prototype.constructor = ArabicTextContainer;

  ArabicTextContainer.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.on('next', this.next, this);
  };

  const alias_ArabicTextContainer_destroy =
    ArabicTextContainer.prototype.destroy;
  ArabicTextContainer.prototype.destroy = function () {
    alias_ArabicTextContainer_destroy.call(this);
    this.off('next', this.next, this);
  };

  // eslint-disable-next-line consistent-return
  ArabicTextContainer.prototype.next = function (child) {
    if (!this.children) return false;
    if (child) {
      const index = this.getChildIndex(child);
      let id = index + 1;
      let nextChild = this.children[id];
      if (nextChild !== undefined && nextChild instanceof ArabicTextSprite) {
        nextChild.emit('startTextAnimation');
      } else {
        nextChild = this.children[++id];
        while (nextChild !== undefined && nextChild instanceof Sprite) {
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
    // eslint-disable-next-line prefer-spread
    this.initialize.apply(this, arguments);
  }

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
    this._tAlign = 'left';
    this._maxTextLength = 0;
    this._iTextNumber = 0;

    this.visible = false;
  };

  ArabicTextSprite.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateContaingText();
  };

  ArabicTextSprite.prototype.updateContaingText = function () {
    if (
      this._isStarted &&
      performance.now() - this._deltaTime >=
        RS.ArabicMessageSystem.Params.textWaitTime
    ) {
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
    let deltaX = 0;

    // Don't need to always increase (So if the text is already drawn, don't need it)
    if (!this._isFinished) this._iTextNumber++;

    if (this._iTextNumber >= this._maxTextLength && !this._isFinished) {
      this._iTextNumber = this._maxTextLength;

      this._isFinished = true;

      if (this.parent) {
        // Sometimes it is causing a bug at this code.
        this.parent.emit('next', this);
      }
    }

    // Try putting the text until a last text index.
    if (this._text[this._iTextNumber] !== undefined) {
      this._finishedText += this._text[this._iTextNumber];
    }

    this.bitmap.clear();

    // We first compute the size between a first character and the last character.
    deltaX = this.textWidth(this._text) - this.textWidth(this._finishedText);

    if (this._isFinished) {
      this.bitmap.drawText(
        this._text,
        this._tx,
        this._ty,
        this._tMaxWidth,
        this._tLineHeight,
        this._tAlign
      );
    } else {
      this.bitmap.drawText(
        this._finishedText,
        this._tx + deltaX,
        this._ty,
        this._tMaxWidth,
        this._tLineHeight,
        this._tAlign
      );
    }

    if (!this.visible) {
      this.visible = true;
    }
  };

  ArabicTextSprite.prototype.startTextAnimation = function (
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    align
  ) {
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

  const alias_Window_Base_standardFontFace =
    Window_Base.prototype.standardFontFace;
  Window_Base.prototype.standardFontFace = function () {
    if (messageMode === 'arabic' || navigator.language.match(/^ar/)) {
      return arabicFont;
    }

    return alias_Window_Base_standardFontFace.call(this);
  };

  Window_Base.prototype.createArabicText = function (
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    align
  ) {
    // Initialize
    if (ArabicUtils.isArabic(text)) {
      text = ArabicUtils.makeText(text);
    }

    const maxHeight = lineHeight + Math.floor(lineHeight * 0.5);
    const bitmap = new Bitmap(maxWidth, maxHeight);
    const sprite = new Sprite(bitmap);

    const yPad = Math.round(this.contents.fontSize * 0.09);

    // Set by copying the text properties
    bitmap.fontFace = this.contents.fontFace;
    bitmap.fontSize = this.contents.fontSize;
    bitmap.fontItalic = this.contents.fontItalic;
    bitmap.textColor = this.contents.textColor;
    bitmap.outlineColor = this.contents.outlineColor;
    bitmap.outlineWidth = this.contents.outlineWidth;

    sprite.bitmap.drawText(text, 0, yPad, maxWidth, lineHeight, align);

    // Set Flip Text
    sprite.x = x;
    sprite.y = y;
    sprite.pivot.x = maxWidth / 2;
    sprite.scale.x = -1;

    // Add Child
    if (this._arabicTexts) this._arabicTexts.addChild(sprite);
  };

  Window_Base.prototype.processNormalCharacter = function (textState) {
    const szCompositionText = textState.text
      .slice(textState.index++)
      .split('\n');
    const szValidText = szCompositionText[0];

    const [szResultText] = szValidText.split('\x1b');
    textState.index += szResultText.length - 1;

    // Draw Text
    const c = szResultText;
    const w = this.textWidth(c);

    if (messageMode === 'arabic') {
      this.createArabicText(
        c,
        textState.x,
        textState.y,
        w * 2,
        textState.height
      );
    } else {
      this.contents.drawText(
        c,
        textState.x,
        textState.y,
        w * 2,
        textState.height
      );
    }

    textState.x += w;
  };

  const alias_Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
      case 'LTR':
        if (messageMode === 'arabic') {
          this.drawLeftToRightText(this.obtainLTRText(textState), textState);
        }
        break;
      default:
        alias_Window_Base_processEscapeCharacter.call(this, code, textState);
    }
  };

  Window_Base.prototype.obtainLTRText = function (textState) {
    const arr = /^<(.+)>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    }

    return '';
  };

  Window_Base.prototype.drawLeftToRightText = function (text, textState) {
    const c = ArabicUtils.LEFT_TO_RIGHT_EMBEDDING + text;
    const w = this.textWidth(c);
    this.createArabicText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
  };

  const alias_Window_Base_drawIcon = Window_Base.prototype.drawIcon;
  Window_Base.prototype.drawIcon = function (iconIndex, x, y) {
    if (messageMode === 'arabic' && this._arabicTexts) {
      const bitmap = ImageManager.loadSystem('IconSet');

      const pw = Window_Base._iconWidth;
      const ph = Window_Base._iconHeight;

      const sx = (iconIndex % 16) * pw;
      const sy = Math.floor(iconIndex / 16) * ph;

      const tempBitmap = new Bitmap(pw, ph);
      const sprite = new Sprite(tempBitmap);

      sprite.x = x;
      sprite.y = y;
      sprite.pivot.x = pw - 2;
      sprite.scale.x = -1;

      sprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);

      this._arabicTexts.addChild(sprite);
    } else {
      alias_Window_Base_drawIcon.call(this, iconIndex, x, y);
    }
  };

  //============================================================================
  // Window_Message
  //============================================================================

  const alias_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function () {
    alias_Window_Message_initialize.call(this);
  };

  Window_Message.prototype._createAllParts = function () {
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

  Window_Message.prototype.standardFontSize = function () {
    return RS.ArabicMessageSystem.Params.fontSize;
  };

  const alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function (textState) {
    if (messageMode === 'arabic' || navigator.language.match(/^ar/)) {
      if (this._arabicTexts) {
        this._windowContentsSprite.removeChild(this._arabicTexts);
        this._arabicTexts = null;
      }
      this._windowContentsSprite.pivot.x = this.contentsWidth();
      this._windowContentsSprite.scale.x = -1;
      this._windowContentsSprite._isMessageAracbic = true;
      document.querySelector('canvas').dir = 'rtl';
      this._arabicTexts = new ArabicTextContainer();
      this._arabicTexts.visible = true;
      this._windowContentsSprite.addChild(this._arabicTexts);
      this._arabicPause = false;
      this.on('arabicPause', this.onArabicPause, this);
    } else {
      this._windowContentsSprite.pivot.x = 0;
      this._windowContentsSprite.scale.x = 1;
    }
    alias_Window_Message_newPage.call(this, textState);
  };

  Window_Message.prototype.createArabicText = function (
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    align
  ) {
    // Initialize
    text = ArabicUtils.makeText(text);

    const maxHeight = lineHeight + Math.floor(lineHeight * 0.5);
    const bitmap = new Bitmap(maxWidth, maxHeight);
    const isAnimatedText =
      RS.ArabicMessageSystem.Params.isAnimatedText && !this._showFast;
    const sprite =
      isAnimatedText === true
        ? new ArabicTextSprite(bitmap)
        : new Sprite(bitmap);

    const thresholdValue = 0.09;
    const yPad = Math.round(this.contents.fontSize * thresholdValue);

    // Set by copying the text properties
    bitmap.fontFace = this.contents.fontFace;
    bitmap.fontSize = this.contents.fontSize;
    bitmap.fontItalic = this.contents.fontItalic;
    bitmap.textColor = this.contents.textColor;
    bitmap.outlineColor = this.contents.outlineColor;
    bitmap.outlineWidth = this.contents.outlineWidth;

    // Set Flip Text
    sprite.x = x;
    sprite.y = y;
    sprite.pivot.x = maxWidth / 2;
    sprite.scale.x = -1;

    if (isAnimatedText) {
      sprite.startTextAnimation(text, 0, yPad, maxWidth, lineHeight, align);
    } else {
      sprite.bitmap.drawText(text, 0, yPad, maxWidth, lineHeight, align);
    }

    // Add Child
    if (this._arabicTexts) this._arabicTexts.addChild(sprite);
  };

  const alias_Window_Message_processNormalCharacter =
    Window_Message.prototype.processNormalCharacter;
  Window_Message.prototype.processNormalCharacter = function (textState) {
    alias_Window_Message_processNormalCharacter.call(this, textState);
    if (!this._showFast) {
      this.startWait(RS.ArabicMessageSystem.Params.textWaitTime);
    }
  };

  Window_Message.prototype.onArabicPause = function () {
    this._arabicPause = true;
    this.off('arabicPause', this.onArabicPause, this);
  };

  const alias_Window_Message_drawIcon = Window_Message.prototype.drawIcon;
  Window_Message.prototype.drawIcon = function (iconIndex, x, y) {
    if (messageMode === 'arabic') {
      const bitmap = ImageManager.loadSystem('IconSet');

      const pw = Window_Base._iconWidth;
      const ph = Window_Base._iconHeight;

      const sx = (iconIndex % 16) * pw;
      const sy = Math.floor(iconIndex / 16) * ph;

      const tempBitmap = new Bitmap(pw, ph);

      const sprite = new Sprite(tempBitmap);

      sprite.x = x;
      sprite.y = y;
      sprite.pivot.x = pw - 2;
      sprite.scale.x = -1;

      setTimeout(() => {
        sprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
      }, 0);

      if (this._arabicTexts) {
        this._arabicTexts.addChild(sprite);
      }
    } else {
      alias_Window_Message_drawIcon.call(this, iconIndex, x, y);
    }
  };

  const alias_Window_Message_drawFace = Window_Message.prototype.drawFace;
  Window_Message.prototype.drawFace = function (
    faceName,
    faceIndex,
    x,
    y,
    width,
    height
  ) {
    if (messageMode === 'arabic') {
      width = width || Window_Base._faceWidth;
      height = height || Window_Base._faceHeight;
      const bitmap = ImageManager.loadFace(faceName);
      const pw = Window_Base._faceWidth;
      const ph = Window_Base._faceHeight;
      const sw = Math.min(width, pw);
      const sh = Math.min(height, ph);
      const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
      const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
      const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
      const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
      this.contents.RTLblt(bitmap, sx, sy, sw, sh, dx, dy);
    } else {
      alias_Window_Message_drawFace.call(
        this,
        faceName,
        faceIndex,
        x,
        y,
        width,
        height
      );
    }
  };

  const alias_Window_Message_onEndOfText = Window_Message.prototype.onEndOfText;
  Window_Message.prototype.onEndOfText = function () {
    alias_Window_Message_onEndOfText.call(this);
    const { isAnimatedText } = RS.ArabicMessageSystem.Params;
    if (isAnimatedText) {
      const startChild = this._arabicTexts.children[0];
      if (this._arabicTexts && this._arabicTexts.children[0]) {
        startChild.emit('startTextAnimation');
      }
    }
  };

  //============================================================================
  // Window_Command
  //============================================================================

  const alias_Window_Command_drawItem = Window_Command.prototype.drawItem;
  Window_Command.prototype.drawItem = function (index) {
    if (messageMode !== 'arabic') {
      alias_Window_Command_drawItem.call(this, index);
      return;
    }
    const rect = this.itemRectForText(index);
    const align = this.itemTextAlign();
    let x = 0;
    if (align !== 'center' && align !== 'right') {
      x = rect.x + rect.width - this.textWidth(this.commandName(index));
    } else {
      x = rect.x;
    }
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), x, rect.y, rect.width, align);
  };

  //============================================================================
  // Define Classes
  //============================================================================

  RS.ArabicMessageSystem.defineInitialize2(Window_Help, function (numLines) {
    const aliasName = 'alias_%1_initialize'.format(Window_Help);
    RS.ArabicMessageSystem.alias[aliasName].call(this, numLines);
    RS.ArabicMessageSystem.createArabicLayer.call(this);
  });

  RS.ArabicMessageSystem.defineInitialize(Window_Status);
  RS.ArabicMessageSystem.defineInitialize(Window_BattleLog);
  RS.ArabicMessageSystem.defineInitialize(Window_MapName);

  //============================================================================
  // Script Binder
  //============================================================================
  RS.ArabicMessageSystem.Params.bindScripts.forEach(el => {
    try {
      // eslint-disable-next-line no-eval
      eval(el);
    } catch (e) {
      console.warn(e);
    }
  });

  //============================================================================
  // Window_ScrollText
  //============================================================================

  RS.ArabicMessageSystem.defineInitialize(Window_ScrollText);

  const alias_Window_ScrollText_initialize =
    Window_ScrollText.prototype.initialize;
  Window_ScrollText.prototype.initialize = function () {
    alias_Window_ScrollText_initialize.call(this);

    const self = this;
    const { gl } = Graphics._renderer;

    // Create RenderTexture
    self._renderTexture = PIXI.RenderTexture.create(
      self.width,
      self.height,
      PIXI.SCALE_MODES.NEAREST
    );

    // Create RenderTarget
    if (Graphics.isWebGL()) {
      self._renderTarget = new PIXI.RenderTarget(
        gl,
        self.width,
        self.height,
        PIXI.SCALE_MODES.NEAREST
      );
    } else {
      self._renderTarget = new PIXI.CanvasRenderTarget(self.width, self.height);
    }
  };

  Window_ScrollText.prototype.standardFontFace = function () {
    if (messageMode === 'arabic' || navigator.language.match(/^ar/)) {
      return arabicFont;
    }

    return alias_Window_Base_standardFontFace.call(this);
  };

  const alias_Window_ScrollText_update = Window_ScrollText.prototype.update;
  Window_ScrollText.prototype.update = function () {
    alias_Window_ScrollText_update.call(this);
    if (this._arabicTexts && this._arabicTexts.visible) {
      this._arabicTexts.pivot.y = this.origin.y;
    }
  };

  const alias_Window_ScrollText_destroy = Window_ScrollText.prototype.destroy;
  Window_ScrollText.prototype.destroy = function (options) {
    if (alias_Window_ScrollText_destroy)
      alias_Window_ScrollText_destroy.call(this, options);
    if (this._renderTexture) this._renderTexture.destroy({ destroyBase: true });
    if (this._renderTarget) this._renderTarget.destroy();
    this._renderTexture = null;
    this._renderTarget = null;
  };

  Window_ScrollText.prototype.renderCanvas = function (renderer) {
    if (!this.visible || !this.renderable) {
      return;
    }

    const layers = this.children;
    for (let i = 0; i < layers.length; i++) layers[i].renderCanvas(renderer);

    if (this._arabicTexts && this._arabicTexts.parent !== this) {
      this._arabicTexts.setParent(this);
    }

    for (let i = 0; i < this._arabicTexts.children.length; i++) {
      const child = this._arabicTexts.children[i];
      if (child) renderer.plugins.sprite.render(child);
    }
  };

  Window_ScrollText.prototype.renderWebGL = function (renderer) {
    if (!this.visible || !this.renderable) {
      return;
    }

    renderer.bindRenderTexture(this._renderTexture);

    const len = this._children.length;
    for (let i = 0; i < len; ++i) {
      const child = this.children[i];
      if (child.visible) renderer.render(child, this._renderTexture);
    }

    const isVisible = this._arabicTexts.visible;
    if (isVisible) renderer.render(this._arabicTexts, this._renderTexture);

    renderer.bindRenderTarget(this._renderTarget);
  };

  //============================================================================
  // Window_ChoiceList
  //============================================================================

  const alias_Window_ChoiceList_initialize =
    Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function (messageWindow) {
    alias_Window_ChoiceList_initialize.call(this, messageWindow);
    if (messageMode === 'arabic') {
      RS.ArabicMessageSystem.createArabicLayer.call(this);
      RS.ArabicMessageSystem.defineProtoype(Window_ChoiceList);
    }
  };

  Window_ChoiceList.prototype.textWidthEx = function (text) {
    const temp = messageMode.slice(0);
    messageMode = 'normal';
    const ret = Window_Base.prototype.drawTextEx.call(
      this,
      text,
      0,
      this.contents.height
    );
    messageMode = temp;
    return ret;
  };

  Window_ChoiceList.prototype.refresh = function () {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    if (this.contents) {
      this.contents.clear();
      if (messageMode === 'arabic') {
        RS.ArabicMessageSystem.createArabicLayer.call(this);
      }
      this.drawAllItems();
    }
  };

  //===========================================================================
  // ConfigManager
  //===========================================================================

  Object.defineProperty(ConfigManager, 'rtlText', {
    get() {
      return messageMode === 'arabic';
    },
    set(value) {
      messageMode = value === true ? 'arabic' : 'normal';
    },
  });

  ConfigManager.rtlText = messageMode === 'arabic';

  const alias_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function () {
    const config = alias_makeData.call(this);
    config.rtlText = ConfigManager.rtlText;
    return config;
  };

  const alias_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function (config) {
    alias_applyData.call(this, config);
    const value = config.rtlText;
    if (value !== undefined) {
      this.rtlText = value;
    } else if (messageMode === 'arabic') {
      this.rtlText = true;
    } else {
      this.rtlText = false;
    }
  };

  //===========================================================================
  // Window_Options
  //===========================================================================

  const alias_addVolumeOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function () {
    alias_addVolumeOptions.call(this);
    this.addCommand(rtlWindowButtonSymbol, 'rtlText');
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  const alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);

    switch (command) {
      case 'DisableArabicTextAnimation':
        RS.ArabicMessageSystem.Params.isAnimatedText = false;
        break;
      case 'EnableArabicTextAnimation':
        RS.ArabicMessageSystem.Params.isAnimatedText = true;
        break;
      default:
    }
  };
})();
