//================================================================
// RS_ChoicePosition.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to set up the position of choice list window.
 * @author biud436
 *
 * @param x
 * @type number
 * @desc Specify the x position for choices window
 * @default 0
 *
 * @param y
 * @type number
 * @desc Specify the y position for choices window
 * @default 0
 *
 * @param Auto Disable
 * @type boolean
 * @desc This plugin will be deactived after moving choice window to target area
 * @default false
 * @on true
 * @off false
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 *
 * The command called 'Choice pos' is possible to place the choice window to the certain 
 * coordinates on the screen.
 * 
 * Choice pos x y
 *      - x or y : Specify the screen coordinates..
 * 
 * This will be going to move the location of the choice window to the position of specific event
 * or player characters.
 * 
 * Choice pos event id
 *      - id : Specify the number that starts with from 1.
 * 
 * Choice pos player
 * 
 * To place the choice window on the center of the screen, Try to this.
 * 
 * Choice pos center
 * 
 * This can restore the position of the choice window to original position.
 * 
 * Choice enable
 * Choice disable
 * 
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.02.03 (v1.0.1) :
 * - Added the function allows the choice window to move linearly from a current position to the destination.
 * - It could automatically set the position of the choice window when the player is loading the save data.
 * 2017.02.08 (v1.0.2) :
 * - Optimized for motion.
 * 2017.09.24 (v1.0.3) :
 * - Fixed the bug that is not working the plugin command named 'Choice pos'
 * 2018.12.15 (v1.0.4) :
 * - Fixed the bug that couldn't find the variable called 'messagY'
 * 2019.09.11 (v1.0.5) :
 * - Fixed the bug that is not working the plugin command called 'Choice pos event id'
 * - Added the new feature that can change the position of the choice window on the center of the screen.
 * 2019.10.21 (v1.0.6) : 
 * - Fixed the performance penalty issue.
 */
/*:ko
 * @plugindesc This plugin allows you to set up the position of choice list window.
 * @author biud436
 *
 * @param x
 * @type number
 * @desc Specify the x position for choices window
 * @default 0
 *
 * @param y
 * @type number
 * @desc Specify the y position for choices window
 * @default 0
 *
 * @param Auto Disable
 * @type boolean
 * @desc This plugin will be deactived after moving choice window to target area
 * @default false
 * @on true
 * @off false
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 *
 * Choice pos 명령어는 특정 좌표에 선택지 윈도우를 배치할 수 있는 명령입니다.
 * 
 * Choice pos x y
 * 
 * 선택지 윈도우가 이벤트나 플레이어를 따라갑니다.
 * 
 * Choice pos event id
 * Choice pos player
 * 
 * 다음 플러그인 명령을 사용하여 화면 중앙에 선택지 윈도우를 위치시킬 수 있습니다.
 * 
 * Choice pos center
 * 
 * 토글 명령어로 이 플러그인을 사용하지 않았을 때의 이전 위치로 되돌릴 수 있습니다.
 * 
 * Choice enable
 * Choice disable
 * 
 */

var Imported = Imported || {};
Imported.RS_ChoicePosition = true;

(function() {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_ChoicePosition>');
    });
      
    parameters = (parameters.length > 0) && parameters[0].parameters;

    var mx = Number(parameters['x']);
    var my = Number(parameters['y']);
    var isAudoDisable = Boolean(parameters['Auto Disable'] === 'true');

    //============================================================================
    // Window_ChoiceList
    //============================================================================    
    
    var alias_Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
    Window_ChoiceList.prototype.initialize = function(messageWindow) {
        alias_Window_ChoiceList_initialize.call(this, messageWindow);
        this._prevTime = performance.now();
    };

    var alias_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function() {
        this._prevTime = performance.now();
        alias_Window_ChoiceList_start.call(this);
        this.prepareTransform();
    };

    Window_ChoiceList.prototype.prepareTransform = function() {
        this.width = this.windowWidth();
        this.height = this.windowHeight();
    };

    var alias_Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function() {
        alias_Window_ChoiceList_updatePlacement.call(this);
        if($gameSystem.isChoiceMoveable()) this.updateCustomPosition();
    };
    
    Window_ChoiceList.prototype.updateCustomPosition = function() {
        
        var position = $gameSystem.getChoicePosition();
        var mx = position.x;
        var my = position.y;
        
        if(!mx) mx = this.getChoiceX();
        if(!my) my = this.getChoiceY();

        if(position.dirty) {
            this.setCenteredChoiceWindow();
        } else {
            this.moveLenear( mx, my );
        }
    };

    Window_ChoiceList.prototype.setCenteredChoiceWindow = function() {      
        var cw = this.windowWidth() * 0.5;
        var ch = this.windowHeight() * 0.5;
        var cx = Graphics.boxWidth * 0.5;
        var cy = Graphics.boxHeight * 0.5;
        var mx = cx - cw;
        var my = cy - ch;

        this.moveLenear(mx, my);
        
    };
    
    Window_ChoiceList.prototype.moveLenear = function (tx, ty) {
        if(this.x >= tx - 0.001 && this.y >= ty - 0.001 && isAudoDisable) {
            $gameSystem.setChoiceMoveable(false);
        }
        var t = performance.now();
        var dt =  (t - this._prevTime) / 1000.0;
        this.x = this.x + dt * (tx - this.x);
        this.y = this.y + dt * (ty - this.y);
        this._prevTime = t;
    };
    
    Window_ChoiceList.prototype.getChoiceX = function () {

        var x = 0;
        var type = $gameMessage.choicePositionType();

        switch (type) {
            case 0:
                x = 0;
                break;
            case 1:
                x = (Graphics.boxWidth - this.width) / 2;
                break;
            case 2:
                x = Graphics.boxWidth - this.width;
                break;
        }

        return x;

    };
    
    Window_ChoiceList.prototype.getChoiceY = function () {
        
        var messageY = this._messageWindow.y;
        
        var y = 0;

        if (messageY >= Graphics.boxHeight / 2) {

            y = messageY - this.height;

        } else {

            y = messageY + this._messageWindow.height;

        }

        return y;
    };
    
    var alias_Window_ChoiceList_update = Window_ChoiceList.prototype.update;
    Window_ChoiceList.prototype.update = function () {
        alias_Window_ChoiceList_update.call(this);
        if($gameMessage.choices().length > 0 && $gameSystem.isChoiceMoveable()) {
            this.updatePlacement();
        }
    };
    //===========================================================================
    // ChoiceTMatrix
    //===========================================================================

    class ChoiceTMatrix extends Point {
        constructor(x, y, dirty = false) {
            super(x, y);
            this.dirty = dirty;
        }
    }
    
    //===========================================================================
    // Game_Temp
    //===========================================================================
    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        alias_Game_System_initialize.call(this);
        this._isChoiceMoveable = false;
        this.initWithChoiceMatrix();
    };

    Game_System.prototype.initWithChoiceMatrix = function() {
        this._choiceWindowTempPosition = new ChoiceTMatrix(0, 0);
    };
    
    Game_System.prototype.getChoicePosition = function () {
        if(!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
        return this._choiceWindowTempPosition;
    };

    Game_System.prototype.setChoiceDirty = function(flag) {
        if(!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
        this._choiceWindowTempPosition.dirty = flag;
    };

    Game_System.prototype.setCenteredChoiceWindow = function() {
        if(!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
        this.setChoiceDirty(true);
    };

    Game_System.prototype.setDefaultChoiceWindow = function() {
        if(!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
        this._choiceWindowTempPosition.x = null;
        this._choiceWindowTempPosition.y = null;
        this.setChoiceDirty(false);
    };
    
    Game_System.prototype.setChoiceWindowPos = function () {
        if(!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
        
        var argc = arguments.length;
        var args = arguments;

        if(argc <= 0) return;

        this.setChoiceDirty(false);

        if(argc === 1) {

            var param = args[0];
            
            // if the parameter is the same as 'center'?
            if(typeof(param) === "string" && param.toLowerCase() === "center") {
                return this.setCenteredChoiceWindow();
            }

            var id = parseInt(param);

            if($gameParty.inBattle()) {
                return this.setDefaultChoiceWindow();
            } else {
                switch(id) {
                    case -1:
                        this._choiceWindowTempPosition.x = $gamePlayer.screenX();
                        this._choiceWindowTempPosition.y = $gamePlayer.screenY();        
                        break;
                    default:
                        if(id === 0) return;
                        var maybeEvent = $gameMap.event(id);
                        if(maybeEvent instanceof Game_Event) {
                            this._choiceWindowTempPosition.x = maybeEvent.screenX();
                            this._choiceWindowTempPosition.y = maybeEvent.screenY();
                        }                    
                        break;
                }    
            }


        } else {
            this._choiceWindowTempPosition.x = arguments[0];
            this._choiceWindowTempPosition.y = arguments[1];
        }
        
    };
    
    Game_System.prototype.setChoiceMoveable = function (enabled) {
        this._isChoiceMoveable = enabled;
    };
    
    Game_System.prototype.isChoiceMoveable = function () {
        return this._isChoiceMoveable;
    };
    
    //===========================================================================
    // Game_Interpreter
    //===========================================================================
    
    /**
    * @method placeChoiceWindow
    * @param {Array} args passes the parameters of the plugin command.
    */
    Game_Interpreter.prototype.placeChoiceWindow = function(args) {
        switch(args[0]) {
            case 'pos':
            switch (args[1]) {
                case 'event':
                    $gameSystem.setChoiceWindowPos(Number(args[2]));
                    break;
                case 'player':
                    $gameSystem.setChoiceWindowPos(-1);
                    break;
                case 'center':
                    $gameSystem.setChoiceWindowPos('center');
                    break;
                default:
                    $gameSystem.setChoiceWindowPos(Number(args[1]), Number(args[2]));
            }
            break;
            case 'enable':
                $gameSystem.setChoiceMoveable(true);
                break;
            case 'disable':
                $gameSystem.setChoiceMoveable(false);
                break;
        }
    };
    
    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "Choice") this.placeChoiceWindow(args);
    };
    
})()
