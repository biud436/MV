/*:
 * RS_SimpleLight-dev.js
 * @plugindesc This plugin applies the lighting effect to the all objects
 * by using the Fragment Shader, allows you to give a feeling to explore a dark terrain.
 * @author biud436
 *
 * @param coord normalize min
 * @desc You have to necessarily use a floating-point (Do not use Integer)
 * @default 0.4
 *
 * @help
 *
 * This plugin commands allows you to enable or disable a lantern.
 *
 * RS_SimpleLight Enable
 * RS_SimpleLight Disable
 *
 * This plugin commands allows you to set the offset of the light. The default value is to 0.5 0.5
 * RS_SimpleLight Offset x y
 *
 * This plugin commands allows you to set the brightness of light.
 * The f is a floating-point value between 0.5 and 1.0. The default value is to 1.0
 * RS_SimpleLight Brightness f
 *
 * This adjusts brightness of the dark side.
 * The f is a floating-point value between 5.0 and 12.0. The default value is to 8.0
 * RS_SimpleLight Tight f
 *
 * This adjusts tone of the light. Each color value sets an integer between 0 and 255.
 * The default value is to 255 255 255
 * RS_SimpleLight Tone r g b
 *
 */

var Imported = Imported || {};
Imported.RS_SimpleLight = true;

var RS = RS || {};
RS.LightConfig = RS.LightConfig || {};

(function() {

  var parameters = PluginManager.parameters('RS_SimpleLight-dev');
  var f_CoordMin = Number(parameters['coord normalize min'] || 0.4 );
  var isFilterPIXI4 = (PIXI.VERSION === "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");

  //-----------------------------------------------------------------------------
  // SimpleLightFilter
  //
  // This class creates a light by utilizing a Vertex Shader and Fragment Shader.

  PIXI.SimpleLightFilter = function() {

    var vertexSrc = [
      '#define GLSLIFY 1',

      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',
      'uniform mat3 projectionMatrix;',

      'uniform vec3 u_LightPos;',
      'uniform float brightness;',
      'uniform float tight;',

      'uniform float radius;',
      'uniform float angle;',
      'uniform vec2 offset;',

      'uniform float coordMin;',

      'varying vec2 vTextureCoord;',
      'varying vec2 vTestCoord;',
      'varying vec2 vTestOffset;',
      'varying float diffuse;',
      'varying vec3 vLightVector;',

      'void main(void){',
      '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
      '    vTextureCoord = aTextureCoord;',

      '    vTestCoord = vTextureCoord - offset;',
      '    float test_distance = length(vTestCoord);',
      '    diffuse = 1.0;',
      '    vTestOffset = offset;',

      // 정규화
      '   vec3 coord = clamp(normalize(vec3(vTextureCoord.x, vTextureCoord.y, 1.0 )), coordMin, 1.0);',
      '   float distance = distance(coord, u_LightPos);',

      // 광원
      '   vec3 view = normalize(vec3(vTestCoord, 1.0) - u_LightPos);',
      '   vLightVector = normalize(coord - u_LightPos);',

      // 회전 행렬 (벡터)
      '   float s = sin(angle);',
      '   float c = cos(angle);',
      '   coord.x = offset.x * c - offset.y * s;',
      '   coord.y = offset.x * s + offset.y * c;',

      // 입사광 벡터와 법선 벡터 사이의 각도
      '   diffuse = clamp(dot(-view, coord), 0.5, brightness);',

      // 거리 비율을 적용합니다 (비율 계산)
      '   diffuse = diffuse * 1.0 / (1.0 + (0.1 * distance ));',

      // 밝기를 항상 30% 으로 설정합니다.
      '   diffuse = diffuse + 0.3;',

      // 0.0 이하면 오류가 날 수 있으므로 조건문 처리
      '   if(diffuse > 0.0) {',
      '     diffuse = pow(diffuse, tight);',
      '   }',
      '}'
    ].join('\n');

    var fragmentSrc = [
      '#define GLSLIFY 1',

      'precision mediump float;',

      'varying vec2 vTextureCoord;',
      'varying vec2 vTestCoord;',
      'varying vec2 vTestOffset;',
      'varying float diffuse;',
      'varying vec3 vLightVector;',

      'uniform sampler2D uSampler;',
      'uniform vec3 v_tone;',

      'void main(void) {',

        //======================================================================

      '   gl_FragColor = texture2D(uSampler, vTestCoord + vTestOffset) * diffuse;',

      // Tone 옵션
      '   if (length(vLightVector) > 0.5) {',
         ' gl_FragColor.rgb = gl_FragColor.rgb * v_tone.rgb;',
      '   }',

      '}'
    ].join('\n');

    PIXI.Filter.call( this, vertexSrc , fragmentSrc);

    this.uniforms.u_LightPos = {x: 1.0 , y: 1.0, z: 1.0};
    this.uniforms.brightness = 1.0;
    this.uniforms.tight = 8.0;
    this.uniforms.offset = {x: 0.5, y: 0.5};
    this.uniforms.angle = 5.0;
    this.uniforms.radius = 0.3;
    this.uniforms.coordMin = f_CoordMin;
    this.uniforms.v_tone = [1.0, 1.0, 1.0];

    this.glShaderKey = 'SimpleLight';

  };

  PIXI.SimpleLightFilter.prototype = Object.create( PIXI.Filter.prototype );
  PIXI.SimpleLightFilter.prototype.constructor = PIXI.SimpleLightFilter;

  PIXI.SimpleLightFilter.prototype.apply = function (filterManager, input, output, clear)
  {
      PIXI.filterManager.applyFilter(this, input, output, clear);
  };

  Object.defineProperties(PIXI.SimpleLightFilter.prototype, {
    positionX: {
      get: function() {
          return this.uniforms.u_LightPos.x;
      },
      set: function(value) {
        this.uniforms.u_LightPos.x = value * 1.0;
      }
    },
    positionY: {
      get: function() {
          return this.uniforms.u_LightPos.y;
      },
      set: function(value) {
        this.uniforms.u_LightPos.y = value * 1.0;
      }
    },
    positionZ: {
      get: function() {
          return this.uniforms.u_LightPos.z;
      },
      set: function(value) {
        this.uniforms.u_LightPos.z = value * 1.0;
      }
    },
    brightness: {
      get: function() {
          return this.uniforms.brightness;
      },
      set: function(value) {
          this.uniforms.brightness = value * 1.0;
      }
    },
    tight: {
      get: function() {
          return this.uniforms.tight;
      },
      set: function(value) {
          this.uniforms.tight = value * 1.0;
      }
    },
    offset: {
      get: function() {
          return this.uniforms.offset;
      },
      set: function(value) {
          this.uniforms.offset = value;
      }
    },
    angle: {
      get: function() {
          return this.uniforms.angle;
      },
      set: function(value) {
          this.uniforms.angle = value;
      }
    },
    v_tone: {
      get: function() {
          return this.uniforms.v_tone;
      },
      set: function(value) {
          this.uniforms.v_tone = value;
      }
    }
  });

  //-----------------------------------------------------------------------------
  // RS.LightConfig
  //
  //

  RS.LightConfig.setTilemap = function(obj) {
    this._wTileMap = obj;
    if(this._config) {
      obj.setLightConfig(this._config);
    }
  }

  RS.LightConfig.getTilemap = function() {
    return this._wTileMap;
  };

  RS.LightConfig.makeLightConfig = function() {
    if(this._wTileMap) {
      var config = this.getTilemap().makeLightConfig();
      return config;
    }
  }

  RS.LightConfig.setLightConfig = function(config) {
    this._config = config;
  }

  //-----------------------------------------------------------------------------
  // DataManager
  //
  // 게임의 저장 및 로드

  var alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = alias_DataManager_makeSaveContents.call(this);
    contents.lightConfig = RS.LightConfig.makeLightConfig();
    return contents;
  };

  var DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    DataManager_extractSaveContents.call(this, contents);
    RS.LightConfig.setLightConfig(contents.lightConfig);
  };

  //-----------------------------------------------------------------------------
  // Tilemap
  //
  // 광원의 위치에 따라 명암을 차등 적용합니다.

  var alias_Tilemap_initialize = Tilemap.prototype.initialize;
  Tilemap.prototype.initialize = function() {
    alias_Tilemap_initialize.call(this);
    RS.LightConfig.setTilemap(this);
  }

  var alias_Tilemap_update = Tilemap.prototype.update;
  Tilemap.prototype.update = function() {
    alias_Tilemap_update.call(this);

    // $gameMap.events().forEach(function(i) {
    //     if(i.event().note.match(/Light/)) {
    //       this.updateLightSystem(i);
    //     }
    // }.bind(this));

    this.updateLightSystem($gamePlayer);
  }

  Tilemap.prototype.updateLightSystem = function(light_owner) {
    if(this._simpleLightFilter && light_owner) {
      this._simpleLightFilter.positionX = (light_owner.screenX() / Graphics.boxWidth) - 0.5;
      this._simpleLightFilter.positionY = 1.0 - (light_owner.screenY() / Graphics.boxHeight) - 0.5;
      this._simpleLightFilter.positionZ = 1.0;

      switch(light_owner.direction()) {
        case 2:
          this._simpleLightFilter.angle = (Math.PI / 180) * (45.0);
          break;
        case 4:
          this._simpleLightFilter.angle = (Math.PI / 180) * (-45.0);
          break;
        case 6:
          this._simpleLightFilter.angle =  (Math.PI / 180) * (0.0);
          break;
        case 8:
          this._simpleLightFilter.angle = (Math.PI / 180) * (135.0);
          break;
      }

    }
  }

  Tilemap.prototype.setLightProperty = function(name, value) {
    if(this._light && !!this._simpleLightFilter[name]) {
        this._simpleLightFilter[name] = value;
        RS.LightConfig.setLightConfig(this.makeLightConfig());
    }
  }

  Tilemap.prototype.makeLightConfig = function() {
    var config = {};
    if(this.light) {
      config.light = this.light;
      config.tight = this._simpleLightFilter['tight'];
      config.offset = this._simpleLightFilter['offset'];
      config.angle = this._simpleLightFilter['angle'];
      config.radius = this._simpleLightFilter['radius'];
      config.brightness = this._simpleLightFilter['brightness'];
      config.positionX = this._simpleLightFilter['positionX'];
      config.positionY = this._simpleLightFilter['positionY'];
      config.positionZ = this._simpleLightFilter['positionZ'];
      config.v_tone = this._simpleLightFilter['v_tone'];
    }
    return config;
  }

  Tilemap.prototype.setLightConfig = function(config) {
    if(config && config.light) {
      this.light = true;
      this.setLightProperty('tight', config.tight);
      this.setLightProperty('offset', config.offset);
      this.setLightProperty('angle', config.angle);
      this.setLightProperty('radius', config.radius);
      this.setLightProperty('brightness', config.brightness);
      this.setLightProperty('positionX', config.positionX);
      this.setLightProperty('positionY', config.positionY);
      this.setLightProperty('positionZ', config.positionZ);
      this.setLightProperty('v_tone', config.v_tone);
    }
  }

  Object.defineProperty(Tilemap.prototype, 'light', {
     get: function() {
         return this._light;
     },
     set: function(value) {
         this._light = value;
         if(this._light) {
           if(!this._simpleLightFilter) {
             this._simpleLightFilter = new PIXI.SimpleLightFilter();
             this._simpleLightFilter.padding = Graphics.boxHeight;
           }
           this.filters = [this._simpleLightFilter];
           RS.LightConfig.setLightConfig(this.makeLightConfig());
         } else {
           this.filters = this.filters.filter(function(i) {
             if(i.constructor.name === 'SimpleLightFilter') {
               return false;
             }
             return true;
            });
         }
     }
  });

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //
  // 화면 밝기에 생기는 문제를 해결하기 위해 추가되었습니다
  Spriteset_Map.prototype.createDestination = function() {
      this._destinationSprite = new Sprite_Destination();
      this._destinationSprite.z = 9;
      this._baseSprite.addChild(this._destinationSprite);
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //
  // 플러그인 커맨드
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "RS_SimpleLight") {
        switch(args[0]) {
          case 'Enable':
            RS.LightConfig.getTilemap().light = true;
            break;
          case 'Disable':
            if(!!RS.LightConfig.getTilemap().light) {
                RS.LightConfig.getTilemap().light = false;
                RS.LightConfig.getTilemap().filters = null;
                RS.LightConfig._config = null;
            }
            break;
          case 'Offset':
            RS.LightConfig.getTilemap().setLightProperty('offset', {x: Number(args[1] || 1.0), y: Number(args[2] || 1.0)} );
            break;
          case 'Brightness':
            RS.LightConfig.getTilemap().setLightProperty('brightness', Number(args[1] || 1.0) * 1.0);
            break;
          case 'Tight':
            RS.LightConfig.getTilemap().setLightProperty('tight', Number(args[1] || 8.0) * 1.0);
            break;
          case 'Tone':
            var r = Number(args[1] || 255) / 255;
            var g = Number(args[2] || 255) / 255;
            var b = Number(args[3] || 255) / 255;
            RS.LightConfig.getTilemap().setLightProperty('v_tone', [r,g,b] );
            break;
        }
      }
  };


})();
