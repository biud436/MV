//================================================================
// RS_WaveFilter.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target mv
 * @plugindesc This plugin applies the wave effect to the all objects by using the Fragment Shader.
 * @author biud436
 * @url http://biud436.tistory.com
 *
 * @help
 *
 * =============================================================================
 * Sprite
 * =============================================================================
 * The following properties applies the wave effect to Sprite.
 * For Information, Refer to http://biud436.tistory.com/17
 *
 *    - wave : The default value is false.
 *    - wave_amp : The default value is to 0.05
 *    - wave_length : The default value is to a maxHeight (deprecated)
 *    - wave_speed : The default value is to 0.25
 *    - wave_phase : The default value is to 360
 *
 * =============================================================================
 * Picture
 * =============================================================================
 * This plugin command would activate the wave effect to your picture:
 *
 *    PictureWave Start picture_id wave_speed wave_amp
 *      - picture_id : Specify the id of the game picture.
 *      - wave_speed : The available value is the number between 0 and 1.
 *                    (The default value is to 0.25)
 *      - wave_amp : The available value is the number between 0 and 1.
 *                   (The default value is to 0.05)
 *
 * This plugin command would deactivate the wave effect of your picture:
 *
 *    PictureWave Stop picture_id
 *      - picture_id : Specify the id of the game picture.
 *
 * =============================================================================
 * Tilemap
 * =============================================================================
 *
 * The following plugin commands applies the wave effect to Tilemap.
 * This plugin contains these six types the plugin commands.
 *
 * These plugin commands allow you to enable or disable the wave effect
 *
 *    TilemapWave Enable
 *    TilemapWave Disable
 *
 * This plugin command allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 2.
 * Default value is to 2.0. But the fragment shader does not use this value.
 *
 *    TilemapWave waveSpeed x
 *
 * This plugin command allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.02
 *
 *    TilemapWave waveFrequency x
 *
 * This plugin command allows you to set the UV speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.25
 *
 *    TilemapWave UVSpeed x
 *
 * =============================================================================
 * Event Notetags
 * =============================================================================
 *
 * Notetags :
 *
 * These note tags allow you to enable or disable the wave effect.
 *    <WAVE true>
 *    <WAVE false>
 *
 * This note tag allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * the default value is to 0.02
 *
 *    <WAVE_AMP x>
 *
 * This note tag allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * the default value is to 0.25
 *
 *    <WAVE_SPEED x>
 *
 * =============================================================================
 * Battle Notetags
 * =============================================================================
 *
 * These note tags allow you to set the wave effect.
 * You have to put the note tags in the note area of the map properties.
 *
 *    <BATTLEBACK_WAVE : x y>
 *
 *    These values must replace by a real value such as 0.02
 *    - x : the x value is the same as a waveFrequency.
 *    - y : the y value is the same as a waveSpeed.
 *
 *    For Example :
 *    <BATTLEBACK_WAVE : 0.02 0.25>
 *
 * When using Yanfly's Action Sequence Pack 1, you can enable its filter too.
 * This function has the pointer of the Spriteset_Battle and easy to use.
 *
 *    eval: $gameTemp.setBattleBackWaveEffect(cond, waveAmp, waveSpeed);
 *      - cond : Specify true or false whether the wave effect is used.
 *      - waveAmp : the default value is to 0.02
 *      - waveSpeed : the default value is to 0.25
 *
 * =============================================================================
 * Timing
 * =============================================================================
 * if you want to fade-out or fade-in the properties of the wave effect applied to the picture,
 * Let's call the following function.
 *
 * waveUtils.quadraticBezier(start, median, end, dt);
 *
 * dt stands for delta time, The delta time parameter is the elapsed time since the last frame.
 * if you omit it, The wave filter will measure the elapsed time automatically
 * and fill it (In fact, It will be filled with the current time value)
 *
 * To get started with implementing this, add this code just using the script command.
 *
 * var _s, _p, _e, _r;
 * _s = new Point(0.0, 0.0);
 * _p = new Point(0.07, 0.25);
 * _e = new Point(0.0, 0.0);
 * _r = waveUtils.quadraticBezier(_s, _p, _e);
 * $gameScreen.startWave(1, _r.x, _r.y);
 *
 * The value of the wave speed is started with 0.0 and then increased until 0.07 and then decreased to 0.0.
 * The value of the wave amplitude is also started with 0.0 and then increased until 0.25 and then decreased to 0.0.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
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
 * 2016.11.26 (v1.5.4) - Added certain code to remove the texture from memory.
 * 2016.11.30 (v1.5.5) - Fixed the issue that has the black border in a filter area.
 * 2017.12.10 (v1.5.6) - Added the plugin command called 'PictureWave' (it is tested on 1.6.0 beta version)
 * 2018.04.12 (v1.5.7) - Fixed a cutting issue.
 * 2018.04.13 (v1.5.7c) - Added the event note tags that can have the wave effect directly for an event graphic.
 * 2018.04.15 (v1.5.7e) - Added a new feature that can apply the wave filter in the battle background images
 * 2018.04.25 (v1.5.7f) - Fixed the note tag error in Battle Test.
 * 2018.05.09 (v1.5.8) - Fixed the bug that is not working the wave filter for the battleback image.
 * 2018.11.01 (v1.5.9) :
 * - Fixed the issue that the wave filter is not working in the game picture.
 * - Fixed the issue that the wave effect do a horizontal looping likes as Tiling Sprite.
 * 2018.11.29 (v1.5.10) :
 * - Fixed the bug that causes an error when calling Erase Event event command.
 * 2019.02.24 (v1.5.11) :
 * - Fixed an issue that is not loaded a save file that you saved before using this script.
 * 2020.08.03 (v1.6.0) :
 * - Performance optimization.
 * 2021.10.27 (v1.6.1) :
 * - added the warning message when the certain game picture is not displayed.
 * =============================================================================
 * Terms of Use
 * =============================================================================
 * Free for commercial and non-commercial use
 *
 */
/*:ko
 * @target mv
 * @plugindesc 셰이더로 맵이나 특정 그림에 웨이브 효과를 만듭니다.
 * @author 러닝은빛(biud436)
 * @url https://blog.naver.com/biud436
 *
 * @help
 * 이 플러그인은 GLSL를 이용하여 삼각함수로 간단한 파동 효과를 만들어냅니다.
 * 렌더링 파이프라인에 따라 모든 픽셀은 기본 적인 프레그먼트 셰이더를 거칩니다.
 * 파동 효과가 ON 상태이면, 파동 효과에 대한 셰이더도 같이 거칩니다.
 * 크로미움 기반 브라우저에서는 ANGLE 라이브러리를 통해 GLSL에서 HLSL로 변경됩니다.
 *
 * =============================================================================
 * 스프라이트(Sprite)에 웨이브 효과 만들기
 * =============================================================================
 *
 * 스프라이트 생성 후 바로 웨이브 속성에 접근하여 파동 효과를 만들 수 있습니다.
 *
 * 자바스크립트는 카멜 표기법(Camel Case)를 사용하지만,
 *
 * 속성 명은 RPG Maker VX Ace와 동일하게 스네이크 표기법(Snake Case)을 따릅니다.
 *
 * 다룰 수 있는 속성은 다음과 같습니다.
 *
 *    - wave : 기본 값은 false 입니다.
 *    - wave_amp : 기본 값은 0.05 입니다.
 *    - wave_length : 기본 값은 비트맵의 최대 높이 값입니다. (폐지됨)
 *    - wave_speed : 기본 값은 0.25
 *    - wave_phase : 기본 값은 360 입니다.
 *
 * 스네이크 표기법(Snake Case)을 따르는 이유는,
 *
 * 처음부터 그렇게 만들었기 때문입니다. 갑자기 변경하면 혼란스러울 수 있으니까요.
 *
 * =============================================================================
 * 그림에 웨이브 효과 만들기
 * =============================================================================
 *
 * 그림 이미지에 웨이브 효과를 만드려면 플러그인 명령을 사용하면 됩니다.
 *
 * 웨이브 효과를 활성화하고, 제거하는 두 가지 명령이 있습니다.
 *
 *    PictureWave Start picture_id wave_speed wave_amp
 *      - picture_id : 그림의 ID 값 (숫자입니다)
 *      - wave_speed : 사용할 수 있는 값은 0 ~ 1 사이의 부동소수점 실수값입니다.
 *                    (기본 값은 0.25 입니다)
 *      - wave_amp : 사용할 수 있는 값은 0 ~ 1 사이의 부동소수점 실수값입니다.
 *                   (기본 값은 0.25 입니다)
 *
 * 다음 명령은 웨이브 효과를 제거합니다.
 *
 *    PictureWave Stop picture_id
 *      - picture_id : 그림의 ID 값 (숫자입니다)
 *
 * =============================================================================
 * 맵에 웨이브 효과 주기
 * =============================================================================
 *
 * 맵에 웨이브 효과를 주려면 타일맵 웨이브 명령을 사용하면 됩니다.
 *
 * 아래는 웨이브 효과를 활성화하고 비활성화하는 명령입니다.
 *
 *    TilemapWave Enable
 *    TilemapWave Disable
 *
 * 웨이브 효과의 속도를 조절하는 명령입니다.
 * x는 부동 소수점 실수로 0에서 2 사이의 값입니다.
 * 기본 값은 2.0 입니다만, 셰이더에선 이 값이 사용되지 않습니다.
 *
 *    TilemapWave waveSpeed x
 *
 * 이 명령은 파동의 진폭을 설정하는 명령입니다.
 * x는 부동 소수점 실수로 0에서 1 사이의 값입니다.
 * 기본 값은 0.02입니다.
 *
 *    TilemapWave waveFrequency x
 *
 * 다음 명령은 텍스쳐(Texture)의 UV 속도를 설정할 수 있는 명령입니다.
 * UV라는 텍스쳐 내부의 좌표로 0과 1사이의 부동 소수점 실수 값을 가집니다.
 * 기본 값은 0.25 입니다. 0.25는 1/4 속도입니다.
 *
 *    TilemapWave UVSpeed x
 *
 * =============================================================================
 * 이벤트 노트 태그
 * =============================================================================
 *
 * 이벤트에 웨이브 효과를 주려면 노트 태그를 사용하면 됩니다.
 * 메모(Comment) 커맨드에서 사용할 수 있습니다.
 *
 * 노트 태그 :
 *
 * 웨이브 효과를 활성화하고 비활성화하는 노트 태그입니다.
 *    <WAVE true>
 *    <WAVE false>
 *
 * 이 노트 태그는 파동의 진폭을 설정하는 명령입니다.
 * x는 부동 소수점 실수로 0에서 1 사이의 값입니다.
 * 기본 값은 0.02입니다.
 *
 *    <WAVE_AMP x>
 *
 * 다음 노트 태그는 텍스쳐(Texture)의 UV 속도를 설정할 수 있는 명령입니다.
 * UV라는 텍스쳐 내부의 좌표로 0과 1사이의 부동 소수점 실수 값을 가집니다.
 * 기본 값은 0.25 입니다. 0.25는 1/4 속도입니다.
 *
 *    <WAVE_SPEED x>
 *
 * =============================================================================
 * 전투 노트 태그
 * =============================================================================
 *
 * 다음 노트 태그들은 맵 속성의 메모 란에 설정할 수 있습니다.
 *
 * 전투 원경에 웨이브 효과를 주려면 다음 노트 태그를 사용하세요.
 *
 *    <BATTLEBACK_WAVE : x y>
 *
 *    - x : x는 웨이브 효과의 진폭 값입니다. (0.02가 기본 값입니다)
 *    - y : y는 웨이브 효과의 UV 속도 값입니다. (0.25가 기본 값입니다)
 *
 *    For Example :
 *    <BATTLEBACK_WAVE : 0.02 0.25>
 *
 * Yanfly님의 액션 시퀀스 팩 1(Action Sequence Pack 1)을 사용하고 있으시다면
 * 다음 명령을 사용할 수 있습니다 (모든 오브젝트에 웨이브 효과를 줍니다!)
 *
 *    eval: $gameTemp.setBattleBackWaveEffect(cond, waveAmp, waveSpeed);
 *      - cond : 웨이브 효과 활성화 여부. true 또는 false를 입력하세요.
 *      - waveAmp : 진폭. 기본 값은 0.02입니다.
 *      - waveSpeed : UV 속도. 기본 값은 0.25입니다.
 *
 * =============================================================================
 * 스크립트 사용법
 * =============================================================================
 * 그림에 적용되는 웨이브 효과의 속성을 Fade-Out이나 Fade-In하고 싶다면 다음과 같이 하시면
 * 됩니다.
 *
 * waveUtils.quadraticBezier(시작, 중간, 끝, 시간);
 *
 * 시간 값을 생략하면 매 프레임 값이 바뀌게 되며 자세한 예제는 다음과 같습니다.
 *
 * var _s, _p, _e, _r;
 * _s = new Point(0.0, 0.0);
 * _p = new Point(0.07, 0.25);
 * _e = new Point(0.0, 0.0);
 * _r = waveUtils.quadraticBezier(_s, _p, _e);
 * $gameScreen.startWave(1, _r.x, _r.y);
 *
 * 이렇게 하게 되면,
 * 웨이브 속도는 0.0에서 시작했다가 0.07을 찍고 다시 0.0으로 되돌아오며,
 * 웨이브의 진폭은 0.0에서 시작해서 0.25를 찍고 0.0으로 되돌아옵니다.
 *
 * =============================================================================
 * 변동 사항
 * =============================================================================
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
 * 2016.11.26 (v1.5.4) - Added certain code to remove the texture from memory.
 * 2016.11.30 (v1.5.5) - Fixed the issue that has the black border in a filter area.
 * 2017.12.10 (v1.5.6) - Added the plugin command called 'PictureWave' (it is tested on 1.6.0 beta version)
 * 2018.04.12 (v1.5.7) - Fixed a cutting issue.
 * 2018.04.13 (v1.5.7c) - Added the event note tags that can have the wave effect directly for an event graphic.
 * 2018.04.15 (v1.5.7e) - Added a new feature that can apply the wave filter in the battle background images
 * 2018.04.25 (v1.5.7f) - Fixed the note tag error in Battle Test.
 * 2018.05.09 (v1.5.8) - Fixed the bug that is not working the wave filter for the battleback image.
 * 2018.11.01 (v1.5.9) :
 * - Fixed the issue that the wave filter is not working in the game picture.
 * - Fixed the issue that the wave effect do a horizontal looping likes as Tiling Sprite.
 * 2018.11.29 (v1.5.10) :
 * - Fixed the bug that causes an error when calling Erase Event event command.
 * 2019.02.24 (v1.5.11) :
 * - Fixed an issue that is not loaded a save file that you saved before using this script.
 * 2020.08.03 (v1.6.0) :
 * - Performance optimization.
 * 2021.10.27 (v1.6.1) :
 * - added the warning message when the certain game picture is not displayed.
 * =============================================================================
 * Terms of Use
 * =============================================================================
 * Free for commercial and non-commercial use
 *
 */

var Imported = Imported || {};
Imported.RS_WaveFilter = true;

var RS = RS || {};
RS.WaveConfig = RS.WaveConfig || {};

(function () {
  "use strict";

  const isFilterPIXI4 =
    PIXI.VERSION >= "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0";
  if (!isFilterPIXI4) {
    console.error("This version does not work on your project");
    console.error(
      "Please download the compatible version from the following link : "
    );
    console.error("https://github.com/biud436/MV/raw/MV/RS_WaveFilter.js");
    return;
  }
  const isWebGL = PIXI.utils.isWebGLSupported();
  const isUseCanvas = Utils.isOptionValid("canvas");
  if (isUseCanvas || !isWebGL) {
    console.error("This plugin does not support in your project");
    return;
  }

  if (PIXI.VERSION >= "5.2.4") {
    PIXI.filters.VoidFilter = PIXI.filters.AlphaFilter;
  }

  //----------------------------------------------------------------------------
  // PIXI.WaveFilter
  //
  //

  PIXI.WaveFilter = function () {
    const vertexSrc = [
      "attribute vec2 aVertexPosition;",
      "attribute vec2 aTextureCoord;",

      "uniform mat3 projectionMatrix;",

      "varying vec2 vTextureCoord;",

      "void main(void){",
      "    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);",
      "    vTextureCoord = aTextureCoord;",
      "}",
    ].join("\n");

    const fragmentSrc = [
      "precision mediump float;",

      "varying vec2 vTextureCoord;",

      "uniform float waveHeight;",
      "uniform float waveFrequency;",
      "uniform float waveTime;",
      "uniform float wavePhase;",
      "uniform float UVSpeed;",

      "uniform vec4 filterArea;",
      "uniform vec4 filterClamp;",
      "uniform vec2 origin;",

      "uniform sampler2D uSampler;",

      "void main(void) {",
      "   float time = waveFrequency * sin( wavePhase * (waveTime - vTextureCoord.y / (waveHeight / filterArea.y)) );",
      "   vec2 vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);",
      "   gl_FragColor = texture2D(uSampler, clamp(vCoord, filterClamp.xy, filterClamp.zw));",
      "}",
    ].join("\n");

    PIXI.Filter.call(this, vertexSrc, fragmentSrc);

    this.padding = 0;

    this.uniforms.waveHeight = 0.5;
    this.uniforms.waveFrequency = 0.02;
    this.uniforms.waveTime = 0.0;
    this.uniforms.UVSpeed = 0.25;
    this.uniforms.origin = new PIXI.Point(0, 0);
    this.uniforms.wavePhase = 3.141592653589793 * 2;

    this.enabled = true;
    this.resolution = 1;
  };

  PIXI.WaveFilter.prototype = Object.create(PIXI.Filter.prototype);
  PIXI.WaveFilter.prototype.constructor = PIXI.WaveFilter;

  PIXI.WaveFilter.prototype.apply = function (
    filterManager,
    input,
    output,
    clear
  ) {
    this.uniforms.waveHeight = input.sourceFrame.height / 4;

    filterManager.applyFilter(this, input, output, clear);
  };

  Object.defineProperties(PIXI.WaveFilter.prototype, {
    waveHeight: {
      get: function () {
        return this.uniforms.waveHeight;
      },
      set: function (value) {
        this.uniforms.waveHeight = value;
      },
    },
    waveSpeed: {
      get: function () {
        return this.uniforms.UVSpeed;
      },
      set: function (value) {
        this.uniforms.UVSpeed = value;
      },
    },
    waveFrequency: {
      get: function () {
        return this.uniforms.waveFrequency;
      },
      set: function (value) {
        this.uniforms.waveFrequency = value;
      },
    },
    UVSpeed: {
      get: function () {
        return this.uniforms.UVSpeed;
      },
      set: function (value) {
        this.uniforms.UVSpeed = value;
      },
    },
    waveTime: {
      get: function () {
        return this.uniforms.waveTime;
      },
      set: function (value) {
        this.uniforms.waveTime = value;
      },
    },
    wavePhase: {
      get: function () {
        return this.uniforms.wavePhase;
      },
      set: function (value) {
        this.uniforms.wavePhase = (Math.PI / 180) * Number(value);
      },
    },
    origin: {
      get: function () {
        return this.uniforms.origin;
      },
      set: function (value) {
        this.uniforms.origin = value;
      },
    },
  });

  //============================================================================
  // Sprite
  //============================================================================

  const alias_Sprite_initialize = Sprite.prototype.initialize;
  Sprite.prototype.initialize = function (bitmap) {
    alias_Sprite_initialize.call(this, bitmap);
    this.initWithWaveFeatures();
  };

  Sprite.prototype.initWithWaveFeatures = function () {
    this._waveTime = 0;
    this._waveHeight = 0.5;
    this._waveSpeed = 0.25;
    this._waveFrequency = 0.02;
    this._wavePhase = 360;
    this._waveFilter = null;
    this._wave = false;
    this._isWaveDirty = false;
  };

  const alias_Sprite_update = Sprite.prototype.update;
  Sprite.prototype.update = function () {
    alias_Sprite_update.call(this);
    this.waveUpdate();
  };

  Sprite.prototype.getWaveFrameTime = function () {
    this._waveTime = (Date.now() % 10000) / 10000;
    return this._waveTime;
  };

  Sprite.prototype.setWaveHeight = function (n) {
    this._waveHeight = this.height;
  };

  Sprite.prototype.getWaveHeight = function () {
    return this._waveHeight;
  };

  Sprite.prototype.waveUpdate = function () {
    if (this._wave) {
      this._waveFilter.waveTime = this.getWaveFrameTime();
      this._waveFilter.waveHeight = this.getWaveHeight();
      this._waveFilter.waveSpeed = this._waveSpeed;
      this._waveFilter.waveFrequency = this._waveFrequency;
      this._waveFilter.wavePhase = this._wavePhase;
      this._waveFilter.origin.x = $gameMap.canvasToMapX(this.x);
      this._waveFilter.origin.y = $gameMap.canvasToMapY(this.y);
    }
  };

  Object.defineProperty(Sprite.prototype, "waveSpeed", {
    get: function () {
      return this._waveSpeed;
    },
    set: function (value) {
      this._waveSpeed = value;
    },
  });

  Object.defineProperty(Sprite.prototype, "waveFrequency", {
    get: function () {
      return this._waveFrequency;
    },
    set: function (value) {
      this._waveFrequency = value;
    },
  });

  Object.defineProperty(Sprite.prototype, "wave_amp", {
    get: function () {
      return this._waveFrequency;
    },
    set: function (value) {
      this._waveFrequency = value;
    },
  });

  Object.defineProperty(Sprite.prototype, "wave_length", {
    get: function () {
      return this._waveHeight;
    },
    set: function (value) {
      this.setWaveHeight(value);
    },
  });

  Object.defineProperty(Sprite.prototype, "wave_speed", {
    get: function () {
      return this._waveSpeed;
    },
    set: function (value) {
      this._waveSpeed = value;
    },
  });

  Object.defineProperty(Sprite.prototype, "wave_phase", {
    get: function () {
      return this._wavePhase;
    },
    set: function (value) {
      this._wavePhase = value;
    },
  });

  Object.defineProperty(Sprite.prototype, "wave", {
    get: function () {
      return this._wave;
    },
    set: function (value) {
      this._wave = value;
      this._isWaveDirty = true;

      if (this._wave) {
        if (!this._waveFilter) {
          this._waveFilter = new PIXI.WaveFilter();
        }
        this.filterArea = new PIXI.Rectangle(
          0,
          0,
          Graphics.boxWidth,
          Graphics.boxHeight
        );
        this.filters = [this._waveFilter];
      } else {
        this.filters = [Sprite.voidFilter];
      }
    },
    configurable: true,
  });

  //============================================================================
  // TilingSprite
  //============================================================================

  const alias_TilingSprite_initialize = TilingSprite.prototype.initialize;
  TilingSprite.prototype.initialize = function (bitmap) {
    alias_TilingSprite_initialize.call(this, bitmap);
    this.initWithWaveFeatures();
  };

  TilingSprite.prototype.initWithWaveFeatures = function () {
    this._waveTime = 0;
    this._waveHeight = 0.5;
    this._waveSpeed = 0.25;
    this._waveFrequency = 0.02;
    this._wavePhase = 360;
    this._waveFilter = null;
    this._wave = false;
  };

  const alias_TilingSprite_update = TilingSprite.prototype.update;
  TilingSprite.prototype.update = function () {
    alias_TilingSprite_update.call(this);
    this.waveUpdate();
  };

  TilingSprite.prototype.getWaveFrameTime = function () {
    this._waveTime = (Date.now() % 10000) / 10000;
    return this._waveTime;
  };

  TilingSprite.prototype.setWaveHeight = function (n) {
    this._waveHeight = this.height;
  };

  TilingSprite.prototype.getWaveHeight = function () {
    return this._waveHeight;
  };

  TilingSprite.prototype.waveUpdate = function () {
    if (this._wave) {
      this._waveFilter.waveTime = this.getWaveFrameTime();
      this._waveFilter.waveHeight = this.getWaveHeight();
      this._waveFilter.waveSpeed = this._waveSpeed;
      this._waveFilter.waveFrequency = this._waveFrequency;
      this._waveFilter.wavePhase = this._wavePhase;
    }
  };

  Object.defineProperty(TilingSprite.prototype, "waveSpeed", {
    get: function () {
      return this._waveSpeed;
    },
    set: function (value) {
      this._waveSpeed = value;
    },
  });

  Object.defineProperty(TilingSprite.prototype, "waveFrequency", {
    get: function () {
      return this._waveFrequency;
    },
    set: function (value) {
      this._waveFrequency = value;
    },
  });

  Object.defineProperty(TilingSprite.prototype, "wave_amp", {
    get: function () {
      return this._waveFrequency;
    },
    set: function (value) {
      this._waveFrequency = value;
    },
  });

  Object.defineProperty(TilingSprite.prototype, "wave_length", {
    get: function () {
      return this._waveHeight;
    },
    set: function (value) {
      this.setWaveHeight(value);
    },
  });

  Object.defineProperty(TilingSprite.prototype, "wave_speed", {
    get: function () {
      return this._waveSpeed;
    },
    set: function (value) {
      this._waveSpeed = value;
    },
  });

  Object.defineProperty(TilingSprite.prototype, "wave_phase", {
    get: function () {
      return this._wavePhase;
    },
    set: function (value) {
      this._wavePhase = value;
    },
  });

  Object.defineProperty(TilingSprite.prototype, "wave", {
    get: function () {
      return this._wave;
    },
    set: function (value) {
      this._wave = value;

      if (this._wave) {
        if (!this._waveFilter) {
          this._waveFilter = new PIXI.WaveFilter();
        }
        this.filterArea = new PIXI.Rectangle(
          0,
          0,
          Graphics.boxWidth,
          Graphics.boxHeight
        );
        this.filters = [this._waveFilter];
      } else {
        this.filters = [new PIXI.filters.VoidFilter()];
      }
    },
    configurable: true,
  });

  //============================================================================
  // Sprite_Picture
  //============================================================================

  Sprite_Picture.prototype.updateWave = function () {
    const picture = this.picture();
    const isValidWave = picture.wave();
    if (isValidWave !== this.wave) {
      this.wave = isValidWave;
    }
    this.wave_speed = picture.waveSpeed();
    this.wave_amp = picture.waveAmp();
  };

  const alias_Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function () {
    alias_Sprite_Picture_update.call(this);
    if (this.visible) {
      this.updateWave();
    }
  };

  //============================================================================
  // Spriteset_Map
  //============================================================================

  var alias_Spriteset_Map_createLowerLayer =
    Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    alias_Spriteset_Map_createLowerLayer.call(this);
    this.overwriteWaveProperty();
  };

  Spriteset_Map.prototype.overwriteWaveProperty = function () {
    if (!this._baseSprite) return false;
    const self = this;

    Object.defineProperty(this._baseSprite, "wave", {
      get: function () {
        return this._wave;
      },
      set: function (value) {
        this._wave = value;
        if (this._wave) {
          if (!this._waveFilter) this._waveFilter = new PIXI.WaveFilter();
          this.filters = [this._waveFilter, self._toneFilter];
        } else {
          this.filters = [self._toneFilter];
        }
      },
    });
  };

  const alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    alias_Spriteset_Map_update.call(this);
    this.updateWaveFilter();
  };

  Spriteset_Map.prototype.updateWaveFilter = function () {
    if ($gameSystem && $gameSystem.getWaveEnabled) {
      this._baseSprite.wave = $gameSystem.getWaveEnabled() || false;
      this._baseSprite.wave_amp = $gameSystem.getWaveFrequency() || 0.02;
      this._baseSprite.wave_phase = $gameSystem.getWavePhase() || 360;
      this._baseSprite.wave_speed = $gameSystem.getUVSpeed() || 0.25;
    }
  };

  //============================================================================
  // Spriteset_Battle
  //============================================================================

  var alias_Spriteset_Battle_createBattleback =
    Spriteset_Battle.prototype.createBattleback;
  Spriteset_Battle.prototype.createBattleback = function () {
    alias_Spriteset_Battle_createBattleback.call(this);
    this.initWithWaveEffect();
  };

  Spriteset_Battle.prototype.initWithWaveEffect = function () {
    if (!$dataMap) return;

    const note = $dataMap.note.split(/[\r\n]+/);

    note.forEach((mapNote) => {
      if ($dataMap.note.match(/<BATTLEBACK_WAVE[ ]:[ ]*(.*)[ ](.*)>/i)) {
        this._initWaveFilter = true;
        this.changeWaveEffect(true, RegExp.$1, RegExp.$2);
      }
    });
  };

  Spriteset_Battle.prototype.changeWaveEffect = function (cond, fre, spd) {
    if (!this._initWaveFilter) return;
    const backs = [this._back1Sprite, this._back2Sprite];
    backs.forEach((back) => {
      back.wave = cond;
      back.waveFrequency = parseFloat(fre) || 0.02;
      back.waveSpeed = parseFloat(spd) || 0.25;
    }, this);
  };

  //============================================================================
  // Game_Picture
  //============================================================================

  const alias_Game_Picture_initBasic = Game_Picture.prototype.initBasic;
  Game_Picture.prototype.initBasic = function () {
    alias_Game_Picture_initBasic.call(this);
    this._wave = false;
    this._waveSpeed = 0.25;
    this._waveAmp = 0.02;
  };

  Game_Picture.prototype.wave = function () {
    return this._wave;
  };

  Game_Picture.prototype.waveSpeed = function () {
    return this._waveSpeed;
  };

  Game_Picture.prototype.waveAmp = function () {
    return this._waveAmp;
  };

  Game_Picture.prototype.startWave = function (waveSpeed, waveAmp) {
    this._wave = true;
    this._waveSpeed = waveSpeed;
    this._waveAmp = waveAmp;
  };

  Game_Picture.prototype.stopWave = function () {
    this._wave = false;
  };

  //============================================================================
  // Game_Screen
  //============================================================================

  Game_Screen.prototype.startWave = function (pictureId, waveSpeed, waveAmp) {
    const picture = this.picture(pictureId);
    if (!picture) {
      console.info(
        `Cannot find the game picture ${pictureId}. Note that you can set the picture before starting the wave effect`
      );
      return;
    }
    picture.startWave(waveSpeed, waveAmp);
  };

  Game_Screen.prototype.stopWave = function (pictureId) {
    const picture = this.picture(pictureId);
    if (picture) {
      picture.stopWave();
    }
  };

  //============================================================================
  // Game_Temp
  //============================================================================

  /**
   * In Action Sequence Pack 1, you can use this function.
   * eval: $gameTemp.setBattleBackWaveEffect(cond, waveAmp, waveSpeed);
   */
  Game_Temp.prototype.setBattleBackWaveEffect = function (cond, fre, spd) {
    if (!$gameParty.inBattle()) return;
    const container = SceneManager._scene._spriteset;
    if (container) {
      container.changeWaveEffect(cond, fre, spd);
    }
  };

  //============================================================================
  // Game_System
  //============================================================================

  const alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    alias_Game_System_initialize.call(this);
    this.initWaveProperty();
  };

  Game_System.prototype.initWaveProperty = function () {
    this._waveProp = {
      wave: false,
      waveHeight: Graphics.boxHeight,
      waveFrequency: 0.02,
      waveTime: 0.0,
      UVSpeed: 0.25,
      wavePhase: 360,
    };
  };

  Game_System.prototype.setWaveProperty = function (name, value) {
    if (this._waveProp) {
      this._waveProp[name] = value;
      return this._waveProp[name];
    }
    return 0.0;
  };

  Game_System.prototype.getWaveEnabled = function () {
    if (!this._waveProp) this.initWaveProperty();
    return this._waveProp.wave;
  };

  Game_System.prototype.getWaveHeight = function () {
    if (!this._waveProp) this.initWaveProperty();
    return this._waveProp.waveHeight;
  };

  Game_System.prototype.getWaveFrequency = function () {
    if (!this._waveProp) this.initWaveProperty();
    return this._waveProp.waveFrequency;
  };

  Game_System.prototype.getWaveTime = function () {
    if (!this._waveProp) this.initWaveProperty();
    return this._waveProp.waveTime;
  };

  Game_System.prototype.getUVSpeed = function () {
    if (!this._waveProp) this.initWaveProperty();
    return this._waveProp.UVSpeed;
  };

  Game_System.prototype.getWavePhase = function () {
    if (!this._waveProp) this.initWaveProperty();
    return this._waveProp.wavePhase;
  };

  //============================================================================
  // Game_CharacterBase
  //============================================================================

  const alias_Game_CharacterBase_initMembers =
    Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function () {
    alias_Game_CharacterBase_initMembers.call(this);
    this._wave = false;
    this._waveFrequency = 0.02;
    this._waveSpeed = 0.25;
  };

  Game_CharacterBase.prototype.setWave = function (toggle) {
    this._wave = toggle;
  };

  Game_CharacterBase.prototype.setWaveFrequency = function (value) {
    this._waveFrequency = value;
  };

  Game_CharacterBase.prototype.setWaveSpeed = function (value) {
    this._waveSpeed = value;
  };

  Game_CharacterBase.prototype.wave = function () {
    return this._wave;
  };

  Game_CharacterBase.prototype.waveFrequency = function () {
    return this._waveFrequency || 0.02;
  };

  Game_CharacterBase.prototype.waveSpeed = function () {
    return this._waveSpeed || 0.25;
  };

  //============================================================================
  // Sprite_Character
  //============================================================================

  const alias_Sprite_Character_updatePosition =
    Sprite_Character.prototype.updatePosition;
  Sprite_Character.prototype.updatePosition = function () {
    alias_Sprite_Character_updatePosition.call(this);
    if (!this._character) return;
    if (!(this._character instanceof Game_Event)) return;
    const isValidWave = this._character.wave();
    if (this.wave !== isValidWave) this.wave = isValidWave;
    if (this.wave) {
      this.waveFrequency = this._character.waveFrequency();
      this.waveSpeed = this._character.waveSpeed();
    }
  };

  //============================================================================
  // Game_Map
  //============================================================================

  const alias_Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function () {
    alias_Game_Event_initMembers.call(this);
    this._lastPageIndex = -2;
  };

  Game_Event.prototype.updateWaveEffect = function () {
    if (this._pageIndex === this._lastPageIndex) return;
    if (!this.page()) return false;
    if (this.findProperPageIndex() < 0) return false;
    if (this._trigger > 3) return false;

    this.list().forEach((list) => {
      const code = list.code;
      const parameters = list.parameters;

      if ([108, 408].includes(code)) {
        if (parameters[0].match(/<(?:WAVE)[ ](.*)>/i)) {
          this.setWave(Boolean(RegExp.$1 == "true"));
        }
        if (parameters[0].match(/<(?:WAVE_AMP)[ ](.*)>/i)) {
          this.setWaveFrequency(parseFloat(RegExp.$1) || 0.02);
        }
        if (parameters[0].match(/<(?:WAVE_SPEED)[ ](.*)>/i)) {
          this.setWaveSpeed(parseFloat(RegExp.$1) || 0.25);
        }
      }
    });

    this._lastPageIndex = this._pageIndex;
  };

  const alias_Game_Event_refresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function () {
    alias_Game_Event_refresh.call(this);
    this.updateWaveEffect();
  };

  //============================================================================
  // Wave Utils
  //============================================================================

  window.waveUtils = {};

  /**
   * @example
    var _s, _e, _r;
    _s = new Point(0.0, 0.0);
    _e = new Point(0.07, 0.25);
    _r = waveUtils.mix(_s, _e);
    $gameScreen.startWave(1, _r.x, _r.y);
   */
  waveUtils.mix = function (vec1, vec2, t) {
    let vec = new Point(0, 0);
    if (!t) t = (Date.now() % 10000) / 10000;
    vec.x = vec1.x + t * (vec2.x - vec1.x);
    vec.y = vec1.x + t * (vec2.y - vec1.y);
    return vec;
  };

  /**
   * @example
    var _s, _p, _e, _r;
    _s = new Point(0.0, 0.0);
    _p = new Point(0.07, 0.25);
    _e = new Point(0.0, 0.0);
    _r = waveUtils.quadraticBezier(_s, _p, _e);
    $gameScreen.startWave(1, _r.x, _r.y);
   */
  waveUtils.quadraticBezier = function (vec1, vec2, vec3, t) {
    let d, e, p;
    if (!t) t = (Date.now() % 10000) / 10000;
    d = waveUtils.mix(vec1, vec2, t);
    e = waveUtils.mix(vec2, vec3, t);
    p = waveUtils.mix(d, e, t);
    return p;
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  const alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "Tilemap_Wave" || command === "TilemapWave") {
      switch (args[0]) {
        case "Enable":
          $gameSystem.setWaveProperty("wave", true);
          break;
        case "Disable":
          $gameSystem.setWaveProperty("wave", false);
          break;
        case "waveSpeed":
          $gameSystem.setWaveProperty("waveSpeed", Number(args[1]));
          break;
        case "waveFrequency":
          $gameSystem.setWaveProperty("waveFrequency", Number(args[1]));
          break;
        case "UVSpeed":
          $gameSystem.setWaveProperty("UVSpeed", Number(args[1]));
          break;
      }
    }
    if (command === "Picture_Wave" || command === "PictureWave") {
      switch (args[0].toLowerCase()) {
        case "start":
          $gameScreen.startWave(
            Number(args[1]),
            Number(args[2]),
            Number(args[3])
          );
          break;
        case "stop":
          $gameScreen.stopWave(Number(args[1]));
      }
    }
  };
})();
