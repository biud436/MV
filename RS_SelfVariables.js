 /*:
 * RS_SelfVariables.js
 * @plugindesc Self Variables
 * @author biud436
 *
 * @param Save notifying variable
 * @desc
 * @default false
 *
 * @param notifying variable number
 * @desc
 * @default 1
 *
 * @help
 * ============================================================================
 * Scripts
 * ============================================================================
 * RS.SelfVariables.setValue(key, value);
 * RS.SelfVariables.value(key);
 * ============================================================================
 * How to use Scripts
 * ============================================================================
 *
 * RS.SelfVariables.setValue(1, 'Hi, guys');
 * => This code stores a value called 'Hi, guys'.
 *
 * RS.SelfVariables.value(1);
 * => This code returns the value called 'Hi, guys'.
 *
 * -----------------------------------------------------------------------------
 * In case of Common Events
 * -----------------------------------------------------------------------------
 * It's the same as above if you need to save the value.
 * var key = RS.SelfVariables.setValue(1, 'Hi, guys');
 * var s = RS.SelfVariables.value(key);
 * $gameMessage.add(s);
 *
 * -----------------------------------------------------------------------------
 * In case Of Battle Events
 * -----------------------------------------------------------------------------
 * var key = RS.SelfVariables.setValue(1, 'Hi, there!');
 * var s = RS.SelfVariables.value(key);
 * $gameMessage.add(s);
 *
 * ============================================================================
 * Plugin Command
 * ============================================================================
 * GSV set key value
 * GSV get key
 *
 * ============================================================================
 * Version Log
 * ============================================================================
 * 2016.07.25 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_SelfVariables = true;

var $gameSelfVariables = null;

var RS = RS || {};
RS.SelfVariables = RS.SelfVariables || {};

function Game_SelfVariables() {
  this.initialize.apply(this, arguments);
}

(function (GSV) {

  var parameters = PluginManager.parameters('RS_SelfVariables');
  GSV.notifyingVarNum = Number(parameters['notifying variable number'] || 1);
  GSV.saveFlags = Boolean(parameters['Save notifying variable'] === 'true');
  GSV.nonEventPointer = 10000;
  GSV.length = 10000;
  GSV.battleFlgas = 15000;

  //============================================================================
  // Game_SelfVariables
  //
  //

  Game_SelfVariables.prototype = Object.create(Game_Variables.prototype);
  Game_SelfVariables.prototype.initialize = Game_SelfVariables;

  Game_SelfVariables.prototype.initialize = function () {
    Game_Variables.prototype.initialize.call(this);
  };

  Game_SelfVariables.prototype.clear = function() {
    this._data = {};
  };

  Game_SelfVariables.prototype.setValue = function(variableId, value) {
    if (typeof value === 'number') {
        value = Math.floor(value);
    }
    this._data[variableId] = value;
    this.onChange();
  };

  Game_SelfVariables.prototype.getCurrentMapPointerKeys = function() {
    var keys = Object.keys(this._data);
    var result = keys.filter(function(key) {
      return key[0] === $gameMap.mapId() && key[1] >= GSV.length;
    }, this);
    return result;
  };

  //============================================================================
  // GSV
  //
  //

  GSV.makeKey = function (value) {
    var self = $gameMap._interpreter;
    var key;
    if(self && self._mapId !== 0 && self._eventId !== 0) {
      key = [self._mapId, self._eventId, value]
    } else {
      // In case of Battle Events
      if($gameParty.inBattle()) {
        key = [$gameMap.mapId(), GSV.battleFlgas++ , value || 0];
      } else {
      // In case of Common Events
        key = [$gameMap.mapId(), GSV.nonEventPointer++, value || 0];
      }
    }
    return key;
  };

  GSV.setValue = function (key, value) {
    if(typeof key === 'number' || key instanceof Number) {
      key = GSV.makeKey(key);
    }
    $gameSelfVariables.setValue(key, value);
    return key;
  };

  GSV.value = function (key) {
    if(typeof key === 'number' || key instanceof Number) {
      key = GSV.makeKey(key);
    }
    if(typeof value === 'string') value = String(value);
    var value = $gameSelfVariables.value(key);
    if(GSV.saveFlags) $gameVariables.setValue(GSV.notifyingVarNum, value);
    return value;
  };

  GSV.clearPointer = function() {
    GSV.nonEventPointer = 10000;
    GSV.battleFlgas = 15000;
  };

  //============================================================================
  // Game_Map
  //
  //

  var alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    alias_Game_Map_setup.call(this, mapId);
    GSV.clearPointer();
  };

  //============================================================================
  // DataManager
  //
  //

  var alias_DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    alias_DataManager_createGameObjects.call(this);
    $gameSelfVariables = new Game_SelfVariables();
  }

  var alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
      // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
      var contents = alias_DataManager_makeSaveContents.call(this);
      contents.selfVariables = $gameSelfVariables;
      return contents;
  };

  var alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
      alias_DataManager_extractSaveContents.call(this, contents);
      $gameSelfVariables  = contents.selfVariables;
  };

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "GSV") {
      switch (args[0]) {
      case 'set':
        var key = GSV.makeKey( Number(args[1] || 0) );
        var value = Number(args[2] || 0);
        GSV.setValue(key, value);
        break;
      case 'get':
        var key = GSV.makeKey( Number(args[1] || 0) );
        GSV.value(key);
        break;
      }
    }
  };

})(RS.SelfVariables);
