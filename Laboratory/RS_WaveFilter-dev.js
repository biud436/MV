/*:
 * RS_WaveFilter-dev.js
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
 * 2016.01.14 (v1.0.0) - First Release.
 * 2016.01.16 (v1.0.1) - Added the function to remove the filter.
 * 2016.01.18 (v1.1.0) - Added the plugin command.
 * 2016.01.22 (v1.2.0) - Fixed the Save and Load bug
 * 2016.02.16 (v1.3.0) - Fixed Bug (After the player came back to Menu, you had to set the wave effect again)
 * 2016.02.26 (v1.3.1) - Fixed the default padding value of the sprite. (default value is to 512)
 * 2016.03.03 (v1.3.2) - Added new Sprite Properties (wave_amp, wave_speed, wave_length, wave_phase)
 * 2016.08.13 (v1.4.0 alpha) - Supported for ShaderTilemap and RPG Maker MV 1.3.0 (in Developoment)
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
  // gShaderGenerator
  //
  //

  var gShaderGenerator = {
    fillSamplers: function(shader, maxTextures) {
        var sampleValues = [];
        for (var i = 0; i < maxTextures; i++)
        {
            sampleValues[i] = i;
        }
        shader.bind();
        shader.uniforms.uSamplers = sampleValues;

        var samplerSize = [];
        for (i = 0; i < maxTextures; i++) {
            samplerSize.push(1.0 / 2048);
            samplerSize.push(1.0 / 2048);
        }
        shader.uniforms.uSamplerSize = samplerSize;
    },
    generateFragmentSrc: function(maxTextures, fragmentSrc) {
        return fragmentSrc.replace(/%count%/gi, maxTextures)
            .replace(/%forloop%/gi, this.generateSampleSrc(maxTextures));
    },
    generateSampleSrc: function(maxTextures) {
      var src = '';

      src += '\n';
      src += '\n';

      src += 'if(vTextureId <= -1.0) {';
      src += '\n\tcolor = shadowColor;';
      src += '\n}';

      for (var i = 0; i < maxTextures; i++)
      {
          src += '\nelse ';

          if(i < maxTextures-1)
          {
              src += 'if(textureId == ' + i + '.0)';
          }

          src += '\n{';
          src += '\n\tcolor = texture2D(uSamplers['+i+'], textureCoord * uSamplerSize['+i+']);';
          src += '\n}';
      }

      src += '\n';
      src += '\n';

      return src;
    }
  };

  //----------------------------------------------------------------------------
  // PIXI.tilemap.RectTileShader
  //
  //

  PIXI.tilemap.RectTileShader = function(gl, maxTextures) {

    var vertexSrc = [
    '#define GLSLIFY 1',
    'attribute vec2 aVertexPosition;',

    'attribute vec2 aTextureCoord;',

    'attribute vec4 aFrame;',

    'attribute vec2 aAnim;',

    'attribute float aTextureId;',

    'uniform mat3 projectionMatrix;',

    'uniform vec2 animationFrame;',

    // --- Wave Filter Bind Start ---
    'uniform float waveHeight;',
    'uniform float waveFrequency;',
    'uniform float waveTime;',
    'uniform float wavePhase;',
    'uniform float UVSpeed;',
    'uniform float bWave;',
    'varying vec2 vCoord;',
    'varying highp float v_bWave;',
    // --- Wave Filter Bind End ---

    'varying vec2 vTextureCoord;',

    'varying float vTextureId;',

    'varying vec4 vFrame;',

    'void main(void){',

       'gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',

       'vec2 anim = aAnim * animationFrame;',

       'vTextureCoord = aTextureCoord + anim;',

       'vFrame = aFrame + vec4(anim, anim);',

       // --- Wave Filter Bind Start ---

       'v_bWave = bWave;',
       'float time = waveFrequency * sin(wavePhase * (mod(waveTime - vTextureCoord.y, waveHeight)));',
       'vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);',

       // --- Wave Filter Bind End ---

       'vTextureId = aTextureId;',

    '}'

    ].join('\n');

    var fragmentSrc = gShaderGenerator.generateFragmentSrc(maxTextures,  [
      '#define GLSLIFY 1',
      'varying vec2 vTextureCoord;',

      'varying vec4 vFrame;',

      'varying float vTextureId;',

      // --- Wave Filter Bind Start ---
      'varying vec2 vCoord;',
      'varying highp float v_bWave;',
      // --- Wave Filter Bind End ---

      'uniform vec4 shadowColor;',

      'uniform sampler2D uSamplers[%count%];',

      'uniform vec2 uSamplerSize[%count%];',

      'void main(void) {',

      'vec2 textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);',

      'if (v_bWave >= 1.0)',
      '{',
      '  textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);',
      '} else {',
      '  textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);',
      '}',

      '  float textureId = floor(vTextureId + 0.5);',

      '  vec4 color;',

      '%forloop%',

      '  gl_FragColor = color;',

      '}'
    ].join('\n'));

    PIXI.Shader.call(this, gl, vertexSrc, fragmentSrc);

    this.maxTextures = maxTextures;
    this.vertSize = 11;
    this.vertPerQuad = 4;
    this.stride = this.vertSize * 4;
    gShaderGenerator.fillSamplers(this, this.maxTextures);

    this.uniforms.bWave = 0.0;
    this.uniforms.waveHeight = 0.5;
    this.uniforms.waveFrequency = 0.02;
    this.uniforms.waveTime = 0.0;
    this.uniforms.UVSpeed = 0.25;
    this.uniforms.wavePhase = 6.283185307179586;

  };

  PIXI.tilemap.RectTileShader.prototype = Object.create(PIXI.Shader.prototype);
  PIXI.tilemap.RectTileShader.prototype.constructor = PIXI.tilemap.RectTileShader;
  PIXI.tilemap.RectTileShader.prototype.createVao = function (renderer, vb) {
    var gl = renderer.gl;
    return renderer.createVao()
        .addIndex(this.indexBuffer)
        .addAttribute(vb, this.attributes.aVertexPosition, gl.FLOAT, false, this.stride, 0)
        .addAttribute(vb, this.attributes.aTextureCoord, gl.FLOAT, false, this.stride, 2 * 4)
        .addAttribute(vb, this.attributes.aFrame, gl.FLOAT, false, this.stride, 4 * 4)
        .addAttribute(vb, this.attributes.aAnim, gl.FLOAT, false, this.stride, 8 * 4)
        .addAttribute(vb, this.attributes.aTextureId, gl.FLOAT, false, this.stride, 10 * 4);
  };

  //----------------------------------------------------------------------------
  // PIXI.tilemap.SquareTileShader
  //
  //

  PIXI.tilemap.SquareTileShader = function (gl, maxTextures) {
      var vertexSrc = [
      '#define GLSLIFY 1',
      'attribute vec2 aVertexPosition;',

      'attribute vec2 aTextureCoord;',

      'attribute vec2 aAnim;',

      'attribute float aTextureId;',

      'attribute float aSize;',

      'uniform mat3 projectionMatrix;',

      'uniform vec2 samplerSize;',

      'uniform vec2 animationFrame;',

      'uniform float projectionScale;',

      // --- Wave Filter Bind Start ---
      'uniform float waveHeight;',
      'uniform float waveFrequency;',
      'uniform float waveTime;',
      'uniform float wavePhase;',
      'uniform float UVSpeed;',
      'uniform float bWave;',
      'varying vec2 vCoord;',
      'varying float v_bWave;',
      // --- Wave Filter Bind End ---

      'varying vec2 vTextureCoord;',

      'varying float vSize;',

      'varying float vTextureId;',

      'void main(void){',

         'gl_Position = vec4((projectionMatrix * vec3(aVertexPosition + aSize * 0.5, 1.0)).xy, 0.0, 1.0);',

        ' gl_PointSize = aSize * projectionScale;',

         'vTextureCoord = aTextureCoord + aAnim * animationFrame;',

         // --- Wave Filter Bind Start ---

         'v_bWave = bWave;',
         'float time = waveFrequency * sin(wavePhase * (mod(waveTime - vTextureCoord.y, waveHeight)));',
         'vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);',

         // --- Wave Filter Bind End ---

         'vTextureId = aTextureId;',

        ' vSize = aSize;',

      '}'
      ].join('\n');
      PIXI.Shader.call(this, gl,
          vertexSrc,
          gShaderGenerator.generateFragmentSrc(maxTextures, [
            '#define GLSLIFY 1',
            'varying vec2 vTextureCoord;',

            'varying float vSize;',

            'varying float vTextureId;',

            // --- Wave Filter Bind Start ---
            'varying vec2 vCoord;',
            'varying float v_bWave;',
            // --- Wave Filter Bind End ---

            'uniform vec4 shadowColor;',

            'uniform sampler2D uSamplers[%count%];',

            'uniform vec2 uSamplerSize[%count%];',

            'uniform vec2 pointScale;',

            'void main(void){',

              'float margin = 1.0/vSize;',

              'vec2 clamped = vec2(clamp(gl_PointCoord.x, margin, 1.0 - margin), clamp(gl_PointCoord.y, margin, 1.0 - margin));',
              'vec2 textureCoord = ((clamped-0.5) * pointScale + 0.5) * vSize + vTextureCoord;',

              'if(v_bWave >= 1.0) { ',
              '    textureCoord = ((clamped-0.5) * pointScale + 0.5) * vSize + vCoord;',
              '} else {',
              '    textureCoord = ((clamped-0.5) * pointScale + 0.5) * vSize + vTextureCoord;',
              '}',

              'float textureId = vTextureId;',

              'vec4 color;',

              '%forloop%',

              'gl_FragColor = color;',

            '}  '
          ].join('\n'))
      );
      this.maxTextures = maxTextures;
      this.vertSize = 8;
      this.vertPerQuad = 1;
      this.stride = this.vertSize * 4;
      gShaderGenerator.fillSamplers(this, this.maxTextures);

      this.uniforms.bWave = 0.0;
      this.uniforms.waveHeight = 0.5;
      this.uniforms.waveFrequency = 0.02;
      this.uniforms.waveTime = 0.0;
      this.uniforms.UVSpeed = 0.25;
      this.uniforms.wavePhase = 6.283185307179586;

  }

  PIXI.tilemap.SquareTileShader.prototype = Object.create(PIXI.Shader.prototype);
  PIXI.tilemap.SquareTileShader.prototype.constructor = PIXI.tilemap.SquareTileShader;
  PIXI.tilemap.SquareTileShader.prototype.createVao = function (renderer, vb) {
      var gl = renderer.gl;
      return renderer.createVao()
          .addIndex(this.indexBuffer)
          .addAttribute(vb, this.attributes.aVertexPosition, gl.FLOAT, false, this.stride, 0)
          .addAttribute(vb, this.attributes.aTextureCoord, gl.FLOAT, false, this.stride, 2 * 4)
          .addAttribute(vb, this.attributes.aSize, gl.FLOAT, false, this.stride, 4 * 4)
          .addAttribute(vb, this.attributes.aAnim, gl.FLOAT, false, this.stride, 5 * 4)
          .addAttribute(vb, this.attributes.aTextureId, gl.FLOAT, false, this.stride, 7 * 4);
  };

  //----------------------------------------------------------------------------
  // PIXI.tilemap.TileRenderer
  //
  //

  PIXI.tilemap.TileRenderer.prototype.onContextChange = function () {
      var gl = this.renderer.gl;
      var maxTextures = this.maxTextures;
      this.rectShader = new PIXI.tilemap.RectTileShader(gl, maxTextures);
      this.squareShader = new PIXI.tilemap.SquareTileShader(gl, maxTextures);
      this.indexBuffer = PIXI.glCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW);
      this.checkIndexBuffer(2000);
      this.rectShader.indexBuffer = this.indexBuffer;
      this.squareShader.indexBuffer = this.indexBuffer;
      this.vbs = {};
      this.glTextures = [];
      this.boundSprites = [];
      this.initBounds();
  };

  //----------------------------------------------------------------------------
  // PIXI.tilemap.CompositeRectTileLayer
  //
  //
  PIXI.tilemap.CompositeRectTileLayer.prototype.updateWave = function () {
    var shader = renderer.plugins.tile.getShader(this.useSquare);
    // var isWaveEnabled = (shader.uniforms.bWave >= 1.0) ? true : false ;
    if(true) {
      shader.uniforms.waveTime = Date.now() % 10000 / 10000;
    }
  };

  PIXI.tilemap.CompositeRectTileLayer.prototype.renderWebGL = function (renderer) {
    var gl = renderer.gl;
    var shader = renderer.plugins.tile.getShader(this.useSquare);
    renderer.setObjectRenderer(renderer.plugins.tile);
    renderer.bindShader(shader);
    //TODO: dont create new array, please
    this._globalMat = this._globalMat || new PIXI.Matrix();
    renderer._activeRenderTarget.projectionMatrix.copy(this._globalMat).append(this.worldTransform);
    shader.uniforms.projectionMatrix = this._globalMat.toArray(true);
    shader.uniforms.shadowColor = this.shadowColor;

    // Wave Properties
    shader.uniforms.bWave = (($gameSystem.getWaveEnabled() === true) ? 1.0 : 0.0);
    shader.uniforms.waveHeight = $gameSystem.getWaveHeight() || 0.5;
    shader.uniforms.waveFrequency = $gameSystem.getWaveFrequency() || 0.02;
    shader.uniforms.waveTime = $gameSystem.getWaveTime() || 0.0;
    shader.uniforms.UVSpeed = $gameSystem.getUVSpeed() || 0.25;
    shader.uniforms.wavePhase = $gameSystem.getWavePhase() || 6.283185307179586;

    if (this.useSquare) {
        var tempScale = this._tempScale = (this._tempScale || [0, 0]);
        tempScale[0] = this._globalMat.a >= 0 ? 1 : -1;
        tempScale[1] = this._globalMat.d < 0 ? 1 : -1;
        var ps = shader.uniforms.pointScale = tempScale;
        shader.uniforms.projectionScale = Math.abs(this.worldTransform.a) * renderer.resolution;
    }
    var af = shader.uniforms.animationFrame = renderer.plugins.tile.tileAnim;

    //shader.syncUniform(shader.uniforms.animationFrame);
    var layers = this.children;
    for (var i = 0; i < layers.length; i++)
        layers[i].renderWebGL(renderer, this.useSquare);
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
      'waveHeight': 1/2048,
      'waveFrequency': 1/2048,
      'waveTime': 0.0,
      'UVSpeed': 0.25,
      'wavePhase': 6.283185307179586
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

  //----------------------------------------------------------------------------
  // ShaderTilemap
  //
  //

  var alias_ShaderTilemap_updateLayerPositions = ShaderTilemap.prototype._updateLayerPositions;
  ShaderTilemap.prototype._updateLayerPositions = function(startX, startY) {
    alias_ShaderTilemap_updateLayerPositions.call(this, startX, startY);
    if(this.lowerZLayer && this.upperZLayer && !!this.lowerZLayer.updateWave ) {
      if(this.lowerZLayer instanceof PIXI.tilemap.CompositeRectTileLayer) {
        this.lowerZLayer.updateWave();
        this.upperZLayer.updateWave();
      }
    }
  };

  ShaderTilemap.prototype._createLayers = function() {
      var width = this._width;
      var height = this._height;
      var margin = this._margin;
      var tileCols = Math.ceil(width / this._tileWidth) + 1;
      var tileRows = Math.ceil(height / this._tileHeight) + 1;
      var layerWidth = this._layerWidth = tileCols * this._tileWidth;
      var layerHeight = this._layerHeight = tileRows * this._tileHeight;
      this._needsRepaint = true;

      if (!this.lowerZLayer) {
          //@hackerham: create layers only in initialization. Doesn't depend on width/height
          this.addChild(this.lowerZLayer = new PIXI.tilemap.ZLayer(this, 0));
          this.addChild(this.upperZLayer = new PIXI.tilemap.ZLayer(this, 4));

          var parameters = PluginManager.parameters('ShaderTilemap');
          var useSquareShader = Number(parameters.hasOwnProperty('squareShader') ? parameters['squareShader'] : 0);

          this.lowerZLayer.addChild(this.lowerLayer = new PIXI.tilemap.CompositeRectTileLayer(0, [], useSquareShader));
          this.lowerLayer.shadowColor = new Float32Array([0.0, 0.0, 0.0, 0.5]);
          this.upperZLayer.addChild(this.upperLayer = new PIXI.tilemap.CompositeRectTileLayer(4, [], useSquareShader));
      }
  };


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
      'uniform float waveHeight;',
      'uniform float waveFrequency;',
      'uniform float waveTime;',
      'uniform float wavePhase;',
      'uniform float UVSpeed;',
      'varying vec2 vTextureCoord;',
      'varying vec2 vCoord;',

      'void main(void){',
      '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
      '    vTextureCoord = aTextureCoord;',
      '    float time = waveFrequency * sin(wavePhase * (mod(waveTime - vTextureCoord.y, waveHeight)));',
      '    vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);',
      '}'
    ].join('\n');

     var fragmentSrc = [
       '#define GLSLIFY 1',

       'precision mediump float;',
       'varying vec2 vTextureCoord;',

       'varying vec2 vCoord;',

       'uniform sampler2D uSampler;',

       'void main(void) {',
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

(function() {

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

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
          case 'waveHeight':
            $gameSystem.setWaveProperty('waveHeight', Number(args[1]));
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

})();
