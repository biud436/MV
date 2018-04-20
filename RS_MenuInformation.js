/*:
 * RS_MenuInformation.js
 * @plugindesc This plugin provides the Information Window that adds a text via the global variable.
 * @author biud436
 *
 * @param Menu Name
 * @desc Type the menu name
 * @default Information
 *
 * @help
 * You might want to add a new text string in current line. This plugin command
 * is stored as text strings in the global memory space until the game ends.
 *
 *    MenuInformation add Hello, World
 *
 * Here plugin command is deleted all texts that are stored in the global memory
 * space.
 *
 *    MenuInformation clear
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.04 (v1.0.0) - First Release.
 * 2016.02.27 (v1.0.1) - Fixed a few code (makeCommandList → addOriginalCommands)
 * 2016.03.05 (v1.0.1b) - Fixed the class structure.
 * 2017.01.23 (v1.0.2) - Converted sources to ES6.
 * 2017.09.06 (v1.0.3) - Converted sources to ES5.
 */

var Imported = Imported || {};
Imported.RS_MenuInformation = true;

function MenuInformation() {
  throw new Error("This is a static class");
}

function Scene_Information() {
  this.initialize.apply(this, arguments);
}

(function() {

  var parameters = PluginManager.parameters('RS_MenuInformation');
  var _menuName = String(parameters['Menu Name'] || "Information");
  var _menuSymbol = String("information");

  //============================================================================
  // MenuInformation
  //============================================================================

  MenuInformation._texts = [];

  MenuInformation.add = function (text) {
    this._texts.push(text);
  };

  MenuInformation.clear = function () {
    if(this._texts.length > 0) this._texts = [];
  };

  MenuInformation.allText = function () {
    return this._texts.join('\n');
  };

  //============================================================================
  // Window_MenuCommand
  //============================================================================

  var alias_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
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

  var alias_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
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

  function Window_Information() {
    this.initialize.apply(this, arguments);
  }

  Window_Information.prototype = Object.create(Window_Base.prototype);
  Window_Information.prototype.constructor = Window_Information;

  Window_Information.prototype.initialize = function (numLines) {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._text = "";
  };

  Window_Information.prototype.setText = function (text) {
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

  Scene_Information.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_Information.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._informationWindow = new Window_Information();
    this.addWindow(this._informationWindow);
    this.refresh();
  };

  Scene_Information.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if(this.isCancelled()) {
      this.popScene();
    }
  };

  Scene_Information.prototype.isCancelled = function() {
    return Input.isTriggered('menu') || TouchInput.isCancelled();
  };

  Scene_Information.prototype.refresh = function() {
    var actor = this.actor();
    this._informationWindow.setText(MenuInformation.allText());
    this._informationWindow.refresh();
    this._informationWindow.activate();
  };

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

  if(Imported.RS_ArabicMessageSystem) {
    RS.ArabicMessageSystem.defineInitialize(Window_Information);
  }

})();
