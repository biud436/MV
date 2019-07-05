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
 *    MenuInformation add \image<picture_name> image1...
 *    MenuInformation add \image<picture_name:90> image2...
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
 * 2019.07.05 (v1.0.4) :
 * - Added the image text code.
 */
/*:ko
 * @plugindesc 간단한 텍스트를 표기할 수 있는 창을 만들 수 있습니다.
 * @author biud436
 *
 * @param Menu Name
 * @text 메뉴 이름
 * @desc 메뉴에 추가될 버튼의 이름을 적으세요.
 * @default Information
 *
 * @help
 * =============================================================================
 * 플러그인 명령에 대해...
 * =============================================================================
 * 
 * 정보 창에 새로운 라인을 추가하려면 다음 명령을 사용하세요.
 *
 *    MenuInformation add Hello, World
 *    MenuInformation add \image<picture_name> wow...
 *    MenuInformation add \image<picture_name:90> image2...
 *
 * 모든 텍스트를 삭제하려면 다음 명령을 사용하세요.
 *
 *    MenuInformation clear
 * 
 * 스크립트 호출을 위한 메서드는 제공되지 않습니다.
 *
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.01.04 (v1.0.0) - 출시.
 * 2016.02.27 (v1.0.1) - 약간의 코드 수정 (makeCommandList → addOriginalCommands)
 * 2016.03.05 (v1.0.1b) - 클래스 구조가 수정되었습니다.
 * 2017.01.23 (v1.0.2) - 소스를 ES6으로 변환했습니다.
 * 2017.09.06 (v1.0.3) - 소스를 ES5로 변환했습니다.
 * 2019.07.05 (v1.0.4) :
 * - 이미지 텍스트 코드 추가
 */

var Imported = Imported || {};
Imported.RS_MenuInformation = true;

(function() {

  "use strict";

  const parameters = PluginManager.parameters('RS_MenuInformation');
  let _menuName = String(parameters['Menu Name'] || "Information");
  let _menuSymbol = "information";
  
  let preloadingImage = true;
  let preloadImages = [];
  let preloadImageId = Utils.generateRuntimeId();
  let isImageText = false;

  //============================================================================
  // MenuInformation
  //============================================================================

  class MenuInformation {

    static add(text) {
      this._texts.push(text);
    }

    static clear() {
      if(this._texts.length > 0) this._texts = [];
    }

    static allText() {
      return this._texts.join('\n');
    }

  }

  MenuInformation._texts = [];

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
      var regExp = /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z가-ퟻ]+[!]*/i;
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
        imageName = imageName.replace(/\:(\d+)/i, ()=>{
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
      texts.replace(/(?:IMAGE)\<(.*)\>/ig, (...args) => {
        const imageName = args[1].replace(/\:(\d+)/i, () => { return ""; });
        preloadImages.push( imageName );
      });
      
      preloadImages.forEach((i) => ImageManager.reservePicture(i, 0, preloadImageId));

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

})();
