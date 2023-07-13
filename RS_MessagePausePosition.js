/* eslint-disable no-eval */
//================================================================
// RS_MessagePausePosition.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to change the pause position <RS_MessagePausePosition>
 * @author biud436
 *
 * @param pauseX
 * @text pauseX
 * @desc Specify the posotion to x.
 * (Note that this will be evaluant as the Javascript)
 * @default this.width / 2
 *
 * @param pauseY
 * @text pauseY
 * @desc Specify the posotion to y.
 * (Note that this will be evaluant as the Javascript)
 * @default this.height;
 *
 * @help
 * ==============================================================
 * Usage
 * ==============================================================
 * In the plugin parameters, You had set x and y values of our pause sign sprite.
 * So you could then use to pass them into message system's update method.
 * The x and y values for pause sprite we used can be represented using a Cartesian coordinate system.
 *
 * if you set the plugin parameter named pauseX as follows,
 * you will set the pause sign image's position to the bottom-middle of our message system.
 *
 * this.width / 2
 *
 * if you set the plugin parameter named pauseX as follows,
 * you will set the pause sign image's position to the right-bottom of our message system.
 *
 * this.width - padding;
 *
 * if you set the plugin parameter named pauseX as follows,
 * you will set the pause sign image's position to the left-bottom of our message system.
 *
 * padding;
 *
 * To change its position during the game, you can use the global variables, as follows.
 *
 * RS.MessagePausePosition.Params.pauseX = "this.width / 2";
 * RS.MessagePausePosition.Params.pauseY = "this.height";
 *
 * or you can use plugin commands, as follows.
 *
 * ChangePauseSpriteX this.width / 2
 * ChangePauseSpriteY this.height
 *
 * ==============================================================
 * Version Log
 * ==============================================================
 * 2019.05.06 (v1.0.0) - First Relase.
 * 2019.08.26 (v1.0.1) :
 * - Fixed the issue that the pause sprite is moving to original position in the balloon mode.
 * - Fixed the issue that the variables named tx, ty are not defined.
 */
/*:ko
 * @plugindesc Pause 스프라이트의 위치를 변경합니다. <RS_MessagePausePosition>
 * @author biud436
 *
 * @param pauseX
 * @text X 좌표
 * @desc
 * @default this.width / 2;
 *
 * @param pauseY
 * @text Y 좌표
 * @desc
 * @default this.height;
 *
 * @help
 * ==============================================================
 * 사용법
 * ==============================================================
 *
 * 중앙 아래에 위치시키려면 X 좌표를 다음과 같이 설정하세요.
 *
 * this.width / 2
 *
 * 오른쪽 아래에 위치시키려면 X 좌표를 다음과 같이 설정하세요.
 *
 * this.width - (padding);
 *
 * 왼쪽 아래에 위치시키려면 X 좌표를 다음과 같이 설정하세요.
 *
 * padding;
 *
 * ==============================================================
 * Version Log
 * ==============================================================
 * 2019.05.06 (v1.0.0) - First Relase.
 * 2019.08.26 (v1.0.1) :
 * - 한글 메시지 시스템에서 tx, ty가 정의되지 않았다고 나오는 오류를 수정하였습니다.
 * - 한글 메시지 시스템의 말풍선 모드에서 제대로 동작하지 않는 문제를 수정하였습니다.
 * 2023.07.13 (v1.0.2) : Converted to ES6 (Const/Let, Arrow Function)
 */

// eslint-disable-next-line no-var
var Imported = Imported || {};
Imported.RS_MessagePausePosition = true;

RS = window.RS || {};
RS.MessagePausePosition = RS.MessagePausePosition || {};

(function ($) {
    'use strict';

    let parameters = $plugins.filter(i => {
        return i.description.contains('<RS_MessagePausePosition>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    $.Params = {};
    $.Params.pauseX = parameters.pauseX;
    $.Params.pauseY = parameters.pauseY;

    const alias_Window_Message_updatePlacement =
        Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function () {
        alias_Window_Message_updatePlacement.call(this);
        this.updatePauseSprite();
    };

    Window_Message.prototype.updatePauseSprite = function () {
        const tx = eval($.Params.pauseX);
        const ty = eval($.Params.pauseY);

        this._windowPauseSignSprite.move(tx, ty);
    };

    if (Imported.RS_MessageSystem) {
        Window_Message.prototype.updateSubBalloonElements = function (data) {
            data.tx = eval($.Params.pauseX);
            data.ty = eval($.Params.pauseY);

            this._windowPauseSignSprite.move(data.tx, data.ty);
            this._windowPauseSignSprite.scale.y = data.scaleY;
            this._nameWindow.y = data.ny;
        };

        Window_Message.prototype.resetFontSettings = function () {
            Window_Base.prototype.resetFontSettings.call(this);
            this.contents.fontBold = false;
            this.contents.fontItalic = false;
            this.contents.outlineWidth =
                RS.MessageSystem.Params.defaultOutlineWidth;
            this.contents.outlineColor =
                RS.MessageSystem.Params.defaultOutlineColor;
            this.contents.fontGradient = false;
            this.contents.highlightTextColor = null;

            let ty = this._height;

            tx = eval($.Params.pauseX);
            ty = eval($.Params.pauseY);

            this._windowPauseSignSprite.move(tx, ty);
            this._windowPauseSignSprite.scale.y = 1;
            $gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed);
        };
    }

    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ChangePauseSpriteX') {
            const evaluantValue = args.join('');
            $.Params.pauseX = evaluantValue;
        }
        if (command === 'ChangePauseSpriteY') {
            const evaluantValue = args.join('');
            $.Params.pauseY = evaluantValue;
        }
    };
})(RS.MessagePausePosition);
