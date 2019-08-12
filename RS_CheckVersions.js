//================================================================
// RS_CheckVersions.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to open the market page in a boot scene if there has detected a new version for this game <RS_CheckVersions>
 * @author biud436
 *
 * @param target
 * @text Target
 * @type select
 * @desc self : Open the page to current page
 * blank : Open the page to a new window
 * @default _self
 * @option self
 * @value _self
 * @option blank
 * @value _blank
 *
 * @param url
 * @text Default URL
 * @desc Specify the url of the json file that has the version text.
 * @default https://github.com/biud436/MV/raw/master/Laboratory/Versions.json
 *
 * @param defaultMessage
 * @text Default Message
 * @desc Specify the default message in an alert window.
 * (The #{VERSION} text will be changed as real version value)
 * @default There has detected a new version<#{VERSION}> for this game.
 *
 * @param errorMessage
 * @text Error Message
 * @desc When you are not connected the Internet you get an warning message and exit the game.
 * @default Not connected to the Internet.
 *
 * @param marketUrl
 * @text Market Page URL
 * @desc Specify the market page url of each platform.
 * @type struct<MarketPage>
 * @default {"Android":"https://play.google.com/store/apps/details?id=<package-name>","iOS":"http://itunes.apple.com/<country>/app/<app–name>/id<app-ID>?mt=8"}
 *
 * @help
 * To be able to set up this plugin, You follow these steps. We need to create
 * the version file in a project folder and server.
 *
 * 1. We need to add the file called "Versions.json" to <your_project>/data/ folder
 * 2. Next we must add the file called "Versions.json" in your private site (or server),
 * for fetching the version data file in the site or server.
 * 3. The contents of each JSON file should then something like this.
 * If you need to update, please change the version value in the site or server.
 *
 * {
 * 	"version": "1.0.0"
 * }
 *
 * When you are not connected the Internet you get an warning message.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.11.29 (v1.0.0) - First Release
 */

 /*~struct~MarketPage:
  *
  * @param Android
  * @desc Specify the market page url
  * Replace <package-name> text to a real package name.
  * @default https://play.google.com/store/apps/details?id=<package-name>
  *
  * @param iOS
  * @desc Specify the market page url
  * Replace queries like <country>, <app–name>, <app-ID> to a real value
  * @default http://itunes.apple.com/<country>/app/<app–name>/id<app-ID>?mt=8
  *
  */

/*:ko
  * @plugindesc <RS_CheckVersions>
  * @author biud436
  *
  * @param target
  * @text 타겟
  * @type select
  * @desc self : 현재 페이지에서 마켓 페이지로 이동합니다 (게임 종료됨)
  * blank : 새로운 창을 열어 마켓 페이지로 이동합니다.
  * @default _self
  * @option self
  * @value _self
  * @option blank
  * @value _blank
  *
  * @param url
  * @text 기본 URL
  * @desc 버전 파일을 읽어 올 공개 또는 비공개 사이트의 주소를 입력하세요
  * @default https://github.com/biud436/MV/raw/master/Laboratory/Versions.json
  *
  * @param defaultMessage
  * @text 기본 메시지
  * @desc 새로운 업데이트를 찾았다는 메시지를 표시합니다.
  * ( #{VERSION}은 서버에 있는 버전을 읽어서 대체합니다 )
  * @default 새로운 버전 #{VERSION}을 찾았습니다. 마켓으로 이동합니다.
  *
  * @param errorMessage
  * @text 오류 메시지
  * @desc 인터넷에 연결되어있지 않으면 오류 메시지를 띄우고 게임을 종료합니다.
  * @default 인터넷에 연결되지 않았습니다.
  *
  * @param marketUrl
  * @text 마켓 페이지 URL
  * @desc 각 플랫폼 별 마켓 페이지의 주소를 설정할 수 있습니다.
  * @type struct<MarketPage>
  * @default {"Android":"https://play.google.com/store/apps/details?id=<package-name>","iOS":"http://itunes.apple.com/<country>/app/<app–name>/id<app-ID>?mt=8"}
  *
  * @help
  *
  * 다음 단계에 따라 플러그인을 설정하시기 바랍니다
  *
  * 1. data 폴더에 Versions.json 파일을 추가합니다.
  * 2. 다음으로, 비공개 사이트(또는 서버)에 Versions.json 파일을 추가합니다.
  * 3. JSON 파일의 내용은 아래와 같아야 합니다.
  * 업데이트가 필요한 경우, 사이트 측의 버전 표기 값을 변경하시기 바랍니다.
  *
  * {
  * 	"version": "1.0.0"
  * }
  *
  * =============================================================================
  * Change Log
  * =============================================================================
  * 2017.11.29 (v1.0.0) - First Release
  */

  /*~struct~MarketPage:ko
  *
  * @param Android
  * @desc 구글 플레이 주소를 기입하세요
  * <package-name>을 실제 패키지 명으로 대체하십시오
  * @default https://play.google.com/store/apps/details?id=<package-name>
  *
  * @param iOS
  * @desc 앱스토어 주소를 기입하세요
  * <country>, <app–name>, <app-ID>을 실제 값으로 대체하세요.
  * @default http://itunes.apple.com/<country>/app/<app–name>/id<app-ID>?mt=8
  *
  */

 var Imported = Imported || {};
 Imported.RS_CheckVersions = true;

 var RS = RS || {};
 RS.Net = RS.Net || {};

(function () {

  var isValidRMVersion = (Utils.RPGMAKER_VERSION >= '1.5.1');
  if(!isValidRMVersion) {
    var texts = [
      "The version of RPG MAKER MV is lower.",
      "This plugin is needed RM 1.5.1 version or above.",
      "You can update as the latest versions of RPG Maker MV from the following websites.",
      "Steam - http://store.steampowered.com/app/363890/RPG_Maker_MV/",
      "RPG Maker Web - http://www.rpgmakerweb.com/products/programs/rpg-maker-mv"
    ].join("\n");
    console.warn(texts);
    return;
  }

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_CheckVersions>');
  }); parameters = (parameters.length > 0) && parameters[0].parameters;

  var defaultMessage = parameters["defaultMessage"] || "There has detected a new version for this game.";
  var errorMessage = parameters["errorMessage"] || "Not connected to the Internet";
  var windowTarget = parameters["target"] || "_self";
  var packageName = parameters["packageName"] || "com.kakao.talk";
  var marketUrl = JSON.parse(parameters["marketUrl"]);
  var defaultUrl = (parameters["url"] || "https://github.com/biud436/MV/raw/master/Laboratory/Versions.json") + "?" + Date.now();

  DataManager._databaseFiles.push({
    name: '$game_versions',
    src: 'Versions.json'
  });

  RS.Net.initVersion = function(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', defaultUrl);
    xhr.onload = function() {
      if(xhr.status < 400) {
        var json = JsonEx.parse(xhr.responseText);
        RS.Net._dbVersion = json['version'];
        var pageUrl = (Utils.isMobileSafari()) ? marketUrl.iOS : marketUrl.Android;
        var isNwJs = Utils.isNwjs();
        var isRequestedNewVersion = (RS.Net._dbVersion != $game_versions.version);
        var version = RS.Net._dbVersion || '0.0.0';
        var message = defaultMessage.replace("#{VERSION}", version);
        if( !isNwJs && isRequestedNewVersion) {
          window.alert(message);
          window.open(pageUrl, windowTarget);
          return false;
        }
        callback();
      }
      xhr.onerror = function () {
        window.alert(errorMessage);
        SceneManager.exit();
      };
    }
    xhr.send();
  };

  var alias_Scene_Boot_initialize = Scene_Boot.prototype.initialize;
  var alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.initialize = function() {
    alias_Scene_Boot_initialize.call(this);
    RS.Net.initVersion(alias_Scene_Boot_start);
  };

  Scene_Boot.prototype.start = function() {
  };

})();
