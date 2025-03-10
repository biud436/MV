//================================================================
// RS_ResourceUpdate.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_ResourceUpdate.js
 * @plugindesc This plugin allows you to download additional resource files on PC.
 * @author biud436
 *
 * @param URL_DB
 * @desc Please enter the url that has the version text.
 * @default https://github.com/biud436/MV/raw/master/Laboratory/DBVersion.json
 *
 * @param Current Version
 * @desc Please enter the currently version.
 * @default 0.1.1
 *
 * @help
 * =============================================================================
 * Introduction
 * =============================================================================
 * This plugin enables your RPG Maker MV game to download additional resource
 * files from the internet during runtime on PC platforms. It provides a
 * versioning system that automatically checks if newer resources are available
 * and downloads them as needed.
 *
 * =============================================================================
 * Features
 * =============================================================================
 * - Automatic version checking against a remote JSON database
 * - Downloads resources only when updates are available
 * - Progress tracking during download (visible in console)
 * - Supports downloading image files and other assets
 * - Works only on PC platforms (not mobile devices)
 *
 * =============================================================================
 * Required JSON Structure
 * =============================================================================
 * The remote JSON file should be structured as follows:
 * {
 *   "dbVersion": "0.1.2",
 *   "data": {
 *     "pictures": {
 *       "src": "/img/pictures/",
 *       "list": [
 *         "https://example.com/path/to/image1.png",
 *         "https://example.com/path/to/image2.png"
 *       ]
 *     }
 *   }
 * }
 *
 * =============================================================================
 * How It Works
 * =============================================================================
 * 1. When the game starts, the plugin checks the remote JSON file for version info
 * 2. If the remote version is newer than the current version, it begins downloading
 * 3. Files are downloaded to the appropriate folders in your game directory
 * 4. Console messages display download progress and completion status
 * 5. After successful download, the current version is updated
 *
 * =============================================================================
 * Usage Notes
 * =============================================================================
 * - Resources are downloaded to the path specified in the JSON structure
 * - Progress is displayed in the console (F8)
 * - The plugin automatically runs during game boot; no manual activation required
 * - Requires internet connection to check for updates
 * - Works only on desktop platforms (Windows, macOS, Linux)
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.04 (v1.0.0) - First Release.
 * 2018.12.01 (v1.0.1) - Fixed the bug that is not loaded files in RPG Maker MV v1.6.1 or more.
 */
/*:ko
 * RS_ResourceUpdate.js
 * @plugindesc 인터넷을 통해 리소스를 다운로드 받을 수 있는 플러그인입니다.
 * @author biud436
 *
 * @param URL_DB
 * @desc 파일 목록이 있는 파일의 주소를 적어주시기 바랍니다.
 * @default https://github.com/biud436/MV/raw/master/Laboratory/DBVersion.json
 *
 * @param Current Version
 * @desc 현재 버전을 입력하세요.
 * @default 0.1.1
 *
 * @help
 * =============================================================================
 * 개요
 * =============================================================================
 * 이 플러그인은 PC 환경에서 RPG Maker MV 게임이 실행 중에 인터넷을 통해
 * 추가 리소스 파일을 다운로드할 수 있게 해줍니다. 버전 관리 시스템을 제공하여
 * 새로운 리소스가 있는지 자동으로 확인하고 필요에 따라 다운로드합니다.
 *
 * =============================================================================
 * 기능
 * =============================================================================
 * - 원격 JSON 데이터베이스를 통한 자동 버전 확인
 * - 업데이트가 있을 때만 리소스 다운로드
 * - 다운로드 진행 상황 추적 (콘솔에 표시)
 * - 이미지 파일 및 기타 리소스 다운로드 지원
 * - PC 플랫폼에서만 작동 (모바일 기기 미지원)
 *
 * =============================================================================
 * 필요한 JSON 구조
 * =============================================================================
 * 원격 JSON 파일은 다음과 같은 구조를 가져야 합니다:
 * {
 *   "dbVersion": "0.1.2",
 *   "data": {
 *     "pictures": {
 *       "src": "/img/pictures/",
 *       "list": [
 *         "https://example.com/path/to/image1.png",
 *         "https://example.com/path/to/image2.png"
 *       ]
 *     }
 *   }
 * }
 *
 * =============================================================================
 * 작동 방식
 * =============================================================================
 * 1. 게임이 시작될 때 플러그인은 원격 JSON 파일에서 버전 정보를 확인합니다
 * 2. 원격 버전이 현재 버전보다 새로운 경우 리소스 다운로드를 시작합니다
 * 3. 파일은 게임 디렉토리의 적절한 폴더에 다운로드됩니다
 * 4. 콘솔 메시지로 다운로드 진행 상황과 완료 상태를 표시합니다
 * 5. 다운로드가 성공적으로 완료되면 현재 버전이 업데이트됩니다
 *
 * =============================================================================
 * 사용 참고사항
 * =============================================================================
 * - 리소스는 JSON 구조에 지정된 경로와 동일한 경로에 다운로드됩니다
 * - 진행 상황은 콘솔(F8)에 표시됩니다
 * - 플러그인은 게임 부팅 시 자동으로 실행됩니다; 수동 활성화가 필요하지 않습니다
 * - 업데이트 확인을 위해 인터넷 연결이 필요합니다
 * - 데스크톱 플랫폼(Windows, macOS, Linux)에서만 작동합니다
 *
 * =============================================================================
 * 변경 이력
 * =============================================================================
 * 2016.01.04 (v1.0.0) - 최초 릴리스
 * 2018.12.01 (v1.0.1) - RPG Maker MV v1.6.1 이상에서 파일이 로드되지 않는 버그 수정
 */
var Imported = Imported || {};
Imported.RS_ResourceUpdate = true;

var RS = RS || {};
RS.Net = RS.Net || {};

(function () {
  var http, Stream, fs;
  var parameters = PluginManager.parameters('RS_ResourceUpdate');

  if (!Utils.isMobileDevice()) {
    http = require('https');
    Stream = require('stream').Transform;
    fs = require('fs');
  }

  var DBV_URL =
    parameters['URL_DB'] ||
    'https://github.com/biud436/MV/raw/master/Laboratory/DBVersion.json';

  RS.Net._dbVersion = '';
  RS.Net._currentVersion = parameters['Current Version'] || '0.1.1';
  RS.Net._list = [];

  /**
   * @memberof RS.Net
   * @method isInit
   */
  RS.Net.isInit = function (stage) {
    if (!Utils.isMobileDevice()) {
      this._folder = (function () {
        var path = require('path');
        var targetPath = path.join(process.mainModule.filename, '..');

        return decodeURIComponent(targetPath);
      })();

      this.initDBVersion();
      this.initList();
    }
  };

  /**
   * @memberof RS.Net
   * @method downloadData
   * @link http://stackoverflow.com/questions/12740659/downloading-images-with-node-js
   */
  RS.Net.downloadData = function (filePath, url, func) {
    http
      .request(url, function (response) {
        var data = new Stream();
        var ext = url.match(/(\/www|)\/[^\/]*$/);

        if (ext && ext instanceof Array) {
          ext = ext[0];
        }

        response.on('data', function (chunk) {
          data.push(chunk);
        });

        response.on('end', function () {
          fs.writeFileSync('%1%2'.format(filePath, ext), data.read());
          func();
        });
      })
      .end();
  };

  /**
   * @memberof RS.Net
   * @method allDataDownload
   */
  RS.Net.allDataDownload = function (buf) {
    try {
      var folder = this._folder;
      var picPath = folder + buf.src;
      var length = buf.list.length;
      var req = 1;
      buf.list.forEach(function (data, index, arr) {
        this.downloadData(picPath, data, function () {
          console.log(Math.floor((req++ / length) * 100));
        });
      }, this);
    } catch (e) {
      console.log('다운로드 실패');
    }
    this.updateCurrentVersion();
    console.log('다운로드가 완료되었습니다');
  };

  /**
   * @memberof RS.Net
   * @method isUpdate
   */
  RS.Net.isUpdate = function () {
    if (RS.Net._currentVersion !== this.getDBVersion()) {
      this.allDataDownload(RS.Net._list);
    } else {
      console.log('현재 버전이 최신 버전입니다');
    }
  };

  RS.Net.initDBVersion = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', DBV_URL);
    xhr.onload = function () {
      if (xhr.status < 400) {
        var json = JsonEx.parse(xhr.responseText);
        RS.Net._dbVersion = json['dbVersion'];
        console.log(RS.Net._dbVersion);
      }
    };
    xhr.send();
  };

  RS.Net.initList = function () {
    var xhr = new XMLHttpRequest();
    var self = this;
    xhr.open('GET', DBV_URL);
    xhr.onload = function () {
      if (xhr.status < 400) {
        var json = JsonEx.parse(xhr.responseText);
        RS.Net._list = json.data.pictures;
        self.isUpdate();
      }
    };
    xhr.send();
  };

  RS.Net.getDBVersion = function () {
    return RS.Net._dbVersion;
  };

  RS.Net.updateCurrentVersion = function () {
    RS.Net._currentVersion = this.getDBVersion();
  };

  var alias_Scene_Boot_initialize = Scene_Boot.prototype.initialize;
  Scene_Boot.prototype.initialize = function () {
    alias_Scene_Boot_initialize.call(this);
    RS.Net.isInit(this);
  };
})();
