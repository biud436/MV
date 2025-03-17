//================================================================
// RS_Fog.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to deal with FOG like RPG Maker XP <RS_Fog>
 * @author biud436
 *
 * @param fog
 * @type struct<Fog>[]
 * @desc
 * @default
 *
 * @help
 *
 * The demo game is available at https://www.dropbox.com/s/p7qg1r1eo9vihjb/Fog.zip?dl=1
 * it is completely worked fine in the RPG Maker MV v1.6.2
 *
 * ============================================================================
 * Note Tags
 * ============================================================================
 *
 * To use fog like RPG Maker XP,
 * Make sure that sets up the note tags in event editor, as follows.
 *
 * <fogId:1>
 * <fogName:001-Fog01>
 * <fogOpacity:64>
 * <fogZoom:100>
 * <fogBlend:20>
 * <fogSX:1> - if the positive value is, it will move to left.
 * <fogSY:1> - if the positive value is, it will move to up.
 * <fogSwitchId:1>
 * <fogVariableId:1>
 *
 * all images must be placed in img/fogs folder.
 *
 * Blend type 20 means a subtract blend.
 * Once created, the fog image will not be removed until the map is changed.
 *
 * if switch #1 is ON, the fog will show up on the screen.
 *
 * ============================================================================
 * Note Tags (Short)
 * ============================================================================
 *
 * <MAP FOG : id>
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2018.11.14 (v1.0.0) - First Release.
 * 2018.11.16 (v1.0.1) - Added the opacity mode.
 * 2021.01.09 (v1.0.2) :
 * - Fixed the bug that causes an error when using the erase event command.
 * 2023.08.12 (v1.0.3) :
 * - Fixed the issue that causes an error when starting the game.
 */
/*~struct~Fog:
 *
 * @param fogId
 * @text Id
 * @type number
 * @desc Specify the id.
 * @default 1
 *
 * @param fogName
 * @text Name
 * @desc Specify the filename.
 * @default 001-Fog01
 * @require 1
 * @dir img/fogs/
 * @type file
 *
 * @param fogOpacity
 * @text Opacity
 * @type number
 * @desc Specify the opacity is the value between 0 and 255
 * @default 64
 * @min 0
 * @max 255
 *
 * @param fogZoom
 * @text Zoom
 * @type number
 * @desc Specify the zoom percent value is the value between 0 and 100
 * @default 100
 * @min 0
 * @max 400
 *
 * @param fogBlend
 * @text Blend Type
 * @type select
 * @desc Set up the blend type.
 * @default 20
 * @option NORMAL
 * @value 0
 * @option ADD
 * @value 1
 * @option MULTIPLY
 * @value 2
 * @option SCREEN
 * @value 3
 * @option OVERLAY
 * @value 4
 * @option DARKEN
 * @value 5
 * @option LIGHTEN
 * @value 6
 * @option COLOR_DODGE
 * @value 7
 * @option COLOR_BURN
 * @value 8
 * @option HARD_LIGHT
 * @value 9
 * @option SOFT_LIGHT
 * @value 10
 * @option DIFFERENCE
 * @value 11
 * @option EXCLUSION
 * @value 12
 * @option HUE
 * @value 13
 * @option SATURATION
 * @value 14
 * @option COLOR
 * @value 15
 * @option LUMINOSITY
 * @value 16
 * @option NORMAL_NPM
 * @value 17
 * @option ADD_NPM
 * @value 18
 * @option SCREEN_NPM
 * @value 19
 * @option SUBTRACT
 * @value 20
 *
 * @param fogSX
 * @text SX
 * @type number
 * @desc Set up the X axis velocity.
 * if the positive value is, it will move to left.
 * @default 1
 *
 * @param fogSY
 * @text SY
 * @type number
 * @desc Set up the Y axis velocity.
 * if the positive value is, it will move to up.
 * @default 0
 *
 * @param fogSwitchId
 * @text Switch
 * @type switch
 * @desc We must turn on the switch to active the fog. Specify the switch id.
 * @default 1
 *
 * @param fogVariableId
 * @text Variable
 * @type variable
 * @desc Specify the variableId
 * @default 1
 *
 */

function Scene_LoadFog(...args) {
  this.initialize.call(this, ...args);
}

(() => {
  const RS = window.RS || {};
  RS.Fog = RS.Fog || {};

  let parameters = $plugins.filter(i => {
    return i.description.contains('<RS_Fog>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  RS.Fog.jsonParse = function (str) {
    const retData = JSON.parse(str, (k, v) => {
      try {
        return RS.Fog.jsonParse(v);
      } catch (e) {
        return v;
      }
    });
    return retData;
  };

  RS.Fog.Params = RS.Fog.Params || {};

  RS.Fog.Params.fogs = [null].concat(RS.Fog.jsonParse(parameters.fog));

  //============================================================================
  // RS.Fog
  //============================================================================

  RS.Fog.parseInt = function (value) {
    return parseInt(value, 10) || 0;
  };

  /**
   * The blend modes is useful for game sprites.
   * But its modes will change little bit in the PIXI v5.
   * The PIXI official docs website has a list of 19 blend modes except of SUBTRACT.
   *
   * Unfortunately, In the PIXI v5, its modes will add more,
   * and it collides with blend mode I've added in the PIXI v5.
   * So I'll remove a specific blend mode I added as possible for stable.
   */
  RS.Fog.fogBlendModes = {
    NORMAL: 0,
    ADD: 1,
    MULTIPLY: 2,
    SCREEN: 3,
    OVERLAY: 4,
    DARKEN: 5,
    LIGHTEN: 6,
    COLOR_DODGE: 7,
    COLOR_BURN: 8,
    HARD_LIGHT: 9,
    SOFT_LIGHT: 10,
    DIFFERENCE: 11,
    EXCLUSION: 12,
    HUE: 13,
    SATURATION: 14,
    COLOR: 15,
    LUMINOSITY: 16,
    NORMAL_NPM: 17,
    ADD_NPM: 18,
    SCREEN_NPM: 19,
    SUBTRACT: 20 /** I will remove this in the future */,
  };

  RS.Fog.loadFog = function (filename, hue) {
    return ImageManager.loadBitmap('img/fogs/', filename, hue, true);
  };

  //============================================================================
  // Game_Temp
  //============================================================================

  const _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.call(this);
    this._preloadFog = [];
  };

  Game_Temp.prototype.addFog = function (src) {
    this._preloadFog.push(src);
  };

  //============================================================================
  // Game_Event
  //============================================================================

  Game_Event.prototype.readComments = function () {
    if (this._erased) {
      return;
    }

    const data = { note: '', meta: {} };

    if (this.findProperPageIndex() === -1) {
      return;
    }

    const list = this.list();

    list.forEach(param => {
      if ([108, 408].contains(param.code)) {
        data.note += `${param.parameters[0]}\r\n`;
      }
    });

    // 노트 태그를 추출합니다 (DataManager.extractMetadata의 변형입니다)
    let re = /<([^<>:]+)(:?)([^>]*)>/g;

    data.meta = {};

    for (;;) {
      // const [m,] = re.exec(data.note);
      const matches = re.exec(data.note);

      // const [m, key, sep, value] = re.exec(data.note);
      const [m, key, sep, value] = matches || [];

      if (m) {
        if (sep === ':') {
          data.meta[key.trim()] = value;
        } else {
          data.meta[key.trim()] = true;
        }
      } else {
        break;
      }
    }

    re = /<(?:MAP FOG)[ ]*:[ ]*(\d+)>/gim;

    for (;;) {
      const match = re.exec(data.note);
      if (match) {
        data.meta.mapFogId = parseInt(match[1], 10);
      } else {
        break;
      }
    }

    this.meta = data.meta;

    if (this.meta.mapFogId) {
      const _tempId = this.meta.mapFogId;
      const mapFogData = RS.Fog.Params.fogs[_tempId];
      this.meta = mapFogData;
    }

    const { fogName, fogId } = this.meta;

    if (!this._initFog && fogName && fogId) {
      $gameTemp.addFog(fogName);

      this._initFog = parseInt(this.meta.fogId, 10);
    }
  };

  const gameEventInitialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function (mapId, eventId) {
    gameEventInitialize.call(this, mapId, eventId);
    this._initFog = false;
    this.readComments();
  };

  const gameEventRefresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function () {
    gameEventRefresh.call(this);
    this.readComments();
  };

  //============================================================================
  // Game_Map
  //============================================================================

  const gameMapInitialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    gameMapInitialize.call(this);
    this._fogX = [];
    this._fogY = [];
    this._fogSX = [];
    this._fogSY = [];
  };

  const gameMapSetDisplayPos = Game_Map.prototype.setDisplayPos;
  Game_Map.prototype.setDisplayPos = function (x, y) {
    gameMapSetDisplayPos.call(this, x, y);
    for (let i = 0; i < this._fogX.length; i++) {
      this._fogX[i] = this._parallaxX;
    }
    for (let i = 0; i < this._fogY.length; i++) {
      this._fogY[i] = this._parallaxY;
    }
  };

  const gameMapScrollDown = Game_Map.prototype.scrollDown;
  Game_Map.prototype.scrollDown = function (distance) {
    const lastY = this._displayY;
    gameMapScrollDown.call(this, distance);
    if (this.isLoopVertical()) {
      for (let i = 0; i < this._fogY.length; i++) {
        this._fogY[i] += distance;
      }
    } else if (this.height() >= this.screenTileY()) {
      for (let i = 0; i < this._fogY.length; i++) {
        this._fogY[i] += this._displayY - lastY;
      }
    }
  };

  const gameMapScrollLeft = Game_Map.prototype.scrollLeft;
  Game_Map.prototype.scrollLeft = function (distance) {
    const lastX = this._displayX;
    gameMapScrollLeft.call(this, distance);
    if (this.isLoopHorizontal()) {
      for (let i = 0; i < this._fogX.length; i++) {
        this._fogX[i] -= distance;
      }
    } else if (this.width() >= this.screenTileX()) {
      for (let i = 0; i < this._fogX.length; i++) {
        this._fogX[i] += this._displayX - lastX;
      }
    }
  };

  const _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
  Game_Map.prototype.scrollRight = function (distance) {
    const lastX = this._displayX;
    _Game_Map_scrollRight.call(this, distance);
    if (this.isLoopHorizontal()) {
      for (let i = 0; i < this._fogX.length; i++) {
        this._fogX[i] += distance;
      }
    } else if (this.width() >= this.screenTileX()) {
      for (let i = 0; i < this._fogX.length; i++) {
        this._fogX[i] += this._displayX - lastX;
      }
    }
  };

  const gameMapScrollUp = Game_Map.prototype.scrollUp;
  Game_Map.prototype.scrollUp = function (distance) {
    const lastY = this._displayY;
    gameMapScrollUp.call(this, distance);
    if (this.isLoopVertical()) {
      for (let i = 0; i < this._fogY.length; i++) {
        this._fogY[i] -= distance;
      }
    } else if (this.height() >= this.screenTileY()) {
      for (let i = 0; i < this._fogY.length; i++) {
        this._fogY[i] += this._displayY - lastY;
      }
    }
  };

  Game_Map.prototype.addFog = function (id, sx, sy) {
    this._fogX[id] = 0;
    this._fogY[id] = 0;
    this._fogSX[id] = sx;
    this._fogSY[id] = sy;
  };

  Game_Map.prototype.removeFog = function (id) {
    delete this._fogX[id];
    delete this._fogY[id];
    delete this._fogSX[id];
    delete this._fogSY[id];
  };

  const _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function (sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateFogPosition();
  };

  Game_Map.prototype.fogX = function (id) {
    return (this._fogX[id] * this.tileWidth()) / 2;
  };

  Game_Map.prototype.fogY = function (id) {
    return (this._fogY[id] * this.tileHeight()) / 2;
  };

  Game_Map.prototype.updateFogPosition = function () {
    for (let i = 0; i < this._fogX.length; i++) {
      this._fogX[i] += this._fogSX[i] / this.tileWidth() / 2;
      this._fogY[i] += this._fogSY[i] / this.tileHeight() / 2;
    }
  };

  //============================================================================
  // Spriteset_Map
  //============================================================================

  Spriteset_Map.prototype.addSubtractBlendMode = function () {
    if (Graphics.isWebGL()) {
      const { gl } = Graphics._renderer;
      Graphics._renderer.state.blendModes[20] = [
        gl.ZERO,
        gl.ONE_MINUS_SRC_COLOR,
      ];
    }
  };

  Spriteset_Map.prototype.createFog = function () {
    this._fogContainer = new Sprite();
    this.addChild(this._fogContainer);

    /**
     * <fogId : 1>
     * <fogName : myFog>
     * <fogOpacity : 255>
     * <fogZoom : 100>
     * <fogBlend : 0>
     * <fogSX : 2>
     * <fogSY : 0>
     */
    $gameMap.events().forEach(event => {
      if (event.meta && (event.meta.fogName || event.meta.mapFogId)) {
        const sprite = new TilingSprite();
        sprite.move(0, 0, Graphics.width, Graphics.height);
        sprite.bitmap = RS.Fog.loadFog(event.meta.fogName);
        sprite.visible = false;

        let { meta } = event;

        if (event.meta.mapFogId) {
          const data = RS.Fog.Params.fogs[event.meta.mapFogId];
          meta = data;
        }

        sprite.fog = {
          id: RS.Fog.parseInt(meta.fogId),
          name: meta.fogName,
          opacity: RS.Fog.parseInt(meta.fogOpacity),
          zoom: RS.Fog.parseInt(meta.fogZoom),
          blend: RS.Fog.parseInt(meta.fogBlend),
          sx: RS.Fog.parseInt(meta.fogSX),
          sy: RS.Fog.parseInt(meta.fogSY),
          switcheId: RS.Fog.parseInt(meta.fogSwitchId),
          variableId: RS.Fog.parseInt(meta.fogVariableId),
        };

        this._fogContainer.addChild(sprite);
        $gameMap.addFog(sprite.fog.id, sprite.fog.sx, sprite.fog.sy);
      }
    });

    this.on('removed', this.removeFog, this);
  };

  Spriteset_Map.prototype.removeFog = function () {
    if (!this._fogContainer) return;
    this._fogContainer.children.forEach(sprite => {
      const meta = sprite.fog;
      $gameMap.removeFog(meta.id);
    });
  };

  Spriteset_Map.prototype.updateFog = function () {
    if (!this._fogContainer) return;
    const removeChilds = [];

    this._fogContainer.children.forEach(sprite => {
      const meta = sprite.fog;
      const mode = $gameVariables.value(meta.variableId);
      const opacity = meta.opacity.clamp(0, 255);

      if (mode === 0) {
        sprite.opacity = opacity;
      } else if (mode === 1) {
        if (sprite.opacity > 0) {
          sprite.opacity--;
        }
        if (sprite.opacity <= 0) {
          sprite.opacity = 0;
          $gameSwitches.setValue(meta.switcheId, false);
          $gameVariables.setValue(meta.variableId, 0);
        }
      } else if (mode === 2) {
        if (sprite._opacityDirty) {
          if (sprite.opacity < opacity) {
            sprite.opacity++;
          }

          if (sprite.opacity >= opacity) {
            sprite.opacity = opacity;
            $gameVariables.setValue(meta.variableId, 0);
            sprite._opacityDirty = false;
          }
        } else {
          sprite.opacity = 0;
          $gameSwitches.setValue(meta.switcheId, true);
          sprite._opacityDirty = true;
        }
      }

      sprite.visible = $gameSwitches.value(meta.switcheId);

      if (!sprite.bitmap || sprite.bitmap.width <= 0) {
        sprite.bitmap = RS.Fog.loadFog(meta.fogName);
      }

      sprite.origin.x = $gameMap.fogX(meta.id) || 0;
      sprite.origin.y = $gameMap.fogY(meta.id) || 0;

      sprite.blendMode = meta.blend;

      sprite.scale.x = meta.zoom / 100.0;
      sprite.scale.y = meta.zoom / 100.0;
    });

    this._fogContainer.children.sort((a, b) => {
      return a.fog.id - b.fog.id;
    });

    removeChilds.forEach(i => {
      this._fogContainer.removeChildAt(i);
    });
  };

  const _Spriteset_Map_createLowerLayer =
    Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    _Spriteset_Map_createLowerLayer.call(this);
    this.addSubtractBlendMode();
    this.createFog();
  };

  const _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    _Spriteset_Map_update.call(this);
    this.updateFog();
  };

  //============================================================================
  // Scene_Map
  //============================================================================

  const alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    alias_Scene_Map_start.call(this);
    if ($gameTemp._preloadFog && $gameTemp._preloadFog.length >= 1) {
      SceneManager.push(Scene_LoadFog);
    }
  };

  //============================================================================
  // Scene_LoadFog
  //============================================================================

  Scene_LoadFog.prototype = Object.create(Scene_Base.prototype);
  Scene_LoadFog.prototype.constructor = Scene_LoadFog;

  Scene_LoadFog.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._images = $gameTemp._preloadFog || [];
  };

  Scene_LoadFog.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this._images.forEach(src => {
      RS.Fog.loadFog(src);
    });
  };

  Scene_LoadFog.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
  };

  Scene_LoadFog.prototype.isReady = function () {
    if (Scene_Base.prototype.isReady.call(this)) {
      return ImageManager.isReady();
    }

    return false;
  };

  Scene_LoadFog.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    $gameTemp._preloadFog = [];
    SceneManager.pop();
  };
})();
