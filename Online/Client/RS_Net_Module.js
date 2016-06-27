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
var RS.Net.SERVER_IP = undefined;
var RS.Net.Socket = undefined;

RS.UI = RS.UI || {};
RS.Net = RS.Net || {};

function ChatBox() {
  this.initialize.apply(this, arguments);
};

(function () {

  // Get the parameters of itself from the scripts.
  RS.Net.Params = $plugins.filter(function(i) {
      if(i.name === 'RS_Net_Module') {
          return true;
      }
  })[0].parameters;

  // Create Server Url String
  RS.Net.createServerURL = function() {
    var self = this;
    var param = self.Params;
    var url = "http://" + param.SERVER_IP + ":" + param.PORT;
    return url;
  };

  // Set the Global Variable that is stored URL of the Server.
  RS.Net.SERVER_IP = RS.Net.SERVER_IP || RS.Net.createServerURL();

  // Set the Global Variable that is stored the Socket.io Object.
  RS.Net.Socket = RS.Net.Socket || io.connect(RS.Net.SERVER_IP);

  // This is regular expression of the command that can change your nickname.
  RS.Net.nickCommand = eval(RS.Net.Params.REG1);

  RS.Net.Users = [];

  //------------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Chat") {
      switch (args[0].toLowerCase()) {
        case 'connect':
          // Create a new user(event) on the map.

          break;
        case 'disconnect':
          // Delete the event on the map.

          break;
      }
    }
  };

  //------------------------------------------------------------------------------
  // RS.Net
  //
  //

  // Download the script from the server.
  RS.Net.loadScript = function(name) {
      var url = "%1/%2".format(RS.Net.SERVER_IP, name);
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
    RS.Net.Socket.on('user count',function(msg) {
      console.log(msg);
    });
  };

  // Get the number of connected users on the server.
  RS.Net.update = function() {
    RS.Net.Socket.emit('user count', '');
  };

  RS.Net.count = 0;
  RS.Net.cryptText = "";
  RS.Net.cryptKey = "";

  // Get the time of the server.
  RS.Net.getTime = function() {
    RS.Net.Socket.emit('get time','');
    RS.Net.Socket.on('get time',function(msg) {
      console.log(msg);
    });
  };

  // Set the cipher key
  RS.Net.setCryptKey = function() {
    RS.Net.Socket.emit('get key', '');
  }

  // Request the cipher key.
  RS.Net.setEncryption = function(msg) {
    RS.Net.Socket.emit('crypt', msg);
  };

  // Get the coded message.
  RS.Net.getCryptObject = function(msg) {
     return JSON.parse(this.cryptText);
  };

//------------------------------------------------------------------------------
// RS.UI
//
//

  // Prepare Element
  RS.UI.prepareElement = function() {
    var divc = document.createElement('div');
    divc.id = 'inputField';
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

  RS.UI.createInputField = function(x, y, width, height) {
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
  RS.UI.prepareLoginElement = function() {
    var divc = document.createElement('div');
    divc.id = 'loginField';
    divc.style.zIndex = "1010";
    divc.style.width = Graphics.boxWidth + 'px';
    divc.style.height = Graphics.boxHeight + 'px';
    Graphics._centerElement(divc);
    document.body.appendChild(divc);

    var iframe = document.createElement('iframe');
    iframe.id = 'loginField';
    iframe.src = RS.Net.SERVER_IP + '/login.html';
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
  RS.UI.removeLoginElement = function() {
    var divc = document.getElementById('loginField');
    document.body.removeChild(divc);
  };

  // Create <input> tag
  RS.UI.addTextBox = function(yPosition) {
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
  RS.UI.getHeight = function() {
    var vv = (window.innerHeight - Graphics.boxHeight), top;
    top = vv > 0 ? (vv / 2) : vv;
    return top;
  };

  // 윈도우의 크기가 달라졌을 때
  RS.UI.resizeTextBox = function(yPosition) {

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

//------------------------------------------------------------------------------
// ChatBox
//
//

  ChatBox.prototype = Object.create(Window_Base.prototype);
  ChatBox.prototype.constructor = ChatBox;

   // Initialize the ChatBox
  ChatBox.prototype.initialize = function() {
    Window_Base.prototype.initialize.apply(this, arguments);
    this.opacity = 0;
  };

  // Set standard Padding
  ChatBox.prototype.standardPadding = function() {
      return 0;
  };

  // Get standard Font Size
  ChatBox.prototype.standardFontSize = function() {
      return 12;
  };

  // Reset the font settings
  ChatBox.prototype.resetFontSettings = function() {
      this.contents.fontFace = this.standardFontFace();
      this.contents.fontSize = this.standardFontSize();
      this.resetTextColor();
  };

  // Get x-position of the chat box.
  ChatBox.getX = function(clientX, w) {

    // Finding the game canvas
    var gc = document.querySelector('canvas');

    // Get the Client Rect for inputField object.
    var bound = document.getElementById('inputField').getBoundingClientRect();

    return (window.innerWidth - Graphics.width) / 2 + (clientX - bound.left) * (gc.width / bound.width);
  };

  // Get y-position of the chat box.
  ChatBox.getY = function(clientY, h) {

    // Finding the game canvas
    var gc = document.querySelector('canvas');

    // Get the Client Rect for inputField object.
    var bound = document.getElementById('inputField').getBoundingClientRect();

    return (window.innerHeight - Graphics.height) / 2 + (clientY - bound.top) * (gc.height / bound.height);
  };

  // Get the rect of the chat box
  ChatBox.getEditBoxRect = function(yPosition) {
    var rect = new Rectangle();
    rect.width = Graphics.boxWidth / 2;
    rect.height = 20;
    rect.x = ChatBox.getX(10, rect.width);
    rect.y = ChatBox.getY(yPosition, rect.height);
    return rect;
  };

  //------------------------------------------------------------------------------
  // Scene_Map
  //
  //

  // Creates the EditBox
  Scene_Map.prototype.createEditBox = function(yPosition) {
    var inp, divc;
    divc = RS.UI.prepareElement();
    inp = RS.UI.addTextBox(yPosition);
    window.onresize = RS.UI.resizeTextBox(yPosition);
    return inp;
  };

  // Creates Chat Box
  var _Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;

  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);

    this.createChatBox();

  };

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

  // Release the auto movement system of the player when clicking the chat box.
  Game_Temp.prototype.isDestinationValid = function() {
    return (this._destinationX !== null) && !$gameTemp.chatFocus;
  };

  //------------------------------------------------------------------------------
  // Scene_Map
  //
  //

  Scene_Map.prototype.createChatBox = function() {

    // Creates the Chat Box
    this._chatBox = new ChatBox(0, 0, Graphics.boxWidth / 2, Graphics.boxHeight / 3);
    this.addWindow(this._chatBox);

    // Fill the color.
    var color = 'rgba(0, 0, 0, 0.6)';
    this._chatBox.contents.fillAll(color);

    // Set the position
    this._chatBox.x = 10;
    this._chatBox.y = Graphics.boxHeight - this._chatBox.height - 80;

    // Create the Edit Box
    this._inputBox = this.createEditBox(this._chatBox.y + this._chatBox.height + 10);
    this._inputBox.style.color = 'rgb(255,255,255)';

    // Set an event called 'onchange'
      this._inputBox.onchange = function() {
        var msg = {
          id : RS.Net.Socket.io.engine.id,
          name: $gameParty.members()[0].name(),
          msg: this._inputBox.value
        };

        RS.Net.Socket.emit('chat message', JSON.stringify(msg));

        this._inputBox.value = "";
      }.bind(this);

    // Set an event called 'onfocus'
    this._inputBox.onfocus = function() {
      $gameTemp.chatFocus = true;
    }.bind(this);

    // Set an event called 'onblur'
    this._inputBox.onblur = function() {
      $gameTemp.chatFocus = false;
    }.bind(this);

    // Set the Message handling functions.

    if(RS.Net.count === 0) {

      // Send Chat Message to the server.
      RS.Net.Socket.on('chat message', function(msg) {
        $gameMessage.addChat(msg);
      });

      // Get Current connected Users to the server.
      RS.Net.Socket.on('current user', function(msg) {
        $gameMessage.addNotice("현재 접속 인원은 " + msg + " 명 입니다");
      });

      RS.Net.setCryptKey();

      // Get the key of a cryptolect.
      RS.Net.Socket.on('get key', function(key) {
        RS.Net.cryptKey = key;
      });

      // Get the text of a cryptolect.
      RS.Net.Socket.on('crypt', function(encrypted) {
        RS.Net.cryptText = encrypted;
      });

      // play the youtube on the map.
      RS.Net.Socket.on('playYoutube', function(msg) {
        eval(msg);
      });

     RS.Net.count++;
    };

    // ------------------------------------------------------------------------
    // Redraw All of the Text in the ChatBox.

    var _chatBox_update = this._chatBox.update;
    this._chatBox.update = function() {
      _chatBox_update.call(this);

      if($gameMessage._textList && $gameMessage._textList instanceof Array) {

        // Clear Bitmap.
        this.contents.clear();

        // Set the default color
        var color = 'rgba(0, 0, 0, 0.6)';

        // Fill the contents to the default color
        this.contents.fillAll(color);

        // Adding the Text on TextList
        $gameMessage._textList.forEach( function(nowText, index, array) {
          this.drawTextEx(nowText, 0, (index) * 20);
        }.bind(this));

      }
    };

  };

  // Destroy the EditBox object from DOM(Document Object Model)
  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    _Scene_Map_termine.call(this);
    if(this._inputBox) {
      var __inputField = document.getElementById('inputField');
      var __inputBox = document.getElementById('input1');
      __inputField.removeChild(__inputBox);
      document.body.removeChild(__inputField);
    }
  };

  //------------------------------------------------------------------------------
  // Game_Message
  //
  //

  // Add a string on Chat Box.
  Game_Message.prototype.addChat = function(text) {
    var headText;
    var res = JSON.parse(text);

    // Check the command that can change the nickname.
    if((res.msg).match( RS.Net.nickCommand ) && RS.Net.Socket.io.engine.id === res.id) {
      $gameParty.members()[0].setName(RegExp.$1);
    }

    this._textList = this._textList || [];

    if(RS.Net.Socket.io.engine.id === res.id) {
      // Highlighting the text color of my own.
      headText = "\\c[4][%1]\\c[0] : ".format(res.name);
    } else {
      // Handling the text color except itself.
      headText = "[%1] : ".format(res.name);
    }

    this._textList.push(headText + res.msg);
    setTimeout(function() { this._textList.shift(); }.bind(this), 1000 * 10);
  };

  // Show the notification text.
  Game_Message.prototype.addNotice = function(text) {
    var result = "\\c[4][공지] %1".format(text);
    this._textList = this._textList || [];
    this._textList.push(result);
    setTimeout(function() {
        this._textList.shift();
    }.bind(this), 1000 * 10);
  };

  // Play the Youtube for All Users.
  Game_Message.prototype.playYoutubeAllUser = function() {
    if(RS.Net.Socket) RS.Net.Socket.emit('playYoutube', JSON.stringify(""));
  };

})();
