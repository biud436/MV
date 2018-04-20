/*:
 * RS_ExitDialog.js
 * @plugindesc This plugin allows you to show up the exit dialog on Android.
 * @author biud436
 *
 * @param Dialog Name
 * @desc Sets up the title of the dialog
 * @default Information Dialog
 *
 * @param Show Custom Dialog Name
 * @desc Sets up whether show as the title of the dialog you specify yourself
 * @default false
 *
 * @param Exit Message
 * @desc Sets up the message to be displayed on the dialog.
 * @default Are you sure you want to quit the game?
 *
 * @param OK Button
 * @desc OK Button's Name
 * @default OK
 *
 * @param Cancel Button
 * @desc Cancel Button's Name
 * @default Cancel
 *
 * @help
 * =============================================================================
 * Installation
 * =============================================================================
 * You will need to have installed the 'cordova-plugin-dialogs' plugin in Cordova CLI.
 *
 * 1. Create a cordova application
 * In case of using a cordova-cli, Before you start build your mobile application,
 * you need to attempt as below.

 * if your cordova version is to 7 or more, you can easily add the plugin by
 * calling as below command:
 *
 *    cordova plugin add cordova-plugin-dialogs
 *
 * =============================================================================
 * How to change a default behavior
 * =============================================================================
 * Scene_Map.prototype.onExit = function () {
 *   // your code add here.
 * };
 * Scene_Battle.prototype.onExit = function () {
 *   // your code add here.
 * };
 * =============================================================================
 * Change Log
 * =============================================================================
  * 2015.12.26 (v1.0.0) - First Release.
  * 2016.04.07 (v1.0.1) - Added plugin parameters.
  * 2016.05.29 (v1.0.2) - The incorrect character fixed.
  * 2016.12.19 (v1.0.3) - Removed a functionality that shows up the dialog only in the title scene.
  * 2017.01.13 (v1.0.4) - Fixed a bug that causing when pressing a back button several times.
 */
 /*:ko
  * RS_ExitDialog.js
  * @plugindesc 안드로이드 디바이스에서 종료 메시지 창을 띄울 수 있습니다.
  * @author 러닝은빛
  *
  * @param Dialog Name
  * @text 창 제목
  * @desc 종료 창 제목을 수정합니다.
  * @default 종료하시겠습니까?
  *
  * @param Show Custom Dialog Name
  * @text 창 제목 표시 여부
  * @type boolean
  * @desc 수정된 커스텀 창 제목으로 표시할지 여부를 설정합니다.
  * 설정하지 않으면 자동으로 게임 명으로 설정됩니다.
  * @default false
  * @on 표시
  * @off 표시 안함
  *
  * @param Exit Message
  * @text 종료 메시지 (문자열)
  * @desc 창에 표시되는 메시지를 수정합니다.
  * @default 게임을 종료하시겠습니까?
  *
  * @param OK Button
  * @text 예 버튼
  * @desc 예 버튼 명
  * @default 예
  *
  * @param Cancel Button
  * @text 취소 버튼
  * @desc 취소 버튼 명
  * @default 취소
  *
  * @help
  * =============================================================================
  * 플러그인 동작 환경
  * =============================================================================
  * 안드로이드 킷캣(4.4.4)을 기준으로 테스트 되었습니다.
  *
  * 또한 이 플러그인은 코르도바로 패키징된 앱에서만 동작하므로, 사용 전에 반드시 코르도바
  * 프로젝트를 새로 생성하시기 바랍니다. 어떻게 하는 지 모르겠다는 분들은 아래 글을
  * 참고해주세요.
  *
  * 링크 (네이버 블로그) - http://biud436.blog.me/220521625455
  *
  * 윈도우즈 10을 기준으로 명령 프롬프트를 열고, 다음 명령을 실행합니다. 코르도바 최신
  * 버전이라면 아래 명령이 잘 동작할 것입니다.
  *
  *    cordova plugin add cordova-plugin-dialogs
  *
  * =============================================================================
  * 취소 버튼의 기본 동작 변경하기
  * =============================================================================
  * 계층적 구조로 되어있는 씬 클래스는 뒤로 가기 버튼을 눌렀을 때 onExit 이벤트를 받아,
  * 종료 대화 상자를 기본적으로 띄우게 되어있습니다. 하지만 자바스크립트에 대해서 잘
  * 아신다면 이 기본 동작을 오버라이딩하여 재정의하여 씬 별로 다른 동작 구현이 가능
  * 합니다.
  *
  * Scene_Map.prototype.onExit = function () {
  *   // your code add here.
  * };
  * Scene_Battle.prototype.onExit = function () {
  *   // your code add here.
  * };
  *
  * 정의하지 않으면 '예' 버튼을 눌렀을 때 게임이 종료 됩니다.
  *
  * =============================================================================
  * 변경 사항
  * =============================================================================
  * 2015.12.26 (v1.0.0) - First Release.
  * 2016.04.07 (v1.0.1) - Added plugin parameters.
  * 2016.05.29 (v1.0.2) - The incorrect character fixed.
  * 2016.12.19 (v1.0.3) - Removed a functionality that shows up the dialog only in the title scene.
  * 2017.01.13 (v1.0.4) - Fixed a bug that causing when pressing a back button several times.
  */


var Imported = Imported || {};
Imported.RS_ExitDialog = true;

var RS = RS || {};
RS.ExitDialog = RS.ExitDialog || {};

(function($) {

  var parameters = PluginManager.parameters('RS_ExitDialog');

  $.Params = {

    'message': parameters['Exit Message'] || "Are you sure you want to quit the game?" ,
    'title': parameters['Dialog Name'] || "Information Dialog",

    // Button
    'okBtn': parameters['OK Button'] || "OK" ,
    'cancelBtn': parameters['Cancel Button'] || "Cancel" ,

    // Check properties
    'isCustomTitleName': Boolean(parameters['Show Custom Dialog Name'] === 'true')

  };

  //============================================================================
  // bind cordova
  //============================================================================

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
      document.removeEventListener("backbutton", function(){}, false);
      document.addEventListener("backbutton", SceneManager.onExit, false);
  }

  SceneManager.onExit = function() {
      if(SceneManager._scene.onExit) SceneManager._scene.onExit();
  };

  Scene_Base.prototype.onExit = function (e) {
      var title = $dataSystem.gameTitle || document.title;
      var okButtonId = 1;
      if(e && e.preventDefault) e.preventDefault();
      if(!$.Params.isCustomTitleName) title = $.Params.title;
      // The index number starts from 1 (1,2,3...)
      navigator.notification.confirm($.Params.message, function(idx) {
          if(idx === okButtonId) {
              SceneManager.exit();
          }
      }, title, [$.Params.okBtn, $.Params.cancelBtn]);
  };

  //============================================================================
  // Additional Code
  //============================================================================

  // Scene_Map.prototype.onExit = function () {
  //   // your code add here.
  // };
  //
  // Scene_Battle.prototype.onExit = function () {
  //   // your code add here.
  // };

})(RS.ExitDialog);
