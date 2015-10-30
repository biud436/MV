/*:
 * Event_Create.js
 * @plugindesc 이벤트 생성 플러그인입니다.
 * @author biud436
 * @since 2015.10.16
 * @version 1.1
 * @help
 * <플러그인 커맨드>
 * 이벤트 생성 X좌표 Y좌표 캐릭터파일명 캐릭터인덱스
 * 이벤트 복제 X좌표 Y좌표 맵ID 이벤트ID
 * 이벤트 삭제 이벤트ID
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
    var oEvent = $gameMap._events.last;
    var eventID = oEvent.eventId() + 1;
    var eventName = "EV" + String(eventID).padZero(3);
    
    $dataMap.events.push(  {
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
          "characterName": charName || "Actor1",
          "direction": 2,
          "pattern": 1,
          "characterIndex": charIdx || 4
        },
        "list": [{
          "code": 101,
          "indent": 0,
          "parameters": [charName || "Actor1", charIdx || 4, 0, 2]
        },
        {
          "code": 401,
          "indent": 0,
          "parameters": ["\\c[4]-테스트-\\c[0]"]
        },
        {
          "code": 401,
          "indent": 0,
          "parameters": ["안녕하세요. 테스트 캐릭터입니다. "]
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
    });
    
    return RS.instanceCopy(x, y, $gameMap.mapId(), eventID);
    
  };

  RS.instanceCopy = function(x, y, mapID, eventID ) {
    if($gameMap.mapId() === mapID) {
      var _event = new Game_Event(mapID || $gameMap.mapId(), eventID || 1);
      _event.setPosition(x || $gamePlayer._x, y || $gamePlayer._y + 1);
      _event.setupPageSettings();
      $gameMap._events.push(_event);
      SceneManager._scene._spriteset.createCharacters();
      return $gameMap._events.last;      
    } else {
      this.getMapData(x, y, String(mapID), eventID);
    }
  };

  RS.getMapData = function(x, y, mapID, eventID) {
      var xhr = new XMLHttpRequest();
      var url = 'data/' + "Map" + mapID.padZero(3) + ".json";
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
          if (xhr.status < 400) {
              $dataMap.events.push(JSON.parse(xhr.responseText).events[eventID]);
              this.instanceCopy(x, y, $gameMap.mapId(), $gameMap._events.last.eventId() + 1);
          }
      };
    xhr.onerror = function() { throw new Error("맵 데이터를 로드하는데 실패 했습니다."); };
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
  
  var rsa_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    rsa_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "이벤트") {
    
      var item = (function() {
        var data = args.slice(1);
        data.forEach(function(item,index) { 
          data[index] = typeof(parseInt(item)) === 'number' ? parseInt(item) : String(item); 
        }.bind(this));
        return data;
      })();
               
      switch (args[0]) {
      case '생성':
        RS.instanceCreate.apply(this, item);
        break;
      case '복제':
        RS.instanceCopy.apply(this, item);
        break;
      case '삭제':
        RS.instanceDestroy( this.character(item) );
        break;
      }
      
    }
  };
 
})();
 