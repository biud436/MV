/*:
 * RS_HUD_4m_InBattle.js
 * @plugindesc This plugin requires RS_HUD_4m.js
 *
 * @author biud436
 *
 * @param --- Image Name
 * @desc
 * @default
 *
 * @param HUD Battle Background
 * @desc
 * @default hud_window_empty_inbattle
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param TP Gauge
 * @desc
 * @default exr
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param --- Noraml
 * @desc
 * @default
 *
 * @param Auto Windows Alignment
 * @desc
 * @default true
 *
 * @param --- Text Settings
 * @desc
 * @default
 *
 * @param TP Position
 * @desc x, y, visible
 * (default : 83, 91, true)
 * @default 83, 91, true
 *
 * @param TP Text Size
 * @desc
 * @default 12
 *
 * @param TP Color
 * @desc
 * @default #ffffff
 *
 * @param TP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param TP Outline Width
 * @desc
 * @default 4
 *
 * @param --- Custom HUD Anchor
 * @desc
 * @default
 *
 * @param Arrangement
 * @desc Create an array to set the anchor of each HUD.
 * @default ['Pos 1', 'Pos 2', 'Pos 3', 'Pos 4']
 *
 * @param Pos 1
 * @desc (default : 102, 422)
 * @default 102, 422
 *
 * @param Pos 2
 * @desc (default : 0, 523)
 * @default 0, 523
 *
 * @param Pos 3
 * @desc (default : 499, 422)
 * @default 499, 422
 *
 * @param Pos 4
 * @desc (default : 397, 523)
 * @default 397, 523
 *
 * @help
 * =============================================================================
 * How to setup
 * =============================================================================
 * To use this add-on, You must have RS_HUD_4m 1.1.3, or later versions.
 * An add-on plugin also requires a new image. Click the following link,
 * and then Right-Click the image and Select the button called Save image as.
 *
 * Image Link : https://github.com/biud436/MV/blob/master/HUD/hud_window_empty_inbattle.png
 *
 * After that, Copy the image called 'hud_window_empty_inBattle.png' to img/pictures folder.
 * The following demo game shows the example.
 * (For information about the add-on, see RS_HUD_4m_InBattle plugin on the demo game.)
 *
 * Demo Game : https://www.dropbox.com/s/v6prurtempabqqv/hud.zip?dl=0
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.21 (v1.0.0) - First Release Date
 * 2016.05.28 (v1.1.0) - Added Active Turn Battle (require YEP_BattleEngineCoreand YEP_X_BattleSysATB)
 * 2016.06.30 (v1.1.1) - Added the parameter that displays the values with commas every three digits.
 * 2016.08.07 (v1.1.2) - Fixed the issue of the function for drawing status icon
 * 2016.09.05 (v1.1.3) - Now you can change the image file name, and can also be used the option called 'exclude the unused files'.
 * 2016.09.26 (v1.1.4) - Added Custom Anchor.
 * 2016.10.08 (v1.1.5) :
 * - Added the plugin parameter that could be configuable the property of TP text.
 * - Fixed the bug that the opacity is not returned as a previous opacity when certain party member is revived.
 * - Fixed the bug that the technical point gauge does not display.
 */

var Imported = Imported || {};
Imported.RS_HUD_4m_InBattle = '1.1.5';

var $gameHud = $gameHud || null;
var RS = RS || {};
RS.HUD = RS.HUD || {};
RS.HUD.param = RS.HUD.param || {};

(function() {

  if(!Imported.RS_HUD_4m || Imported.RS_HUD_4m < '1.1.3') {
    throw new Error("HUD core's version is lower.");
  }

  var parameters = PluginManager.parameters('RS_HUD_4m_InBattle');
  RS.HUD.param.isWndsAlignment = Boolean(parameters['Auto Windows Alignment'] === 'true');
  RS.HUD.param.imgEmptyBattleHUD = String(parameters['HUD Battle Background'] || 'hud_window_empty_inbattle');
  RS.HUD.param.arrangementInBattle = eval(parameters['Arrangement']);

  // Add TP Settings
  RS.HUD.param.imgTP = String(parameters['TP Gauge'] || 'exr');
  RS.HUD.param.ptTP = RS.HUD.loadImagePosition(parameters['TP Position'] || '83, 91, true');
  RS.HUD.param.tpTextSize = Number(parameters['TP Text Size']) || 12;
  RS.HUD.param.szTpColor = String(parameters['TP Color'] || '#ffffff');
  RS.HUD.param.szTpOutlineColor = String(parameters['TP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szTpOutlineWidth = Number(parameters['EXP Outline Width']) || 4;

  // Custom HUD Anchor
  RS.HUD.param.ptCustormBattleAnchor = [];

  for(var i = 0; i < 4; i++) {
    RS.HUD.param.ptCustormBattleAnchor.push( RS.HUD.loadCustomPosition(parameters['Pos ' + (i + 1)] || '0, 0') );
  }

  //----------------------------------------------------------------------------
  // RS_HudLayer
  //
  //

  RS_HudLayer.prototype.drawAllHud = function() {
    var allHud = this._items;
    var items = [];
    if(SceneManager._scene instanceof Scene_Battle ||
            $gameParty.inBattle() ||
            DataManager.isBattleTest()) {
      items = RS.HUD.param.arrangementInBattle;
    } else {
      items = RS.HUD.param.arrangement;
    }

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

  //----------------------------------------------------------------------------
  // HUD
  //
  //

  var alias_HUD_initialize = HUD.prototype.initialize;
  HUD.prototype.initialize = function(config) {
    alias_HUD_initialize.call(this, config);
    if( !this.inBattle() ) return;
    this.createAllIcon();
  };

  HUD.prototype.updateDeathEffect = function() {
    if( !this.inBattle() ) return;
    if(this.getPlayer().isDead()) {
      this.setOpacityisNotGlobal( this.getOpacityValue(true) );
    } else {
      this.setOpacityisNotGlobal( this.getOpacityValue(false) );
    }
  };

  HUD.prototype.updateSelectEffect = function () {
    if( !this.inBattle() ) return;
    var target = this._face;
    var cond = BattleManager._actorIndex === this.getPlayer().index();
    this.checkForToneUpdate( target, cond);
  };

  HUD.prototype.createHud = function() {
    var name = ( this.inBattle() && $dataSystem.optDisplayTp ) ? RS.HUD.param.imgEmptyBattleHUD : RS.HUD.param.imgEmptyHUD;
    this._hud = new Sprite(ImageManager.loadPicture(name));
    this.addChild(this._hud);
  };

  HUD.prototype.createExp = function() {
    var name = ( this.inBattle() && $dataSystem.optDisplayTp ) ? RS.HUD.param.imgTP : RS.HUD.param.imgEXP;
    this._exp = new Sprite(ImageManager.loadPicture(name));
    this.addChild(this._exp);
  };

  HUD.prototype.getTextParams = function(src) {
    var param = RS.HUD.param;
    var textProperties = {
      'HP': [param.hpTextSize, param.szHpColor, param.szHpOutlineColor, param.szHpOutlineWidth],
      'MP': [param.mpTextSize, param.szMpColor, param.szMpOutlineColor, param.szMpOutlineWidth],
      'EXP': [param.expTextSize, param.szExpColor, param.szExpOutlineColor, param.szExpOutlineWidth],
      'TP': [param.tpTextSize, param.szTpColor, param.szTpOutlineColor, param.szTpOutlineWidth],
      'LEVEL': [param.levelTextSize, param.szLevelColor, param.szLevelOutlineColor, param.szLevelOutlineWidth],
      'NAME': [param.nameTextSize, param.szNameColor, param.szNameOutlineColor, param.szNameOutlineWidth]
    };
    return textProperties[src];
  };

  HUD.prototype.createText = function() {
    var param = ( this.inBattle() && $dataSystem.optDisplayTp ) ? 'TP' : 'EXP';
    this._hpText = this.addText(this.getHp.bind(this), this.getTextParams('HP'));
    this._mpText = this.addText(this.getMp.bind(this), this.getTextParams('MP'));
    this._expText = this.addText(this.getExp.bind(this), this.getTextParams(param));
    this._levelText = this.addText(this.getLevel.bind(this), this.getTextParams('LEVEL'));
    this._nameText = this.addText(this.getName.bind(this), this.getTextParams('NAME'));
  };

  HUD.prototype.createAllIcon = function() {
    this._Iconlayer = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._Iconlayer.x = (this._levelText.x - this._hud.x) + 32;
    this._hud.addChild(this._Iconlayer);
  };

  HUD.prototype.getAnchor = function(magnet) {
    var anchor = RS.HUD.getDefaultHUDAnchor();

    // Add Custom Anchor
    for(var i = 0; i < 4; i++) {
      anchor['Custom Pos ' + (i + 1)] = RS.HUD.param.ptCustormAnchor[i];
    }

    if(this.inBattle()) {
      // Set the offset
      anchor["LeftTop"].x += Graphics.boxWidth / 8;
      anchor["LeftTop"].y = Graphics.boxHeight - RS.HUD.param.nHeight * 2 - RS.HUD.param.nPD;
      anchor["RightBottom"].x -= Graphics.boxWidth / 8;
      anchor["LeftBottom"].y = Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD;
      anchor["RightTop"].y = Graphics.boxHeight - RS.HUD.param.nHeight * 2 - RS.HUD.param.nPD;
      anchor["RightBottom"].y = Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD;

      // Add Custom Anchor
      for(var i = 0; i < 4; i++) {
        anchor['Pos ' + (i + 1)] = RS.HUD.param.ptCustormBattleAnchor[i];
      }

    }

    return anchor[magnet];
  };

  HUD.prototype.update = function() {
    if(this.inBattle()) this.updateSelectEffect();
    this._hud.update();
    if(this._face) this._face.update();
    if(this.inBattle()) {
      this.updateDeathEffect();
    } else {
      this.updateOpacity();
    }
    this.updateToneForAll();
    this.paramUpdate();
  };

  HUD.prototype.refreshIcon = function() {
    var x = 0, y = 0;
    this.drawActorIcons(this.getPlayer(), x, y);
  };

  HUD.prototype.drawActorIcons = function(actor, x, y, width) {
    if(this._Iconlayer) this._Iconlayer.bitmap.clear();
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
    if(this.inBattle() && $dataSystem.optDisplayTp) {
        return "%1 / %2".format(player.tp, player.maxTp());
    }
    return alias_HUD_getExp.call(this);
  };

  HUD.prototype.getExpRate = function() {
    var player = this.getPlayer();
    if(this.inBattle() && $dataSystem.optDisplayTp) {
      return this._exp.bitmap.width * (player.tp / player.maxTp());
    } else {
      return this._exp.bitmap.width * (player.relativeExp() / player.relativeMaxExp());
    }
  };

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
    if(RS.HUD.param.isWndsAlignment) {
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
