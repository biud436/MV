/*:
 * RS_MenuInformation.js
 * @plugindesc This plugin provides the Information Window that adds a text via the global variable.
 * @author biud436
 *
 * @param Menu Name
 * @desc Menu Name
 * @default Information
 *
 * @help
 *
 * This plugin command allows you to add a text.
 * MenuInformation add Hello, World
 *
 * This plugin command allows you to delete all texts.
 * MenuInformation clear
 *
 * - Change Log
 * 2016.02.27 - Fixed a few code (makeCommandList → addOriginalCommands)
 */

var RS = RS || {};

function Window_Information() {
   this.initialize.apply(this, arguments);
}

function Scene_Information() {
   this.initialize.apply(this, arguments);
}

//============================================================================
// RS.MenuInformation
//============================================================================
RS.MenuInformation = RS.MenuInformation || new function() {};
RS.MenuInformation._texts = [];
RS.MenuInformation.add = function(text) {
    RS.MenuInformation._texts.push(text);
}
RS.MenuInformation.clear = function() {
    if(RS.MenuInformation._texts.length > 0) {
      RS.MenuInformation._texts = [];
    }
}
RS.MenuInformation.allText = function() {
    if(RS.MenuInformation._texts.length > 0) {
      return RS.MenuInformation._texts.reduce(function(cur, now) {
       return cur + '\n' + now;
      });
    } else {
      return '';
    }
}

var parameters = PluginManager.parameters('RS_MenuInformation');
RS.MenuInformation._menuName = parameters['Menu Name'] || "Information";
RS.MenuInformation._menuSymbol = "information";

    //============================================================================
    // Window_MenuCommand
    //============================================================================
    RS.MenuInformation.addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
      RS.MenuInformation.addOriginalCommands.call(this);
      this.addInformationCommand();
    };

    Window_MenuCommand.prototype.addInformationCommand = function() {
      this.addCommand(RS.MenuInformation._menuName, RS.MenuInformation._menuSymbol, true);
    };

    //============================================================================
    // Scene_Menu
    //============================================================================
    var alias_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
      alias_Scene_Menu_createCommandWindow.call(this);
      this._commandWindow.setHandler(RS.MenuInformation._menuSymbol, this.commandInformation.bind(this));
    };

    Scene_Menu.prototype.commandInformation = function() {
        SceneManager.push(Scene_Information);
    };

    //============================================================================
    // Window_Information
    //============================================================================
    Window_Information.prototype = Object.create(Window_Base.prototype);
    Window_Information.prototype.constructor = Window_Information;

    Window_Information.prototype.initialize = function(numLines) {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this._text = '';
    };

    Window_Information.prototype.setText = function(text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };

    Window_Information.prototype.clear = function() {
        this.setText('');
    };

    Window_Information.prototype.refresh = function() {
        this.contents.clear();
        this.drawTextEx(this._text, this.textPadding(), 0);
    };

    //============================================================================
    // Scene_Information
    //============================================================================
    Scene_Information.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Information.prototype.constructor = Scene_Information;

    Scene_Information.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Information.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._informationWindow = new Window_Information();
        this.addWindow(this._informationWindow);
        this.refresh();
    };

    Scene_Information.prototype.update = function() {
      Scene_MenuBase.prototype.update.call(this);
      if(this.isCancelled()) {
        SceneManager.pop();
      }
    }

    Scene_Information.prototype.isCancelled = function() {
        return Input.isTriggered('menu') || TouchInput.isCancelled();
    };

    Scene_Information.prototype.refresh = function() {
        var actor = this.actor();
        this._informationWindow.setText(RS.MenuInformation.allText());
        this._informationWindow.refresh();
        this._informationWindow.activate();
    };

    // ============================================================================
    // Game_Interpreter
    // ============================================================================

    RS.MenuInformation._alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      RS.MenuInformation._alias_pluginCommand.call(this, command, args);
      if(command === "MenuInformation") {
        switch (args[0].toLowerCase()) {
        case 'add':
          var str = args.slice(1).join(' ');
          RS.MenuInformation.add(str);
          break;
        case 'clear':
          RS.MenuInformation.clear();
          break;
        }
      }
    }
