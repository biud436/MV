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
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.02.27 - Fixed a few code (makeCommandList → addOriginalCommands)
 * 2016.03.05 - Fixed the class structure.
 * 2017.01.23 (v1.0.2) - Converted sources to ES6.
 */

var Imported = Imported || {};
Imported.RS_MenuInformation = true;

(function() {

  "use strict";

  let parameters = PluginManager.parameters('RS_MenuInformation');
  let _menuName = String(parameters['Menu Name'] || "Information");
  let _menuSymbol = String("information");

  class MenuInformation {

    static add(text) {
      this._texts.push(text);
    }

    static clear() {
      if(this._texts.length > 0) this._texts = [];
    }

    static allText() {
      if(this._texts.length > 0) {
        return this._texts.reduce(function(cur, now) {
          return cur + '\n' + now;
        });
      } else {
        return '';
      }
    }

  }

  MenuInformation._texts = [];

  //============================================================================
  // Window_MenuCommand
  //============================================================================

  let alias_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function() {
    alias_Window_MenuCommand_addOriginalCommands.call(this);
    this.addInformationCommand();
  };

  Window_MenuCommand.prototype.addInformationCommand = function() {
    this.addCommand(_menuName, _menuSymbol, true);
  };

  //============================================================================
  // Scene_Menu
  //============================================================================

  let alias_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    alias_Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler(_menuSymbol, this.commandInformation.bind(this));
  };

  Scene_Menu.prototype.commandInformation = function() {
      SceneManager.push(Scene_Information);
  };

  //============================================================================
  // Window_Information
  //============================================================================

  class Window_Information extends Window_Base {

    constructor(numLines) {
      super(0, 0, Graphics.boxWidth, Graphics.boxHeight);
      this._text = '';
    }

    setText(text) {
      if (this._text !== text) {
          this._text = text;
          this.refresh();
      }
    }

    clear() {
      this.setText('');
    }

    refresh() {
      this.contents.clear();
      this.drawTextEx(this._text, this.textPadding(), 0);
    }

  }

  //----------------------------------------------------------------------------
  // Scene_Information
  //
  //

  class Scene_Information extends Scene_MenuBase {

    constructor() {
      super();
    }

    create() {
      super.create();
      this._informationWindow = new Window_Information();
      this.addWindow(this._informationWindow);
      this.refresh();
    }

    update() {
      super.update();
      if(this.isCancelled()) {
        this.popScene();
      }
    }

    isCancelled() {
      return Input.isTriggered('menu') || TouchInput.isCancelled();
    }

    refresh() {
      let actor = this.actor();
      this._informationWindow.setText(MenuInformation.allText());
      this._informationWindow.refresh();
      this._informationWindow.activate();
    }

  }

  //============================================================================
  // Game_Interpreter
  //============================================================================

  let alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "MenuInformation") {
      switch (args[0].toLowerCase()) {
      case 'add':
        var str = args.slice(1).join(' ');
        MenuInformation.add(str);
        break;
      case 'clear':
        MenuInformation.clear();
        break;
      }
    }
  }

  window.MenuInformation = MenuInformation;
  window.Window_Information = Window_Information;
  window.Scene_Information = Scene_Information;

})();
