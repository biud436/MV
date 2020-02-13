// import "@babel/polyfill";

"use strict";

const parameters = PluginManager.parameters('RS_MenuInformation');
let _menuName = String(parameters['Menu Name'] || "Information");
let _menuSymbol = "information";

let preloadingImage = true;
let preloadImages = [];
let preloadImageId = Utils.generateRuntimeId();
let isImageText = false;

//============================================================================
// Game_Variables
//============================================================================  

var alias_Game_Variables_initialize = Game_Variables.prototype.initialize;
Game_Variables.prototype.initialize = function() {
  alias_Game_Variables_initialize.call(this);
  this._menuInformation = [];
};

Game_Variables.prototype.addMenuInformation = function(text) {
  if(!this._menuInformation) this._menuInformation = [];
  this._menuInformation.push(text);
};

Game_Variables.prototype.menuInformation = function() {
  if(!this._menuInformation) this._menuInformation = [];
  return this._menuInformation;
};

Game_Variables.prototype.clearMenuInformation = function() {
  this._menuInformation = [];
};  

//============================================================================
// MenuInformation
//============================================================================

class MenuInformation {

  static add(text) {
    $gameVariables.addMenuInformation(text);
  }

  static clear() {
    $gameVariables.clearMenuInformation();
  }

  static allText() {
    let texts = $gameVariables.menuInformation();
    return texts.join('\n');
  }

}

window.MenuInformation = MenuInformation;

//============================================================================
// Window_MenuCommand
//============================================================================

const alias_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
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

const alias_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
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

  constructor() {
    super(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._text = "";
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

  obtainEscapeCode(textState) {
    textState.index++;
    var regExp = /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z?-?]+[!]*/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[0].toUpperCase();
    } else {
      return '';
    }
  }

  obtainImage(textState) {
    var arr = /\<(.*)\>/i.exec(textState.text.slice(textState.index));
    if(arr) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  }

  addImage(textState, imageName) {
    if(preloadingImage) {
      var degree = 0.0;

      // imagename:45
      imageName = imageName.replace(/\:(\d+)/i, function(substring, args) {
        degree = parseFloat(RegExp.$1);
        return "";
      });
      
      var bitmap = ImageManager.loadPicture(imageName);
      var dx = textState.x;
      var dy = textState.y;
      var context = this.contents._context;

      if(!degree) degree = 0.0;

      var rotation = (Math.PI / 180.0) * degree;

      var c = Math.cos(rotation);
      var s = Math.sin(rotation);
      
      var x = dx;
      
      if(rotation) {
        x += (this.width / 2) - (this.standardPadding() * 2);
      }

      var y = dy;

      context.save();
      context.setTransform( c, s, -s, c, x, y );
      
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy);

      context.restore();

      if(isImageText) {
        textState.y += bitmap.height;
      }
      
    }
  }

  processEscapeCharacter(code, textState) {

    switch(code.toLowerCase()) {
      case 'image':
        this.addImage(textState, this.obtainImage(textState));
        break;
      default:  
        super.processEscapeCharacter(code, textState);
        break;
    }
  }

}

//============================================================================
// Scene_Information
//============================================================================

class Scene_Information extends Scene_MenuBase {
  
  constructor() {
    super()
    this._isReady = false;
  }

  create() {

    super.create();

    // Preload the images.
    preloadImages = [];

    var texts = MenuInformation.allText();
    texts.replace(/(?:IMAGE)\<(.*)\>/ig, function(substring, value) {
      const imageName = value.replace(/\:(\d+)/i, () => { return ""; });
      preloadImages.push( imageName );
    });
    
    preloadImages.forEach(function(i) {
      ImageManager.reservePicture(i, 0, preloadImageId);
    }, this);

    this._isReady = true;  
  }

  start() {
    super.start();

    // Create an information window
    this._informationWindow = new Window_Information();
    this.addWindow(this._informationWindow);

    this.refresh();    
  }

  isReady() {
    return this._isReady && super.isReady();
  }

  update() {
    super.update();
    if(this.isCancelled()) {
      this.popScene();
    }
  }

  terminate() {
    super.terminate();

    // Release the bitmap from reservation chche.
    ImageManager.releaseReservation(preloadImageId);   

  }

  isCancelled() {
    return Input.isTriggered('menu') || TouchInput.isCancelled();
  }

  refresh() {
    var actor = this.actor();
    this._informationWindow.setText(MenuInformation.allText());
    this._informationWindow.refresh();
    this._informationWindow.activate();
  }

}

window.Scene_Information = Scene_Information;

//============================================================================
// Game_Interpreter
//============================================================================

const alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
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
