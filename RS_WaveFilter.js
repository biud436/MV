/*:
 * RS_WaveFilter.js
 * @plugindesc This plugin applies the wave effect to the all objects by using the Fragment Shader.
 * @date 2016.01.12
 * @version 1.3.2
 *
 * @author biud436
 *
 * @help
 *
 * - Type 1 (Sprite)
 * The following code applies the wave effect to Sprite.
 * http://biud436.tistory.com/17
 *
 * - Type 2 (Tilemap)
 *
 * The following plugin commands applies the wave effect to Tilemap.
 * This plugin contains these six types the plugin commands.
 *
 * This plugin commands allows you to enable or disable the wave effect
 *
 * Tilemap_Wave Enable
 * Tilemap_Wave Disable
 *
 * This plugin commands allows you to set the height of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.5
 *
 * Tilemap_Wave waveHeight x
 *
 * This plugin commands allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 2.
 * Default value is to 2.0. But the fragment shader does not use this value.
 *
 * Tilemap_Wave waveSpeed x
 *
 * This plugin commands allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.02
 *
 * Tilemap_Wave waveFrequency x
 *
 * This plugin commands allows you to set the UV speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.25
 *
 * Tilemap_Wave UVSpeed x
 *
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
 * 2016.03.03 - Added new Sprite Properties (wave_amp, wave_speed, wave_length, wave_phase)
 * 2016.02.26 - Fixed the default padding value of the sprite. (default value is to 512)
 * 2016.02.16 - Fixed Bug (After the player came back to Menu, you had to set the wave effect again)
 * 2016.01.22 - Fixed the Save and Load bug.
 * 2016.01.18 - Added the plugin command.
 * 2016.01.16 - Added the function to remove the filter.
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

     this.padding = 512;

     // set the uniforms
     this.uniforms = {
         waveHeight: {type: '1f', value: 0.5},
         waveFrequency: {type: '1f', value: 0.02},
         waveTime: {type: '1f', value: 0},
         UVSpeed: {type: '1f', value: 0.25},
         wavePhase: {type: '1f', value: 6.283185307179586}
     };

     this.fragmentSrc = [
         'precision mediump float;',
         'varying vec2 vTextureCoord;',
         'varying vec4 vColor;',

         'uniform float waveHeight;',
         'uniform float waveFrequency;',
         'uniform float waveTime;',
         'uniform float wavePhase;',
         'uniform float UVSpeed;',

         'uniform sampler2D uSampler;',

         'void main(void) {',
         '   float time = waveFrequency * sin(wavePhase * (mod(waveTime - vTextureCoord.y, waveHeight)));',
         '   vec2 coord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);',
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
        return this.uniforms.UVSpeed.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.UVSpeed.value = value;
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

   /**
   * @property Wave
   * @type Number
   */
   Object.defineProperty(PIXI.WaveFilter.prototype, 'wavePhase', {
      get: function() {
          return this.uniforms.wavePhase.value;
      },
      set: function(value) {
          this.dirty = true;
          this.uniforms.wavePhase.value = (Math.PI / 180) * Number(value);
      }
   });

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

   //===========================================================================
   // RPG Maker VX Ace Sprite Wave Properties
   //===========================================================================
   // wave_amp (default value is to 0 ~ 1)
   // wave_length (default value is to 0 ~ maxHeight)
   // wave_speed (default value is to 0.25)
   // wave_phase (default value is to 360)
   //===========================================================================
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

//===========================================================================
// RS.WaveConfig
//===========================================================================

(function() {

  RS.WaveConfig.setTilemap = function(obj) {
    this._wTileMap = obj;
    if(this._config) {
      obj.setWaveConfig(this._config);
    }
  }

  RS.WaveConfig.getTilemap = function() {
    return this._wTileMap;
  };

  RS.WaveConfig.makeWaveConfig = function() {
    if(this._wTileMap) {
      var config = this.getTilemap().makeWaveConfig();
      return config;
    }
  }

  RS.WaveConfig.setWaveConfig = function(config) {
    this._config = config;
  }

  var alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = alias_DataManager_makeSaveContents.call(this);
    contents.waveConfig   = RS.WaveConfig.makeWaveConfig();
    return contents;
  };

  var DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    DataManager_extractSaveContents.call(this, contents);
    RS.WaveConfig.setWaveConfig(contents.waveConfig);
  };

  var alias_Tilemap_initialize = Tilemap.prototype.initialize;
  Tilemap.prototype.initialize = function() {
    alias_Tilemap_initialize.call(this);
    RS.WaveConfig.setTilemap(this);
  }

  var alias_Tilemap_update = Tilemap.prototype.update;
  Tilemap.prototype.update = function() {
    alias_Tilemap_update.call(this);

    if(this._wave) {
      this._waveFilter.waveTime = Date.now() % 10000 / 10000;
    }

  }

  Tilemap.prototype.setWaveProperty = function(name, value) {
    if(this._wave && !!this._waveFilter[name]) {
        this._waveFilter[name] = value;
        RS.WaveConfig.setWaveConfig(this.makeWaveConfig());
    }
  }

  Tilemap.prototype.makeWaveConfig = function() {
    var config = {};
    if(this.wave) {
      config.wave = this.wave;
      config.waveHeight = this._waveFilter['waveHeight'];
      config.waveSpeed = this._waveFilter['waveSpeed'];
      config.waveFrequency = this._waveFilter['waveFrequency'];
      config.UVSpeed = this._waveFilter['UVSpeed'];
    }
    return config;
  }

  Tilemap.prototype.setWaveConfig = function(config) {
    if(config && config.wave) {
      this.wave = true;
      this.setWaveProperty('waveHeight', config.waveHeight);
      this.setWaveProperty('waveSpeed', config.waveSpeed);
      this.setWaveProperty('waveFrequency', config.waveFrequency);
      this.setWaveProperty('UVSpeed', config.UVSpeed);
    }
  }

  Object.defineProperty(Tilemap.prototype, 'wave', {
     get: function() {
         return this._wave;
     },
     set: function(value) {
         this._wave = value;
         if(this._wave) {
           if(!this._waveFilter) {
             this._waveFilter = new PIXI.WaveFilter();
             this._waveFilter.padding = Graphics.boxHeight;
           }
           this.filters = [this._waveFilter];
           RS.WaveConfig.setWaveConfig(this.makeWaveConfig());
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

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Tilemap_Wave") {
        switch(args[0]) {
          case 'Enable':
            RS.WaveConfig.getTilemap().wave = true;
            break;
          case 'Disable':
            if(!!RS.WaveConfig.getTilemap().wave) {
                RS.WaveConfig.getTilemap().wave = false;
                RS.WaveConfig.getTilemap().filters = null;
                RS.WaveConfig._config = null;
            }
            break;
          case 'waveHeight':
            RS.WaveConfig.getTilemap().setWaveProperty('waveHeight', Number(args[1]));
            break;
          case 'waveSpeed':
            RS.WaveConfig.getTilemap().setWaveProperty('waveSpeed', Number(args[1]));
            break;
          case 'waveFrequency':
            RS.WaveConfig.getTilemap().setWaveProperty('waveFrequency', Number(args[1]));
            break;
          case 'UVSpeed':
            RS.WaveConfig.getTilemap().setWaveProperty('UVSpeed', Number(args[1]));
            break;
        }
      }
  };

})();
