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
 * @param REG1
 * @desc This is regular expression of the command that can change your nickname.
 * @default /@닉변[ ]*:[ ]*(.*)/
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
 * 2016.06.28 - Added the parameters.
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
 * NetworkHelper.userCount() - Get the number of connected users on the server.
 * NetworkHelper.getTime() - Get the time of the server.
 * NetworkHelper.loadScript(ScriptName) - Download specific script from the server.
 * UICreator.prepareLoginElement() - Indicate the Login page.
 *
 */

"use strict";
var Imported = Imported || {};
Imported.RS_NetModule = true;

(function () {

  //------------------------------------------------------------------------------
  // NetworkHelper
  //
  //

  class NetworkHelper {

    static initialize() {
        this.loadParameter();
        this.initMembers();
        this.loadScript('JsonFormatter.js');
    }

    static initMembers() {
        this.initialized = false;
        this.count = 0;
        this.cryptText = "";
        this.cryptKey = "";
        this.SERVER_IP = this.createServerURL();
        this.SOCKET = io.connect(this.SERVER_IP);
        this.nickCommand = eval(this.Params.REG1);
        this.Users = {};
    }

    static loadParameter() {
        this.Param = PluginManager.parameters('RS_Net_Module');
        this.Params['connectedUsersMSG1'] = "현재 접속 인원은 ";
        this.Params['connectedUsersMSG2'] = " 명 입니다";
        this.Params['noticeMSG'] = "\\c[4][Notice]";
    }

    static createServerURL() {
        const self = this;
        const param = self.Params;
        const url = `http://${param.SERVER_IP}:${param.PORT}`;
        return url;
    }

    static loadScript(name) {
        const url = "%1/%2".format(NetworkHelper.SERVER_IP, name);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = false;
        script._url = url;
        document.body.appendChild(script);
    }

    static userCount() {
        this.SOCKET.on('user count',function(msg) {
          console.log(msg);
        });
    }

    static update() {
        this.SOCKET.emit('user count', '');
    }

    static getTime() {
        this.SOCKET.emit('get time','');
        this.SOCKET.on('get time',function(msg) {
          console.log(msg);
        });
    }

    static setCryptKey() {
        this.SOCKET.emit('get key', '');
    }

    static setEncryption(msg) {
        this.SOCKET.emit('crypt', msg);
    }

    static getCryptObject() {
        return JSON.parse(this.cryptText);
    }

    static obtainMessage() {
        if(this.count === 0) {
            // Send Chat Message to the server.
            this.SOCKET.on('chat message', function(msg) {
              $gameMessage.addChat(msg);
            });
            // Get Current connected Users to the server.
            this.SOCKET.on('current user', function(msg) {
              const param = NetworkHelper.Params;
              const newMessage = `${param.connectedUsersMSG1}${msg}${param.connectedUsersMSG2}`;
              $gameMessage.addNotice(newMessage);
            });
            this.setCryptKey();
            // Get the key of a cryptolect.
            this.SOCKET.on('get key', function(key) {
              NetworkHelper.cryptKey = key;
            });
            // Get the text of a cryptolect.
            this.SOCKET.on('crypt', function(encrypted) {
              NetworkHelper.cryptText = encrypted;
            });
            // play the youtube on the map.
            this.SOCKET.on('playYoutube', function(msg) {
              eval(msg);
            });
           this.count++;
        }
    }

    static registerEventListeners() {
      let inputBox = document.getElementById('defaultInputBox');
      inputBox.addEventListener('change', function() {
          const msg = {
            'id' : NetworkHelper.SOCKET.io.engine.id,
            'name': $gameParty.members()[0].name(),
            'msg': inputBox.value
          };
          NetworkHelper.SOCKET.emit('chat message', JSON.stringify(msg));
          currentScene._inputBox.value = "";
      });
      inputBox.addEventListener('focus', function () {
          $gameTemp.chatFocus = true;
      });
      inputBox.addEventListener('blur', function () {
          $gameTemp.chatFocus = false;
      });
    }

  }

  //----------------------------------------------------------------------------
  // UICreator
  //
  //

  class UICreator {

    static prepareElement() {
        let divc = document.createElement('div');
        divc.id = 'defaultPanel';
        divc.style.position = 'absolute';
        divc.style.margin = 'auto';
        divc.style.left = '0';
        divc.style.top = '0';
        divc.style.right = '0';
        divc.style.bottom = '0';
        divc.style.width = `${Graphics.boxWidth}px`;
        divc.style.height = `${Graphics.boxHeight}px`;
        divc.style.zIndex = "1000";
        document.body.appendChild(divc);
        return divc;
    }

    static createInputField(x, y, width, height) {
        let element = document.createElement('input');
        let div = document.getElementById('defaultPanel');
        element.id = 'defaultInputBox';
        element.type = 'text';
        element.style.position = 'absolute';
        element.style.margin = 'auto';
        element.style.left = x + 'px';
        element.style.top = y + '0';
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        div.appendChild(element);
    }

    static prepareLoginElement() {

        let divc = document.createElement('div');
        let iframe = document.createElement('iframe');

        divc.id = 'loginField';
        divc.style.zIndex = "1010";
        divc.style.width = Graphics.boxWidth + 'px';
        divc.style.height = Graphics.boxHeight + 'px';
        Graphics._centerElement(divc);
        document.body.appendChild(divc);

        iframe.id = 'loginField';
        iframe.src = `${NetworkHelper.SERVER_IP}/login.html`;
        iframe.style.left = '0px';
        iframe.style.top = '0px';
        iframe.style.zIndex = "1001";
        iframe.style.borderWidth = '0px';
        divc.appendChild(iframe);
        return divc;
    }

    static removeLoginElement() {
        let divc = document.getElementById('loginField');
        document.body.removeChild(divc);
    }

    static addTextBox(newPosition) {
        let rect, inp;
        rect = ChatBox.getEditBoxRect(newPosition);
        inp =document.getElementById('defaultInputBox');
        inp.style.position = 'absolute'
        inp.style.backgroundColor =  'rgba(0,0,0,0.6)';
        inp.style.left = rect.x + 'px'
        inp.style.top = rect.y + 'px';
        inp.style.width= rect.width + "px";
        inp.style.height = rect.height + 'px';
        inp.style.borderColor = inp.style.backgroundColor;
        return inp;
    }

    static getHeight() {
        let vv = (window.innerHeight - Graphics.boxHeight), top;
        top = vv > 0 ? (vv / 2) : vv;
        return top;
    }

    static resizeTextBox(newPosition) {
        let inp, left, rect;
        inp = document.getElementById('defaultInputBox');
        left = (window.innerWidth - Graphics.boxWidth) / 2;
        rect = ChatBox.getEditBoxRect(newPosition);
        inp.style.position = 'absolute';
        inp.style.left = rect.x + 'px';
        inp.style.top = rect.y + 'px';
        inp.style.width= (rect.width / Graphics._realScale ) + "px";
        inp.style.height = rect.height + 'px';
    }

    static resizeWindowFrame() {
        if(!Utils.isNwjs()) return;
        const gui = require('nw.gui');
        const win = gui.Window.get();
        const w = Graphics.boxWidth;
        const h = Graphics.boxHeight;
        win.setMinimumSize(w,h);
        win.setMaximumSize(w,h);
        win.setPosition('center');
    }

  }

  //----------------------------------------------------------------------------
  // ChatBox
  //
  //

  class ChatBox extends Window_Base {

    constructor() {
        super();
        this.opacity = 0;
    }

    standardPadding() {
        return 0;
    }

    standardFontSize() {
        return 12;
    }

    resetFontSettings() {
        this.contents.fontFace = standardFontFace();
        this.contents.fontSize = standardFontSize();
        resetTextColor();
    }

    fillColor(color = 'rgba(0, 0, 0, 0.6)') {
        this.contents.fillAll(color);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        super.update();

        if($gameMessage._textList && $gameMessage._textList instanceof Array) {

            // Clear Bitmap.
            this.contents.clear();

            // Fill the contents to the default color
            this.fillColor('rgba(0, 0, 0, 0.6)')

            // Adding the Text on TextList
            $gameMessage._textList.forEach( function(nowText, index, array) {
              this.drawTextEx(nowText, 0, (index) * 20);
            }.bind(this));

        }
    }

    static getX(clientX, w) {
        const gc = document.querySelector('canvas');
        const bound = document.getElementById('defaultPanel').getBoundingClientRect();
        return (window.innerWidth - Graphics.width) / 2 + (clientX - bound.left) * (gc.width / bound.width);
    }

    static getY(clientY, h) {
        const gc = document.querySelector('canvas');
        const bound = document.getElementById('defaultPanel').getBoundingClientRect();
        return (window.innerHeight - Graphics.height) / 2 + (clientY - bound.top) * (gc.height / bound.height);
    }

    static getEditBoxRect(newPosition) {
        let rect = new Rectangle();
        rect.width = Graphics.boxWidth / 2;
        rect.height = 20;
        rect.x = ChatBox.getX(10, rect.width);
        rect.y = ChatBox.getY(newPosition, rect.height);
        return rect;
    }

  }

  //------------------------------------------------------------------------------
  // Input
  //
  //

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

  //------------------------------------------------------------------------------
  // Game_Temp
  //
  //

  var alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
      alias_Game_Temp_initialize.call(this);
      this.chatFocus = true;
  };

  // Release the auto movement system of the player when clicking the chat box.
  Game_Temp.prototype.isDestinationValid = function() {
      return (this._destinationX !== null) && !$gameTemp.chatFocus;
  };

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  //

  Scene_Map.prototype.createEditBox = function(newPosition) {
      let divc = UICreator.prepareElement();
      let inp = UICreator.addTextBox(newPosition);
      document.addEventListener('resize', function() {
        UICreator.resizeTextBox(newPosition);
        UICreator.resizeWindowFrame();
      });
      return inp;
  };

  var alias_Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
      alias_Scene_Map_createDisplayObjects.call(this);
      this.initChat();
  };

  Scene_Map.prototype.createChatElement = function () {
      this._chatBox = new ChatBox(0, 0, Graphics.boxWidth / 2, Graphics.boxHeight / 3);
      this._chatBox.fillColor('rgba(0, 0, 0, 0.6)');
      this._chatBox.setPosition(10, Graphics.boxHeight - this._chatBox.height - 80);
      this.addWindow(this._chatBox);
  };

  Scene_Map.prototype.createInputElement = function () {
      this._inputBox = this.createEditBox(this._chatBox.y + this._chatBox.height + 10);
      this._inputBox.style.color = 'rgb(255,255,255)';
  };

  Scene_Map.prototype.initChat = function() {
      this.createChatElement();
      this.createInputElement();
      if(!NetworkHelper.initialized) {
        NetworkHelper.registerEventListeners();
        NetworkHelper.obtainMessage();
        NetworkHelper.initialized = true;
      }
  };

  var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    alias_Scene_Map_terminate.call(this);
    if(this._inputBox) {
      var defaultPanel = document.getElementById('defaultPanel');
      var defaultInputBox = document.getElementById('defaultInputBox');
      defaultPanel.removeChild(defaultInputBox);
      document.body.removeChild(defaultPanel);
    }
  };

  //------------------------------------------------------------------------------
  // Game_Message
  //
  //

  var alias_Game_Message_initialize = Game_Message.prototype.initialize;
  Game_Message.prototype.initialize = function() {
    alias_Game_Message_initialize.call(this);
    this._textList = [];
  };

  Game_Message.prototype.addNewMessage = function (newMessage) {
    this._textList.push(newMessage);
  };

  Game_Message.prototype.releaseMessage = function () {
    if(this._textList.length > 0) this._textList.shift();
  };

  // Add a string on Chat Box.
  Game_Message.prototype.addChat = function(text) {
    const res = JSON.parse(text);
    const engineId = NetworkHelper.SOCKET.io.engine.id;
    let prefix;

    // Check the command that can change the nickname.
    if(res.msg.match( NetworkHelper.nickCommand ) && engineId === res.id) {
        $gameParty.members()[0].setName(RegExp.$1);
    }

    if(engineId === res.id) {
        prefix = `\\c[4][${res.name}]\\c[0] : `;
    } else {
        prefix = `[${res.name}] : `;
    }

    this.addNewMessage(headText + res.msg);

    setTimeout(function() {
        $gameMessage.releaseMessage();
    }, 1000 * 10);

  };

  // Show the notification text.
  Game_Message.prototype.addNotice = function(text) {
    this.addNewMessage(`${NetworkHelper.Params.noticeMSG} ${text}`);
    setTimeout(function() {
        $gameMessage.releaseMessage();
    }, 1000 * 10);
  };

  // Play the Youtube for All Users.
  Game_Message.prototype.playYoutubeAllUser = function() {
    if(NetworkHelper.SOCKET) NetworkHelper.SOCKET.emit('playYoutube', JSON.stringify(""));
  };

  //----------------------------------------------------------------------------
  // Main
  //
  //

  NetworkHelper.initialize();

})();
