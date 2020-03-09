//================================================================
// RS_MessageTTS.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_MessageTTS>
 * @author biud436
 *          
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_MessageTTS = true;

var RS = RS || {};
RS.MessageTTS = RS.MessageTTS || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_MessageTTS>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    RS.MessageTTS.Params = {};
    RS.MessageTTS.Params.rate = 1.2;
    RS.MessageTTS.Params.volume = 1.0;

    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        alias_Game_System_initialize.call(this);
        this._isValidTTS = true;

        if(!Utils.isNwjs()) {
           this.disableTTF(); 
        }

    };

    Game_System.prototype.isValidTTS = function() {
        return this._isValidTTS;
    };

    Game_System.prototype.enableTTF = function() {
        this._isValidTTS = true;
    };

    Game_System.prototype.disableTTF = function() {
        this._isValidTTS = false;
    };    

    var alias_Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
        alias_Window_Message_newPage.call(this, textState);
        let lang = navigator.language;
        if($gameSystem.isKorean()) lang = 'ko-KR';
        if(!Utils.isNwjs()) return;

        chrome.tts.isSpeaking(value => {
            if(!value) {
                const p = RS.MessageTTS.Params;
                chrome.tts.speak(textState.text, {'lang': lang, 'rate': p.rate, 'volume': p.volume});
            }
        });   

    };    

    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "EnableTTF") $gameSystem.enableTTF();
        if(command === "DisableTTF") $gameSystem.disableTTF();
    };

})(RS.MessageTTS);