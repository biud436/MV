/*:
 * RS_HUD_4m_InBattle.js
 * @plugindesc This plugin draws the Battle HUD (Addon v1.1.2)
 *
 * @requiredAssets img/pictures/exr
 * @requiredAssets img/pictures/gauge
 * @requiredAssets img/pictures/hp
 * @requiredAssets img/pictures/mp
 * @requiredAssets img/pictures/hud_window_empty
 * @requiredAssets img/pictures/masking
 * @requiredAssets img/pictures/hud_window_empty_inbattle
 *
 * @author biud436
 * @version 1.1.2
 *
 * @param Auto Windows Alignment
 * @desc
 * @default true
 *
 * @help
 *
 * - Change Log
 * 2016.05.21 (v1.0.0) - First Release Date
 * 2016.05.28 (v1.1.0) - Added Active Turn Battle (require YEP_BattleEngineCoreand YEP_X_BattleSysATB)
 * 2016.06.30 (v1.1.1) - Added the parameter that displays the values with commas every three digits.
 * 2016.08.07 (v1.1.2) - Fixed the issue of the function for drawing status icon
 */

var Imported = Imported || {};
Imported.RS_HUD_4m_InBattle = true;

var $gameHud = $gameHud || null;
var RS = RS || {};
RS.HUD = RS.HUD || {};
RS.HUD.param = RS.HUD.param || {};

(function() {

  var parameters = PluginManager.parameters('RS_HUD_4m_InBattle');
  var isWndsAlignment = Boolean(parameters['Auto Windows Alignment'] === 'true');

  var alias_HUD_initialize = HUD.prototype.initialize;
  HUD.prototype.initialize = function(config) {
    alias_HUD_initialize.call(this, config);
    if( !this.inBattle() ) return;
    this.createAllIcon();
    this.initSelectEffect();
  };

  HUD.prototype.initSelectEffect = function() {
    if(this.inBattle()) {
      this._selectionEffectCount = 0;
      this._selectionEnabled = false;
    }
  };

  HUD.prototype.updateDeathEffect = function() {
    if( !this.inBattle() ) return;
    if(this.getPlayer().isDead()) {
      this.children.forEach(function (i) {
        i.opacity = (this.getPlayer().isDead()) ? (RS.HUD.param.nOpacity - 100) : RS.HUD.param.nOpacity;
      }, this);
    }
  }

  HUD.prototype.updateSelectEffect = function () {
    if( !this.inBattle() ) return;
    var target = this._face;
    if (BattleManager._actorIndex === this.getPlayer().index()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
            target.setBlendColor([200, 200, 200, 64]);
        } else {
            target.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._selectionEffectCount > 0 || this._selectionEnabled) {
        this._selectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
        this._selectionEnabled = false;
    }
  }

  HUD.prototype.createHud = function() {
    var name = ( this.inBattle() && $dataSystem.optDisplayTp ) ? 'hud_window_empty_inbattle' : 'hud_window_empty';
    this._hud = new Sprite(ImageManager.loadPicture(name));
    this.addChild(this._hud);
  };

  HUD.prototype.createAllIcon = function() {
    this._Iconlayer = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._Iconlayer.x = (this._levelText.x - this._hud.x) + 32;
    this._hud.addChild(this._Iconlayer);
  };

  HUD.prototype.getAnchor = function(magnet) {
    var anchor = {
    "LeftTop": {x: RS.HUD.param.nPD, y: RS.HUD.param.nPD},
    "LeftBottom": {x: RS.HUD.param.nPD, y: Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD},
    "RightTop": {x: Graphics.boxWidth - RS.HUD.param.nWidth - RS.HUD.param.nPD, y: RS.HUD.param.nPD},
    "RightBottom": {x: Graphics.boxWidth - RS.HUD.param.nWidth - RS.HUD.param.nPD, y: Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD}
    };
    if(this.inBattle()) {
      anchor["LeftTop"].x += Graphics.boxWidth / 8;
      anchor["LeftTop"].y = Graphics.boxHeight - RS.HUD.param.nHeight * 2 - RS.HUD.param.nPD;
      anchor["RightBottom"].x -= Graphics.boxWidth / 8;
      anchor["LeftBottom"].y = Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD;
      anchor["RightTop"].y = Graphics.boxHeight - RS.HUD.param.nHeight * 2 - RS.HUD.param.nPD;
      anchor["RightBottom"].y = Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD;
    }
    return anchor[magnet];
  };

  HUD.prototype.update = function() {
    try {
      if(this.inBattle()) {
        this.updateDeathEffect()
        this.updateSelectEffect();
      }
      this._hud.update();
      if(this._face) this._face.update();
      this.paramUpdate();
    } catch(e) {
      console.error(e);
    }
  };

  HUD.prototype.refreshIcon = function() {
    var x = 0;
    var y = 0;
    this.drawActorIcons(this.getPlayer(), x, y);
  }

  HUD.prototype.drawActorIcons = function(actor, x, y, width) {
    if(this._Iconlayer) {
      this._Iconlayer.bitmap.clear();
    }
    width = width || 144;
    var icons = actor.allIcons().slice(0, Math.floor(width / 32));
    for (var i = 0; i < icons.length; i++) {
        this.drawIcon(icons[i], x + 32 * i, y + 2);
    }
  };

  HUD.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this._Iconlayer.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
  };

  var alias_HUD_getExp = HUD.prototype.getExp;
  HUD.prototype.getExp = function() {
    var player = this.getPlayer();
    if(this.inBattle() & $dataSystem.optDisplayTp) {
        return "%1 / %2".format(player.tp, player.maxTp());
    }
    return alias_HUD_getExp.call(this);
  };

  HUD.prototype.getExpRate = function() {
    try {
      if(this.inBattle() & $dataSystem.optDisplayTp) {
        return this._exp.bitmap.width * this.getPlayer().tpRate();
      }
      return this._exp.bitmap.width * (this.getPlayer().currentExp() / this.getPlayer().nextLevelExp());
    } catch(e) {
      return 0;
    }
  };

  HUD.prototype.inBattle = function() {
    return (SceneManager._scene instanceof Scene_Battle ||
            $gameParty.inBattle() ||
            DataManager.isBattleTest());
  }

  //----------------------------------------------------------------------------
  // Scene_Battle
  //
  //

  var alais_Scene_Battle_create = Scene_Battle.prototype.create;
  Scene_Battle.prototype.create = function() {
    alais_Scene_Battle_create.call(this);
    this._hudLayer = new RS_HudLayer();
    this._hudLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

    $gameHud = this._hudLayer;
    $gameHud.drawAllHud();

    this.addChild(this._hudLayer);
    this.swapChildren(this._windowLayer, this._hudLayer);
  };

  var alais_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function() {
    alais_Scene_Battle_terminate.call(this);
    this.removeChild(this._hudLayer);
    $gameHud = null;
  };

  var alias_Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
  Scene_Battle.prototype.createStatusWindow = function() {
    alias_Scene_Battle_createStatusWindow.call(this);
    this._statusWindow.visible = false;
  };

  var Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function() {
    Scene_Battle_createAllWindows.call(this);
    if(isWndsAlignment) {
      this._windowLayer.children.forEach(function (i) {
        if( !(i === this._logWindow || i === this._helpWindow)) {
          i.y = Graphics.boxHeight / 2 - i.height / 2;
        }
      }, this);
    }
  };

  //----------------------------------------------------------------------------
  // Window_BattleStatus
  //
  //
  var alias_Window_BattleStatus_refresh = Window_BattleStatus.prototype.refresh;
  Window_BattleStatus.prototype.refresh = function() {
    alias_Window_BattleStatus_refresh.call(this);
    if($gameHud) {
      $gameHud._items.children.forEach(function (i) {
        i.refreshIcon();
      }, this);
    }

  };

  //----------------------------------------------------------------------------
  // (Addon) Yanfly Engine Plugins - Battle System - Active Turn Battle
  //
  //

  var alias_yanflyATB_gauge_HUD_initialize = HUD.prototype.initialize;
  HUD.prototype.initialize = function(config) {
    alias_yanflyATB_gauge_HUD_initialize.call(this, config);
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
    if( !this.inBattle() ) return;
    this.createATBGauge();
    this.createArrow();
  };

  HUD.RAD = Math.PI / 180.0;
  HUD.PI2 = Math.PI * 2;

  HUD.prototype.createATBGauge = function () {
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
    if( !this.inBattle() ) return;
    var r = 96;
    this._AtbGauge = new Sprite(new Bitmap(RS.HUD.param.nWidth, RS.HUD.param.nHeight * 2));
    this._AtbGauge.x = this._hud.x;
    this._AtbGauge.y = this._hud.y;
    this.addChild(this._AtbGauge);
  };

  HUD.prototype.createArrow = function () {
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
    if( !this.inBattle() ) return;
    this._AtbArrow = new Sprite(new Bitmap(24, 24));
    this._AtbArrow.x = this._hud.x;
    this._AtbArrow.y = this._hud.y;
    this._AtbArrow.anchor.x = 0.5;
    this._AtbArrow.anchor.y = 0;
    this._AtbArrow.opacity = 0.8;
    this.drawArraow(45.0, 0.0);
    this.addChild(this._AtbArrow);
  };

  Bitmap.prototype.rsDrawArc = function(x, y, r, startingAngle, endingAngle, color) {
    var ctx = this._context;
    var grd = ctx.createLinearGradient(0, 0, 110, 65);
    grd.addColorStop(0, color);
    grd.addColorStop(1, 'rgba(230,230,230,0.0)');
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth= "3";
    ctx.arc(x + r + 1, y + r + 4, r - 1, startingAngle , endingAngle, true);
    ctx.strokeStyle = grd;
    ctx.globalAlpha = 0.9;
    ctx.stroke();
    ctx.restore();
    this._setDirty();
  };

  HUD.prototype.convertRad = function(degree) {
    return (Math.PI / 180.0) * degree;
  };

  HUD.prototype.drawAtbGauge = function (rate) {
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
    if( !this.inBattle() ) return;
    var x = 0;
    var y = 0;
    var player = this.getPlayer();
    var r = 45;
    var sAngle = 0;
    var eAngle = (HUD.PI2) * rate.clamp(0, 1);
    var color = 'rgba(147,112,219,0.9)';
    if(rate >= 1) {
      color = 'rgba(205,92,92,0.9)';
      this._AtbArrow.visible = false;
    } else {
      color = 'rgba(147,112,219,0.9)';
      this._AtbArrow.visible = true;
    }
    this._AtbGauge.bitmap.clear();
    this._AtbGauge.bitmap.rsDrawArc(x, y, r, sAngle, -eAngle, color);
    this.setArraowPosition(r, rate);
  };

  HUD.prototype.setArraowPosition = function(r, rate) {
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
    if( !this.inBattle() ) return;
    var dx = (this._hud.x + r + 1) + r * Math.cos(HUD.PI2 * rate);
    var dy = (this._hud.y + r + 4) + r * Math.sin(-HUD.PI2 * rate);
    this._AtbArrow.rotation = (-HUD.PI2) * rate;
    this._AtbArrow.x = dx;
    this._AtbArrow.y = dy;
  }

  HUD.prototype.drawArraow = function(r, rate) {
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
    if( !this.inBattle() ) return;
    var bitmap = ImageManager.loadSystem('Window');
    var dx = (0 + r + 1) + r * Math.cos(Math.PI * 2 * rate);
    var dy = (0 + r + 4) + r * Math.sin(-Math.PI * 2 * rate);
    var offsetX = 12;
    var offsetY = 12;
    this._AtbArrow.bitmap.blt(bitmap, 132, 24, 20, 20, 0, 0);
  }

  //----------------------------------------------------------------------------
  // (Alias) YEP_X_BattleSysATB
  //
  // Callback functions

  var alias_Window_BattleStatus_drawActorAtbGauge =
    Window_BattleStatus.prototype.drawActorAtbGauge;

  Window_BattleStatus.prototype.drawActorAtbGauge = function(actor, wx, wy, ww) {
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
  	alias_Window_BattleStatus_drawActorAtbGauge.call(this, actor, wx, wy, ww);
    if($gameHud) {
      $gameHud._items.children.forEach(function (i) {
        if(i.getPlayer() === actor) i.drawAtbGauge(actor.atbRate());
      }, this);
    }
  };

  var alias_Window_BattleStatus_drawAtbChargeGauge =
    Window_BattleStatus.prototype.drawAtbChargeGauge;

  Window_BattleStatus.prototype.drawAtbChargeGauge = function(actor, wx, wy, ww) {
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_BattleSysATB) return;
  	alias_Window_BattleStatus_drawAtbChargeGauge.call(this, actor, wx, wy, ww);
    if($gameHud) {
      $gameHud._items.children.forEach(function (i) {
        if(i.getPlayer() === actor) i.drawAtbGauge(actor.atbChargeRate());
      }, this);
    }
  };

})();
