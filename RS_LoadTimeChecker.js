/*:
 * @plugindesc This plugin allows you to check the time that has passed since last save. <RS_LoadTimeChecker> 
 * @author biud436
 * 
 * @param Text Option
 * 
 * @param Day
 * @parent Text Option
 * @desc Specify the 'Day' text to show up on the screen.
 * @default 일
 * 
 * @param Hours
 * @parent Text Option
 * @desc Specify the 'Hours' text to show up on the screen.
 * @default 시간
 * 
 * @param Minutes
 * @parent Text Option
 * @desc Specify the 'Minutes' text to show up on the screen.
 * @default 분
 * 
 * @param Seconds
 * @parent Text Option
 * @desc Specify the 'Seconds' text to show up on the screen.
 * @default 초
 * 
 * @param Description Text
 * @parent Text Option
 * @desc Specify the description text to show up on the screen.
 * @default 만에 게임으로 돌아오셨습니다.
 * 
 * @param Hide Time
 * @parent Text Option
 * @type number
 * @desc Specify the hide seconds.
 * @default 6
 * 
 * @param Position
 * 
 * @param X
 * @parent Position
 * @desc Change the x-coordinate of bitmap text.
 * (This is evaluated the javascript)
 * @default 0
 * 
 * @param Y
 * @parent Position
 * @desc Change the y-coordinate of bitmap text.
 * (This is evaluated the javascript)
 * @default 0
 * 
 * @param Font Option
 * 
 * @param Font Face
 * @parent Font Option
 * @desc Specify the font face.
 * @default GameFont
 * 
 * @param Font Size
 * @parent Font Option
 * @type number
 * @desc Specify the font size.
 * @default 28
 * 
 * @param Text Color
 * @parent Font Option
 * @desc Specify the text color.
 * @default #ffffff
 * 
 * @param Outline Color
 * @parent Font Option
 * @desc Specify the outline color.
 * @default rgba(0, 0, 0, 0.5)
 * 
 * @param Outline Width
 * @parent Font Option
 * @type number
 * @desc Specify the outline width.
 * @default 4
 * 
 * @param Text Align
 * @parent Font Option
 * @type select
 * @desc Specify the text alignment.
 * @default center
 * @option left
 * @value left
 * @option cetner
 * @value center
 * @option right
 * @value right
 * 
 * @param Bitmap Width
 * @parent Font Option
 * @desc Specify the bitmap width.
 * (This is evaluated the javascript)
 * @default Graphics.boxWidth
 * 
 * @param Bitmap Height
 * @parent Font Option
 * @desc Specify the bitmap height.
 * (This is evaluated the javascript)
 * @default 64
 * 
 * @param Reward Option
 * 
 * @param Code Injection
 * @parent Reward Option
 * @type note
 * @desc Can evaluate a javascript code using day, hours, mins, seconds variables.
 * @default "// if(day >= 1) {\n//   $gameParty.gainGold(1000 * day);\n// }\n// if(hours >= 1) {\n//   $gameParty.gainGold(200 * hours);\n// }\n// if(mins >= 30) {\n//   $gameParty.gainGold(100 * mins);\n// }\n// if(seconds >= 45) {\n//   $gameParty.gainGold(50 * seconds);\n// }"
 * 
 * @help
 * ========================================================
 * Introduction
 * ========================================================
 * This plugin allows you to check the time that has passed since last save 
 * and drawing its time text on the screen when loading the map.
 * 
 * The text for time will be gone after a period of time 
 * and then you can put the code in a preset points and evaluate it.
 * 
 * You can be also accessed a lot of local variables such as day, hours, mins, seconds.
 * and can give an user some rewards like as item, gold.
 * 
 * ========================================================
 * Change Log
 * ========================================================
 * 2019.07.13 (v1.0.0) - First Release.
 * 2019.07.14 (v1.0.1) :
 * - Fixed the bug. Now every 24 hours by default, the day variable will increase.
 */

var Imported = Imported || {};
Imported.RS_LoadTimeChecker = true;

var RS = RS || {};
RS.LoadTimeChecker = RS.LoadTimeChecker || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_LoadTimeChecker>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = {};
    $.Params.dayText = parameters["Day"] || "일";
    $.Params.hoursText = parameters["Hours"] || "시간";
    $.Params.minutesText = parameters["Minutes"] || "분";
    $.Params.secondsText = parameters["Seconds"] || "초";
    $.Params.descText = parameters["Description Text"];
    
    $.Params.hideTime = parseInt(parameters["Hide Time"] || 6);
    $.Params.dx = parameters["X"];
    $.Params.dy = parameters["Y"];

    $.Params.font = {
        fontFace: parameters["Font Face"] || "GameFont",
        fontSize: Number(parameters["Font Size"] || 28),
        textColor: parameters["Text Color"] || "#ffffff",
        outlineColor: parameters["Outline Color"] || "rgba(0, 0, 0, 0.5)",
        outlineWidth: Number(parameters["Outline Width"] || 4),
        textAlign: parameters["Text Align"] || "center",
    };

    $.Params.bitmap = {
        width: parameters["Bitmap Width"],
        height: parameters["Bitmap Height"],
    };

    $.Params.evaluateCode = parameters["Code Injection"];
    
    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        alias_Game_System_initialize.call(this);
        this._beforeDateTime = null;
        this._loadDateTime = null;
        this._refreshTime = false;
    };

    var alias_Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
    Game_System.prototype.onBeforeSave = function() {
        alias_Game_System_onBeforeSave.call(this);
        this._beforeDateTime = new Date().getTime();
    };

    var alias_Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function() {
        alias_Game_System_onAfterLoad.call(this);
        this._loadDateTime = new Date().getTime();
        this.refreshTimeChecker();
    };    

    Game_System.prototype.beforeTime = function() {
        return this._beforeDateTime;
    };

    Game_System.prototype.loadTime = function() {
        return this._loadDateTime;
    };

    Game_System.prototype.refreshTimeChecker = function() {
        this._refreshTime = true;
    };

    Game_System.prototype.restoreTimeChecker = function() {
        this._refreshTime = false;
    };

    var alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        alias_Scene_Map_onMapLoaded.call(this);
        if($gameSystem._refreshTime) {
            this.refreshTimeChecker($gameSystem.beforeTime(), $gameSystem.loadTime());
            $gameSystem.restoreTimeChecker();
        }
    };    

    Scene_Map.prototype.refreshTimeChecker = function(before, load) {
        if(!this._spriteset) return;
        this._spriteset.refreshTimeChecker(before, load);
    };

    var alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        alias_Spriteset_Map_createLowerLayer.call(this);
        this.createTimeChecker();
    };

    Spriteset_Map.prototype.createTimeChecker = function() {
        this._timeChecker = new Sprite();
        var width = eval($.Params.bitmap.width);
        var height = eval($.Params.bitmap.height);
        this._timeChecker.bitmap = new Bitmap(width, height);
        this._timeChecker.visible = false;
        this.addChild(this._timeChecker);
    };

    /**
     * @param {Date} before 
     * @param {Date} load
     */
    Spriteset_Map.prototype.refreshTimeChecker = function(before, load) {
        
        "use strict";

        if(!this._timeChecker) {
            this.createTimeChecker();
        }

        var newBeforeTime = new Date(before);
        var newLoadTime = new Date(load);

        const width = eval($.Params.bitmap.width);
        const height = eval($.Params.bitmap.height);

        const dayValue = 60 * 60 * 24 * 1000;
        const hourValue = 60 * 60 * 1000;
        const minValue = 60 * 1000;
        const secondValue = 1000;

        let loadTime = newLoadTime.getTime();
        let beforeTime = newBeforeTime.getTime();

        var t = (Math.floor(loadTime / hourValue) - Math.floor(beforeTime/ hourValue ));
        
        let day = Math.floor(loadTime / dayValue) - Math.floor((beforeTime - newBeforeTime.getTimezoneOffset() * 60 * 1000) / dayValue );

        if(t < 24) {
            day = 0;
        }

        let hours = t % 24;
        let mins = (Math.floor(loadTime / minValue) - Math.floor(beforeTime / minValue )) % 60;
        let seconds = (Math.floor(loadTime / secondValue) - Math.floor(beforeTime / secondValue)) % 60;
        
        let text = `${day} ${$.Params.dayText} ${hours} ${$.Params.hoursText} ${mins} ${$.Params.minutesText} ${seconds} ${$.Params.secondsText} ${$.Params.descText}`;

        this._timeChecker.bitmap.clear();
        this._timeChecker.visible = true;
        this._timeChecker.bitmap.drawText(text, 0, 0, width, height, $.Params.font.textAlign);
        this._timeChecker.bitmap.fontFace = $.Params.font.fontFace;
        this._timeChecker.bitmap.fontSize = $.Params.font.fontSize;
        this._timeChecker.bitmap.textColor = $.Params.font.textColor;
        this._timeChecker.bitmap.outlineColor = $.Params.font.outlineColor;
        this._timeChecker.bitmap.outlineWidth = $.Params.font.outlineWidth;
        this._timeChecker.x = eval($.Params.dx);
        this._timeChecker.y = eval($.Params.dy);

        try {
            eval(JSON.parse($.Params.evaluateCode));
        } catch(e) {
            throw new Error(e.message);
        }
    
        setTimeout(() => {
            this._timeChecker.visible = false;
        }, 1000 * $.Params.hideTime);

    }

})(RS.LoadTimeChecker);