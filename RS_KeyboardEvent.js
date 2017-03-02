//==============================================================================
// RS_KeyboardEvent.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_KeyboardEvent = true;

/*:
 * @plugindesc This plugin allows you to send keyboard input events manually.
 * @author biud436
 * @help
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * KeyEvent executeString left
 * KeyEvent executeString escape
 * KeyEvent executeKey 0x58
 * =============================================================================
 * Script Calls
 * =============================================================================
 * Input._makeKeyTiming('left');
 * Input._makeKeyTiming('escape');
 *
 * Input._makeKeyTiming('down');
 * Input._makeKeyTiming('control');
 *
 * Input._makeKeyTiming(116);
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.01.02 (v1.0.0) - First Release.
 * 2017.03.03 (v1.0.1) - Added new function that can add new keyCode.
 */

(function() {

  Input._startTime = 0;

  Input._makeKeyEvent = function(type, keyCode) {
      var isShift = Boolean(keyCode === 0x10);
      var isCtrl = Boolean(keyCode === 0x11);
      var isAlt = Boolean(keyCode === 0x12);
      var evt = new KeyboardEvent(type, {bubbles:true, shiftKey: isShift, ctrlKey: isCtrl, altKey: isAlt});
      Object.defineProperty(evt, 'keyCode', {get: function() {return keyCode;}});
      document.dispatchEvent(evt);
  };

  /**
   * Swap between key/value
   * @param {String}
   * @return {Number}
   */
  Input._makeVirtualKey = function (keyCode) {
    if(typeof keyCode === 'string') {
      var tempMapper = [];
      var vkCode = 0;
      var mapper = JsonEx.makeDeepCopy(Input.keyMapper);
      var length = Object.keys(mapper).length;
      var keys =  Object.keys(mapper);
      for(var i =0; i < length; i++) {
        tempMapper[mapper[keys[i]]] = keys[i];
      }
      mapper = null;
      vkCode = tempMapper[keyCode];
      return vkCode;
    }
  };

  Input._makeKeyTiming = function(keyCode) {
      if(typeof keyCode === 'string') {
        keyCode = this._makeVirtualKey(keyCode);
      }
      requestAnimationFrame(function(timestamp) {
        Input._startTime = timestamp;
        var progress = timestamp - Input._startTime;
        Input._makeKeyEvent('keydown', keyCode);
        if(progress < 2000) {
           requestAnimationFrame(function() {
             Input._makeKeyEvent('keyup', keyCode);
           });
        }
      });
  };

  Input._executeJson = function (keyInt, keyName, func) {
    var retObj, type, json;
    json = {keyInt: keyName};
    if(typeof json === 'object') retObj = JSON.parse(json);
    if(retObj) {
      type = Object.keys(retObj);
      if(typeof type[0] === 'number') {
        if(typeof func === 'function') func(retObj);
      }
    }
  };

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "KeyEvent") {
        switch (args[0]) {
        case 'executeString':
          var keyCode = Input._makeVirtualKey(args[1]) || 0;
          Input._makeKeyTiming(keyCode);
          break;
        case 'executeKey':
          var keyCode = parseInt(args[1] || 0);
          Input._makeKeyTiming(keyCode);
          break;
        case 'addNewKey':
          Input._executeJson(parseInt(args[1]), args[2], function (retObj) {
            Object.assign(Input.keyMapper, retObj);
          });
          break;
        }

      }
  };


})();
