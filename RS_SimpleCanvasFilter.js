/*:
 * @plugindesc This plugin applies CSS filter to canvas
 * @author biud436
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 *
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
