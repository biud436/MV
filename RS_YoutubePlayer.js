/*:
 * RS_YoutubePlayer.js
 * @plugindesc This plugin allows you to start playback of the YouTube video.
 * @author biud436
 * @help
 * In general, In Android Chrome and Mobile Safari, It doesn't automatically
 * start playback. and you can stop the video by clicking around the YouTube video.
 * This plugin will automatically end the video playback if you watches
 * the video until the end.
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 * Graphics.playYoutube("https://www.youtube.com/watch?v=C4ze-KCSxQY");
 * if(YTPlayer.isPlaying()) YTPlayer.stopVideo();
 * YTPlayer.isPaused();
 * YTPlayer.isBuffering();
 * YTPlayer.isEnded();
 * =============================================================================
 * Plugin Command
 * =============================================================================
 * - This plugin command will start playback of the YouTube video. Please enter
 * the URL as follows. If the Internet had not connected, It could have caused
 * the error.
 *
 * YTPlayer play https://www.youtube.com/watch?v=C4ze-KCSxQY
 *
 * - Stop playback of the YouTube Video.
 *
 * YTPlayer stop
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.08 (v1.0.0) - First Release
 * 2016.05.09 (v1.0.1) - Added Error Handler
 * 2016.05.12 (v1.0.2) - Fixed a function that parses a URL.
 * 2016.07.04 (v1.0.3) - Fixed a few logic about the range were converted to Rectangular object.
 */

var Imported = Imported || {};
Imported.RS_YoutubePlayer = true;

var player;

function YTPlayer() {
  throw new Error("This is a static class");
}

//----------------------------------------------------------------------------
// Youtube Event Handler
//
//
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer-iframe', {
    height: '560',
    width: '315',
    videoId: 'BIbpYySZ-2Q',
    fs: 1,
    autoplay: 1,
    enablejsapi: 1,
    rel: 1,
    showinfo: 1,
    playsinline: 0,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
  var target = event.target;
  target.playVideo();
}

function onPlayerError(event) {
  var errorLog = "";
  switch (event.data) {
    case 2:
      // 요청에 잘못된 매개변수 값이 포함되어 있습니다. 예를 들어 11자리가 아닌 동영상 ID를 지정하거나
      // 동영상 ID에 느낌표 또는 별표와 같은 잘못된 문자가 포함된 경우에 이 오류가 발생합니다.
      errorLog += "Error Code : 2" + '\r\n';
      errorLog += "The request contains an invalid parameter value. For example, " + '\r\n';
      errorLog += "this error occurs if you specify a video ID that does not have 11 characters, " + '\r\n';
      errorLog += "or if the video ID contains invalid characters, " + '\r\n';
      errorLog += "such as exclamation points or asterisks.      " + '\r\n';
      break;
    case 5:
      // 요청한 콘텐츠는 HTML5플레이어에서 재생할 수 없는, 또는 HTML5플레이어에 대한 별도의 에러가 발생했습니다.
      errorLog += "Error Code : 5" + '\r\n';
      errorLog += " The requested content cannot be played in an HTML5 player" + '\r\n';
      errorLog += "or another error related to the HTML5 player has occurred." + '\r\n';
      break;
    case 100:
      // 요청한 동영상을 찾을 수 없습니다.
      // 어떠한 이유로든 동영상이 삭제되었거나 비공개로 표시된 경우에 이 오류가 발생합니다.
      errorLog += "Error Code : 100" + '\r\n';
      errorLog += "The video requested was not found. " + '\r\n';
      errorLog += "This error occurs when a video has been removed (for any reason) " + '\r\n';
      errorLog += "or has been marked as private." + '\r\n';
      break;
    case 101:
    case 150:
      // 요청한 동영상의 소유자가 내장 플레이어에서 동영상을 재생하는 것을 허용하지 않습니다.
      errorLog += "Error Code : 101 or 150" + '\r\n';
      errorLog += "The owner of the requested video does not allow it to be played in embedded players.";
      break;
  }
  YTPlayer.stopVideo();
  window.alert(errorLog);
}
function onPlayerStateChange (event) {
  switch(event.data) {
      case YT.PlayerState.ENDED: // 종료됨
          console.log('Video has ended.');
          YTPlayer._status = YT.PlayerState.ENDED;
          YTPlayer.removeAllElement();
          break;
      case YT.PlayerState.PLAYING: // 재생 중
          console.log('Video is playing.');
          YTPlayer._status = YT.PlayerState.PLAYING;
          break;
      case YT.PlayerState.PAUSED: // 일시 중지
          console.log('Video is paused.');
          YTPlayer._status = YT.PlayerState.PAUSED
          break;
      case YT.PlayerState.BUFFERING: // 버퍼링
          console.log('Video is buffering.');
          YTPlayer._status = YT.PlayerState.BUFFERING;
          break;
      case YT.PlayerState.CUED: // 동영상 신호
          console.log('Video is cued.');
          YTPlayer._status = YT.PlayerState.CUED;
          break;
      default: // 시작 전
          console.log('Unrecognized state.');
          break;
  }
}

(function() {

  var re = /(?:http|https)+(?:\:\/\/youtu.be\/)+(.*)/gi;

  YTPlayer._boundRect = new Rectangle(0, 0, 1, 1);

  //----------------------------------------------------------------------------
  // YTPlayer
  //
  //
  YTPlayer.initialize = function() {
    this._init = false;
    this._status = -1;
    this._ytPlayer = document.createElement('div');
    this._ytPlayer.id = 'ytplayer';
    this._ytPlayer.style.width = '560px';
    this._ytPlayer.style.height = '315px';
    document.body.appendChild(this._ytPlayer);
    this._tag = document.createElement('script');
    this._tag.src = "https://www.youtube.com/iframe_api";
    this.createIframe();
  };

  YTPlayer.createIframe = function () {
    this._iframe = document.createElement('iframe');
    this._iframe.id = 'ytplayer-iframe';
    this._iframe.width = 560;
    this._iframe.height = 315;
    this._iframe.style.opacity = '0';
    this._iframe.style.zIndex = '0';
    this._iframe.frameBorder = 0;
    this._iframe.allowfullscreen = true;
    Graphics._centerElement(this._iframe);
    this._ytPlayer.appendChild(this._iframe);
  };

  YTPlayer.preVideo = function(src) {
    var v;
    if(src) {
      if(re.test(src)) {
          // v = src.split(re)[1];
          v = RegExp.$1;
      } else {
          v = src.replace('https://www.youtube.com/watch?v=','').replace('&feature=youtu.be','');
      }
      this._iframe.src = 'https://www.youtube.com/embed/%1?enablejsapi=1&version=3'.format(v);
    }
    this._iframe.style.opacity = '1';
    this._iframe.style.zIndex = '20000';

    if(!this._init) {
      this._firstScriptTag = document.getElementsByTagName('script')[0];
      this._firstScriptTag.parentNode.insertBefore(this._tag, this._firstScriptTag);
      this._init = true;
    } else {
      window.onYouTubeIframeAPIReady();
    }
  };

  YTPlayer.playVideo = function(src) {
    if(!this._iframe) this.createIframe();
    this.preVideo(src);
    Graphics._canvas.style.opacity = '0.5';
    if($gamePlayer) $gamePlayer.lock();
  };

  YTPlayer.stopVideo = function() {
    if(!this._iframe) this.createIframe();
    this._iframe.style.opacity = '0';
    this._iframe.style.zIndex = '0';
    Graphics._canvas.style.opacity = '1.0';
    this.callPlayer("stopVideo");
    if($gamePlayer) $gamePlayer.unlock();
  };

  YTPlayer.removeAllElement = function() {
    this.stopVideo();
    this._iframe.style.opacity = '0';
    this._iframe.style.zIndex = '0';
  };

  YTPlayer.callPlayer = function(func, args) {
      var frame_id = 'ytplayer-iframe';
      var src = this._iframe.src;
      if (src.indexOf('youtube.com/embed') != -1) {
          this._iframe.contentWindow.postMessage(JSON.stringify({
              'event': 'command',
              'func': func,
              'args': args || [],
              'id': frame_id
          }), "*");
      }
  };

  YTPlayer.isOnPlayer = function() {
    if(!this._iframe) return false;
    if(!this._iframe.contentWindow) return false;
    return true;
  };

  // Checks whether the YoutubePlayer is playing.
  YTPlayer.isPlaying = function() {
    if(this._status === YT.PlayerState.PLAYING) {
      return true;
    }
    return false;
  };

  YTPlayer.isPaused = function() {
    if(this._status === YT.PlayerState.PAUSED) {
      return true;
    }
    return false;
  };

  YTPlayer.isBuffering = function() {
    if(this._status === YT.PlayerState.BUFFERING) {
      return true;
    }
    return false;
  };

  YTPlayer.isEnded = function() {
    if(this._status === YT.PlayerState.ENDED) {
      return true;
    }
    return false;
  };

  YTPlayer.getRect = function() {
    var w, h, gw, gh, x1, x2, y1, y2;
    w = 560 / 2;
    h = 315 / 2;
    gw = (Graphics.boxWidth / 2);
    gh = (Graphics.boxHeight / 2);
    x1 = gw - w;
    x2 = gw + w;
    y1 = gh - h;
    y2 = gh + h;
    this._boundRect.x = x1;
    this._boundRect.y = y1;
    this._boundRect.width = w
    this._boundRect.height = h;
    return this._boundRect;
  };

  YTPlayer.isTouched = function() {
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = this.getRect();
    return rect.contains(x, y);
  };

  //----------------------------------------------------------------------------
  // Graphics
  //
  //
  var alias_Graphics_initialize = Graphics.initialize;
  Graphics.initialize = function(width, height, type) {
    alias_Graphics_initialize.call(this, width, height, type);
    YTPlayer.initialize();
  }

  Graphics.playYoutube = function(src) {
    var lastStep;
    YTPlayer.playVideo(src);
    lastStep = setInterval(function() {
      YTPlayer.callPlayer('playVideo');
      if(YTPlayer.isOnPlayer()) {
          clearInterval(lastStep);
      }
    }, 2000);
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //
  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);
      if(command === "YTPlayer") {
        switch (args[0].toLowerCase()) {
          case 'play':
            var src = args.slice(1, args.length).join('');
            setTimeout(function() {
              Graphics.playYoutube(src);
            }, 1);
            break;
          case 'stop':
            if(YTPlayer.isPlaying()) YTPlayer.stopVideo();
        }
      }
  };

  //----------------------------------------------------------------------------
  // Game_Player
  //
  //
  var alias_Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    alias_Game_Player_initMembers.call(this);
    this._locked = false;
    this._prelockDirection = 2;
  };

  Game_Player.prototype.lock = function() {
    if (!this._locked) {
        this._prelockDirection = this.direction();
        this._locked = true;
    }
  };

  Game_Player.prototype.unlock = function() {
    if (this._locked) {
        this._locked = false;
        this.setDirection(this._prelockDirection);
    }
  };

  var alias_Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    if(this._locked) {
      return false;
    }
    return alias_Game_Player_canMove.call(this);
  };

  // ----------------------------------------------------------------------------
  // Scene_Map
  //
  //
  var alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    alias_Scene_Map_update.call(this);
    this.checkEscapeToYoutube();
  };

  Scene_Map.prototype.checkEscapeToYoutube = function() {
    if(TouchInput.isTriggered()) {
      if(!YTPlayer.isTouched() && (YTPlayer._status > 0) ) {
         YTPlayer.stopVideo();
      }
    }
  };

})();
