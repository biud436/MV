/*:
 * RS_HUD_4m_InBattle.js
 * @plugindesc This plugin draws the Battle HUD (Addon v1.0.0)
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
 * @version 1.0.0
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
 * @help
 *
 * - Change Log
 * 2015.05.21 (v1.0.0) - First Release Date
 */

var Imported = Imported || {};
Imported.RS_HUD_4m_InBattle = true;

var $gameHud = $gameHud || null;
var RS = RS || {};

(function() {

  var parameters = PluginManager.parameters('RS_HUD_4m_InBattle');
  var nWidth = Number(parameters['Width'] || 317 );
  var nHeight = Number(parameters['Height'] || 101 );
  var nPD = Number(parameters['Margin'] || 0);
  var bShow = Boolean(parameters['Show'] ==="true");
  var nOpacity = Number(parameters['Opacity'] || 255 );
  var szAnchor = String(parameters['Anchor'] || "LeftTop");
  var battleOnly = Boolean(parameters['Battle Only'] === "true");
  var arrangement = eval(parameters['Arrangement']);

  var alias_HUD_initialize = HUD.prototype.initialize;
  HUD.prototype.initialize = function(config) {
    alias_HUD_initialize.call(this, config);
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
        i.opacity = (this.getPlayer().isDead()) ? (nOpacity - 100) : nOpacity;
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
    var name = ( this.inBattle() ) ? 'hud_window_empty_inbattle' : 'hud_window_empty';
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
    "LeftTop": {x: nPD, y: nPD},
    "LeftBottom": {x: nPD, y: Graphics.boxHeight - nHeight - nPD},
    "RightTop": {x: Graphics.boxWidth - nWidth - nPD, y: nPD},
    "RightBottom": {x: Graphics.boxWidth - nWidth - nPD, y: Graphics.boxHeight - nHeight - nPD}
    };
    if(this.inBattle()) {
      anchor["LeftTop"].x += Graphics.boxWidth / 8;
      anchor["LeftTop"].y = Graphics.boxHeight - nHeight * 2 - nPD;
      anchor["RightBottom"].x -= Graphics.boxWidth / 8;
      anchor["LeftBottom"].y = Graphics.boxHeight - nHeight - nPD;
      anchor["RightTop"].y = Graphics.boxHeight - nHeight * 2 - nPD;
      anchor["RightBottom"].y = Graphics.boxHeight - nHeight - nPD;
    }
    return anchor[magnet];
  };

  HUD.prototype.update = function() {
    try {
      this.updateDeathEffect()
      this.updateSelectEffect();
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

  HUD.prototype.getExp = function() {
    var player = this.getPlayer();
    if(this.inBattle()) {
        return "%1 / %2".format(player.tp, player.maxTp());
    }
    return "%1 / %2".format(player.currentExp(), player.nextLevelExp());
  };

  HUD.prototype.getExpRate = function() {
    try {
      if(this.inBattle()) {
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
    this._windowLayer.children.forEach(function (i) {
      if( !(i === this._logWindow || i === this._helpWindow)) {
        i.y = Graphics.boxHeight / 2 - i.height / 2;
      }
    }, this);
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

})();
