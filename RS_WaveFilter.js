/*:
 * RS_WaveFilter.js
 * @plugindesc This plugin applies the wave effect to the all objects by using the Fragment Shader.
 * @date 2016.01.12
 * @version 1.4.0
 *
 * @author biud436
 *
 * @help
 *
 * - Type 1 (Sprite)
 * The following code applies the wave effect to Sprite.
 * http://biud436.tistory.com/17
 *
 *  - Type 2 (Tilemap)
 * This filter does not support for the time being in tilemap.
 *
 *=============================================================================
 * RPG Maker VX Ace Sprite Wave Properties
 *=============================================================================
 * wave_amp (default value is to 0 ~ 1)
 * wave_length (default value is to 0 ~ maxHeight)
 * wave_speed (default value is to 0.25)
 * wave_phase (default value is to 360)
 *=============================================================================
 *
 * - Change Log
 * 2016.01.14 (v1.0.0) - First Release.
 * 2016.01.16 (v1.0.1) - Added the function to remove the filter.
 * 2016.01.18 (v1.1.0) - Added the plugin command.
 * 2016.01.22 (v1.2.0) - Fixed the Save and Load bug
 * 2016.02.16 (v1.3.0) - Fixed Bug (After the player came back to Menu, you had to set the wave effect again)
 * 2016.02.26 (v1.3.1) - Fixed the default padding value of the sprite. (default value is to 512)
 * 2016.03.03 (v1.3.2) - Added new Sprite Properties (wave_amp, wave_speed, wave_length, wave_phase)
 * 2016.08.17 (v1.4.0) - Fixed the issue that is not working in RMMV 1.3.0 (This filter does not support for the time being in Tile-map)
 *
 * - Terms of Use
 * Free for commercial and non-commercial use
 *
 */

var Imported = Imported || {};
Imported.RS_WaveFilter = true;

var RS = RS || {};
RS.WaveConfig = RS.WaveConfig || {};

(function() {

  var isFilterPIXI4 = (PIXI.VERSION === "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  var isWebGL = PIXI.utils.isWebGLSupported();
  var isUseCanvas = Utils.isOptionValid('canvas');
  if(isUseCanvas) {
    console.error('This plugin does not support in Canvas Mode');
    return;
  }

  //----------------------------------------------------------------------------
  // PIXI.WaveFilter < PIXI v4 >
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

  //----------------------------------------------------------------------------
  // Sprite
  //
  //

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
           this.filters = this.filters.filter(function(i) {
             if(i.constructor.name === 'WaveFilter') {
               return false;
             }
             return true;
            });
         }
       }
   });

})();
