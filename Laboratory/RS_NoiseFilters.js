/*:ko
* @plugindesc (v1.0.5) 타일맵에 노이즈 필터를 적용합니다.
* @author biud436, Vico(Shader)
*
* @help
* =============================================================================
* 플러그인 동작 환경
* =============================================================================
* 이 플러그인은 실험 용이며 일부 모바일 기기에서는 동작하지 않을 수 있습니다.
*
* =============================================================================
* 플러그인 커맨드
* =============================================================================
* 타일맵에 노이즈 필터 효과를 주려면 다음 커맨드를 호출하시면 됩니다.
*
* Tilemap_noise Enable minNoiseAmount maxNoiseAmount
*
* 고정된 값이었으나 다음과 같이 하면 고정된 값에 특정 값을 매 프레임 더하여 모래가
* 날리는 듯한 효과를 냅니다.
*
* Tilemap_noise Enable 0.1 0.2
*
* 노이즈 생성에 영향을 주는 주요 값에 X와 Y라는 미지수를 붙였습니다. 이 값에 램덤한
* 값을 추가하여 노이즈에 변화를 줍니다.
*
* Tilemap_noise SetRandomX min max
* Tilemap_noise SetRandomX -3 3
*
* Tilemap_noise SetRandomY min max
* Tilemap_noise SetRandomY -2 2
*
* 타일맵에 적용된 노이즈 필터를 해제합니다.
*
* Tilemap_noise Disable
*
* =============================================================================
* 스크립트 호출
* =============================================================================
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
*
* =============================================================================
* 변경 기록
* =============================================================================
* 2016.08.28 (v1.0.0) - First Release.
* 2016.08.28 (v1.0.1) - Fixed noise issue.
* 2016.08.28 (v1.0.2) - Fixed render code and Added Script class and Plugin Commands.
* 2016.10.20 (v1.0.3) - Fixed the issue that is not working in RMMV 1.3.2
* 2016.11.26 (v1.0.4) - Added certain code to remove the texture from memory.
* 2017.10.15 (v1.0.5) - Fixed an issue that is not working in RMMV 1.5.1
* 2018.01.10 (v1.0.6) - Fixed the issue that is not working in RMMV 1.6.0
*/
/*:
* RS_NoiseFilters.js
* @plugindesc (v1.0.5) This plugin applies the noise filter to the tilemap.
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
* 2016.10.20 (v1.0.3) - Fixed the issue that is not working in RMMV 1.3.2
* 2016.11.26 (v1.0.4) - Added certain code to remove the texture from memory.
* 2017.10.15 (v1.0.5) - Fixed an issue that is not working in RMMV 1.5.1
* 2018.01.10 (v1.0.6) - Fixed the issue that is not working in RMMV 1.6.0
*/

var Imported = Imported || {};
Imported.RS_NoiseFilters = true;

var RS = RS || {};
RS.NoiseFilters = RS.NoiseFilters || {};

(function () {

  var isFilterPIXI4 = (PIXI.VERSION >= "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
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
      "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
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
    this._noiseDirty = false;
  };

  Game_System.prototype.getNoiseProperty = function (name) {
    if(!!this._noiseProp[name]) {
      return this._noiseProp[name];
    }
  };

  Game_System.prototype.setNoiseDirty = function (value) {
    this._noiseDirty = value;
  };

  Game_System.prototype.getNoiseDirty = function () {
    return this._noiseDirty;
  };

  Game_System.prototype.setNoiseProperty = function (name, value) {
    if(this._noiseProp) {
      this._noiseProp[name] = value;
      this._noiseDirty = true;
      return this._noiseProp[name];
    }
    return 0.0;
  };

  Game_System.prototype.enabledNoise = function () {
    return this._noiseProp['enabledNoise'];
  };

  //----------------------------------------------------------------------------
  // Spriteset_Map
  //
  //

  var alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    alias_Spriteset_Map_createLowerLayer.call(this);
    this.overwriteNoiseProperty();
  };

  Spriteset_Map.prototype.overwriteNoiseProperty = function () {
    if(!this._baseSprite) return false;
    var self = this;
    Object.defineProperty(this._baseSprite, 'noise', {
      get: function () { return this._noise; },
      set: function (value) {
        this._noise = value;
        if(this._noise) {
          if(!this._noiseFilter) this._noiseFilter = new PIXI.NoiseFilterConfig();
          this.filters = [this._noiseFilter, self._toneFilter];
        } else {
          this.filters = [self._toneFilter];
        }
      }
    });
  };

  var alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    alias_Spriteset_Map_update.call(this);
    this.updateNoiseFilter();
  };

  Spriteset_Map.prototype.updateNoiseFilter = function () {
    if($gameSystem && $gameSystem.enabledNoise) {
      if($gameSystem.getNoiseDirty()) {
        this._baseSprite.noise = $gameSystem.getNoiseProperty('enabledNoise');
        $gameSystem.setNoiseDirty(false);
      }
      var x = $gameSystem.getNoiseProperty('x') || 12.9898;
      var y = $gameSystem.getNoiseProperty('y') || 78.233;
      var minX = $gameSystem.getNoiseProperty('minX') || -3;
      var maxX = $gameSystem.getNoiseProperty('maxX') || 3;
      var minY = $gameSystem.getNoiseProperty('minY') || -2;
      var maxY = $gameSystem.getNoiseProperty('maxY') || 2;

      if(this._baseSprite._noiseFilter) {

        this._baseSprite._noiseFilter.noise = Math.quadraticMotion
        (
          $gameSystem.getNoiseProperty('a') || 0.1,
          $gameSystem.getNoiseProperty('b') || 0.2,
          $gameSystem.getNoiseProperty('a') || 0.1
        );

        this._baseSprite._noiseFilter.x = x + Math.floor(minX + Math.random() * maxX);
        this._baseSprite._noiseFilter.y = y + Math.floor(minY + Math.random() * maxY);

        $gameSystem.setNoiseProperty('noise', this._baseSprite._noiseFilter.noise);
        if($gameSystem.getNoiseDirty()) $gameSystem.setNoiseDirty(false);

      }

    }
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

})();
