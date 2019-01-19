/*:
 * @plugindesc <RS_TurnCounter>
 * @author prico
 * 
 * @param Term
 * 
 * @param Turn
 * @parent Term
 * @desc Turn의 이름(용어)를 지정합니다.
 * @default 턴
 * 
 * @help
 * 아래 VXA용 스크립트가 원조이며, 
 * 
 * https://forums.rpgmakerweb.com/index.php?threads/turn-window-for-battle.96754/
 * 
 * MV 버전에서 쓸 수 있게 이식 작업한 것입니다.
 * 
 * 코드를 그대로 옮기진 않았으므로 동작이 다를 수 있습니다.
 */

var Imported = Imported || {};
Imported.RS_TurnCounter = true;

var RS = RS || {};
RS.TurnCounter = RS.TurnCounter || {};

(function($) {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_TurnCounter>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = {};
    $.Params.turnTerm = parameters["Turn"] || "턴";

    //====================================================================
    // Window_Turn
    //====================================================================    

    function Window_Turn() {
        this.initialize.apply(this, arguments);
    };
    
    Window_Turn.prototype = Object.create(Window_Base.prototype);
    Window_Turn.prototype.constructor = Window_Turn;
    
    Window_Turn.prototype.initialize = function(numLines) {
        var tempWidth = 200;
        var height = this.fittingHeight(numLines || 1);
        Window_Base.prototype.initialize.call(this, 0, 0, tempWidth, height);
        this.refresh();
        this._isWindow = false;
    };

    Window_Turn.prototype.refresh = function() {
        this.contents.clear();
        this.visible = true;
        var text = `${$gameTroop.turnCount()} ${$.Params.turnTerm}`;
        var textWidth = this.drawTextEx(text, 0, this.contents.height + this.textPadding()) * 2;
        this.width = textWidth;
        this.x = Graphics.boxWidth - textWidth;
        this.drawTextEx(text, this.textPadding(), 0);
    };

    //====================================================================
    // BattleManager
    //====================================================================    

    var alias_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        alias_BattleManager_initMembers.call(this);
        this._turnWindow = null;
    };    

    BattleManager.setTurnWindow = function(turnWindow) {
        this._turnWindow = turnWindow;
    };    

    var alias_BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function() {
        alias_BattleManager_startInput.call(this);
        if(this._turnWindow) {
            this._turnWindow.refresh();
        }
    };

    //====================================================================
    // Scene_Battle
    //====================================================================

    var alias_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        alias_Scene_Battle_createAllWindows.call(this);
        this.createTurnWindow();
    };

    Scene_Battle.prototype.createTurnWindow = function() {
        this._turnWindow = new Window_Turn(1);
        this._turnWindow.visible = false;
        this.addWindow(this._turnWindow);
    };

    var alias_Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        alias_Scene_Battle_createDisplayObjects.call(this);
        BattleManager.setTurnWindow(this._turnWindow);
    };
    
})(RS.TurnCounter);