//================================================================
// RS_TitleManagerEx.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

var Imported = Imported || {};
Imported.RS_TitleManagerEx = true;

/*:ko
 * @plugindesc 엔딩 에필로그 이후 타이틀 설정을 변경할 수 있는 플러그인입니다.
 * @author 러닝은빛(biud436)
 *
 * @param Epilogue 1
 * @text 에필로그 1
 *
 * @param ep1 Title1
 * @text 타이틀 1
 * @parent Epilogue 1
 * @desc 배경으로 쓸 타이틀1 이미지를 고르세요.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep1 Title2
 * @text 타이틀 2
 * @parent Epilogue 1
 * @desc 배경으로 쓸 타이틀2 이미지를 고르세요.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep1 BGM
 * @text BGM
 * @parent Epilogue 1
 * @desc 배경 음악을 설정하세요.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 2
 * @text 에필로그 2
 *
 * @param ep2 Title1
 * @text 타이틀 1
 * @parent Epilogue 2
 * @desc 배경으로 쓸 타이틀1 이미지를 고르세요.
 * @default Devil
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep2 Title2
 * @text 타이틀 2
 * @parent Epilogue 2
 * @desc 배경으로 쓸 타이틀2 이미지를 고르세요.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep2 BGM
 * @text BGM
 * @parent Epilogue 2
 * @desc 배경 음악을 설정하세요.
 * @default Field2
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 3
 * @text 에필로그 3
 *
 * @param ep3 Title1
 * @text Title 1
 * @parent Epilogue 3
 * @desc 배경으로 쓸 타이틀1 이미지를 고르세요.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep3 Title2
 * @text Title 2
 * @parent Epilogue 3
 * @desc 배경으로 쓸 타이틀2 이미지를 고르세요.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep3 BGM
 * @text BGM
 * @parent Epilogue 3
 * @desc 배경 음악을 설정하세요.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 4
 * @text 에필로그 4
 *
 * @param ep4 Title1
 * @text Title 1
 * @parent Epilogue 4
 * @desc 에필로그 4의 타이틀1 이미지를 설정하세요
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep4 Title2
 * @text Title 2
 * @parent Epilogue 4
 * @desc 에필로그 4의 타이틀2 이미지를 설정하세요
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep4 BGM
 * @text BGM
 * @parent Epilogue 4
 * @desc 에필로그 4의 배경 음악을 설정하세요
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Location
 * @text 플레이어 초기 위치
 *
 * @param Map ID
 * @text 맵 ID
 * @parent Location
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 활성화 되는데 해당 맵의 ID입니다.
 * @type number
 * @default 1
 *
 * @param Map X
 * @text 맵 X
 * @parent Location
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 활성화 되는데 해당 맵의 X좌표입니다.
 * @type number
 * @min 0
 * @default 0
 *
 * @param Map Y
 * @text 맵 Y
 * @parent Location
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 활성화 되는데 해당 맵의 Y좌표입니다.
 * @type number
 * @min 0
 * @default 0
 *
 * @param Additional Command
 * @text 추가 버튼 설정
 *
 * @param Specific Command
 * @text 추가 버튼명
 * @parent Additional Command
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼의 이름입니다.
 * @type text
 * @default Specific Command
 *
 * @param Show Specific Command
 * @text 추가 버튼 표시 여부
 * @parent Additional Command
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 표시되어야 하는 지 여부
 * @type boolean
 * @default true
 * @on 표시한다
 * @off 표시하지 않는다
 *
 * @help
 * =============================================================================
 * 플러그인 커맨드
 * =============================================================================
 * 에필로그 이후 아래 플러그인 커맨드를 호출해야 에필로그가 끝났음을 인식합니다.
 *
 *    엔딩 설정 ending1
 *    엔딩 설정 ending2
 *    엔딩 설정 ending3
 *    엔딩 설정 ending4
 *
 * 새로운 플러그인 관리자의 구조체 기능을 사용하기에는 구조가 적합하지 않아,
 * 엔딩 이름은 고정되어있습니다.
 *
 * 다음 명령은 설정된 에필로그를 모두 지우고 타이틀을 게임 화면과 동일하게 만듭니다.
 *
 *    엔딩 초기화
 *
 * =============================================================================
 * 스크립트 호출
 * =============================================================================
 *
 * 다음은 게임 내에서 어떤 엔딩을 클리어 했는 지 여부를 판단하는 함수입니다.
 *
 *    if($gameMap.isClearEnding("ending1")) {
 *      // true
 *    } else {
 *      // false
 *    }
 *
 * 다음은 클리어한 엔딩 목록을 배열로 즉각 반환하는 함수입니다.
 *
 *    $gameMap.getEnding();
 *
 * 이렇게 하면 클리어한 엔딩의 갯수를 알 수 있습니다.
 *
 *    $gameMap.getEnding().length;
 *
 * =============================================================================
 * 변경 기록
 * =============================================================================
 * 2015.12.21 (v1.0.0) - First Release.
 * 2015.12.22 (v1.0.2) - Fixed a bug about the web local storage.
 * 2016.03.07 (v1.0.3) - Fixed a bug that causes a serious problem when the parameters were set to English.
 * 2017.06.09 (v1.0.4) - Fixed the parameter not to remove the resource when deploying the game.
 * 2017.07.23 (v1.0.5) - Fixed the incorrect description
 * 2018.08.28 (v1.0.6) - Fixed the incorrect plugin parameter's name.
 * 2018.12.01 (v1.0.7) :
 * - BGM이 재생되지 않았던 문제를 수정했습니다.
 */
/*:
 * @plugindesc This plugin allows player to change resources of the title scene after the user has been ended a certain epilogue.
 * @author biud436
 *
 * @param Epilogue 1
 *
 * @param ep1 Title1
 * @text Title 1
 * @parent Epilogue 1
 * @desc Specify the title 1 image.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep1 Title2
 * @text Title 2
 * @parent Epilogue 1
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep1 BGM
 * @text BGM
 * @parent Epilogue 1
 * @desc Specify the BGM file
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 2
 *
 * @param ep2 Title1
 * @text Title 1
 * @parent Epilogue 2
 * @desc Specify the title 1 image.
 * @default Devil
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep2 Title2
 * @text Title 2
 * @parent Epilogue 2
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep2 BGM
 * @text BGM
 * @parent Epilogue 2
 * @desc Specify the BGM file.
 * @default Field2
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 3
 *
 * @param ep3 Title1
 * @text Title 1
 * @parent Epilogue 3
 * @desc Specify the title 1 image.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep3 Title2
 * @text Title 2
 * @parent Epilogue 3
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep3 BGM
 * @text BGM
 * @parent Epilogue 3
 * @desc Specify the BGM file.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 4
 *
 * @param ep4 Title1
 * @text Title 1
 * @parent Epilogue 4
 * @desc Specify the title 1 image.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep4 Title2
 * @text Title 2
 * @parent Epilogue 4
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep4 BGM
 * @text BGM
 * @parent Epilogue 4
 * @desc Specify the BGM file.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Location
 *
 * @param Map ID
 * @parent Location
 * @desc Specify the id of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @default 1
 *
 * @param Map X
 * @parent Location
 * @desc Specify the starting point of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @min 0
 * @default 0
 *
 * @param Map Y
 * @parent Location
 * @desc Specify the starting point of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @min 0
 * @default 0
 *
 * @param Additional Command
 *
 * @param Specific Command
 * @parent Additional Command
 * @desc Specify the command name. This can move to a hidden map through this command
 * @type text
 * @default Specific Command
 *
 * @param Show Specific Command
 * @text Show
 * @parent Additional Command
 * @desc Decide whether the command window is visible.
 * @type boolean
 * @default true
 * @on visible
 * @off hide
 *
 * @help
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * This plugin command allows you to set the Ending :
 *
 *    Ending Setup ending1
 *    Ending Setup ending2
 *    Ending Setup ending3
 *    Ending Setup ending4
 *
 * This plugin command allows you to initialize the Ending :
 *
 *    Ending RemoveAll
 *
 * =============================================================================
 * Useful Scripts
 * =============================================================================
 *
 * This code confirms an ended Ending of the game :
 *
 *    if($gameMap.isClearEnding("ending1")) {
 *      // true
 *    } else {
 *      // false
 *    }
 *
 * Returns a completed game's Ending List. For example :
 *
 *    $gameMap.getEnding();
 *
 * Returns the number of the completed ending. For example :
 *
 *    $gameMap.getEnding().length;
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2015.12.21 (v1.0.0) - First Release.
 * 2015.12.22 (v1.0.2) - Fixed a bug about the web local storage.
 * 2016.03.07 (v1.0.3) - Fixed a bug that causes a serious problem when the parameters were set to English.
 * 2017.06.09 (v1.0.4) - Fixed the parameter not to remove the resource when deploying the game.
 * 2017.07.23 (v1.0.5) - Fixed the incorrect description
 * 2018.08.28 (v1.0.6) - Fixed the inccorect plugin parameter's name.
 * 2018.12.01 (v1.0.7) :
 * - Fixed the issue that couldn't playback the BGM.
 */

var RS = RS || {};
RS.TitleManagerEx = RS.TitleManagerEx || {};

(function() {

  "use strict";

  var parameters = PluginManager.parameters("RS_TitleManagerEx");

  RS.TitleManagerEx.Params = RS.TitleManagerEx.Params || {};
  RS.TitleManagerEx.Params.Position = RS.TitleManagerEx.Params.Position || {};
  RS.TitleManagerEx.Params.EndingClearList = RS.TitleManagerEx.Params.EndingClearList || [];

  RS.TitleManagerEx.Tool = RS.TitleManagerEx.Tool || {};
  RS.TitleManagerEx.Header = RS.TitleManagerEx.Header || {};

  //============================================================================

  RS.TitleManagerEx.Params.specialMenuName = String(parameters['Specific Command'] || 'Specific Command');
  RS.TitleManagerEx.Params.showSpecialMenu = Boolean(parameters['Show Specific Command'] === 'true');

  RS.TitleManagerEx.Tool.RESOURCE = RS.TitleManagerEx.Tool.RESOURCE || {};
  RS.TitleManagerEx.Tool.RESOURCE["base title"] = [];

  RS.TitleManagerEx.getEpilogue = function (name) {
    var ret = [];
    var failedRet = RS.TitleManagerEx.Tool.RESOURCE['base title'];
    if(name === 'base title') {
      return failedRet;
    }
    name = name.replace('ending', 'ep');
    ret.push(parameters[`${name} Title1`]);
    ret.push(parameters[`${name} Title2`]);
    ret.push(parameters[`${name} BGM`]);
    return (!!ret) ? ret : failedRet;
  };

  Object.assign(RS.TitleManagerEx.Tool.RESOURCE, {
    'ending1': RS.TitleManagerEx.getEpilogue('ending1'),
    'ending2': RS.TitleManagerEx.getEpilogue('ending2'),
    'ending3': RS.TitleManagerEx.getEpilogue('ending3'),
    'ending4': RS.TitleManagerEx.getEpilogue('ending4')
  });

  RS.TitleManagerEx.Params.Position = {
    'MAP_ID': Number(parameters["Map ID"] || 1),
    'X': Number(parameters["Map X"] || 0),
    'Y': Number(parameters["Map Y"] || 0)
  };

  RS.TitleManagerEx.Params.Position.RESULT = [
    RS.TitleManagerEx.Params.Position.MAP_ID,
    RS.TitleManagerEx.Params.Position.X,
    RS.TitleManagerEx.Params.Position.Y
  ];

  //============================================================================
  // DataManager
  //============================================================================

  DataManager.setupSpecialGame = function() {
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(arguments[0], arguments[1], arguments[2]);
    Graphics.frameCount = 0;
  };

  DataManager.saveToEnding = function(string) {
    if(StorageManager.isLocalMode()) {
      StorageManager.saveToLocalEnding(string);
    } else {
      StorageManager.saveToWebEnding(string);
    }
  };

  DataManager.removeEnding = function() {
    if(StorageManager.isLocalMode()) {
      StorageManager.removeLocalEnding();
    } else {
      StorageManager.removeWebEnding();
    }
  };

  DataManager.loadFromEnding = function(string) {
    if(StorageManager.isLocalMode()) {
      return StorageManager.loadFromLocalEnding(string);
    } else {
      return StorageManager.loadFromWebEnding(string);
    }
  };

  //============================================================================
  // StorageManager
  //============================================================================

  StorageManager.saveToLocalEnding = function(string) {
    var json = JSON.stringify(this.publishKey(string));
    var data = LZString.compressToBase64(json);
    var fs = require('fs');
    var dirPath = this.localFileDirectoryPath();
    var filePath = dirPath + "ending.dat";
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(filePath, data);
  };

  StorageManager.loadFromLocalEnding = function(string) {
    var data = null;
    var fs = require('fs');
    var filePath = this.localFileDirectoryPath() + 'ending.dat';
    if(fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath, { encoding: 'utf8' });
      return JSON.parse(LZString.decompressFromBase64(data));
    } else {
      return this.endingNull();
    }
  };

  StorageManager.removeLocalEnding = function() {
    var fs = require('fs');
    var filePath = this.localFileDirectoryPath() + 'ending.dat';
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
  };

  StorageManager.saveToWebEnding = function(string) {
    var key = 'RPG Ending';
    var json = JSON.stringify(this.publishKey(string));
    var data = LZString.compressToBase64(json);
    localStorage.setItem(key, data);
  };

  StorageManager.loadFromWebEnding = function(string) {
    var key = 'RPG Ending';
    var data = null;

    if(!!localStorage.getItem(key)) {
      data = localStorage.getItem(key);
      return JSON.parse(LZString.decompressFromBase64(data));
    } else {
      return this.endingNull();
    }
  };

  StorageManager.removeWebEnding = function() {
      var key = 'RPG Ending';
      localStorage.removeItem(key);
  };

  StorageManager.endingNull = function() {
    var ending;
    ending = {};
    ending.version = 0;
    ending.n = RS.TitleManagerEx.Tool.RESOURCE['base title'];
    ending.endingClearList = RS.TitleManagerEx.Params.EndingClearList;
    return ending;
  };

  StorageManager.publishKey = function(string) {
    try {
      var ending;
      ending = {};
      ending.version = 1000;
      ending.n = RS.TitleManagerEx.Tool.RESOURCE[string];
      RS.TitleManagerEx.Params.EndingClearList.push(string);
      ending.endingClearList = RS.TitleManagerEx.Params.EndingClearList;
      return ending;
    } catch(e) {
      return this.endingNull();
    }
  };

  //============================================================================
  // RS.TitleManagerEx.Header
  //============================================================================

  RS.TitleManagerEx.Header.background = null;

  RS.TitleManagerEx.Header.load = function() {
    var f = DataManager.loadFromEnding();
    RS.TitleManagerEx.Params.EndingClearList = f.endingClearList;
    var result = [f.version, f.n];
    return result;
  }

  RS.TitleManagerEx.Header.chooseBackground = function() {
    if(this.load()[0] === 1000) {
      this.loadBackground(this.load()[1])
      return true;
    } else {
      RS.TitleManagerEx.Header.background = RS.TitleManagerEx.Tool.RESOURCE['base title'];
      return false;
    }
  };

  RS.TitleManagerEx.Header.loadBackground = function(set) {
    RS.TitleManagerEx.Header.background = set;
  };

  RS.TitleManagerEx.Header.exportBackground = function() {
    return RS.TitleManagerEx.Header.background;
  };

  RS.TitleManagerEx.Header.isSpecialMenu = function() {
    if(this.load()[0] === 1000 && RS.TitleManagerEx.Params.showSpecialMenu) {
      return true;
    } else {
      return false;
    }
  };

  //============================================================================
  // Game_Map
  //============================================================================

   Game_Map.prototype.isClearEnding = function(string) {
     var result = RS.TitleManagerEx.Params.EndingClearList.filter(function(i){
       if(i === string) {
         return true;
       } else {
         return false;
       }
     }.bind(this));
     return result.length > 0
   };

   Game_Map.prototype.getEnding = function() {
     return RS.TitleManagerEx.Params.EndingClearList;
   };

  //============================================================================
  // Window_TitleCommand
  //============================================================================

  Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    if(RS.TitleManagerEx.Header.isSpecialMenu()) {
      this.addCommand(RS.TitleManagerEx.Params.specialMenuName, 'specialMenu');
    }
    this.addCommand(TextManager.options,   'options');
  };

  //============================================================================
  // Scene_Title
  //============================================================================

  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function() {
    RS.TitleManagerEx.Tool.RESOURCE['base title'] = [$dataSystem.title1Name, $dataSystem.title2Name, $dataSystem.titleBgm],
    alias_Scene_Title_create.call(this);
  };

  Scene_Title.prototype.createBackground = function() {
    RS.TitleManagerEx.Header.chooseBackground();
    this._backSprite1 = new Sprite(ImageManager.loadTitle1(RS.TitleManagerEx.Header.exportBackground()[0]));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2(RS.TitleManagerEx.Header.exportBackground()[1]));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
  };

  Scene_Title.prototype.playTitleMusic = function() {
    if(RS.TitleManagerEx.Header.chooseBackground()) {
      var data = AudioManager.makeEmptyAudioObject();
      data.name = RS.TitleManagerEx.Header.exportBackground()[2];
      data.volume = 90;
      data.pitch = 100;
      AudioManager.playBgm(data);
    } else {
      AudioManager.playBgm($dataSystem.titleBgm);
    }
      AudioManager.stopBgs();
      AudioManager.stopMe();
  };

  var alias_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
    alias_createCommandWindow.call(this);
    if(RS.TitleManagerEx.Header.isSpecialMenu()) {
      this._commandWindow.setHandler('specialMenu', this.specialMenu.bind(this));
    }
  };

  Scene_Title.prototype.specialMenu = function() {
    DataManager.setupSpecialGame.apply(DataManager, RS.TitleManagerEx.Params.Position.RESULT);
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_pluginCommand.call(this, command, args);
    if(command === "Ending" || command === "엔딩") {
      switch (args[0].toLowerCase()) {
        case 'setup':
        case '설정':
          DataManager.saveToEnding(args[1]);
          break;
        case '초기화':
        case 'removeall':
          DataManager.removeEnding();
          break;
      }
    }
  };

})();
