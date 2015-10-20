/**
 * @name 이벤트 생성 플러그인
 * @author biud436
 * @date 2015.10.16
 * @version 1.0
 */

 (function() {
 
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
	
	Array.prototype.compact = function() {
		var tmp = this.clone();
		tmp.filter(function(val) { 
			return val != null; 
		});
		return tmp;
	};
	
	Utils.instance_create = function(x, y, charName, charIdx) {
		var oEvent = $gameMap._events.last;
		var eventID = oEvent.eventId() + 1;
		var eventName = "EV" + String(eventID / 100).replace(".","")
		$dataMap.events.push(	{
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
		return Utils.instance_copy(x, y, $gameMap.mapId, eventID);
	}
 
	Utils.instance_copy = function(x, y, mapID, eventID ) {
		var _event = new Game_Event(mapID || $gameMap.mapId, eventID || 1);
		_event.setPosition(x || $gamePlayer._x, y || $gamePlayer._y + 1);
		_event.lock();
		$gameMap._events.push(_event);
		
		SceneManager._scene._spriteset.createCharacters();
		return $gameMap._events.last;
	};
	
	Utils.instance_destroy = function(_event) {
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
 
})();
 