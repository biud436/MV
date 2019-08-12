//================================================================
// RS_SimpleCanvasFilter.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin applies CSS filter to canvas
 * @author biud436
 * @help
 * Notice that this plugin applies filter effects to canvas element only.
 * 
 * =============================================================================
 * Plugin Command
 * =============================================================================
 * CanvasFilter Whole blur 5px
 * CanvasFilter Whole brightness 0.5
 * CanvasFilter Whole contrast 150%
 * CanvasFilter Whole dropShadow 16px 16px 20px gray
 * CanvasFilter Whole grayscale 50%
 * CanvasFilter Whole hueRotate 50deg
 * CanvasFilter Whole invert true
 * CanvasFilter Whole opacity 25%
 * CanvasFilter Whole saturate 30%
 * CanvasFilter Whole sepia 60%
 * CanvasFilter Whole setMultipleFlag true
 * CanvasFilter Whole setMultipleFlag false
 * CanvasFilter Whole clear
 * 
 * For more information, please see the link below : 
 * https://developer.mozilla.org/en-US/docs/Web/CSS/filter
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 * Graphics.setCanvasFilter(filterName, amount, isMultipleFilters, target);
 * Graphics.setCanvasDropShadowFilter(hShadow, hShadow, blur, color, isMultipleFilters, target));
 * Graphics.setCanvasInvert(activate, isMultipleFilters, target);
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.10.06 (v1.0.0) - First Release.
 * 2017.10.06 (v1.0.1) - Fixed the issue that could not set the number after the decimal point.
 */
/*:ko
 * @plugindesc 게임 캔버스에 CSS 필터를 적용하는 플러그인입니다.
 * @author 러닝은빛(biud436)
 * @help
 * 
 * <div> 같은 DOM 요소에 적용할 수 있으나, 
 * RPG Maker MV의 DOM 요소는 동영상이나 FPS 표시, 게임 캔버스 밖에 없으므로 
 * 게임 캔버스 자체에만 적용됩니다.
 * 
 * =============================================================================
 * 플러그인 명령에 대해...
 * =============================================================================
 * 
 * CanvasFilter Whole <효과명> <인자1, ...>
 * 
 * 자세한 CSS 필터에 대한 자세한 정보는
 * 
 * https://developer.mozilla.org/ko/docs/Web/CSS/filter
 * 
 * 위 링크를 참고 하시기 바랍니다. 위 정보를 바탕으로 제작되었기 때문입니다.
 * 
 * 흐리게 : 이미지에 가우시안 블러를 적용합니다. 픽셀 단위입니다.
 * CanvasFilter Whole blur 5px
 * 
 * 밝기 조절 : 값이 0이면 완전히 검은 색 이미지가 생성됩니다. 
 * 1.0 값은 이미지를 변경하지 않고, 
 * 1.0 이상의 수치를 사용하면 더 밝게 변합니다.
 * 본래는 퍼센트도 사용할 수 있지만 예제에 있는 것을 그대로 적용했기 때문에 실수만 사용 가능합니다.
 * CanvasFilter Whole brightness 0.5
 * 
 * 명도 조절 : <퍼센트>
 * 값이 0%면 검은색 이미지가 되고, 100%이면 이미지가 변하지 않습니다.
 * 100%가 넘는 값도 설정이 가능합니다.
 * CanvasFilter Whole contrast 150%
 * 
 * 그림자 : <offset-x> <offset-y> <blur-radius> <spread-radius> <color> 
 * CanvasFilter Whole dropShadow 16px 16px 20px gray
 * 
 * 그레이 스케일 : <퍼센트> 0%면 이미지가 변경되지 않습니다.
 * CanvasFilter Whole grayscale 50%
 * 
 * 채도 : 이미지에 색조를 적용합니다. 
 * 색상원의 각도(degree)를 변경합니다.
 * CanvasFilter Whole hueRotate 50deg
 * 
 * 색상 반전 : 
 * CanvasFilter Whole invert true
 * 
 * 투명도 조절 : <퍼센트> 100%면 투명도가 변경되지 않습니다.
 * CanvasFilter Whole opacity 25%
 * 
 * 색상 강조 : <퍼센트>, 100%면 이미지가 변경되지 않습니다.
 * CanvasFilter Whole saturate 30%
 * 
 * 세피아 효과 : <퍼센트> 0%면 값이 적용되지 않습니다.
 * CanvasFilter Whole sepia 60%
 * 
 * 다양한 효과를 적용하고 싶다면 다음 명령을 호출하십시오.
 * CanvasFilter Whole setMultipleFlag true
 * 
 * 효과를 단일로 적용하려면 다음 명령을 사용하십시오.
 * CanvasFilter Whole setMultipleFlag false
 * 
 * 모든 효과를 제거하려면 다음 명령을 사용하십시오.
 * CanvasFilter Whole clear
 *
 * =============================================================================
 * 스크립트 호출에 대해...
 * =============================================================================
 * 
 * Graphics.setCanvasFilter(filterName, amount, isMultipleFilters, target);
 * Graphics.setCanvasDropShadowFilter(hShadow, hShadow, blur, color, isMultipleFilters, target));
 * Graphics.setCanvasInvert(activate, isMultipleFilters, target);
 * 
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.10.06 (v1.0.0) - First Release.
 * 2017.10.06 (v1.0.1) - Fixed the issue that could not set the number after the decimal point.
 */

var Imported = Imported || {};
Imported.RS_SimpleCanvasFilter = true;

var RS = RS || {};

(function () {

  "use strict";

  var multipleFlag = false;

  RS.SimpleCanvasFilter = RS.SimpleCanvasFilter || {};

  //===========================================================================
  // Filter Settings
  //===========================================================================

  var canvasFilter = {
    'blur': "blur(%1px)",
    'brightness': "brightness(%1)",
    'contrast': "contrast(%1%)",
    'dropShadow': "drop-shadow(%1px %2px %3px %4)",
    'grayscale': "grayscale(%1%)",
    'hueRotate': "hue-rotate(%1deg)",
    'invert': "invert(%1%)",
    'opacity': "opacity(%1%)",
    'saturate': "saturate(%1%)",
    'sepia': "sepia(%1%)"
  };

  //============================================================================
  /**
  * To use a custom filter, you will should be enabling the css shader option.
  * But, it does not seem to support it in the latest Chrome (Chrome canary)
   * @class WaveFilterDecoder
   */
  //============================================================================
  class WaveFilterDecoder {
    static decodeUniformData(u1, u2, u3, u4) {
      let ver = this.getChromeVersion();
      let waveHeight = parseFloat(u1) || 0.5,
      waveFrequency = parseFloat(u2) || 0.02,
      waveTime = parseFloat(u3) || 0.0,
      UVSpeed = parseFloat(u4) || 0.25,
      wavePhase = 6.283185307179586,
      uniformBlocks = [];
      uniformBlocks.push(`waveHeight ${waveHeight}`);
      uniformBlocks.push(`waveFrequency ${waveFrequency}`);
      uniformBlocks.push(`waveTime ${waveTime}`);
      uniformBlocks.push(`UVSpeed ${UVSpeed}`);
      uniformBlocks.push(`wavePhase ${wavePhase}`);
      return uniformBlocks;
    }

    static getChromeVersion() {
      let ret = /Chrome\/(.{11,})(?=\s)/i.exec(navigator.userAgent);
      return parseInt(RegExp.$1.substr(0, 2));
    }

  }

  WaveFilterDecoder.waveVertexSrc = [
    'precision mediump float;',

    'attribute vec3 a_position;',
    'attribute vec2 a_texCoord;',

    'uniform mat4 u_projectionMatrix;',

    'varying vec2 v_texCoord;',

    'void main() {',
      'v_texCoord = a_texCoord;',
      'vec4 position = a_position;',
      'gl_Position = u_projectionMatrix * position;',
    '}    '
  ].join('\n');

  WaveFilterDecoder.waveFragmentSrc = [
    'precision mediump float;',

    'uniform float waveHeight;',
    'uniform float waveFrequency;',
    'uniform float waveTime;',
    'uniform float wavePhase;',
    'uniform float UVSpeed;',

    'varying vec2 v_texCoord;',

    'void main()',
    '{',
      'float time = waveFrequency * sin(wavePhase * (mod(waveTime - v_texCoord.y, waveHeight)));',
    	'vec2 vCoord = vec2(v_texCoord.x + time * UVSpeed, v_texCoord.y);',
    	'css_ColorMatrix = mat4(1.0, 0.0, 0.0, 0.0,',
    						 '0.0, 1.0, 0.0, 0.0,',
    						 '0.0, 0.0, 1.0, 0.0,',
    						 '0.0, 0.0, 0.0, 1.0);',
    	'css_MixColor = vec4(vCoord, 0.0, 0.0);',
    '}'
  ].join('\n');

  //===========================================================================
  // Private Functions
  //===========================================================================

  /**
   * @method calculateValue
   * @param {Array} args
   * @param {String} suffix
   */
  function calculateValue(args, suffix) {
    var value = args[1];
    var amount = 0;

    if(value.contains(suffix)) {
      amount = parseFloat( value ) || 0;
    } else {
      amount = Number(value);
    }

    return amount;
  }

  /**
   * @method singleFilter
   * @param {Canvas} target
   * @param {String} value
   */
  function singleFilter(target, value) {
    target.style.webkitFilter = value;
    target.style.filter = value;
  }

  /**
   * @method multipleFilter
   * @param {Canvas} target
   * @param {String} value
   */
  function multipleFilter(target, value) {
    if( target.style.webkitFilter || target.style.filter ) {
      if( !target.style.webkitFilter.contains(value) ) {
        target.style.webkitFilter = target.style.webkitFilter.concat(' ').concat(value);
        target.style.filter = target.style.webkitFilter.concat(' ').concat(value);
      }
    } else {
     singleFilter(target, value);
    }
  }

  function loadCustomFilter(target, vsPath, fsPath, uniformObject) {
    let ret = uniformObject.join(', ').trim();
    let customFilter = `custom(url(${vsPath}) url(${fsPath}), ${ret});`;
    target.style.webkitFilter = customFilter;
    target.style.filter = customFilter;
  }

  /**
   * @method executeFilter
   * @param {Boolean} isMultipleFilters
   * @param {Canvas} target
   * @param {String} value
   */
  function executeFilter(isMultipleFilters, target, value) {
    if(isMultipleFilters) {
      multipleFilter(target, value);
    } else {
      singleFilter(target, value);
    }
  }

  //===========================================================================
  // Graphics
  //===========================================================================

  /**
   * @method setCanvasFilter
   * @param {String} filterName blur, brightness, contrast, grayscale, hueRotate, opacity, saturate, sepia
   * @param {Number} amount
   * @param {Boolean} isMultipleFilters
   * @param {Canvas} target
   */
  Graphics.setCanvasFilter = function (filterName, amount, isMultipleFilters, target) {
    if(!target) target = this._canvas;
    var value = canvasFilter[filterName].format(amount);
    executeFilter(isMultipleFilters, target, value);
  };

  /**
   * @method setClearCanvasFilter
   * @param {Canvas} target
   */
  Graphics.setClearCanvasFilter = function (target) {
    if(!target) target = this._canvas;
    target.style.webkitFilter = null;
    target.style.filter = null;
  };

  /**
   * @method setCanvasDropShadowFilter
   * @param {Number} hShadow
   * @param {Number} vShadow
   * @param {Number} blur
   * @param {Boolean} isMultipleFilters
   * @param {Canvas} target
   */
  Graphics.setCanvasDropShadowFilter = function (hShadow, vShadow, blur, color, isMultipleFilters, target) {
    if(!target) target = this._canvas;
    var value = canvasFilter['dropShadow'].format(hShadow, vShadow, blur, color);
    executeFilter(isMultipleFilters, target, value);
  };

  /**
   * @method setCanvasInvert
   * @param {Boolean} activate
   * @param {Boolean} isMultipleFilters
   * @param {Canvas} target
   */
  Graphics.setCanvasInvert = function (activate, isMultipleFilters, target) {
    if(!target) target = this._canvas;
    var value = (activate) ? "invert(100%)" : "invert(0%)";
    executeFilter(isMultipleFilters, target, value);
  };

  //===========================================================================
  // RS.SimpleCanvasFilter
  //===========================================================================

  RS.SimpleCanvasFilter.createCustomShader = function (text) {
    var blob = new Blob( [texts], {type: 'text/plane'} );
    var url = URL.createObjectURL(blob);
    return url;
  };

  RS.SimpleCanvasFilter.loadCustomFilter = function () {
    let target = target || Graphics._canvas;
    let vsPath = vsPath || waveVertexSrc;
    let fsPath = fsPath || waveFragmentSrc;
    let uniformObject = WaveFilterDecoder.decodeUniformData();
    loadCustomFilter(target, vsPath, fsPath, uniformObject);
  }

  RS.SimpleCanvasFilter.canvasFilterPluginCommand = function (args, target) {
    switch(args[0]) {
      case 'blur':
        Graphics.setCanvasFilter('blur', calculateValue(args, 'px'), multipleFlag, target);
        break;
      case 'brightness':
        Graphics.setCanvasFilter('brightness', calculateValue(args), multipleFlag, target);
        break;
      case 'contrast':
        Graphics.setCanvasFilter('contrast', calculateValue(args, '%'), multipleFlag, target);
        break;
      case 'dropShadow':
        var hs = parseInt(args[1]);
        var vs = parseInt(args[2]);
        var blur = parseFloat(args[3]);
        var color = args[4];
        Graphics.setCanvasDropShadowFilter(hs, vs, blur, color, multipleFlag, target);
        break;
      case 'grayscale':
        Graphics.setCanvasFilter('grayscale', calculateValue(args, '%'), multipleFlag, target);
        break;
      case 'hueRotate':
        Graphics.setCanvasFilter('hueRotate', calculateValue(args, 'deg'), multipleFlag, target);
        break;
      case 'invert':
        Graphics.setCanvasInvert(args[1] === 'true', multipleFlag, target);
        break;
      case 'opacity':
        Graphics.setCanvasFilter('opacity', calculateValue(args, '%'), multipleFlag, target);
        break;
      case 'saturate':
        Graphics.setCanvasFilter('saturate', calculateValue(args, '%'), multipleFlag, target);
        break;
      case 'sepia':
        Graphics.setCanvasFilter('sepia', calculateValue(args, '%'), multipleFlag, target);
        break;
      case 'setMultipleFlag':
        multipleFlag = (args[1] === 'true');
        break;
      case 'clear':
        Graphics.setClearCanvasFilter(target);
        break;
    }
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === 'CanvasFilter') {
        switch (args[0]) {
          case "Whole":
            var subArgs = args.slice(1, args.length);
            RS.SimpleCanvasFilter.canvasFilterPluginCommand( subArgs );
            break;
        }
      }
  };

})();
