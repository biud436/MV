/*:
 * RS_EventCreate.js
 * @plugindesc (v1.0.6) This plugin allows you to create or copy or delete an event
 *
 * @author biud436
 * @since 2015.10.16
 *
 * @param Default Event Data
 * @desc Specify the default event data
 * @type struct<EventData>
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
 * 2017.07.07 (v1.0.6) :
 * - Added a feature that changes a default event data.
 * - Fixed the bug with the image file extension in a creating function.
 */

 /*~struct~EventData:
  *
  * @param id
  * @type number
  * @desc IDs will be automatically set for each map in the order that they are created.
  * @min 1
  * @default 1
  *
  * @param name
  * @desc The name of the map event.
  * @default
  *
  * @param note
  * @type note
  * @desc A text area where you can freely enter notes.
  * @default ""
  *
  * @param pages
  * @type struct<Page>[]
  * @desc The event page that you want to edit.
  * @default ["{\"conditions\":\"{\\\"actorId\\\":\\\"1\\\",\\\"actorValid\\\":\\\"false\\\",\\\"itemId\\\":\\\"1\\\",\\\"itemValid\\\":\\\"false\\\",\\\"selfSwitchCh\\\":\\\"A\\\",\\\"selfSwitchValid\\\":\\\"false\\\",\\\"switch1Id\\\":\\\"1\\\",\\\"switch1Valid\\\":\\\"false\\\",\\\"switch2Id\\\":\\\"1\\\",\\\"switch2Valid\\\":\\\"false\\\",\\\"variableId\\\":\\\"1\\\",\\\"variableValid\\\":\\\"false\\\",\\\"variableValue\\\":\\\"0\\\"}\",\"directionFix\":\"false\",\"image\":\"{\\\"tileId\\\":\\\"0\\\",\\\"characterName\\\":\\\"\\\",\\\"direction\\\":\\\"2\\\",\\\"pattern\\\":\\\"1\\\",\\\"characterIndex\\\":\\\"0\\\"}\",\"list\":\"[\\\"{\\\\\\\"code\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"indent\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"parameters\\\\\\\":\\\\\\\"[]\\\\\\\"}\\\"]\",\"moveFrequency\":\"3\",\"moveRoute\":\"{\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"code\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"parameters\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"repeat\\\":\\\"true\\\",\\\"skippable\\\":\\\"false\\\",\\\"wait\\\":\\\"false\\\"}\",\"moveSpeed\":\"3\",\"moveType\":\"0\",\"priorityType\":\"1\",\"stepAnime\":\"false\",\"through\":\"false\",\"trigger\":\"0\",\"walkAnime\":\"true\"}"]
  *
  * @param x
  * @type number
  * @desc the x where indicates the map x-position of the event.
  * @default 0
  * @min 0
  *
  * @param y
  * @type number
  * @desc the y where indicates the map y-position of the event.
  * @default 0
  * @min 0
  *
  */

 /*~struct~Page:
  *
  * @param conditions
  * @type struct<Conditions>
  * @desc Conditions for the map event to appear on the map based on the settings of this event page.
  * @default {"actorId":"1","actorValid":"false","itemId":"1","itemValid":"false","selfSwitchCh":"A","selfSwitchValid":"false","switch1Id":"1","switch1Valid":"false","switch2Id":"1","switch2Valid":"false","variableId":"1","variableValid":"false","variableValue":"0"}
  *
  * @param directionFix
  * @type boolean
  * @desc Prevents the direction that the image is facing from changing while moving.
  * @default false
  *
  * @param image
  * @type struct<Image>
  * @desc Images that are displayed when an event occurs on a map (does not affect the game).
  * @default {"tileId":"0","characterName":"","direction":"2","pattern":"1","characterIndex":"0"}
  *
  * @param list
  * @type struct<List>[]
  * @default ["{\"code\":\"0\",\"indent\":\"0\",\"parameters\":\"[]\"}"]
  *
  * @param moveFrequency
  * @type select
  * @desc select the move frequency
  * @default 3
  * @option Lowest
  * @value 1
  * @option Lower
  * @value 2
  * @option Normal
  * @value 3
  * @option Higher
  * @value 4
  * @option Highest
  * @value 5
  *
  * @param moveRoute
  * @type struct<MoveRoute>
  * @default {"list":"[\"{\\\"code\\\":\\\"0\\\",\\\"parameters\\\":\\\"[]\\\"}\"]","repeat":"true","skippable":"false","wait":"false"}
  *
  * @param moveSpeed
  * @type select
  * @desc select the move speed
  * @default 3
  * @option x8 Slower
  * @value 1
  * @option x4 Slower
  * @value 2
  * @option x2 Slower
  * @value 3
  * @option Normal
  * @value 4
  * @option x2 Faster
  * @value 5
  * @option x4 Faster
  * @value 6
  *
  * @param moveType
  * @type select
  * @desc Specifies how the map event will move
  * @default 0
  * @option Fixed
  * @value 0
  * @option Random
  * @value 1
  * @option Approach
  * @value 2
  * @option Custom
  * @value 3
  *
  * @param priorityType
  * @type select
  * @desc Choose from the below in order to specify the priority of how players and other events are displayed on top of one another.
  * @default 1
  * @option Below characters
  * @value 0
  * @option Same as characters
  * @value 1
  * @option Above characters
  * @value 2
  *
  * @param stepAnime
  * @type boolean
  * @desc Displays the stepping animation while the character is stopped.
  * @default false
  *
  * @param through
  * @type boolean
  * @desc Allows to pass through terrain and events that cannot be passed through.
  * @default false
  *
  * @param trigger
  * @type select
  * @desc Choose the timing for when the processing of the [Contents] of an event that occurs on the map will be.
  * @default 0
  * @option Action Button
  * @value 0
  * @option Player Touch
  * @value 1
  * @option Event Touch
  * @value 2
  * @option Autorun
  * @value 3
  * @option Parallel
  * @value 4
  *
  * @param walkAnime
  * @type boolean
  * @desc Displays animation when moving.
  * @default true
  *
  */

/*~struct~Conditions:
 * @param actorId
 * @type actor
 * @default 1
 *
 * @param actorValid
 * @type boolean
 * @default false
 *
 * @param itemId
 * @type item
 * @default 1
 *
 * @param itemValid
 * @type boolean
 * @default false
 *
 * @param selfSwitchCh
 * @type select
 * @default A
 * @option A
 * @option B
 * @option C
 * @option D
 *
 * @param selfSwitchValid
 * @type boolean
 * @default false
 *
 * @param switch1Id
 * @type switch
 * @default 1
 *
 * @param switch1Valid
 * @type boolean
 * @default false
 *
 * @param switch2Id
 * @type switch
 * @default 1
 *
 * @param switch2Valid
 * @type boolean
 * @default false
 *
 * @param variableId
 * @type variable
 * @default 1
 *
 * @param variableValid
 * @type boolean
 * @default false
 *
 * @param variableValue
 * @type number
 * @default 0
 *
 */

/*~struct~Image:
 *
 * @param tileId
 * @type number
 * @default 0
 *
 * @param characterName
 * @type file
 * @dir img/characters/
 * @default
 *
 * @param direction
 * @type select
 * @default 2
 * @option Up
 * @value 8
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 *
 * @param pattern
 * @type number
 * @default 1
 * @min 0
 * @max 3
 *
 * @param characterIndex
 * @type number
 * @default 0
 * @min 0
 * @max 7
 *
 */

/*~struct~List:
 * @param code
 * @type number
 * @default 0
 *
 * @param indent
 * @type number
 * @default 0
 *
 * @param parameters
 * @type string[]
 * @default []
 *
 */

 /*~struct~MoveRoute:
  * @param list
  * @type struct<MoveRouteList>[]
  * @default ["{\"code\":\"0\",\"parameters\":\"[]\"}"]
  *
  * @param repeat
  * @type boolean
  * @default true
  *
  * @param skippable
  * @type boolean
  * @default false
  *
  * @param wait
  * @type boolean
  * @default false
  *
  */

 /*~struct~MoveRouteList:
  * @param code
  * @type number
  * @default 0
  *
  * @param parameters
  * @type string[]
  * @default []
  *
  */

var Imported = Imported || {};
Imported.RS_EventCreate = true;

var RS = RS || {};
RS.Event = RS.Event || {};

(function($) {

  var defaultFolder = "data/Map";
  var parameters = PluginManager.parameters('RS_EventCreate');

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

  $.makeEventId = function () {
    return $gameMap.events().length + 1;
  };

  $.makeEventName = function (eventID) {
    return "EV" + String(eventID).padZero(3);
  };

  $.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return $.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  $.makeEventData = function (x, y, charName, charIdx, eventID, eventName) {
    var defaultEventData = $.jsonParse(parameters["Default Event Data"]);
    defaultEventData.id = eventID;
    defaultEventData.name = eventName;
    defaultEventData.x = x;
    defaultEventData.y = y;
    defaultEventData.pages[0].image.characterName = charName;
    defaultEventData.pages[0].image.characterIndex = charIdx;
    defaultEventData.pages[0].list = [];
    defaultEventData.pages[0].list.push({
      "code": 101,
      "indent": 0,
      "parameters": [charName, charIdx, 0, 2]
    });
    defaultEventData.pages[0].list.push({
      "code": 401,
      "indent": 0,
      "parameters": ["\\c[4]-TEST-\\c[0]"]
    });
    defaultEventData.pages[0].list.push({
      "code": 401,
      "indent": 0,
      "parameters": ["TEST"]
    });
    defaultEventData.pages[0].list.push({
      "code": 0,
      "indent": 0,
      "parameters": []
    });
    return defaultEventData;
  };

  $.applyEventOnMap = function (ev) {
    if(ev && ev.id) {
      $dataMap.events[ev.id] = ev;
    }
  };

  $.instanceCreate = function(x, y, charName, charIdx) {
    var eventID = $.makeEventId();
    var eventName = $.makeEventName(eventID);
    var newEvent = $.makeEventData(x, y, charName, charIdx, eventID, eventName);

    $.applyEventOnMap(newEvent);

    return $.instanceCopy(x, y, $gameMap.mapId(), eventID, newEvent);

  };

  $.instanceCopy = function(x, y, mapID, eventID ) {
    var eventData, scene;

    // Check that the map ID is the same.
    if($gameMap.mapId() === mapID) {

      // Create a new event.
      var eventData = new Game_Event(mapID || $gameMap.mapId(), eventID || 1);

      // Set up the position of the event itself.
      eventData.locate(x, y);

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
      var url = $.getParentFolder() + defaultFolder + mapID.padZero(3) + ".json";
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
          if (xhr.status < 400) {
              var item = JSON.parse(xhr.responseText);
              var event = item.events[eventID];
              event.id = $.makeEventId();
              $.applyEventOnMap(event);
              self.instanceCopy(x, y, $gameMap.mapId(), event.id).setCustomData(event);
          }
      }
    xhr.onerror = function() {
      throw new Error('Failed to load map data.');
    };
    xhr.send(null);
  };

  $.getParentFolder = function (url2) {
    url2 = url2 || location.href;
    var i = 0;
    var ret = '';
    while(url2[i] !== undefined) {
     i++;
    }
    while(url2[i] !== '/') {
     i--;
    }
    ret = url2.slice(0, i).concat('/');
    return ret;
  };

  $.checkCharacterImage = function(imageName, func) {
      var self = this;
      var xhr = new XMLHttpRequest();
      var url = $.getParentFolder() + 'img/characters/' + imageName + '.png';
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
