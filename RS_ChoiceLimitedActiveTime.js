/*:
 * RS_ChoiceLimitedActiveTime.js
 * @plugindesc RS_ChoiceLimitedActiveTime.js
 * @author biud436
 *
 * @param Default Active Time
 * @desc Default Active Time
 * @default 3
 *
 * @help
 *
 * CLAT setTime n
 *
 */

var RS = RS || {};
RS.Window_ChoiceList = RS.Window_ChoiceList || {};

(function() {

  var parameters = PluginManager.parameters('RS_ChoiceLimitedActiveTime');
  RS.Window_ChoiceList.limitedActiveTime = Number(parameters['Default Active Time'] || 5 );

  var alias_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function() {
    alias_Window_ChoiceList_start.call(this);
    this.setActiveTime(RS.Window_ChoiceList.limitedActiveTime);

    //setTimeout(this.callCancleNotify, Math.floor(RS.Window_ChoiceList.limitedActiveTime * 1000));

  }

  Window_ChoiceList.prototype.setActiveTime = function(value) {
    this._activeLimitTime = Math.floor(value * 60);
  }

  var alias_Window_ChoiceList_update = Window_ChoiceList.prototype.update;
  Window_ChoiceList.prototype.update = function() {
    alias_Window_ChoiceList_update.call(this);
    if(this.isOpen()) this.updateActiveTime();
  }

  Window_ChoiceList.prototype.updateActiveTime = function() {
    if(!!this._activeLimitTime && this._activeLimitTime > 0) {
      this._activeLimitTime--;
    } else {
      this.processCancel();
      this._activeLimitTime = null;
    }
  }

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "CLAT") {
        switch (args[0].toLowerCase()) {
          case 'setTime':
            RS.Window_ChoiceList.limitedActiveTime = Number(args[1]);
            break;
        }
      }
  }

})();
