//================================================================
// RS_HUD_4m_InBattle.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_HUD_4m_InBattle.js
 * @target MZ
 * @base RS_HUD_4m
 * @plugindesc (v2.0.0) <RS_HUD_4m_InBattle>
 * @author biud436
 * @url biud436.tistory.com
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
 * 2018.05.09 (v1.2.5) - Fixed an issue that is not showing the image after it has been added.
 * 2019.11.19 (v1.2.6) :
 * - Supported a plugin called 'MPP_ActiveTimeBattle'
 * 2020.08.30 (v2.0.0) - This plugin is now also available in MZ
 */

var Imported = Imported || {};
Imported.RS_HUD_4m_InBattle = '2.0.0';

var $gameHud = $gameHud || null;
var RS = RS || {};
RS.HUD = RS.HUD || {};
RS.HUD.param = RS.HUD.param || {};

(() => {

    "use strict";

    const pluginParams = $plugins.filter(i => {
        return i.description.contains('<RS_HUD_4m_InBattle>');
    });

    const pluginName = (pluginParams.length > 0) && pluginParams[0].name;
    const parameters = (pluginParams.length > 0) && pluginParams[0].parameters;

    Object.assign(RS.HUD.param, {
        isWndsAlignment: Boolean(parameters['Auto Windows Alignment'] === 'true'),
        imgEmptyBattleHUD: String(parameters['HUD Battle Background'] || 'hud_window_empty_inbattle'),
        arrangementInBattle: eval(parameters['Arrangement']),

        nBttleMememberSize: parseInt(parameters["Max Battle Members"] || 4),

        // Add TP Settings
        imgTP: String(parameters['TP Gauge'] || 'exr'),
        ptTP: RS.HUD.loadImagePosition(parameters['TP Position'] || '83, 91, true'),
        tpTextSize: Number(parameters['TP Text Size']) || 12,
        szTpColor: String(parameters['TP Color'] || '#ffffff'),
        szTpOutlineColor: String(parameters['TP Outline Color'] || 'rgba(0, 0, 0, 0.5)'),
        szTpOutlineWidth: Number(parameters['EXP Outline Width']) || 4,

        // Custom HUD Anchor
        ptCustormBattleAnchor: [],
    });

    Object.assign(RS.HUD, {

        loadCustomBattlePosition(sources) {
            const W = RS.HUD.param.nWidth;
            const H = RS.HUD.param.nHeight;
            const PD = RS.HUD.param.nPD;
            const BW = Graphics.width || 816;
            const BH = Graphics.height || 624;
            const ret = eval(sources);
            if (ret instanceof Array) {
                return new Point(ret[0], ret[1]);
            } else {
                return new Point(0, 0);
            }
        },
    
        initBattleParameters() {
            RS.HUD.param.nBttleMememberSize = Math.max(RS.HUD.param.nBttleMememberSize, $gameParty.size());
            for (let i = 0; i < RS.HUD.param.nBttleMememberSize; i++) {
                const idx = parseInt(i + 1);
                RS.HUD.param.ptCustormBattleAnchor[i] = RS.HUD.loadCustomBattlePosition(parameters['Pos ' + idx] || '0, 0');
            }
        }
    
    });

    const alias_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        alias_Scene_Boot_start.call(this);
        RS.HUD.initBattleParameters();
    };

    //=================================================
    // RS.HUD.Layer
    //=================================================

    Object.assign(RS.HUD.Layer, {

        drawAllHud() {

            const allHud = this._items;

            let items = [];
            if (SceneManager._scene instanceof Scene_Battle ||
                $gameParty.inBattle() ||
                DataManager.isBattleTest()) {
                RS.HUD.initBattleParameters();
                items = RS.HUD.param.arrangementInBattle;
            } else {
                items = RS.HUD.param.arrangement;
            }
    
            if (allHud.children.length > 0) {
                allHud.removeChildren(0, allHud.children.length);
            }
    
            items.forEach((item, index) => {
                if (!!$gameParty.members()[index]) {
                    const m = new HUD({
                        szAnchor: item,
                        nIndex: index
                    });
                    allHud.addChild(m);
                }
            });
    
            this.sort();
    
            this.show = $gameSystem._rs_hud.show;
            this.opacity = $gameSystem._rs_hud.opacity;
    
        }
    });

    //=================================================
    // HUD
    //=================================================
    const alias_HUD_createVector = HUD.prototype.createVector;
    const alias_HUD_getExp = HUD.prototype.getExp;

    Object.assign(HUD.prototype, {

        createVector() {
            alias_HUD_createVector.call(this);
            if (!this.inBattle()) return;
            this.createAllIcon();
        },
    
        updateDeathEffect() {
            if (!this.inBattle()) return;
            if (this.getPlayer().isDead()) {
                this.setOpacityisNotGlobal(this.getOpacityValue(true));
            } else {
                this.setOpacityisNotGlobal(this.getOpacityValue(false));
            }
        },
    
        updateSelectEffect() {
            if (!this.inBattle()) return;
            const target = this._face;
            const cond = BattleManager._actorIndex === this.getPlayer().index();
            this.checkForToneUpdate(target, cond);
        },
    
        createHud() {
            const name = (this.inBattle() && $dataSystem.optDisplayTp) ? RS.HUD.param.imgEmptyBattleHUD : RS.HUD.param.imgEmptyHUD;
            this._hud = new Sprite(RS.HUD.loadPicture(name));
            this.addChild(this._hud);
        },
    
        createExp(dirty) {
            const name = (this.inBattle() && $dataSystem.optDisplayTp) ? RS.HUD.param.imgTP : RS.HUD.param.imgEXP;
            this._exp = new Sprite(RS.HUD.loadPicture(name));
            this.addImage(this._exp, this.createExp.bind(this), dirty);
        },
    
        getTextParams(src) {

            const param = RS.HUD.param;

            const textProperties = {
                'HP': [param.hpTextSize, param.szHpColor, param.szHpOutlineColor, param.szHpOutlineWidth],
                'MP': [param.mpTextSize, param.szMpColor, param.szMpOutlineColor, param.szMpOutlineWidth],
                'EXP': [param.expTextSize, param.szExpColor, param.szExpOutlineColor, param.szExpOutlineWidth],
                'TP': [param.tpTextSize, param.szTpColor, param.szTpOutlineColor, param.szTpOutlineWidth],
                'LEVEL': [param.levelTextSize, param.szLevelColor, param.szLevelOutlineColor, param.szLevelOutlineWidth],
                'NAME': [param.nameTextSize, param.szNameColor, param.szNameOutlineColor, param.szNameOutlineWidth]
            };

            return textProperties[src];
        },
    
        createText() {
            const param = (this.inBattle() && $dataSystem.optDisplayTp) ? 'TP' : 'EXP';

            this._hpText = this.addText(this.getHp.bind(this), this.getTextParams('HP'));
            this._mpText = this.addText(this.getMp.bind(this), this.getTextParams('MP'));
            this._expText = this.addText(this.getExp.bind(this), this.getTextParams(param));
            this._levelText = this.addText(this.getLevel.bind(this), this.getTextParams('LEVEL'));
            this._nameText = this.addText(this.getName.bind(this), this.getTextParams('NAME'));
        },
    
        createAllIcon() {
            this._Iconlayer = new Sprite(new Bitmap(Graphics.width, Graphics.height));
            this._Iconlayer.x = (this._levelText.x - this._hud.x) + 32;
            this._hud.addChild(this._Iconlayer);
        },
    
        getAnchor(magnet) {
            const anchor = RS.HUD.getDefaultHUDAnchor();
    
            // Add Custom Anchor
            for (let i = 0; i < RS.HUD.param.nMaxMembers; i++) {
                const idx = parseInt(i + 1);
                anchor['Custom Pos ' + idx] = RS.HUD.param.ptCustormAnchor[i];
            }
    
            if (this.inBattle()) {
                // Set the offset
                anchor["LeftTop"].x += Graphics.width / 8;
                anchor["LeftTop"].y = Graphics.height - RS.HUD.param.nHeight * 2 - RS.HUD.param.nPD;
                anchor["RightBottom"].x -= Graphics.width / 8;
                anchor["LeftBottom"].y = Graphics.height - RS.HUD.param.nHeight - RS.HUD.param.nPD;
                anchor["RightTop"].y = Graphics.height - RS.HUD.param.nHeight * 2 - RS.HUD.param.nPD;
                anchor["RightBottom"].y = Graphics.height - RS.HUD.param.nHeight - RS.HUD.param.nPD;
    
                // Add Custom Anchor
                for (let i = 0; i < RS.HUD.param.nBttleMememberSize; i++) {
                    const idx = parseInt(i + 1);
                    anchor['Pos ' + idx] = RS.HUD.param.ptCustormBattleAnchor[i];
                }
    
            }
    
            return anchor[magnet];
        },
    
        update() {
            this.paramUpdate();
            if (this.inBattle()) {
                this.updateSelectEffect();
                this.updateDeathEffect();
                this.updateBattleHud();
            } else {
                this.updateOpacity();
            }
            this.updateToneForAll();
        },
    
        refreshIcon() {
            const x = 0, y = 0;
            this.drawActorIcons(this.getPlayer(), x, y);
        },
    
        drawActorIcons(actor, x, y, width) {
            if (this._Iconlayer) this._Iconlayer.bitmap.clear();
            width = width || 144;
            const icons = actor.allIcons().slice(0, Math.floor(width / 32));
            for (let i = 0; i < icons.length; i++) {
                this.drawIcon(icons[i], x + 32 * i, y + 2);
            }
        },
    
        drawIcon(iconIndex, x, y) {
            const bitmap = ImageManager.loadSystem('IconSet');
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = iconIndex % 16 * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            this._Iconlayer.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
        },
    
        getExp() {
            const player = this.getPlayer();
            if (!player) return HUD.GAUGE_EMPTY_TEXT;
            if (this.inBattle() && $dataSystem.optDisplayTp) {
                return HUD.GAUGE_TEMPLATE_TEXT.format(player.tp, player.maxTp());
            }
            return alias_HUD_getExp.call(this);
        },
    
        getExpRate() {
            const player = this.getPlayer();
            if (!player) return 0.0;
            if (this.inBattle() && $dataSystem.optDisplayTp) {
                return this._exp.bitmap.width * (player.tp / player.maxTp());
            } else {
                return this._exp.bitmap.width * (player.relativeExp() / player.relativeMaxExp());
            }
        },
    });

    //=================================================
    // Scene_Battle
    //=================================================

    const alais_Scene_Battle_create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function () {
        alais_Scene_Battle_create.call(this);
        ImageManager.loadPicture(RS.HUD.param.imgHP);
        ImageManager.loadPicture(RS.HUD.param.imgMP);
        ImageManager.loadPicture(RS.HUD.param.imgTP);
    };

    const alias_Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        alias_Scene_Battle_update.call(this);
        if (!this._hudLayer && $gameParty.members()) {
            this._hudLayer = new RS.HUD.Layer();
            this._hudLayer.setFrame(0, 0, Graphics.width, Graphics.height);

            $gameHud = this._hudLayer;
            $gameHud.drawAllHud();

            this.addChild(this._hudLayer);
            this.swapChildren(this._windowLayer, this._hudLayer);
            $gameTemp.notifyHudTextRefresh();
        }
    };

    const alais_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        alais_Scene_Battle_terminate.call(this);
        this.removeChild(this._hudLayer);
        $gameHud = null;
    };

    const alias_Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
    Scene_Battle.prototype.createStatusWindow = function () {
        alias_Scene_Battle_createStatusWindow.call(this);
        this._statusWindow.hide();
    };

    Window_BattleStatus.prototype.show = function() {
        
    };

    const Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function () {
        Scene_Battle_createAllWindows.call(this);
        if (RS.HUD.param.isWndsAlignment) {
            this._windowLayer.children.forEach(i => {
                if (!(i === this._logWindow || i === this._helpWindow)) {
                    i.y = Graphics.height / 2 - i.height / 2;
                }
            });
        }
    };

    //=================================================
    // Window_BattleStatus
    //=================================================

    const alias_Window_BattleStatus_refresh = Window_BattleStatus.prototype.refresh;
    Window_BattleStatus.prototype.refresh = function () {
        alias_Window_BattleStatus_refresh.call(this);
        if (!$gameHud) return;
        $gameHud._items.children.forEach(i => i.refreshIcon());
    };

    //=================================================
    // Game_Battler
    //=================================================

    Object.assign(Game_Battler.prototype, {
        getAtbRate() {
            return this.tpbChargeTime() / 1.0;
        },
    
        getChargeRate() {
            return this.tpbChargeTime();
        },
    });

    Object.assign(Bitmap.prototype, {
        rsDrawArc(x, y, r, startingAngle, endingAngle, color) {
            const ctx = this._context;
            const grd = ctx.createLinearGradient(0, 0, 110, 65);
    
            grd.addColorStop(0, color);
            grd.addColorStop(1, 'rgba(230,230,230,0.0)');
    
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.arc(x + r + 1, y + r + 4, r - 1, startingAngle, endingAngle, true);
            ctx.strokeStyle = grd;
            ctx.globalAlpha = 0.9;
            ctx.stroke();
            ctx.restore();
    
            this._baseTexture.update();
    
        }
    });

    //=================================================
    // TPB
    //=================================================    

    HUD.RAD = Math.PI / 180.0;
    HUD.PI2 = Math.PI * 2;

    const alias_HUD_ATB_createVector = HUD.prototype.createVector;

    Object.assign(HUD.prototype, {

        createVector() {
            alias_HUD_ATB_createVector.call(this);
            if (!BattleManager.isActiveTpb()) return;
            if (!this.inBattle()) return;
            this.createATBGauge();
            this.createArrow();
        },                    

        createATBGauge() {
            if (!BattleManager.isActiveTpb()) return;
            if (!this.inBattle()) return;

            this._AtbGauge = new Sprite(new Bitmap(RS.HUD.param.nWidth, RS.HUD.param.nHeight * 2));
            this._AtbGauge.x = this._hud.x;
            this._AtbGauge.y = this._hud.y;

            this.addChild(this._AtbGauge);
        },
    
        createArrow() {
            if (!BattleManager.isActiveTpb()) return;
            if (!this.inBattle()) return;
            this._AtbArrow = new Sprite(new Bitmap(24, 24));
            this._AtbArrow.x = this._hud.x;
            this._AtbArrow.y = this._hud.y;
            this._AtbArrow.anchor.x = 0.5;
            this._AtbArrow.anchor.y = 0;
            this._AtbArrow.opacity = 0.8;
            this.drawArraow(45.0, 0.0);
            this.addChild(this._AtbArrow);
        },
         
        convertRad(degree) {
            return (Math.PI / 180.0) * degree;
        },
    
        updateBattleHud() {
            if (!BattleManager.isActiveTpb()) return;
            if (!this.inBattle()) return;
            const player = this.getPlayer();
            this.drawAtbGauge(player.getAtbRate());
        },
    
        drawAtbGauge(rate) {
            if (!BattleManager.isActiveTpb()) return;
            if (!this.inBattle()) return;
            const x = 0;
            const y = 0;
            const r = 45;
            const sAngle = 0;
            const eAngle = (HUD.PI2) * rate.clamp(0, 1);
            let color = 'rgba(147,112,219,0.9)';
            if (rate >= 1) {
                color = 'rgba(205,92,92,0.9)';
                this._AtbArrow.visible = false;
            } else {
                color = 'rgba(147,112,219,0.9)';
                this._AtbArrow.visible = true;
            }
            this._AtbGauge.bitmap.clear();
            this._AtbGauge.bitmap.rsDrawArc(x, y, r, sAngle, -eAngle, color);
            this.setArraowPosition(r, rate);
        },
    
        setArraowPosition(r, rate) {
            if (!BattleManager.isActiveTpb()) return;
            if (!this.inBattle()) return;

            const dx = (this._hud.x + r + 1) + r * Math.cos(HUD.PI2 * rate);
            const dy = (this._hud.y + r + 4) + r * Math.sin(-HUD.PI2 * rate);

            this._AtbArrow.rotation = (-HUD.PI2) * rate;
            this._AtbArrow.x = dx;
            this._AtbArrow.y = dy;
        },
    
        drawArraow(r, rate) {
            if (!BattleManager.isActiveTpb()) return;
            if (!this.inBattle()) return;
            const bitmap = ImageManager.loadSystem('Window');
            this._AtbArrow.bitmap.blt(bitmap, 132, 24, 20, 20, 0, 0);
        },
    });

})();
