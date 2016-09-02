//==============================================================================
// RS_ScreenManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_ScreenManager = true;

/*:
 * @plugindesc (v1.0.0)
 * @author biud436
 * @help
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * ScreenManager Start
 */

(function () {

  var isMobileAutoFullScreen = true;
  var isLimitedInMaxRect = true;
  var isGraphicsRendererResize = false;

  var getTargetRegex = /(\d+)\W+(\d+)/i;

  var isGraphicsAutoScaling = false;
  var isMaintainingMinimumWidth = true;
  var isMaintainingMinimumHeight = true;

  var pcGraphicsArray = [
  "160 × 120",
  "240 × 160",
  "320 × 240",
  "400 × 240",
  "480 × 320",
  "640 × 360", // HD
  "640 × 480",
  "800 × 480",
  "854 × 480",
  "800 × 600",
  "960 × 540", // HD
  "960 × 640",
  "1024 × 576",
  "1024 x 600",
  "1280 × 720", // HD
  "1600 × 900",
  "1920 × 1080",
  "2560 × 1440",
  "3200 × 1800",
  "3840 × 2160",
  "5120 × 2880",
  "7680 × 4320",
  ];

  var mobileGraphicsArray = [
  "120 × 160",
  "160 × 240",
  "240 × 320",
  "240 × 400",
  "320 x 480",
  "480 x 800",
  "640 x 960",
  "640 x 1136",
  "720 x 1280", // Galaxy S3
  "750 x 1334", // iPhone6, iPhone6S
  "768 x 1024",
  "768 x 1280",
  "800 x 1280",
  "1080 x 1920", // iPhone6+, iPhone6S+, Galaxy S4, Galaxy S5
  "1200 x 1920",
  "1242 x 2208",
  "1440 x 2560", // Galaxy S6, Galaxy S7
  "1536 x 2048",
  "1600 x 2560",
  "2048 x 2732", // iPadPro
  ];


  //============================================================================
  // Point
  //============================================================================
  Point.prototype.toString = function () {
    return this.x + ' x ' +  this.y;
  }

  //============================================================================
  // Graphics
  //============================================================================

  Graphics.getAvailGraphicsArray = function (returnType) {
    var data;
    var tw, th;
    var pt;
    var gArray = [];
    var result = [];
    var maxSW = window.screen.availWidth, maxSH = window.screen.availHeight;
    var type = ((maxSW / maxSH) >= 1.0) ? 'landscape' : 'portrait';
    data = (Utils.isMobileDevice() === true) ? mobileGraphicsArray : pcGraphicsArray;
    data.forEach(function (i) {
      if(i.match(getTargetRegex)) {
        tw = Number(RegExp.$1);
        th = Number(RegExp.$2);
        if(type === 'portrait') {
          var temp = tw;
          tw = th;
          th = temp;
        }
        if(tw >= 0 && tw <= maxSW && th >= 0 && th <= maxSH) {
          pt = new Point(tw, th);
          gArray.push(pt);
          result.push(pt.toString());
        }
      }
    }, this);
    return (returnType === 'String')? result : gArray;
  };

  Graphics.setScreenResize = function (newScr) {
    var cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    var cy = (window.screen.availHeight / 2) - (newScr.y / 2);
    var xPadding = 16;
    var yPadding = 39;
    var tw = ($gameMap && $gameMap.tileWidth) ? $gameMap.tileWidth() : 48;
    var th = ($gameMap && $gameMap.tileHeight) ? $gameMap.tileHeight() : 48;
    var minW = (tw * 17) || Graphics._renderer.width;
    var minH = (th * 13) || Graphics._renderer.height;
    window.resizeTo(newScr.x + xPadding, newScr.y + yPadding);
    window.moveTo(cx, cy);
    if(isGraphicsAutoScaling && (tw/th >= 1.0) && tw >= 48) {
      if(isMaintainingMinimumWidth) Graphics.width = Graphics.boxWidth = Math.max(minW, newScr.x);
      if(isMaintainingMinimumHeight) Graphics.height = Graphics.boxHeight = Math.max(minH, newScr.y);
      if(!isMaintainingMinimumWidth && !isMaintainingMinimumHeight) {
        // Half
        Graphics.width = Graphics.boxWidth = Math.max(minW / 2, newScr.x);
        Graphics.height = Graphics.boxHeight = Math.max(minH / 2, newScr.y);
      }
    } else {
      Graphics.width = Graphics.boxWidth = newScr.x;
      Graphics.height = Graphics.boxHeight = newScr.y;
    }
    if(isGraphicsRendererResize) {
        Graphics._renderer.resize(newScr.x, newScr.y);
    }
  };

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._lastScreenManagerItem = 0;
  };

  //============================================================================
  // Scene_Boot
  //============================================================================

  var alias_Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    alias_Scene_Boot_create.call(this);
  };

  //============================================================================
  // Window_AvailGraphicsList
  //============================================================================

  function Window_AvailGraphicsList() {
    this.initialize.apply(this, arguments);
  };

  Window_AvailGraphicsList.prototype = Object.create(Window_Selectable.prototype);
  Window_AvailGraphicsList.prototype.constructor = Window_AvailGraphicsList;

  Window_AvailGraphicsList.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._itemToPoint = Graphics.getAvailGraphicsArray('Number');
    this._item = [];
    this.refresh();
    this.activate();
    this.select($gameSystem._lastScreenManagerItem || 0);
  };

  Window_AvailGraphicsList.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this.index() >= 0 ? this._itemToPoint[this.index()] : null;
  };

  Window_AvailGraphicsList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_AvailGraphicsList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
  };

  Window_AvailGraphicsList.prototype.makeItemList = function() {
    this._data = Graphics.getAvailGraphicsArray('String');
    this._data.push('Full Screen');
  };

  Window_AvailGraphicsList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
  };

  Window_AvailGraphicsList.prototype.isEnabled = function(item) {
    return !!item;
  };

  Window_AvailGraphicsList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];
    this.resetTextColor();
    if(text === "Full Screen" && !Graphics._isFullScreen()) {
        this.changeTextColor(this.deathColor());
    }
    this.drawText(text, rect.x, rect.y, rect.width, 'center');
  };

  Window_AvailGraphicsList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
  };

  //============================================================================
  // ScreenManager
  //============================================================================

  function ScreenManager() {
    this.initialize.apply(this, arguments);
  }

  ScreenManager.prototype = Object.create(Scene_Base.prototype);
  ScreenManager.prototype.constructor = ScreenManager;

  ScreenManager.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
  };

  ScreenManager.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createWindowLayer();
    this.createAvailGraphicsList();
  };

  ScreenManager.prototype.createAvailGraphicsList = function () {
    var width = 320;
    var height = 440;
    this._availGraphicsList = new Window_AvailGraphicsList(0, 0, 320, 480);
    this._availGraphicsList.x = Graphics.boxWidth / 2 - (320 / 2);
    this._availGraphicsList.y = Graphics.boxHeight / 2 - (480 / 2);
    this._availGraphicsList.setHandler('ok', this.convertScreenSize.bind(this));
    this._availGraphicsList.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._availGraphicsList);
  };

  ScreenManager.prototype.convertScreenSize = function () {
    if(!Utils.isMobileDevice() &&
      this._availGraphicsList.item() === 'Full Screen') {
      Graphics._switchFullScreen();
    } else {
      var scr = this._availGraphicsList.getCurrentItemToPoint();
      if(scr) {
        Graphics.setScreenResize(scr);
      } else {
        var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
        Graphics.setScreenResize(new Point(aw, ah));
      }
    }
    $gameSystem._lastScreenManagerItem = this._availGraphicsList.index();
    this.popScene();
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "ScreenManager") {
        switch(args[0]) {
          case 'Start':
            SceneManager.push(ScreenManager);
            break;
        }
      }
  };

})();
