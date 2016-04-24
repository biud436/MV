/*:
 * RS_HUD.js
 * @plugindesc This plugin provides the HUD that displays the HP and
 * MP and EXP and Level, on the screen.
 * @author 러닝은빛(biud436)
 * @since 2015.10.31
 * @version 1.0.1
 *
 * @requiredAssets img/pictures/exr
 * @requiredAssets img/pictures/gauge
 * @requiredAssets img/pictures/hp
 * @requiredAssets img/pictures/mp
 * @requiredAssets img/pictures/hud_window_empty
 * @requiredAssets img/pictures/masking
 *
 * @param Width
 * @desc 가로 크기
 * @default 317
 *
 * @param Height
 * @desc 세로 크기
 * @default 101
 *
 * @param Margin
 * @desc 화면 경계선과의 여백 또는 간격을 지정합니다.
 * @default 0
 *
 * @param Gaussian Blur
 * @desc 페이스칩의 가장자리를 다듬어 부드럽게 묘화하는 기능으로
 * 모바일에서만 지원합니다.
 * @default true
 *
 * @param Show
 * @desc 상태
 * @default true
 *
 * @param Opacity
 * @desc 투명도
 * @default 255
 *
 * @param Anchor
 * @desc 좌측상단, 좌측하단, 우측상단, 우측하단
 * @default 좌측하단
 *
 * @help
 *
 * < 사용가능 변수 >
 * $gameHud.opacity
 * $gameHud.show
 *
 * <플러그인 커맨드>
 * - 미지원
 *
 * - Change Log
 * 2016.10.31 (v1.0.0) - First Release.
 * 2016.03.04 (v1.0.1) - Added the comments for include used files.
 */

var Imported = Imported || {};
Imported.RS_HUD = true;

var $gameHud = null;

var RS = RS || {};

function HUD() {
  this.initialize.apply(this, arguments);
}

/**
 * @class HUD
 * @extends PIXI.Stage
 */
(function() {

  var parameters = PluginManager.parameters('RS_HUD');
  var nWidth = Number(parameters['Width'] || 317 );
  var nHeight = Number(parameters['Height'] || 101 );
  var nPD = Number(parameters['Margin'] || 0);
  var blurProcessing = Boolean(parameters['Gaussian Blur'] ==="true");
  var bShow = Boolean(parameters['Show'] ==="true");
  var nOpacity = Number(parameters['Opacity'] || 255 );
  var szAnchor = String(parameters['Anchor'] || "좌측하단");

  RS.HUD = RS.HUD || {};
  RS.HUD.show = RS.HUD.show || bShow;
  RS.HUD.opacity = RS.HUD.opacity || nOpacity;
  RS.HUD.x = RS.HUD.x || 0;
  RS.HUD.y = RS.HUD.y || 0;

  HUD.prototype = new PIXI.Stage();

  HUD.prototype.initialize = function() {
      Stage.prototype.initialize.call(this);
      this.createHud();
      this.setAnchor(szAnchor);
      this.createFace();
      this.createHp();
      this.createMp();
      this.createExp();
      this.createText();
      this.setPosition();
  };

  HUD.prototype.getAnchor = function(magnet) {
    var anchor = {
    "좌측상단": {x: nPD, y: nPD},
    "좌측하단": {x: nPD, y: Graphics.boxHeight - nHeight - nPD},
    "우측상단": {x: Graphics.boxWidth - nWidth - nPD, y: nPD},
    "우측하단": {x: Graphics.boxWidth - nWidth - nPD, y: Graphics.boxHeight - nHeight - nPD}
    };
    return anchor[magnet];
  };

  HUD.prototype.setAnchor = function(anchor) {
    var pos = this.getAnchor(anchor);
    if(typeof(pos) === 'object') {
      this._hud.x = RS.HUD.x = pos.x;
      this._hud.y = RS.HUD.y = pos.y;
    } else {
      this.setAnchor(szAnchor);
    }
  };

  HUD.prototype.createHud = function() {
    this._hud = new Sprite(ImageManager.loadPicture('hud_window_empty'));
    this.addChild(this._hud);
  };

  HUD.prototype.createFace = function() {
    var player = $gameParty.members()[0];
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

    if(blurProcessing && (Utils.isMobileDevice() || Utils.isAndroidChrome()) ) {
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
    return $gameParty.members()[0];
  };

  HUD.prototype.getHp = function() {
    var player = $gameParty.members()[0];
    return "%1 / %2".format(player.hp, player.mhp);
  };

  HUD.prototype.getMp = function() {
    var player = $gameParty.members()[0];
    return "%1 / %2".format(player.mp, player.mmp);
  };

  HUD.prototype.getExp = function() {
    var player = $gameParty.members()[0];
    return "%1 / %2".format(player.currentExp(), player.nextLevelExp());
  };

  HUD.prototype.getLevel = function() {
    return "%1".format($gameParty.members()[0].level);
  };

  HUD.prototype.getHpRate = function() {
    return this._hp.bitmap.width * (this.getPlayer().hp / this.getPlayer().mhp);
  };

  HUD.prototype.getMpRate = function() {
    return this._mp.bitmap.width * (this.getPlayer().mp / this.getPlayer().mmp);
  };

  HUD.prototype.getExpRate = function() {
    return this._exp.bitmap.width * (this.getPlayer().currentExp() / this.getPlayer().nextLevelExp());
  };

  HUD.prototype.setCoord = function(s,x,y) {
    s.x = this._hud.x + x;
    s.y = this._hud.y + y;
  };

  HUD.prototype.update = function() {
    this._hud.update();
    if(this._face) { this._face.update(); }
    this.paramUpdate();
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
          return RS.HUD.show;
      },
      set: function(value) {
          this.children.forEach( function(i) {
            i.visible = value;
          }, this);
          RS.HUD.show = value;
      },
  });

  Object.defineProperty(HUD.prototype, 'opacity', {
      get: function() {
          return RS.HUD.opacity;
      },
      set: function(value) {
          this.children.forEach( function(i) {
            i.opacity = value.clamp(0, 255);
          }, this);
          RS.HUD.opacity = value.clamp(0, 255);
      },
  });

  Object.defineProperty(HUD.prototype, 'x', {
      get: function() {
          return RS.HUD.x;
      },
      set: function(value) {
          this._hud.x = RS.HUD.x = value.clamp(0, Graphics.boxWidth);
          this.setPosition();
      },
  });

  Object.defineProperty(HUD.prototype, 'y', {
      get: function() {
          return RS.HUD.y;
      },
      set: function(value) {
          this._hud.y = RS.HUD.y = value.clamp(0, Graphics.boxHeight);
          this.setPosition();
      },
  });

})();

/**
 * @class HUD
 * @extends PIXI.Stage
 */
(function() {

  /*** @alias Scene_Map.prorotype.start */
  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    $gameHud = new HUD();
    $gameHud.opacity = RS.HUD.opacity;
    $gameHud.show = RS.HUD.show;
    this.addChild($gameHud);
    this.swapChildren(this._windowLayer, $gameHud);
  };

  /*** @alias Scene_Map.prorotype.terminate */
  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    this.removeChild($gameHud);
    $gameHud = null;
    _Scene_Map_terminate.call(this);
  };

})();
