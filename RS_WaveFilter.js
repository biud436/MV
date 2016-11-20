/*:
 * RS_WaveFilter.js
 * @plugindesc This plugin applies the wave effect to the all objects by using the Fragment Shader.
 * @date 2016.01.12
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
 * 2016.08.18 (v1.5.0) - Supports a wave filter in ShaderTilemap.
 * 2016.10.20 (v1.5.1) - Fixed the issue that is not working in RMMV 1.3.2
 * 2016.11.10 (v1.5.2) - Fixed the issue that is not working in Orange Overlay plugin.
 * 2016.11.18 (v1.5.3) - Fixed an issue where the original tilemap is rendered when using Orange Overlay plugin.
 *
 * - Terms of Use
 * Free for commercial and non-commercial use
 *
 */

var Imported = Imported || {};
Imported.RS_WaveFilter = true;

var RS = RS || {};
RS.WaveConfig = RS.WaveConfig || {};

(function($) {
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
           this.filters = [new PIXI.filters.VoidFilter()];
         }
       }
   });

   //----------------------------------------------------------------------------
   // PIXI.tilemap
   //
   // Wave filter applies only to the original tilemap except for the character layer.

   var alias_CompositeRectTileLayer_initialize = $.CompositeRectTileLayer.prototype.initialize;
   $.CompositeRectTileLayer.prototype.initialize = function (zIndex, bitmaps, useSquare, texPerChild) {
       alias_CompositeRectTileLayer_initialize.call(this, zIndex, bitmaps, useSquare, texPerChild);

       var gl = Graphics._renderer.gl;

       // Calculrate Screen
       this._frameWidth = gl.drawingBufferWidth;
       this._frameHeight = gl.drawingBufferHeight;
       this._tilemapMargin = 40;

       // Create RenderTexture
       this._renderTexture = PIXI.RenderTexture.create(this._frameWidth,
                                                       this._frameHeight,
                                                       PIXI.SCALE_MODES.NEAREST);
       this._sprite = null;
       this._waveFilter = null;
   };

   var alias_CompositeRectTileLayer_renderWebGL = $.CompositeRectTileLayer.prototype.renderWebGL;
   $.CompositeRectTileLayer.prototype.renderWebGL = function (renderer) {
       if($gameSystem &&
         !!$gameSystem.getWaveEnabled && !$gameSystem.getWaveEnabled() ||
         !!Imported.OrangeOverlay) {
         return alias_CompositeRectTileLayer_renderWebGL.call(this, renderer);
       }

       var gl = renderer.gl;
       var shader = renderer.plugins.tile.getShader(this.useSquare);

       renderer.setObjectRenderer(renderer.plugins.tile);
       renderer.bindShader(shader);
       //TODO: dont create new array, please
       this._globalMat = this._globalMat || new PIXI.Matrix();
       renderer._activeRenderTarget.projectionMatrix.copy(this._globalMat).append(this.worldTransform);
       shader.uniforms.projectionMatrix = this._globalMat.toArray(true);
       shader.uniforms.shadowColor = this.shadowColor;
       if (this.useSquare) {
           var tempScale = this._tempScale = (this._tempScale || [0, 0]);
           tempScale[0] = this._globalMat.a >= 0 ? 1 : -1;
           tempScale[1] = this._globalMat.d < 0 ? 1 : -1;
           var ps = shader.uniforms.pointScale = tempScale;
           shader.uniforms.projectionScale = Math.abs(this.worldTransform.a) * renderer.resolution;
       }
       var af = shader.uniforms.animationFrame = renderer.plugins.tile.tileAnim;

       var currentRenderTarget = renderer._activeRenderTarget;
       var target = this._renderTexture;

       renderer.reset();

       renderer.bindRenderTexture(target);

       // It is rendering on textures, but it does not appear on the screen.
       var layers = this.children;
       for (var i = 0; i < layers.length; i++) {
           renderer.render(layers[i], this._renderTexture);
       }

       renderer.bindRenderTarget(currentRenderTarget);

       // Create the sprite
       if(!this._sprite) {
        this._sprite = new Sprite();
        this._sprite.origin = new Point();
        this._sprite.texture = this._renderTexture;
        this._sprite.wave = false;
       }

       var tw = $gameMap.tileWidth();
       var th = $gameMap.tileHeight();

       this._sprite.origin.x = $gameMap.displayX() * tw;
       this._sprite.origin.y = $gameMap.displayY() * th;

       var ox = Math.floor(this._sprite.origin.x);
       var oy = Math.floor(this._sprite.origin.y);
       var startX = Math.floor((ox - 20) / tw);
       var startY = Math.floor((oy - 20) / th);

       // Update Sprite
       this._sprite.texture = this._renderTexture;
       this._sprite.x = startX * tw - ox;
       this._sprite.y = startY * th - oy;
       this._sprite.scale.x = 1.0;
       this._sprite.scale.y = 1.0;
       this._sprite.anchor.x = (this._sprite.x) / this._frameWidth;
       this._sprite.anchor.y = (this._sprite.y) /  this._frameHeight;
       this._sprite.worldTransform = this.worldTransform;

       if($gameSystem && $gameSystem.getWaveEnabled) {
         this._sprite.wave = $gameSystem.getWaveEnabled() || false;
         this._sprite.wave_amp = $gameSystem.getWaveFrequency() || 0.02;
         this._sprite.wave_phase = $gameSystem.getWavePhase() || 360;
         this._sprite.wave_speed = $gameSystem.getUVSpeed() || 0.25;
       }

       if(this._sprite.wave) {
          this._sprite.waveUpdate();
       }

       renderer.render(this._sprite);

   };

   //----------------------------------------------------------------------------
   // Game_System
   //
   //

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

   var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
   Game_Interpreter.prototype.pluginCommand = function(command, args) {
       alias_Game_Interpreter_pluginCommand.call(this, command, args);
       if(command === "Tilemap_Wave") {
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
   };

  //----------------------------------------------------------------------------
  // Orange Overlay
  //
  // Apply the wave filter to all layers (by including character layers)

  if(Imported.OrangeOverlay) {
    var alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
      alias_Spriteset_Map_update.call(this);
      if(this._waveFilter && Graphics.isWebGL() ) {
        this.wave = $gameSystem.getWaveEnabled();
        this.waveFrequency = $gameSystem.getWaveFrequency();
        this.waveSpeed = $gameSystem.getUVSpeed();
      }
    };
  }

})(PIXI.tilemap);
