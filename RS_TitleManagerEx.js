/*:
 * RS_TitleManagerEx.js
 *
 * @plugindesc This plugin is changed the title screen image and
 * title-background-music when the game has been completed.
 *
 * @author biud436
 *
 * @date 2015.12.21
 * @version 1.0.3
 *
 * @param ending1
 * @desc ending1
 * ["File name of title 1","File name of title 2","File name of BGM"]
 * @default ["Book", "", "Theme1"]
 *
 * @param ending2
 * @desc ending2
 * ["File name of title 1","File name of title 2","File name of BGM"]
 * @default ["Devil", "", "Field2"]
 *
 * @param ending3
 * @desc ending3
 * ["File name of title 1","File name of title 2","File name of BGM"]
 * @default ["Book", "", "Theme1"]
 *
 * @param ending4
 * @desc ending4
 * ["File name of title 1","File name of title 2","File name of BGM"]
 * @default ["Book", "", "Theme1"]
 *
 * @param Map ID
 * @desc Map ID
 * @default 1
 *
 * @param Map X
 * @desc Map X
 * @default 0
 *
 * @param Map Y
 * @desc Map Y
 * @default 0
 *
 * @param specific command
 * @desc specific command's name.
 * @default specific command
 *
 * @param show specific command
 * @desc If you set to true, A specific command is shown in the game title screen.
 * @default true
 *
 * @help
 * This plugin provides a useful plugin command.
 *
 * Following are the plugin commands.
 *
 * - This plugin command allows you to set the Ending.
 * Ending Setup ending1
 * Ending Setup ending2
 * Ending Setup ending3
 * Ending Setup ending4
 *
 * - This plugin command allows you to initialize the Ending.
 * Ending Initialize
 *
 * - This code confirms an ended Ending of the game.
 * if($gameMap.isClearEnding("ending1")) {
 *   // true
 * } else {
 *   // false
 * }
 *
 * - Returns a completed game's Ending List. For example.
 * $gameMap.getEnding();
 *
 * - Returns the number of the completed ending. For example.
 * $gameMap.getEnding().length;
 *
 * - Version Log
 * 1.0.2 (2015.12.22) - Fixed a bug about the web local storage.
 * 1.0.3 (2016.03.07) - Fixed a bug that causes a serious problem when the parameters were set to English.
 *
 */
 /*:ko
  * RS_TitleManagerEx.js
  *
  * @plugindesc 특정 엔딩을 마친 후 타이틀과 BGM을 변경하는 플러그인입니다.
  *
  * @author 러닝은빛(biud436)
  *
  * @date 2015.12.21
  * @version 1.0.3
  *
  * @param ending1
  * @desc 엔딩1
  * ["File name of title 1","File name of title 2","File name of BGM"]
  * @default ["Book", "", "Theme1"]
  *
  * @param ending2
  * @desc 엔딩2
  * ["File name of title 1","File name of title 2","File name of BGM"]
  * @default ["Devil", "", "Field2"]
  *
  * @param ending3
  * @desc 엔딩3
  * ["File name of title 1","File name of title 2","File name of BGM"]
  * @default ["Book", "", "Theme1"]
  *
  * @param ending4
  * @desc 엔딩4
  * ["File name of title 1","File name of title 2","File name of BGM"]
  * @default ["Book", "", "Theme1"]
  *
  * @param Map ID
  * @desc 맵 ID (플레이어 초기 위치)
  * @default 1
  *
  * @param Map X
  * @desc 맵 X (플레이어 초기 위치)
  * @default 0
  *
  * @param Map Y
  * @desc 맵 Y (플레이어 초기 위치)
  * @default 0
  *
  * @param specific command
  * @desc 특별한 커맨드
  * @default specific command
  *
  * @param show specific command
  * @desc true로 설정하면, 특별한 커맨드가 표시됩니다.
  * @default true
  *
  * @help
  * 다음과 같은 플러그인 커맨드를 제공하고 있습니다.
  *
  * - 엔딩이 끝났고, 타이틀 화면을 변경하고 싶다면,
  * 엔딩 설정 ending1
  * 엔딩 설정 ending2
  * 엔딩 설정 ending3
  * 엔딩 설정 ending4
  *
  * - 지금까지의 봤던 모든 '엔딩' 기록을 삭제하고 게임을 처음 플레이 하는 것처럼 초기화 하려면,
  * 엔딩 초기화
  *
  * - 특정 엔딩을 클리어했는지 확인하려면 아래와 같이 하세요.
  * if($gameMap.isClearEnding("ending1")) {
  *   // true
  * } else {
  *   // false
  * }
  *
  * - 플레이어가 어떤 엔딩을 클리어했는지 확인하고 배열로 받아보려면 아래와 같이 하세요.
  * $gameMap.getEnding();
  *
  * - 플레이어가 엔딩을 몇 번이나 확인했는지 갯수를 알고 싶다면 아래와 같이 하세요.
  * $gameMap.getEnding().length;
  *
  * - 버전 로그
  * 1.0.2 (2015.12.22) - Web Local Storage 에 대한 버그가 수정되었습니다.
  * 1.0.3 (2016.03.07) - 영어 매개변수 사용 시에 발생하던 심각한 문제가 수정되었습니다.
  *
  */

var Imported = Imported || {};
Imported.RS_TitleManagerEx = true;

var RS = RS || {};
RS.Position = RS.Position || {};
RS.Tool = RS.Tool || {};
RS.Header = RS.Header || {};
RS.EndingClearList = RS.EndingClearList || [];

(function() {

  var parameters = PluginManager.parameters("RS_TitleManagerEx");
  var baseResource = "['', '', '']";
  var specialMenuName = String(parameters['specific command'] || 'specific command');
  var showSpecialMenu = Boolean(parameters['show specific command'] === 'true');

  // 타이틀에서 불러올 그래픽 파일들을 설정합니다
  RS.Tool.RESOURCE = {
    'base title': eval(parameters['base title']) || baseResource,
    'ending1': eval(parameters["ending1"]) || baseResource,
    'ending2': eval(parameters["ending2"]) || baseResource,
    'ending3': eval(parameters["ending3"]) || baseResource,
    'ending4': eval(parameters["ending4"]) || baseResource
  };

  // 스페셜 맵 설정
  RS.Position.MAP_ID = Number(parameters["Map ID"] || 1);
  RS.Position.X = Number(parameters["Map X"] || 0);
  RS.Position.Y = Number(parameters["Map Y"] || 0);
  RS.Position.RESULT = [RS.Position.MAP_ID, RS.Position.X, RS.Position.Y];

  //
  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function() {
      RS.Tool.RESOURCE['base title'] = [$dataSystem.title1Name, $dataSystem.title2Name, $dataSystem.titleBgm]
      alias_Scene_Title_create.call(this);
  };

  // 스폐셜 메뉴를 설정합니다.
  DataManager.setupSpecialGame = function() {
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(arguments[0], arguments[1], arguments[2]);
    Graphics.frameCount = 0;
  }

  // 엔딩을 설정합니다
  DataManager.saveToEnding = function(string) {
    if(StorageManager.isLocalMode()) {
      StorageManager.saveToLocalEnding(string);
    } else {
      StorageManager.saveToWebEnding(string);
    }
  }

  // 엔딩 파일을 삭제합니다
  DataManager.removeEnding = function() {
    if(StorageManager.isLocalMode()) {
      StorageManager.removeLocalEnding();
    } else {
      StorageManager.removeWebEnding();
    }
  }

  // 엔딩에 맞는 정보를 불러옵니다
  DataManager.loadFromEnding = function(string) {
    if(StorageManager.isLocalMode()) {
      return StorageManager.loadFromLocalEnding(string);
    } else {
      return StorageManager.loadFromWebEnding(string);
    }
  }

  // 엔딩 파일을 저장합니다.
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
  }

  // 엔딩 파일을 로드합니다.
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
  }

  // 엔딩 파일을 삭제합니다.
  StorageManager.removeLocalEnding = function() {
    var fs = require('fs');
    var filePath = this.localFileDirectoryPath() + 'ending.dat';
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
  }

  // 엔딩 파일을 웹 로컬 저장소에 저장합니다 .
  StorageManager.saveToWebEnding = function(string) {
    var key = 'RPG Ending';
    var json = JSON.stringify(this.publishKey(string));
    var data = LZString.compressToBase64(json);
    localStorage.setItem(key, data);
  };

  // 엔딩 파일을 웹 로컬 저장소에서 로드합니다.
  StorageManager.loadFromWebEnding = function(string) {
    var key = 'RPG Ending';
    var data = null;

    if(!!localStorage.getItem(key)) {
      data = localStorage.getItem(key);
      return JSON.parse(LZString.decompressFromBase64(data));
    } else {
      return this.endingNull();
    }
  }

  // 엔딩 파일을 웹 로컬 저장소에서 삭제합니다.
  StorageManager.removeWebEnding = function() {
      var key = 'RPG Ending';
      localStorage.removeItem(key);
  };

  // 엔딩키를 찾을 수 없을 때
  StorageManager.endingNull = function() {
    var ending;
    ending = {};
    ending.version = 0;
    ending.n = RS.Tool.RESOURCE['base title'];
    ending.endingClearList = RS.EndingClearList;
    return ending;
  }

  // 엔딩키 발급(게임의 버전/리소스의 이름)
  StorageManager.publishKey = function(string) {
    try {
      var ending;
      ending = {};
      ending.version = 1000;
      ending.n = RS.Tool.RESOURCE[string];
      RS.EndingClearList.push(string);
      ending.endingClearList = RS.EndingClearList;
      return ending;
    } catch(e) {
      return this.endingNull();
    }
  }

  RS.Header.background = null;

  // 엔딩키값을 로드합니다
  RS.Header.load = function() {
    var f = DataManager.loadFromEnding();
    RS.EndingClearList = f.endingClearList;
    var result = [f.version, f.n];
    return result;
  }

  // 배경화면 정보를 설정합니다
  RS.Header.chooseBackground = function() {
    if(this.load()[0] === 1000) {
      this.loadBackground(this.load()[1])
      return true;
    } else {
      RS.Header.background = RS.Tool.RESOURCE['base title'];
      return false;
    }
  };

  // 배경화면을 불러옵니다
  RS.Header.loadBackground = function(set) {
    RS.Header.background = set;
  };

  // 배경화면을 배포합니다
  RS.Header.exportBackground = function() {
    return RS.Header.background;
  }

  // 스페셜 메뉴를 설정합니다.
  RS.Header.isSpecialMenu = function() {
    if(this.load()[0] === 1000 && showSpecialMenu) {
      return true;
    } else {
      return false;
    }
  }

  // 배경 화면을 생성합니다.
  Scene_Title.prototype.createBackground = function() {
      RS.Header.chooseBackground();
      this._backSprite1 = new Sprite(ImageManager.loadTitle1(RS.Header.exportBackground()[0]));
      this._backSprite2 = new Sprite(ImageManager.loadTitle2(RS.Header.exportBackground()[1]));
      this.addChild(this._backSprite1);
      this.addChild(this._backSprite2);
  };

  // 타이틀 음악을 재생합니다.
  Scene_Title.prototype.playTitleMusic = function() {
    if(RS.Header.chooseBackground()) {
      var data = AudioManager.makeEmptyAudioObject();
      data.name = RS.Header.exportBackground()[2];
      data.volume = 90;
      AudioManager.playBgm(data);
    } else {
      AudioManager.playBgm($dataSystem.titleBgm);
    }
      AudioManager.stopBgs();
      AudioManager.stopMe();
  };

  // 스페셜 메뉴를 기존 커맨드 윈도우에 추가합니다.
  Window_TitleCommand.prototype.makeCommandList = function() {
      this.addCommand(TextManager.newGame,   'newGame');
      this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
      if(RS.Header.isSpecialMenu()) {
        this.addCommand(specialMenuName, 'specialMenu');
      }
      this.addCommand(TextManager.options,   'options');
  };

  // 커맨드 윈도우를 생성합니다.
  var alias_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
      alias_createCommandWindow.call(this);
      if(RS.Header.isSpecialMenu()) {
        this._commandWindow.setHandler('specialMenu', this.specialMenu.bind(this));
      }
  };

  // 다른 맵으로 이동합니다.
  Scene_Title.prototype.specialMenu = function() {
    DataManager.setupSpecialGame.apply(DataManager, RS.Position.RESULT);
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
  };

  // 플러그인 커맨드
  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);
      if(command === "Ending" || command === "엔딩") {
        switch (args[0]) {
          case 'Setup':
          case '설정':
            DataManager.saveToEnding(args[1]);
            break;
          case '초기화':
          case 'Initialize':
            DataManager.removeEnding();
            break;
        }
      }
  };

 // 엔딩 클리어 여부 확인
  Game_Map.prototype.isClearEnding = function(string) {
    var result = RS.EndingClearList.filter(function(i){
      if(i === string) {
        return true;
      } else {
        return false;
      }
    }.bind(this));
    return result.length > 0
  };

 // 엔딩 리스트 출력
  Game_Map.prototype.getEnding = function() {
    return RS.EndingClearList;
  };

})();
