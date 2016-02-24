/*:
 * RS_EventCreate.js
 * @plugindesc It is possible to create or copy or delete an event
 * through the plugin command.
 *
 * @author biud436
 * @since 2015.10.16
 * @version 1.3
 *
 * @help
 *
 * - Plugin Command
 * This plugin command creates a new event on currently map.
 * Event Create X Y CharacterName CharacterIndex
 *
 * This plugin command is copying an event.
 * Event Copy X Y MapID EventID
 *
 * This plugin command deletes a previously created event on currently map.
 * Event Delete EventID
 *
 * - Change log
 * 2016.02.19 - Bug Fixed.
 * 2016.02.23 - Bug Fixed.
 * 2016.02.24 - Delete the default parameters.
 *
 */

var RS = RS || {};

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
      return findValue != deleteItem;
    }
  );
  return tmp;
};

(function() {

  RS.instanceCreate = function(x, y, charName, charIdx) {
    var eventID = $gameMap.events().length + 1;
    var eventName = "EV" + String(eventID).padZero(3);

    var event = {
      "id": eventID,
      "name": eventName,
      "note": "",
      "pages": [{
        "conditions": {
          "actorId": 1,
          "actorValid": false,
          "itemId": 1,
          "itemValid": false,
          "selfSwitchCh": "A",
          "selfSwitchValid": false,
          "switch1Id": 1,
          "switch1Valid": false,
          "switch2Id": 1,
          "switch2Valid": false,
          "variableId": 1,
          "variableValid": false,
          "variableValue": 0
        },
        "directionFix": false,
        "image": {
          "tileId": 0,
          "characterName": charName,
          "direction": 2,
          "pattern": 1,
          "characterIndex": charIdx
        },
        "list": [{
          "code": 101,
          "indent": 0,
          "parameters": [charName, charIdx, 0, 2]
        },
        {
          "code": 401,
          "indent": 0,
          "parameters": ["\\c[4]-TEST-\\c[0]"]
        },
        {
          "code": 401,
          "indent": 0,
          "parameters": ["TEST"]
        },
        {
          "code": 0,
          "indent": 0,
          "parameters": []
        }],
        "moveFrequency": 3,
        "moveRoute": {
          "list": [{
            "code": 0,
            "parameters": []
          }],
          "repeat": true,
          "skippable": false,
          "wait": false
        },
        "moveSpeed": 3,
        "moveType": 0,
        "priorityType": 1,
        "stepAnime": false,
        "through": false,
        "trigger": 0,
        "walkAnime": true
      }],
      "x": x,
      "y": y
    };

    $dataMap.events[event.id] = event;

    return RS.instanceCopy(x, y, $gameMap.mapId(), eventID, event);

  };

  RS.instanceCopy = function(x, y, mapID, eventID ) {
    if($gameMap.mapId() === mapID) {
      var _event = new Game_Event(mapID || $gameMap.mapId(), eventID || 1);
      _event.setPosition(x, y);
      if(arguments[4]) _event.setCustomData(arguments[4]);
      _event.refresh();
      $gameMap._events.push(_event);
      SceneManager._scene._spriteset.createCharacters();
      return $gameMap._events.last;
    } else {
      this.getMapData(x, y, mapID, eventID);
    }
  };

  RS.getMapData = function(x, y, mapID, eventID) {
      var self = this;
      var xhr = new XMLHttpRequest();
      var url = 'data/' + "Map" + "%1".format(mapID).padZero(3) + ".json";
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
      if($gameSystem.isKorean()) {
        throw new Error("맵 데이터를 로드하는데 실패 했습니다.");
      } else {
        throw new Error('Failed to load: ' + DataManager._errorUrl);
      }
    };
    xhr.send(null);
  };

  RS.instanceDestroy = function(_event) {
    if(_event instanceof Game_Event)
    {
      $gameMap._events.forEach( function(event) {
        if(event.eventId() === _event.eventId()) {
          $gameMap._events = $gameMap._events.delete(_event);
        }
      });
      SceneManager._scene.stage._spriteset.createLowerLayer();
    }
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "이벤트" || command === "Event") {
      switch (args[0]) {
      case '생성':
      case 'Create':
        RS.instanceCreate(Number(args[1]), Number(args[2]), args[3], Number(args[4]));
        break;
      case '복제':
      case 'Copy':
        RS.instanceCopy(Number(args[1]), Number(args[2]), Number(args[3]), Number(args[4]));
        break;
      case '삭제':
      case 'Delete':
        RS.instanceDestroy( this.character(Number(args[1])) );
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


})();
