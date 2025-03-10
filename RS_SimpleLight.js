//================================================================
// RS_SimpleLight.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin implements a dynamic lighting system using WebGL shaders. <RS_SimpleLight>
 * @author biud436
 *
 * @help
 * ===============================================================
 * Introduction
 * ===============================================================
 * This plugin implements a dynamic lighting/lantern effect using WebGL shaders.
 * The light follows the player character and illuminates the surrounding area,
 * creating an immersive atmosphere for dark dungeons, night scenes, or horror games.
 *
 * ===============================================================
 * Performance Considerations
 * ===============================================================
 * Since this plugin uses shader-based lighting effects rather than image-based solutions,
 * it may cause performance issues on less powerful devices like mobile phones.
 * Consider this when implementing it in your game, especially if targeting mobile platforms.
 *
 * ===============================================================
 * Plugin Commands
 * ===============================================================
 * Unlike many lighting plugins that provide complex command systems, RS_SimpleLight
 * focuses on simplicity with just two essential commands:
 *
 * 1. To enable the lighting effect:
 *    RS_SimpleLight Enable
 *
 * 2. To disable the lighting effect:
 *    RS_SimpleLight Disable
 *
 * ===============================================================
 * Technical Details
 * ===============================================================
 * This plugin creates a lighting effect using PIXI.js filters and custom GLSL shaders.
 * The light follows the player and adjusts based on the player's direction.
 *
 * Key features:
 * - The light intensity and size are configurable
 * - The light automatically adjusts to the player's position and direction
 * - Light color can be customized through code (using the setColorTone method)
 * - Works with RPG Maker MV's save/load system
 *
 * ===============================================================
 * Advanced Usage (For Developers)
 * ===============================================================
 * For advanced users who want to modify the light properties programmatically:
 *
 * 1. Change light size (smaller values = larger light):
 *    $gameSystem.setLightProperty('size', 1.0); // Value between 0.001 and 1.0
 *
 * 2. Change light color (using code):
 *    // Access the filter in the active spriteset
 *    var filter = SceneManager._scene._spriteset._simpleLightFilter;
 *    if (filter) {
 *      // Set to default white color
 *      filter.setDefaultColorTone();
 *      // OR set to red color
 *      filter.setRedColorTone();
 *      // OR set to custom RGB color (values from 0-255)
 *      filter.setColorTone(255, 255, 0); // Yellow light
 *    }
 *
 * ===============================================================
 * Compatibility Notes
 * ===============================================================
 * - This plugin is compatible with RPG Maker MV v1.6.1 and above
 * - May conflict with other plugins that modify the filter system or rendering
 * - Works with the core save/load functionality without issues (since v1.1.01)
 *
 * ===============================================================
 * Examples & Use Cases
 * ===============================================================
 * - Create a dark dungeon where the player must navigate with limited visibility
 * - Implement day/night cycles by enabling/disabling the light based on time
 * - Create horror scenes with limited vision to increase tension
 * - Use colored lights for special effects (red for danger, blue for ice areas)
 *
 * ===============================================================
 * Version Log
 * ===============================================================
 * 2016.02.13 (v1.0.0) - First Release
 * 2018.12.30 (v1.1.0) :
 * - Now it is supported in RPG Maker MV v1.6.1.
 * (I've been rewritten shader for RPG Maker MV v1.6.1)
 * 2019.02.24 (v1.1.01) :
 * - Fixed an issue that is not loaded a save file that you saved before using this plugin.
 */

var Imported = Imported || {};
Imported.RS_SimpleLight = true;

var RS = RS || {};
RS.SimpleLight = RS.SimpleLight || {};

(function ($) {
  'use strict';

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_SimpleLight>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  PIXI.SimpleLightFilter = function (options) {
    var vertexSrc = [
      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',

      'uniform mat3 projectionMatrix;',

      'varying vec2 vTextureCoord;',

      'void main(void){',
      '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
      '    vTextureCoord = aTextureCoord;',
      '}',
    ].join('\n');

    var fragmentSrc = `
    
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

    PIXI.Filter.call(this, vertexSrc, fragmentSrc);

    this.uniforms.u_resolution = [Graphics.boxWidth, Graphics.boxHeight];

    // 2, 4, 6, 8
    this.uniforms.u_dir = 2;
    this.uniforms.u_size = 1.628;
    this.uniforms.u_position = [0.5, 0.5];

    // Tone
    this.uniforms.u_color = [
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
      1.0,
    ];

    this.enabled = true;
    this.resolution = 1;
  };

  PIXI.SimpleLightFilter.prototype = Object.create(PIXI.Filter.prototype);
  PIXI.SimpleLightFilter.prototype.constructor = PIXI.SimpleLightFilter;

  PIXI.SimpleLightFilter.prototype.updatePositionX = function () {
    var value = $gamePlayer.screenX() / this.uniforms.u_resolution[0];
    this.uniforms.u_position[0] = value || 0.0;
  };

  PIXI.SimpleLightFilter.prototype.updatePositionY = function () {
    var value = $gamePlayer.screenY() / this.uniforms.u_resolution[1];
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
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
      1.0,
    ];
  };

  PIXI.SimpleLightFilter.prototype.setRedColorTone = function () {
    this.uniforms.u_color = [
      0.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      1.0,
    ];
  };

  /**
   * @param {Array} color
   */
  PIXI.SimpleLightFilter.prototype.setColorTone = function (red, green, blue) {
    var r = parseFloat(red / 255.0);
    var g = parseFloat(green / 255.0);
    var b = parseFloat(blue / 255.0);

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

  var alias_Spriteset_Map_createUpperLayer =
    Spriteset_Map.prototype.createUpperLayer;
  Spriteset_Map.prototype.createUpperLayer = function () {
    alias_Spriteset_Map_createUpperLayer.call(this);
    this.createSimpleLightFilter();
  };

  Spriteset_Map.prototype.createSimpleLightFilter = function () {
    var isValid = this._simpleLightFilter;
    var target = this._baseSprite;

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

  var alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    alias_Spriteset_Map_update.call(this);
    this.updateSimpleLightFilter();
  };

  Spriteset_Map.prototype.updateSimpleLightFilter = function () {
    if (!$gameSystem) return;
    if (!this._simpleLightFilter) return;
    var config = $gameSystem._lightProp;
    var isValid = $gameSystem.enabledLight();
    this._simpleLightFilter.enabled = isValid;
    if (isValid) {
      this._simpleLightFilter.updatePosition();
      this._simpleLightFilter.setSize(config['size']);
      this._simpleLightFilter.setDirection(config['direction']);
      this._simpleLightFilter.setResolution(config['resolution']);
    }
  };

  //======================================================================
  // Game_System
  //======================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
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
    this.setLightProperty('direction', $gamePlayer.direction());
    this.setLightProperty('resolution', [
      Graphics.boxWidth,
      Graphics.boxHeight,
    ]);
  };

  Game_System.prototype.setLightProperty = function (name, value) {
    if (!this._lightProp) this.initLightProperty();
    this._lightProp[name] = value;
    return this._lightProp[name];
  };

  Game_System.prototype.enabledLight = function () {
    if (!this._lightProp) this.initLightProperty();
    return this._lightProp['light'] === true;
  };

  var alias_Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function (sceneActive) {
    alias_Game_Map_update.call(this, sceneActive);
    $gameSystem.updateLightProperty();
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'RS_SimpleLight') {
      switch (args[0]) {
        case 'Enable':
          $gameSystem.setLightProperty('light', true);
          break;
        case 'Disable':
          $gameSystem.setLightProperty('light', false);
          break;
      }
    }
  };
})(RS.SimpleLight);
