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
 * @default this.height - padding;
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
 * @default this.height - padding;
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
 */

var Imported = Imported || {};
Imported.RS_MessagePausePosition = true;

var RS = RS || {};
RS.MessagePausePosition = RS.MessagePausePosition || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_MessagePausePosition>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;
    
    $.Params = {};
    $.Params.pauseX = parameters["pauseX"];
    $.Params.pauseY = parameters["pauseY"];

    var alias_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement
    Window_Message.prototype.updatePlacement = function() {
        alias_Window_Message_updatePlacement.call(this);
        this.updatePauseSprite();
    };

    Window_Message.prototype.updatePauseSprite = function() {
        var tx, ty;

        var padding = this.standardPadding();
        tx = eval($.Params.pauseX);
        ty = eval($.Params.pauseY);

        this._windowPauseSignSprite.move(tx, ty);
    };

    if(Imported.RS_MessageSystem) {

        Window_Message.prototype.updateSubBalloonElements = function (data) {

            var padding = this.standardPadding();

            if($gameMessage.getBalloon() === -2) {
                data.tx = eval($.Params.pauseX);
                data.ty = eval($.Params.pauseY);
            }

            this._windowPauseSignSprite.move(tx, ty);
            this._windowPauseSignSprite.scale.y = data.scaleY;
            this._nameWindow.y = data.ny;
            
            this.startWait(1);
        };    

        Window_Message.prototype.resetFontSettings = function() {
            Window_Base.prototype.resetFontSettings.call(this);
            this.contents.fontBold = false;
            this.contents.fontItalic = false;
            this.contents.outlineWidth = RS.MessageSystem.Params.defaultOutlineWidth;
            this.contents.outlineColor = RS.MessageSystem.Params.defaultOutlineColor;
            this.contents.fontGradient = false;
            this.contents.highlightTextColor = null;

            var padding = this.standardPadding();
            var tx = this._width / 2;
            var ty = this._height;

            if($gameMessage.getBalloon() === -2) {
                tx = eval($.Params.pauseX);
                ty = eval($.Params.pauseY);
            }

            this._windowPauseSignSprite.move(tx, ty);
            this._windowPauseSignSprite.scale.y = 1;
            $gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed);
          };        
    
    }

    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command == "ChangePauseSpriteX") {
            var evaluantValue = args.join("");
            $.Params.pauseX = evaluantValue;
        }
        if(command == "ChangePauseSpriteY") {
            var evaluantValue = args.join("");
            $.Params.pauseY = evaluantValue;
        }        
    };
    
})(RS.MessagePausePosition);