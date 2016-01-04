/*:
 * RS_ResourceUpdate.js
 * @plugindesc 리소스 추가 다운로드
 * @author biud436
 *
 * @param URL_DB
 * @desc 버전 문자열이 있는 URL
 * @default https://raw.githubusercontent.com/biud436/MV/master/DBVersion.json
 *
 */

var RS = RS || {};
RS.Net = RS.Net || {};

(function() {

  var http, Stream, fs;
  var parameters = PluginManager.parameters('RS_ResourceUpdate');


  if(!Utils.isMobileDevice()) {
    http = require('https');
    Stream = require('stream').Transform;
    fs = require('fs');
  }

  var DBV_URL = parameters["URL_DB"] || "https://raw.githubusercontent.com/biud436/MV/master/DBVersion.json";

  // 다운로드 해야 할 이미지 리스트
  // var list = [
  //   'https://raw.githubusercontent.com/biud436/MV/master/HUD/hp.png',
  //   'https://raw.githubusercontent.com/biud436/MV/master/HUD/mp.png',
  //   'https://raw.githubusercontent.com/biud436/MV/master/HUD/exr.png',
  //   'https://raw.githubusercontent.com/biud436/MV/master/HUD/hud_window_empty.png',
  //   'https://raw.githubusercontent.com/biud436/MV/master/HUD/gauge.png',
  //   'https://raw.githubusercontent.com/biud436/MV/master/HUD/masking.png'
  // ];

  RS.Net._dbVersion = '';
  RS.Net._currentVersion = '0.1.1';
  RS.Net._list = [];

  /**
   * @memberof RS.Net
   * @method isInit
   */
  RS.Net.isInit = function(stage) {
    if(!Utils.isMobileDevice()) {

      this._folder = (function() {
          var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '');
          if (path.match(/^\/([A-Z]\:)/)) {
              path = path.slice(1);
          }
          return decodeURIComponent(path);
      })();
      this.initDBVersion();
      this.isUpdate();
    }
  }

  /**
   * @memberof RS.Net
   * @method downloadData
   * @link http://stackoverflow.com/questions/12740659/downloading-images-with-node-js
   */
  RS.Net.downloadData = function(filePath, url) {
    http.request(url, function(response) {
      var data = new Stream();
      var ext = url.match(/(\/www|)\/[^\/]*$/);

      if(ext && ext instanceof Array) {
        ext = ext[0];
      }

      response.on('data', function(chunk) {
        data.push(chunk);
      });

      response.on('end', function() {
        fs.writeFileSync('%1%2'.format(filePath, ext), data.read());
      });

    }).end();
  }

  /**
   * @memberof RS.Net
   * @method allDataDownload
   */
  RS.Net.allDataDownload = function(buf) {
    try {
      var folder = this._folder;
      var picPath = folder + "/img/pictures"
      var length = buf.length;
      buf.forEach(function(data, index, arr) {
        this.downloadData(picPath, data);
        console.log( Math.floor(((1 + index) / length) * 100));
      }.bind(this));
    } catch(e) {
      console.log("다운로드 실패");
    }
    this.updateCurrentVersion();
    console.log('다운로드가 완료되었습니다');
  }

  /**
   * @memberof RS.Net
   * @method isUpdate
   */
  RS.Net.isUpdate = function() {
    if(RS.Net._currentVersion !== this.getDBVersion()) {
      this.allDataDownload(this.getList());
    } else {
      console.log("현재 버전이 최신 버전입니다");
    }
  }

  RS.Net.initDBVersion = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', DBV_URL);
    xhr.onload = function() {
      if(xhr.status < 400) {
        var json = JsonEx.parse(xhr.responseText);
        RS.Net._dbVersion = json['dbVersion'];
      }
    }
    xhr.send();
  }

  RS.Net.initList = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', DBV_URL);
    xhr.onload = function() {
      if(xhr.status < 400) {
        var json = JsonEx.parse(xhr.responseText);
        RS.Net._list = json['list'];
      }
    }
    xhr.send();
  }

  RS.Net.getDBVersion = function() {
    return RS.Net._dbVersion;
  }

  RS.Net.getList = function() {
    return RS.Net._list;
  }

  RS.Net.updateCurrentVersion = function() {
    RS.Net._currentVersion = this.getDBVersion();
  }

  var alias_Scene_Boot_initialize = Scene_Boot.prototype.initialize;
  Scene_Boot.prototype.initialize = function() {
      alias_Scene_Boot_initialize.call(this);
      RS.Net.isInit(this);
  };

})();
