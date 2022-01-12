//================================================================
// RS_SelfVariables.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_SelfVariables.js
 * @target MV
 * @plugindesc This plugin allows you to set up the variable on event itself. <RS_SelfVariables>
 * @author biud436
 *
 * @param Save notifying variable
 * @type boolean
 * @desc
 * @default false
 *
 * @param notifying variable number
 * @type variable
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
 * 2022.01.12 (v1.0.2) :
 *  - Removed the variable named 'Imported' from the global scope.
 *  - Fixed the plugin structure by adding a new pattern such as '*.mixin' or '*.extend'.
 *  - Removed reserved word named 'var' in this plugin, However some of code block are still use a reserved word named 'var' instead of 'let' or 'const'.
 */
/*:ko
 * @target MV
 * @plugindesc 이벤트 내에서 전역으로 사용할 수 있는 셀프 변수 플러그인입니다.<RS_SelfVariables>
 * @author 러닝은빛(biud436)
 *
 * @param Save notifying variable
 * @text
 * @type boolean
 * @desc 플러그인 명령으로 셀프 변수 값을 읽을 때, 게임 변수에 값을 임시로 저장합니다.
 * @default false
 *
 * @param notifying variable number
 * @text
 * @type variable
 * @desc 플러그인 명령으로 셀프 변수 값을 읽을 때, 값을 이 변수에 저장합니다.
 * @default 1
 *
 * @help
 * 셀프 변수는 키와 값을 저장하는 일종의 해쉬 컨테이너입니다.
 * 셀프 변수의 값은 숫자 또는 문자열 일 수 있습니다.
 *
 * 셀프 변수는 값을 참조 할 수있는 키가 주어지며,
 * 이 키를 사용하여 값을 검사하고 변경할 수 있습니다.
 *
 * ============================================================================
 * 사용 방법
 * ============================================================================
 *
 * 셀프 변수는 셀프 스위치와 비슷하게 동작하며 해당 이벤트 내에서만 동작합니다.
 *
 * 다음 메서드로 셀프 변수 값을 쓸 수 있습니다.
 *
 * 메서드 :
 *    RS.SelfVariables.setValue(key, value);
 *
 * 셀프 변수로 이벤트 캐릭터의 다양한 속성 값을 읽거나 쓰기가 가능합니다.
 * 읽기만 가능한 변수도 있습니다. (하단에 자세히 설명됩니다.)
 * 다음 코드는 이벤트의 맵 x 좌표를 20으로 설정합니다.
 *
 * RS.SelfVariables.setValue('x', 20);
 *
 * 다음 메서드로 셀프 변수 값을 읽을 수 있습니다.
 *
 * 메서드 :
 *    RS.SelfVariables.value(key);
 *
 * key 값은 대소문자를 구분합니다. 또한 이벤트 캐릭터의 다양한 속성 값을 읽을 수
 * 있습니다. 저는 빌트-인 변수라고 부르고 있습니다.
 *
 * 이벤트 캐릭터의 변수 값들을 읽어 정수로 반환합니다. :
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
 * 문자열을 반환합니다. 이벤트 이름이나 캐릭터 이미지의 이름을 읽을 수도 있습니다. :
 *    var name = RS.SelfVariables.value('name'); // 읽기 전용입니다.
 *    var characterName = RS.SelfVariables.value('characterName');
 *
 * 주요 빌트-인 변수(Built-in variables)는 다음과 같습니다. :
 * 'x', 'y', 'direction', 'moveSpeed', 'moveFrequency', 'opacity'
 *
 * 다음 빌트-인 변수들은 값을 읽을 수만 있습니다. 쓰기 작업은 금지되어있습니다.
 *
 * 'screenX', 'screenY', 'screenZ',
 * 'id',
 * 'name',
 * 'characterName', 'characterIndex'
 *
 * ============================================================================
 * 스크립트 메서드 사용법
 * ============================================================================
 * 이벤트 커맨드 내에서 다음 스크립트를 호출하면 셀프 변수를 사용할 수 있습니다.
 *
 * RS.SelfVariables.setValue(1, '안녕하세요');
 * => '안녕하세요'라는 문자열을 저장합니다.
 *
 * RS.SelfVariables.value(1);
 * => '안녕하세요'라는 문자열이 반환됩니다.
 *
 * -----------------------------------------------------------------------------
 * 셀프 변수를 커먼 이벤트(공통 이벤트)나 전투 이벤트에서 사용하기
 * -----------------------------------------------------------------------------
 * 다음 'Hi, guys' 라는 문자열을 화면에 띄우는 코드입니다.
 *
 * var key = RS.SelfVariables.setValue(1, 'Hi, guys');
 * var s = RS.SelfVariables.value(key);
 * $gameMessage.add(s);
 *
 * 커먼 이벤트와 배틀 이벤트에서는 각각 고유의 키 값을 사용합니다.
 * 하지만 이벤트 내에서 되도록이면 일회용으로 사용하는 것이 적합합니다.
 *
 * 커먼 이벤트와 배틀 이벤트의 고유의 키 값은 다른 맵으로 이동하면 초기값으로
 * 카운터가 자동으로 초기화되게 해놓았기 때문입니다.
 *
 * 하지만 저장된 값까지 사라지진 않습니다,
 *
 * 값을 확인하고 싶은 경우, 아래와 같은 함수로
 * 커먼 이벤트 및 배틀 이벤트에 할당된 키 값을 획득할 수 있습니다.
 *
 * 키 값은 맵 ID와 이벤트 ID에 따라 다릅니다.
 *
 * 다음 메서드는 키 값에서 10000 이상의 정수 값을 검색합니다.
 *
 * $gameSelfVariables.getCurrentMapPointerKeys();
 *
 * 공통 이벤트나 전투 이벤트의 경우의 ID 값이 동일한 경우가 있습니다.
 * 키가 별도의 값을 가질 수 없을 정도로 같아 지기 떄문에 고유의 값을 키에 삽입합니다.
 * 이 고유의 값은 변수의 번호값과 같다고 보시면 됩니다.
 *
 * 커먼 이벤트의 경우, 10000번부터,
 * 배틀 이벤트의 경우, 15000 부터 시작합니다.
 *
 * 획득한 키 값을 for 문이나 forEach로 열거하여 사용하면 편리합니다.
 *
 * ============================================================================
 * 플러그인 명령에 대해...
 * ============================================================================
 * 플러그인 명령은 두 가지가 있습니다.
 *
 * GSV set key value
 * GSV get key
 *
 * 셀프 변수는 'Game_SelfVariables'의 약자인 'GSV'로 값을 쓰거나 읽기가 가능합니다.
 * key 은 정수 값을 적어주시기 바라며, value 에는 정수 값만 올 수 있습니다.
 * 여기에 적힌 값은 정수로 변환되므로, 문자열을 입력하고 싶으신 경우,
 * 스크립트를 사용하셔야 합니다.
 *
 * get 명령의 경우,
 * 'notifying variable number'라는 플러그인 매개변수에
 * 기입한 변수 번호에 해당하는 변수 값에 자동으로 저장됩니다.
 *
 * 다만, 이 기능은 'Save notifying variable'라는 플러그인 매개변수를
 * 'true'로 설정해야 정상적으로 동작합니다.
 *
 * ============================================================================
 * 변동 사항
 * ============================================================================
 * 2016.07.25 (v1.0.0) - First Release.
 * 2017.04.29 (v1.0.1) - Added built-in variables like x, y, direction.
 * 2022.01.12 (v1.0.2) :
 *  - Removed the variable named 'Imported' from the global scope.
 *  - Fixed the plugin structure by adding a new pattern such as '*.mixin' or '*.extend'.
 *  - Removed reserved word named 'var' in this plugin, However some of code block are still use a reserved word named 'var' instead of 'let' or 'const'.
 */

var $gameSelfVariables = null;
var RS = RS || {};
RS.SelfVariables = {};

(() => {
    "use strict";

    let parameters = $plugins.filter((i) => {
        return i.description.contains("<RS_SelfVariables>");
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    RS.SelfVariables.notifyingVarNum = Number(
        parameters["notifying variable number"] || 1
    );
    RS.SelfVariables.saveFlags = Boolean(
        parameters["Save notifying variable"] === "true"
    );
    RS.SelfVariables.nonEventPointer = 10000;
    RS.SelfVariables.length = 10000;
    RS.SelfVariables.battleFlags = 15000;

    /**
     * @class Game_SelfVariables
     */
    class Game_SelfVariables extends Game_Variables {
        constructor() {
            super();
        }

        clear() {
            this._data = {};
        }

        setValue(variableId, value) {
            if (typeof value === "number") {
                value = Math.floor(value);
            }
            this._data[variableId] = value;
            this.onChange();
        }

        value(variableId) {
            return this._data[variableId] || 0;
        }

        getCurrentMapPointerKeys() {
            const keys = Object.keys(this._data);
            const mapId = $gameMap.mapId();
            const result = keys.filter((key) => {
                return key[0] === mapId && key[1] >= RS.SelfVariables.length;
            });
            return result;
        }
    }

    window.Game_SelfVariables = Game_SelfVariables;

    Object.assign(RS.SelfVariables, {
        makeKey(value) {
            const self = $gameMap._interpreter;
            const mapId = $gameMap.mapId();
            const isBattleEvent = $gameParty.inBattle();
            const isReadyNormalEvent =
                self && self._mapId !== 0 && self._eventId !== 0;

            // Notice that the variable named 'key' is the unique value during the game.
            let key;

            if (isReadyNormalEvent) {
                key = [self._mapId, self._eventId, value];
            } else {
                // In case of Battle Events
                if (isBattleEvent) {
                    key = [mapId, this.battleFlags++, value || 0];
                } else {
                    // In case of Common Events
                    key = [mapId, this.nonEventPointer++, value || 0];
                }
            }
            return key;
        },

        setValue(key, value) {
            if (typeof key === "number" || key instanceof Number) {
                key = this.makeKey(key);
            }
            this.setEventProperties(key, value);

            $gameSelfVariables.setValue(key, value);
            return key;
        },

        value(key) {
            if (typeof key === "number" || key instanceof Number) {
                key = this.makeKey(key);
            }

            this.onChangeBuiltInVariable();
            const value = $gameSelfVariables.value(key);

            if (this.saveFlags) {
                $gameVariables.setValue(this.notifyingVarNum, value);
            }

            return value;
        },

        clearPointer() {
            this.nonEventPointer = 10000;
            this.battleFlags = 15000;
        },

        setEventProperties(key, newValue) {
            if ($gameParty.inBattle()) return false;
            if (!this.isValidEventKey(key)) {
                // console.warn(key + " is invalid in an event");
                // console.warn('or '+ key + " value is defined only in an event object, so you cannot change this");
                return false;
            }

            const interpreter = $gameMap._interpreter;
            if (!self) {
                console.warn(
                    "It does not have a instance for the game interpreter."
                );
                return false;
            }

            const eventId = interpreter._eventId;
            let event = undefined;

            if (eventId > 0) {
                event = $gameMap.event(eventId || 0);
            }

            if (!event) {
                console.warn("It couldn't find the event object.");
                return false;
            }

            switch (key) {
                case "direction":
                case "moveSpeed":
                case "moveFrequency":
                case "opacity":
                    const fName = "set".concat(
                        key[0].toUpperCase() + key.substr(1)
                    );
                    let fc = event[fName];
                    if (typeof f === "function") fc(newValue);
                    break;
                case "x":
                    event.locate(newValue, event.y);
                    break;
                case "y":
                    event.locate(event.x, newValue);
                    break;
            }

            return true;
        },

        isValidEventKey(key) {
            const keys = [
                "x",
                "y",
                "direction",
                "tileId",
                "moveSpeed",
                "moveFrequency",
                "opacity",
            ];
            return keys.contains(key);
        },

        onChangeBuiltInVariable() {
            const isBattleEvent = $gameParty.inBattle();
            if (isBattleEvent) return false;
            const interpreter = $gameMap._interpreter;
            const eventId = interpreter._eventId;
            let event = undefined;

            if (eventId > 0) {
                event = $gameMap.event(eventId);
            }

            if (event) {
                this.setValue("x", event.x);
                this.setValue("y", event.y);
                this.setValue("id", event.eventId() || eventId);
                this.setValue("name", event.event().name || "");
                this.setValue("direction", event.direction());
                this.setValue("screenX", event.screenX());
                this.setValue("screenY", event.screenY());
                this.setValue("screenZ", event.screenZ());
                this.setValue("moveSpeed", event.moveSpeed());
                this.setValue("moveFrequency", event.moveFrequency());
                this.setValue("opacity", event.opacity());
                this.setValue("characterName", event.characterName());
                this.setValue("characterIndex", event.characterIndex());
            }
        },
    });

    // Game_Map
    const alias_Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        alias_Game_Map_setup.call(this, mapId);
        RS.SelfVariables.clearPointer();
    };

    // DataManager
    const alias_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        alias_DataManager_createGameObjects.call(this);
        $gameSelfVariables = new Game_SelfVariables();
    };

    const alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = alias_DataManager_makeSaveContents.call(this);
        contents.selfVariables = $gameSelfVariables;
        return contents;
    };

    const alias_DataManager_extractSaveContents =
        DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        alias_DataManager_extractSaveContents.call(this, contents);
        $gameSelfVariables = contents.selfVariables;
    };

    // Game_Interpreter
    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "GSV") {
            switch (args[0]) {
                case "set":
                    {
                        const key = RS.SelfVariables.makeKey(
                            Number(args[1] || 0)
                        );
                        const value = Number(args.slice(2).join(" ") || 0);
                        RS.SelfVariables.setValue(key, value);
                    }
                    break;
                case "get":
                    {
                        const key = RS.SelfVariables.makeKey(
                            Number(args[1] || 0)
                        );
                        RS.SelfVariables.value(key);
                    }
                    break;
            }
        }
    };
})();
