//================================================================
// RS_RefreshManager.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_RefreshManager.js
 * @plugindesc This plugin creates or changes a file called 'js/plugins.js'
 * @author biud436
 *
 * @param Save File ID
 * @type number
 * @desc Auto Save
 * @default 1
 * @min 1
 *
 * @param Show Preview Window
 * @type boolean
 * @desc Indicate whether or not the preview window is visible.
 * @default false
 *
 * @param Auto Reload
 * @type boolean
 * @desc Decide whether or not to reload the game.
 * @default true
 *
 * @param Auto closing time
 * @type number
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
 *
 * This plugin executes using File System functions that is built into a nw.js
 * that uses in Windows or Mac. so it does not properly execute on the browsers
 * or mobile platform which is not available them.
 *
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
 * 2016.07.12 (v1.1.01) - Added two plugin parameters about File Path.
 * 2016.07.20 (v1.1.02) - Added hyphen(-) and three plugin parameters.
 * 2016.07.21 (v1.1.03) - Fixed the bug that is separating wrong identifier.
 * 2016.07.25 (v1.1.04) - Fixed default save file id.
 * 2016.08.07 (v1.1.05) - Fixed save bug.
 * 2016.12.08 (v1.1.08) - Added code to remove references to URL objects.
 * 2017.01.08 (v1.1.1) - Converted sources to ES6
 * 2018.02.27 (v1.1.2) : (RMMV 1.6.0)
 * - Now that it will be restored as the previous plugins.js file after exiting the game.
 * - Fixed an encoding of of text in the preview window.
 */
/*:ko
 * @plugindesc 플러그인을 즉각적으로 사용 중지합니다.
 * @author 러닝은빛(biud436)
 *
 * @param Save File ID
 * @text 세이브 파일 ID
 * @type number
 * @desc 자동 저장을 위한 슬롯을 지정하세요. 플러그인 설정 파일 변경 후 빠른 불러오기를 위함입니다.
 * @default 1
 * @min 1
 *
 * @param Show Preview Window
 * @text 미리보기 창 보기
 * @type boolean
 * @desc 설정 변경 이후 미리보기 창에 js/plugins.js 내용을 표시합니다.
 * @default false
 *
 * @param Auto Reload
 * @text 자동으로 다시 불러오기
 * @type boolean
 * @desc 설정 변경 이후, 게임을 재시작하고 자동으로 동일한 지점으로 복귀합니다.
 * @default true
 *
 * @param Auto closing time
 * @text 미리보기 창 닫기 딜레이
 * @type number
 * @desc 미리보기 창이 자동으로 닫힐 때 까지 걸리는 시간을 밀리초 단위로 지정하세요.
 * @default 2500
 *
 * @param Target Path
 * @text 타겟 경로
 * @desc 타겟 경로에 있는 설정 파일을 가져와서 저장 경로에 저장합니다.
 * @default /js/plugins.js
 *
 * @param Save Path
 * @text 저장 경로
 * @desc 타겟 경로에 있는 설정 파일을 가져와서 저장 경로에 저장합니다.
 * @default /js/plugins.js
 *
 * @help
 * =============================================================================
 * 플러그인 소개
 * =============================================================================
 * 플러그인들은 스크립트를 로드하는 방식으로 일시적으로 중단할 수 없습니다.
 * 이 플러그인을 사용하면 플러그인 설정 파일을 변경한 후 게임을 재시작하여 해당
 * 플러그인 사용을 정확히 정지시킬 수 있습니다.
 * 
 * 높은 호환성을 제공하지만 플러그인 설정 파일을 직접적으로 변경하므로,
 * 설정 파일 직접 변경은 개발사에서 하지 말라고 권고하는 행위입니다. 
 * 따라서 필요한 경우에만 사용하시기 바랍니다.
 * 
 * 이 플러그인은 파일 시스템 API를 필요로 하므로 PC 환경에서만 사용할 수 있습니다.
 * 
 * 물론 모바일에서도 cordova의 파일 시스템 API가 있습니다. 
 * 하지만 플러그인 설정 파일이 파일 쓰기 권한이 없는 경로에 있기 때문에 
 * 모바일에서는 사용할 수 없습니다.
 * 
 * 또한 이 플러그인은 정규표현식으로 일일히 검출하지 않고 인터프리터 소스를 이용하여
 * 구문 분석을 거치고 직접적으로 모든 토큰을 추출하여 재조합합니다. 
 * 
 * 따라서 종종 사용할 수 없는 문자로 인해 구문 분석에 실패할 수 있습니다.
 * 그런 문제가 생긴다면 개발자에게 알려주시면 감사하겠습니다.
 * 
 * =============================================================================
 * 플러그인 명령에 대해...
 * =============================================================================
 * 다음 플러그인 명령을 호출하면 RefreshManager가 열립니다.
 * 
 * RefreshManager open
 * 
 * 플러그인 설정 변경은 RefreshManager에서 가능합니다.
 * 
 * 수동으로 변경하시려면 다음과 같이 하시기 바랍니다.
 * 
 * PluginManager.setStatus(pluginName, status);
 * 
 * 예를 들면, 다음과 같습니다.
 *  ex) PluginManager.refreshStatus("Community_Basic", false);
 * 
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.16 (v0.0.1) - Beta
 * 2016.05.23 (v1.0.0) - Added new function and Fixed a bug.
 * 2016.05.23 (v1.1.0) - Added the window auto reload function and the preview
 * window that could be able to show the json file.
 * 2016.07.12 (v1.1.01) - Added two plugin parameters about File Path.
 * 2016.07.20 (v1.1.02) - Added hyphen(-) and three plugin parameters.
 * 2016.07.21 (v1.1.03) - Fixed the bug that is separating wrong identifier.
 * 2016.07.25 (v1.1.04) - Fixed default save file id.
 * 2016.08.07 (v1.1.05) - Fixed save bug.
 * 2016.12.08 (v1.1.08) - Added code to remove references to URL objects.
 * 2017.01.08 (v1.1.1) - Converted sources to ES6
 * 2018.02.27 (v1.1.2) : (RMMV 1.6.0)
 * - Now that it will be restored as the previous plugins.js file after exiting the game.
 * - Fixed an encoding of of text in the preview window.
 */

var Imported = Imported || {};
 Imported.RS_RefreshManager = true;

var RS = RS || {};

(function() {

  "use strict";

  let parameters = PluginManager.parameters('RS_RefreshManager');
  let fastLoadFileId = Number(parameters['Save File ID'] || 1);
  let nClosingTime = Number(parameters['Auto closing time'] || 2500);
  let isPreviewWindow = Boolean(parameters['Show Preview Window'] === 'true');
  let _previewWindow = null;
  let isAutoReload =  Boolean(parameters['Auto Reload'] === 'true');

  let fs = require('fs');

  class RefreshManager {

    static localFilePath(fileName) {
      if(!Utils.isNwjs()) return '';
      var path, base;
      path = require('path');
      base = path.dirname(process.mainModule.filename);
      return path.join(base, fileName);
    }

    static load(func) {
      let self = RefreshManager;
      let path = this.localFilePath(this._path);

      fs.readFile(path, RefreshManager._flags , function(err, data) {
        if(err) throw new Error(err);
        self._data  = data;
        self._length = self._data.length;
        self.startToInterpret(func);
      });
    }

    static startToInterpret(func) {
      let type = this.ENUM;
      let stackCounter = 0;
      this.initCharactersType();
      this.initKeyWord();

      for(this._token = this.nextToken(); this._token.kind !== type.EOF_TOKEN; this._token = this.nextToken()) {
          this._tokens.push(this._token);
      }

      if(func) func.call(this, this._tokens);

    }

    static initCharactersType() {
      let self = this;
      let type = self.ENUM;

      for(let i= 0; i < 256; i++) { self._typ[i] = type.Others; }
      for(let i='0'.charCodeAt(); i <= '9'.charCodeAt(); i++) { self._typ[i] = type.Digit; }

      // Sets Identifier
      for(let i='A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) { self._typ[i] = type.Letter; }
      for(let i='a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) { self._typ[i] = type.Letter; }
      self._typ['_'.charCodeAt()] = type.Letter;
      self._typ['$'.charCodeAt()] = type.Dollar;

      self._typ['\r'.charCodeAt()] = type.Caret;
      self._typ['\n'.charCodeAt()] = type.LineBreak;
      self._typ['\\'.charCodeAt()] = type.Backslash;
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
    }

    static initKeyWord() {
      let self = this;
      let type = self.ENUM;
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
        {'name':':','kind': type.Colon},
        {'name':';','kind': type.Semicolon},
        {'name': undefined,'kind': type.End}
      ];

    }

    static getToken(ch) {
      let self = this;
      let token = self._typ[ch];
      return token;
    }

    static isSpace(c) {
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

    static nextToken() {
      let self = this;
      let type = self.ENUM;
      let numValue = 0;

      // Token Name
      let text = '';

      // Token Kind
      let kind = '';

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

       // String handling
        case type.DblQ:
          self._ch = this.nextCharacter();
          while(self._ch !== 0 && self._ch !== '\"'.charCodeAt() ) {
            text += String.fromCharCode(self._ch);
            self._ch = self.nextCharacter();
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
        if(self._ch === '/'.charCodeAt() && self.currentCharacter() === '/'.charCodeAt() ) {
          for(; self._ch !== '\r'.charCodeAt() || self._ch !== '\n'.charCodeAt(); self._ch = self.nextCharacter()) {
            text += String.fromCharCode(self._ch);
            if(self._ch === '\n'.charCodeAt() ) {
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
        throw new Error("You were used incorrect tokens. : " + text);
      }
      return self.createToken(kind, text, 0);
    }

    static nextCharacter() {
      let self = this;
      self._c = self._data[self._index++];
      if(self._c !== undefined) {
        return self._c.charCodeAt();
      }
      if(self._c === undefined) {
        self._c = 0;
        return 0;
      }
    }

    static currentCharacter() {
      let self = this;
      if(self._data[self._index]) {
        return self._data[self._index].charCodeAt();
      }
      return 0;
    }

    static getKeywordKind(str) {
      let self = this;
      let type = self.ENUM;
      let keyWords = self._keyWordArray;

      for(let i = 0; keyWords[i].kind !== type.End; i++) {
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

    }

    static createToken(kind, str, num) {
      let self = this;
      let type = self.ENUM;
      let token = {};
      token.kind = kind || type.Others;
      token.text = str || "";
      token.value = num || 0;
      return token;
    }

    static makeTempPlugins() {
      let self = this;
      let path = this.localFilePath(self._savePath);
      let tempPath = this.localFilePath(self._savePath.replace("plugins", "temp_plugins"));
      fs.readFile(path, function (err, data) {
        if (err) throw err;
        fs.writeFile(tempPath , data, function(err) {
          if (err) throw err;
        });
      });
    }

    static restoreTempPlugins() {
      let self = this;
      let path = this.localFilePath(self._savePath.replace("plugins", "temp_plugins"));
      let tempPath = this.localFilePath(self._savePath);
      fs.readFile(path, function (err, data) {
        if (err) throw err;
        fs.writeFile(tempPath , data, { "encoding": "utf8", "mode": 0o666, "flag": "w+" },
          function(err) {
          if (err) throw err;
          fs.unlink(path, function (err) {
            if (err) throw err;
          });
        });

      });
    }

    static makePlugins(texts) {
      let self = this;
      let path = this.localFilePath(self._savePath);
      fs.writeFile(path , texts, function(err) {
        if(err) throw new Error(err);
        let finText = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title></title>
          </head>
          <body>
            <pre>${texts}</pre>
          </body>
        </html>
        `;
        let blob = new Blob( [finText], {encoding:"utf-8",type:"text/html;charset=utf-8"} );
        let url = URL.createObjectURL(blob);
        if(isPreviewWindow) {
            _previewWindow = window.open(url, '_blank');
            URL.revokeObjectURL(url);
        }
        RefreshManager._changed = true;
      });
    }

    static clear() {
      let self = this;
      self._tokens = [];
      self._typ = [];
    }

    static isChanged() {
      let self = this;
      return self._changed;
    }

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

  //============================================================================
  // PluginManager
  //
  //

  PluginManager.setStatus = function(pluginName, status) {

    RefreshManager.load(function(tokens) {
      let self = this;
      let type = this.ENUM;
      let searched = false;
      let index = 0;
      let statusToken = this.createToken(status ? type.TRUE : type.FALSE, status ? 'true' : 'false', 0);

      tokens.forEach(function(item, idx) {
        if(item.kind === type.Istring && item.text === pluginName) {
          searched = true;
          index = idx;
          return true;
        }
      })

      // status token
      let resultToken = tokens[index + 4];

      if(resultToken.kind === type.TRUE ||
         resultToken.kind === type.FALSE) {
         tokens[index + 4] = statusToken;
      }

      // make texts
      let texts = "";
      for(let i = 0; i < self._tokens.length; i++) {
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

      texts = JSON.parse(JSON.stringify(texts, null, '\t'));
      self.makePlugins(texts);

    });

  };

  PluginManager.refreshStatus = function(pluginName, status) {
    PluginManager.setStatus(pluginName, status);
    $gameSystem.onBeforeSave();
    if (DataManager.saveRefreshGame(fastLoadFileId)) {
      StorageManager.cleanBackup(fastLoadFileId);
      if(isAutoReload) window.location.reload();      
    }
  };

  //============================================================================
  // Window_PluginDesc
  //
  //

  class Window_PluginDesc extends Window_Help {
    constructor(numLines) {
      super(numLines);
    }
    processNormalCharacter(textState) {
      let w = this.textWidth(textState.text[textState.index]);
      if(textState.x + (w * 2) >= this.contentsWidth()) {
        textState.index--;
        this.processNewLine(textState);
      }
      super.processNormalCharacter(textState);
    }
    textWidthEx(text) {
      return this.drawTextEx.call(this, text, 0, this.contents.height);
    }
  }

  //============================================================================
  // Window_PluginManager
  //
  //

  class Window_PluginManager extends Window_Selectable {

    constructor(x, y) {
      super(x, y, Graphics.boxWidth, Graphics.boxHeight - Window_Base.prototype.fittingHeight(2));
      this._data = [];
      this._index = 0;
      this.initToken();
    }

    initToken() {
      let _this = this;
      RefreshManager.load(function() {
        let self, type, nameToken, trueToken, falseToken;
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
    }

    windowWidth() {
      return Graphics.boxWidth;
    }

    windowHeight() {
      return Graphics.boxHeight - this.fittingHeight(2);
    }

    maxItems() {
      if(this._data) {
          return this._data.length;
      } else {
         return 1;
      }
    }

    item(index) {
      if(this._data) {
          return this._data[index];
      } else {
        return {'name': {text: 'No Plugin'},
                'status': {text: 'false'},
                'description': {text: 'No Description'}};
      }
    }

    itemHeight() {
      let clientHeight = this.height - this.padding * 2;
      return Math.floor(clientHeight / this.numVisibleRows());
    }

    numVisibleRows() {
      return 8;
    }

    drawItem(index) {
      this.drawScript(index);
    }

    drawScript(index) {
      let rect = this.itemRect(index);
      let item = this.item(index);
      this.drawText(item.name.text, rect.x, rect.y, rect.width, 'left');
      this.drawText(item.status.text, rect.x, rect.y, rect.width, 'right');
    }

    processOk() {
      try {
        let item, name, enabled;
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
    }

    drawScript(index) {
      let rect = this.itemRect(index);
      let item = this.item(index);
      this.changeTextColor(this.normalColor());
      this.drawText(item.name.text, rect.x, rect.y, rect.width, 'left');
      if(item.status.text === 'true') {
        this.changeTextColor(this.mpGaugeColor1());
      } else {
        this.changeTextColor(this.hpGaugeColor1());
      }
      this.drawText(item.status.text, rect.x, rect.y, rect.width, 'right');
    }

    select(index) {
      super.select(index);
      try {
        let item = this.item(this.index());
        let name = item.name.text;
        let description = item.description.text;
        this._helpWindow.setText(description);
      } catch(e) {

      }
    }

  }

  //============================================================================
  // Scene_PluginManager
  //
  //

  class Scene_PluginManager extends Scene_Base {

    constructor() {
      super();
    }

    create() {
      super.create();
      this.createBackground();
      this.createWindowLayer();
      this.createAllWindows();
    }

    start() {
      super.start();
    }

    update() {
      super.update();
      if(RefreshManager.isChanged() && this._windowPluginManager) {
        this._windowPluginManager.activate();
        this._windowPluginManager.refresh();
        this.onSavefileOk();
        RefreshManager._changed = false;
      }
    }

    terminate() {
      super.terminate();
      this._windowLayer.removeChild(this._windowPluginManager);

      // Clean the Memory.
      // RefreshManager.clear();

      this._windowPluginManager = null;
    }

    createBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
    }

    createAllWindows() {
      this._helpWindow = new Window_PluginDesc(2);
      this._windowPluginManager = new Window_PluginManager(0, this._helpWindow.y + this._helpWindow.height + 1);
      this._windowPluginManager.setHelpWindow(this._helpWindow);
      this._windowPluginManager.setHandler('ok', this.onButtonOk.bind(this));
      this._windowPluginManager.setHandler('cancel', this.onCancel.bind(this));
      this._windowLayer.addChild(this._helpWindow);
      this._windowLayer.addChild(this._windowPluginManager);
    }

    onButtonOk() {

    }

    onCancel() {
      this.popScene();
    }

    onSavefileOk() {
      $gameSystem.onBeforeSave();
      if (DataManager.saveRefreshGame(fastLoadFileId)) {
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
    }

    onSaveSuccess() {
      SoundManager.playSave();
    	StorageManager.cleanBackup(fastLoadFileId);
      this.popScene();
    }

    onSaveFailure() {
      SoundManager.playBuzzer();
    }

    static onLoadfileOk(fastLoadFileId) {
      if (DataManager.loadGame(fastLoadFileId)) {
        this.onLoadSuccess();
      } else {
        this.onLoadFailure();
      }
    }

    static onLoadSuccess() {
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
    }

    static onLoadFailure() {
      SoundManager.playBuzzer();
    }

    static reloadMapIfUpdated() {
      if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
      }
    }

  }

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
  // Game_Temp
  //
  //

  Game_Temp.prototype.setRefreshMode = function (b) {
    this._refreshMode = b;
  };

  Game_Temp.prototype.isRefreshMode = function () {
    return this._refreshMode;
  };

  //============================================================================
  // DataManager
  //
  //

  var alias_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function() {
      var info = alias_DataManager_makeSavefileInfo.call(this);
      if($gameTemp.isRefreshMode()) info.refresh = true;
      return info;
  };

  DataManager.saveRefreshGame = function (fastLoadFileId) {
    $gameTemp.setRefreshMode(true);
    return DataManager.saveGame(fastLoadFileId);
  };

  DataManager.existsRefreshVariable = function (saveFileId) {
    var info = DataManager.loadSavefileInfo(saveFileId);
    if(info && info.refresh) {
      return true;
    } else {
      return false;
    }
  }


  //============================================================================
  // Scene_Boot
  //
  //

  var alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    if(DataManager.existsRefreshVariable(fastLoadFileId) &&
      StorageManager.exists(fastLoadFileId)) {
      Scene_Base.prototype.start.call(this);
      SoundManager.preloadImportantSounds();
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      Scene_PluginManager.onLoadfileOk(fastLoadFileId);
      document.title = $dataSystem.gameTitle;
    } else {
      RefreshManager.makeTempPlugins();
      alias_Scene_Boot_start.call(this);
    }
  };

  var _nw = (Utils.RPGMAKER_VERSION >= "1.6.0") ? nw : require('nw.gui');
  var win = _nw.Window.get();
  _nw.Window.get().on('close', function () {
    RefreshManager.restoreTempPlugins();
    this.hide();
    this.close(true);
  });

  window.RefreshManager = RefreshManager;

  })();
