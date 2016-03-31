/*:
 * RS_Net_Module.js
 * @plugindesc Connecting to the server and adding the chatting.
 * @author biud436
 *
 * @help
 *
 * =============================================================================
 * Change Log & The main issues
 * =============================================================================
 *
 * - 2015.11.24 ~ 2015.11.25
 * 로그인 처리 기틀만 마련, POST 방식으로 전송, CSS 및 HTML 파일 작성,
 * 로그인 페이지는 서버에서 다운로드 및 인증하는 방식이며 게임 내에 동적으로 삽입됩니다.
 * 회원가입 처리는 아직 미지원(MongoDB 연동 예정)
 *
 * - 2015.11.23
 * 메뉴를 호출하고 다시 돌아오면 socket.emit 가 두 번 설정되는 오류를 수정했습니다.
 * 현재 접속된 클라이언트 수를 집계하는 함수를 추가했습니다. (현재 접속자 수 집계)
 * $gameMessage.addNotice 함수가 추가되었습니다. (공지 기능)
 * 서버 시간을 가져올 수 있는 명령어가 추가되었습니다.
 *
 * - 2015.11.08
 * node.js, socket.io 를 사용하여 온라인 채팅 시스템 구현,
 * 기본 채팅 패킷 구성 (JSON), 나중에 MongoDB 등으로 데이터베이스 추가하면 괜찮을 듯.
 *
 *         var msg = {
 *          id : $socket.io.engine.id,
 *          name: $gameParty.members()[0].name(),
 *          msg: this._inputBox.value
 *        };
 *
 * - 2015.11.07
 * 기기 별 영역의 크기에 따라서 텍스트 박스의 위치가 완전히 달라지는 문제가 발생했습니다.
 * 좌표 0, 0 은 게임이 그려지는 캔바스 위에서의 상대적인 좌표였고 실제 좌표가 따로 있었습니다.
 * 이 문제는 아직 해결되지 않았습니다. 이 문제는 HTML5 래퍼런스를 더 보고 와야 해결이 될 것 같습니다.
 *
 * - 2015.11.06
 * 최초 작성일입니다. 한글 이름 입력 처리에서는 문서 하단에 추가되는 형태였고,
 * 게임 상에서는 보이지 않는 형식이었지만 이번에는 새로운 영역을 생성하여
 * 그 위에 텍스트박스를 생성하고 위치와 스타일을 따로 적용하는 방법을 사용했습니다.
 *
 * =============================================================================
 * Development Environment
 * =============================================================================
 * node.js, socket.io
 *
 * =============================================================================
 * Basic chatting commands
 * =============================================================================
 * @닉변 : 닉네임명 - 채팅창에서 닉네임을 변경할 수 있는 명령어입니다.
 *
 * =============================================================================
 * Basic Functions
 * =============================================================================
 * RS.Net.userCount() - 현재 접속자 수가 반환됩니다.
 * RS.Net.getTime() - 서버 시간이 반환됩니다.
 * RS.Net.loadScript(ScriptName) - 서버에서 특정 스크립트를 다운로드 받습니다. (게임 버전 정보, 공지사항 등)
 * RS.UI.prepareLoginElement() - 로그인 창을 페이지 중앙에 생성합니다.
 *
 */

// Server URL
var $serverURL = $serverURL || 'http://127.0.0.1:3000'
var $socket = $socket || io.connect($serverURL);
var RS = RS || {};

RS.Net = RS.Net || {};
RS.UI = RS.UI || {};

//==============================================================================
//
//==============================================================================

/**
 * @memberof RS.Net
 */

(function() {

  // Download the script from the server.
  RS.Net.loadScript = function(name) {
      var url = "%1/%2".format($serverURL,name);
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = false;
      script._url = url;
      document.body.appendChild(script);
  };

  // Download the script called 'JsonFormatter.js' from the server.
  RS.Net.loadScript('JsonFormatter.js');

  /** 현재 접속자 수를 구합니다 */
  RS.Net.userCount = function() {
    $socket.on('user count',function(msg) {
      console.log(msg);
    });
  };

  /** 현재 접속자 수 집계를 서버에 요청합니다. */
  RS.Net.update = function() {
    $socket.emit('user count', '');
  };

  /** 인스턴스 갯수 */
  RS.Net.count = 0;
  RS.Net.cryptText = "";
  RS.Net.cryptKey = "";

  /** 서버의 시간을 가져옵니다 */
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
    setTimeout(function() { this._textList.shift(); }.bind(this), 1000 * 10);
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
