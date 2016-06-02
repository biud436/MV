/*:
 * RS_Net_Module.js
 * @plugindesc Online Chat (Node.js + Socket.io)
 * @author biud436
 *
 * @param SERVER_IP
 * @desc IP
 * @default 127.0.0.1
 *
 * @param PORT
 * @desc PORT
 * @default 3100
 *
 * @help
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 *
 * 2015.11.06 - First Release, Added the Text Box
 * 2015.11.07 - Fixed the Text Box
 * 2015.11.08 - Added A Server based on NodeJS and Chat.
 * 2015.11.23 - Added a many function in the client.
 * 2015.11.24 - Added a function called '$gameMessage.addNotice()'
 * 2015.11.25 - Added functions that could download the login page from the Server.
 * 2016.05.10 - Added plugin parameters that could change the IP or Port of the Server.
 *
 * =============================================================================
 * Development Environment
 * =============================================================================
 * node.js, socket.io
 *
 * =============================================================================
 * Basic chatting commands
 * =============================================================================
 * @닉변 : 닉네임명 - This command provides a function that could change a nickname on chat box.
 *
 * =============================================================================
 * Basic Functions
 * =============================================================================
 * RS.Net.userCount() - Get the number of connected users on the server.
 * RS.Net.getTime() - Get the time of the server.
 * RS.Net.loadScript(ScriptName) - Download specific script from the server.
 * RS.UI.prepareLoginElement() - Indicate the Login page.
 *
 */

// Server URL

var RS = RS || {};
var $serverURL = undefined;
var $socket = undefined;

RS.UI = RS.UI || {};
RS.Net = RS.Net || {};

function Field() {
  this.initialize.apply(this, arguments);
};

function TextField() {
  this.initialize.apply(this, arguments);
};

function ChatBox() {
  this.initialize.apply(this, arguments);
};

(function () {

  RS.Net.Params = $plugins.filter(function(i) {
      if(i.name === 'RS_Net_Module') {
          return true;
      }
  })[0].parameters;

  RS.Net.createServerURL = function() {
    var self = this;
    var param = self.Params;
    var url = "http://" + param.SERVER_IP + ":" + param.PORT;
    return url;
  };

  $serverURL = $serverURL || RS.Net.createServerURL();
  $socket = $socket || io.connect($serverURL);

  //------------------------------------------------------------------------------
  // Field
  //
  //

  Field.prototype.constructor = Field;
  Field._instance = null;

  Field.prototype.initialize = function() {
    this._o = document.createElement('div');
    this._o.style.position = 'absolute';
    this._o.style.margin = 'auto';
    this._o.style.left = '0';
    this._o.style.top = '0';
    this._o.style.right = '0';
    this._o.style.bottom = '0';
    this._o.style.width = Graphics.boxWidth + 'px';
    this._o.style.height = Graphics.boxHeight + 'px';
    this._o.style.zIndex = "1000";
    document.body.appendChild(this._o);
  };

  Field.prototype.addChild = function(element) {
    this._o.appendChild(element);
  };

  Field.prototype.removeChild = function(element) {
    this._o.parentNode.removeChild(element);
    element = null;
  };

  Field.prototype.terminate = function() {
    document.body.removeChild(this._o);
  };

  //------------------------------------------------------------------------------
  // TextField
  //
  //

  TextField.prototype = Object.create(Field.prototype);
  TextField.prototype.constructor = TextField;

  TextField.CHOSUNG_LIST = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
    'ㅅ', 'ㅆ', 'ㅇ' , 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];

  TextField.JUNGSUNG_LIST = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
    'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
    'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ',
    'ㅡ', 'ㅢ', 'ㅣ'
  ];

  TextField.JONGSUNG_LIST = [
    ' ', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ',
    'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
    'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];

  TextField.prototype.initialize = function(x, y, width, height) {

    this._LastestkeyName = 'none';
    this._keyMapper = {};
    this._key = [];
    this._text = [];
    this._composition = false;
    this._newLine = false;
    this._cursorIndex = 0;

    Field.prototype.initialize.call(this);
    this._inputField.id = 'input1';
    this._inputField.type = 'text';
    this._inputField.style.position = 'absolute';
    this._inputField.style.margin = 'auto';
    this._inputField.style.left = x + 'px';
    this._inputField.style.top = y + '0';
    this._inputField.style.width = width + 'px';
    this._inputField.style.height = height + 'px';
    this._inputField.addEventListener('keydown', this.onkeydown.bind(this));
    this._inputField.addEventListener('keyup', this.onkeyup.bind(this));
    this.addChild(this._inputField);
  };

  TextField.prototype.onresize = function(yPos) {
    var rect = ChatBox.getEditBoxRect(yPos);
    this._inputField.style.position = 'absolute'
    this._inputField.style.left = rect.x + 'px'
    this._inputField.style.top = rect.y + 'px';
    this._inputField.style.width= rect.width + "px";
    this._inputField.style.height = rect.height + 'px';
  };

  TextField.prototype.onkeydown = function (e) {
    if(e.keyCode < 255) {
      this._LastestkeyName = String.fromCharCode( e.keyCode );
      this._keyMapper[e.keyCode] = true;
      this._key.push( e.keyCode );
      this.keyIn( this._LastestkeyName );
    }
  };

  TextField.prototype.onkeyup = function (e) {
    if(e.keyCode < 255) {
      this._keyMapper[e.keyCode] = false;
      this._key.pop();
    }
  };

  TextField.prototype.keyIn = function (keyString) {
    switch (keyString) {
      case '\r':
      case '\n':
        this._text = [];
        this._newLine = true;
        break;
      case '\b':
        if(this._text.length > 0) {
          this._text.pop();
        }
        break;
      default:
        this._text.push(keyString);
        if(this.isHangul(keyString)) {
          this.composition();
        }
    }

  };

  TextField.prototype.composition = function() {

    // var text = undefined;
    // var nextText = undefined;
    // var compositionText = '';
    // var a, b, c, i;
    //
    // var startIdx = 0;
    // var count = 1;
    //
    // this._composition = true;
    // this._subComposition = false;
    //
    // i = 0;
    //
    // while(this._composition) {
    //   text = this._text[i];
    //   nextText = this._text[i+1];
    //
    //   // 초성
    //   if( (this.CHOSUNG_LIST.indexOf(text) > 0) ) {
    //     if( (nextText !== 'ㄴ') || (nextText !== 'ㄹ') ||  (nextText !== 'ㅂ')) {
    //       this._composition = false;
    //     }
    //     a = this.CHOSUNG_LIST.indexOf(text);
    //   }
    //
    //   // 중성
    //   if( (this.JUNGSUNG_LIST.indexOf(text) > 0) ) {
    //
    //     b = this.JUNGSUNG_LIST.indexOf(text);
    //
    //     if(text === 'ㅗ' && nextText === 'ㅏ') {
    //       b = this.JUNGSUNG_LIST.indexOf('ㅘ');
    //     } else if(text === 'ㅗ' && nextText === 'ㅐ') {
    //       b = this.JUNGSUNG_LIST.indexOf('ㅙ');
    //     } else if(text === 'ㅗ' && nextText === 'ㅣ') {
    //       b = this.JUNGSUNG_LIST.indexOf('ㅚ');
    //     } else if(text === 'ㅗ') {
    //       b = this.JUNGSUNG_LIST.indexOf('ㅗ');
    //     }
    //
    //   }
    //
    //   // 종성
    //   if( (this.JONGSUNG_LIST.indexOf(text) > 0) ) {
    //
    //     c = this.JONGSUNG_LIST.indexOf(text);
    //
    //     if(text === 'ㄴ' && nextText === 'ㅈ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄵ');
    //       this._composition = false;
    //     } else if(text === 'ㄴ' && nextText === 'ㅎ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄶ');
    //       this._composition = false;
    //     } else if(text === 'ㄴ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄴ');
    //       this._composition = false;
    //     }
    //
    //     if(text === 'ㄹ' && nextText === 'ㄱ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄺ');
    //       this._composition = false;
    //     } else if(text === 'ㄹ' && nextText === 'ㅁ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄻ');
    //       this._composition = false;
    //     } else if(text === 'ㄹ' && nextText === 'ㅂ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄼ');
    //       this._composition = false;
    //     } else if(text === 'ㄹ' && nextText === 'ㅅ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄽ');
    //       this._composition = false;
    //     } else if(text === 'ㄹ' && nextText === 'ㅌ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄾ');
    //       this._composition = false;
    //     } else if(text === 'ㄹ' && nextText === 'ㅍ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄿ');
    //       this._composition = false;
    //     } else if(text === 'ㄹ' && nextText === 'ㅎ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㅀ');
    //       this._composition = false;
    //     } else if(text === 'ㄹ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㄹ');
    //       this._composition = false;
    //     }
    //
    //     if(text === 'ㅂ' && nextText === 'ㅅ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㅄ');
    //       this._composition = false;
    //     } else if(text === 'ㅂ') {
    //       c = this.JONGSUNG_LIST.indexOf('ㅂ');
    //       this._composition = false;
    //     }
    //
    //   }
    //
    // }
    //
    // compositionText = String.fromCharCode( 44032 + ( (2 * 588) + (1 * 28) + (8) ) );
    // this._text.splice(startIdx, count, compositionText);
  };

  TextField.prototype.isHangul = function(str) {
    return (
      (this.CHOSUNG_LIST.indexOf(str) > 0) ||
      (this.JUNGSUNG_LIST.indexOf(str) > 0) ||
      (this.JONGSUNG_LIST.indexOf(str) > 0)
    );
  }

  TextField.prototype.clear = function () {
    this._LastestkeyName = 'none';
    this._text = [];
    this._key = [];
  };

  TextField.prototype.terminate = function() {
    this.clear();
    this.removeChild(this._inputField);
  };

})();

//------------------------------------------------------------------------------
// RS.Net
//
//

(function() {

  // Download the script from the server.
  this.loadScript = function(name) {
      var url = "%1/%2".format($serverURL, name);
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = false;
      script._url = url;
      document.body.appendChild(script);
  };

  // Download the script called 'JsonFormatter.js' from the server.
  this.loadScript('JsonFormatter.js');

  // Get the number of connected users on the server.
  this.userCount = function() {
    $socket.on('user count',function(msg) {
      console.log(msg);
    });
  };

  // Get the number of connected users on the server.
  this.update = function() {
    $socket.emit('user count', '');
  };

  /** 인스턴스 갯수 */
  this.count = 0;
  this.cryptText = "";
  this.cryptKey = "";

  // Get the time of the server.
  this.getTime = function() {
    $socket.emit('get time','');
    $socket.on('get time',function(msg) {
      console.log(msg);
    });
  };

  this.setCryptKey = function() {
    $socket.emit('get key', '');
  }

  /** 암호화 데이터 요청 */
  this.setEncryption = function(msg) {
    $socket.emit('crypt', msg);
  };

  /** 암호화 데이터 획득 */
  this.getCryptObject = function(msg) {
     return JSON.parse(this.cryptText);
  };

}).call(RS.Net);

//------------------------------------------------------------------------------
// RS.UI
//
//

(function() {

  // Prepare Element
  this.prepareElement = function() {
    var divc = document.createElement('div');
    divc.id = 'inputField';
    // divc.innerHTML = "<input id='input1' type='text'></input>";
    divc.style.position = 'absolute';
    divc.style.margin = 'auto';
    divc.style.left = '0';
    divc.style.top = '0';
    divc.style.right = '0';
    divc.style.bottom = '0';
    divc.style.width = Graphics.boxWidth + 'px';
    divc.style.height = Graphics.boxHeight + 'px';
    divc.style.zIndex = "1000";
    document.body.appendChild(divc);
    return divc;
  };

  this.createInputField = function(x, y, width, height) {
    var element = document.createElement('input');
    element.id = 'input1';
    element.type = 'text';
    element.style.position = 'absolute';
    element.style.margin = 'auto';
    element.style.left = x + 'px';
    element.style.top = y + '0';
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    var div = document.getElementById('inputField');
    div.appendChild(element);
  };

  // Prepare Login Element
  this.prepareLoginElement = function() {
    var divc = document.createElement('div');
    divc.id = 'loginField';
    divc.style.zIndex = "1010";
    divc.style.width = Graphics.boxWidth + 'px';
    divc.style.height = Graphics.boxHeight + 'px';
    Graphics._centerElement(divc);
    document.body.appendChild(divc);

    var iframe = document.createElement('iframe');
    iframe.id = 'loginField';
    iframe.src = $serverURL + '/login.html';
    iframe.style.left = '0px';
    iframe.style.top = '0px';
    // iframe.style.width = 300 + 'px';
    // iframe.style.height = 300 + 'px';
    iframe.style.zIndex = "1001";
    iframe.style.borderWidth = '0px';
    divc.appendChild(iframe)
    return divc;
  };

  // Remove Login Element
  this.removeLoginElement = function() {
    var divc = document.getElementById('loginField');
    document.body.removeChild(divc);
  };

  // Create <input> tag
  this.addTextBox = function(yPosition) {
    var rect, inp;
    rect = ChatBox.getEditBoxRect(yPosition);
    inp =document.getElementById('input1');
    inp.style.position = 'absolute'
    inp.style.backgroundColor =  'rgba(0,0,0,0.6)';
    inp.style.left = rect.x + 'px'
    inp.style.top = rect.y + 'px';
    inp.style.width= rect.width + "px";
    inp.style.height = rect.height + 'px';
    inp.style.borderColor = inp.style.backgroundColor;
    return inp;
  };

  // Orientation
  this.getHeight = function() {
    var vv = (window.innerHeight - Graphics.boxHeight), top;
    top = vv > 0 ? (vv / 2) : vv;
    return top;
  };

  // 윈도우의 크기가 달라졌을 때
  this.resizeTextBox = function(yPosition) {

    var inp, left;
    inp = document.getElementById('input1');
    left = (window.innerWidth - Graphics.boxWidth) / 2;

    var rect = ChatBox.getEditBoxRect(yPosition);

    inp.style.position = 'absolute';
    inp.style.left = rect.x + 'px';
    inp.style.top = rect.y + 'px';
    inp.style.width= (rect.width / Graphics._realScale ) + "px";
    inp.style.height = rect.height + 'px';

  };

}).call(RS.UI);

//------------------------------------------------------------------------------
// ChatBox
//
//

(function() {

  ChatBox.prototype = Object.create(Window_Base.prototype);
  ChatBox.prototype.constructor = ChatBox;

   /**  초기화 */
  ChatBox.prototype.initialize = function() {
    Window_Base.prototype.initialize.apply(this, arguments);
    this.opacity = 0;
  };

  /**  간격 설정 */
  ChatBox.prototype.standardPadding = function() {
      return 0;
  };

  /**  기본 폰트 크기 */
  ChatBox.prototype.standardFontSize = function() {
      return 12;
  };

  /** 폰트 설정 초기화  */
  ChatBox.prototype.resetFontSettings = function() {
      this.contents.fontFace = this.standardFontFace();
      this.contents.fontSize = this.standardFontSize();
      this.resetTextColor();
  };

  /** X좌표 */
  ChatBox.getX = function(clientX, w) {
    var gc = document.querySelector('canvas');
    var bound = document.getElementById('inputField').getBoundingClientRect();
    return (window.innerWidth - Graphics.width) / 2 + (clientX - bound.left) * (gc.width / bound.width);
  };

  /** Y좌표 */
  ChatBox.getY = function(clientY, h) {
    var gc = document.querySelector('canvas');
    var bound = document.getElementById('inputField').getBoundingClientRect();
    return (window.innerHeight - Graphics.height) / 2 + (clientY - bound.top) * (gc.height / bound.height);
  };

  /**  영역 획득 */
  ChatBox.getEditBoxRect = function(yPosition) {
    var rect = new Rectangle();
    rect.width = Graphics.boxWidth / 2;
    rect.height = 20;
    rect.x = ChatBox.getX(10, rect.width);
    rect.y = ChatBox.getY(yPosition, rect.height);
    return rect;
  };

})();

(function() {

  //==============================================================================
  // Scene_Map
  //==============================================================================

  /** 에디트박스를 생성합니다 */
  Scene_Map.prototype.createEditBox = function(yPosition) {
    var inp, divc;
    divc = RS.UI.prepareElement();
    inp = RS.UI.addTextBox(yPosition);
    window.onresize = RS.UI.resizeTextBox(yPosition);
    return inp;
  };

  /** 생성 */
  var _Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;

  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);

    this.createChatBox();

  };

  //==============================================================================
  // Input
  //==============================================================================

  /** 키보드 맵핑 (문제가 있으므로 나중에 수정) */
  Input._shouldPreventDefault = function(keyCode) {
      switch (keyCode) {
      // case 8:     // backspace
      case 33:    // pageup
      case 34:    // pagedown
      case 37:    // left arrow
      case 38:    // up arrow
      case 39:    // right arrow
      case 40:    // down arrow
          return true;
      }
      return false;
  };

  //==============================================================================
  // Game_Temp
  //==============================================================================

  /** 채팅입력창을 클릭했을 때 이동 시스템 해제  */
  Game_Temp.prototype.isDestinationValid = function() {
    return (this._destinationX !== null) && !$gameTemp.chatFocus;
  };

  //==============================================================================
  // Scene_Map
  //==============================================================================

  /**  */
  Scene_Map.prototype.createChatBox = function() {

    // ------------------------------------------------------------------------
    // Create new Chat Box

    this._chatBox = new ChatBox(0, 0, Graphics.boxWidth / 2, Graphics.boxHeight / 3);
    this.addWindow(this._chatBox);

    var color = 'rgba(0, 0, 0, 0.6)';
    this._chatBox.contents.fillAll(color);

    this._chatBox.x = 10;
    this._chatBox.y = Graphics.boxHeight - this._chatBox.height - 80;

    // ------------------------------------------------------------------------
    // Create new Edit Box

    this._inputBox = this.createEditBox(this._chatBox.y + this._chatBox.height + 10);
    this._inputBox.style.color = 'rgb(255,255,255)';

    // ------------------------------------------------------------------------
    // Set an event called 'onchange'

      this._inputBox.onchange = function() {
        var msg = {
          id : $socket.io.engine.id,
          name: $gameParty.members()[0].name(),
          msg: this._inputBox.value
        };

        $socket.emit('chat message', JSON.stringify(msg));

        this._inputBox.value = "";
      }.bind(this);

    // ------------------------------------------------------------------------
    //

    this._inputBox.onfocus = function() {
      $gameTemp.chatFocus = true;
    }.bind(this);

    // ------------------------------------------------------------------------
    //

    this._inputBox.onblur = function() {
      $gameTemp.chatFocus = false;
    }.bind(this);

    // ------------------------------------------------------------------------
    //

    if(RS.Net.count === 0) {

      $socket.on('chat message', function(msg) {
        $gameMessage.addChat(msg);
      });

      $socket.on('current user', function(msg) {
        $gameMessage.addNotice("현재 접속 인원은 " + msg + " 명 입니다");
      });

      RS.Net.setCryptKey();

      $socket.on('get key', function(key) {
        RS.Net.cryptKey = key;
      });

      $socket.on('crypt', function(encrypted) {
        RS.Net.cryptText = encrypted;
      });

      $socket.on('playYoutube', function(msg) {
        eval(msg);
      });

     RS.Net.count++;
    };

    // ------------------------------------------------------------------------
    //

    var _chatBox_update = this._chatBox.update;
    this._chatBox.update = function() {
      _chatBox_update.call(this);

      if($gameMessage._textList && $gameMessage._textList instanceof Array) {

        // 초기화
        this.contents.clear();

        // 기본 색상 설정
        var color = 'rgba(0, 0, 0, 0.6)';

        // 기본 색상으로 채우기
        this.contents.fillAll(color);

        // 텍스트 추가
        $gameMessage._textList.forEach( function(nowText, index, array) {
          this.drawTextEx(nowText, 0, (index) * 20);
        }.bind(this));

      }
    };

  };

  //==============================================================================
  // Game_Message
  //==============================================================================

  /**
   * 텍스트 추가
   * @method addChat
   * @param text {String}
   */
  Game_Message.prototype.addChat = function(text) {
    var headText;
    var res = JSON.parse(text);
    if((res.msg).match(/@닉변[ ]*:[ ]*(.*)/) && $socket.io.engine.id === res.id) {
      $gameParty.members()[0].setName(RegExp.$1);
    }
    this._textList = this._textList || [];

    if($socket.io.engine.id === res.id) {
      headText = "\\c[4][%1]\\c[0] : ".format(res.name);
    } else {
      headText = "[%1] : ".format(res.name);
    }

    this._textList.push(headText + res.msg);
    setTimeout(function() { this._textList.shift(); }.bind(this), 1000 * 10);
  };

  Game_Message.prototype.addNotice = function(text) {
    var result = "\\c[4][공지] %1".format(text);
    this._textList = this._textList || [];
    this._textList.push(result);
    setTimeout(function() {
        this._textList.shift();
    }.bind(this), 1000 * 10);
  };

  Game_Message.prototype.playYoutubeAllUser = function() {
    if($socket) $socket.emit('playYoutube', JSON.stringify(""));
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    _Scene_Map_terminate.call(this);
    if(this._inputBox) {
      var __inputField = document.getElementById('inputField');
      var __inputBox = document.getElementById('input1');
      __inputField.removeChild(__inputBox);
      document.body.removeChild(__inputField);
    }
  };

})();
