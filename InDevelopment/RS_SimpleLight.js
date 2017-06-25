/*:
 * RS_SimpleLight.js
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

function LightSprite() {
  this.initialize.apply(this, arguments);
};

(function($) {

  'use strict';

  var parameters = PluginManager.parameters('RS_SimpleLight');
  var f_CoordMin = Number(parameters['coord normalize min'] || 0.4 );
  var isFilterPIXI4 = (PIXI.VERSION === "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  var isWebGL = PIXI.utils.isWebGLSupported();
  var isUseCanvas = Utils.isOptionValid('canvas');

  if(isUseCanvas || !isWebGL || !isFilterPIXI4) {
    console.error('This plugin does not support in your project');
    return;
  }

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

        'varying vec2 vTextureCoord;',

        'void main(void){',
        '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
        '    vTextureCoord = aTextureCoord;',
        '}'
      ].join('\n');

      var fragmentSrc = [
        '#define GLSLIFY 1',

        'precision mediump float;',

        'uniform sampler2D uSampler;',

        'uniform vec3 u_LightPos;',
        'uniform float brightness;',
        'uniform float tight;',
        'uniform float angle;',
        'uniform vec2 offset;',

        'uniform float coordMin;',
        'uniform vec3 v_tone;',

        'varying vec2 vTextureCoord;',

        'void main(void) {',

        '  offset = clamp(offset, 0.0, 1.0);',
        '  vec2 vTestCoord = vTextureCoord - offset;',
        '  float test_distance = length(vTestCoord);',
        '  float diffuse = 1.0;',
        '  vec2 vTestOffset = offset;',

        // Nomalize
        '   vec3 coord = clamp(normalize(vec3(vTextureCoord.x, vTextureCoord.y, 1.0 )), coordMin, 1.0);',
        '   float distance = distance(coord, u_LightPos);',

        // Calculate Lighting
        '   vec3 view = normalize(vec3(vTestCoord, 1.0) - u_LightPos);',
        '   vec3 vLightVector = normalize(coord - u_LightPos);',

        // Rotate Matrix (무거움)
        '   float s = sin(angle);',
        '   float c = cos(angle);',
        '   coord.x = offset.x * c - offset.y * s;',
        '   coord.y = offset.x * s + offset.y * c;',

        // 입사광 벡터와 법선 벡터 사이의 각도
        '   diffuse = clamp(dot(-view, coord), 0.5, brightness);',

        // 거리 비율을 적용합니다 (비율 계산)
        '   diffuse = diffuse * 1.0 / (1.0 + (0.1 * distance ));',

        // The brightness sets to 30 percent or more.
        '   diffuse = diffuse + 0.3;',

        // if diffuse value is 0.0 or less, it may occur the error.
        '   if(diffuse > 0.0) {',
        '     diffuse = pow(diffuse, tight);',
        '   }',

        '   gl_FragColor = texture2D(uSampler, vTestCoord + vTestOffset) * diffuse;',

        // Apply the tone
        '   if (length(vLightVector) > 0.5) {',
           '  gl_FragColor.rgb = gl_FragColor.rgb * v_tone.rgb;',
        '   }',

        '}'
      ].join('\n');

      PIXI.Filter.call( this, vertexSrc, fragmentSrc);

      this.uniforms.u_LightPos = {x: 1.0, y: 1.0, z: 1.0};
      this.uniforms.brightness = 1.0;
      this.uniforms.tight = 8.0;
      this.uniforms.offset = {x: 0.5, y: 0.5};
      this.uniforms.angle = 5.0;
      this.uniforms.coordMin = f_CoordMin;
      this.uniforms.v_tone = {x: 1.0, y: 1.0, z: 1.0};

      this.padding = 512;

      this.enabled = true;
      this.resolution = 1;

    };

    PIXI.SimpleLightFilter.prototype = Object.create( PIXI.Filter.prototype );
    PIXI.SimpleLightFilter.prototype.constructor = PIXI.SimpleLightFilter;

    Object.defineProperties(PIXI.SimpleLightFilter.prototype, {
      positionX: {
        get: function() {
            return this.uniforms.u_LightPos.x;
        },
        set: function(value) {
          this.uniforms.u_LightPos.x = value;
        }
      },
      positionY: {
        get: function() {
            return this.uniforms.u_LightPos.y;
        },
        set: function(value) {
          this.uniforms.u_LightPos.y = value;
        }
      },
      positionZ: {
        get: function() {
            return this.uniforms.u_LightPos.z;
        },
        set: function(value) {
          this.uniforms.u_LightPos.z = value;
        }
      },
      brightness: {
        get: function() {
            return this.uniforms.brightness;
        },
        set: function(value) {
            this.uniforms.brightness = value;
        }
      },
      tight: {
        get: function() {
            return this.uniforms.tight;
        },
        set: function(value) {
            this.uniforms.tight = value;
        }
      },
      offset: {
        get: function() {
            return this.uniforms.offset;
        },
        set: function(value) {
            this.uniforms.offset.x = value.x.clamp(0, 1);
            this.uniforms.offset.y = value.y.clamp(0, 1);
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

    //--------------------------------------------------------------------------
    // LightSprite
    //
    // This class inherits all of functions from Sprite class.

    LightSprite.prototype = Object.create(Sprite.prototype);
    LightSprite.prototype.constructor = LightSprite;

    LightSprite.prototype.initialize = function (bitmap) {
      Sprite.prototype.initialize.call(this, bitmap);
    };

    LightSprite.prototype.updateLight = function() {
      if($gamePlayer) this.updateLightSystem($gamePlayer);
      this.updateProperty();
    };

    LightSprite.prototype.setValue = function (key) {
      // this is function for saving
      if(this.light && this._simpleLightFilter && $gameSystem._lightProp[key]) {
        this._simpleLightFilter[key] = $gameSystem._lightProp[key];
      }
    };

    LightSprite.prototype.updateLightSystem = function(light_owner) {
      if(this._simpleLightFilter && light_owner) {
        $gameSystem._lightProp.positionX = (light_owner.screenX() / Graphics.boxWidth) - 0.5;
        $gameSystem._lightProp.positionY = 1.0 - (light_owner.screenY() / Graphics.boxHeight) - 0.5;
        $gameSystem._lightProp.positionZ = 1.0;

        switch(light_owner.direction()) {
          case 2:
            $gameSystem._lightProp.angle = (Math.PI / 180.0) * (45.0);
            break;
          case 4:
            $gameSystem._lightProp.angle = (Math.PI / 180.0) * (-45.0);
            break;
          case 6:
            $gameSystem._lightProp.angle =  (Math.PI / 180.0) * (0.0);
            break;
          case 8:
            $gameSystem._lightProp.angle = (Math.PI / 180.0) * (135.0);
            break;
        }

      }
    };

    LightSprite.prototype.updateProperty = function () {
        this.setValue('positionX');
        this.setValue('positionY');
        this.setValue('positionZ');
        this.setValue('brightness');
        this.setValue('tight');
        this.setValue('offset');
        this.setValue('angle');
        this.setValue('v_tone');
    };

    Object.defineProperty(LightSprite.prototype, 'light', {
       get: function() {
           return this._light;
       },
       set: function(value) {
           this._light = value;
           if(this._light) {
             if(!this._simpleLightFilter) {
               this._simpleLightFilter = new PIXI.SimpleLightFilter();
               this._simpleLightFilter.padding = Graphics.boxHeight || 624;
             }
             this.filters = [this._simpleLightFilter];
           } else {
             // if you are not set, it will happen the error.
             this.filters = [new PIXI.filters.VoidFilter()];
           }
       }
    });

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
        this._spriteLight = null;
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
        if(!this._spriteLight) {
         this._spriteLight = new LightSprite();
         this._spriteLight.origin = new Point();
         this._spriteLight.texture = this._renderTexture;
         // Bind Filter
         this._spriteLight.light = false;
        }

        var tw = $gameMap.tileWidth();
        var th = $gameMap.tileHeight();

        this._spriteLight.origin.x = $gameMap.displayX() * tw;
        this._spriteLight.origin.y = $gameMap.displayY() * th;

        var ox = Math.floor(this._spriteLight.origin.x);
        var oy = Math.floor(this._spriteLight.origin.y);
        var startX = Math.floor((ox - 20) / tw);
        var startY = Math.floor((oy - 20) / th);

        // Update Sprite
        this._spriteLight.texture = this._renderTexture;
        this._spriteLight.x = startX * tw - ox;
        this._spriteLight.y = startY * th - oy;
        this._spriteLight.scale.x = 1.0;
        this._spriteLight.scale.y = 1.0;
        this._spriteLight.anchor.x = (this._spriteLight.x) / this._frameWidth;
        this._spriteLight.anchor.y = (this._spriteLight.y) /  this._frameHeight;

        // Update Filter
        if($gameSystem && $gameSystem.enabledLight()) {
          this._spriteLight.light = $gameSystem.enabledLight();
        }

        if(this._spriteLight.light) {
          this._spriteLight.updateLight();
        }

        renderer.render(this._spriteLight);

    };

    //----------------------------------------------------------------------------
    // Game_System
    //
    //

    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
      alias_Game_System_initialize.call(this);
      this.initLightProperty();
    };

    Game_System.prototype.initLightProperty = function () {
      this._lightProp = {
        'light': false,
        'positionX': 1.0,
        'positionY': 1.0,
        'positionZ': 1.0,
        'brightness': 1.0,
        'tight': 8.0,
        'offset': {x: 0.5, y: 0.5},
        'angle': 5.0,
        'v_tone': {x: 1.0, y: 1.0, z: 1.0}
      };
    };

    Game_System.prototype.setLightProperty = function (name, value) {
      if(this._lightProp) {
        this._lightProp[name] = value;
        return this._lightProp[name];
      }
      return 0.0;
    };

    Game_System.prototype.enabledLight = function () {
      return this._lightProp['light'];
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    //

    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "RS_SimpleLight") {
          switch(args[0]) {
            case 'Enable':
              $gameSystem.setLightProperty('light', true);
              break;
            case 'Disable':
              $gameSystem.setLightProperty('light', false);
              break;
            case 'Offset':
              $gameSystem.setLightProperty('offset', {x: Number(args[1]), y: Number(args[2])});
              break;
            case 'Brightness':
              $gameSystem.setLightProperty('brightness', Number(args[1]));
              break;
            case 'Tight':
              $gameSystem.setLightProperty('tight', Number(args[1]));
              break;
            case 'Tone':
              $gameSystem.setLightProperty('v_tone',  {x: Number(args[1]), y: Number(args[2]), z: Number(args[3])} );
              break;
          }
        }
    };


})(PIXI.tilemap);
