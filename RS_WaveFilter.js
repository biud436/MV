/*:
 * RS_WaveFilter.js
 * @plugindesc RS_WaveFilter.js
 * @date 2016.01.12
 * @author biud436
 *
 * @help
 * sprite.wave = true;
 * sprite.setWaveHeight(2);
 */

(function() {

  /**
  *
  * @class WaveFilter
  * @extends AbstractFilter
  * @constructor
  */
  PIXI.WaveFilter = function()
  {
     PIXI.AbstractFilter.call( this );

     this.passes = [this];

     // set the uniforms
     this.uniforms = {
         waveHeight: {type: '1f', value: 0.02},
         waveSpeed: {type: '1f', value: 2},
         waveFrequency: {type: '1f', value: 0.5},
         waveTime: {type: '1f', value: 0},
         UVSpeed: {type: '1f', value: 0.25}
     };

     this.fragmentSrc = [
         'precision mediump float;',
         'varying vec2 vTextureCoord;',
         'varying vec4 vColor;',

         'uniform float waveHeight;',
         'uniform float waveSpeed;',
         'uniform float waveFrequency;',
         'uniform float waveTime;',
         'uniform float UVSpeed;',

         'uniform sampler2D uSampler;',

         'void main(void) {',
         `   float pi = 3.14159265358;`,
         '   float cosTime = waveFrequency * sin(2.0 * pi * (mod(waveTime - vTextureCoord.y, waveHeight)));',
         '   vec2 coord = vec2(vTextureCoord.x + cosTime * UVSpeed, vTextureCoord.y);',
         '   gl_FragColor = texture2D(uSampler, coord);',
         '}'
     ];
  };

  PIXI.WaveFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
  PIXI.WaveFilter.prototype.constructor = PIXI.WaveFilter;

  /**
  * @property Wave
  * @type Number
  */
  Object.defineProperty(PIXI.WaveFilter.prototype, 'waveHeight', {
     get: function() {
         return this.uniforms.waveHeight.value;
     },
     set: function(value) {
         this.dirty = true;
         this.uniforms.waveHeight.value = value;
     }
  });

  /**
  * @property Wave
  * @type Number
  */
  Object.defineProperty(PIXI.WaveFilter.prototype, 'waveSpeed', {
     get: function() {
         return this.uniforms.waveSpeed.value;
     },
     set: function(value) {
         this.dirty = true;
         this.uniforms.waveSpeed.value = value;
     }
  });

  /**
  * @property Wave
  * @type Number
  */
  Object.defineProperty(PIXI.WaveFilter.prototype, 'waveFrequency', {
     get: function() {
         return this.uniforms.waveFrequency.value;
     },
     set: function(value) {
         this.dirty = true;
         this.uniforms.waveFrequency.value = value;
     }
  });

  Object.defineProperty(PIXI.WaveFilter.prototype, 'UVSpeed', {
      get: function() {
          return this.uniforms.UVSpeed.value;
      },
      set: function(value) {
          this.dirty = true;
          this.uniforms.UVSpeed.value = value;
      }
  });

   Object.defineProperty(PIXI.WaveFilter.prototype, 'waveTime', {
       get: function() {
           return this.uniforms.waveTime.value;
       },
       set: function(value) {
           this.dirty = true;
           this.uniforms.waveTime.value = value;
       }
   });

   var alias_Sprite_initialize = Sprite.prototype.initialize;
   Sprite.prototype.initialize = function(bitmap) {
     alias_Sprite_initialize.call(this, bitmap);
     this._waveTime = 0;
     this._waveHeight = 512;
     this._waveSpeed = 2;
     this._waveFrequency = 0.05;
     this.setWaveHeight(3);
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

   /**
    * @property Wave
    * @type Number
   */
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
             this.filters = [];
           }
       }
   });


})();
