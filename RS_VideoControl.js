//================================================================
// RS_VideoControl.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_VideoControl.js
 * @plugindesc This plugin allows you to indicate the play control bar of a video
 * @author biud436
 *
 * @param zIndex
 * @desc range of the z-index is a number between 0 and 2147483647.
 * @default 1000
 * @min 0
 * @max 2147483647
 *
 * @param Show Control Bar
 * @type boolean
 * @desc Set whether shows a control bar on a video
 * @default true
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 *
 * This plugin command shows up the control bar with Html Video Element.
 *    VideoControl show true
 *
 * This plugin command hides the control bar with Html Video Element.
 *    VideoControl show false
 *
 * In the all of html elements, They have a z-depth value. 
 * They have a default z-index, as follows.
 *  Game Canvas           : 1
 *  Video Element         : 2
 *  Loading Element       : 3
 *  Mode Box ELement      : 9
 *  Error Printer Element : 99
 * 
 * this plugin command allows you to change the z-index value for video element.
 * 
 *    VideoControl zIndex 1000
 * 
 * To change Playback Rate value for video, you can use this plugin command.
 * its default value is to 1.0. 
 * the 0.5 value is to slow the playback speeds by 50%,
 * the 2.0 value is the playback speeds up by 2X.
 * 
 *    VideoControl playbackRate 1.0
 * 
 * This plugim command plays the video from any time without playing it from 0.0 seconds.
 * The 'src' is the actual name of the movie file with the missing extension.
 * The 'time' is the value of the time to play.
 *    VideoControl src time
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.07 (v1.0.0) - First Release
 * 2016.10.21 (v1.0.1) - Fixed some funtions (RMMV 1.3.2)
 * 2017.06.10 (v1.0.2) - Fixed the plugin command and the code for RMMV 1.5.0
 * 2019.02.28 (v1.0.3) - Added some plugin commands.
 */
/*:ko
 * @plugindesc 이 플러그인은 기본 동영상 재생 시 컨트롤 바를 같이 띄웁니다.
 * @author biud436
 *
 * @param zIndex
 * @text Z 인덱스
 * @desc z-index는 0이상 2147483647이하의 숫자입니다.
 * @default 1000
 * @min 0
 * @max 2147483647
 *
 * @param Show Control Bar
 * @text 컨트롤바 표시
 * @type boolean
 * @desc 동영상 재생 시 컨트롤 바를 표시할 지 감출 지를 선택하세요.
 * @default true
 *
 * @help
 * =============================================================================
 * 플러그인 명령에 대해
 * =============================================================================
 *
 * 다음 명령은 컨트롤 바를 표시합니다.
 *    VideoControl show true
 *
 * 다음 명령은 컨트롤 바를 감춥니다.
 *    VideoControl show false
 *
 * 다음 명령은 동영상 요소의 Z 인덱스를 수정합니다.
 * 
 * 각 요소의 기본 Z 깊이 값은 다음과 같습니다.
 * 
 *  Game Canvas           : 1 (게임 캔버스)
 *  Video Element         : 2 (동영상)
 *  Loading Element       : 3 (로딩)
 *  Mode Box ELement      : 9 (FPS 등 표시)
 *  Error Printer Element : 99 (오류 표시)
 * 
 *    VideoControl zIndex 1000
 *
 * 동영상 재생 속도를 변경합니다. 
 * 1.0이 기본 재생 속도이며,
 * 2.0은 2배 빠른 속도로 재생되고,
 * 0.5는 50% 느린 속도로 재생됩니다.
 *    VideoControl playbackRate 1.0
 * 
 * 동영상을 0.0초부터 재생하지 않고 임의의 시간부터 재생합니다.
 * src는 확장자가 생략된 동영상 파일의 실제 이름이며,
 * time은 재생 할 시간 값입니다.
 *    VideoControl src time
 * 
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.05.07 (v1.0.0) - First Release
 * 2016.10.21 (v1.0.1) - Fixed some funtions (RMMV 1.3.2)
 * 2017.06.10 (v1.0.2) - Fixed the plugin command and the code for RMMV 1.5.0
 * 2019.02.28 (v1.0.3) - Added some plugin commands.
 */

var Imported = Imported || {};
Imported.RS_VideoControl = true;
var RS = RS || {};
RS.VideoControl = RS.VideoControl || {};

(function($) {

  "use strict";

  var parameters = PluginManager.parameters('RS_VideoControl');
  
  $.Params = $.Params || {};
  $.Params.zIndex = Number(parameters['zIndex'] || 1000);
  $.Params.enabledContol = parameters['Show Control Bar'] === 'true';
  $.Params.playbackRate = 1.0;

  //----------------------------------------------------------------------------
  // Graphics
  //
  //

  Graphics.setVideoCurrentTime = function(value) {
    if (this._video && value > 0) {
      if( ( value + 0.0001 ) < this._video.duration) {
        this._video.currentTime = value;
      }
    }
  };

  Graphics.setVideoPlaybackRate = function(value) {
    if (this._video) {
      if(value < 0) value = 0.0;
      this._video.playbackRate = value;
    }
  };

  Graphics.getVideoDuration = function() {
    if (this._video) {
      return this._video.duration;
    }
    return 0.0;
  };

  var alias_Graphics_updateVideo = Graphics._updateVideo;
  Graphics._updateVideo = function() {
      alias_Graphics_updateVideo.call(this);
      if(this._video) {
        this._video.style.zIndex = $.Params.zIndex;
        this._video.controls = $.Params.enabledContol;
      }
      this.setVideoPlaybackRate($.Params.playbackRate);
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //
  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);
      if(command === "VideoControl") {
        switch (args[0].toLowerCase()) {
          case 'show':
            $.Params.enabledContol = Boolean(args[1] === 'true');
            break;
          case 'zindex':
            $.Params.zIndex = Number(args[1] || 1000);
            break;
          case 'playbackRate':
            $.Params.playbackRate = parseFloat(args[1] || 1.0);
            break;
          case 'play':
            var name = args[1];
            var time = parseFloat(args[2]) || 0.0;
            if (name.length > 0 && !$gameMessage.isBusy()) {
              var ext = this.videoFileExt();
              Graphics.playVideo('movies/' + name + ext);
              if(time > 0.0) {
                Graphics.setVideoCurrentTime(time);
              }
              this.setWaitMode('video');              
            }
            break;
        }
      }
  };

})(RS.VideoControl);
