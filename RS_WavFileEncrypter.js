/*:
 * @plugindesc (v1.0.3) Wav File Encrypter <RS_WavFileEncrypter>
 * @author biud436
 *
 * @param key
 * @desc Encryption Key
 * @default myKey
 *
 * @help
 * -----------------------------------------------------------------------------
 * How to install
 * -----------------------------------------------------------------------------
 * 1. Make new directory called 'CryptoJS' to js/libs folder
 * 2. Installing the library called CryptoJS and place them in js/libs/CryptoJS folder
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js
 * 3. Sets up this plugin and your secret key in Plugin Manager.
 * 4. Start Game and then run code as follows.
 * Encrypter.startBuild();
 * 5. Copy them to your release project after completed build.
 * -----------------------------------------------------------------------------
 * Plugin Command
 * -----------------------------------------------------------------------------
 * You can be available this command in your event editor.
 *
 * Encryption startBuild
 *
 * It quickly creates files in same folder after all files build.
 * -----------------------------------------------------------------------------
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.11.30 (v1.0.0) - First Release.
 * 2016.12.05 (v1.0.1) - Added new plugin command.
 * 2018.02.27 (v1.0.2) - Fixed the file path for RMMV 1.6.0
 * 2018.03.13 (v1.0.3) - Fixed the token error.
 */
/*:ko
 * @plugindesc (v1.0.3) 웨이브 파일 인크립터 <RS_WavFileEncrypter>
 * @author 러닝은빛(biud436)
 *
 * @param key
 * @text 비밀 키
 * @desc 암호화에 필요한 인크립션 키를 입력하세요.
 * @default myKey
 *
 * @help
 * -----------------------------------------------------------------------------
 * 설치 방법
 * -----------------------------------------------------------------------------
 * 1. 먼저 js/libs 폴더에 'CryptoJS'라는 새 폴더를 만드세요.
 * 2. 해당 폴더에 안에 아래 라이브러리를 다운로드 받아서 넣으세요.
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js
 * 3. 플러그인 관리에서 비밀키를 설정하세요.
 * 4. 자동 실행 이벤트로 다음 스크립트 코드를 호출합니다. 
 * Encrypter.startBuild();
 * 5. 설정을 마치고 게임을 실행하면 빌드가 완료되고, 동일한 폴더에 파일이 생성됩니다.
 * 
 * -----------------------------------------------------------------------------
 * 플러그인 명령
 * -----------------------------------------------------------------------------
 * 플러그인 명령으로 빌드를 할 수도 있습니다.
 *
 * Encryption startBuild
 *
 * 동일한 폴더에 .rpgmvw 파일이 생성됩니다.
 * 
 * -----------------------------------------------------------------------------
 * 변동 사항
 * -----------------------------------------------------------------------------
 * 2016.11.30 (v1.0.0) - First Release.
 * 2016.12.05 (v1.0.1) - Added new plugin command.
 * 2018.02.27 (v1.0.2) - Fixed the file path for RMMV 1.6.0
 * 2018.03.13 (v1.0.3) - Fixed the token error.
 */

var Imported = Imported || {};
Imported.RS_WavFileEncrypter = true;

function Encrypter() {
    throw new Error('This is a static class');
}

(function() {

  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<RS_WavFileEncrypter>");
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var fs = require('fs');

  Encrypter.SIGNATURE = "5250474d56000000";
  Encrypter.VER = "000301";
  Encrypter.REMAIN = "0000000000";
  Encrypter._headerlength = 16;
  Encrypter.key = parameters['key'] || 'myKey';
  Encrypter._path = 'js/libs/CryptoJS/';
  Encrypter._wavPath = 'audio/wav/';
  Encrypter._encryptionKey = ["d4", "1d", "8c", "d9", "8f", "00", "b2", "04", "e9", "80", "09", "98", "ec", "f8", "42", "7e"];

  Encrypter.loadScript = function(name) {
    try {
      var url = Encrypter.getCurrentPath() + this._path + name;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = false;
      script._url = url;
      document.body.appendChild(script);
    } catch (e) {
      Encrypter.getMd5Lib();
    }
  };

  Encrypter.getWaveFiles = function() {
    if(!!process === false) return;
    var index = 0;
    if(process.versions.node && process.versions.v8) {
        var path = require('path'),
        fs = require('fs'),
        base = path.dirname(process.mainModule.filename);
        root = path.join(base, 'audio', 'wav');
        var files = fs.readdirSync(root);
        return files.filter(function(i) {
            var reg = /^[^\.]+$/
            return !reg.test(i);
        });
    }
  };

  Encrypter.isNodeWebkit = function () {
    return Utils.isNwjs();
  };

  Encrypter.readWavStream = function (path) {
    if(!this.isNodeWebkit()) return;

    var requestFile = new XMLHttpRequest();
    requestFile.open("GET", Encrypter.getCurrentPath() + path);
    requestFile.responseType = "arraybuffer";
    requestFile.send();

    requestFile.onload = function () {
        if(this.status < 400) {
          var buffer = Encrypter.encryptArrayBuffer(requestFile.response);
          Encrypter.writeEncryptWaveStream(Encrypter.getCurrentPath() + path, Encrypter.toBuffer(buffer));
        }
    };
  };

  Encrypter.writeEncryptWaveStream = function (path, bin) {
    if(!this.isNodeWebkit()) return;
    var mpath = path.slice( 0, path.lastIndexOf(".") );
    var ext = path.slice( path.lastIndexOf(".") );
    var writeStream = fs.createWriteStream( mpath + ".rpgmvw",  {flags: 'w+'});
    writeStream.write( bin );
    writeStream.end();
    writeStream.on('finish', function() {
    	console.log('finish');
    });
  };

  Encrypter.localFilePath = function(fileName) {
    if(!Utils.isNwjs()) return '';
    var path, base;
    path = require('path');
    base = path.dirname(process.mainModule.filename);
    return path.join(base, fileName);
  };

  Encrypter.getCurrentPath = function () {
    if(Utils.isNwjs()) {
      var path = require('path');
      return path.dirname(process.mainModule.filename) + path.sep;
    } else {
      return window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/")) + "/";
    }
  };

  Encrypter.createHeader = function (size) {
    var bin = new ArrayBuffer(size);
    var dataView = new DataView(bin);
    var i, ref = this.SIGNATURE + this.VER + this.REMAIN;
    for (i = 0; i < size; i++) {
        dataView.setUint8(i, parseInt("0x" + ref.substr(i * 2, 2), size) );
    }
    return bin;
  };

  Encrypter.generateKey = function (encryptKey) {
    var compressedKey = CryptoJS.MD5(encryptKey).toString();
    this._encryptionKey = compressedKey.split(/(.{2})/).filter(Boolean);
  };

  Encrypter.toBuffer = function (bin) {
    var buf = new Buffer(bin.byteLength);
    var headerView = new Uint8Array(bin);
    for (i = 0; i < bin.byteLength; i++) {
      buf[i] = headerView[i];
    }
    return buf;
  };

  Encrypter.encryptArrayBuffer = function(arrayBuffer) {

    if (!arrayBuffer) return null;

    var i = 0;

    // header
    var ref = this.SIGNATURE + this.VER + this.REMAIN;
    var refBytes = new Uint8Array(16);
    for (i = 0; i < this._headerlength; i++) {
        refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
    }

    var resultBuffer = new ArrayBuffer(refBytes.byteLength + arrayBuffer.byteLength);

    var view = new DataView(resultBuffer);

    Encrypter.generateKey( Encrypter.key );

    // Address  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | a | b | c | d | e | f | DUMP
    // 00000000 | ------------------------------------------------------------- | RPGMV........................
    // 00000010 | ------------------------------------------------------------- | .wav file header (encrypted)
    // 00000020 | ------------------------------------------------------------- | Do not encrypt

    if (arrayBuffer) {

      // source data
      var resultArray = new Uint8Array(resultBuffer);
      var byteArray = new Uint8Array(arrayBuffer);

      // 0x00 ~ 0x0F
      for (i = 0; i < this._headerlength; i++) {
          resultArray[i] = refBytes[i];
          view.setUint8(i, resultArray[i]);
      }

      // 0x10 ~ 0x1F
      for (i = 0x10; i < 0x20; i++) {
          resultArray[i] = byteArray[i - 0x10] ^ parseInt(this._encryptionKey[i - 0x10], 16);
          view.setUint8(i, resultArray[i]);
      }

      for (i = 0x20; i < resultArray.length; i++) {
          resultArray[i] = byteArray[i -  0x10];
          view.setUint8(i, resultArray[i]);
      }

    }

    return resultBuffer;
  };

  Encrypter.startBuild = function () {
    var files = Encrypter.getWaveFiles();
    files.forEach(function (i) {
      Encrypter.readWavStream(Encrypter._wavPath + i);
    });
  };

  Encrypter.loadScript('core-min.js');
  Encrypter.loadScript('md5.js');

  Decrypter.extToEncryptExt = function(url) {
      var ext = url.split('.').pop();
      var encryptedExt = ext;

      if(ext === "ogg") encryptedExt = ".rpgmvo";
      else if(ext === "m4a") encryptedExt = ".rpgmvm";
      else if(ext === "png") encryptedExt = ".rpgmvp";
      else if(ext === "wav") encryptedExt = ".rpgmvw";
      else encryptedExt = ext;

      return url.slice(0, url.lastIndexOf(ext) - 1) + encryptedExt;
  };

  Encrypter.downloadData = function (url, path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', new URL(url), true);
    xhr.overrideMimeType('text/javascript');
    xhr.onload = function() {
      if(xhr.status < 400) {
        var fileName = url.match(/^.+:\/\/.+\/(.*)$/g);
        var writeStream = fs.createWriteStream( path + fileName,  {flags: 'w+'});
        var bin = xhr.response;
        writeStream.write( bin );
        writeStream.end();
        writeStream.on('finish', function() {
        	console.log('Finished to download at ' + path);
        });
      }
    }
    xhr.send();
  };

  Encrypter.getMd5Lib = function () {
    setTimeout(function () {
      var libraryPath = Encrypter.getCurrentPath() + 'js/libs/';
      Encrypter.downloadData('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js', libraryPath);
      Encrypter.downloadData('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js', libraryPath);
    }, 0);
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Encryption" && args[0] === 'startBuild') {
      Encrypter.startBuild();
    }
    // if(command === "MD5" && args[0] === 'download') {
    //   Encrypter.getMd5Lib();
    // }
  };


})();
