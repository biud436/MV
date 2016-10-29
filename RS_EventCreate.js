/*:
 * RS_EventCreate.js
 * @plugindesc (v1.0.4) It is possible to create or copy or delete an event via the plugin commands.
 *
 * @author biud436
 * @since 2015.10.16
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 * This plugin command is copying an event.
 * MapID : if the value is zero or - 1, the mapId will set up an id of currently map.
 * Event Copy X Y MapID EventID
 *
 * This plugin command deletes a previously created event on currently map.
 * Event Delete EventID
 *
 * This plugin command creates a new event on currently map.
 * Event Create X Y CharacterName CharacterIndex
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 * RS.Event.instanceCopy(x, y, mapID, eventID, customData);
 * customData : if its value sets to null, it will use existing event data.
 *
 * RS.Event.instanceDestroy($gameMap.events().last);
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2015.10.17 (v1.0.0) - First Release Date
 * 2016.02.19 (v1.0.1) - Fixed a bug that causes a serious problem.
 * 2016.02.23 (v1.0.2) - Fixed a bug.
 * 2016.02.24 (v1.0.3) - Fixed a bug that is initialized to the default value when the parameters were set to zero.
 * 2016.10.30 (v1.0.4) - Optimized.
 * 2016.10.30 (v1.0.5) - Optimized.
 */

var Imported = Imported || {};
Imported.RS_EventCreate = true;

var RS = RS || {};
RS.Event = RS.Event || {};

(function($) {

  var defaultFolder = "data/Map";

  //============================================================================
  // Array
  //============================================================================

  Object.defineProperty(Array.prototype, "first", {
    get: function() {
      return this[0];
    }
  });

  Object.defineProperty(Array.prototype, "last", {
    get: function() {
      var idx = this.length - 1;
      return this[idx];
    }
  });

  Array.prototype.delete = function(deleteItem) {
    var tmp = this.filter(
      function(findValue) {
        return findValue !== deleteItem;
      }
    );
    return tmp;
  };

  //============================================================================
  // RS.Event
  //============================================================================

  $.instanceCreate = function(x, y, charName, charIdx) {

    // Set up the event Id.
    var eventID = $gameMap.events().length + 1;

    // Set up the event name.
    var eventName = "EV" + String(eventID).padZero(3);

    // Set up the custom event data.
    var event = { "id": eventID, "name": eventName, "note": "", "pages": [{ "conditions": { "actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0 }, "directionFix": false, "image": { "tileId": 0, "characterName": charName, "direction": 2, "pattern": 1, "characterIndex": charIdx }, "list": [{ "code": 101, "indent": 0, "parameters": [charName, charIdx, 0, 2] }, { "code": 401, "indent": 0, "parameters": ["\\c[4]-TEST-\\c[0]"] }, { "code": 401, "indent": 0, "parameters": ["TEST"] }, { "code": 0, "indent": 0, "parameters": [] }], "moveFrequency": 3, "moveRoute": { "list": [{ "code": 0, "parameters": [] }], "repeat": true, "skippable": false, "wait": false }, "moveSpeed": 3, "moveType": 0, "priorityType": 1, "stepAnime": false, "through": false, "trigger": 0, "walkAnime": true }], "x": x, "y": y };

    // Add a new event to the event elements of current map.
    $dataMap.events[event.id] = event;

    return $.instanceCopy(x, y, $gameMap.mapId(), eventID, event);
  };

  $.instanceCopy = function(x, y, mapID, eventID ) {
    var eventData, scene;

    // Check that the map ID is the same.
    if($gameMap.mapId() === mapID) {

      // Create a new event.
      var eventData = new Game_Event(mapID || $gameMap.mapId(), eventID || 1);

      // Set up the position of the event itself.
      eventData.setPosition(x, y);

      // Check whether the fourth argument is used.
      if(arguments[4]) eventData.setCustomData(arguments[4]);

      // Set up the event page.
      eventData.refresh();

      // Added the event to event elements.
      $gameMap._events.push(eventData);

      // Check whether the user is on the map.
      scene = SceneManager._scene;
      if(scene instanceof Scene_Map) {
        // Add the child of Sprite_Character
        var spriteset = scene._spriteset;
        spriteset._characterSprites.push(new Sprite_Character(eventData));
        spriteset._tilemap.addChild(spriteset._characterSprites.last);
      }

      return $gameMap._events.last;
    } else {
      return this.getMapData(x, y, mapID, eventID);
    }
  };

  $.getMapData = function(x, y, mapID, eventID) {
      var self = this;
      var xhr = new XMLHttpRequest();
      var url = defaultFolder + mapID.padZero(3) + ".json";
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
          if (xhr.status < 400) {
              var item = JSON.parse(xhr.responseText);
              var event = item.events[eventID];
              event.id = $gameMap.events().length + 1;
              $dataMap.events[event.id] = event;
              self.instanceCopy(x, y, $gameMap.mapId(), event.id).setCustomData(event);
          }
      }
    xhr.onerror = function() {
      throw new Error('Failed to load map data.');
    };
    xhr.send(null);
  };

  $.checkCharacterImage = function(imageName, func) {
      var self = this;
      var xhr = new XMLHttpRequest();
      var url = '/img/characters/' + imageName;
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
        if (xhr.status < 400) {
          func();
        }
      }
    xhr.onerror = function() {
      throw new Error('Failed to load an image ' + imageName);
    };
    xhr.send(null);
  };

  $.instanceDestroy = function(_event) {
    if(_event instanceof Game_Event) {
      var mapId = $gameMap.mapId();
      var eventId = _event.eventId();
      if($gameMap._events[eventId]) {
        delete $gameMap._events[eventId];
        $.deleteSpriteCharacter(_event);
        $gameSelfSwitches.setValue([mapId, eventId, 'A'], false);
        $gameSelfSwitches.setValue([mapId, eventId, 'B'], false);
        $gameSelfSwitches.setValue([mapId, eventId, 'C'], false);
        $gameSelfSwitches.setValue([mapId, eventId, 'D'], false);
      }
    }
  };

  $.deleteSpriteCharacter = function(owner) {
    var target, spriteItem = [];
    var scene = SceneManager._scene;
    var index = -1;
    if( (scene instanceof Scene_Map) ) {
      target = scene._spriteset;
      spriteItem = target._characterSprites.forEach(function(e, idx, a) {
        if(e._character === owner) {
          index = idx;
        };
      }, this);
      if(index !== -1) {
        target._tilemap.removeChild(target._characterSprites[index]);
      }
    }
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Event") {
      switch ( args[0].toLowerCase() ) {
      case 'create':
        var x = Number(args[1]).clamp(0, $gameMap.width() - 1);
        var y = Number(args[2]).clamp(0, $gameMap.height() - 1);
        var charName = args[3];
        var charIdx = Number(args[4]).clamp(0, 7);
        $.checkCharacterImage(charName, function () {
          $.instanceCreate(x, y, charName, charIdx);
        });
        break;
      case 'copy':
        var mapId = Number(args[3]);
        if(mapId <= 0) mapId = $gameMap.mapId();
        $.instanceCopy( Number(args[1]), Number(args[2]), mapId , Number(args[4]) );
        break;
      case 'delete':
        $.instanceDestroy( this.character(Number(args[1])) );
        break;
      }
    }
  };

  //============================================================================
  // Game_Event
  //============================================================================

  var alias_Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function(mapId, eventId) {
      alias_Game_Event_initialize.call(this, mapId, eventId);
      this._isCustomData = false;
  };

  Game_Event.prototype.setCustomData = function(data) {
    if(data) {
      this._isCustomData = true;
      this._customData = data;
      return this;
    }
  }

  Game_Event.prototype.event = function() {
    if(this._isCustomData) {
      return this._customData;
    } else {
      return $dataMap.events[this._eventId];
    }
  };

})(RS.Event);
