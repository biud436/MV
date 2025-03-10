//================================================================
// RS_ChoicePosition.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to set up the position of choice list window. <RS_ChoicePosition>
 * @author biud436
 *
 * @param Auto Disable
 * @type boolean
 * @desc This plugin will be deactived after moving choice window to target area
 * @default false
 * @on true
 * @off false
 *
 * @param Interpolation Formula
 * @desc it's result is the number between 0.0 and 1.0
 * @default (t - this._prevTime) / 1000.0;
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
 *      - x or y : Specify the screen coordinates.
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
 * To enable the custom position,
 * First Up, Notice that you must call the plugin command named "Choice enable"
 *
 * =============================================================================
 * Text Code
 * =============================================================================
 * In this section, it describes text codes can use in the message window.
 *
 * \CC          : Changes the position of choices window with center of screen.
 *
 * \CE          : Activates the logic that can change the position of choice window
 * as the custom position.
 *
 * \CD          : Changes the position of Choice Window with original position.
 *
 * \CP<x,y>     : Changes the position of choice window as the custom position.
 *
 *                  - x is the number between 0 and Graphics.boxWidth.
 *                  - y is the number between 0 and Graphics.boxHeight.
 *
 * \CP<eventId> : Changes the position of choice window as a certain event's
 * screen position.
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
 * 2020.03.30 (v1.0.9) :
 * - Fixed the bug that sets the original position before getting a new position.
 * - Added text codes that can use in the message window.
 * - Fixed the bug that is not working plugin parameters.
 * - Added a new plugin parameter that can change the interpolation formula.
 * - Fixed the bug that is not showing the text content when indicating the first message.
 * 2020.03.31 (v1.0.10) :
 * - Fixed the bug that is not working default text codes.
 */
/*:ko
 * @plugindesc 선택지 윈도우의 위치를 변경하는 플러그인입니다. <RS_ChoicePosition>
 * @author 러닝은빛
 *
 * @param Auto Disable
 * @text 자동 비활성화
 * @type boolean
 * @desc 한 번 위치를 변경한 후, 원래 선택지 위치로 재설정합니다.
 * @default false
 * @on true
 * @off false
 *
 * @param Interpolation Formula
 * @text 보간 공식
 * @desc 시간에 따른 이동 공식으로, 0 ~ 1 사이의 실수입니다.
 * @default (t - this._prevTime) / 1000.0;
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
 * 처음에는 선택지 창의 커스텀 위치 설정 기능이 비활성화 상태입니다.
 * 설정한 커스텀 위치로 옮기고 싶다면 "Choice enable"을 호출하세요.
 *
 * =============================================================================
 * 텍스트 코드 (제어 문자)
 * =============================================================================
 * 메시지 창에서 다음과 같은 텍스트 코드로 위치를 제어할 수 있습니다.
 *
 * \CC          : 화면 중앙으로
 * \CE          : 활성화
 * \CD          : 비활성화 (원래 위치로)
 * \CP<x,y>     : 특정 좌표로
 * \CP<eventId> : 특정 이벤트의 위치로
 *
 */

var Imported = Imported || {};
Imported.RS_ChoicePosition = true;

var RS = RS || {};
RS.ChoicePosition = RS.ChoicePosition || {};

(function () {
  'use strict';

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ChoicePosition>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  RS.ChoicePosition = {
    Params: {
      isAutoDisable: Boolean(parameters['Auto Disable'] === 'true'),
      interpolationFormula: parameters['Interpolation Formula'],
    },
  };

  //============================================================================
  // Window_ChoiceList
  //============================================================================

  var alias_Window_ChoiceList_initialize =
    Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function (messageWindow) {
    alias_Window_ChoiceList_initialize.call(this, messageWindow);
    this._prevTime = performance.now();
  };

  var alias_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function () {
    this._prevTime = performance.now();
    alias_Window_ChoiceList_start.call(this);
  };

  Window_ChoiceList.prototype.prepareTransform = function () {
    this.width = this.windowWidth();
    this.height = this.windowHeight();
  };

  var alias_Window_ChoiceList_updatePlacement =
    Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function () {
    this.prepareTransform();
    if ($gameSystem.isChoiceMoveable()) {
      this.updateCustomPosition();
    } else {
      alias_Window_ChoiceList_updatePlacement.call(this);
    }
  };

  Window_ChoiceList.prototype.updateCustomPosition = function () {
    var position = $gameSystem.getChoicePosition();
    var mx = position.x || 0;
    var my = position.y || 0;

    if (!mx) mx = this.getChoiceX();
    if (!my) my = this.getChoiceY();

    if (position.dirty) {
      this.setCenteredChoiceWindow();
    } else {
      this.moveLenear(mx, my);
    }
  };

  Window_ChoiceList.prototype.setCenteredChoiceWindow = function () {
    var cw = this.windowWidth() * 0.5;
    var ch = this.windowHeight() * 0.5;
    var cx = Graphics.boxWidth * 0.5;
    var cy = Graphics.boxHeight * 0.5;
    var mx = cx - cw;
    var my = cy - ch;

    this.moveLenear(mx, my);
  };

  Window_ChoiceList.prototype.moveLenear = function (tx, ty) {
    if (
      this.x >= tx - 0.001 &&
      this.y >= ty - 0.001 &&
      RS.ChoicePosition.Params.isAutoDisable
    ) {
      $gameSystem.setChoiceMoveable(false);
    }
    var t = performance.now();
    var dt = 1.0;

    try {
      dt = eval(RS.ChoicePosition.Params.interpolationFormula);
    } catch (e) {
      dt = (t - this._prevTime) / 1000.0;
    }

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
    if ($gameMessage.choices().length <= 0) return;
    this.updatePlacement();
  };

  //===========================================================================
  // ChoiceTMatrix
  //===========================================================================

  class ChoiceTMatrix extends Point {
    constructor(x, y, dirty) {
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

  Game_System.prototype.initWithChoiceMatrix = function () {
    this._choiceWindowTempPosition = new ChoiceTMatrix(0, 0);
  };

  Game_System.prototype.getChoicePosition = function () {
    if (!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
    return this._choiceWindowTempPosition;
  };

  Game_System.prototype.setChoiceDirty = function (flag) {
    if (!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
    this._choiceWindowTempPosition.dirty = flag;
  };

  Game_System.prototype.setCenteredChoiceWindow = function () {
    if (!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
    this.setChoiceDirty(true);
  };

  Game_System.prototype.setDefaultChoiceWindow = function () {
    if (!this._choiceWindowTempPosition) this.initWithChoiceMatrix();
    this._choiceWindowTempPosition.x = null;
    this._choiceWindowTempPosition.y = null;
    this.setChoiceDirty(false);
  };

  Game_System.prototype.setChoiceWindowPos = function () {
    if (!this._choiceWindowTempPosition) this.initWithChoiceMatrix();

    var argc = arguments.length;
    var args = arguments;

    if (argc <= 0) return;

    this.setChoiceDirty(false);

    if (argc === 1) {
      var param = args[0];

      // if the parameter is the same as 'center'?
      if (typeof param === 'string' && param.toLowerCase() === 'center') {
        return this.setCenteredChoiceWindow();
      }

      var id = parseInt(param);

      if ($gameParty.inBattle()) {
        return this.setDefaultChoiceWindow();
      } else {
        switch (id) {
          case -1:
            this._choiceWindowTempPosition.x = $gamePlayer.screenX();
            this._choiceWindowTempPosition.y = $gamePlayer.screenY();
            break;
          default:
            if (id === 0) return;
            var maybeEvent = $gameMap.event(id);
            if (maybeEvent instanceof Game_Event) {
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
  // Window_Message
  //===========================================================================

  Window_Message.prototype.obtainChoiceParameters = function (textState) {
    var arr = /\<(.+?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return '';
    }
  };

  var alias_Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
      case 'CC': //! \CC
        $gameSystem.setChoiceWindowPos('center');
        break;
      case 'CE': //! \CE
        $gameSystem.setChoiceMoveable(true);
        break;
      case 'CD': //! \CD
        $gameSystem.setChoiceMoveable(false);
        break;
      case 'CP': //! \CP<x,y> \CP<eventId>
        var method = this.obtainChoiceParameters(textState);
        var args = method.split(',').map(function (e) {
          return parseInt(e.trim());
        }, this);
        $gameSystem.setChoiceWindowPos.apply($gameSystem, args);
        break;
      default:
        alias_Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  /**
   * @method placeChoiceWindow
   * @param {Array} args passes the parameters of the plugin command.
   */
  Game_Interpreter.prototype.placeChoiceWindow = function (args) {
    switch (args[0]) {
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

  var alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'Choice') this.placeChoiceWindow(args);
  };
})();
