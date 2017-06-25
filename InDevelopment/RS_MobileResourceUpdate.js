/*:
 * RS_MobileResourceUpdate.js
 * @plugindesc This plugin had not been completed yet.
 * @author biud436
 *
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_MobileResourceUpdate = true;

var RS = RS || {};
RS.Net = RS.Net || {};

(function() {

  //============================================================================
  // DownloadManager
  //
  //

  function DownloadManager() {
    throw new Error("this is a static class");
  }

  DownloadManager.baseURL = '';
  DownloadManager.list = DownloadManager.list || {};
  DownloadManager.list.audio = {
    'bgm': [],
    'bgs': [],
    'me': [],
    'se': []
  };
  DownloadManager.list.data = [];
  DownloadManager.list.fonts = [];
  DownloadManager.list.icon = [];
  DownloadManager.list.movies = [];
  DownloadManager.list.save = [];
  DownloadManager.list.js = {
    'libs': [],
    'plugins': []
  };
  DownloadManager.list.img = {
    'animations': [],
    'battlebacks1': [],
    'battlebacks2': [],
    'characters': [],
    'enemies': [],
    'faces': [],
    'parallaxes': [],
    'pictures': [],
    'sv_actors': [],
    'sv_enemies': [],
    'system': [],
    'tilesets': [],
    'titles1': [],
    'titles2': [],
  };

  // http://www.iana.org/assignments/media-types/media-types.xhtml
  DownloadManager.getBlobType = function(type) {
    switch (type) {
      case 'html':
        return {type: 'text/html;charset=UTF-8'};
      case 'css':
        return {type: 'text/css;charset=UTF-8'};
      case 'javascript':
        return {type: 'text/javascript;charset=UTF-8'};
      case 'xml':
        return {type: 'text/xml'};
      case 'text':
        return {type: 'text/plain;charset=UTF-8'};
      case 'csv':
        return  {type: 'text/csv'};
      case 'json':
        return {type: 'application/json;charset=UTF-8'};
      case 'png':
        return {type: 'image/png'};
      case 'ogg':
        return {type: 'audio/ogg;audio/vorbis;'};
      case 'mp4':
        return {type: 'audio/mp4'};
      case 'MP4A-LATM':
        return {type: 'audio/MP4A-LATM'};
      case 'H264':
        return {type: 'video/H264'};
      default:
        return {type: 'image/*'};
    }
  };

  DownloadManager.createBlob = function(arrayData, type) {
    var oType = this.getBlobType(type);
    var blob = new Blob(arrayData, oType);
  };

  DownloadManager.downloadAudioList = function(src) {
    var xhr = new XMLHttpRequest();
    var self = this;
    var fileType = self.getBlobType('ogg').type;
    xhr.open('GET', src);
    xhr.overrideMimeType( fileType );
    xhr.onload = function() {
      if(xhr.status < 400) {
        var json = JsonEx.parse(xhr.responseText);
        self.list.audio = json.list.audio;
      }
    }
    xhr.send();
  }

  // DownloadManager.download = function(src, name) {
  //   var xhr = new XMLHttpRequest();
  //   var url = 'data/' + src;
  //   xhr.open('GET', url);
  //   xhr.overrideMimeType('application/json');
  //   xhr.onload = function() {
  //       if (xhr.status < 400) {
  //           window[name] = JSON.parse(xhr.responseText);
  //           DataManager.onLoad(window[name]);
  //       }
  //   };
  //   xhr.onerror = function() {
  //       DataManager._errorUrl = DataManager._errorUrl || url;
  //   };
  //   window[name] = null;
  //   xhr.send();
  // };

  //============================================================================
  // ListBuilder
  //
  // Write a text file including the name of all the file.

  function ListBuilder() {
    throw new Error("this is a static class");
  }

  ListBuilder.buildImageFiles = function() {
    // read all of the file
    // converted json for printing a text file
    // write a text file
  };
  ListBuilder.buildAudioFiles = function() {
    // same as a function above.
  };
  ListBuilder.buildFontFiles = function() {
    // same as a function above.
  };
  ListBuilder.buildDataFiles = function() {
    // same as a function above.
  };
  ListBuilder.buildJavascriptFiles = function() {
    // same as a function above.
  };

  //============================================================================
  // DataManager
  //
  //

  var alias_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function() {
    var info = alias_DataManager_makeSavefileInfo.call(this);
    info.version = '1.0.0';
    return info;
  };

})();
