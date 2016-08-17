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

      'varying vec2 vTextureCoord;',

      'varying float vTextureId;',

      'varying vec4 vFrame;',

      'void main(void){',

         'gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',

         'vec2 anim = aAnim * animationFrame;',

         'vTextureCoord = aTextureCoord + anim;',

         'vFrame = aFrame + vec4(anim, anim);',

         'vTextureId = aTextureId;',

      '}'

      ].join('\n');

      var fragmentSrc = gShaderGenerator.generateFragmentSrc(maxTextures,  [
        '#define GLSLIFY 1',
        'varying vec2 vTextureCoord;',

        'varying vec4 vFrame;',

        'varying float vTextureId;',

        'uniform vec4 shadowColor;',

        'uniform sampler2D uSamplers[%count%];',

        'uniform vec2 uSamplerSize[%count%];',

        'void main(void) {',

        'vec2 textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);',

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

        'varying vec2 vTextureCoord;',

        'varying float vSize;',

        'varying float vTextureId;',

        'void main(void){',

           'gl_Position = vec4((projectionMatrix * vec3(aVertexPosition + aSize * 0.5, 1.0)).xy, 0.0, 1.0);',

          ' gl_PointSize = aSize * projectionScale;',

           'vTextureCoord = aTextureCoord + aAnim * animationFrame;',

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

              'uniform vec4 shadowColor;',

              'uniform sampler2D uSamplers[%count%];',

              'uniform vec2 uSamplerSize[%count%];',

              'uniform vec2 pointScale;',

              'void main(void){',

                'float margin = 1.0/vSize;',

                'vec2 clamped = vec2(clamp(gl_PointCoord.x, margin, 1.0 - margin), clamp(gl_PointCoord.y, margin, 1.0 - margin));',
                'vec2 textureCoord = ((clamped-0.5) * pointScale + 0.5) * vSize + vTextureCoord;',

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


    PIXI.tilemap.TileRenderer.prototype.initBounds = function () {
        var gl = this.renderer.gl;
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = 2048;
        tempCanvas.height = 2048;
        // tempCanvas.getContext('2d').clearRect(0, 0, 2048, 2048);
        for (var i = 0; i < this.maxTextures; i++) {
            var glt = new PIXI.glCore.GLTexture(gl, 2048, 2048);
            glt.premultiplyAlpha = true;
            glt.upload(tempCanvas);
            glt.enableWrapClamp();

            if (PIXI.tilemap.TileRenderer.SCALE_MODE === PIXI.SCALE_MODES.LINEAR) {
                glt.enableLinearScaling();
            } else {
                glt.enableNearestScaling();
            }

            this.glTextures.push(glt);
            var bs = [];
            for (var j = 0; j < 4; j++) {
                var spr = new PIXI.Sprite();
                spr.position.x = 1024 * (j & 1);
                spr.position.y = 1024 * (j >> 1);
                bs.push(spr);
            }
            this.boundSprites.push(bs);
        }
    };

    //----------------------------------------------------------------------------
    // PIXI.tilemap.CompositeRectTileLayer
    //
    //

    PIXI.tilemap.RectTileLayer.prototype.renderWebGL = function(renderer, useSquare) {

        var points = this.pointsBuf;
        if (points.length === 0) return;
        var rectsCount = points.length / 9;
        var tile = renderer.plugins.tile;
        var gl = renderer.gl;
        if (!useSquare) {
            tile.checkIndexBuffer(rectsCount);
        }

        var shader = tile.getShader(useSquare);
        var textures = this.textures;
        if (textures.length === 0) return;
        var len = textures.length;
        if (this._tempTexSize < shader.maxTextures) {
            this._tempTexSize = shader.maxTextures;
            this._tempSize = new Float32Array(2*shader.maxTextures);
        }
        // var samplerSize = this._tempSize;
        for (var i=0;i<len;i++) {
            if (!textures[i] || !textures[i].valid) return;
            var texture = textures[i].baseTexture;
            // samplerSize[i * 2] = 1.0 / texture.width;
            // samplerSize[i * 2 + 1] = 1.0 / texture.height;
        }
        tile.bindTextures(renderer, textures);
        // shader.uniforms.uSamplerSize = samplerSize;
        //lost context! recover!
        var vb = tile.getVb(this.vbId);
        if (!vb) {
            vb = tile.createVb(useSquare);
            this.vbId = vb.id;
            this.vbBuffer = null;
            this.modificationMarker = 0;
        }

        // SimpleLight Properties


        var vao = vb.vao.bind();
        vb = vb.vb;
        //if layer was changed, re-upload vertices
        vb.bind();
        var vertices = rectsCount * shader.vertPerQuad;
        if (vertices === 0) return;
        if (this.modificationMarker != vertices) {
            this.modificationMarker = vertices;
            var vs = shader.stride * vertices;
            if (!this.vbBuffer || this.vbBuffer.byteLength < vs) {
                //!@#$ happens, need resize
                var bk = shader.stride;
                while (bk < vs) {
                    bk *= 2;
                }
                this.vbBuffer = new ArrayBuffer(bk);
                this.vbArray = new Float32Array(this.vbBuffer);
                this.vbInts = new Uint32Array(this.vbBuffer);
                vb.upload(this.vbBuffer, 0, true);
            }

            var arr = this.vbArray, ints = this.vbInts;
            //upload vertices!
            var sz = 0;
            //var tint = 0xffffffff;
            var textureId, shiftU, shiftV;
            if (useSquare) {
                for (i = 0; i < points.length; i += 9) {
                    textureId = (points[i+8] >> 2);
                    shiftU = 1024 * (points[i+8] & 1);
                    shiftV = 1024 * ((points[i+8] >> 1) & 1);
                    arr[sz++] = points[i + 2];
                    arr[sz++] = points[i + 3];
                    arr[sz++] = points[i + 0] + shiftU;
                    arr[sz++] = points[i + 1] + shiftV;
                    arr[sz++] = points[i + 4];
                    arr[sz++] = points[i + 6];
                    arr[sz++] = points[i + 7];
                    arr[sz++] = textureId;
                }
            } else {
                //var tint = 0xffffffff;
                var tint = -1;
                for (i = 0;i<points.length;i += 9) {
                    var eps = 0.5;

                    textureId = (points[i+8] >> 2);
                    shiftU = 1024 * (points[i+8] & 1);
                    shiftV = 1024 * ((points[i+8] >> 1) & 1);

                    var x = points[i+2], y = points[i+3];

                    var w = points[i+4], h = points[i+5];

                    var u = points[i] + shiftU, v = points[i+1] + shiftV;

                    var animX = points[i+6], animY = points[i+7];

                    arr[sz++] = x;
                    arr[sz++] = y;
                    arr[sz++] = u;
                    arr[sz++] = v;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                    arr[sz++] = x + w;
                    arr[sz++] = y;
                    arr[sz++] = u + w;
                    arr[sz++] = v;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                    arr[sz++] = x + w;
                    arr[sz++] = y + h;
                    arr[sz++] = u + w;
                    arr[sz++] = v + h;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                    arr[sz++] = x;
                    arr[sz++] = y + h;
                    arr[sz++] = u;
                    arr[sz++] = v + h;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                }
            }

            // if (vs > this.vbArray.length/2 ) {
            vb.upload(arr, 0, true);
            // } else {
            //     var view = arr.subarray(0, vs);
            //     vb.upload(view, 0);
            // }
        }

        if (useSquare)
            gl.drawArrays(gl.POINTS, 0, vertices);
        else
            gl.drawElements(gl.TRIANGLES, rectsCount * 6, gl.UNSIGNED_SHORT, 0);
    };

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
