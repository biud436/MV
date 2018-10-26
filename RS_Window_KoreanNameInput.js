/*:
 * @plugindesc <RS_Window_KoreanNameInput>
 * @author biud436
 * 
 * @param Font Size
 * @desc Specify the font size in name processing.
 * @default 28
 * 
 * @param Line Height
 * @desc Specify the line height for window.
 * @default 36
 * 
 * @param Window Width
 * @desc Calculate the window width.
 * @default 480
 * 
 * @param Window Height
 * @desc Calculate the window height.
 * @default this.fittingHeight(6);
 * 
 * @param Default Button Width
 * @desc Specify the default button width.
 * @default Math.floor(this.width/this.maxCols());
 * 
 * @param Center Spacing
 * @desc Specify the spacing value in the middle space.
 * @default 0
 * 
 * @param Button Type
 * @type boolean
 * @desc Sets the button width how to calculate the width.
 * @default false
 * @on Crop
 * @off Expand
 * 
 * @param Help Message
 * 
 * @param messageForTouching
 * @parent Help Message
 * @desc 
 * @default The input mode has been switched to touch mode.
 * 
 * @param messageForDirectMode
 * @parent Help Message
 * @desc 
 * @default The input mode has been switched to direct input mode.
 * 
 * @param messageForPc
 * @parent Help Message
 * @desc 
 * @default Enter your own name directly on the keyboard.
 * 
 * @param messageForMobile
 * @parent Help Message
 * @desc 
 * @default Use your finger to touch the desired letter.
 * 
 * @help
 * =============================================================================
 * Pliugin Commands
 * =============================================================================
 * OpenKoreanNameInput actorId digits
 *
 *    actorId : if this value is to 'leader', it will automatically set up by the name of the player.
 *    digits : The maximum length of the name string. the default value is to 6.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2018.03.13 (v1.0.0) - First Release.
 * 2018.10.26 (v1.0.1) :
 * - Added the help window.
 * - You can switch the name input mode between direct mode and touch mode, and indicate corresponding message to help window.
 */
/*:ko
 * @plugindesc <RS_Window_KoreanNameInput>
 * @author biud436
 * 
 * @param Font Size
 * @text 폰트 크기
 * @desc Specify the font size in name processing.
 * @default 28
 * 
 * @param Line Height
 * @text 라인 크기
 * @desc Specify the line height for window.
 * @default 36
 * 
 * @param Window Width
 * @text 창 폭
 * @desc Calculate the window width.
 * @default 480
 * 
 * @param Window Height
 * @text 창 높이
 * @desc Calculate the window height.
 * @default this.fittingHeight(6);
 * 
 * @param Default Button Width
 * @text 기본 버튼 폭
 * @desc Specify the default button width.
 * @default Math.floor(this.width/this.maxCols());
 * 
 * @param Center Spacing
 * @text 중간 간격
 * @desc Specify the spacing value in the middle space.
 * @default 0
 * 
 * @param Button Type
 * @text 버튼 형식
 * @type boolean
 * @desc Sets the button width how to calculate the width.
 * @default false
 * @on 자르기(Crop)
 * @off 확장(Expand)
 * 
 * @param Help Message
 * @text 도움말 / 툴팁 설정
 * 
 * @param messageForTouching
 * @text 터치 모드
 * @parent Help Message
 * @desc
 * @default 터치 방식으로 전환되었습니다.
 * 
 * @param messageForDirectMode
 * @text 직접 입력 모드
 * @parent Help Message
 * @desc
 * @default 직접 입력 모드로 전환되었습니다.
 * 
 * @param messageForPc
 * @text 직접 타이핑
 * @parent Help Message
 * @desc
 * @default 키보드로 직접 원하는 이름을 입력 하세요.
 * 
 * @param messageForMobile
 * @text 직접 터치
 * @parent Help Message
 * @desc
 * @default 손가락으로 원하는 자/모음을 터치하세요.
 * 
 * @help
 * =============================================================================
 * 플러그인 명령
 * =============================================================================
 * OpenKoreanNameInput actorId digits
 *
 *    actorId : leader면 자동으로 게임 플레이어의 이름으로 설정됩니다.
 *    digits : 지정할 이름의 최대 길이로 기본값은 6입니다.
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2018.03.13 (v1.0.0) - First Release.
 * 2018.10.26 (v1.0.1) :
 * - 툴팁을 표시하는 창을 추가했습니다.
 * - 직접 입력과 터치 모드를 전환할 수 있으며 툴팁에 표시됩니다.
 */

var Imported = Imported || {};
Imported.RS_Window_KoreanNameInput = true;

var RS = RS || {};
RS.Window_KoreanNameInput = RS.Window_KoreanNameInput || {};
RS.Window_KoreanNameInput.Params = RS.Window_KoreanNameInput.Params || {};

(function () {
  
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_Window_KoreanNameInput>');
  });
  
  parameters = (parameters.length > 0) && parameters[0].parameters;    
  
  RS.Window_KoreanNameInput.Params.fontSize = parseInt(parameters["Font Size"] || 28);
  RS.Window_KoreanNameInput.Params.windowWidthEval = parameters["Window Width"] || "480";
  RS.Window_KoreanNameInput.Params.windowHeightEval = parameters["Window Height"] || "this.fittingHeight(6);";
  RS.Window_KoreanNameInput.Params.lineHeight = parseInt(parameters["Line Height"] || 36);
  RS.Window_KoreanNameInput.Params.buttonWidth = parameters["Default Button Width"] || "42";
  RS.Window_KoreanNameInput.Params.isCropped = Boolean(parameters["Button Type"] === "true");
  RS.Window_KoreanNameInput.Params.centerSpacing = parseInt(parameters["Center Spacing"] || 0);  
  RS.Window_KoreanNameInput.Params.fillLife = 3;
  
  RS.Window_KoreanNameInput.Params.messageForTouching = parameters["messageForTouching"] || "터치 방식으로 전환되었습니다.";
  RS.Window_KoreanNameInput.Params.messageForDirectMode = parameters["messageForDirectMode"] || "직접 입력 모드로 전환되었습니다.";
  RS.Window_KoreanNameInput.Params.messageForPc = parameters["messageForPc"] || "키보드로 직접 원하는 이름을 입력 하세요.";
  RS.Window_KoreanNameInput.Params.messageForMobile = parameters["messageForMobile"] || "손가락으로 원하는 자/모음을 터치하세요.";    
  
  function Window_KoreanNameInput() {
    this.initialize.apply(this, arguments);
  }
  
  Window_KoreanNameInput.prototype = Object.create(Window_NameInput.prototype);
  Window_KoreanNameInput.prototype.constructor = Window_KoreanNameInput;
  
  Window_KoreanNameInput.KOREAN =
  [ 'ㅂ','ㅈ','ㄷ','ㄱ','ㅅ',  'ㅛ','ㅕ','ㅑ','ㅐ','ㅔ',
  'ㅃ','ㅉ','ㄸ','ㄲ','ㅆ',  '','','','ㅒ','ㅖ',
  'ㅁ','ㄴ','ㅇ','ㄹ','ㅎ',  'ㅗ','ㅓ','ㅏ','ㅣ','',
  'ㅋ','ㅌ','ㅊ','ㅍ','ㅠ',  'ㅜ','ㅡ','','','',
  '1','2','3','4','5',  '6','7','8','9','0',
  '','','','','', '','','띄어쓰기','백스페이스','확인'];
  
  Window_KoreanNameInput.prototype.initialize = function(editWindow) {
    var self = this;
    this._dataFromTable = {};
    this._dataFromTable.maxItems = Window_KoreanNameInput.KOREAN.length;
    this._dataFromTable.okIndex = Window_KoreanNameInput.KOREAN.indexOf("확인");
    this._dataFromTable.backIndex = Window_KoreanNameInput.KOREAN.indexOf("백스페이스");
    this._dataFromTable.spaceIndex = Window_KoreanNameInput.KOREAN.indexOf("띄어쓰기");
    Window_NameInput.prototype.initialize.call(this, editWindow);
  };
  
  Window_KoreanNameInput.prototype.windowHeight = function() {
    return eval(RS.Window_KoreanNameInput.Params.windowHeightEval);
  };
  
  Window_KoreanNameInput.prototype.standardFontSize = function() {
    return RS.Window_KoreanNameInput.Params.fontSize;
  };
  
  Window_KoreanNameInput.prototype.lineHeight = function() {
    return RS.Window_KoreanNameInput.Params.lineHeight;
  };
  
  Window_KoreanNameInput.prototype.windowHeight = function() {
    return this.fittingHeight(6);
  };
  
  Window_KoreanNameInput.prototype.table = function() {
    return [Window_KoreanNameInput.KOREAN];
  };
  
  Window_KoreanNameInput.prototype.maxCols = function() {
    return 10;
  };
  
  Window_KoreanNameInput.prototype.maxItems = function() {
    return this.table().length;
  };
  
  Window_KoreanNameInput.prototype.character = function(index) {
    index = index || this._index;
    var c = this.table()[this._page][index];
    var exclude = ['띄어쓰기','백스페이스','확인'];
    var isCharacter = (exclude.indexOf(c) === -1);
    if(isCharacter) {
      return c;
    } else {
      return '';
    }
  };
  
  Window_KoreanNameInput.prototype.isPageChange = function() {
    return false;
  };
  
  Window_KoreanNameInput.prototype.processCursorMove = function() {
    var lastPage = this._page;
    Window_Selectable.prototype.processCursorMove.call(this);
    this.updateCursor();
    if (this._page !== lastPage) {
      SoundManager.playCursor();
    }
  };
  
  Window_KoreanNameInput.prototype.updateCursor = function() {
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
  };
  
  Window_KoreanNameInput.prototype.cursorPagedown = function() {
  };
  
  Window_KoreanNameInput.prototype.cursorPageup = function() {
  };
  
  Window_KoreanNameInput.prototype.cursorDown = function(wrap) {
    var max = this._dataFromTable.maxItems;
    var done = false;
    var temp = this._index;
    var depth = 0;
    while(!done) {
      if (temp < max - 10 || wrap) {
        if(temp > max - 20) {
          if(temp % 10 < 7) {
            temp = this._dataFromTable.spaceIndex;
          } else {
            temp = (temp + 10) % max;
          }
        } else {
          temp = (temp + 10) % max;
        }
      }
      var c = this.table()[this._page][temp];
      if(c !== '') {
        this._index = temp;
        done = true;
        depth = 0;
      }
      depth++;
      if(depth > 10) break;
    }
  };
  
  Window_KoreanNameInput.prototype.cursorUp = function(wrap) {
    var max = this._dataFromTable.maxItems;
    var done = false;
    var temp = this._index;
    var depth = 0;
    while(!done) {
      if (temp >= 10 || wrap) {
        temp = (temp + max - 10) % max;
      }
      var c = this.table()[this._page][temp];
      if(c !== '') {
        this._index = temp;
        done = true;
        depth = 0;
      }
      depth++;
      if(depth > 10) break;
    }
  };
  
  Window_KoreanNameInput.prototype.cursorRight = function(wrap) {
    var temp = this._index;
    var done = false;
    var depth = 0;
    while(!done) {
      if (temp % 10 < 9) {
        temp++;
      } else if (wrap) {
        temp -= 9;
      }
      var c = this.table()[this._page][temp];
      if(c !== '') {
        this._index = temp;
        done = true;
        depth = 0;
      }
      depth++;
      if(depth > 10) break;
    }
  };
  
  Window_KoreanNameInput.prototype.cursorLeft = function(wrap) {
    var temp = this._index;
    var done = false;
    var depth = 0;
    while(!done) {
      if (temp % 10 > 0) {
        temp--;
      } else if (wrap) {
        temp += 9;
      }
      var c = this.table()[this._page][temp];
      if(c !== '') {
        this._index = temp;
        done = true;
      }
      depth++;
      if(depth > 10) break;
    }
  };
  
  Window_KoreanNameInput.prototype.processHandling = function() {
    if (this.isOpen() && this.active) {
      if (Input.isRepeated('cancel')) {
        this.processBack();
      }
      if (Input.isRepeated('ok')) {
        this.processOk();
      }
    }
  };
  
  Window_KoreanNameInput.prototype.hitTest = function(x, y) {
    var maxItems = this._dataFromTable.maxItems;
    if (this.isContentsArea(x, y)) {
      var cx = x - this.padding;
      var cy = y - this.padding;
      var topIndex = this.topIndex();
      for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < maxItems) {
          var rect = this.itemRect(index);
          var right = rect.x + rect.width;
          var bottom = rect.y + rect.height;
          if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
            var c = this.table()[this._page][index];
            if(c !== '') {
              return index;
            }
          }
        }
      }
    }
    return -1;
  };
  
  Window_KoreanNameInput.prototype.itemRect = function(index) {
    var w = eval(RS.Window_KoreanNameInput.Params.buttonWidth);
    var c = RS.Window_KoreanNameInput.Params.centerSpacing;
    var lineHeight = this.lineHeight();
    
    if(!RS.Window_KoreanNameInput.Params.isCropped) {
      if(index === this._dataFromTable.spaceIndex ||
        index === this._dataFromTable.backIndex ||
        index === this._dataFromTable.okIndex
        ) {
          w = this.contentsWidth() / 6;
          return {
            x: this.contentsWidth() / 2 + (index % 3) * w,
            y: Math.floor(index / 10) * lineHeight,
            width: w,
            height: lineHeight
          };
        }
      }
      
      return {
        x: index % 10 * w + Math.floor(index % 10 / 5) * c,
        y: Math.floor(index / 10) * lineHeight,
        width: w,
        height: lineHeight
      };
      
      
    };
    
    Window_KoreanNameInput.prototype.refresh = function() {
      var table = this.table();
      this.contents.clear();
      this.resetTextColor();
      for (var i = 0; i < this._dataFromTable.maxItems; i++) {
        var rect = this.itemRect(i);
        rect.x += 3;
        rect.width -= 6;
        this.drawText(table[this._page][i], rect.x, rect.y, rect.width, 'center');
      }
    };
    
    Window_KoreanNameInput.prototype.isOk = function() {
      return this._index === this._dataFromTable.okIndex;
    };
    
    Window_KoreanNameInput.prototype.isBack = function () {
      return this._index === this._dataFromTable.backIndex;
    };
    
    Window_KoreanNameInput.prototype.isSpace = function () {
      return this._index === this._dataFromTable.spaceIndex;
    };
    
    Window_KoreanNameInput.prototype.processOk = function() {
      if (this.character()) {
        this.onNameAdd();
      } else if (this.isOk()) {
        this.onNameOk();
      } else if (this.isSpace()) {
        this._editWindow.add(" ");
      } else if(this.isBack()) {
        this.processBack();
      }
    };
    
    //============================================================================
    // Window_NameEdit
    //============================================================================
    
    function Window_KoreanNameEdit() {
      this.initialize.apply(this, arguments);
    };
    
    Window_KoreanNameEdit.prototype = Object.create(Window_NameEdit.prototype);
    Window_KoreanNameEdit.prototype.constructor = Window_KoreanNameEdit;
    
    Window_KoreanNameEdit.prototype.initialize = function(actor, maxLength) {
      Window_NameEdit.prototype.initialize.call(this, actor, maxLength);
      this._traceBackCallback = [];
      this._alertFunc = function() {};
      this._isOnAlertWindowWhenTyping = "none";
      this.on('removed', this.removeEventListener, this);
      this.addEventListener();    
    };
    
    Window_KoreanNameEdit.prototype.windowWidth = function() {
      return eval(RS.Window_KoreanNameInput.Params.windowWidthEval);
    };  
    
    Window_KoreanNameEdit.prototype.faceWidth = function() {
      return 0;
    };
    
    Window_KoreanNameEdit.prototype.refresh = function() {
      this.contents.clear();
      for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
      }
      for (var j = 0; j < this._name.length; j++) {
        this.drawChar(j);
      }
      var rect = this.itemRect(this._index);
      this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };
    
    Window_KoreanNameEdit.prototype.add = function(ch) {
      var index = Window_KoreanNameInput.KOREAN.indexOf(ch);
      var inputWindow;
      if(index >= 0) {
        if(inputWindow = this.isValidInputWindow()) {
          inputWindow._index = (ch === " ") ? inputWindow._dataFromTable.spaceIndex : index;
        }
      }
      if (this._index < this._maxLength) {
        var ret = (this._name.slice(0) + ch).split(""); // 배열로 변환
        this._name = Hangul.assemble( Hangul.disassemble(ret) );
        this._index = this._name.length;
        this.refresh();
        return true;
      } else {
        return false;
      }
    };
    
    Window_KoreanNameEdit.prototype.back = function() {
      var inputWindow;
      if(inputWindow = this.isValidInputWindow()) {
        inputWindow._index = inputWindow._dataFromTable.backIndex;
      }
      if (this._name.length > 0) {
        this._index--;
        var nameToArr = (this._name.split(""));
        var ret = Hangul.disassemble( nameToArr );
        ret = ret.slice(0, ret.join("").length - 1);
        ret = Hangul.assemble( ret );
        this._name = ret;
        this._index = this._name.length;
        this.refresh();
        return true;
      } else {
        return false;
      }
    };
    
    Window_KoreanNameEdit.prototype.charWidth = function() {
      var text = '\uAC00';
      return this.textWidth(text);
    };
    
    Window_KoreanNameEdit.prototype.refresh = function() {
      this.contents.clear();
      
      var rect = this.itemRect(Math.max(this._index - 1, 0));
      
      for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
      }
      for (var j = 0; j < this._name.length; j++) {
        this.drawChar(j);
      }
      if(this._index === 0) {
        this.setCursorRect(rect.x, rect.y, 1, rect.height);
      } else {
        this.setCursorRect(rect.x + (rect.width - 1), rect.y, 1, rect.height);
      }
    };
    
    Window_KoreanNameEdit.BACK_SPACE = 8;
    Window_KoreanNameEdit.ENTER = 13;
    Window_KoreanNameEdit.IS_NOT_CHAR = 32;
    Window_KoreanNameEdit.KEYS_ARRAY = 255;
    
    Window_KoreanNameEdit.prototype.addEventListener = function () {
      window.addEventListener('keydown', this.onKeyDown.bind(this), false);
      window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    };
    
    Window_KoreanNameEdit.prototype.removeEventListener = function () {
      window.removeEventListener('keydown', this.onKeyDown.bind(this));
      window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    };
    
    Window_KoreanNameEdit.prototype.update = function () {
      Window_NameEdit.prototype.update.call(this);
      this.processBackCallback();
    };
    
    Window_KoreanNameEdit.prototype.processBackCallback = function () {
      var back = this._traceBackCallback.pop();
      if(back && typeof back === "string") {
        this.back();
      }
    };
    
    Window_KoreanNameEdit.HANGUL_KEYS = {
      32: [" "],
      49: ["1", "!"],
      50: ["2", "@"],
      51: ["3", "#"],
      52: ["4", "$"],
      53: ["5", "%"],
      54: ["6", "^"],
      55: ["7", "&"],
      56: ["8", "*"],
      57: ["9", "("],
      48: ["0", ")"],
      65: ["ㅁ"],
      66: ["ㅠ"],
      67: ["ㅊ"],
      68: ["ㅇ"],
      69: ["ㄷ", "ㄸ"],
      70: ["ㄹ"],
      71: ["ㅎ"],
      72: ["ㅗ"],
      73: ["ㅑ"],
      74: ["ㅓ"],
      75: ["ㅏ"],
      76: ["ㅣ"],
      77: ["ㅡ"],
      78: ["ㅜ"],
      79: ["ㅐ", "ㅒ"],
      80: ["ㅔ", "ㅖ"],
      81: ["ㅂ", "ㅃ"],
      82: ["ㄱ", "ㄲ"],
      83: ["ㄴ"],
      84: ["ㅅ", "ㅆ"],
      85: ["ㅕ"],
      86: ["ㅍ"],
      87: ["ㅈ", "ㅉ"],
      88: ["ㅌ"],
      89: ["ㅛ"],
      90: ["ㅋ"],
      188: [",", "<"],
      190: [".", ">"],
      191: ["/", "?"]
    };
    
    Window_KoreanNameEdit.prototype.isValidInputWindow = function () {
      var scene = SceneManager._scene;
      return scene._inputWindow;
    };
    
    Window_KoreanNameEdit.ARROW_LEFT = 37;
    Window_KoreanNameEdit.ARROW_UP = 38;
    Window_KoreanNameEdit.ARROW_RIGHT = 39;
    Window_KoreanNameEdit.ARROW_DOWN = 40;
    
    Window_KoreanNameEdit.prototype.onKeyDown = function(e) {
      var keyCode = e.which;
      var self = this;
      var scene = SceneManager._scene;
      var inputWindow;
      
      if (keyCode < Window_KoreanNameEdit.IS_NOT_CHAR) {
        
        if(inputWindow = this.isValidInputWindow()) inputWindow.active = true;            
        if(keyCode === Window_KoreanNameEdit.BACK_SPACE) {
          
          setTimeout(function () {
            self._traceBackCallback.push("back");
          }, 0);
          e.preventDefault();
          
        } else if(keyCode === Window_KoreanNameEdit.ENTER) {
          if(inputWindow = this.isValidInputWindow()) {
            inputWindow._index = inputWindow._dataFromTable.okIndex;
          }
          e.preventDefault();
        }
        
      } else if (keyCode < Window_KoreanNameEdit.KEYS_ARRAY) {  
        if(inputWindow = this.isValidInputWindow()) inputWindow.active = false;    
        var c = "";
        if(c = Window_KoreanNameEdit.HANGUL_KEYS[keyCode]) {
          c = (e.shiftKey && c.length > 1) ? c[1] : c[0];
          this.add(c);
        }
      }
      
      if(this._isOnAlertWindowWhenTyping === "none" || this._isOnAlertWindowWhenTyping === "mouse:on") {
        this.onAlert(RS.Window_KoreanNameInput.Params.messageForDirectMode);
        this._isOnAlertWindowWhenTyping = "keyboard:on";
      }    
      
    };
    
    Window_KoreanNameEdit.prototype.onMouseMove = function(event) {
      if(this._isOnAlertWindowWhenTyping === "none" || this._isOnAlertWindowWhenTyping === "keyboard:on") {    
        this.onAlert(RS.Window_KoreanNameInput.Params.messageForTouching);
        this._isOnAlertWindowWhenTyping = "mouse:on";
      }
      var inputWindow = this.isValidInputWindow();
      inputWindow.active = true;
    }
    
    Window_KoreanNameEdit.prototype.bindAlert = function(_alertFunc_) {
      this._alertFunc = _alertFunc_;
    };
    
    Window_KoreanNameEdit.prototype.onAlert = function(text) {
      if(!this._alertFunc) return;
      this._alertFunc(text);
    };
    
    //============================================================================
    // Scene_Name
    //============================================================================
    
    function Scene_KoreanName() {
      this.initialize.apply(this, arguments);
    };
    
    Scene_KoreanName.prototype = Object.create(Scene_Name.prototype);
    Scene_KoreanName.prototype.constructor = Scene_KoreanName;
    
    Scene_KoreanName.prototype.initialize = function() {
      Scene_Name.prototype.initialize.call(this);
      this._nowTime = Date.now();
    };
    
    Scene_KoreanName.prototype.create = function() {
      Scene_MenuBase.prototype.create.call(this);
      this._actor = $gameActors.actor(this._actorId);
      this.createHelpWindow();    
      this.createEditWindow();
      this.createInputWindow();
    };  
    
    Scene_KoreanName.prototype.createHelpWindow = function() {
      this._helpWindow = new Window_Help(1);
      this._helpWindow.x = 0;
      this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height - 1;
      this._helpWindow.opacity = 0;
      this._helpWindow.hide();
      this._helpWindowLife = 0;
      this.addWindow(this._helpWindow);
    };
    
    Scene_KoreanName.prototype.update = function() {
      Scene_Name.prototype.update.call(this);
      if( Date.now() - this._nowTime >= 1000) {
        this._helpWindowLife--;
        if(this._helpWindowLife <= 0) {
          this._helpWindow.hide();
        }
        this._nowTime = Date.now();
      }
    };
    
    Scene_KoreanName.prototype.onAlert = function(text) {
      var self = this;
      this._helpWindow.setText(text);
      this._helpWindow.show();
      this._helpWindowLife = RS.Window_KoreanNameInput.Params.fillLife;
    };
    
    Scene_KoreanName.prototype.createEditWindow = function() {
      this._editWindow = new Window_KoreanNameEdit(this._actor, this._maxLength);
      this._editWindow.bindAlert( this.onAlert.bind(this) );
      if(Utils.isNwjs() === true) {
        this._editWindow.onAlert( RS.Window_KoreanNameInput.Params.messageForPc);
      } else {
        this._editWindow.onAlert( RS.Window_KoreanNameInput.Params.messageForMobile );
      }
      this.addWindow(this._editWindow);
    };
    
    Scene_KoreanName.prototype.createInputWindow = function() {
      this._inputWindow = new Window_KoreanNameInput(this._editWindow);
      this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
      this.addWindow(this._inputWindow);
    };
    
    //===========================================================================
    // Game_Interpreter
    //===========================================================================
    
    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "OpenKoreanNameInput") {
        if (!$gameParty.inBattle()) {
          var leaderId = $gameParty.leader().actorId();
          var actorId = (args[0] === "leader") ? leaderId : (parseInt(args[0]) || leaderId);
          var digits = parseInt(args[1]) || 6;
          if ($dataActors[actorId]) {
            SceneManager.push(Scene_KoreanName);
            SceneManager.prepareNextScene(actorId, digits);
          }
        }
      }
    };
    
  })();
  
  /*! hangul-js 2017-06-12 */
  // https://github.com/e-/Hangul.js MIT
  //  Copyright (c) 2012-2018 Jaemin Jo
  //
  // Permission is hereby granted, free of charge, to any person
  // obtaining a copy of this software and associated documentation
  // files (the "Software"), to deal in the Software without
  // restriction, including without limitation the rights to use,
  // copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the
  // Software is furnished to do so, subject to the following
  // conditions:
  //
  // The above copyright notice and this permission notice shall be
  // included in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  // EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  // OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  // NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  // HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  // WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  // FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  // OTHER DEALINGS IN THE SOFTWARE.
  !function(){"use strict";function a(a){for(var b=a.length,c={0:0},d=0;b>d;d++)a[d]&&(c[a[d].charCodeAt(0)]=d);return c}function b(a){for(var b,c,d=a.length,e={},f=0;d>f;f++)b=a[f][0].charCodeAt(0),c=a[f][1].charCodeAt(0),"undefined"==typeof e[b]&&(e[b]={}),e[b][c]=a[f][2].charCodeAt(0);return e}function c(a){return"undefined"!=typeof k[a]}function d(a){return"undefined"!=typeof l[a]}function e(a){return"undefined"!=typeof m[a]}function f(a){return"undefined"!=typeof n[a]}function g(a){return a>=44032&&55203>=a}function h(a,b){return p[a]&&p[a][b]?p[a][b]:!1}function i(a,b){return o[a]&&o[a][b]?o[a][b]:!1}function j(a){this.string=a,this.disassembled=A(a).join("")}var k,l,m,n,o,p,q=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],r=["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ",["ㅗ","ㅏ"],["ㅗ","ㅐ"],["ㅗ","ㅣ"],"ㅛ","ㅜ",["ㅜ","ㅓ"],["ㅜ","ㅔ"],["ㅜ","ㅣ"],"ㅠ","ㅡ",["ㅡ","ㅣ"],"ㅣ"],s=["","ㄱ","ㄲ",["ㄱ","ㅅ"],"ㄴ",["ㄴ","ㅈ"],["ㄴ","ㅎ"],"ㄷ","ㄹ",["ㄹ","ㄱ"],["ㄹ","ㅁ"],["ㄹ","ㅂ"],["ㄹ","ㅅ"],["ㄹ","ㅌ"],["ㄹ","ㅍ"],["ㄹ","ㅎ"],"ㅁ","ㅂ",["ㅂ","ㅅ"],"ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],t=44032,u=["ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄸ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅃ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],v=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],w=["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"],x=["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],y=[["ㄱ","ㅅ","ㄳ"],["ㄴ","ㅈ","ㄵ"],["ㄴ","ㅎ","ㄶ"],["ㄹ","ㄱ","ㄺ"],["ㄹ","ㅁ","ㄻ"],["ㄹ","ㅂ","ㄼ"],["ㄹ","ㅅ","ㄽ"],["ㄹ","ㅌ","ㄾ"],["ㄹ","ㅍ","ㄿ"],["ㄹ","ㅎ","ㅀ"],["ㅂ","ㅅ","ㅄ"]],z=[["ㅗ","ㅏ","ㅘ"],["ㅗ","ㅐ","ㅙ"],["ㅗ","ㅣ","ㅚ"],["ㅜ","ㅓ","ㅝ"],["ㅜ","ㅔ","ㅞ"],["ㅜ","ㅣ","ㅟ"],["ㅡ","ㅣ","ㅢ"]];k=a(u),l=a(v),m=a(w),n=a(x),o=b(y),p=b(z);var A=function(a,b){if(null===a)throw new Error("Arguments cannot be null");"object"==typeof a&&(a=a.join(""));for(var f,h,i,j,k,o=[],p=a.length,u=0;p>u;u++){var v=[];j=a.charCodeAt(u),g(j)?(j-=t,i=j%28,h=(j-i)/28%21,f=parseInt((j-i)/28/21),v.push(q[f]),"object"==typeof r[h]?v=v.concat(r[h]):v.push(r[h]),i>0&&("object"==typeof s[i]?v=v.concat(s[i]):v.push(s[i]))):c(j)?(k=d(j)?q[l[j]]:s[n[j]],"string"==typeof k?v.push(k):v=v.concat(k)):e(j)?(k=r[m[j]],"string"==typeof k?v.push(k):v=v.concat(k)):v.push(a.charAt(u)),b?o.push(v):o=o.concat(v)}return o},B=function(a){return"string"!=typeof a?"":(a=A(a),a.join(""))},C=function(a){function b(b){var c,f,g,k,o=0,q="";if(!(p+1>b))for(var r=1;;r++){if(1===r){if(c=a[p+r].charCodeAt(0),e(c))return b>=p+r+1&&e(f=a[p+r+1].charCodeAt(0))?(j.push(String.fromCharCode(h(c,f))),void(p=b)):(j.push(a[p+r]),void(p=b));if(!d(c))return j.push(a[p+r]),void(p=b);q=a[p+r]}else if(2===r){if(f=a[p+r].charCodeAt(0),d(f))return c=i(c,f),q=String.fromCharCode(c),j.push(q),void(p=b);q=String.fromCharCode(28*(21*l[c]+m[f])+t)}else 3===r?(g=a[p+r].charCodeAt(0),h(f,g)?f=h(f,g):o=g,q=String.fromCharCode(28*(21*l[c]+m[f])+n[o]+t)):4===r?(k=a[p+r].charCodeAt(0),o=i(o,k)?i(o,k):k,q=String.fromCharCode(28*(21*l[c]+m[f])+n[o]+t)):5===r&&(k=a[p+r].charCodeAt(0),o=i(o,k),q=String.fromCharCode(28*(21*l[c]+m[f])+n[o]+t));if(p+r>=b)return j.push(q),void(p=b)}}"string"==typeof a&&(a=A(a));for(var c,g,j=[],k=a.length,o=0,p=-1,q=0;k>q;q++)c=a[q].charCodeAt(0),d(c)||e(c)||f(c)?(0===o?d(c)?o=1:e(c)&&(o=4):1==o?e(c)?o=2:i(g,c)?o=5:b(q-1):2==o?f(c)?o=3:e(c)?h(g,c)||(b(q-1),o=4):(b(q-1),o=1):3==o?f(c)?i(g,c)||(b(q-1),o=1):d(c)?(b(q-1),o=1):e(c)&&(b(q-2),o=2):4==o?e(c)?h(g,c)?(b(q),o=0):b(q-1):(b(q-1),o=1):5==o&&(e(c)?(b(q-2),o=2):(b(q-1),o=1)),g=c):(b(q-1),b(q),o=0);return b(q-1),j.join("")},D=function(a,b){var c=A(a).join(""),d=A(b).join("");return c.indexOf(d)},E=function(a,b){function c(a){for(var b=0,c=0;b<h.length;++b)if(c+=h[b].length,c>a)return b}function d(a){for(var b=0,c=0;b<h.length;++b)if(c+=h[b].length,a+g.length<=c)return b}var e,f=A(a).join(""),g=A(b).join(""),h=A(a,!0),i=new RegExp(g,"gi"),j=[];if(!b.length)return[];for(;e=i.exec(f);)j.push(e.index);return j.map(function(a){return[c(a),d(a)]})};j.prototype.search=function(a){return A(a).join("").indexOf(this.disassembled)};var F=function(a){"object"==typeof a&&(a=a.join(""));var b=a.charCodeAt(a.length-1);if(g(b)){b-=t;var d=b%28;if(d>0)return!0}else if(c(b))return!0;return!1},G={disassemble:A,d:A,disassembleToString:B,ds:B,assemble:C,a:C,search:D,rangeSearch:E,Searcher:j,endsWithConsonant:F,isHangul:function(a){return"string"==typeof a&&(a=a.charCodeAt(0)),g(a)},isComplete:function(a){return"string"==typeof a&&(a=a.charCodeAt(0)),g(a)},isConsonant:function(a){return"string"==typeof a&&(a=a.charCodeAt(0)),c(a)},isVowel:function(a){return"string"==typeof a&&(a=a.charCodeAt(0)),e(a)},isCho:function(a){return"string"==typeof a&&(a=a.charCodeAt(0)),d(a)},isJong:function(a){return"string"==typeof a&&(a=a.charCodeAt(0)),f(a)},isHangulAll:function(a){if("string"!=typeof a)return!1;for(var b=0;b<a.length;b++)if(!g(a.charCodeAt(b)))return!1;return!0},isCompleteAll:function(a){if("string"!=typeof a)return!1;for(var b=0;b<a.length;b++)if(!g(a.charCodeAt(b)))return!1;return!0},isConsonantAll:function(a){if("string"!=typeof a)return!1;for(var b=0;b<a.length;b++)if(!c(a.charCodeAt(b)))return!1;return!0},isVowelAll:function(a){if("string"!=typeof a)return!1;for(var b=0;b<a.length;b++)if(!e(a.charCodeAt(b)))return!1;return!0},isChoAll:function(a){if("string"!=typeof a)return!1;for(var b=0;b<a.length;b++)if(!d(a.charCodeAt(b)))return!1;return!0},isJongAll:function(a){if("string"!=typeof a)return!1;for(var b=0;b<a.length;b++)if(!f(a.charCodeAt(b)))return!1;return!0}};"function"==typeof define&&define.amd?define(function(){return G}):"undefined"!=typeof module?module.exports=G:window.Hangul=G}();
  