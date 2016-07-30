/*:
 * RS_HUD_4m.js
 * @plugindesc This plugin draws the HUD, which displays the hp and mp and exp
 * and level of each party members. (v1.1.0)
 *
 * @requiredAssets img/pictures/exr
 * @requiredAssets img/pictures/gauge
 * @requiredAssets img/pictures/hp
 * @requiredAssets img/pictures/mp
 * @requiredAssets img/pictures/hud_window_empty
 * @requiredAssets img/pictures/masking
 *
 * @author biud436
 * @since 2015.10.31
 * @date 2016.01.12
 * @version 1.1.0
 *
 * @param Width
 * @desc Width
 * Do not change this when you are using the default sprite batch.
 * @default 317
 *
 * @param Height
 * @desc Height
 * Do not change this when you are using the default sprite batch.
 * @default 101
 *
 * @param Margin
 * @desc Sets the margin to the HUD borders.
 * @default 0
 *
 * @param Gaussian Blur
 * @desc Sets the Gaussian Blur.
 * @default true
 *
 * @param Show
 * @desc Sets the visible status.
 * @default true
 *
 * @param Opacity
 * @desc Sets the opacity.
 * @default 255
 *
 * @param Anchor
 * @desc This parameter is used to be compatible with RS_HUD.js
 * @default LeftTop
 *
 * @param Arrangement
 * @desc Create an array to set the position of a sprite.
 * example : ['LeftTop', 'LeftBottom', 'RightTop', 'RightBottom']
 * @default ['LeftTop', 'LeftBottom', 'RightTop', 'RightBottom']
 *
 * @param Anchor
 * @desc LeftTop, LeftBottom, RightTop, RightBottom
 * @default LeftTop
 *
 * @param preloadImportantFaces
 * @desc Allow you to pre-load the base face chips.
 * (If you do not set this parameter, It can cause errors in the game.)
 * @default ['Actor1', 'Actor2', 'Actor3']
 *
 * @param Battle Only
 * @desc
 * @default false
 *
 * @param Show Comma
 * @desc Sets the value that indicates whether this parameter displays
 * the values with commas every three digits.
 * @default false
 *
 * @param --- Font
 * @desc
 * @default
 *
 * @param Chinese Font
 * @desc
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Font
 * @desc
 * @default NanumGothic, Dotum, AppleGothic, sans-serif
 *
 * @param Standard Font
 * @desc
 * @default GameFont
 *
 * @param Level Text Size
 * @desc
 * @default 24
 *
 * @param HP Text Size
 * @desc
 * @default 12
 *
 * @param MP Text Size
 * @desc
 * @default 12
 *
 * @param EXP Text Size
 * @desc
 * @default 12
 *
 * @param --- Text Color
 * @desc
 * @default
 *
 * @param HP Color
 * @desc
 * @default #ffffff
 *
 * @param MP Color
 * @desc
 * @default #ffffff
 *
 * @param EXP Color
 * @desc
 * @default #ffffff
 *
 * @param Level Color
 * @desc
 * @default #ffffff
 *
 * @param --- Text Outline Color
 * @desc
 * @default
 *
 * @param HP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param MP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param EXP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Level Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param --- Text Outline Width
 * @desc
 * @default
 *
 * @param HP Outline Width
 * @desc
 * @default 4
 *
 * @param MP Outline Width
 * @desc
 * @default 4
 *
 * @param EXP Outline Width
 * @desc
 * @default 4
 *
 * @param Level Outline Width
 * @desc
 * @default 4
 *
 * @param --- Custom Font
 * @desc
 * @default
 *
 * @param Using Custom Font
 * @desc
 * @default false
 *
 * @param Custom Font Name
 * @desc
 * @default NanumBrush
 *
 * @param Custom Font Src
 * @desc
 * @default fonts/NanumBrush.ttf
 *
 * @help
 * Download the resources and place them in your img/pictures folder.
 * All the resources can download in the following link.
 * Resources Link : https://www.dropbox.com/s/umjlbgfgdts2rf7/pictures.zip?dl=0
 *
 * In Plugin Manager,
 * You have to pre-load the resources using the parameter called 'preloadImportantFaces'.
 *
 * Demo Link : https://www.dropbox.com/s/v6prurtempabqqv/hud.zip?dl=0
 * Github Link : https://github.com/biud436/MV/blob/master/HUD/RS_HUD_4m.js
 *
 * - Sets the opacity
 * Sets the opacity of the HUD to x. That is a number between 0 and 255.
 * $gameHud.opacity = 0;
 *
 * - Sets the visible
 * This variable will change the visible option of the HUD.
 * $gameHud.show = true;
 * $gameHud.show = false;
 *
 * - plugin commands
 *
 * RS_HUD Opacity x
 * the x is number value between 0 and 255.
 *
 * RS_HUD Visible true
 * RS_HUD Visible false
 *
 * - Change Log
 * 2015.10.31 (v1.0.0) - First Release Date
 * 2016.02.24 (v1.0.1) - Added the Plugin Command.
 * 2016.03.04 (v1.0.2) - Added the comments for include used files.
 * 2016.03.18 (v1.0.3) - Added the parameter called 'Arrangement'
 * 2016.03.26 (v1.0.4) - Fixed a bug that the HUD is always displayed regardless
 * of the setting whenever transferring the player to the other map.
 * 2016.05.05 (v1.0.5) - Fixed a bug that the text does not change.
 * 2016.05.17 (v1.0.6) - Fixed a structure of the class.
 * 2016.05.21 (v1.0.7) - Added the plugin parameter that can be able to display
 * the plugin in battle mode only.
 * 2016.05.21 (v1.0.8) - Fixed a bug of the opacity.
 * 2016.06.30 (v1.0.9) - Added the parameter that displays the values with commas every three digits.
 * 2016.07.30 (v1.1.0) - Added the parameter for setting fonts.
 */

var Imported = Imported || {};
Imported.RS_HUD_4m = true;

var $gameHud = null;
var RS = RS || {};
RS.HUD = RS.HUD || {};
RS.HUD.param = RS.HUD.param || {};

(function() {

  var parameters = PluginManager.parameters('RS_HUD_4m');
  RS.HUD.param.nWidth = Number(parameters['Width'] || 317 );
  RS.HUD.param.nHeight = Number(parameters['Height'] || 101 );
  RS.HUD.param.nPD = Number(parameters['Margin'] || 0);
  RS.HUD.param.blurProcessing = Boolean(parameters['Gaussian Blur'] === "true");
  RS.HUD.param.bShow = Boolean(parameters['Show'] ==="true");
  RS.HUD.param.nOpacity = Number(parameters['Opacity'] || 255 );
  RS.HUD.param.szAnchor = String(parameters['Anchor'] || "LeftTop");
  RS.HUD.param.arrangement = eval(parameters['Arrangement']);
  RS.HUD.param.preloadImportantFaces = eval(parameters['preloadImportantFaces'] || 'Actor1');
  RS.HUD.param.battleOnly = Boolean(parameters['Battle Only'] === "true");
  RS.HUD.param.showComma = Boolean(parameters['Show Comma'] === 'true');

  // Font Settings
  RS.HUD.param.chineseFont = String(parameters['Chinese Font'] || 'SimHei, Heiti TC, sans-serif');
  RS.HUD.param.koreanFont = String(parameters['Korean Font'] || 'NanumGothic, Dotum, AppleGothic, sans-serif');
  RS.HUD.param.standardFont = String(parameters['Standard Font'] || 'GameFont');

  // Text Size
  RS.HUD.param.levelTextSize = Number(parameters['Level Text Size'] || 12);
  RS.HUD.param.hpTextSize = Number(parameters['HP Text Size'] || 12);
  RS.HUD.param.mpTextSize = Number(parameters['MP Text Size'] || 12);
  RS.HUD.param.expTextSize = Number(parameters['EXP Text Size'] || 12);

  // Text Color
  RS.HUD.param.szHpColor =  String(parameters['HP Color'] || '#ffffff');
  RS.HUD.param.szMpColor = String(parameters['MP Color'] || '#ffffff');
  RS.HUD.param.szExpColor = String(parameters['EXP Color'] || '#ffffff');
  RS.HUD.param.szLevelColor = String(parameters['Level Color'] || '#ffffff');

  // Text Outline Color
  RS.HUD.param.szHpOutlineColor =  String(parameters['HP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szMpOutlineColor = String(parameters['MP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szExpOutlineColor = String(parameters['EXP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szLevelOutlineColor = String(parameters['Level Outline Color'] || 'rgba(0, 0, 0, 0.5)');

  // Text Outline Width
  RS.HUD.param.szHpOutlineWidth =  Number(parameters['HP Outline Width'] || 4);
  RS.HUD.param.szMpOutlineWidth = Number(parameters['MP Outline Width'] || 4);
  RS.HUD.param.szExpOutlineWidth = Number(parameters['EXP Outline Width'] || 4);
  RS.HUD.param.szLevelOutlineWidth = Number(parameters['Level Outline Width'] || 4);

  // Custom Font
  RS.HUD.param.bUseCustomFont = Boolean(parameters['Using Custom Font'] === 'true');
  RS.HUD.param.szCustomFontName = String(parameters['Custom Font Name'] || 'GameFont' );
  RS.HUD.param.szCustomFontSrc = String(parameters['Custom Font Src'] || 'fonts/mplus-1m-regular.ttf');

  //----------------------------------------------------------------------------
  // Game_System ($gameSystem)
  //
  //
  var _alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _alias_Game_System_initialize.call(this);
    this._rs_hud = this._rs_hud || {};
    this._rs_hud.show = this._rs_hud.show || RS.HUD.param.bShow;
    this._rs_hud.opacity = this._rs_hud.opacity || RS.HUD.param.nOpacity;
  };

  //----------------------------------------------------------------------------
  // TextData
  //
  //

  function TextData() {
      this.initialize.apply(this, arguments);
  }

  TextData.prototype = Object.create(Sprite.prototype);
  TextData.prototype.constructor = TextData;

  TextData.prototype.initialize = function(bitmap, func, params) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.setCallbackFunction(func);
    this.updateTextLog();
    this._params = params;
  };

  TextData.prototype.setCallbackFunction = function (cbFunc) {
    this._callbackFunction = cbFunc;
  };

  TextData.prototype.updateTextLog = function () {
    this._log = this._callbackFunction.call();
  };

  TextData.prototype.startCallbackFunction = function () {
    this._callbackFunction.call(this);
  };

  TextData.prototype.getTextProperties = function (n) {
    return this._params[n];
  };

  TextData.prototype.drawDisplayText = function () {
    this.defaultFontSettings();
    this.bitmap.drawText(this._callbackFunction(this), 0, 0, 120, this._params[0] + 8, 'center');
  };

  TextData.prototype.isRefresh = function () {
    var currentText = this._callbackFunction();
    return currentText.localeCompare(this._log) !== 0;
  };

  TextData.prototype.clearTextData = function () {
    this.bitmap.clear();
  };

  TextData.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if(this.isRefresh()) {
      this.clearTextData();
      this.drawDisplayText();
      this.updateTextLog();
    }
  };

  TextData.prototype.standardFontFace = function() {
    if(RS.HUD.param.bUseCustomFont) {
      return RS.HUD.param.szCustomFontName;
    } else {
      if (navigator.language.match(/^zh/)) {
          return RS.HUD.param.chineseFont;
      } else if (navigator.language.match(/^ko/)) {
          return RS.HUD.param.koreanFont;
      } else {
          return RS.HUD.param.standardFont;
      }
    }
  };

  TextData.prototype.defaultFontSettings = function() {
    var param = this._params;
    this.bitmap.fontFace = this.standardFontFace();
    this.bitmap.fontSize = param[0];
    this.bitmap.textColor = param[1];
    this.bitmap.outlineColor = param[2];
    this.bitmap.outlineWidth = param[3];
  };

  //----------------------------------------------------------------------------
  // HUD
  //
  //
  function HUD() {
    this.initialize.apply(this, arguments);
  };

  //----------------------------------------------------------------------------
  // RS_HudLayer
  //
  //
  function RS_HudLayer() {
    this.initialize.apply(this, arguments);
  };

  RS_HudLayer.prototype = Object.create(Sprite.prototype);
  RS_HudLayer.prototype.constructor = RS_HudLayer;

  RS_HudLayer.prototype.initialize = function(bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.createItemLayer();
  };

  RS_HudLayer.prototype.createItemLayer = function () {
    this._items = new Sprite();
    this._items.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.addChild(this._items);
  };

  RS_HudLayer.prototype.update = function() {
    Sprite.prototype.update.call(this);
  };

  RS_HudLayer.prototype.drawAllHud = function() {
    var allHud = this._items;
    var items = RS.HUD.param.arrangement;

    if(allHud.children.length > 0) {
      allHud.removeChildren(0, allHud.children.length);
    }

    items.forEach(function(item, index){
      if(!!$gameParty.members()[index]) {
        allHud.addChild(new HUD({szAnchor: item, nIndex: index}));
      }
    }, this);

    this.sort();

    this.show = $gameSystem._rs_hud.show;
    this.opacity = $gameSystem._rs_hud.opacity;

  };

  RS_HudLayer.prototype.sort = function() {
    var allHud = this._items;
    var array = allHud.children;
    allHud.children = array.sort(function(a, b) {
      return a._memberIndex - b._memberIndex;
    });
  }

  RS_HudLayer.prototype.refresh = function() {
    var allHud = this._items;
    allHud.children.forEach(function(i) {
        allHud.removeChild(i);
    }, this);
    this.drawAllHud();
    this.show = $gameSystem._rs_hud.show;
  }

  RS_HudLayer.prototype.remove = function(index) {
    setTimeout(function() {
      while($gameParty.size() !== this._items.children.length) {
        this.drawAllHud();
      }
    }.bind(this), 0);
  };

  Object.defineProperty(RS_HudLayer.prototype, 'show', {
      get: function() {
          return this._items.children[0].show;
      },
      set: function(value) {
          this._items.children.forEach( function(i) {
            i.visible = value;
          }, this);
          $gameSystem._rs_hud.show = value;
      },
  });

  Object.defineProperty(RS_HudLayer.prototype, 'opacity', {
      get: function() {
          return this._items.children[0].opacity;
      },
      set: function(value) {
          this._items.children.forEach( function(i) {
            i.opacity = value.clamp(0, 255);
          }, this);
          $gameSystem._rs_hud.opacity = value.clamp(0, 255);
      },
  });

  //----------------------------------------------------------------------------
  // HUD
  //
  //
  HUD.prototype = Object.create(Stage.prototype);
  HUD.prototype.constructor = HUD;

  HUD.prototype.initialize = function(config) {
      Stage.prototype.initialize.call(this);
      this.visible = false;
      this.createHud();
      this.setAnchor(config.szAnchor || "LeftBottom");
      this.setMemberIndex(parseInt(config.nIndex) || 0);
      this.createFace();
      this.createHp();
      this.createMp();
      this.createExp();
      this.createText();
      this.setPosition();
  };

  HUD.prototype.getAnchor = function(magnet) {
    var anchor = {
    "LeftTop": {x: RS.HUD.param.nPD, y: RS.HUD.param.nPD},
    "LeftBottom": {x: RS.HUD.param.nPD, y: Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD},
    "RightTop": {x: Graphics.boxWidth - RS.HUD.param.nWidth - RS.HUD.param.nPD, y: RS.HUD.param.nPD},
    "RightBottom": {x: Graphics.boxWidth - RS.HUD.param.nWidth - RS.HUD.param.nPD, y: Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD}
    };
    return anchor[magnet];
  };

  HUD.prototype.setAnchor = function(anchor) {
    var pos = this.getAnchor(anchor);
    if(typeof(pos) === 'object') {
      this._hud.x = pos.x;
      this._hud.y = pos.y;
    } else {
      this.setAnchor(RS.HUD.param.szAnchor);
    }
  };

  HUD.prototype.setMemberIndex = function(index) {
    this._memberIndex = index;
  }

  HUD.prototype.createHud = function() {
    this._hud = new Sprite(ImageManager.loadPicture('hud_window_empty'));
    this.addChild(this._hud);
  };

  HUD.prototype.createFace = function() {
    var player = this.getPlayer();
    this._faceBitmap = ImageManager.loadFace(player.faceName());
    this._maskBitmap = ImageManager.loadPicture("masking");
    this._maskBitmap.addLoadListener(function() {
        this._faceBitmap.addLoadListener(this.circleClippingMask.bind(this, player.faceIndex()));
    }.bind(this));
  };

  Bitmap.prototype.drawClippingImage = function(bitmap, maskImage , _x, _y, _sx, _sy) {
    var context = this._context;
    context.save();
    context.drawImage(maskImage._canvas, _x, _y, 96, 96);
    context.globalCompositeOperation = 'source-atop';
    context.drawImage(bitmap._canvas, _sx, _sy, 144, 144, 0, 0, 96, 96);
    context.restore();
    this._setDirty();
  };

  Bitmap.prototype.drawClippingImageNonBlur = function(bitmap, _x, _y, _sx, _sy) {
    var context = this._context;
    context.save();
    context.beginPath();
    context.arc(_x + 45, _y + 45 , 45, 0, Math.PI * 2, false);
    context.clip();
    context.drawImage(bitmap._canvas, _sx, _sy, 144, 144, 0, 0, 96, 96);
    context.restore();
    this._setDirty();
  };

  HUD.prototype.circleClippingMask = function(faceIndex) {
    var sprite = new Sprite()
        , fw = Window_Base._faceWidth, fh = Window_Base._faceHeight
        , sx = (faceIndex % 4) * fw, sy = Math.floor(faceIndex / 4) * fh;

    sprite.x = this._hud.x;
    sprite.y = this._hud.y;
    sprite.bitmap = new Bitmap(96, 96);

    if (RS.HUD.param.blurProcessing) {
      sprite.bitmap.drawClippingImage(this._faceBitmap, this._maskBitmap, 0, 0, sx, sy);
    } else {
      sprite.bitmap.drawClippingImageNonBlur(this._faceBitmap, 0, 0, sx, sy);
    }

    this._face = sprite;
    this.addChild(this._face);
  };

  HUD.prototype.createHp = function() {
    this._hp = new Sprite(ImageManager.loadPicture('hp'));
    this.addChild(this._hp);
  };

  HUD.prototype.createMp = function() {
    this._mp = new Sprite(ImageManager.loadPicture('mp'));
    this.addChild(this._mp);
  };

  HUD.prototype.createExp = function() {
    this._exp = new Sprite(ImageManager.loadPicture('exr'));
    this.addChild(this._exp);
  };

  HUD.prototype.getTextParams = function(src) {
    var param = RS.HUD.param;
    var textProperties = {
      'HP': [param.hpTextSize, param.szHpColor, param.szHpOutlineColor, param.szHpOutlineWidth],
      'MP': [param.mpTextSize, param.szMpColor, param.szMpOutlineColor, param.szMpOutlineWidth],
      'EXP': [param.expTextSize, param.szExpColor, param.szExpOutlineColor, param.szExpOutlineWidth],
      'LEVEL': [param.levelTextSize, param.szLevelColor, param.szLevelOutlineColor, param.szLevelOutlineWidth]
    };
    return textProperties[src];
  };

  HUD.prototype.createText = function() {
    this._hpText = this.addText(this.getHp.bind(this), this.getTextParams('HP'));
    this._mpText = this.addText(this.getMp.bind(this), this.getTextParams('MP'));
    this._expText = this.addText(this.getExp.bind(this), this.getTextParams('EXP'));
    this._levelText = this.addText(this.getLevel.bind(this), this.getTextParams('LEVEL'));
  };

  HUD.prototype.setPosition = function() {
    if(this._face) { this.setCoord(this._face, 0, 0); }
    this.setCoord(this._hp, 160, 43);
    this.setCoord(this._mp, 160, 69);
    this.setCoord(this._exp, 83, 91);
    this.setCoord(this._hpText, 160, 53);
    this.setCoord(this._mpText, 160, 79);
    this.setCoord(this._levelText, 60, 80);
    this.setCoord(this._expText, 120.5, 93);
  };

  HUD.prototype.addText = function(strFunc, params) {
    var bitmap = new Bitmap(120, params[0] + 8);
    var text = new TextData(bitmap, strFunc, params);
    this.addChildAt(text, this.children.length);
    text.drawDisplayText();
    return text;
  };

  HUD.prototype.getPlayer = function() {
    return $gameParty.members()[this._memberIndex];
  };

  HUD.prototype.getHp = function() {
    var player = this.getPlayer();
    if(RS.HUD.param.showComma) {
      return "%1 / %2".appendComma(player.hp, player.mhp);
    } else {
      return "%1 / %2".format(player.hp, player.mhp);
    }
  };

  HUD.prototype.getMp = function() {
    var player = this.getPlayer();
    if(RS.HUD.param.showComma) {
      return "%1 / %2".appendComma(player.mp, player.mmp);
    } else {
      return "%1 / %2".format(player.mp, player.mmp);
    }
  };

  HUD.prototype.getExp = function() {
    var player = this.getPlayer();
    if(RS.HUD.param.showComma) {
      return "%1 / %2".appendComma(player.currentExp(), player.nextLevelExp());
    } else {
      return "%1 / %2".format(player.currentExp(), player.nextLevelExp());
    }
  };

  HUD.prototype.getLevel = function() {
    var player = this.getPlayer();
    if(RS.HUD.param.showComma) {
      return "%1".appendComma(player.level);
    } else {
      return "%1".format(player.level);
    }
  };

  HUD.prototype.getHpRate = function() {
    try {
      return this._hp.bitmap.width * (this.getPlayer().hp / this.getPlayer().mhp);
    } catch(e) {
      return 0;
    }
  };

  HUD.prototype.getMpRate = function() {
    try {
      return this._mp.bitmap.width * (this.getPlayer().mp / this.getPlayer().mmp);
    } catch(e) {
      return 0;
    }
  };

  HUD.prototype.getExpRate = function() {
    try {
      return this._exp.bitmap.width * (this.getPlayer().currentExp() / this.getPlayer().nextLevelExp());
    } catch(e) {
      return 0;
    }
  };

  HUD.prototype.setCoord = function(s,x,y) {
    var oy = (s._callbackFunction instanceof Function) ? (s.bitmap.height / 2) : 0;
    s.x = this._hud.x + x;
    s.y = this._hud.y + y - oy;
  };

  HUD.prototype.update = function() {
    try {
      this._hud.update();
      if(this._face) { this._face.update(); }
      this.paramUpdate();
    } catch(e) {
    }
  };

  HUD.prototype.paramUpdate = function() {
    this._hp.setFrame(0, 0, this.getHpRate(), this._hp.height );
    this._mp.setFrame(0, 0, this.getMpRate(), this._mp.height );
    this._exp.setFrame(0, 0, this.getExpRate(), this._exp.height );
    this._hpText.update();
    this._mpText.update();
    this._expText.update();
    this._levelText.update();

    if(this._face.bitmap._image === (null || undefined)) {
      this.removeChild(this._face);
      this.createFace();
    }

  };

  Object.defineProperty(HUD.prototype, 'show', {
      get: function() {
          return $gameSystem._rs_hud.show;
      },
      set: function(value) {
          this.children.forEach( function(i) {
            i.visible = value;
          }, this);
          $gameSystem._rs_hud.show = value;
      },
  });

  Object.defineProperty(HUD.prototype, 'opacity', {
      get: function() {
          return $gameSystem._rs_hud.opacity;
      },
      set: function(value) {
          this.children.forEach( function(i) {
            i.opacity = value.clamp(0, 255);
          }, this);
          $gameSystem._rs_hud.opacity = value.clamp(0, 255);
      },
  });

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  //
  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    if(!RS.HUD.param.battleOnly) {
      this._hudLayer = new RS_HudLayer();
      this._hudLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

      $gameHud = this._hudLayer;
      this._hudLayer.drawAllHud();

      this.addChild(this._hudLayer);
      this.swapChildren(this._windowLayer, this._hudLayer);
    }
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if(!RS.HUD.param.battleOnly) {
      this.removeChild(this._hudLayer);
      $gameHud = null;
    }
    _Scene_Map_terminate.call(this);
  };

  //----------------------------------------------------------------------------
  // Game_Party
  //
  //
  var _Game_Party_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function(actorId) {
    _Game_Party_addActor.call(this, actorId);
    try {
      if(!!$gameHud.refresh) {
        $gameHud.refresh();
      }
    } catch(e) {

    }

  };

  var _Game_Party_removeActor = Game_Party.prototype.removeActor;
  Game_Party.prototype.removeActor = function(actorId) {
    try {
        $gameHud.remove(actorId);
        _Game_Party_removeActor.call(this, actorId);
    } catch(e) {

    }
  };

  //----------------------------------------------------------------------------
  // Scene_Boot
  //
  //
  var _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    _Scene_Boot_loadSystemImages.call(this);
    if(RS.HUD.param.bUseCustomFont) {
      Graphics.loadFont(RS.HUD.param.szCustomFontName, RS.HUD.param.szCustomFontSrc);
    }
    RS.HUD.param.preloadImportantFaces.forEach(function(i) {
      ImageManager.loadFace(i);
    }, this);
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "RS_HUD") {
        switch (args[0].toLowerCase()) {
          case 'opacity':
            $gameHud.opacity = Number(args[1]);
            break;
          case 'visible':
            $gameHud.show = Boolean(args[1] === "true");
            break;
        }
      }
  };

  //----------------------------------------------------------------------------
  // String Utils
  //
  //

  /**
   * String.prototype.toArray
   */
  String.prototype.toArray = function(){
      return this.split("");
  }

  /**
   * String.prototype.reverse
   */
  String.prototype.reverse = function(){
      return this.toArray().reverse().join("");
  }

  /**
   * String.prototype.toComma
   */
  String.prototype.toComma = function(){
      return this.reverse().match(/.{1,3}/g).join(",").reverse();
  }

  /**
   * Replaces %1, %2 and so on in the string to the arguments.
   *
   * @method String.prototype.format
   * @param {Any} ...args The objects to format
   * @return {String} A formatted string
   */
  String.prototype.appendComma = function() {
      var args = arguments;
      return this.replace(/%([0-9]+)/g, function(s, n) {
          return (args[Number(n) - 1] + '').toComma();
      });
  };

  //----------------------------------------------------------------------------
  // Output Objects
  //
  //

  window.HUD = HUD;
  window.RS_HudLayer = RS_HudLayer;

})();
