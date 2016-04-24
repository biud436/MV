/*:
 * RS_HUD_4m.js
 * @plugindesc This plugin draws the HUD, which displays the hp and mp and exp
 * and level of each party members. (v1.0.4)
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
 * @version 1.0.4
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
 */

var Imported = Imported || {};
Imported.RS_HUD_4m = true;

var $gameHud = null
var RS = RS || {};

/**
 * @class HUD
 * @extends PIXI.Stage
 */
(function() {

  var parameters = PluginManager.parameters('RS_HUD_4m');
  var nWidth = Number(parameters['Width'] || 317 );
  var nHeight = Number(parameters['Height'] || 101 );
  var nPD = Number(parameters['Margin'] || 0);
  var blurProcessing = Boolean(parameters['Gaussian Blur'] ==="true");
  var bShow = Boolean(parameters['Show'] ==="true");
  var nOpacity = Number(parameters['Opacity'] || 255 );
  var szAnchor = String(parameters['Anchor'] || "LeftTop");
  var arrangement = eval(parameters['Arrangement']);
  var preloadImportantFaces = eval(parameters['preloadImportantFaces'] || 'Actor1');

  var _alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _alias_Game_System_initialize.call(this);
    this._rs_hud = this._rs_hud || {};
    this._rs_hud.show = this._rs_hud.show || bShow
    this._rs_hud.opacity = this._rs_hud.opacity || nOpacity;
  }

  function HUD() {
    this.initialize.apply(this, arguments);
  };

  function HUDFactory(stage) {
    this.stage = stage;
    this.drawAllHud = function() {
      var items = arrangement;
      if(this.stage.children.length > 0) {
        this.stage.removeChildren(0, this.stage.children.length);
      }
      items.forEach(function(item, index){
        if(!!$gameParty.members()[index]) {
          this.stage.addChild(new HUD({szAnchor: item, nIndex: index}));
        }
      }, this);
      this.sort();
      this.show = $gameSystem._rs_hud.show;
    }
    this.sort = function() {
      var array = this.stage.children;
      this.stage.children = array.sort(function(a, b) {
        return a._memberIndex - b._memberIndex;
      });
    }
    this.refresh = function() {
      var self = this.stage;
      this.stage.children.forEach(function(i) {
          this.stage.removeChild(i);
      }, this);
      this.drawAllHud();
      this.show = $gameSystem._rs_hud.show;
    }
    this.remove = function(index) {
      setTimeout(function() {
        while($gameParty.size() !== this.stage.children.length) {
          this.drawAllHud();
        }
      }.bind(this), 0);
    }
  };

  Object.defineProperty(HUDFactory.prototype, 'show', {
      get: function() {
          return this.stage.children[0].show;
      },
      set: function(value) {
          this.stage.children.forEach( function(i) {
            i.visible = value;
          }, this);
          $gameSystem._rs_hud.show = value;
      },
  });

  Object.defineProperty(HUDFactory.prototype, 'opacity', {
      get: function() {
          return this.stage.children[0].opacity;
      },
      set: function(value) {
          this.stage.children.forEach( function(i) {
            i.opacity = value.clamp(0, 255);
          }, this);
          $gameSystem._rs_hud.opacity = value.clamp(0, 255);
      },
  });

  HUD.prototype = new PIXI.Stage();

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
    "LeftTop": {x: nPD, y: nPD},
    "LeftBottom": {x: nPD, y: Graphics.boxHeight - nHeight - nPD},
    "RightTop": {x: Graphics.boxWidth - nWidth - nPD, y: nPD},
    "RightBottom": {x: Graphics.boxWidth - nWidth - nPD, y: Graphics.boxHeight - nHeight - nPD}
    };
    return anchor[magnet];
  };

  HUD.prototype.setAnchor = function(anchor) {
    var pos = this.getAnchor(anchor);
    if(typeof(pos) === 'object') {
      this._hud.x = pos.x;
      this._hud.y = pos.y;
    } else {
      this.setAnchor(szAnchor);
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

    if (blurProcessing) {
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

  HUD.prototype.createText = function() {
    this._hpText = this.addText(this.getHp.bind(this));
    this._mpText = this.addText(this.getMp.bind(this));
    this._expText = this.addText(this.getExp.bind(this));
    this._levelText = this.addText(this.getLevel.bind(this));
  };

  HUD.prototype.setPosition = function() {
    if(this._face) { this.setCoord(this._face, 0, 0); }
    this.setCoord(this._hp, 160, 43);
    this.setCoord(this._mp, 160, 69);
    this.setCoord(this._exp, 83, 91);
    this.setCoord(this._hpText, 160, 43);
    this.setCoord(this._mpText, 160, 69);
    this.setCoord(this._levelText, 60, 71);
    this.setCoord(this._expText, 120.5, 83);
  };

  HUD.prototype.addText = function(strFunc) {
    var text = new Sprite(new Bitmap(120, 20));
    text._tmp = strFunc;
    text._log = strFunc.call(this);
    text.update = function() {
      if(this._tmp.call(this) != this._log) {
        this.bitmap.clear();
        this.bitmap.fontSize = 12;
        this.bitmap.drawText(this._tmp.call(this), 0, 0, 120, 20, 'center');
      }
    };

    this.addChildAt(text, this.children.length);

    text.bitmap.fontSize = 12;
    text.bitmap.drawText(strFunc(), 0, 0, 120, 20, 'center');

    return text;
  };

  HUD.prototype.getPlayer = function() {
    return $gameParty.members()[this._memberIndex];
  };

  HUD.prototype.getHp = function() {
    var player = this.getPlayer();
    return "%1 / %2".format(player.hp, player.mhp);
  };

  HUD.prototype.getMp = function() {
    var player = this.getPlayer();
    return "%1 / %2".format(player.mp, player.mmp);
  };

  HUD.prototype.getExp = function() {
    var player = this.getPlayer();
    return "%1 / %2".format(player.currentExp(), player.nextLevelExp());
  };

  HUD.prototype.getLevel = function() {
    var player = this.getPlayer();
    return "%1".format(player.level);
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
    s.x = this._hud.x + x;
    s.y = this._hud.y + y;
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

  /*** @alias Scene_Map.prorotype.start */
  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);

    this._hudLayer = new Sprite();
    this._hudLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

    $gameHud = $gameHud || new HUDFactory(this._hudLayer);
    $gameHud.drawAllHud();

    this.addChild(this._hudLayer);
    this.swapChildren(this._windowLayer, this._hudLayer);
  };

  /*** @alias Scene_Map.prorotype.terminate */
  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    this.removeChild(this._hudLayer);
    $gameHud = null;
    _Scene_Map_terminate.call(this);
  };

  var _Game_Party_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function(actorId) {
    _Game_Party_addActor.call(this, actorId);
    if(!!$gameHud.refresh) {
      $gameHud.refresh();
    }
  };

  var _Game_Party_removeActor = Game_Party.prototype.removeActor;
  Game_Party.prototype.removeActor = function(actorId) {
    $gameHud.remove(actorId);
    _Game_Party_removeActor.call(this, actorId);
  };

  var _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    _Scene_Boot_loadSystemImages.call(this);
    preloadImportantFaces.forEach(function(i) {
      ImageManager.loadFace(i);
    }, this);
  }

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

})();
