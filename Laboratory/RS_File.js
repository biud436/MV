/*:
 * RS_File.js
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_File = true;

function FileUtils() {
    throw new Error("This is a static class");
}

(function() {

  //============================================================================
  // Empty Interface
  //============================================================================

  FileUtils.getAllFiles = function () {};
  FileUtils.getFilePath = function () {};
  FileUtils.isDirectory = function () {};
  FileUtils.isFile = function () {};
  FileUtils.getFileSize = function () {};
  FileUtils.getDirname = function () {};
  FileUtils.atime = function () {};
  FileUtils.ctime = function () {};
  FileUtils.mtime = function () {};
  FileUtils.join = function () {};

  //============================================================================
  // Bind nw.js
  //============================================================================

  if(Utils.isNwjs()) {

    function NwjsInterface_File() {
      throw new Error("This is a static class");
    }

    /**
     * 현재 경로에 있는 모든 파일을 구합니다.
     * @method getFiles
     * @return {Array} 파일명이 포함됩니다.
     */
    NwjsInterface_File.getFiles = function() {
        if(!!process === false) return;
        var index = 0;
        if(process.versions.node && process.versions.v8) {
            var path = require('path'),
            fs = require('fs'),
            root = path.join(".", path.dirname(window.location.pathname));
            var files = fs.readdirSync(root);
            return files.filter(function(i) {
                var reg = /^[^\.]+$/
                return !reg.test(i);
            })
        }
    };

    /**
     * 데이터 폴더에 있는 파일의 전체 경로를 반환합니다.
     * @method localFilePath
     * @param {String} fileName 파일명
     * @return {String}
     */
    NwjsInterface_File.localFilePath = function (fileName) {
      if(!Utils.isNwjs()) return '';
      var path, base;
      path = require('path');
      base = path.dirname(process.mainModule.filename);
      return path.join(base, 'data/') + (fileName || defaultTemplate);
    };

    /**
     * 폴더 인지 확인
     * @method isDirectory
     * @param {String} path 파일 경로
     * @return {Boolean}
     */
    NwjsInterface_File.isDirectory = function (path) {
      var fs = require('fs');
      return fs.lstatSync(path).isDirectory();
    };

    /**
     * 파일 인지 확인
     * @method isFile
     * @param {String} path 파일 경로
     * @return {Boolean}
     */
    NwjsInterface_File.isFile = function (path) {
      var fs = require('fs');
      return fs.lstatSync(path).isFile();
    };

    /**
     * 파일 존재 여부 확인
     * @method isExist
     * @param {Stirng} path 파일 경로
     * @return {Boolean}
     */
    NwjsInterface_File.isExist = function (path) {
      var fs = require('fs');
      return fs.existsSync(path);
    };

    /**
     * 파일 사이즈
     * @method getFileSize
     * @param {Stirng} path 파일 경로
     * @return {Number}
     */
    NwjsInterface_File.getFileSize = function (path) {
      var fs = require('fs');
      var rateMegaByte = 1000000.0;
      var fileSize = fs.statSync(path).size;
      return (fileSize != 0) ? (fs.statSync(path).size / rateMegaByte) : 0;
    };

    /**
     * 액세스한 날짜
     * @method atime
     * @param {Stirng} path 파일 경로
     * @return {Date}
     */
    NwjsInterface_File.atime = function (path) {
      var fs = require('fs');
      return fs.statSync(path).atime;
    };

    /**
     * 만든 날짜
     * @method ctime
     * @param {Stirng} path 파일 경로
     * @return {Date}
     */
    NwjsInterface_File.ctime = function (path) {
     var fs = require('fs');
     return fs.statSync(path).ctime;
    };

   /**
    * 수정한 날짜
    * @method mtime
    * @param {Stirng} path 파일 경로
    * @return {Date}
    */
    NwjsInterface_File.mtime = function (path) {
      var fs = require('fs');
      return fs.statSync(path).mtime;
    };

  /**
   * 폴더 이름 반환
   * @method getDirname
   * @param {Stirng} path 파일 경로
   * @return {String}
   */
    NwjsInterface_File.getDirname = function (filePath) {
      var path = require('path');
      return path.dirname(filePath);
    };

    /**
     * 파일 경로를 결합합니다.
     * @method join
     * @param {Arguments} arguments
     * @return {String}
     */
    NwjsInterface_File.join = function () {
       var path = require('path');
       return path.join.apply(path, arguments);
    };

    FileUtils.getAllFiles = NwjsInterface_File.getFiles;
    FileUtils.getFilePath = NwjsInterface_File.localFilePath;
    FileUtils.isDirectory = NwjsInterface_File.isDirectory;
    FileUtils.isFile = NwjsInterface_File.isFile;
    FileUtils.getFileSize = NwjsInterface_File.getFileSize;
    FileUtils.getDirname = NwjsInterface_File.getDirname;
    FileUtils.atime = NwjsInterface_File.atime;
    FileUtils.ctime = NwjsInterface_File.ctime;
    FileUtils.mtime = NwjsInterface_File.mtime;
    FileUtils.join = NwjsInterface_File.join;

  }

  /**
   * @see https://github.com/apache/cordova-plugin-file/releases
   */

  if(window.cordova && cordova.file) {

    document.addEventListener("deviceready", 'onFileSystemAPI', false);

    function CordovaInterface_File() {
      throw new Error("This is a static class");
    }

    /**
     * @see https://www.neontribe.co.uk/cordova-file-plugin-examples/
     */
    function onFileSystemAPI() {

      CordovaInterface_File.root = null;
      CordovaInterface_File.persistentRoot  = null;
      CordovaInterface_File.tempRoot = null;
      CordovaInterface_File.cacheRoot = null;
      CordovaInterface_File.dataRoot = null;
      CordovaInterface_File.syncedDataRoot  = null;
      CordovaInterface_File.externalDataRoot = null;
      CordovaInterface_File._init = false;

      /**
       * @method init
       */
      CordovaInterface_File.init = function () {

        var onError = function (e) {
          console.log(JSON.stringify(e));
        };

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
          CordovaInterface_File.root = fs.root;
          CordovaInterface_File.persistentRoot = CordovaInterface_File.root;

          window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function (fs) {
            CordovaInterface_File.tempRoot = fs.root;
          }, onError);

          // window.requestFileSystem(cordova.file.cacheDirectory, 0, function (fs) {
          //   CordovaInterface_File.cacheRoot = fs.root;
          // }, onError);
          //
          // window.requestFileSystem(cordova.file.dataDirectory, 0, function (fs) {
          //   CordovaInterface_File.dataRoot  = fs.root;
          // }, onError);
          //
          // if(navigator.userAgent.match(/Android/i)) {
          //   window.requestFileSystem(cordova.file.externalDataDirectory, 0, function (fs) {
          //     CordovaInterface_File.externalDataRoot = fs.root;
          //   }, onError);
          // }
          //
          // if(navigator.userAgent.match(/iPhone/i)) {
          //   window.requestFileSystem(cordova.file.syncedDataDirectory, 0, function (fs) {
          //     CordovaInterface_File.syncedDataRoot = fs.root;
          //   }, onError);
          // }

          CordovaInterface_File._init = true;

        }, onError);
      };

      /**
       * 문자열을 파일에 작성합니다.
       * @method writeFromString
       * @param {String} filePath
       * @param {pathType} pathType
       * @param {String} string
       * @param {requestCallback} callback
       */
      CordovaInterface_File.writeFromString = function (filePath, pathType, string, callback) {

          var root = CordovaInterface_File.getPathType(pathType);
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);

          root.getFile(filePath, { create: true}, function (fileEntry) {

              fileEntry.createWriter(function (fileWriter) {

                  fileWriter.onwriteend = function(e) {
                    if(callback) callback(e);
                  };

                  fileWriter.onerror = function(e) {
                    console.error(e);
                  };

                  var blob = new Blob([string], {type: 'text/plain'});
                  fileWriter.write(blob);

              }, error);

          }, error);

      };

      /**
       * 캔버스 url을 base64 형식의 문자열로 잘라냅니다.
       * @method toBase64
       * @param {String} url
       * @return {String} base64
       */
      CordovaInterface_File.toBase64 = function (url) {
          var token = ';base64,';
          var idx = url.indexOf(token) + token.length;
          var base64 = url.substring(idx);
          return base64;
      };

      /**
       * 캔버스에서 Blob 객체로 변환합니다.
       * @method canvasToBlob
       * @author PAEz
       * @see http://jsfiddle.net/PAEz/XfDUS/
       * @return {Uint8Array} bufferArray
       */
      CordovaInterface_File.canvasToBlob = function () {
          var canvas = Bitmap.snap(SceneManager._scene);
          var dataURL = canvas._canvas.toDataURL();
          var base64 = CordovaInterface_File.toBase64(dataURL);
          var raw = window.atob(base64);
          var bufferArray = new Uint8Array(new ArrayBuffer(raw.length));
          for(var i = 0; i < raw.length; i++) {
            bufferArray[i] = raw.charCodeAt(i);
          }
          return bufferArray;
      };

      /**
       * 모바일 기기에서 게임의 스크린샷을 촬영합니다.
       * @method takeScreenshotInCache
       * @param {String} filename
       * @param {requestCallback} callback
       */
      CordovaInterface_File.takeScreenshotInCache = function (filename, callback) {
          var bufferArray = CordovaInterface_File.canvasToBlob();
          var blob = new Blob([bufferArray.buffer], {type: 'image/png'});
          var root = CordovaInterface_File.getPathType('cache');
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);

          filename = filename || (new Date()).toTimeString().split(/[\,\:\W]*/).join('');

          CordovaInterface_File.createDirectory('ScreenShots', function (dirEntry) {
            dirEntry.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {
              fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function(e) {
                  console.log('Successfully saved : ' + fileEntry.fullPath);
                  console.log('result : ' + this.result);
                };

                fileWriter.onerror = function(e) {
                  console.error(JSON.stringify(e));
                };

                fileWriter.write(blob);

              }, error);
            }, error);
          }, error);

      };


      /**
       * deletes specified file or directory
       * @see https://github.com/apache/cordova-plugin-file/blob/master/tests/tests.js#L131
       * @param {String} name
       * @param {Function} success
       * @param {Function} error
       */
      CordovaInterface_File.deleteEntry = function (name, success, error) {
          // deletes entry, if it exists
          // entry.remove success callback is required: http://www.w3.org/TR/2011/WD-file-system-api-20110419/#the-entry-interface

          var root = CordovaInterface_File.getPathType('cache');

          success = success || function() {};
          error = error || CordovaInterface_File.errorCallback.bind(null, name);

          window.resolveLocalFileSystemURL(root.toURL() + '/' + name, function (entry) {
              if (entry.isDirectory === true) {
                  entry.removeRecursively(success, error);
              } else {
                  entry.remove(success, error);
              }
          }, success);
      };

      /**
       * deletes file, if it exists, then invokes callback
       * @see https://github.com/apache/cordova-plugin-file/blob/master/tests/tests.js#L146
       * @param {String} fileName
       * @param {requestCallback} callback
       */
      CordovaInterface_File.deleteFile = function (fileName, callback) {
          // entry.remove success callback is required: http://www.w3.org/TR/2011/WD-file-system-api-20110419/#the-entry-interface
          var root = CordovaInterface_File.getPathType('cache');
          callback = callback || function() {};
          root.getFile(fileName, null, // remove file system entry
              function (entry) {
              entry.remove(callback, function () {
                  console.log('[ERROR] deleteFile cleanup method invoked fail callback.');
              });
          }, // doesn't exist
              callback);
      };

      /**
       * deletes and re-creates the specified file
       * @see https://github.com/apache/cordova-plugin-file/blob/master/tests/tests.js#L159
       * @method createFile
       * @param {String} name
       * @param {Function} success
       * @param {Function} error
       */
      CordovaInterface_File.createFile = function (fileName, success, error) {
          var root = CordovaInterface_File.getPathType('cache');
          CordovaInterface_File.deleteEntry(fileName, function () {
              root.getFile(fileName, {
                  create : true
              }, success, error);
          }, error);
      };

      /**
       * deletes and re-creates the specified directory
       * @see https://github.com/apache/cordova-plugin-file/blob/master/tests/tests.js#L167
       * @method createDirectory
       * @param {String} dirName
       * @param {Function} success
       * @param {Function} error
       */
      CordovaInterface_File.createDirectory = function (dirName, success, error) {
          var root = CordovaInterface_File.getPathType('cache');
          CordovaInterface_File.deleteEntry(dirName, function () {
             root.getDirectory(dirName, {
                 create : true
             }, success, error);
          }, error);
       };

      /**
       * 텍스트 파일을 읽습니다.
       * @method readFromString
       * @param {String} filepath
       * @param {String} pathType
       * @param {Function} callback
       */
      CordovaInterface_File.readFromString = function (filePath, pathType, callback) {

          var root = CordovaInterface_File.getPathType(pathType);

          window.resolveLocalFileSystemURL(path, function (fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    var data = (typeof(this.result) !== 'string') ? this.result : JSON.parse(this.result);
                    callback(data);
                };

                /** @see http://www.iana.org/assignments/character-sets/character-sets.xhtml */
                reader.readAsText(file, 'UTF-8');

            });
          },
          CordovaInterface_File.errorCallback.bind(null, filePath));
      };

      /**
       * 바이너리 파일을 읽습니다.
       * @method readFromBinary
       * @param {String} filepath
       * @param {Function} callback
       */
      CordovaInterface_File.readFromBinary = function (filePath, callback) {
          var path = CordovaInterface_File.getPathType(pathType) + filePath;
          window.resolveLocalFileSystemURL(path, function (fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    var data = (typeof(this.result) !== 'string') ? this.result : JSON.parse(this.result);
                    callback(data);
                };

                reader.readAsBinaryString(file);

            });
          },
          CordovaInterface_File.errorCallback.bind(null, filePath));
      };

      /**
       * 버퍼를 읽습니다.
       * @method readFromArrayBuffer
       * @param {String} filepath
       * @param {Function} callback
       */
      CordovaInterface_File.readFromArrayBuffer = function (filePath, callback) {
          var path = CordovaInterface_File.getPathType(pathType) + filePath;
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);
          window.resolveLocalFileSystemURL(path, function (fileEntry) {
            fileEntry.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                    var data = (typeof(this.result) !== 'string') ? this.result : JSON.parse(this.result);
                    callback(data);
                };

                reader.readAsArrayBuffer(file);

            });
          }, error);
      };

      /**
       * @method errorCallback
       * @param {String} filepath
       * @param {ErrorEvent} e
       */
      CordovaInterface_File.errorCallback = function (filePath, e) {

          switch (e.code) {
            case FileError.NOT_FOUND_ERR:
              console.error(filePath + ' : ' + 'NOT_FOUND_ERR');
              break;
            case FileError.SECURITY_ERR:
              console.error(filePath + ' : ' + 'SECURITY_ERR');
              break;
            case FileError.ABORT_ERR:
              console.error(filePath + ' : ' + 'ABORT_ERR');
              break;
            case FileError.NOT_READABLE_ERR:
              console.error(filePath + ' : ' + 'NOT_READABLE_ERR');
              break;
            case FileError.ENCODING_ERR:
              console.error(filePath + ' : ' + 'ENCODING_ERR');
              break;
            case FileError.NO_MODIFICATION_ALLOWED_ERR:
              console.error(filePath + ' : ' + 'NO_MODIFICATION_ALLOWED_ERR');
              break;
            case FileError.INVALID_STATE_ERR:
              console.error(filePath + ' : ' + 'INVALID_STATE_ERR');
              break;
            case FileError.SYNTAX_ERR:
              console.error(filePath + ' : ' + 'SYNTAX_ERR');
              break;
            case FileError.INVALID_MODIFICATION_ERR:
              console.error(filePath + ' : ' + 'INVALID_MODIFICATION_ERR');
              break;
            case FileError.QUOTA_EXCEEDED_ERR:
              console.error(filePath + ' : ' + 'QUOTA_EXCEEDED_ERR');
              break;
            case FileError.TYPE_MISMATCH_ERR:
              console.error(filePath + ' : ' + 'TYPE_MISMATCH_ERR');
              break;
            case FileError.PATH_EXISTS_ERR:
              console.error(filePath + ' : ' + 'PATH_EXISTS_ERR');
              break;
            default:
              if(!!e.message) {
                console.error(e.message);
              } else {
                console.error(JSON.stringify(e));
              }
          }

      };

      /**
       * MB로 반환합니다.
       * @method convertMegaByte
       */
      CordovaInterface_File.convertMegaByte = function (n) {
          return n * 1024 * 1024;
      };

      /**
       * @method getPathType
       * @param {String} type temp, cache, data, top
       */
      CordovaInterface_File.getPathType = function (type) {
          if(!CordovaInterface_File._init) {
            console.log("The file system is not initialied ");
            return cordova.file.cacheDirectory;
          }
          switch (type) {
            case 'temp': case 'cache':
              return CordovaInterface_File.tempRoot;
            case 'data':
              return CordovaInterface_File.root;
            case 'top':
              return CordovaInterface_File.persistentRoot;
            default:
              return CordovaInterface_File.root;
          }
      };

      /**
       * @method getFiles
       * @param {String} filePath
       * @param {String} rootType
       * @param {Boolean} isFullpath if you set true, it will return full path of which file in certain directory.
       * @param {requestCallback} callback
       */
      CordovaInterface_File.getFiles = function (filePath, pathtType, isFullpath, callback) {

          // If the init function has already been ran, this statement could run successfully.
          var root = CordovaInterface_File.getPathType(pathType);
          var reader = root.createReader();
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);

          reader.readEntries(function (resultData) {
            var result = resultData.map(function (i) {
              return (isFullpath === true) ? i.fullPath : i.name;
            });
            callback(result);
          }, error);

          // This path might be slow a reading files on Android.
          var path = cordova.file.applicationDirectory;
          window.resolveLocalFileSystemURL(path, function (entry) {
            var reader = entry.createReader();
            reader.readEntries(function(putData) {
              var allData = putData.map(function (i) {
                return (isFullpath === true) ? i.fullPath : i.name;
              });
              callback(allData);
            }, error);
          },  error);

      };

      /**
       * @method isFile
       * @param {String} filePath filename
       * @param {String} rootType
       * @param {requestCallback} callback
       */
      CordovaInterface_File.isFile = function (filePath, pathType, callback) {
          var root = CordovaInterface_File.getPathType(pathType);
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);
          root.getFile(filePath, { create: true, exclusive: false }, function (fileEntry) {
              callback(fileEntry.isFile);
          }, error);
      };

      /**
       * @method isDirectory
       * @param {String} filePath filename
       * @param {String} rootType
       * @param {requestCallback} callback
       */
      CordovaInterface_File.isDirectory = function (filePath, pathType, callback) {
          var root = CordovaInterface_File.getPathType(pathType);
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);
          root.getDirectory(filePath, { create: true, exclusive: false }, function (fileEntry) {
              callback(fileEntry.isFile);
          }, error);
      };

      /**
       * @method ctime
       * @param {String} filePath filename
       * @param {String} rootType
       * @param {requestCallback} callback
       */
      CordovaInterface_File.ctime = function (filePath, pathType, callback) {
          var root = CordovaInterface_File.getPathType(pathType);
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);
          root.getFile(filePath, { create: true, exclusive: false }, function (fileEntry) {
              callback(fileEntry.lastModifiedDate);
          }, error);
      };

      /**
       * @method getFileSize
       * @param {String} filePath filename
       * @param {String} rootType
       * @param {requestCallback} callback
       */
      CordovaInterface_File.getFileSize = function (filePath, pathType, callback) {
          var root = CordovaInterface_File.getPathType(pathType);
          var error = CordovaInterface_File.errorCallback.bind(null, filePath);
          root.getFile(filePath, { create: true, exclusive: false }, function (fileEntry) {
              callback(fileEntry.size);
          }, error);
      };

      /**
       * @method join
       * @see https://github.com/nodejs/node/blob/master/lib/path.js#L1205
       * @license https://github.com/nodejs/node/blob/master/LICENSE
       * @param {Arguments} arguments
       */
      CordovaInterface_File.join = function () {
          if (arguments.length === 0)
            return '.';
          var joined;
          for (var i = 0; i < arguments.length; ++i) {
            var arg = arguments[i];
            if (arg.length > 0) {
              if (joined === undefined)
                joined = arg;
              else
                joined += '/' + arg;
            }
          }
          if (joined === undefined)
            return '.';

          return (function (path, allowAboveRoot) {
              var res = '';
              var lastSlash = -1;
              var dots = 0;
              var code;
              for (var i = 0; i <= path.length; ++i) {
                if (i < path.length)
                  code = path.charCodeAt(i);
                else if (code === 47/*/*/)
                  break;
                else
                  code = 47/*/*/;
                if (code === 47/*/*/) {
                  if (lastSlash === i - 1 || dots === 1) {
                    // NOOP
                  } else if (lastSlash !== i - 1 && dots === 2) {
                    if (res.length < 2 ||
                        res.charCodeAt(res.length - 1) !== 46/*.*/ ||
                        res.charCodeAt(res.length - 2) !== 46/*.*/) {
                      if (res.length > 2) {
                        const start = res.length - 1;
                        var j = start;
                        for (; j >= 0; --j) {
                          if (res.charCodeAt(j) === 47/*/*/)
                            break;
                        }
                        if (j !== start) {
                          if (j === -1)
                            res = '';
                          else
                            res = res.slice(0, j);
                          lastSlash = i;
                          dots = 0;
                          continue;
                        }
                      } else if (res.length === 2 || res.length === 1) {
                        res = '';
                        lastSlash = i;
                        dots = 0;
                        continue;
                      }
                    }
                    if (allowAboveRoot) {
                      if (res.length > 0)
                        res += '/..';
                      else
                        res = '..';
                    }
                  } else {
                    if (res.length > 0)
                      res += '/' + path.slice(lastSlash + 1, i);
                    else
                      res = path.slice(lastSlash + 1, i);
                  }
                  lastSlash = i;
                  dots = 0;
                } else if (code === 46/*.*/ && dots !== -1) {
                  ++dots;
                } else {
                  dots = -1;
                }
              }
              return res;
            })(joined, false);
      };

      // FileUtils.getDirname = CordovaInterface_File.getDirname;
      // import android.os.Environment;
      // import android.os.FileUtils;
      // File pathFile = Environment.getStorageDirectory();
      // String dir = pathFile.getParent();
      // return dir;      

      FileUtils.getAllFiles = CordovaInterface_File.getFiles;
      // FileUtils.getFilePath = CordovaInterface_File.localFilePath;
      FileUtils.isDirectory = CordovaInterface_File.isDirectory;
      FileUtils.isFile = CordovaInterface_File.isFile;
      FileUtils.getFileSize = CordovaInterface_File.getFileSize;

      FileUtils.atime = CordovaInterface_File.ctime;
      FileUtils.ctime = CordovaInterface_File.ctime;
      FileUtils.mtime = CordovaInterface_File.ctime;
      FileUtils.join = CordovaInterface_File.join;

    }
  }



})();
