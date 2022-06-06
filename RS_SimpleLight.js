//================================================================
// RS_SimpleLight.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2022 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc This plugin allows you to create a light effect. <RS_SimpleLight>
 * @author biud436
 *
 * @help
 * ===============================================================
 * Version Log
 * ===============================================================
 * 2016.02.13 (v1.0.0) - First Release
 * 2018.12.30 (v1.1.0) :
 * - Now it is supported in RPG Maker MV v1.6.1.
 * (I've been rewritten shader for RPG Maker MV v1.6.1)
 * 2019.02.24 (v1.1.01) :
 * - Fixed an issue that is not loaded a save file that you saved before using this plugin.
 * 2022.06.06 (v2.0.0-rc1) : RPG Maker MZ v1.5.0 is now supported.
 *
 * @command enable
 * @text Enable
 * @desc Enable the lighting effect.
 *
 * @command disable
 * @text Disable
 * @desc Disable the lighting effect.
 */

(() => {
    "use strict";

    let parameters = $plugins.filter(function (i) {
        return i.description.contains("<RS_SimpleLight>");
    });

    // eslint-disable-next-line no-unused-vars
    parameters = parameters.length > 0 && parameters[0].parameters;

    PIXI.SimpleLightFilter = function () {
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

        const fragmentSrc = `
    
    precision mediump float;
    
    const float PI = 3.14159265359;
    const float TWO_PI = 6.28318530718;
    
    uniform vec2 u_resolution;
    uniform int u_dir;
    uniform float u_size;
    uniform vec2 u_position;
    uniform mat4 u_color;
    
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;

    uniform vec4 filterArea;
    uniform vec4 filterClamp;      
    
    vec2 get_player_offset(int d) {
        vec2 offset = vec2(0.0);
        if(d == 2) {
            offset = vec2(0.0, 1.0) * 0.688;
        } else if(d == 4) {
            offset = vec2(-1.0, 0.0) * 0.792;
        } else if(d == 6) {
            offset = vec2(1.0, 0.0) * 0.656;
        } else if(d == 8) {
            offset = vec2(0.0, -1.0) * 0.760;
        }
        return offset;    
    }
    
    float get_player_direction(int d) {
        float angle = PI;
        if(d == 8) {
            angle = PI;
        } else if(d == 6) {
            angle = 0.5235987755982988;
        } else if(d == 4) {
            angle = 1.5707963267948966;
        } else if(d == 2) {
            angle = TWO_PI;
        }
        return angle;
    }

    // Reference to 
    // https://thebookofshaders.com/07/      

    void main(void){
        vec2 st = (gl_FragCoord.xy - u_position) / u_resolution;
        // st.x *= u_resolution.x / u_resolution.y;
        vec4 baseColor = texture2D(uSampler, vTextureCoord);
        vec4 color = vec4(1.0);
        float d = 0.0;
    
        int dir = u_dir;
        
        vec2 offset = get_player_offset(dir);
        vec2 back_offset = u_position * vec2(1.0, 1.0);
        
        st *= mat2(2.0, 0.0, 0.0, 2.0);
        st -= back_offset * 2.0;
        st -= offset;
    
        int N = 3;
    
        float a = atan(st.x * 1.0, st.y * 1.0) + get_player_direction(dir);
        float r = TWO_PI / float(N);
    
        d = cos(floor(0.500 + a / r) * r - a ) * length(st * u_size);
    
        color = vec4(0.1) + vec4( 1.0 - smoothstep(0.128 , 0.378 , d));
        color *= u_color;
        gl_FragColor = baseColor * vec4(color.rgb, 1.0);
    }
    
    `;

        PIXI.Filter.call(this, vertexSrc, fragmentSrc, {
            u_resolution: [Graphics.width, Graphics.height],
            u_dir: 2,
            u_size: 1.628,
            u_position: [0.5, 0.5],
            u_color: [
                1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0,
            ],
        });

        this.enabled = true;
        this.resolution = 1;
        this.legacy = true;
    };

    PIXI.SimpleLightFilter.prototype = Object.create(PIXI.Filter.prototype);
    PIXI.SimpleLightFilter.prototype.constructor = PIXI.SimpleLightFilter;

    PIXI.SimpleLightFilter.prototype.updatePositionX = function () {
        const value = $gamePlayer.screenX() / this.uniforms.u_resolution[0];
        this.uniforms.u_position[0] = value || 0.0;
    };

    PIXI.SimpleLightFilter.prototype.updatePositionY = function () {
        const value = $gamePlayer.screenY() / this.uniforms.u_resolution[1];
        this.uniforms.u_position[1] = value || 0.0;
    };

    PIXI.SimpleLightFilter.prototype.updatePosition = function () {
        this.updatePositionX();
        this.updatePositionY();
    };

    PIXI.SimpleLightFilter.prototype.setResolution = function (options) {
        this.uniforms.u_resolution = options;
    };

    PIXI.SimpleLightFilter.prototype.setDirection = function (dir) {
        this.uniforms.u_dir = dir;
    };

    PIXI.SimpleLightFilter.prototype.setSize = function (value) {
        if (value <= 1e-3) value = 1e-3;
        if (value >= 1.0) value = 1.0;
        this.uniforms.u_size = value;
    };

    PIXI.SimpleLightFilter.prototype.setDefaultColorTone = function () {
        this.uniforms.u_color = [
            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
        ];
    };

    PIXI.SimpleLightFilter.prototype.setRedColorTone = function () {
        this.uniforms.u_color = [
            0.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
        ];
    };

    /**
     * @param {Array} color
     */
    PIXI.SimpleLightFilter.prototype.setColorTone = function (
        red,
        green,
        blue
    ) {
        const r = parseFloat(red / 255.0);
        const g = parseFloat(green / 255.0);
        const b = parseFloat(blue / 255.0);

        this.uniforms.u_color = [
            r,
            0.0,
            0.0,
            0.0,
            0.0,
            g,
            0.0,
            0.0,
            0.0,
            0.0,
            b,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
        ];
    };

    //=================================================================
    // Spriteset_Map
    //=================================================================

    const alias_Spriteset_Map_createUpperLayer =
        Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function () {
        alias_Spriteset_Map_createUpperLayer.call(this);
        this.createSimpleLightFilter();
    };

    Spriteset_Map.prototype.createSimpleLightFilter = function () {
        const isValid = this._simpleLightFilter;
        const target = this._baseSprite;

        if (!isValid) {
            this._simpleLightFilter = new PIXI.SimpleLightFilter();
            if (!target.filters) {
                target.filters = [];
            }
            target.filters = [this._simpleLightFilter].concat(target.filters);
            if (this._simpleLightFilter) {
                this._simpleLightFilter.updatePosition();
            }
        } else {
            if (!target.filters) {
                target.filters = [];
            }
            target.filters = target.filters.filter(function (filter) {
                return filter !== isValid;
            }, this);
        }
    };

    const alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        alias_Spriteset_Map_update.call(this);
        this.updateSimpleLightFilter();
    };

    Spriteset_Map.prototype.updateSimpleLightFilter = function () {
        if (!$gameSystem) return;
        if (!this._simpleLightFilter) return;
        const config = $gameSystem._lightProp;
        const isValid = $gameSystem.enabledLight();
        this._simpleLightFilter.enabled = isValid;
        if (isValid) {
            this._simpleLightFilter.updatePosition();
            this._simpleLightFilter.setSize(config["size"]);
            this._simpleLightFilter.setDirection(config["direction"]);
            this._simpleLightFilter.setResolution(config["resolution"]);
        }
    };

    // Game_System

    const alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        alias_Game_System_initialize.call(this);
        this.initLightProperty();
    };

    Game_System.prototype.initLightProperty = function () {
        this._lightProp = {
            light: false,
            size: 1.618,
            direction: 2,
            resolution: [816, 624],
        };
    };

    Game_System.prototype.updateLightProperty = function () {
        if (!this._lightProp) this.initLightProperty();
        this.setLightProperty("direction", $gamePlayer.direction());
        this.setLightProperty("resolution", [Graphics.width, Graphics.height]);
    };

    Game_System.prototype.setLightProperty = function (name, value) {
        if (!this._lightProp) this.initLightProperty();
        this._lightProp[name] = value;
        return this._lightProp[name];
    };

    Game_System.prototype.enabledLight = function () {
        if (!this._lightProp) this.initLightProperty();
        return this._lightProp["light"] === true;
    };

    const alias_Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        alias_Game_Map_update.call(this, sceneActive);
        $gameSystem.updateLightProperty();
    };

    // pluginCommands

    const pluginCommands = {
        enable() {
            $gameSystem.setLightProperty("light", true);
        },

        disable() {
            $gameSystem.setLightProperty("light", false);
        },
    };

    const pluginName = "RS_SimpleLight";
    for (const name in pluginCommands) {
        PluginManager.registerCommand(pluginName, name, pluginCommands[name]);
    }
})();
