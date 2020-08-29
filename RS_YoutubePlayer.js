//================================================================
// RS_YoutubePlayer.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc This plugin allows you to start playback of the YouTube video <RS_YoutubePlayer>
 * @author biud436
 * @url biud436.tistory.com
 *
 * @param Video Quality
 * @desc highres, hd1080, hd720, large, medium, small
 * default : hd720
 * @default hd720
 * @type select
 * @option highres
 * @option hd1080
 * @option hd720
 * @option large
 * @option medium
 * @option small
 *
 * @param Size
 * @type select
 * @desc Specify the size of the default player.
 * @default Normal
 * @option Normal (560 * 315px)
 * @value Normal
 * @option Fullscreen
 * @value Fullscreen
 *
 * @param Looping
 * @type boolean
 * @desc Sets the video to loop or not.
 * @default false
 * @on Loop always
 * @off Playback once
 *
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
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.08 (v1.0.0) - First Release
 * 2016.05.09 (v1.0.1) - Added Error Handler
 * 2016.05.12 (v1.0.2) - Fixed a function that parses a URL.
 * 2016.07.04 (v1.0.3) - Fixed a few logic about the range were converted to Rectangular object.
 * 2016.10.06 (v1.0.4) - Added Canvas Filters.
 * 2016.12.10 (v1.0.5) :
 * - Added a plugin parameter about video quality settings.
 * - Added the ability to play YouTube videos from a specified time.
 * 2017.08.31 (v1.0.6) :
 * - Added a feature that the video size sets up with a fullscreen mode.
 * - Added a feature that can set the video to loop
 * 2018.01.08 (v1.0.7) :
 * - Now that The YouTube iframe will be newly created every times when playing back the video.
 * - Fixed the bug that is not available the function called YTPlayer.isEnded(); 
 * 
 * @command play
 * @desc
 * 
 * @arg src
 * @type string
 * @desc Specify the youtube url
 * @default https://www.youtube.com/watch?v=C4ze-KCSxQY
 * 
 * @command stop
 * @desc 
 */
/*:ko
 * @target MZ
 * @plugindesc 유튜브 플레이어 <RS_YoutubePlayer>
 * @author 러닝은빛(biud436)
 * @url biud436.tistory.com
 *
 * @param Video Quality
 * @desc 비디오 품질(화질)을 설정합니다.
 * default : hd720
 * @default hd720
 * @type select
 * @option highres
 * @option hd1080
 * @option hd720
 * @option large
 * @option medium
 * @option small
 *
 * @param Size
 * @type select
 * @desc 기본 유튜브 플레이어의 크기를 지정합니다.
 * @default Normal
 * @option 보통 (560 * 315px)
 * @value Normal
 * @option 전체 화면
 * @value Fullscreen
 *
 * @param Looping
 * @type boolean
 * @desc 동영상 반복 재생 여부를 지정합니다
 * @default false
 * @on 루프로 설정
 * @off 한 번만 재생
 *
 * @help
 * 안드로이드 '크롬'과 모바일 '사파리'에서는 동영상이 자동으로 재생되지 않습니다.
 * 유튜브 플레이어를 종료하고자 한다면 동영상 영역의 바깥 쪽을 클릭하시거나,
 * 동영상이 끝날 때 까지 기다려주세요.
 *
 * =============================================================================
 * 스크립트 명령
 * =============================================================================
 * 유튜브 동영상을 '스크립트 커맨드'로 재생하려면 다음을 호출하세요.
 * Graphics.playYoutube("https://www.youtube.com/watch?v=C4ze-KCSxQY");
 *
 * 재생 중인 유튜브 동영상의 상태를 유튜브 API로 확인할 수 있습니다.
 * 직접 접근하려면 YTPlayer 전역 객체를 사용하세요.
 *
 * if(YTPlayer.isPlaying()) YTPlayer.stopVideo();
 * YTPlayer.isPaused();
 * YTPlayer.isBuffering();
 * YTPlayer.isEnded();
 *
 * =============================================================================
 * 버전 로그
 * =============================================================================
 * 2016.05.08 (v1.0.0) - First Release
 * 2016.05.09 (v1.0.1) - Added Error Handler
 * 2016.05.12 (v1.0.2) - Fixed a function that parses a URL.
 * 2016.07.04 (v1.0.3) - Fixed a few logic about the range were converted to Rectangular object.
 * 2016.10.06 (v1.0.4) - Added Canvas Filters.
 * 2016.12.10 (v1.0.5) :
 * - Added a plugin parameter about video quality settings.
 * - Added the ability to play YouTube videos from a specified time.
 * 2017.08.31 (v1.0.6) :
 * - Added a feature that the video size sets up with a fullscreen mode.
 * - Added a feature that can set the video to loop
 * 2018.01.08 (v1.0.7) :
 * - Now that The YouTube iframe will be newly created every times when playing back the video.
 * - Fixed the bug that is not available the function called YTPlayer.isEnded();
 * 
 * @command play
 * @desc
 * 
 * @arg src
 * @type string
 * @desc Specify the youtube url
 * @default https://www.youtube.com/watch?v=C4ze-KCSxQY
 * 
 * @command stop
 * @desc 
 */
/*:ja
 * @target MZ
 * @plugindesc ユーチューブプレイヤーです。<RS_YoutubePlayer>
 * @author biud436
 * @url biud436.tistory.com
 *
 * @param Video Quality
 * @desc 動画の品質を設定します。
 * default : hd720
 * @default hd720
 * @type select
 * @option highres
 * @option hd1080
 * @option hd720
 * @option large
 * @option medium
 * @option small
 *
 * @param Size
 * @type select
 * @desc ユーチューブプレーヤーの動画の大きさを指定します。
 * @default Normal
 * @option 普通 (560 * 315px)
 * @value Normal
 * @option フルスクリーンモード
 * @value Fullscreen
 *
 * @param Looping
 * @type boolean
 * @desc 動画反復再生するかどうかを指定してください。
 * @default false
 * @on 繰り返し再生
 * @off 一度再生
 *
 * @help
 * アンドロイドクロムとモバイルのサファリでは、自動で動画が再生されません。
 * ユーチューブプレーヤーを終了するには、動画領域の外側をクリックすればいいです
 * それとも動画が終わるまで待ってください。
 *
 * =============================================================================
 * スクリプトコマンドについて
 * =============================================================================
 * Graphics.playYoutube("YOUTUBE_URL"); // ユーチューブ動画を再生します。
 *
 * 再生中のユーチューブ動画の状態をで確認できます。
 *
 * if(YTPlayer.isPlaying()) YTPlayer.stopVideo();
 * YTPlayer.isPaused();
 * YTPlayer.isBuffering();
 * YTPlayer.isEnded();
 *
 * =============================================================================
 * Version
 * =============================================================================
 * 2016.05.08 (v1.0.0) - First Release
 * 2016.05.09 (v1.0.1) - Added Error Handler
 * 2016.05.12 (v1.0.2) - Fixed a function that parses a URL.
 * 2016.07.04 (v1.0.3) - Fixed a few logic about the range were converted to Rectangular object.
 * 2016.10.06 (v1.0.4) - Added Canvas Filters.
 * 2016.12.10 (v1.0.5) :
 * - Added a plugin parameter about video quality settings.
 * - Added the ability to play YouTube videos from a specified time.
 * 2017.08.31 (v1.0.6) :
 * - Added a feature that the video size sets up with a fullscreen mode.
 * - Added a feature that can set the video to loop
 * 2018.01.08 (v1.0.7) :
 * - Now that The YouTube iframe will be newly created every times when playing back the video.
 * - Fixed the bug that is not available the function called YTPlayer.isEnded();
 * 
 * @command play
 * @desc
 * 
 * @arg src
 * @type string
 * @desc Specify the youtube url
 * @default https://www.youtube.com/watch?v=C4ze-KCSxQY
 * 
 * @command stop
 * @desc 
 */

var Imported = Imported || {};
Imported.RS_YoutubePlayer = true;

var player;
var RS = RS || {};
RS.YoutubePlayer = RS.YoutubePlayer || {};
RS.YoutubePlayer.Params = RS.YoutubePlayer.Params || {};

let onYouTubeIframeAPIReady = null;
let onPlayerReady = null;
let onPlayerError = null;
let onPlayerStateChange = null;

(() => {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_YoutubePlayer>');
  });

  const pluginName = (parameters.length > 0) && parameters[0].name;
  parameters = (parameters.length > 0) && parameters[0].parameters;

  var quality = parameters['Video Quality'] || 'hd720';

  RS.YoutubePlayer.Params.viewSize = parameters['Size'] || 'Normal';
  RS.YoutubePlayer.Params.isLooping = Boolean(parameters['Looping'] === 'true');

  class YTPlayer {

    static initialize() {
      "use strict";
      var tw = window.outerWidth - window.innerWidth;
      var th = window.outerHeight - window.innerHeight;
      var viewMode = RS.YoutubePlayer.Params.viewSize;
      this._init = false;
      this._status = -1;
      this._visibility = true;

      /**
       * @type {HTMLDivElement}
       */
      this._ytPlayer = document.createElement('div');
      this._ytPlayer.id = 'ytplayer';
      this._ytPlayer.style.width = "816px";
      this._ytPlayer.style.height = "624px";
      this._ytPlayer.style.padding = "0";
      this._ytPlayer.style.margin = "0";
      this._ytPlayer.style.overflow = "hidden";
      this._ytPlayer.style.zIndex = "1000";
      this._ytPlayer.style.display = "none";

      Graphics._centerElement(this._ytPlayer);

      this._exitButton = document.createElement("button");
      this._exitButton.id = "ytb-close-button";
      this._exitButton.style.border = "1px solid #ccc";
      this._exitButton.style.borderRadius = "50%";
      this._exitButton.style.backgroundImage = "repeating-radial-gradient(circle, white, white 10%, #ccc 10%, #ccc 20%);";
      this._exitButton.style.padding = "0";
      this._exitButton.style.margin = "0";
      this._exitButton.style.width = "64px";
      this._exitButton.style.height = "64px";
      this._exitButton.style.float = "left";
      this._exitButton.style.cursor = "pointer";
      this._exitButton.style.display = "flex";
      this._exitButton.style.justifyContent = "center";
      this._exitButton.style.alignItems = "center";

      this._exitButton.style.boxSizing = "border-box";

      const p = document.createElement("p");
      p.textContent = "X";
      p.style.fontSize = "1.5em";
      p.style.textAlign = "center";
      p.style.fontWeight = "bold";
      p.style.color = "black";

      const extraStyle = document.createElement('style');
      const css = `
      @keyframes ytb-anime {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      #ytb-close-button:hover, #ytb-close-button:focus{ 
        transform: scale(1.05); 
        transition: .2s ease-in; 
        animation-name: ytb-anime;
        animation-duration: .2s;
        animation-direction: alternate;
        animation-delay: .4s;
        animation-timing-function: ease-in-out;        
      }        
      `;
      extraStyle.appendChild(document.createTextNode(css));

      document.getElementsByTagName('head')[0].appendChild(extraStyle);

      this._exitButton.appendChild(p);
      
      this._exitButton.onclick = () => {
        this.stopVideo();
      };

      this._ytPlayer.appendChild(this._exitButton);

      document.body.appendChild(this._ytPlayer);
      this._tag = document.createElement('script');
      this._tag.src = "https://www.youtube.com/iframe_api";
      this.createIframe();
    }

    static createIframe() {
      if (this._iframe) {
        this._ytPlayer.removeChild(this._iframe);
      }
      var viewMode = RS.YoutubePlayer.Params.viewSize;
      this._iframe = document.createElement('iframe');
      this._iframe.id = 'ytplayer-iframe';
      this._iframe.width = (viewMode === 'Fullscreen') ? Graphics.width : '560px';
      this._iframe.height = (viewMode === 'Fullscreen') ? Graphics.height : '315px';
      this._iframe.style.opacity = '0';
      this._iframe.style.zIndex = '0';
      this._iframe.frameBorder = 0;
      this._iframe.allowfullscreen = true;
      Graphics._centerElement(this._iframe);
      this._ytPlayer.appendChild(this._iframe);
    }

    static preVideo(src) {
      if (src) {
        this._iframe.src = 'https://www.youtube.com/embed/%1?enablejsapi=1&version=3'.format(src);
      }
      this._iframe.style.opacity = '1';
      this._iframe.style.zIndex = '60';
      if (!this._init) {
        this._firstScriptTag = document.getElementsByTagName('script')[0];
        this._firstScriptTag.parentNode.insertBefore(this._tag, this._firstScriptTag);
        this._init = true;
      } else {
        window.onYouTubeIframeAPIReady();
      }
    }

    static playVideo(src) {
      this.createIframe();
      this.preVideo(src);

      if(this._ytPlayer) {
        this._ytPlayer.style.display = "block";
      }

      if (Imported.RS_SimpleCanvasFilter) {
        Graphics.setCanvasFilter('blur', 1.5, false, null);
        Graphics.setCanvasFilter('contrast', 150.0, true, null);
      } else {
        Graphics._canvas.style.opacity = '0.5';
      }
      if ($gamePlayer) $gamePlayer.lock();
    }

    static stopVideo() {
      if (!this._iframe) this.createIframe();
      this._iframe.style.opacity = '0';
      this._iframe.style.zIndex = '0';
      if (Imported.RS_SimpleCanvasFilter) {
        Graphics.setClearCanvasFilter(null);
      } else {
        Graphics._canvas.style.opacity = '1.0';
      }
      if(this._ytPlayer) {
        this._ytPlayer.style.display = "none";
      }      
      this.callPlayer("stopVideo");
      if ($gamePlayer) $gamePlayer.unlock();
    }

    static removeAllElement() {
      this.stopVideo();
    }

    static callPlayer(func, args) {
      if (!this._iframe) return;
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
    }

    static isOnPlayer() {
      if (!this._iframe) return false;
      if (!this._iframe.contentWindow) return false;
      return true;
    }

    // Checks whether the YoutubePlayer is playing.
    static isPlaying() {
      if (this._status === YT.PlayerState.PLAYING) {
        return true;
      }
      return false;
    }

    static isPaused() {
      if (this._status === YT.PlayerState.PAUSED) {
        return true;
      }
      return false;
    }

    static isBuffering() {
      if (this._status === YT.PlayerState.BUFFERING) {
        return true;
      }
      return false;
    }

    static isEnded() {
      if (this._status === YT.PlayerState.ENDED || this._status === YT.PlayerState.CUED) {
        return true;
      }
      return false;
    }

    static getRect() {
      var w, h, gw, gh, x1, x2, y1, y2;
      w = 560 / 2;
      h = 315 / 2;
      gw = (Graphics.width / 2);
      gh = (Graphics.height / 2);
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

    static isTouched() {
      var x = TouchInput.x;
      var y = TouchInput.y;
      var rect = this.getRect();
      return rect.contains(x, y);
    };

    static urlUtils(src) {

      const url = new URL(src);
      const urlParams = {};
      url.search.substring(1)
        .split('&')
        .map(i => i.split('='))
        .forEach((e, i, a) => {
          urlParams[e[0]] = e[1];
        });

      if (src.match(/(?:http|https)+(?:\:\/\/youtu.be\/)+(.*)/gi)) {
        urlParams['v'] = String(RegExp.$1);
      }

      return urlParams;
    }
  }

  YTPlayer._boundRect = new Rectangle(0, 0, 1, 1);

  window.YTPlayer = YTPlayer;

  //----------------------------------------------------------------------------
  // Graphics
  //
  //
  const alias_Graphics_createAllElements = Graphics._createAllElements;
  Graphics._createAllElements = function () {
    alias_Graphics_createAllElements.call(this);
    YTPlayer.initialize();
  }

  Graphics.playYoutube = function (src) {
    var lastStep;
    var params = YTPlayer.urlUtils(src);
    var url = params["v"] || 'BIbpYySZ-2Q';
    var startSecond = Number(params["t"]) || 0;
    YTPlayer.playVideo(url);
    lastStep = setInterval(() => {
      YTPlayer.callPlayer('playVideo');
      YTPlayer.callPlayer('setLoop', [true]);
      YTPlayer.callPlayer('setPlaybackQuality', [quality]);
      YTPlayer.callPlayer('seekTo', [startSecond, true]);
      if (YTPlayer.isOnPlayer()) {
        clearInterval(lastStep);
      }
    }, 2000);
  };

  //----------------------------------------------------------------------------
  // PluginManager
  //
  //
  PluginManager.registerCommand(pluginName, "play", arg => {
    const src = arg.src;
    setTimeout(() => Graphics.playYoutube(src), 20);
    if (SceneManager._scene instanceof Scene_Map) {
      $gameMap._interpreter.setWaitMode('video');
    }
  });

  PluginManager.registerCommand(pluginName, "stop", arg => {
    if (YTPlayer.isPlaying()) YTPlayer.stopVideo();
  });

  //----------------------------------------------------------------------------
  // Game_Player
  //
  //
  const alias_Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function () {
    alias_Game_Player_initMembers.call(this);
    this._locked = false;
    this._prelockDirection = 2;
  };

  Game_Player.prototype.lock = function () {
    if (!this._locked) {
      this._prelockDirection = this.direction();
      this._locked = true;
    }
  };

  Game_Player.prototype.unlock = function () {
    if (this._locked) {
      this._locked = false;
      this.setDirection(this._prelockDirection);
    }
  };

  const alias_Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function () {
    if (this._locked) {
      return false;
    }
    return alias_Game_Player_canMove.call(this);
  };

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  //
  const alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    alias_Scene_Map_update.call(this);
    this.checkEscapeToYoutube();
  };

  Scene_Map.prototype.checkEscapeToYoutube = function () {
    if (TouchInput.isTriggered()) {
      if (!YTPlayer.isTouched() && (YTPlayer._status > 0)) {
        YTPlayer.stopVideo();
      }
    }
  };

  //----------------------------------------------------------------------------
  // Graphics
  //
  //

  const alias_Graphics_isVideoVisible = Graphics._isVideoVisible;
  Graphics._isVideoVisible = function () {
    var youtubePlayer = document.getElementById('ytplayer-iframe');
    return alias_Graphics_isVideoVisible.call(this) || (youtubePlayer && youtubePlayer.style.opacity > 0);
  };

  //----------------------------------------------------------------------------
  // Youtube Event Handler
  //
  //
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('ytplayer-iframe', {
      height: '560',
      width: '315',
      videoId: 'BIbpYySZ-2Q',
      fs: 1,
      autoplay: 1,
      enablejsapi: 1,
      rel: 1,
      showinfo: 0,
      playsinline: 0,
      controls: 0,
      autohide: 1,
      loop: 1,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  }

  window.onPlayerReady = function (event) {
    var target = event.target;
    target.playVideo();
  }

  window.onPlayerError = function (event) {
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

  window.onPlayerStateChange = function (event) {
    switch (event.data) {
      case YT.PlayerState.ENDED: // 종료됨
        console.log('Video has ended.');
        YTPlayer._status = YT.PlayerState.ENDED;
        if (RS.YoutubePlayer.Params.isLooping) {
          YTPlayer.callPlayer('playVideo', []);
          YTPlayer.callPlayer('seekTo', [0, true]);
        } else {
          YTPlayer.removeAllElement();
        }
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

})();
