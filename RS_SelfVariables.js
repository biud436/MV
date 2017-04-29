 /*:
 * RS_SelfVariables.js
 * @plugindesc This plugin allows you to set up the variable on event itself.
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
 * Self Variables are containers that store values. Such a value can either be
 * a number or a string. A self variable is given a key that you can refer to,
 * and you can use the key to inspect the value and to change it.
 * ============================================================================
 * Scripts & Built-in Variables
 * ============================================================================
 * Changing a variable in a script command is very simple, you can use this method
 * to assign a new value.
 *
 * Method :
 *    RS.SelfVariables.setValue(key, value);
 *
 * For example, to set a new value, you could use the following piece of code.
 * The 'x' is built-in variable, if this sets to certain value, so it will really
 * be changed an event position :
 *
 * RS.SelfVariables.setValue('x', 20);
 *
 * Even getting stored variable in a script command is very simple, you can use
 * this method to get it.
 *
 * Method :
 *    RS.SelfVariables.value(key);
 *
 * It is vitally important to realize that variable keys are case-sensitive,
 * that is, 'Key' is not the same as 'key'.This plugin is also there are a number
 * of built-in variables, like x and y, which indicate the position of this event.
 * For example, to get it, you could use the following piece of code :
 *
 * These give a result in a integer value :
 *    var x = RS.SelfVariables.value('x');
 *    var y = RS.SelfVariables.value('y');
 *    var dir = RS.SelfVariables.value('direction');
 *    var screenX = RS.SelfVariables.value('screenX');
 *    var screenY = RS.SelfVariables.value('screenY');
 *    var screenZ = RS.SelfVariables.value('screenZ');
 *    var characterIndex = RS.SelfVariables.value('characterIndex');
 *    var moveSpeed = RS.SelfVariables.value('moveSpeed');
 *    var moveFrequency = RS.SelfVariables.value('moveFrequency');
 *    var opacity = RS.SelfVariables.value('opacity');
 *
 * These give a result in a string value :
 *    var name = RS.SelfVariables.value('name');
 *    var characterName = RS.SelfVariables.value('characterName');
 *
 * The Built-in variables are :
 * 'x', 'y', 'direction', 'moveSpeed', 'moveFrequency', 'opacity'
 *
 * It is also vitally important to realize that 'screenX', 'screenY', 'screenZ',
 * 'id', 'name', 'characterName', 'characterIndex' variables are read-only,
 * So these variables are not change as you expect.
 *
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
 * 2017.04.29 (v1.0.1) - Added built-in variables like x, y, direction.
 */

var Imported = Imported || {};
Imported.RS_SelfVariables = true;

var $gameSelfVariables = null;

var RS = RS || {};
RS.SelfVariables = RS.SelfVariables || {};

function Game_SelfVariables() {
  this.initialize.apply(this, arguments);
}

(function ($) {

  var parameters = PluginManager.parameters('RS_SelfVariables');
  $.notifyingVarNum = Number(parameters['notifying variable number'] || 1);
  $.saveFlags = Boolean(parameters['Save notifying variable'] === 'true');
  $.nonEventPointer = 10000;
  $.length = 10000;
  $.battleFlgas = 15000;

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

  Game_SelfVariables.prototype.value = function(variableId) {
      return this._data[variableId] || 0;
  };

  Game_SelfVariables.prototype.getCurrentMapPointerKeys = function() {
    var keys = Object.keys(this._data);
    var result = keys.filter(function(key) {
      return key[0] === $gameMap.mapId() && key[1] >= $.length;
    }, this);
    return result;
  };

  //============================================================================
  // Define $
  //
  //

  $.makeKey = function (value) {
    var this2 = this;
    var self = $gameMap._interpreter;
    var key;
    if(self && self._mapId !== 0 && self._eventId !== 0) {
      key = [self._mapId, self._eventId, value]
    } else {
      // In case of Battle Events
      if($gameParty.inBattle()) {
        key = [$gameMap.mapId(), this2.battleFlgas++ , value || 0];
      } else {
      // In case of Common Events
        key = [$gameMap.mapId(), this2.nonEventPointer++, value || 0];
      }
    }
    return key;
  };

  $.setValue = function (key, value) {
    var self = this;
    if(typeof key === 'number' || key instanceof Number) {
      key = self.makeKey(key);
    }
    var ret = self.setEventProperties(key, value);
    $gameSelfVariables.setValue(key, value);
    return key;
  };

  $.value = function (key) {
    var self = this;
    if(typeof key === 'number' || key instanceof Number) {
      key = self.makeKey(key);
    }
    if(typeof value === 'string') value = String(value);
    self.onChangeBuiltInVariable();
    var value = $gameSelfVariables.value(key);
    if(self.saveFlags) $gameVariables.setValue(self.notifyingVarNum, value);
    return value;
  };

  $.clearPointer = function() {
    var self = this;
    self.nonEventPointer = 10000;
    self.battleFlgas = 15000;
  };

  $.setEventProperties = function (key, newValue) {
    var self = this;
    if($gameParty.inBattle()) return false;
    if(!self.isValidEventKey(key)) {
      // console.warn(key + " is invalid in an event");
      // console.warn('or '+ key + " value is defined only in an event object, so you cannot change this");
      return false;
    }

    var interpreter = $gameMap._interpreter;
    if(!self) {
      console.warn("It does not have a instance for the game interpreter.");
      return false;
    }

    var eventId = interpreter._eventId;
    var event = undefined;

    if(eventId > 0) {
      event = $gameMap.event(eventId || 0);
    }

    if(!event) {
      console.warn("It couldn't find the event object.");
      return false;
    }

    switch (key) {

      case 'direction':
      case 'moveSpeed':
      case 'moveFrequency':
      case 'opacity':
        var fName = 'set'.concat(key[0].toUpperCase() + key.substr(1));
        var fc = event[fName];
        if(typeof f === 'function') fc(newValue);
        break;
      case 'x':
        event.locate(newValue, event.y);
        break;
      case 'y':
        event.locate(event.x, newValue);
        break;

    }

    return true;
  };

  $.isValidEventKey = function (key) {
    var keys = ['x', 'y', 'direction', 'tileId', 'moveSpeed', 'moveFrequency',
                'opacity'];
    return keys.contains(key);
  };

  $.onChangeBuiltInVariable = function() {
    var self = this;
    if($gameParty.inBattle()) return false;
    var interpreter = $gameMap._interpreter;
    var eventId = interpreter._eventId;
    var event = undefined;
    if(eventId > 0) {
      event = $gameMap.event(eventId);
    }
    if(event) {
      self.setValue('x', event.x);
      self.setValue('y' , event.y);
      self.setValue('id', event.eventId() || eventId);
      self.setValue('name', event.event().name || '');
      self.setValue('direction' , event.direction());
      self.setValue('screenX' , event.screenX());
      self.setValue('screenY' , event.screenY());
      self.setValue('screenZ' , event.screenZ());
      self.setValue('moveSpeed' , event.moveSpeed());
      self.setValue('moveFrequency' , event.moveFrequency());
      self.setValue('opacity' , event.opacity());
      self.setValue('characterName' , event.characterName());
      self.setValue('characterIndex' , event.characterIndex());
    }
  };

  //============================================================================
  // Game_Map
  //
  //

  var alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    alias_Game_Map_setup.call(this, mapId);
    $.clearPointer();
  };

  //============================================================================
  // DataManager
  //
  //

  var alias_DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    alias_DataManager_createGameObjects.call(this);
    $gameSelfVariables = new Game_SelfVariables();
  };

  var alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
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
        var key = $.makeKey( Number(args[1] || 0) );
        var value = Number(args.slice(2).join(' ') || 0);
        $.setValue(key, value);
        break;
      case 'get':
        var key = $.makeKey( Number(args[1] || 0) );
        $.value(key);
        break;
      }
    }
  };

})(RS.SelfVariables);
