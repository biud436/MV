/*:
 * @plugindesc This plugin allows you to change the pause position <RS_WindowPauseSprite>
 * @author biud436
 * 
 * @param pauseX
 * @text pauseX
 * @desc
 * @default this.width - padding;
 * 
 * @param pauseY
 * @text pauseY
 * @desc 
 * @default this.height;
 * 
 * @help
 * ==============================================================
 * Version Log
 * ==============================================================
 * 2019.05.06 (v1.0.0) - First Relase.
 */

var Imported = Imported || {};
Imported.RS_WindowPauseSprite = true;

var RS = RS || {};
RS.WindowPauseSprite = RS.WindowPauseSprite || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_WindowPauseSprite>');
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
    
})(RS.WindowPauseSprite);