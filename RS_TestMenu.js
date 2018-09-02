/*:
 * @plugindesc This plugin adds some features in menu, for testing. <RS_TestMenu>
 * @author biud436
 * 
 * @param uiCurrentPosition
 * @text Current Position
 * @desc Specify the name of the Location window.
 * @default 위치
 * 
 * @param uiTime
 * @text Time
 * @desc Specify the name of the Time window.
 * @default 시간
 * 
 * @help
 * 
 */

(function() {

  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<RS_TestMenu>");
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var uiCurrentPosition = parameters["uiCurrentPosition"] || "위치";
  var uiTime = parameters["uiTime"] || "시간";

  //============================================================
  // Scene_Menu
  //============================================================      

  Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    this.createLocationWindow();
    this.createTimerWindow();
    this.createStatusWindow();
  };

  Scene_Menu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_MenuCommand(0, 0);
    this._commandWindow.setHandler('item',      this.commandItem.bind(this));
    this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
    this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
    this._commandWindow.setHandler('options',   this.commandOptions.bind(this));    
    this._commandWindow.setHandler('save',      this.commandSave.bind(this));;
    this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_Menu.prototype.createTimerWindow = function() {
    this._timerWindow = new Window_Timer();
    this._timerWindow.y = this._locationWindow.y - this._timerWindow.height;
    this.addWindow(this._timerWindow);
  };  

  Scene_Menu.prototype.createLocationWindow = function() {
    this._locationWindow = new Window_Location();
    this._locationWindow.y = this._goldWindow.y - this._locationWindow.height;
    this.addWindow(this._locationWindow);
  };

  //============================================================
  // Window_MenuCommand
  //============================================================

  Window_MenuCommand.prototype.windowWidth = function() {
    return 240;
  }; 

  Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addFormationCommand();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
  };

  //============================================================
  // Window_Location
  //============================================================

  function Window_Location() {
    this.initialize.apply(this, arguments);
  };

  Window_Location.prototype = Object.create(Window_Base.prototype);
  Window_Location.prototype.constructor = Window_Location;  

  Window_Location.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();    
    Window_Base.prototype.initialize.call(this, 0, 192, width, height);
    this.refresh();
  };

  Window_Location.prototype.windowWidth = function() {
    return 240;
  };

  Window_Location.prototype.windowHeight = function() {
    return 110;
  };  

  Window_Location.prototype.refresh = function() {
    var text = $gameMap.displayName();
    if(text === "" && $gameMap.mapId() > 0) text = $dataMapInfos[$gameMap.mapId()].name || "";
    this.contents.clear();
    this.changeTextColor(this.systemColor());
    this.drawText(uiCurrentPosition, this.textPadding(), 0, this.textWidth(uiCurrentPosition), 'left');
    this.changeTextColor(this.normalColor());
    this.drawText(text, this.textPadding(), this.lineHeight(), this.textWidth(text), 'center');
  }; 

  //============================================================
  // Window_Timer
  //============================================================  

  function Window_Timer() {
    this.initialize.apply(this, arguments);
  };

  Window_Timer.prototype = Object.create(Window_Base.prototype);
  Window_Timer.prototype.constructor = Window_Timer;  

  Window_Timer.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();    
    Window_Base.prototype.initialize.call(this, 0, 240, width, height);
    this.refresh();
  };

  Window_Timer.prototype.windowWidth = function() {
    return 240;
  };

  Window_Timer.prototype.windowHeight = function() {
    return 110;
  };  

  Window_Timer.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.refresh();
  };

  Window_Timer.prototype.refresh = function() {
    this.contents.clear();
    this.changeTextColor(this.systemColor());
    this.drawText(uiTime, this.textPadding(), 0, this.contentsWidth());
    this.changeTextColor(this.normalColor());
    this.drawText($gameSystem.playtimeText(), this.textPadding(), this.lineHeight(), this.textWidth($gameSystem.playtimeText()),'center');
  }; 

})();