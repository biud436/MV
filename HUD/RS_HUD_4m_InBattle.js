/*:
 * RS_HUD_4m_InBattle.js
 * @plugindesc (v1.2.4) This plugin requires RS_HUD_4m.js
 *
 * @author biud436
 *
 * @param --- Image Name
 *
 * @param HUD Battle Background
 * @parent --- Image Name
 * @desc Specify the background image for the battle hud
 * @default hud_window_empty_inbattle
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param TP Gauge
 * @parent --- Image Name
 * @desc Specify the technical point(TP) gauge image for the battle hud
 * @default exr
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param --- Noraml
 *
 * @param Auto Windows Alignment
 * @parent --- Noraml
 * @type boolean
 * @desc Rectifies the coordinate for all windows except the log and help windows.
 * @default true
 *
 * @param --- Text Settings
 *
 * @param TP Position
 * @parent --- Text Settings
 * @desc x, y, visible
 * (default : 83, 91, true)
 * @default 83, 91, true
 *
 * @param TP Text Size
 * @parent --- Text Settings
 * @type number
 * @desc Specify the size of the text for the value that indicates the technical point.
 * @default 12
 *
 * @param TP Color
 * @parent --- Text Settings
 * @desc Specify the color of the text for the value that indicates the technical point.
 * @default #ffffff
 *
 * @param TP Outline Color
 * @parent --- Text Settings
 * @desc Specify the outline color of the text for the value that indicates the technical point.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param TP Outline Width
 * @parent --- Text Settings
 * @type number
 * @desc Specify the outline width of the text for the value that indicates the technical point.
 * @default 4
 *
 * @param Max Battle Members
 * @parent --- Text Settings
 * @type number
 * @min 1
 * @desc Specify the maximum size of the party members to indicate the gauge.
 * @default 4
 *
 * @param --- Custom HUD Anchor
 *
 * @param Arrangement
 * @parent --- Custom HUD Anchor
 * @type string[]
 * @desc Set the array that is used the basis position of each HUD.
 * @default ["Pos 1", "Pos 2", "Pos 3", "Pos 4"]
 *
 * @param Pos 1
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [0, BH - (H * 2) - PD]
 *
 * @param Pos 2
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [0, BH - H - PD]
 *
 * @param Pos 3
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [W + PD, BH - (H * 2) - PD]
 *
 * @param Pos 4
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [W + PD, BH - H - PD]
 *
 * @param Pos 5
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [(W * 2) + PD, BH - (H * 2) - PD]
 *
 * @param Pos 6
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [(W * 2) + PD, BH - H - PD]
 *
 * @param Pos 7
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [(W * 3) + PD, BH - (H * 2) - PD]
 *
 * @param Pos 8
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [(W * 3) + PD, BH - H - PD]
 *
 * @param Pos 9
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [(W * 4) + PD, BH - (H * 2) - PD]
 *
 * @param Pos 10
 * @parent --- Custom HUD Anchor
 * @desc Set the coordinate while creating the hud sprite.
 * @default [(W * 4) + PD, BH - H - PD]
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
 * - Added the plugin parameter that could be configurable the property of TP text.
 * - Fixed the bug that the opacity is not returned as a previous opacity when certain party member is revived.
 * - Fixed the bug that the technical point gauge does not display.
 * 2016.10.11 (v1.1.6) :
 * - Fixed the bug that happens when certain party member is removed.
 * - Fixed the bug that is not controlled the opacity of HUD.
 * 2016.12.22 (v1.1.7) :
 * - Now this plugin does not provide the functionality to automatically adjust transparency and tone changes due to poor performance in canvas mode of mobile device.
 * - The text elements perform an update through the event handler.
 * - Fixed an issue that plugins did not work due to image position data parsing errors in crosswalk.
 * - Fixed an issue that can not be saved due to this update.
 * 2017.01.26 (v1.1.8) :
 * - Fixed a bug that is not working to preload
 * - Added a new parameter that could increase the number of the HUD.
 * - Added parameters for user custom HUD position.
 * 2017.02.11 (v1.1.9) : Fixed an issue that the hud is set in an incorrect position when adding a new party member.
 * 2017.04.13 (v1.2.0) - Fixed the issue that the parameters update function is
 * properly not working in case of you're not using the battle addon, in a
 * community version.
 * 2017.06.08 (v1.2.1) - Fixed the issue that is not displaying specific image in RMMV 1.5
 * 2017.06.22 (v1.2.2) - Extended as the ATB gauge bar to support Victor Engine ATB or Ellye ATB plugins.
 * 2017.09.17 (v1.2.3) - Fixed the bug that cause the error when restarting the game.
 * 2017.10.26 (v1.2.4) - This plugin has applied with the new plugin manager features in the plugin parameters.
 */

var Imported = Imported || {};
Imported.RS_HUD_4m_InBattle = '1.2.4';

var $gameHud = $gameHud || null;
var RS = RS || {};
RS.HUD = RS.HUD || {};
RS.HUD.param = RS.HUD.param || {};

(function() {

  if(!Imported.RS_HUD_4m || Imported.RS_HUD_4m < '1.2.2') {
    throw new Error("HUD core's version is lower");
  }

  var parameters = PluginManager.parameters('RS_HUD_4m_InBattle');

  RS.HUD.param.isWndsAlignment = Boolean(parameters['Auto Windows Alignment'] === 'true');
  RS.HUD.param.imgEmptyBattleHUD = String(parameters['HUD Battle Background'] || 'hud_window_empty_inbattle');
  RS.HUD.param.arrangementInBattle = eval(parameters['Arrangement']);

  RS.HUD.param.nBttleMememberSize = parseInt(parameters["Max Battle Members"] || 4);

  // Add TP Settings
  RS.HUD.param.imgTP = String(parameters['TP Gauge'] || 'exr');
  RS.HUD.param.ptTP = RS.HUD.loadImagePosition(parameters['TP Position'] || '83, 91, true');
  RS.HUD.param.tpTextSize = Number(parameters['TP Text Size']) || 12;
  RS.HUD.param.szTpColor = String(parameters['TP Color'] || '#ffffff');
  RS.HUD.param.szTpOutlineColor = String(parameters['TP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szTpOutlineWidth = Number(parameters['EXP Outline Width']) || 4;

  // Custom HUD Anchor
  RS.HUD.param.ptCustormBattleAnchor = [];

  RS.HUD.loadCustomBattlePosition = function (sources) {
    var W = RS.HUD.param.nWidth;
    var H = RS.HUD.param.nHeight;
    var PD = RS.HUD.param.nPD;
    var BW = Graphics.boxWidth || 816;
    var BH = Graphics.boxHeight || 624;
    var ret = eval(sources);
    if(ret instanceof Array) {
      return new Point(ret[0], ret[1]);
    } else {
      return new Point(0, 0);
    }
  };

  RS.HUD.initBattleParameters = function () {
    RS.HUD.param.nBttleMememberSize = Math.max(RS.HUD.param.nBttleMememberSize, $gameParty.size());
    for(var i = 0; i < RS.HUD.param.nBttleMememberSize; i++) {
      var idx = parseInt(i + 1);
      RS.HUD.param.ptCustormBattleAnchor[i] = RS.HUD.loadCustomBattlePosition(parameters['Pos ' + idx] || '0, 0');
    }
  };

  var alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    alias_Scene_Boot_start.call(this);
    RS.HUD.initBattleParameters();
  };


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
      RS.HUD.initBattleParameters();
      items = RS.HUD.param.arrangementInBattle;
    } else {
      items = RS.HUD.param.arrangement;
    }

    if(allHud.children.length > 0) {
      allHud.removeChildren(0, allHud.children.length);
    }

    items.forEach(function(item, index){
      if(!!$gameParty.members()[index]) {
        var m = new HUD({szAnchor: item, nIndex: index});
        allHud.addChild(m);
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
    this._hud = new Sprite(RS.HUD.loadPicture(name));
    this.addChild(this._hud);
  };

  HUD.prototype.createExp = function() {
    var name = ( this.inBattle() && $dataSystem.optDisplayTp ) ? RS.HUD.param.imgTP : RS.HUD.param.imgEXP;
    this._exp = new Sprite(RS.HUD.loadPicture(name));
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
    for(var i = 0; i < RS.HUD.param.nMaxMembers; i++) {
      var idx = parseInt(i + 1);
      anchor['Custom Pos ' + idx] = RS.HUD.param.ptCustormAnchor[i];
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
      for(var i = 0; i < RS.HUD.param.nBttleMememberSize; i++) {
        var idx = parseInt(i + 1);
        anchor['Pos ' + idx] = RS.HUD.param.ptCustormBattleAnchor[i];
      }

    }

    return anchor[magnet];
  };

  HUD.prototype.update = function() {
    this.paramUpdate();
    if(this.inBattle()) {
      this.updateSelectEffect();
      this.updateDeathEffect();
      this.updateBattleHud();
    } else {
      this.updateOpacity();
    }
    this.updateToneForAll();
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
    if(!player) return "0 / 0";
    if(this.inBattle() && $dataSystem.optDisplayTp) {
        return "%1 / %2".format(player.tp, player.maxTp());
    }
    return alias_HUD_getExp.call(this);
  };

  HUD.prototype.getExpRate = function() {
    var player = this.getPlayer();
    if(!player) return 0.0;
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
    if(Utils.RPGMAKER_VERSION >= '1.5.0') {
      ImageManager.reservePicture(RS.HUD.param.imgHP);
      ImageManager.reservePicture(RS.HUD.param.imgMP);
      ImageManager.reservePicture(RS.HUD.param.imgTP);
    }
  };

  var alias_Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function() {
    alias_Scene_Battle_update.call(this);
    if(!this._hudLayer && $gameParty.members()) {
      this._hudLayer = new RS_HudLayer();
      this._hudLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

      $gameHud = this._hudLayer;
      $gameHud.drawAllHud();

      this.addChild(this._hudLayer);
      this.swapChildren(this._windowLayer, this._hudLayer);
      $gameTemp.notifyHudTextRefresh();
    }
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
  // Active Time Battle supports
  //
  //

  Game_System.prototype.isAtbSystem = function () {
    if(Imported.YEP_BattleEngineCore && Imported.YEP_X_BattleSysATB) {
      return true;
    }
    if(Imported.Ellye_ATB) {
      return true;
    }
    if(Imported['VE - Active Time Battle']) {
      return true;
    }
    return false;
  };

  Game_Battler.prototype.getAtbRate = function () {
    if(Imported.YEP_BattleEngineCore && Imported.YEP_X_BattleSysATB) {
      return this.atbRate();
    }
    if(Imported.Ellye_ATB) {
      return this.atbRatio();
    }
    if(Imported['VE - Active Time Battle']) {
      return this.atbRate();
    }
    return 1;
  };

  Game_Battler.prototype.getChargeRate = function () {
    if(Imported.YEP_BattleEngineCore && Imported.YEP_X_BattleSysATB) {
      return this.atbChargeRate();
    }
    if(Imported.Ellye_ATB) {
      return this.castRatio();
    }
    if(Imported['VE - Active Time Battle']) {
      return this.atbRate();
    }
    return 1;
  };

  //----------------------------------------------------------------------------
  // (Addon) Yanfly Engine Plugins - Battle System - Active Turn Battle
  //
  //

  var alias_yanflyATB_gauge_HUD_initialize = HUD.prototype.initialize;
  HUD.prototype.initialize = function(config) {
    alias_yanflyATB_gauge_HUD_initialize.call(this, config);
    if(!$gameSystem.isAtbSystem()) return;
    if( !this.inBattle() ) return;
    this.createATBGauge();
    this.createArrow();
  };

  HUD.RAD = Math.PI / 180.0;
  HUD.PI2 = Math.PI * 2;

  HUD.prototype.createATBGauge = function () {
    if(!$gameSystem.isAtbSystem()) return;
    if( !this.inBattle() ) return;
    var r = 96;
    this._AtbGauge = new Sprite(new Bitmap(RS.HUD.param.nWidth, RS.HUD.param.nHeight * 2));
    this._AtbGauge.x = this._hud.x;
    this._AtbGauge.y = this._hud.y;
    this.addChild(this._AtbGauge);
  };

  HUD.prototype.createArrow = function () {
    if(!$gameSystem.isAtbSystem()) return;
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

  HUD.prototype.updateBattleHud = function () {
    if(!$gameSystem.isAtbSystem()) return;
    if( !this.inBattle() ) return;
    var player = this.getPlayer();
    this.drawAtbGauge(player.getAtbRate());
  };

  HUD.prototype.drawAtbGauge = function (rate) {
    if(!$gameSystem.isAtbSystem()) return;
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
    if(!$gameSystem.isAtbSystem()) return;
    if( !this.inBattle() ) return;
    var dx = (this._hud.x + r + 1) + r * Math.cos(HUD.PI2 * rate);
    var dy = (this._hud.y + r + 4) + r * Math.sin(-HUD.PI2 * rate);
    this._AtbArrow.rotation = (-HUD.PI2) * rate;
    this._AtbArrow.x = dx;
    this._AtbArrow.y = dy;
  }

  HUD.prototype.drawArraow = function(r, rate) {
    if(!$gameSystem.isAtbSystem()) return;
    if( !this.inBattle() ) return;
    var bitmap = ImageManager.loadSystem('Window');
    var dx = (0 + r + 1) + r * Math.cos(Math.PI * 2 * rate);
    var dy = (0 + r + 4) + r * Math.sin(-Math.PI * 2 * rate);
    var offsetX = 12;
    var offsetY = 12;
    this._AtbArrow.bitmap.blt(bitmap, 132, 24, 20, 20, 0, 0);
  };

})();
