/*:
 * RS_NoiseFilters.js
 * @plugindesc (v1.0.2) This plugin applies the noise filter to the tilemap.
 * @author biud436, Vico(Shader)
 *
 * @help
 * -----------------------------------------------------------------------------
 * Script Calls
 * -----------------------------------------------------------------------------
 * $gameSystem.setNoiseProperty('enabledNoise', true);
 * $gameSystem.setNoiseProperty('enabledNoise', false);
 * $gameSystem.setNoiseProperty('a', 0.1);
 * $gameSystem.setNoiseProperty('b', 0.2);
 * $gameSystem.setNoiseProperty('x', 12.9898);
 * $gameSystem.setNoiseProperty('y', 78.233);
 * $gameSystem.setNoiseProperty('minX', -3);
 * $gameSystem.setNoiseProperty('maxX', 3);
 * $gameSystem.setNoiseProperty('minY', -2);
 * $gameSystem.setNoiseProperty('maxY', 2);
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 * Tilemap_noise Enable minNoiseAmount maxNoiseAmount
 * Tilemap_noise Enable 0.1 0.2
 *
 * Tilemap_noise SetRandomX min max
 * Tilemap_noise SetRandomX -3 3
 *
 * Tilemap_noise SetRandomY min max
 * Tilemap_noise SetRandomY -2 2
 *
 * Tilemap_noise Disable
 * -----------------------------------------------------------------------------
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.08.28 (v1.0.0) - First Release.
 * 2016.08.28 (v1.0.1) - Fixed noise issue.
 * 2016.08.28 (v1.0.2) - Fixed render code and Added Script class and Plugin Commands.
 */

var Imported = Imported || {};
Imported.RS_NoiseFilters = true;

var RS = RS || {};
RS.NoiseFilters = RS.NoiseFilters || {};

(function ($) {

  var isFilterPIXI4 = (PIXI.VERSION === "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  var isWebGL = PIXI.utils.isWebGLSupported();
  var isUseCanvas = Utils.isOptionValid('canvas');

  if(!isFilterPIXI4) {
    console.error('This plugin is not PIXI 4.0.0 and RMMV 1.3.0 or more');
    return;
  }

  if(!isWebGL || isUseCanvas) {
    console.error('This plugin does not support in Canvas Mode');
    return;
  }

  var isNoiseFilter = false;
  var enabledNoiseFilter = false;
  var defaultNoiseValue = 0.5;

  //----------------------------------------------------------------------------
  // Math
  //
  //

  Math.lerpMotion = function (a, b) {
    var t = Date.now() % 10000 / 10000;
    var result = ((1 - t) * a) + (t * b);
    return result;
  };

  Math.quadraticMotion = function (a, b, c) {
    var d = Math.lerpMotion(a, b);
    var e = Math.lerpMotion(b, c);
    var result = Math.lerpMotion(d, e);
    return result;
  };

  //----------------------------------------------------------------------------
  // NoiseFilter
  //
  //

  /**
   * @author Vico @vicocotea
   * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/noise.js
   */

  PIXI.NoiseFilterConfig = function () {

      PIXI.Filter.call(this,
          // vertex shader
          "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
          // fragment shader
          "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\n\n\nuniform float a;\n\n\nuniform float b;\n\n\nuniform float c;\n\nuniform vec2 offset;\n\nuniform float noise;\n\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(a, b))) * c);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord + offset);\n\n    float diff = (rand(gl_FragCoord.xy) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n"
      );
      this.noise = 0.5;
      this.uniforms.offset = {x: 0.0, y: 0.0};
      this.uniforms.a = 12.9898;
      this.uniforms.b = 78.233;
      this.uniforms.c = 43758.5453;
  };

  PIXI.NoiseFilterConfig.prototype = Object.create( PIXI.Filter.prototype );
  PIXI.NoiseFilterConfig.constructor = PIXI.NoiseFilterConfig;

  Object.defineProperties(PIXI.NoiseFilterConfig.prototype, {
    /**
     * The amount of noise to apply.
     *
     * @member {number}
     * @memberof PIXI.filters.NoiseFilter#
     * @default 0.5
     */
    noise: {
        get: function ()
        {
            return this.uniforms.noise;
        },
        set: function (value)
        {
            this.uniforms.noise = value;
        }
    },
    x: {
        get: function ()
        {
            return this.uniforms.a;
        },
        set: function (value)
        {
            this.uniforms.a = value;
        }
    },
    y: {
        get: function ()
        {
            return this.uniforms.b;
        },
        set: function (value)
        {
            this.uniforms.b = value;
        }
    },
    offsetX: {
        get: function() {
            return this.uniforms.offset.x;
        },
        set: function(value) {
            this.uniforms.offset.x = value;
        }
    },
    offsetY: {
        get: function() {
            return this.uniforms.offset.y;
        },
        set: function(value) {
            this.uniforms.offset.y = value;
        }
    }
  });

  //--------------------------------------------------------------------------
  // NoiseSprite
  //
  // This class inherits all of functions from Sprite class.

  function NoiseSprite() {
    this.initialize.apply(this, arguments);
  };

  NoiseSprite.prototype = Object.create(Sprite.prototype);
  NoiseSprite.prototype.constructor = NoiseSprite;

  NoiseSprite.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this._noiseFilter = null;
    this._noise = false;
  };

  NoiseSprite.prototype.updateNoise = function() {
    var x = $gameSystem.getNoiseProperty('x') || 12.9898;
    var y = $gameSystem.getNoiseProperty('y') || 78.233;
    var minX = $gameSystem.getNoiseProperty('minX') || -3;
    var maxX = $gameSystem.getNoiseProperty('maxX') || 3;
    var minY = $gameSystem.getNoiseProperty('minY') || -2;
    var maxY = $gameSystem.getNoiseProperty('maxY') || 2;
    if(this._noiseFilter) {
        this._noiseFilter.noise = Math.quadraticMotion(
          $gameSystem.getNoiseProperty('a') || 0.1,
          $gameSystem.getNoiseProperty('b') || 0.2,
          $gameSystem.getNoiseProperty('a') || 0.1);
        this._noiseFilter.x = x + Math.floor(minX + Math.random() * maxX);
        this._noiseFilter.y = y + Math.floor(minY + Math.random() * maxY);
        $gameSystem.setNoiseProperty('noise', this._noiseFilter.noise);
    }
  };

  Object.defineProperty(NoiseSprite.prototype, 'enabledNoise', {
     get: function() {
         return this._noise;
     },
     set: function(value) {
         this._noise = value;
         if(this._noise) {
           if(!this._noiseFilter) {
             this._noiseFilter = new PIXI.NoiseFilterConfig();
           }
           this.filters = [this._noiseFilter];
         } else {
           this.filters = [new PIXI.filters.VoidFilter()];
         }
     }
  });

  //----------------------------------------------------------------------------
  // Game_System
  //
  //

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this.initNoiseProperty();
  };

  Game_System.prototype.initNoiseProperty = function () {
    this._noiseProp = {
      'enabledNoise': false,
      'a': 0.1,
      'b': 0.2,
      'x': 12.9898,
      'y': 78.233,
      'minX': -3,
      'maxX': 3,
      'minY': -2,
      'maxY': 2,
      'noise': 0.5
    };
  };

  Game_System.prototype.getNoiseProperty = function (name) {
    if(!!this._noiseProp[name]) {
      return this._noiseProp[name];
    }
  }

  Game_System.prototype.setNoiseProperty = function (name, value) {
    if(this._noiseProp) {
      this._noiseProp[name] = value;
      return this._noiseProp[name];
    }
    return 0.0;
  };

  Game_System.prototype.enabledNoise = function () {
    return this._noiseProp['enabledNoise'];
  };

  //----------------------------------------------------------------------------
  // PIXI.tilemap.CompositeRectTileLayer
  //
  // Draw a tilemap to texture by using RenderTexture

  var alias_CompositeRectTileLayer_initialize = $.CompositeRectTileLayer.prototype.initialize;
  $.CompositeRectTileLayer.prototype.initialize = function (zIndex, bitmaps, useSquare, texPerChild) {
      alias_CompositeRectTileLayer_initialize.call(this, zIndex, bitmaps, useSquare, texPerChild);

      var gl = Graphics._renderer.gl;

      // Calculrate Screen
      this._frameWidth = gl.drawingBufferWidth;
      this._frameHeight = gl.drawingBufferHeight;

      // Create RenderTexture
      // If it should set PIXI.SCALE_MODES.NEAREST, it will create black lines to upper layer on screen.
      this._renderTexture = PIXI.RenderTexture.create(this._frameWidth,
                                                      this._frameHeight,
                                                      PIXI.SCALE_MODES.NEAREST);
      this._spriteNoise = null;
  };

  var alias_CompositeRectTileLayer_renderWebGL = $.CompositeRectTileLayer.prototype.renderWebGL;
  $.CompositeRectTileLayer.prototype.renderWebGL = function (renderer) {
      if($gameSystem && !!$gameSystem.enabledLight && !$gameSystem.enabledLight()) {
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

      var layers = this.children;
      for (var i = 0; i < layers.length; i++) {
          renderer.render(layers[i], this._renderTexture);
      }

      renderer.bindRenderTarget(currentRenderTarget);

      // Create the sprite
      if(!this._spriteNoise) {
       this._spriteNoise = new NoiseSprite();
       this._spriteNoise.origin = new Point();
       this._spriteNoise.texture = this._renderTexture;
       // Bind Filter
       this._spriteNoise.enabledNoise = false;
      }

      var tw = $gameMap.tileWidth();
      var th = $gameMap.tileHeight();

      this._spriteNoise.origin.x = $gameMap.displayX() * tw;
      this._spriteNoise.origin.y = $gameMap.displayY() * th;

      var ox = Math.floor(this._spriteNoise.origin.x);
      var oy = Math.floor(this._spriteNoise.origin.y);
      var startX = Math.floor((ox - 20) / tw);
      var startY = Math.floor((oy - 20) / th);

      // Update Sprite
      this._spriteNoise.texture = this._renderTexture;
      this._spriteNoise.x = startX * tw - ox;
      this._spriteNoise.y = startY * th - oy;
      this._spriteNoise.scale.x = 1.0;
      this._spriteNoise.scale.y = 1.0;
      this._spriteNoise.anchor.x = (this._spriteNoise.x) / this._frameWidth;
      this._spriteNoise.anchor.y = (this._spriteNoise.y) /  this._frameHeight;

      // Update Filter
      if($gameSystem && $gameSystem.enabledNoise) {
        this._spriteNoise.enabledNoise = $gameSystem.enabledNoise();
      }

      if(this._spriteNoise.enabledNoise) {
        this._spriteNoise.updateNoise();
      }

      renderer.render(this._spriteNoise);

  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Tilemap_noise") {
        switch(args[0]) {
          case 'Enable':
            $gameSystem.setNoiseProperty('enabledNoise', true);
            $gameSystem.setNoiseProperty('a', Number(args[1]));
            $gameSystem.setNoiseProperty('b', Number(args[2]));
            break;
          case 'Disable':
            $gameSystem.setNoiseProperty('enabledNoise', false);
            break;
          case 'SetRandomX':
            $gameSystem.setNoiseProperty('minX', Number(args[1]));
            $gameSystem.setNoiseProperty('maxX', Number(args[2]));
            break;
          case 'SetRandomY':
            $gameSystem.setNoiseProperty('minY', Number(args[1]));
            $gameSystem.setNoiseProperty('maxY', Number(args[2]));
            break;
        }
      }
  };

})(PIXI.tilemap);
