//================================================================
// RS_WaveFilter.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2022 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc <RS_WaveFilter>
 * @author biud436
 * @url https://github.com/biud436
 *
 * @help
 *
 * =============================================================================
 * Sprite
 * =============================================================================
 * The following properties applies the wave effect to Sprite.
 * For Information, Refer to http://biud436.tistory.com/17
 *
 *    - wave : The default value is false.
 *    - wave_amp : The default value is to 0.05
 *    - wave_length : The default value is to a maxHeight (deprecated)
 *    - wave_speed : The default value is to 0.25
 *    - wave_phase : The default value is to 360
 *
 * =============================================================================
 * Picture
 * =============================================================================
 * This plugin command would activate the wave effect to your picture:
 *
 *    PictureWave Start picture_id wave_speed wave_amp
 *      - picture_id : Specify the id of the game picture.
 *      - wave_speed : The available value is the number between 0 and 1.
 *                    (The default value is to 0.25)
 *      - wave_amp : The available value is the number between 0 and 1.
 *                   (The default value is to 0.05)
 *
 * This plugin command would deactivate the wave effect of your picture:
 *
 *    PictureWave Stop picture_id
 *      - picture_id : Specify the id of the game picture.
 *
 * =============================================================================
 * Tilemap
 * =============================================================================
 *
 * The following plugin commands applies the wave effect to Tilemap.
 * This plugin contains these six types the plugin commands.
 *
 * These plugin commands allow you to enable or disable the wave effect
 *
 *    TilemapWave Enable
 *    TilemapWave Disable
 *
 * This plugin command allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 2.
 * Default value is to 2.0. But the fragment shader does not use this value.
 *
 *    TilemapWave waveSpeed x
 *
 * This plugin command allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.02
 *
 *    TilemapWave waveFrequency x
 *
 * This plugin command allows you to set the UV speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.25
 *
 *    TilemapWave UVSpeed x
 *
 * =============================================================================
 * Event Notetags
 * =============================================================================
 *
 * Notetags :
 *
 * These note tags allow you to enable or disable the wave effect.
 *    <WAVE true>
 *    <WAVE false>
 *
 * This note tag allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * the default value is to 0.02
 *
 *    <WAVE_AMP x>
 *
 * This note tag allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * the default value is to 0.25
 *
 *    <WAVE_SPEED x>
 *
 * =============================================================================
 * Battle Notetags
 * =============================================================================
 *
 * These note tags allow you to set the wave effect.
 * You have to put the note tags in the note area of the map properties.
 *
 *    <BATTLEBACK_WAVE : x y>
 *
 *    These values must replace by a real value such as 0.02
 *    - x : the x value is the same as a waveFrequency.
 *    - y : the y value is the same as a waveSpeed.
 *
 *    For Example :
 *    <BATTLEBACK_WAVE : 0.02 0.25>
 *
 * When using Yanfly's Action Sequence Pack 1, you can enable its filter too.
 * This function has the pointer of the Spriteset_Battle and easy to use.
 *
 *    eval: $gameTemp.setBattleBackWaveEffect(cond, waveAmp, waveSpeed);
 *      - cond : Specify true or false whether the wave effect is used.
 *      - waveAmp : the default value is to 0.02
 *      - waveSpeed : the default value is to 0.25
 *
 * =============================================================================
 * Timing
 * =============================================================================
 * if you want to fade-out or fade-in the properties of the wave effect applied to the picture,
 * Let's call the following function.
 *
 * waveUtils.quadraticBezier(start, median, end, dt);
 *
 * dt stands for delta time, The delta time parameter is the elapsed time since the last frame.
 * if you omit it, The wave filter will measure the elapsed time automatically
 * and fill it (In fact, It will be filled with the current time value)
 *
 * To get started with implementing this, add this code just using the script command.
 *
 * var _s, _p, _e, _r;
 * _s = new Point(0.0, 0.0);
 * _p = new Point(0.07, 0.25);
 * _e = new Point(0.0, 0.0);
 * _r = waveUtils.quadraticBezier(_s, _p, _e);
 * $gameScreen.startWave(1, _r.x, _r.y);
 *
 * The value of the wave speed is started with 0.0 and then increased until 0.07 and then decreased to 0.0.
 * The value of the wave amplitude is also started with 0.0 and then increased until 0.25 and then decreased to 0.0.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.14 (v1.0.0) - First Release.
 * 2016.01.16 (v1.0.1) - Added the function to remove the filter.
 * 2016.01.18 (v1.1.0) - Added the plugin command.
 * 2016.01.22 (v1.2.0) - Fixed the Save and Load bug
 * 2016.02.16 (v1.3.0) - Fixed Bug (After the player came back to Menu, you had to set the wave effect again)
 * 2016.02.26 (v1.3.1) - Fixed the default padding value of the sprite. (default value is to 512)
 * 2016.03.03 (v1.3.2) - Added new Sprite Properties (wave_amp, wave_speed, wave_length, wave_phase)
 * 2016.08.17 (v1.4.0) - Fixed the issue that is not working in RMMV 1.3.0 (This filter does not support for the time being in Tile-map)
 * 2016.08.18 (v1.5.0) - Supports a wave filter in ShaderTilemap.
 * 2016.10.20 (v1.5.1) - Fixed the issue that is not working in RMMV 1.3.2
 * 2016.11.10 (v1.5.2) - Fixed the issue that is not working in Orange Overlay plugin.
 * 2016.11.18 (v1.5.3) - Fixed an issue where the original tilemap is rendered when using Orange Overlay plugin.
 * 2016.11.26 (v1.5.4) - Added certain code to remove the texture from memory.
 * 2016.11.30 (v1.5.5) - Fixed the issue that has the black border in a filter area.
 * 2017.12.10 (v1.5.6) - Added the plugin command called 'PictureWave' (it is tested on 1.6.0 beta version)
 * 2018.04.12 (v1.5.7) - Fixed a cutting issue.
 * 2018.04.13 (v1.5.7c) - Added the event note tags that can have the wave effect directly for an event graphic.
 * 2018.04.15 (v1.5.7e) - Added a new feature that can apply the wave filter in the battle background images
 * 2018.04.25 (v1.5.7f) - Fixed the note tag error in Battle Test.
 * 2018.05.09 (v1.5.8) - Fixed the bug that is not working the wave filter for the battleback image.
 * 2018.11.01 (v1.5.9) :
 * - Fixed the issue that the wave filter is not working in the game picture.
 * - Fixed the issue that the wave effect do a horizontal looping likes as Tiling Sprite.
 * 2018.11.29 (v1.5.10) :
 * - Fixed the bug that causes an error when calling Erase Event event command.
 * 2019.02.24 (v1.5.11) :
 * - Fixed an issue that is not loaded a save file that you saved before using this script.
 * 2020.08.03 (v1.6.0) :
 * - Performance optimization.
 * 2021.10.27 (v1.6.1) :
 * - added the warning message when the certain game picture is not displayed.
 * 2022.06.06 (v2.0.0-rc1) :
 * - Now this plugin is now supported in RPG Maker MZ v1.5.0
 * =============================================================================
 * Terms of Use
 * =============================================================================
 * Free for commercial and non-commercial use
 *
 * @command enableTileMapWave
 * @text Enable Tilemap Wave
 * @desc Enable the wave effect on the tilemap
 *
 * @command disableTileMapWave
 * @text Disable Tilemap Wave
 * @desc Disable the wave effect on the tilemap
 *
 * @command waveSpeed
 * @text Set Wave Speed
 * @desc Sets the speed of the wave effect.
 *
 * @arg waveSpeed
 * @type number
 * @text Wave Speed
 * @desc the value is a floating-point number between 0 and 2.
 * @default 0.25
 * @decimals 2
 *
 * @command waveFrequency
 * @text Set Wave Frequency
 * @desc Set the wave frequency
 *
 * @arg waveFrequency
 * @type number
 * @desc the value is a floating-point number between 0 and 1.
 * @default 0.02
 * @decimals 2
 *
 * @command Set UVSpeed
 * @text Set UV Speed
 * @desc Set the UV speed of the wave effect
 *
 * @arg uvSpeed
 * @type number
 * @text UV Speed
 * @desc the value is a floating-point number between 0 and 1.
 * @default 0.25
 * @decimals 2
 *
 * @command startPictureWave
 * @text Start Picture Wave
 * @desc This plugin command would activate the wave effect to your picture.
 *
 * @arg pictureId
 * @type number
 * @text Picture ID
 * @desc pecify the id of the game picture.
 * @default 1
 *
 * @arg waveSpeed
 * @type number
 * @text Wave Speed
 * @desc The available value is the number between 0 and 1.
 * @default 0.25
 * @decimals 2
 *
 * @arg waveAmp
 * @type number
 * @text Wave Speed
 * @desc The available value is the number between 0 and 1.
 * @default 0.05
 * @decimals 2
 *
 * @command stopPictureWave
 * @text Stop Picture Wave
 * @desc This plugin command would deactivate the wave effect of your picture.
 *
 * @arg pictureId
 * @type number
 * @text Picture ID
 * @desc pecify the id of the game picture.
 * @default 1
 *
 */
(() => {
    "use strict";

    const pluginParams = $plugins.filter((i) => {
        return i.description.contains("<RS_WaveFilter>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    // PIXI.WaveFilter
    PIXI.WaveFilter = function () {
        const vertexSrc = [
            "attribute vec2 aVertexPosition;",
            "attribute vec2 aTextureCoord;",

            "uniform mat3 projectionMatrix;",

            "varying vec2 vTextureCoord;",

            "void main(void){",
            "    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);",
            "    vTextureCoord = aTextureCoord;",
            "}",
        ].join("\n");

        const fragmentSrc = [
            "precision mediump float;",

            "varying vec2 vTextureCoord;",

            "uniform float waveHeight;",
            "uniform float waveFrequency;",
            "uniform float waveTime;",
            "uniform float wavePhase;",
            "uniform float UVSpeed;",

            "uniform vec4 filterArea;",
            "uniform vec4 filterClamp;",
            "uniform vec2 origin;",

            "uniform sampler2D uSampler;",

            "void main(void) {",
            "   float time = waveFrequency * sin( wavePhase * (waveTime - vTextureCoord.y / (waveHeight / filterArea.y)) );",
            "   vec2 vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);",
            "   gl_FragColor = texture2D(uSampler, clamp(vCoord, filterClamp.xy, filterClamp.zw));",
            "}",
        ].join("\n");

        PIXI.Filter.call(this, vertexSrc, fragmentSrc, {
            waveHeight: 0.5,
            waveFrequency: 0.02,
            waveTime: 0.0,
            UVSpeed: 0.25,
            origin: new PIXI.Point(0, 0),
            wavePhase: 3.141592653589793 * 2,
        });

        this.enabled = true;
        this.resolution = 1;
        this.legacy = true;
    };

    PIXI.WaveFilter.prototype = Object.create(PIXI.Filter.prototype);
    PIXI.WaveFilter.prototype.constructor = PIXI.WaveFilter;

    PIXI.WaveFilter.prototype.apply = function (
        filterManager,
        input,
        output,
        clear
    ) {
        this.uniforms.waveHeight = input.sourceFrame.height / 4;

        filterManager.applyFilter(this, input, output, clear);
    };

    Object.defineProperties(PIXI.WaveFilter.prototype, {
        waveHeight: {
            get: function () {
                return this.uniforms.waveHeight;
            },
            set: function (value) {
                this.uniforms.waveHeight = value;
            },
        },
        waveSpeed: {
            get: function () {
                return this.uniforms.UVSpeed;
            },
            set: function (value) {
                this.uniforms.UVSpeed = value;
            },
        },
        waveFrequency: {
            get: function () {
                return this.uniforms.waveFrequency;
            },
            set: function (value) {
                this.uniforms.waveFrequency = value;
            },
        },
        UVSpeed: {
            get: function () {
                return this.uniforms.UVSpeed;
            },
            set: function (value) {
                this.uniforms.UVSpeed = value;
            },
        },
        waveTime: {
            get: function () {
                return this.uniforms.waveTime;
            },
            set: function (value) {
                this.uniforms.waveTime = value;
            },
        },
        wavePhase: {
            get: function () {
                return this.uniforms.wavePhase;
            },
            set: function (value) {
                this.uniforms.wavePhase = (Math.PI / 180) * Number(value);
            },
        },
        origin: {
            get: function () {
                return this.uniforms.origin;
            },
            set: function (value) {
                this.uniforms.origin = value;
            },
        },
    });

    //============================================================================
    // Sprite
    //============================================================================

    const alias_Sprite_initialize = Sprite.prototype.initialize;
    Sprite.prototype.initialize = function (bitmap) {
        alias_Sprite_initialize.call(this, bitmap);
        this.initWithWaveFeatures();
    };

    Sprite.prototype.initWithWaveFeatures = function () {
        this._waveTime = 0;
        this._waveHeight = 0.5;
        this._waveSpeed = 0.25;
        this._waveFrequency = 0.02;
        this._wavePhase = 360;
        this._waveFilter = null;
        this._wave = false;
        this._isWaveDirty = false;
    };

    const alias_Sprite_update = Sprite.prototype.update;
    Sprite.prototype.update = function () {
        alias_Sprite_update.call(this);
        this.waveUpdate();
    };

    Sprite.prototype.getWaveFrameTime = function () {
        this._waveTime = (Date.now() % 10000) / 10000;
        return this._waveTime;
    };

    Sprite.prototype.setWaveHeight = function (n) {
        this._waveHeight = this.height;
    };

    Sprite.prototype.getWaveHeight = function () {
        return this._waveHeight;
    };

    Sprite.prototype.waveUpdate = function () {
        if (this._wave) {
            this._waveFilter.waveTime = this.getWaveFrameTime();
            this._waveFilter.waveHeight = this.getWaveHeight();
            this._waveFilter.waveSpeed = this._waveSpeed;
            this._waveFilter.waveFrequency = this._waveFrequency;
            this._waveFilter.wavePhase = this._wavePhase;
            this._waveFilter.origin.x = $gameMap.canvasToMapX(this.x);
            this._waveFilter.origin.y = $gameMap.canvasToMapY(this.y);
        }
    };

    Object.defineProperty(Sprite.prototype, "waveSpeed", {
        get: function () {
            return this._waveSpeed;
        },
        set: function (value) {
            this._waveSpeed = value;
        },
    });

    Object.defineProperty(Sprite.prototype, "waveFrequency", {
        get: function () {
            return this._waveFrequency;
        },
        set: function (value) {
            this._waveFrequency = value;
        },
    });

    Object.defineProperty(Sprite.prototype, "wave_amp", {
        get: function () {
            return this._waveFrequency;
        },
        set: function (value) {
            this._waveFrequency = value;
        },
    });

    Object.defineProperty(Sprite.prototype, "wave_length", {
        get: function () {
            return this._waveHeight;
        },
        set: function (value) {
            this.setWaveHeight(value);
        },
    });

    Object.defineProperty(Sprite.prototype, "wave_speed", {
        get: function () {
            return this._waveSpeed;
        },
        set: function (value) {
            this._waveSpeed = value;
        },
    });

    Object.defineProperty(Sprite.prototype, "wave_phase", {
        get: function () {
            return this._wavePhase;
        },
        set: function (value) {
            this._wavePhase = value;
        },
    });

    Object.defineProperty(Sprite.prototype, "wave", {
        get: function () {
            return this._wave;
        },
        set: function (value) {
            this._wave = value;
            this._isWaveDirty = true;

            if (this._wave) {
                if (!this._waveFilter) {
                    this._waveFilter = new PIXI.WaveFilter();
                }
                this.filterArea = new PIXI.Rectangle(
                    0,
                    0,
                    Graphics.width,
                    Graphics.height
                );
                this.filters = [this._waveFilter];
            } else {
                this.filters = [PIXI.filters.AlphaFilter];
            }
        },
        configurable: true,
    });

    //============================================================================
    // TilingSprite
    //============================================================================

    const alias_TilingSprite_initialize = TilingSprite.prototype.initialize;
    TilingSprite.prototype.initialize = function (bitmap) {
        alias_TilingSprite_initialize.call(this, bitmap);
        this.initWithWaveFeatures();
    };

    TilingSprite.prototype.initWithWaveFeatures = function () {
        this._waveTime = 0;
        this._waveHeight = 0.5;
        this._waveSpeed = 0.25;
        this._waveFrequency = 0.02;
        this._wavePhase = 360;
        this._waveFilter = null;
        this._wave = false;
    };

    const alias_TilingSprite_update = TilingSprite.prototype.update;
    TilingSprite.prototype.update = function () {
        alias_TilingSprite_update.call(this);
        this.waveUpdate();
    };

    TilingSprite.prototype.getWaveFrameTime = function () {
        this._waveTime = (Date.now() % 10000) / 10000;
        return this._waveTime;
    };

    TilingSprite.prototype.setWaveHeight = function (n) {
        this._waveHeight = this.height;
    };

    TilingSprite.prototype.getWaveHeight = function () {
        return this._waveHeight;
    };

    TilingSprite.prototype.waveUpdate = function () {
        if (this._wave) {
            this._waveFilter.waveTime = this.getWaveFrameTime();
            this._waveFilter.waveHeight = this.getWaveHeight();
            this._waveFilter.waveSpeed = this._waveSpeed;
            this._waveFilter.waveFrequency = this._waveFrequency;
            this._waveFilter.wavePhase = this._wavePhase;
        }
    };

    Object.defineProperty(TilingSprite.prototype, "waveSpeed", {
        get: function () {
            return this._waveSpeed;
        },
        set: function (value) {
            this._waveSpeed = value;
        },
    });

    Object.defineProperty(TilingSprite.prototype, "waveFrequency", {
        get: function () {
            return this._waveFrequency;
        },
        set: function (value) {
            this._waveFrequency = value;
        },
    });

    Object.defineProperty(TilingSprite.prototype, "wave_amp", {
        get: function () {
            return this._waveFrequency;
        },
        set: function (value) {
            this._waveFrequency = value;
        },
    });

    Object.defineProperty(TilingSprite.prototype, "wave_length", {
        get: function () {
            return this._waveHeight;
        },
        set: function (value) {
            this.setWaveHeight(value);
        },
    });

    Object.defineProperty(TilingSprite.prototype, "wave_speed", {
        get: function () {
            return this._waveSpeed;
        },
        set: function (value) {
            this._waveSpeed = value;
        },
    });

    Object.defineProperty(TilingSprite.prototype, "wave_phase", {
        get: function () {
            return this._wavePhase;
        },
        set: function (value) {
            this._wavePhase = value;
        },
    });

    Object.defineProperty(TilingSprite.prototype, "wave", {
        get: function () {
            return this._wave;
        },
        set: function (value) {
            this._wave = value;

            if (this._wave) {
                if (!this._waveFilter) {
                    this._waveFilter = new PIXI.WaveFilter();
                }
                this.filterArea = new PIXI.Rectangle(
                    0,
                    0,
                    Graphics.width,
                    Graphics.height
                );
                this.filters = [this._waveFilter];
            } else {
                this.filters = [new PIXI.filters.AlphaFilter()];
            }
        },
        configurable: true,
    });

    //============================================================================
    // Sprite_Picture
    //============================================================================

    Sprite_Picture.prototype.updateWave = function () {
        const picture = this.picture();
        const isValidWave = picture.wave();
        if (isValidWave !== this.wave) {
            this.wave = isValidWave;
        }
        this.wave_speed = picture.waveSpeed();
        this.wave_amp = picture.waveAmp();
    };

    const alias_Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function () {
        alias_Sprite_Picture_update.call(this);
        if (this.visible) {
            this.updateWave();
        }
    };

    //============================================================================
    // Spriteset_Map
    //============================================================================

    const alias_Spriteset_Map_createLowerLayer =
        Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function () {
        alias_Spriteset_Map_createLowerLayer.call(this);
        this.overwriteWaveProperty();
    };

    Spriteset_Map.prototype.overwriteWaveProperty = function () {
        if (!this._baseSprite) return false;
        const self = this;

        Object.defineProperty(this._baseSprite, "wave", {
            get: function () {
                return this._wave;
            },
            set: function (value) {
                const existingFilter = this._waveFilter;
                this._wave = value;
                if (this._wave) {
                    if (!this._waveFilter) {
                        this._waveFilter = new PIXI.WaveFilter();
                        this.filters = [this._waveFilter].concat(this.filters);
                    }
                } else {
                    this.filters = this.filters.filter((filter) => {
                        return filter !== existingFilter;
                    });
                }
            },
        });
    };

    const alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        alias_Spriteset_Map_update.call(this);
        this.updateWaveFilter();
    };

    Spriteset_Map.prototype.updateWaveFilter = function () {
        if ($gameSystem && $gameSystem.getWaveEnabled) {
            this._baseSprite.wave = $gameSystem.getWaveEnabled() || false;
            this._baseSprite.wave_amp = $gameSystem.getWaveFrequency() || 0.02;
            this._baseSprite.wave_phase = $gameSystem.getWavePhase() || 360;
            this._baseSprite.wave_speed = $gameSystem.getUVSpeed() || 0.25;
        }
    };

    //============================================================================
    // Spriteset_Battle
    //============================================================================

    const alias_Spriteset_Battle_createBattleback =
        Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function () {
        alias_Spriteset_Battle_createBattleback.call(this);
        this.initWithWaveEffect();
    };

    Spriteset_Battle.prototype.initWithWaveEffect = function () {
        if (!$dataMap) return;

        const note = $dataMap.note.split(/[\r\n]+/);

        note.forEach((mapNote) => {
            if ($dataMap.note.match(/<BATTLEBACK_WAVE[ ]:[ ]*(.*)[ ](.*)>/i)) {
                this._initWaveFilter = true;
                this.changeWaveEffect(true, RegExp.$1, RegExp.$2);
            }
        });
    };

    Spriteset_Battle.prototype.changeWaveEffect = function (cond, fre, spd) {
        if (!this._initWaveFilter) return;
        const backs = [this._back1Sprite, this._back2Sprite];
        backs.forEach((back) => {
            back.wave = cond;
            back.waveFrequency = parseFloat(fre) || 0.02;
            back.waveSpeed = parseFloat(spd) || 0.25;
        }, this);
    };

    //============================================================================
    // Game_Picture
    //============================================================================

    const alias_Game_Picture_initBasic = Game_Picture.prototype.initBasic;
    Game_Picture.prototype.initBasic = function () {
        alias_Game_Picture_initBasic.call(this);
        this._wave = false;
        this._waveSpeed = 0.25;
        this._waveAmp = 0.02;
    };

    Game_Picture.prototype.wave = function () {
        return this._wave;
    };

    Game_Picture.prototype.waveSpeed = function () {
        return this._waveSpeed;
    };

    Game_Picture.prototype.waveAmp = function () {
        return this._waveAmp;
    };

    Game_Picture.prototype.startWave = function (waveSpeed, waveAmp) {
        this._wave = true;
        this._waveSpeed = waveSpeed;
        this._waveAmp = waveAmp;
    };

    Game_Picture.prototype.stopWave = function () {
        this._wave = false;
    };

    //============================================================================
    // Game_Screen
    //============================================================================

    Game_Screen.prototype.startWave = function (pictureId, waveSpeed, waveAmp) {
        const picture = this.picture(pictureId);
        if (!picture) {
            console.info(
                `Cannot find the game picture ${pictureId}. Note that you can set the picture before starting the wave effect`
            );
            return;
        }
        picture.startWave(waveSpeed, waveAmp);
    };

    Game_Screen.prototype.stopWave = function (pictureId) {
        const picture = this.picture(pictureId);
        if (picture) {
            picture.stopWave();
        }
    };

    //============================================================================
    // Game_Temp
    //============================================================================

    /**
     * In Action Sequence Pack 1, you can use this function.
     * eval: $gameTemp.setBattleBackWaveEffect(cond, waveAmp, waveSpeed);
     */
    Game_Temp.prototype.setBattleBackWaveEffect = function (cond, fre, spd) {
        if (!$gameParty.inBattle()) return;
        const container = SceneManager._scene._spriteset;
        if (container) {
            container.changeWaveEffect(cond, fre, spd);
        }
    };

    //============================================================================
    // Game_System
    //============================================================================

    const alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        alias_Game_System_initialize.call(this);
        this.initWaveProperty();
    };

    Game_System.prototype.initWaveProperty = function () {
        this._waveProp = {
            wave: false,
            waveHeight: Graphics.height,
            waveFrequency: 0.02,
            waveTime: 0.0,
            UVSpeed: 0.25,
            wavePhase: 360,
        };
    };

    Game_System.prototype.setWaveProperty = function (name, value) {
        if (this._waveProp) {
            this._waveProp[name] = value;
            return this._waveProp[name];
        }
        return 0.0;
    };

    Game_System.prototype.getWaveEnabled = function () {
        if (!this._waveProp) this.initWaveProperty();
        return this._waveProp.wave;
    };

    Game_System.prototype.getWaveHeight = function () {
        if (!this._waveProp) this.initWaveProperty();
        return this._waveProp.waveHeight;
    };

    Game_System.prototype.getWaveFrequency = function () {
        if (!this._waveProp) this.initWaveProperty();
        return this._waveProp.waveFrequency;
    };

    Game_System.prototype.getWaveTime = function () {
        if (!this._waveProp) this.initWaveProperty();
        return this._waveProp.waveTime;
    };

    Game_System.prototype.getUVSpeed = function () {
        if (!this._waveProp) this.initWaveProperty();
        return this._waveProp.UVSpeed;
    };

    Game_System.prototype.getWavePhase = function () {
        if (!this._waveProp) this.initWaveProperty();
        return this._waveProp.wavePhase;
    };

    //============================================================================
    // Game_CharacterBase
    //============================================================================

    const alias_Game_CharacterBase_initMembers =
        Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function () {
        alias_Game_CharacterBase_initMembers.call(this);
        this._wave = false;
        this._waveFrequency = 0.02;
        this._waveSpeed = 0.25;
    };

    Game_CharacterBase.prototype.setWave = function (toggle) {
        this._wave = toggle;
    };

    Game_CharacterBase.prototype.setWaveFrequency = function (value) {
        this._waveFrequency = value;
    };

    Game_CharacterBase.prototype.setWaveSpeed = function (value) {
        this._waveSpeed = value;
    };

    Game_CharacterBase.prototype.wave = function () {
        return this._wave;
    };

    Game_CharacterBase.prototype.waveFrequency = function () {
        return this._waveFrequency || 0.02;
    };

    Game_CharacterBase.prototype.waveSpeed = function () {
        return this._waveSpeed || 0.25;
    };

    //============================================================================
    // Sprite_Character
    //============================================================================

    const alias_Sprite_Character_updatePosition =
        Sprite_Character.prototype.updatePosition;
    Sprite_Character.prototype.updatePosition = function () {
        alias_Sprite_Character_updatePosition.call(this);
        if (!this._character) return;
        if (!(this._character instanceof Game_Event)) return;
        const isValidWave = this._character.wave();
        if (this.wave !== isValidWave) this.wave = isValidWave;
        if (this.wave) {
            this.waveFrequency = this._character.waveFrequency();
            this.waveSpeed = this._character.waveSpeed();
        }
    };

    //============================================================================
    // Game_Map
    //============================================================================

    const alias_Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function () {
        alias_Game_Event_initMembers.call(this);
        this._lastPageIndex = -2;
    };

    Game_Event.prototype.updateWaveEffect = function () {
        if (this._pageIndex === this._lastPageIndex) return;
        if (!this.page()) return false;
        if (this.findProperPageIndex() < 0) return false;
        if (this._trigger > 3) return false;

        this.list().forEach((list) => {
            const code = list.code;
            const parameters = list.parameters;

            if ([108, 408].includes(code)) {
                if (parameters[0].match(/<(?:WAVE)[ ](.*)>/i)) {
                    this.setWave(Boolean(RegExp.$1 == "true"));
                }
                if (parameters[0].match(/<(?:WAVE_AMP)[ ](.*)>/i)) {
                    this.setWaveFrequency(parseFloat(RegExp.$1) || 0.02);
                }
                if (parameters[0].match(/<(?:WAVE_SPEED)[ ](.*)>/i)) {
                    this.setWaveSpeed(parseFloat(RegExp.$1) || 0.25);
                }
            }
        });

        this._lastPageIndex = this._pageIndex;
    };

    const alias_Game_Event_refresh = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function () {
        alias_Game_Event_refresh.call(this);
        this.updateWaveEffect();
    };

    //============================================================================
    // Wave Utils
    //============================================================================

    window.waveUtils = {};

    /**
   * @example
    var _s, _e, _r;
    _s = new Point(0.0, 0.0);
    _e = new Point(0.07, 0.25);
    _r = waveUtils.mix(_s, _e);
    $gameScreen.startWave(1, _r.x, _r.y);
   */
    waveUtils.mix = function (vec1, vec2, t) {
        let vec = new Point(0, 0);
        if (!t) t = (Date.now() % 10000) / 10000;
        vec.x = vec1.x + t * (vec2.x - vec1.x);
        vec.y = vec1.x + t * (vec2.y - vec1.y);
        return vec;
    };

    /**
   * @example
    var _s, _p, _e, _r;
    _s = new Point(0.0, 0.0);
    _p = new Point(0.07, 0.25);
    _e = new Point(0.0, 0.0);
    _r = waveUtils.quadraticBezier(_s, _p, _e);
    $gameScreen.startWave(1, _r.x, _r.y);
   */
    waveUtils.quadraticBezier = function (vec1, vec2, vec3, t) {
        let d, e, p;
        if (!t) t = (Date.now() % 10000) / 10000;
        d = waveUtils.mix(vec1, vec2, t);
        e = waveUtils.mix(vec2, vec3, t);
        p = waveUtils.mix(d, e, t);
        return p;
    };

    //============================================================================
    // PluginManager
    //============================================================================

    PluginManager.registerCommand(pluginName, "enableTileMapWave", () => {
        $gameSystem.setWaveProperty("wave", true);
    });

    PluginManager.registerCommand(pluginName, "disableTileMapWave", () => {
        $gameSystem.setWaveProperty("wave", false);
    });

    PluginManager.registerCommand(
        pluginName,
        "waveSpeed",
        /**
         * @param {{waveSpeed: number}} args
         */
        (args) => {
            $gameSystem.setWaveProperty("waveSpeed", Number(args.waveSpeed));
        }
    );

    PluginManager.registerCommand(
        pluginName,
        "waveFrequency",
        /**
         * @param {{waveFrequency: number}} args
         */
        (args) => {
            $gameSystem.setWaveProperty(
                "waveFrequency",
                Number(args.waveFrequency)
            );
        }
    );

    PluginManager.registerCommand(
        pluginName,
        "Set UVSpeed",
        /**
         * @param {{uvSpeed: number}} args
         */
        (args) => {
            $gameSystem.setWaveProperty("UVSpeed", Number(args.uvSpeed));
        }
    );

    PluginManager.registerCommand(
        pluginName,
        "startPictureWave",
        /**
         * @param {{pictureId: number, waveSpeed: number, waveAmp: number}} args
         */
        (args) => {
            $gameScreen.startWave(
                Number(args.pictureId),
                Number(args.waveSpeed),
                Number(args.waveAmp)
            );
        }
    );

    PluginManager.registerCommand(
        pluginName,
        "stopPictureWave",
        /**
         * @param {{pictureId: number}} args
         */
        (args) => {
            $gameScreen.stopWave(Number(args.pictureId));
        }
    );
})();
