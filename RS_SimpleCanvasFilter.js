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
 * Graphics.setClearCanvasFilter(target);
 * Graphics.setCanvasDropShadowFilter(hShadow, hShadow, blur, color, isMultipleFilters, target);
 * Graphics.setCanvasInvert(activate, isMultipleFilters, target);
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.10.06(v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_SimpleCanvasFilter = true;

var RS = RS || {};

(function () {

  var multipleFlag = false;

  RS.SimpleCanvasFilter = RS.SimpleCanvasFilter || {};

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

  /**
   * @method calculateValue
   * @param {Array} args
   * @param {String} suffix
   */
  function calculateValue(args, suffix) {
    var value = args[1];
    var amount = 0;

    if(value.contains(suffix)) {
      amount = Number( value.split(/^([0-9]+)/g)[1] );
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
