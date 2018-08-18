/*:
 * RS_VideoControl.js
 * @plugindesc This plugin allows you to indicagte the play control bar of a video
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
 *    :
 *    VideoControl show true
 *
 *    :
 *    VideoControl show false
 *
 *    :
 *    VideoControl zIndex 1000
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.07 (v1.0.0) - First Release
 * 2016.10.21 (v1.0.1) - Fixed some funtions (RMMV 1.3.2)
 * 2017.06.10 (v1.0.2) - Fixed the plugin command and the code for RMMV 1.5.0
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
 * 다음 명령은 동영상의 Z 인덱스를 수정합니다.
 *    VideoControl zIndex 1000
 *
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.05.07 (v1.0.0) - First Release
 * 2016.10.21 (v1.0.1) - Fixed some funtions (RMMV 1.3.2)
 * 2017.06.10 (v1.0.2) - Fixed the plugin command and the code for RMMV 1.5.0
 */

var Imported = Imported || {};
Imported.RS_VideoControl = true;
var RS = RS || {};
RS.VideoControl = RS.VideoControl || {};

(function() {

  var parameters = PluginManager.parameters('RS_VideoControl');
  RS.VideoControl.zIndex = Number(parameters['zIndex'] || 1000);
  RS.VideoControl.enabledContol = parameters['Show Control Bar'] === 'true';

  //----------------------------------------------------------------------------
  // Graphics
  //
  //

  var alias_Graphics_updateVideo = Graphics._updateVideo;
  Graphics._updateVideo = function() {
      alias_Graphics_updateVideo.call(this);
      this._video.style.zIndex = RS.VideoControl.zIndex;
      this._video.controls = RS.VideoControl.enabledContol;
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
            RS.VideoControl.enabledContol = Boolean(args[1] === 'true');
            break;
          case 'zindex':
            RS.VideoControl.zIndex = Number(args[1] || 1000);
            break;
        }
      }
  };

})();
