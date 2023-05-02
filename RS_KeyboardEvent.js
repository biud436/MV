//================================================================
// RS_KeyboardEvent.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:ko
 * @target MZ
 * @plugindesc (v1.01) 수동으로 키보드 이벤트를 만들고 브라우저에 키보드 입력 이벤트를 보냅니다.
 * @author biud436
 * @url https://biud436.blog.me
 *
 * @help
 * =============================================================================
 * 소개
 * ============================================================================= *
 * 실제 키를 입력된 것처럼 가상의 키보드 입력 매크로를 만듭니다.
 *
 * =============================================================================
 * 플러그인 커맨드
 * =============================================================================
 * - 'keyCode' 인자 값은 0x58 또는 80처럼 16진수 또는 10진수 값이여야 합니다.
 * - 'keyName' 인자 값은 Input.keyMapper에서 찾을 수없는 문자열 값이어야 합니다.
 *
 * - 사용자가 Input 클래스의 주요 로직에 가상 키 코드를 보낼 수있게 하는 명령입니다.
 * KeyEvent executeString keyName
 * KeyEvent executeKey keyCode
 *
 * - 이 명령은 사용자가 Input 클래스에 새로운 가상 키 코드를 추가 할 수있게합니다.
 * KeyEvent addNewKey keyCode keyName
 *
 * - 예제 코드는 다음과 같습니다.
 * KeyEvent executeString left
 * KeyEvent executeString escape
 * KeyEvent executeKey 0x58
 * KeyEvent addNewKey 0x50 p
 * =============================================================================
 * 스크립트 호출
 * =============================================================================
 * 두 가지 자바스크립트 함수가 있습니다.
 *
 *  함수는 Input 클래스의 주요 로직에 가상 키 코드를 보낼 수있게합니다.
 *
 * Input._makeKeyTiming(keyCode);
 *
 * 이 함수는 사용자가 Input 클래스에 새로운 가상 키 코드를 추가 할 수있게 합니다.
 * Input 클래스의 keyMapper는 JSON 객체이며, 키와 값을 쌍으로 갖습니다.
 *
 * - 'keyCode' 인자 값은 0x58 또는 80처럼 16진수 또는 10진수 값이여야 합니다.
 * - 'keyName' 인자 값은 Input.keyMapper에서 찾을 수없는 문자열 값이어야 합니다.
 *
 * 성공하면 키 값과 버튼의 이름을 담고 있는 JSON 객체가 콜백 함수에 전달됩니다.
 *
 * Input._executeJson(keyCode, keyName, func);
 *
 * - 다음은 예제 코드입니다.
 * Input._makeKeyTiming('left');
 * Input._makeKeyTiming('escape');
 * Input._makeKeyTiming('down');
 * Input._makeKeyTiming('control');
 * Input._makeKeyTiming(116);
 *
 *
 * 아래 콜백 함수의 첫 번째 인자 값 retObj은 {0x58: 'p'}입니다.
 *
 * Input._executeJson(0x58, 'p', function (retObj) {
 *   Object.assign(Input.keyMapper, retObj);
 * });
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.01.02 (v1.0.0) - First Release.
 * 2017.03.03 (v1.0.1) - Added new function that can add new keyCode.
 *
 * =============================================================================
 * Commands
 * =============================================================================
 * @command executeString
 * @desc
 *
 * @args keyCode
 * @type number
 * @desc Specify the key code as you want
 * @default 0
 *
 * @command executeKey
 * @desc
 *
 * @args keyCode
 * @type number
 * @desc Specify the key code as you want
 * @default 0
 *
 * @command addNewKey
 * @desc
 *
 * @args keyInt
 * @type number
 * @desc Specify the key code.
 * @default 0
 *
 * @args keyName
 * @type string
 * @desc Specify the key name.
 * @default keyName
 *
 */
/*:
 * @target MZ
 * @plugindesc (v1.01) This plugin allows you to send keyboard input events manually.
 * @author biud436
 * @url https://biud436.blog.me
 * @help
 * =============================================================================
 * Introduction
 * ============================================================================= *
 * This plugin can process a keyboard event without pressing a real button within a keyboard.
 *
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * - 'keyCode' must be number type like as 0x58 or 80
 * - 'keyName' should be the value for a strings that could not found in Input.keyMapper
 *
 * - These commands allow user to send a virtual key code in main logic of Input class.
 * KeyEvent executeString keyName
 * KeyEvent executeKey keyCode
 *
 * - This command allows user to add a new virtual key code in global Input class.
 * KeyEvent addNewKey keyCode keyName
 *
 * - There are example codes at the next line.
 * KeyEvent executeString left
 * KeyEvent executeString escape
 * KeyEvent executeKey 0x58
 * KeyEvent addNewKey 0x50 p
 * =============================================================================
 * Script Calls
 * =============================================================================
 * Here's two javascript functions.
 *
 * - This function allows user to send a virtual key code in main logic of Input class.
 *
 * Input._makeKeyTiming(keyCode);
 *
 * - This function allows user to add a new virtual key code in global Input class.
 * 'keyCode' must be number type like as 0x58 or 80
 * 'keyName' should be the value for a strings that could not found in Input.keyMapper
 * 'func' object has executed if JSON object is successfully created.
 * The first parameter of the callback function is the JSON object that created at the caller.
 *
 * Input._executeJson(keyCode, keyName, func);
 *
 * - There are example codes at the next line.
 * Input._makeKeyTiming('left');
 * Input._makeKeyTiming('escape');
 * Input._makeKeyTiming('down');
 * Input._makeKeyTiming('control');
 * Input._makeKeyTiming(116);
 * Input._executeJson(0x58, 'p', function (retObj) {
 *   Object.assign(Input.keyMapper, retObj);
 * });
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.01.02 (v1.0.0) - First Release.
 * 2017.03.03 (v1.0.1) - Added new function that can add new keyCode.
 *
 * =============================================================================
 * Commands
 * =============================================================================
 * @command executeString
 * @desc
 *
 * @args keyCode
 * @type number
 * @desc Specify the key code as you want
 * @default 0
 *
 * @command executeKey
 * @desc
 *
 * @args keyCode
 * @type number
 * @desc Specify the key code as you want
 * @default 0
 *
 * @command addNewKey
 * @desc
 *
 * @args keyInt
 * @type number
 * @desc Specify the key code.
 * @default 0
 *
 * @args keyName
 * @type string
 * @desc Specify the key name.
 * @default keyName
 */
(function () {
    'use strict';

    Input._startTime = 0;

    Input._makeKeyEvent = function (type, keyCode) {
        const isShift = Boolean(keyCode === 0x10);
        const isCtrl = Boolean(keyCode === 0x11);
        const isAlt = Boolean(keyCode === 0x12);
        const evt = new KeyboardEvent(type, {
            bubbles: true,
            shiftKey: isShift,
            ctrlKey: isCtrl,
            altKey: isAlt,
        });
        Object.defineProperty(evt, 'keyCode', {
            get() {
                return keyCode;
            },
        });
        document.dispatchEvent(evt);
    };

    /**
     * Swap between key/value
     * @param {String}
     * @return {Number | undefined | null}
     */
    Input._makeVirtualKey = function (keyCode) {
        if (typeof keyCode === 'string') {
            const tempMapper = [];
            let vkCode = 0;
            let mapper = JsonEx.makeDeepCopy(Input.keyMapper);
            const { length } = Object.keys(mapper);
            const keys = Object.keys(mapper);
            for (let i = 0; i < length; i++) {
                tempMapper[mapper[keys[i]]] = keys[i];
            }
            mapper = null;
            vkCode = tempMapper[keyCode];

            return vkCode;
        }

        return null;
    };

    Input._makeKeyTiming = function (keyCode) {
        if (typeof keyCode === 'string') {
            keyCode = this._makeVirtualKey(keyCode);
        }
        requestAnimationFrame(function (timestamp) {
            Input._startTime = timestamp;
            const progress = timestamp - Input._startTime;
            Input._makeKeyEvent('keydown', keyCode);
            if (progress < 2000) {
                requestAnimationFrame(function () {
                    Input._makeKeyEvent('keyup', keyCode);
                });
            }
        });
    };

    Input._executeJson = function (keyInt, keyName, func) {
        let retObj;
        let type;

        const json = {
            keyInt: keyName,
        };
        if (typeof json === 'object') {
            retObj = JSON.parse(json);
        }
        if (retObj) {
            type = Object.keys(retObj);
            if (typeof type[0] === 'number') {
                if (typeof func === 'function') {
                    func(retObj);
                }
            }
        }
    };

    //============================================================================
    // Game_Interpreter
    //============================================================================

    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'KeyEvent') {
            // eslint-disable-next-line default-case
            switch (args[0]) {
                case 'executeString':
                    {
                        const keyCode = Input._makeVirtualKey(args[1]) || 0;
                        Input._makeKeyTiming(keyCode);
                    }
                    break;
                case 'executeKey':
                    {
                        const keyCode = parseInt(args[1] || 0, 10);
                        Input._makeKeyTiming(keyCode);
                    }
                    break;
                case 'addNewKey':
                    Input._executeJson(
                        parseInt(args[1], 10),
                        args[2],
                        function (retObj) {
                            Object.assign(Input.keyMapper, retObj);
                        }
                    );
                    break;
            }
        }
    };

    (() => {
        if (Utils.RPGMAKER_NAME === 'MZ') {
            // 플러그인의 이름을 가져옵니다.
            const pluginName = 'RS_KeyboardEvent';

            const pluginCommands = {
                executeString: args => {
                    const keyCode = Input._makeVirtualKey(args.keyCode) || 0;
                    Input._makeKeyTiming(keyCode);
                },
                executeKey: args => {
                    const keyCode = parseInt(args.keyCode || 0, 10);
                    Input._makeKeyTiming(keyCode);
                },
                addNewKey: args => {
                    Input._executeJson(
                        parseInt(args.keyInt, 10),
                        args.keyName,
                        function (retObj) {
                            Object.assign(Input.keyMapper, retObj);
                        }
                    );
                },
            };

            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (const i in pluginCommands) {
                PluginManager.registerCommand(pluginName, i, pluginCommands[i]);
            }
        }
    })();
})();
