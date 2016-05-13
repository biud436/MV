/*:
 * RS_RefreshManager.js
 * @plugindesc This plugin creates or changes a file called 'js/plugins.js'
 * @author biud436
 *
 * @help
 * RefreshManager setStatus AltMenuScreen false
 *
 */

(function() {

  var parameters = PluginManager.parameters('RS_RefreshManager');
  var fs = require('fs');

  function RefreshManager() {
    throw new Error('This is a static class');
  }

  RefreshManager._path = '/js/plugins.js';
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

    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, RefreshManager._path);
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

    // Hangul (한글 처리)
    for(var i=0x1100; i <= 0x11FF; i++) { self._typ[i] = type.Letter; }
    for(var i=0xAC00; i <= 0xD7AF; i++) { self._typ[i] = type.Letter; }

    // Cyrillic (키릴 문자)
    // for(var i= 0x0400; i <= 0x052F; i++) { self._typ[i] = type.Letter; }

    // All Unicode (모든 유니코드 처리, 메모리 낭비 심함)
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

    // 토큰 이름
    var text = '';

    // 토큰 종류
    var kind = '';

    // 공백 처리
    while(self.isSpace(self._ch)) {
      self._ch = self.nextCharacter();
    }

    // 끝 처리 ( 더 이상 처리할 것이 없을 때)
    if(self._ch === 0 || self._ch === undefined) {
      return self.createToken(type.EOF_TOKEN, text);
    }

    // 토큰 구분
    switch (self._typ[self._ch]) {

      // 식별자 처리
      case type.Dollar: case type.Letter:
        text += String.fromCharCode(self._ch);
        self._ch = self.nextCharacter();
        while(self._typ[self._ch] === type.Letter || self._typ[self._ch] === type.Digit) {
          text += String.fromCharCode(self._ch);
          self._ch = self.nextCharacter();
        }
        break;
      // 숫자 처리
      case type.Digit:
        kind = type.Int;
        for(numValue = 0; self._typ[self._ch] === type.Digit; self._ch = self.nextCharacter()) {
          numValue = numValue * 10 + self._ch;
        }
        return self.createToken(type.Int, text, numValue);
     // 문자열 처리
      case type.DblQ:
        self._ch = this.nextCharacter();
        while(self._ch !== 0 && self._ch!==34 ) {
          text += String.fromCharCode(self._ch);
          self._ch=self.nextCharacter()
        }
        if(self._ch === '\"'.charCodeAt()) {
          self._ch = this.nextCharacter();
        }
        else {
          throw new Error("문자열이 잘못되었습니다 : \" 로 끝내지 않았습니다.");
        }
        return self.createToken(type.Istring, text, 0);
      default:
      // 주석 처리
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

    kind = this.getKeywordKind(text);

    if(kind === type.Others) {
      throw new Error("잘못된 토큰이 사용되었습니다 " + text);
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
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, "/js/plugins.js");
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    path = decodeURIComponent(path);
    fs.writeFile(path , texts, function(err) {
      if(err) throw new Error(err);
      window.alert("플러그인 설정을 변경했습니다 \n \
                    \r변경된 설정은 F5 버튼을 누르면 적용됩니다");
      self._tokens = [];
      self._typ = [];
    });
  }

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

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "RefreshManager") {
      switch (args[0]) {
      case 'setStatus':
        var enabled = Boolean(args[2] === 'true');
        PluginManager.setStatus(args[1], enabled);
        break;
      }
    }
  };

  window.RefreshManager = RefreshManager;

})();
