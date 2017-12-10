/*:
 * RS_WaveFilter.js
 * @plugindesc This plugin applies the wave effect to the all objects by using the Fragment Shader.
 * @date 2016.01.12
 *
 * @author biud436
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
 *    - wave_length : The default value is to a maxHeight
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
 * This plugin commands allows you to enable or disable the wave effect
 *
 *    TilemapWave Enable
 *    TilemapWave Disable
 *
 * This plugin commands allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 2.
 * Default value is to 2.0. But the fragment shader does not use this value.
 *
 *    TilemapWave waveSpeed x
 *
 * This plugin commands allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.02
 *
 *    TilemapWave waveFrequency x
 *
 * This plugin commands allows you to set the UV speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.25
 *
 *    TilemapWave UVSpeed x
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
 *
 * =============================================================================
 * Terms of Use
 * =============================================================================
 * Free for commercial and non-commercial use
 *
 */

var Imported = Imported || {};
Imported.RS_WaveFilter = true;

var RS = RS || {};
RS.WaveConfig = RS.WaveConfig || {};

(function() {
  var isFilterPIXI4 = (PIXI.VERSION >= "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  if(!isFilterPIXI4) {
    console.error('This version does not work on your project');
    console.error('Please download the compatible version from the following link : ');
    console.error('https://github.com/biud436/MV/raw/MV/RS_WaveFilter.js');
    return;
  }
  var isWebGL = PIXI.utils.isWebGLSupported();
  var isUseCanvas = Utils.isOptionValid('canvas');
  if(isUseCanvas || !isWebGL) {
    console.error('This plugin does not support in your project');
    return;
  }
  //----------------------------------------------------------------------------
  // PIXI.WaveFilter
  //
  //

  PIXI.WaveFilter = function()
  {
    var vertexSrc = [
      '#define GLSLIFY 1',

      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',

      'uniform mat3 projectionMatrix;',

      'varying vec2 vTextureCoord;',

      'void main(void){',
      '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
      '    vTextureCoord = aTextureCoord;',
      '}'
    ].join('\n');

     var fragmentSrc = [
       '#define GLSLIFY 1',

       'precision mediump float;',

       'varying vec2 vTextureCoord;',

       'uniform float waveHeight;',
       'uniform float waveFrequency;',
       'uniform float waveTime;',
       'uniform float wavePhase;',
       'uniform float UVSpeed;',

       'uniform sampler2D uSampler;',

       'void main(void) {',
       '   float time = waveFrequency * sin(wavePhase * (mod(waveTime - vTextureCoord.y, waveHeight)));',
       '   vec2 vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);',
       '   gl_FragColor = texture2D(uSampler, vCoord);',
       '}'
     ].join('\n');

     PIXI.Filter.call( this, vertexSrc, fragmentSrc );

     this.padding = 512;

     this.uniforms.waveHeight = 0.5;
     this.uniforms.waveFrequency = 0.02;
     this.uniforms.waveTime = 0.0;
     this.uniforms.UVSpeed = 0.25;
     this.uniforms.wavePhase = 6.283185307179586;

     this.enabled = true;
     this.resolution = 1;

  };

  PIXI.WaveFilter.prototype = Object.create( PIXI.Filter.prototype );
  PIXI.WaveFilter.prototype.constructor = PIXI.WaveFilter;

  Object.defineProperties(PIXI.WaveFilter.prototype, {
    waveHeight: {
      get: function() {
          return this.uniforms.waveHeight;
      },
      set: function(value) {
          this.uniforms.waveHeight = value;
      }
    },
    waveSpeed: {
      get: function() {
          return this.uniforms.UVSpeed;
      },
      set: function(value) {
          this.uniforms.UVSpeed = value;
      }
    },
    waveFrequency: {
      get: function() {
          return this.uniforms.waveFrequency;
      },
      set: function(value) {
          this.uniforms.waveFrequency = value;
      }
    },
    UVSpeed: {
      get: function() {
          return this.uniforms.UVSpeed;
      },
      set: function(value) {
          this.uniforms.UVSpeed = value;
      }
    },
    waveTime: {
      get: function() {
          return this.uniforms.waveTime;
      },
      set: function(value) {
          this.uniforms.waveTime = value;
      }
    },
    wavePhase: {
      get: function() {
          return this.uniforms.wavePhase;
      },
      set: function(value) {
          this.uniforms.wavePhase = (Math.PI / 180) * Number(value);
      }
    }
  });

  //============================================================================
  // Sprite
  //============================================================================

  var alias_Sprite_initialize = Sprite.prototype.initialize;
  Sprite.prototype.initialize = function(bitmap) {
    alias_Sprite_initialize.call(this, bitmap);
    this._waveTime = 0;
    this._waveHeight = 0.5;
    this._waveSpeed = 0.25;
    this._waveFrequency = 0.02;
    this._wavePhase = 360;
    this._waveFilter = new PIXI.WaveFilter();
    this._wave = false;
  };

  var alias_Sprite_update = Sprite.prototype.update;
  Sprite.prototype.update = function() {
   alias_Sprite_update.call(this);
   this.waveUpdate();
  };

  Sprite.prototype.getWaveFrameTime = function() {
    this._waveTime = Date.now() % 10000 / 10000;
    return this._waveTime;
  };

  Sprite.prototype.setWaveHeight = function(n) {
    this._waveHeight = this.height / n;
  }

  Sprite.prototype.getWaveHeight = function() {
    return this._waveHeight;
  };

  Sprite.prototype.waveUpdate = function() {
    if(this._wave) {
      this._waveFilter.waveTime = this.getWaveFrameTime();
      this._waveFilter.waveHeight = this.getWaveHeight();
      this._waveFilter.waveSpeed = this._waveSpeed;
      this._waveFilter.waveFrequency = this._waveFrequency;
      this._waveFilter.wavePhase = this._wavePhase;
    }
  }

  Object.defineProperty(Sprite.prototype, 'waveSpeed', {
     get: function() {
         return this._waveSpeed;
     },
     set: function(value) {
       this._waveSpeed = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'waveFrequency', {
     get: function() {
         return this._waveFrequency;
     },
     set: function(value) {
       this._waveFrequency = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_amp', {
     get: function() {
         return this._waveFrequency;
     },
     set: function(value) {
       this._waveFrequency = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_length', {
     get: function() {
         return this._waveHeight;
     },
     set: function(value) {
       this.setWaveHeight(value);
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_speed', {
     get: function() {
         return this._waveSpeed;
     },
     set: function(value) {
       this._waveSpeed = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_phase', {
     get: function() {
         return this._wavePhase;
     },
     set: function(value) {
       this._wavePhase = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave', {
     get: function() {
         return this._wave;
     },
     set: function(value) {
       this._wave = value;
       if(this._wave) {
         if(!this._waveFilter) {
           this._waveFilter = new PIXI.WaveFilter();
         }
         this.filters = [this._waveFilter];
       } else {
         this.filters = [new PIXI.filters.VoidFilter()];
       }
     },
     configurable: true
  });

  //============================================================================
  // Sprite_Picture
  //============================================================================

  Sprite_Picture.prototype.updateWave = function() {
    var picture = this.picture();
    this.wave = picture.wave();
    this.wave_speed = picture.waveSpeed();
    this.wave_amp = picture.waveAmp();
  };

  var alias_Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    alias_Sprite_Picture_update.call(this);
    if(this.visible) {
      this.updateWave();
    }
  };

  //============================================================================
  // Spriteset_Map
  //============================================================================

  var alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    alias_Spriteset_Map_createLowerLayer.call(this);
    this.overwriteWaveProperty();
  };

  Spriteset_Map.prototype.overwriteWaveProperty = function () {
    if(!this._baseSprite) return false;
    var self = this;
    Object.defineProperty(this._baseSprite, 'wave', {
      get: function () { return this._wave; },
      set: function (value) {
        this._wave = value;
        if(this._wave) {
          if(!this._waveFilter) this._waveFilter = new PIXI.WaveFilter();
          this.filters = [this._waveFilter, self._toneFilter];
        } else {
          this.filters = [self._toneFilter];
        }
      }
    });
  };

  var alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    alias_Spriteset_Map_update.call(this);
    this.updateWaveFilter();
  };

  Spriteset_Map.prototype.updateWaveFilter = function () {
   if($gameSystem && $gameSystem.getWaveEnabled) {
     this._baseSprite.wave = $gameSystem.getWaveEnabled() || false;
     this._baseSprite.wave_amp = $gameSystem.getWaveFrequency() || 0.02;
     this._baseSprite.wave_phase = $gameSystem.getWavePhase() || 360;
     this._baseSprite.wave_speed = $gameSystem.getUVSpeed() || 0.25;
   }
  };

  //============================================================================
  // Game_Picture
  //============================================================================

  var alias_Game_Picture_initBasic = Game_Picture.prototype.initBasic;
  Game_Picture.prototype.initBasic = function() {
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

  Game_Picture.prototype.startWave = function(waveSpeed, waveAmp) {
    this._wave = true;
    this._waveSpeed = waveSpeed;
    this._waveAmp = waveAmp
  };

  Game_Picture.prototype.stopWave = function() {
    this._wave = false;
  };

  //============================================================================
  // Game_Screen
  //============================================================================

  Game_Screen.prototype.startWave = function(pictureId, waveSpeed, waveAmp) {
    var picture = this.picture(pictureId);
    if (picture) {
        picture.startWave(waveSpeed, waveAmp);
    }
  };

  Game_Screen.prototype.stopWave = function(pictureId) {
    var picture = this.picture(pictureId);
    if (picture) {
        picture.stopWave();
    }
  };

  //============================================================================
  // Game_System
  //============================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
   alias_Game_System_initialize.call(this);
   this.initWaveProperty();
  };

  Game_System.prototype.initWaveProperty = function () {
   this._waveProp = {
     'wave': false,
     'waveHeight': Graphics.boxHeight,
     'waveFrequency': 0.02,
     'waveTime': 0.0,
     'UVSpeed': 0.25,
     'wavePhase': 360
   };
  };

  Game_System.prototype.setWaveProperty = function (name, value) {
   if(this._waveProp) {
     this._waveProp[name] = value;
     return this._waveProp[name];
   }
   return 0.0;
  };

  Game_System.prototype.getWaveEnabled = function () {
   return this._waveProp.wave;
  };

  Game_System.prototype.getWaveHeight = function () {
   return this._waveProp.waveHeight;
  };

  Game_System.prototype.getWaveFrequency = function () {
   return this._waveProp.waveFrequency;
  };

  Game_System.prototype.getWaveTime = function () {
   return this._waveProp.waveTime;
  };

  Game_System.prototype.getUVSpeed = function () {
   return this._waveProp.UVSpeed;
  };

  Game_System.prototype.getWavePhase = function () {
   return this._waveProp.wavePhase;
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
     alias_Game_Interpreter_pluginCommand.call(this, command, args);
     if(command === "Tilemap_Wave" || command === "TilemapWave") {
       switch(args[0]) {
         case 'Enable':
           $gameSystem.setWaveProperty('wave', true);
           break;
         case 'Disable':
           $gameSystem.setWaveProperty('wave', false);
           break;
         case 'waveSpeed':
           $gameSystem.setWaveProperty('waveSpeed', Number(args[1]));
           break;
         case 'waveFrequency':
           $gameSystem.setWaveProperty('waveFrequency', Number(args[1]));
           break;
         case 'UVSpeed':
           $gameSystem.setWaveProperty('UVSpeed', Number(args[1]));
           break;
       }
     }
     if(command === "Picture_Wave" || command === "PictureWave") {
       switch (args[0].toLowerCase()) {
         case "start":
           $gameScreen.startWave(Number(args[1]), Number(args[2]), Number(args[3]));
           break;
         case "stop":
           $gameScreen.stopWave(Number(args[1]));
       }
     }
  };

})();
