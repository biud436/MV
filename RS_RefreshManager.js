/*:
 * RS_RefreshManager.js
 * @plugindesc This plugin creates or changes a file called 'js/plugins.js'
 * @author biud436
 *
 * @param Save File ID
 * @desc Auto Save
 * @default 1
 *
 * @param Show Preview Window
 * @desc Indicate whether or not the preview window is visible.
 * @default false
 *
 * @param Auto Reload
 * @desc Decide whether or not to reload the game.
 * @default true
 *
 * @param Auto closing time
 * @desc delay (Millisecond)
 * @default 2500
 *
 * @param Target Path
 * @desc
 * @default /js/plugins.js
 *
 * @param Save Path
 * @desc
 * @default /js/plugins.js
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 *
 * RefreshManager open
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.16 (v0.0.1) - Beta
 * 2016.05.23 (v1.0.0) - Added new function and Fixed a bug.
 * 2016.05.23 (v1.1.0) - Added the window auto reload function and the preview
 * window that could be able to show the json file.
 * 2016.07.12 (v1.1.0A) - Added two plugin parameters about File Path.
 */

var Imported = Imported || {};
 Imported.RS_RefreshManager = true;

var RS = RS || {};

function Window_PluginManager() {
  this.initialize.apply(this, arguments);
};

function Scene_PluginManager() {
  this.initialize.apply(this, arguments);
};

function Window_PluginDesc() {
  this.initialize.apply(this, arguments);
};

(function() {

  var parameters = PluginManager.parameters('RS_RefreshManager');
  var fastLoadFileId = Number(parameters['Save File ID'] || 1);

  var nClosingTime = Number(parameters['Auto closing time'] || 2500);

  // Indicate whether or not the preview window is visible.
  var isPreviewWindow = Boolean(parameters['Show Preview Window'] === 'true');

  // the preview window. (window object)
  var _previewWindow = null;

  var isAutoReload =  Boolean(parameters['Auto Reload'] === 'true');

  var fs = require('fs');

  function RefreshManager() {
    throw new Error('This is a static class');
  }

  RefreshManager._path = parameters['Target Path'] || '/js/plugins.js';
  RefreshManager._savePath = parameters['Save Path'] || '/js/plugins.js';
  RefreshManager._flags = 'utf8';
  RefreshManager._data = "";
  RefreshManager._typ = [];
  RefreshManager._index = 0;
  RefreshManager._length = 0;
  RefreshManager._ch = 32;
  RefreshManager._c = '0';
  RefreshManager._token;
  RefreshManager._tokens = [];
  RefreshManager._refresh = true;
  RefreshManager._changed = false;

  RefreshManager.ENUM = {
      Others: 1,
      Digit: 2,
      Letter: 3,
      Comma: 4,
      Colon: 5, // :
      DblQ: 6, // "
      Assign: 7,
      Lbracket: 8, // [
      Rbracket: 9, // ]
      Lbrace: 10, // {
      Rbrace: 11, // }
      Unicode: 12,
      TRUE: 13, // true
      FALSE: 14, // false
      Identifier: 15,
      Istring: 16,
      Int : 17,
      End: 18,
      EOF_TOKEN: 19,
      Dollar: 20,
      Backslash: 21,
      Comment: 22,
      LineBreak: 23,
      Caret: 24,
      Var: 25,
      Lparen: 26,
      Rparen: 27,
      Semicolon: 28,
      Tap: 29,
      Space: 30,
      EndLine: 31
  };

  RefreshManager._keyWord = {};
  RefreshManager._keyWordArray = [];

  RefreshManager.load = function(func) {
    var self = this;
    // var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, RefreshManager._path);
    var path = window.location.pathname.replace(/\/[^\/]*$/, RefreshManager._path);
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    path = decodeURIComponent(path);

    fs.readFile(path, RefreshManager._flags , function(err, data) {
      if(err) throw new Error(err);
      self._data  = data;
      self._length = self._data.length;
      self.startToInterpret(func);
    });
  };

  RefreshManager.startToInterpret = function(func) {
    var self = this;
    var type = self.ENUM;
    var stackCounter = 0;
    this.initCharactersType();
    this.initKeyWord();
    for(self._token = self.nextToken(); self._token.kind !== type.EOF_TOKEN; self._token = self.nextToken()) {
        self._tokens.push(self._token);
    }

    if(func) {
        func.call(self, self._tokens);
    }
  }

  RefreshManager.initCharactersType = function() {
    var self = this;
    var type = self.ENUM;

    for(var i= 0; i < 256; i++) { self._typ[i] = type.Others; }
    for(var i='0'.charCodeAt(); i <= '9'.charCodeAt(); i++) { self._typ[i] = type.Digit; }
    for(var i='A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) { self._typ[i] = type.Letter; }
    for(var i='a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) { self._typ[i] = type.Letter; }
    self._typ['#'.charCodeAt()] = type.Letter;
    self._typ['*'.charCodeAt()] = type.Letter;
    self._typ['_'.charCodeAt()] = type.Letter;
    self._typ['.'.charCodeAt()] = type.Letter;
    self._typ['\r'.charCodeAt()] = type.Caret;
    self._typ['\n'.charCodeAt()] = type.LineBreak;
    self._typ['\\'.charCodeAt()] = type.Backslash;
    self._typ['$'.charCodeAt()] = type.Dollar;
    self._typ['\"'.charCodeAt()] = type.DblQ;
    self._typ[','.charCodeAt()] = type.Comma;
    self._typ[':'.charCodeAt()] = type.Colon;
    self._typ['='.charCodeAt()] = type.Assign;
    self._typ['('.charCodeAt()] = type.Lparen;
    self._typ[')'.charCodeAt()] = type.Rparen;
    self._typ['['.charCodeAt()] = type.Lbracket;
    self._typ[']'.charCodeAt()] = type.Rbracket;
    self._typ['{'.charCodeAt()] = type.Lbrace;
    self._typ['}'.charCodeAt()] = type.Rbrace;
    self._typ['	'.charCodeAt()] = type.Tap;
    self._typ[' '.charCodeAt()] = type.Space;

    // Hangul handling
    for(var i=0x1100; i <= 0x11FF; i++) { self._typ[i] = type.Letter; }
    for(var i=0xAC00; i <= 0xD7AF; i++) { self._typ[i] = type.Letter; }

    // Cyrillic handling
    // for(var i= 0x0400; i <= 0x052F; i++) { self._typ[i] = type.Letter; }

    // All Unicode handling (Big Memory)
    // for(var i=0x0100; i <= 0xFFFF; i++) { self._typ[i] = type.Letter; }

  };

  RefreshManager.initKeyWord = function() {
    var self = this;
    var type = self.ENUM;
    self._keyWordArray = [
      {'name':'true','kind': type.TRUE},
      {'name':'false','kind': type.FALSE},
      {'name':',','kind': type.Comma},
      {'name':'=','kind': type.Assign},
      {'name':'(','kind': type.Lparen},
      {'name':')','kind': type.Rparen},
      {'name':'{','kind': type.Lbrace},
      {'name':'}','kind': type.Rbrace},
      {'name':'[','kind': type.Lbracket},
      {'name':']','kind': type.Rbracket},
      {'name':'var','kind': type.Var},
      {'name':'\\','kind': type.Backslash},
      {'name':'\"','kind': type.DblQ},
      {'name':'/','kind': type.Comment},
      {'name':':','kind': type.Colon},
      {'name':';','kind': type.Semicolon},
      {'name': undefined,'kind': type.End}
    ];

  };

  RefreshManager.getToken = function(ch) {
    var self = this;
    var token = self._typ[ch];
    return token;
  }

  RefreshManager.isSpace = function(c) {
    switch (c) {
      case 0x20: // space (SPC)
      case 0x09: // horizontal tab (TAB)
      case 0x0a: // newline (LF)
      case 0x0b: // vertical tab (VT)
      case 0x0c: // feed (FF)
      case 0x0d: // carriage return (CR)
      return true;
    }
    return false;
  }

  RefreshManager.nextToken = function() {
    var self = this;
    var type = self.ENUM;
    var numValue = 0;

    // Token Name
    var text = '';

    // Token Kind
    var kind = '';

    // Space handling
    while(self.isSpace(self._ch)) {
      self._ch = self.nextCharacter();
    }

    // End handling
    if(self._ch === 0 || self._ch === undefined) {
      return self.createToken(type.EOF_TOKEN, text);
    }

    // Categorize Token
    switch (self._typ[self._ch]) {

      // Identifier handling
      case type.Dollar: case type.Letter:
        text += String.fromCharCode(self._ch);
        self._ch = self.nextCharacter();
        while(self._typ[self._ch] === type.Letter || self._typ[self._ch] === type.Digit) {
          text += String.fromCharCode(self._ch);
          self._ch = self.nextCharacter();
        }
        break;
      // Integer handling
      case type.Digit:
        kind = type.Int;
        for(numValue = 0; self._typ[self._ch] === type.Digit; self._ch = self.nextCharacter()) {
          numValue = numValue * 10 + self._ch;
        }
        return self.createToken(type.Int, text, numValue);
     // String handling
      case type.DblQ:
        self._ch = this.nextCharacter();
        while(self._ch !== 0 && self._ch!==34 ) {
          text += String.fromCharCode(self._ch);
          self._ch = self.nextCharacter()
        }
        if(self._ch === '\"'.charCodeAt()) {
          self._ch = this.nextCharacter();
        }
        else {
          throw new Error("This string is wrong.");
        }
        return self.createToken(type.Istring, text, 0);
      default:
      // Comment handling
      if(self._ch === 47 && self.currentCharacter() === 47) {
        for(; self._ch !== '\r'.charCodeAt() || self._ch !== '\n'.charCodeAt(); self._ch = self.nextCharacter()) {
          text += String.fromCharCode(self._ch);
          if(self._ch === '\n'.charCodeAt()) {
            return self.createToken(type.Comment, text, 0);
          }
        }
      }
      text += String.fromCharCode(self._ch);
      self._ch = self.nextCharacter();
    }

    // Other handling
    kind = this.getKeywordKind(text);

    if(kind === type.Others) {
      throw new Error("You were used incorrect tokens." + text);
    }
    return self.createToken(kind, text, 0);
  };

  RefreshManager.nextCharacter = function() {
    var self = this;
    self._c = self._data[self._index++];
    if(self._c !== undefined) {
      return self._c.charCodeAt();
    }
    if(self._c === undefined) {
      self._c = 0;
      return 0;
    }
  };

  RefreshManager.currentCharacter = function() {
    var self = this;
    if(self._data[self._index]) {
      return self._data[self._index].charCodeAt();
    }
    return 0;
  };

  RefreshManager.getKeywordKind = function(str) {
    var self = this;
    var type = self.ENUM;
    var keyWords = self._keyWordArray;

    for(var i = 0; keyWords[i].kind !== type.End; i++) {
      if(str === keyWords[i].name) {
        return keyWords[i].kind;
      }
    }
    if(self._typ[str[0].charCodeAt()] === type.Letter || self._typ[str[0].charCodeAt()] === type.Dollar) {
      return type.Identifier;
    }
    if(self._typ[str[0].charCodeAt()] === type.Digit) {
      return type.Int;
    }
    return type.Others;

  };

  RefreshManager.createToken = function(kind, str, num) {
    var self = this;
    var type = self.ENUM;
    var token = {};
    token.kind = kind || type.Others;
    token.text = str || "";
    token.value = num || 0;
    return token;
  };

  RefreshManager.makePlugins = function(texts) {
    var self = this;

    var path = window.location.pathname.replace(/\/[^\/]*$/, self._savePath);
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    path = decodeURIComponent(path);
    fs.writeFile(path , texts, function(err) {
      if(err) throw new Error(err);
      var blob = new Blob( [texts], {type: 'text/plane'} );
      var url = URL.createObjectURL(blob);
      if(isPreviewWindow) {
          _previewWindow = window.open(url, '_blank');
      }
      RefreshManager._changed = true;
    });

  };

  RefreshManager.clear = function() {
    var self = this;
    self._tokens = [];
    self._typ = [];
  };

  RefreshManager.isChanged = function() {
    var self = this;
    return self._changed;
  };

  //============================================================================
  // PluginManager
  //
  //

  PluginManager.setStatus = function(pluginName, status) {

    RefreshManager.load(function(tokens) {
      var self = this;
      var type = this.ENUM;
      var searched = false;
      var index = 0;
      var statusToken = this.createToken(status ? type.TRUE : type.FALSE, status ? 'true' : 'false', 0);

      tokens.forEach(function(item, idx) {
        if(item.kind === type.Istring && item.text === pluginName) {
          searched = true;
          index = idx;
          return true;
        }
      })

      // status token
      var resultToken = tokens[index + 4];

      if(resultToken.kind === type.TRUE ||
         resultToken.kind === type.FALSE) {
         tokens[index + 4] = statusToken;
      }

      // make texts
      var texts = "";
      for(var i = 0; i < self._tokens.length; i++) {
        // var
        if(self._tokens[i].kind === type.Var && self._tokens[i].text) {
         texts += self._tokens[i].text + " ";
         continue;
        }
        // [
        if(self._tokens[i].kind === type.Lbracket && self._tokens[i].text) {
          texts += self._tokens[i].text + " \r\n";
          continue;
        }
        // =
        if(self._tokens[i].kind === type.Assign && self._tokens[i].text) {
          texts += " " + self._tokens[i].text + " \r\n";
          continue;
        }

        // "String"
        if(self._tokens[i].kind === type.Istring && self._tokens[i].text) {
         texts += '\"' + self._tokens[i].text + '\"';
         continue;
        }

        // "String"
        if(self._tokens[i].kind === type.Istring && self._tokens[i].text === "") {
         texts += '\"\"';
         continue;
        }

        // :
        if(self._tokens[i].kind === type.Colon) {
         texts += ":";
         continue;
        }
        // },
        if(self._tokens[i-1] &&
           self._tokens[i-1].kind === type.Rbrace &&
           self._tokens[i].kind === type.Comma ) {
           texts += self._tokens[i].text + '\r\n';
           continue;
         }
         // }}
         if(self._tokens[i-1] && self._tokens[i-1].kind === type.Rbrace &&
            self._tokens[i] && self._tokens[i-1].kind === type.Rbrace &&
            self._tokens[i+1] && self._tokens[i+1].kind === type.Rbracket) {
            texts += self._tokens[i].text + '\r\n';
            continue;
          }
        // ];
        if(self._tokens[i].kind === type.Rbracket && self._tokens[i].text) {
          texts += self._tokens[i].text;
          continue;
        }
        texts += self._tokens[i].text;
      }

      self.makePlugins(texts);

    });

  };

  //============================================================================
  // Window_PluginDesc
  //
  //

  Window_PluginDesc.prototype = Object.create(Window_Help.prototype);
  Window_PluginDesc.prototype.constructor = Window_PluginDesc;

  Window_PluginDesc.prototype.initialize = function(numLines) {
    Window_Help.prototype.initialize.call(this, numLines);
  };

  var alias_Window_PluginDesc_processNormalCharacter = Window_PluginDesc.prototype.processNormalCharacter;
  Window_PluginDesc.prototype.processNormalCharacter = function(textState) {
      var w = this.textWidth(textState.text[textState.index]);
      if(textState.x + (w * 2) >= this.contentsWidth()) {
        textState.index--;
        this.processNewLine(textState);
      }
      alias_Window_PluginDesc_processNormalCharacter.call(this, textState);
  };

  Window_PluginDesc.prototype.textWidthEx = function(text) {
    return this.drawTextEx.call(this, text, 0, this.contents.height);
  };

  //============================================================================
  // Window_PluginManager
  //
  //

  Window_PluginManager.prototype = Object.create(Window_Selectable.prototype);
  Window_PluginManager.prototype.constructor = Window_PluginManager;

  Window_PluginManager.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    this._index = 0;
    this.initToken();
  };

  Window_PluginManager.prototype.initToken = function () {
    var _this = this;

    RefreshManager.load(function() {
      var self, type, nameToken, trueToken, falseToken;
      self = RefreshManager;
      type = self.ENUM;
      nameToken = self.createToken(type.Istring, new String("name"), 0);
      self._tokens.forEach(function(currentToken, idx, token) {
        if(currentToken.kind === type.Istring && currentToken.text === 'name') {
          _this._data.push({'name':token[idx + 2],
                            'status':token[idx + 6],
                            'description':token[idx + 10]});
        }
      });
      _this.refresh();
      _this.select(0);
      _this.activate();
    });

  };

  Window_PluginManager.prototype.windowWidth = function() {
    return Graphics.boxWidth;
  };

  Window_PluginManager.prototype.windowHeight = function() {
    return Graphics.boxHeight - this.fittingHeight(2);
  };

  Window_PluginManager.prototype.maxItems = function() {
    if(this._data) {
        return this._data.length;
    } else {
       return 1;
    }
  };

  Window_PluginManager.prototype.item = function(index) {
    if(this._data) {
        return this._data[index];
    } else {
      return {'name': {text: 'No Plugin'},
              'status': {text: 'false'},
              'description': {text: 'No Description'}};
    }
  };

  Window_PluginManager.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
  };

  Window_PluginManager.prototype.numVisibleRows = function() {
    return 8;
  };

  Window_PluginManager.prototype.drawItem = function(index) {
    this.drawScript(index);
  };

  Window_PluginManager.prototype.drawScript = function(index) {
    var rect = this.itemRect(index);
    var item = this.item(index);
    this.drawText(item.name.text, rect.x, rect.y, rect.width, 'left');
    this.drawText(item.status.text, rect.x, rect.y, rect.width, 'right');
  };

  Window_PluginManager.prototype.processOk = function() {
    try {
      var item, name, enabled;
      if (this.isCurrentItemEnabled()) {
          this.playOkSound();
          this.updateInputData();
          this.callOkHandler();
          item = this.item(this.index());
          name = item.name.text;
          enabled = (item.status.text !== 'true');
          item.status.text = enabled.toString();
          PluginManager.setStatus(name, enabled);
      } else {
          this.playBuzzerSound();
      }
    } catch(e) {

    }
  };

  Window_PluginManager.prototype.drawScript = function(index) {
    var rect = this.itemRect(index);
    var item = this.item(index);
    this.changeTextColor(this.normalColor());
    this.drawText(item.name.text, rect.x, rect.y, rect.width, 'left');
    if(item.status.text === 'true') {
      this.changeTextColor(this.mpGaugeColor1());
    } else {
      this.changeTextColor(this.hpGaugeColor1());
    }
    this.drawText(item.status.text, rect.x, rect.y, rect.width, 'right');
  };

  var alias_Window_PluginManager_select = Window_PluginManager.prototype.select;
  Window_PluginManager.prototype.select = function(index) {
    alias_Window_PluginManager_select.call(this, index);
    try {
      var item = this.item(this.index());
      var name = item.name.text;
      var description = item.description.text;
      this._helpWindow.setText(description);
    } catch(e) {

    }
  };

  //============================================================================
  // Scene_PluginManager
  //
  //

  Scene_PluginManager.prototype = Object.create(Scene_Base.prototype);
  Scene_PluginManager.prototype.constructor = Scene_PluginManager;

  Scene_PluginManager.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);

  };

  Scene_PluginManager.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createWindowLayer();
    this.createAllWindows();
  };

  Scene_PluginManager.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
  };

  Scene_PluginManager.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    if(RefreshManager.isChanged() && this._windowPluginManager) {
      this._windowPluginManager.activate();
      this._windowPluginManager.refresh();
      this.onSavefileOk();
      RefreshManager._changed = false;
    }
  };

  Scene_PluginManager.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    this._windowLayer.removeChild(this._windowPluginManager);

    // Clean the Memory.
    // RefreshManager.clear();

    this._windowPluginManager = null;
  };

  Scene_PluginManager.prototype.createAllWindows = function () {
    this._helpWindow = new Window_PluginDesc(2);
    this._windowPluginManager = new Window_PluginManager(0, this._helpWindow.y + this._helpWindow.height + 1);
    this._windowPluginManager.setHelpWindow(this._helpWindow);
    this._windowPluginManager.setHandler('ok', this.onButtonOk.bind(this));
    this._windowPluginManager.setHandler('cancel', this.onCancel.bind(this));
    this._windowLayer.addChild(this._helpWindow);
    this._windowLayer.addChild(this._windowPluginManager);
  };

  Scene_PluginManager.prototype.onButtonOk = function() {
  };

  Scene_PluginManager.prototype.onCancel = function() {
    this.popScene();
  };

  Scene_PluginManager.prototype.onSavefileOk = function() {
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(fastLoadFileId)) {
        this.onSaveSuccess();
        if(_previewWindow) {

          setTimeout(function() {

            _previewWindow.close();

            // Decide whether or not to reload the game.
            if(isAutoReload) window.location.reload();

            _previewWindow = null;

          }, nClosingTime );

        } else {

          // Decide whether or not to reload the game.
          if(isAutoReload) window.location.reload();

        }
    } else {
        this.onSaveFailure();
    }
  };

  Scene_PluginManager.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
  	StorageManager.cleanBackup(fastLoadFileId);
    this.popScene();
  };

  Scene_PluginManager.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
  };

  Scene_PluginManager.onLoadfileOk = function() {
    if (DataManager.loadGame(fastLoadFileId)) {
      this.onLoadSuccess();
    } else {
      this.onLoadFailure();
    }
  };

  // Static

  Scene_PluginManager.onLoadSuccess = function() {
    SoundManager.playLoad();
    Scene_PluginManager.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    $gameSystem.onAfterLoad();
    try {
        if(StorageManager.exists(fastLoadFileId)) {
          StorageManager.remove(fastLoadFileId);
        }
    } catch(e) {

    }
  };

  Scene_PluginManager.onLoadFailure = function() {
    SoundManager.playBuzzer();
  };

  Scene_PluginManager.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
      $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
      $gamePlayer.requestMapReload();
    }
  };

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "RefreshManager") {
      switch (args[0]) {
      case 'open':
        SceneManager.push(Scene_PluginManager);
        break;
      }
    }
  };

  //============================================================================
  // Scene_Boot
  //
  //

  var alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    if(StorageManager.exists(fastLoadFileId)) {
      Scene_Base.prototype.start.call(this);
      SoundManager.preloadImportantSounds();
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      Scene_PluginManager.onLoadfileOk();
      document.title = $dataSystem.gameTitle;
    } else {
      alias_Scene_Boot_start.call(this);
    }
  };

  window.RefreshManager = RefreshManager;

  })();
