/*:
 * RS_NoiseFilters.js
 * @plugindesc (v1.0.1) This plugin applies the noise filter to the tilemap.
 * @author biud436, Vico
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Command
 * -----------------------------------------------------------------------------
 * Tilemap_noise Enable a b
 * Tilemap_noise Enable 0.2 0.98
 * Tilemap_noise Disable
 * -----------------------------------------------------------------------------
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.08.28 (v1.0.0) - First Release.
 * 2016.08.28 (v1.0.1) - Fixed noise issue.
 */

var Imported = Imported || {};
Imported.RS_NoiseFilters = true;

var RS = RS || {};
RS.NoiseFilters = RS.NoiseFilters || {};

(function () {

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
  // RS.NoiseFilters
  //
  //

  RS.NoiseFilters.enabled = null;
  RS.NoiseFilters.a = null;
  RS.NoiseFilters.b = null;
  RS.NoiseFilters.c = null;
  RS.NoiseFilters.save = function (enabled, a, b, c) {
    var self = RS.NoiseFilters;
    self.enabled = enabled;
    self.a = a || self.a;
    self.b = b || self.b;
    self.c = c || self.c;
  };
  RS.NoiseFilters.getData = function () {
    var self = RS.NoiseFilters;
    return [self.enabled, self.a, self.b, self.c];
  }

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
  // DataManager
  //
  //

  var alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = alias_DataManager_makeSaveContents.call(this);
    contents.noise = RS.NoiseFilters.getData();
    return contents;
  };

  var alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    alias_DataManager_extractSaveContents.call(this, contents);
    if(contents.noise) {
      RS.NoiseFilters.save(contents.noise[0], contents.noise[1],
                           contents.noise[2], contents.noise[3]);
      if(contents.noise[0]) {
        isNoiseFilter = contents.noise[0];
        Graphics.applyNoiseFilter(contents.noise[1], contents.noise[2], contents.noise[3]);
      }
    }
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

  //----------------------------------------------------------------------------
  // Graphics
  //
  //

  var alias_Graphics__createRenderer = Graphics._createRenderer;
  Graphics._createRenderer = function() {
    alias_Graphics__createRenderer.call(this);
    this._createRenderTexture();
  };

  Graphics._createRenderTexture = function () {
    var sprite; var rect; var self = Graphics;
    if(!self._renderer) { return; }
    var gl = self._renderer.gl;

    // Calculrate Screen
    self._frameWidth = gl.drawingBufferWidth || 816;
    self._frameHeight = gl.drawingBufferHeight || 624;

    // Create RenderTexture
    self._renderTexture = PIXI.RenderTexture.create(self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);

    // Create RenderTarget
    self._renderTarget = new PIXI.RenderTarget(gl, self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);
    // Create Sprite
    self._renderSprite = new Sprite();
    self._renderSprite.filters = [new PIXI.filters.VoidFilter()];

  };

  Graphics.checkNoiseFilter = function () {
    var data = RS.NoiseFilters.getData();
    if(data && !isNoiseFilter) {
      isNoiseFilter = !!data[0];
      Graphics.applyNoiseFilter(data[1], data[2], data[3]);
    }
  }

  Graphics.applyNoiseFilter = function (a, b, c) {
    if(!this._renderTexture) return;
    if(this._noiseFilter) {
        this._noiseFilter.noise = Math.quadraticMotion(a, b, c);
        this._noiseFilter.x = 12.9898 + Math.floor(-3 + Math.random() * 3);
        this._noiseFilter.y = 78.233 + Math.floor(-2 + Math.random() * 2);
    } else {
      this._noiseFilter = new PIXI.NoiseFilterConfig();
      this._noiseFilter.noise = Math.quadraticMotion(a, b, c);
      this._renderSprite.filters = [this._noiseFilter];
      enabledNoiseFilter = true;
    }
    RS.NoiseFilters.save(enabledNoiseFilter, a, b, c);
  };

  Graphics.destroyNoiseFilter = function () {
    if(!this._renderTexture) return;
    this._renderTexture.filters = [new PIXI.filters.VoidFilter()];
    this._noiseFilter = null;
    RS.NoiseFilters.save(enabledNoiseFilter);
  };

  Graphics.isSceneMapOrBattle = function (stage) {
    return (stage instanceof Scene_Map || stage instanceof Scene_Battle);
  }

  Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
          if(isNoiseFilter && this.isSceneMapOrBattle(stage)) {
            this._renderer.bindRenderTexture(this._renderTexture);
            this._renderer.render(stage, this._renderTexture);
            this._renderer.bindRenderTarget(this._renderTarget);
            this._renderSprite.texture = this._renderTexture;
            this._renderer.render(this._renderSprite);
          } else {
            this._renderer.render(stage);
          }
        }
        var endTime = Date.now();
        var elapsed = endTime - startTime;
        this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
        this._rendered = true;
    } else {
        this._skipCount--;
        this._rendered = false;
    }
    this.frameCount++;
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
            isNoiseFilter = true;
            Graphics.applyNoiseFilter(Number(args[1] || 0.2),
                                      Number(args[2] || 0.8),
                                      Number(args[1] || 0.2));
            break;
          case 'Disable':
            isNoiseFilter = false;
            enabledNoiseFilter = false;
            Graphics.destroyNoiseFilter();
            break;
        }
      }
  };

})();
