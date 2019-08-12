//================================================================
// RS_HMS_GameOptions.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to control the message speed and font size in your own game options. <RS_HMS_GameOptions>
 * @author biud436
 * 
 * @param minMessageSpeed
 * @text Min Message Speed
 * @type number
 * @desc Specify the minimal message speeed
 * @min 0
 * @default 0
 * 
 * @param maxMessageSpeed
 * @text Max Message Speed
 * @type number
 * @desc Specify the maximum message speeed
 * @min 0
 * @default 10
 * 
 * @param messageSpeedButtonName
 * @text Message Speed Button Name
 * @desc Specify the desired buttton name for message speeed in the message window
 * @default Message Speeed
 * 
 * @param fontSizeButtonName
 * @text Font Size Button Name
 * @desc Specify the desired buttton name for font size in the message window
 * @default Font Size
 * 
 * @help
 * This plugin is an addon, 
 * so it should be installed the plugin somewhere below 'RS_MessageSystem'.
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.07.15 (v1.0.0) - First Release.
 */
/*:ko
 * @plugindesc 게임 옵션에서 메시지 속도 및 글자 크기를 변경할 수 있습니다. <RS_HMS_GameOptions>
 * @author 러닝은빛(biud436)
 * 
 * @param minMessageSpeed
 * @text 최소 메시지 속도
 * @type number
 * @desc 최소 메시지 속도를 지정하세요. 프레임 단위 (0이 기본값)
 * @min 0
 * @default 0
 * 
 * @param maxMessageSpeed
 * @text 최대 메시지 속도
 * @type number
 * @desc 최대 메시지 속도를 지정하세요. 프레임 단위 (10이 기본값)
 * @min 0
 * @default 10
 * 
 * @param messageSpeedButtonName
 * @text 메시지 속도 버튼명
 * @desc 메시지 속도 버튼의 이름을 설정하세요.
 * @default 메시지 속도
 * 
 * @param fontSizeButtonName
 * @text 글자 크기 버튼명
 * @desc 글자 크기 버튼의 이름을 설정하세요.
 * @default 글자 크기
 * 
 * @help
 * 이 플러그인은 한글 메시지 시스템의 확장입니다.
 * RS_MessageSystem 플러그인 밑에 추가해주시기 바랍니다.
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.07.15 (v1.0.0) - First Release.
 */
/*:ja
 * @plugindesc This plugin allows you to control the message speed and font size in your own game options. <RS_HMS_GameOptions>
 * @author biud436
 * 
 * @param minMessageSpeed
 * @text Min Message Speed
 * @type number
 * @desc Specify the minimal message speeed
 * @min 0
 * @default 0
 * 
 * @param maxMessageSpeed
 * @text Max Message Speed
 * @type number
 * @desc Specify the maximum message speeed
 * @min 0
 * @default 10
 * 
 * @param messageSpeedButtonName
 * @text Message Speed Button Name
 * @desc Specify the desired buttton name for message speeed in the message window
 * @default Message Speeed
 * 
 * @param fontSizeButtonName
 * @text Font Size Button Name
 * @desc Specify the desired buttton name for font size in the message window
 * @default Font Size
 * 
 * @help
 * This plugin is an addon, 
 * so it should be installed the plugin somewhere below 'RS_MessageSystem'.
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.07.15 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_HMS_GameOptions = true;

var RS = RS || {};
RS.MessageSystem = RS.MessageSystem || {};

(function() {

  var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_HMS_GameOptions>');
      });
      
  parameters = (parameters.length > 0) && parameters[0].parameters;    

  RS.MessageSystem.Params = RS.MessageSystem.Params || {};
  RS.MessageSystem.Params.minMessageSpeed = parseInt(parameters["minMessageSpeed"] || 0);
  RS.MessageSystem.Params.maxMessageSpeed = parseInt(parameters["maxMessageSpeed"] || 10);  
  RS.MessageSystem.Params.messageSpeedButtonName = String(parameters["messageSpeedButtonName"] || "메시지 속도");
  RS.MessageSystem.Params.fontSizeButtonName = String(parameters["fontSizeButtonName"] || "글자 크기"); 
  
  RS.MessageSystem.Params.messageSpeedOffset = 1;
  RS.MessageSystem.Params.fontSizeOffset = 2;

  //===========================================================================
  // ConfigManager
  //===========================================================================
  
  if(!Imported.RS_ScreenManager && Imported.RS_MessageSystem) {
    
    Object.defineProperty(ConfigManager, 'messageSpeed', {
      get: function() {
        return RS.MessageSystem.Params.textSpeed;
      },
      set: function(value) {
        RS.MessageSystem.Params.textSpeed = value;
      },
      configurable: true
    });
    
    Object.defineProperty(ConfigManager, 'fontSize', {
      get: function() {
        return RS.MessageSystem.Params.fontSize;
      },
      set: function(value) {
        RS.MessageSystem.Params.fontSize = value;
      },
      configurable: true
    });  
    
    var alias_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
      var config = alias_makeData.call(this);
      config.messageSpeed = this.messageSpeed;
      config.fontSize = this.fontSize;
      return config;
    };
    
    var alias_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
      alias_applyData.call(this, config);
      this.messageSpeed = this.readMessageSpeed(config);
      this.fontSize = this.readFontSize(config);
    };
    
    ConfigManager.readMessageSpeed = function(config) {
      var value = config["messageSpeed"];
      if (value !== undefined) {
        return Number(value).clamp(RS.MessageSystem.Params.minMessageSpeed, RS.MessageSystem.Params.maxMessageSpeed);
      } else {
        return RS.MessageSystem.Params.textSpeed;
      }
    };
    
    ConfigManager.readFontSize = function(config) {
      var value = config["fontSize"];
      if (value !== undefined) {
        return Number(value).clamp(RS.MessageSystem.Params.minFontSize, RS.MessageSystem.Params.maxFontSize);
      } else {
        return RS.MessageSystem.Params.fontSize;
      }
    };    
    
    function Window_MessageOptionsImpl() {
      this.initialize.apply(this, arguments);
    };
    
    Window_MessageOptionsImpl.prototype = Object.create(Window_Options.prototype);
    Window_MessageOptionsImpl.prototype.constructor = Window_MessageOptionsImpl;
    
    Window_MessageOptionsImpl.prototype.initialize = function() {
      Window_Options.prototype.initialize.call(this);
    };
    
    Window_MessageOptionsImpl.prototype.statusText = function(index) {
      var symbol = this.commandSymbol(index);
      var ext = this._list[index].ext;
      var value = this.getConfigValue(symbol);
      if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
      } else if(ext === "messageSpeed"){
        return String(RS.MessageSystem.Params.textSpeed);
      } else if(ext === "fontSize") {
        return String(RS.MessageSystem.Params.fontSize);
      } else {
        return this.booleanStatusText(value);
      }
    };

    Window_MessageOptionsImpl.prototype.processOk = function() {
      var index = this.index();
      var symbol = this.commandSymbol(index);
      var ext = this._list[index].ext;
      var value = this.getConfigValue(symbol);
      if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if (value > 100) {
          value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
      } else if(ext === "messageSpeed"){
        value += RS.MessageSystem.Params.messageSpeedOffset;
        value = value.clamp(RS.MessageSystem.Params.minMessageSpeed, RS.MessageSystem.Params.maxMessageSpeed);
        this.changeValue(symbol, value);
      } else if(ext === "fontSize") {
        value += 2;
        value = value.clamp(RS.MessageSystem.Params.minFontSize, RS.MessageSystem.Params.maxFontSize);
        this.changeValue(symbol, value);
      } else {
        this.changeValue(symbol, !value);
      }
    };    
    
    Window_MessageOptionsImpl.prototype.cursorRight = function(wrap) {
      var index = this.index();
      var symbol = this.commandSymbol(index);
      var ext = this._list[index].ext;
      var value = this.getConfigValue(symbol);
      if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
      } else if(ext === "messageSpeed"){
        value += RS.MessageSystem.Params.messageSpeedOffset;
        value = value.clamp(RS.MessageSystem.Params.minMessageSpeed, RS.MessageSystem.Params.maxMessageSpeed);
        this.changeValue(symbol, value);
      } else if(ext === "fontSize") {
        value += RS.MessageSystem.Params.fontSizeOffset;
        value = value.clamp(RS.MessageSystem.Params.minFontSize, RS.MessageSystem.Params.maxFontSize);
        this.changeValue(symbol, value);
      } else {
        this.changeValue(symbol, true);
      }
    };
    
    Window_MessageOptionsImpl.prototype.cursorLeft = function(wrap) {
      var index = this.index();
      var symbol = this.commandSymbol(index);
      var ext = this._list[index].ext;
      var value = this.getConfigValue(symbol);
      if (this.isVolumeSymbol(symbol)) {
        value -= this.volumeOffset();
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
      } else if(ext === "messageSpeed"){
        value -= RS.MessageSystem.Params.messageSpeedOffset;
        value = value.clamp(RS.MessageSystem.Params.minMessageSpeed, RS.MessageSystem.Params.maxMessageSpeed);
        this.changeValue(symbol, value);
      } else if(ext === "fontSize") {
        value -= RS.MessageSystem.Params.fontSizeOffset;
        value = value.clamp(RS.MessageSystem.Params.minFontSize, RS.MessageSystem.Params.maxFontSize);
        this.changeValue(symbol, value);
      } else {
        this.changeValue(symbol, false);
      }
    };
    
    Window_MessageOptionsImpl.prototype.addVolumeOptions = function() {
      Window_Options.prototype.addVolumeOptions.call(this);
      this.addCommand(RS.MessageSystem.Params.messageSpeedButtonName, 'messageSpeed', true, "messageSpeed");
      this.addCommand(RS.MessageSystem.Params.fontSizeButtonName, 'fontSize', true, "fontSize");
    };    
    
    Scene_Options.prototype.createOptionsWindow = function() {
      this._optionsWindow = new Window_MessageOptionsImpl();
      this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
      this.addWindow(this._optionsWindow);
    };
    
  }

})();