//============================================================================
// Game_Interpreter
//============================================================================

var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "ScreenManager") {
        switch(args[0]) {
        case 'Start':
            if(Utils.isNwjs()) {
            SceneManager.push(ScreenManager);
            }
            break;
        }
    }
};
