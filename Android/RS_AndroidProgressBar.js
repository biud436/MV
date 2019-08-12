//================================================================
// RS_AndroidProgressBar.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:ko
 * RS_AndroidProgressBar.js
 * @plugindesc 로딩 중에 네이티브 프로그레스 다이얼로그를 띄웁니다.
 * @author 러닝은빛
 *
 * @help
 * =============================================================================
 * 플러그인 동작 환경
 * =============================================================================
 * 안드로이드 킷캣(4.4.4)을 기준으로 테스트 되었습니다.
 *
 * 또한, 이 플러그인은 코르도바로 패키징된 앱에서만 동작하므로, 사용 전에 반드시 코르도바
 * 프로젝트를 새로 생성하시기 바랍니다. 어떻게 하는 지 모르겠다는 분들은 아래 글을
 * 참고해주세요.
 *
 * 링크 (네이버 블로그) - http://biud436.blog.me/220521625455
 *
 * 플러그인은 아래 명령으로 추가하시기 바랍니다.
 *
 * cordova plugin add cordova-plugin-pdialog
 *
 * 참고로 코르도바 플러그인에 의존하고 있기 때문에 언젠가 동작하지 않을 수 있습니다.
 *
 * ============================================================================
 * 변경 사항
 * ============================================================================
 * 2016.04.14 (v1.0.0) - First Release
 * 2016.12.25 (v1.0.1) - 이벤트 리스너 추가
 */
/*:
 * RS_AndroidProgressBar.js
 * @plugindesc This plugin displays the progress dialog, on Android phone.
 * @author biud436
 *
 * @help
 * You need to use a cordova plugin as follows on Android device
 * https://github.com/pwlin/cordova-plugin-pdialog
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2016.04.14 (v1.0.0) - First Release
 * 2016.12.25 (v1.0.1) - Added an event listener.
 */

var RS = RS || {};
var Imported = Imported || {};
Imported.RS_AndroidProgressBar = true;
RS.AndroidProgressBar = RS.AndroidProgressBar || {};

(function($) {

  $.Params = $.Params || {};
  $.Params.isAndroid = navigator.userAgent.match(/Android/i);
  $.Params.isModule = !!cordova;
  $.Params.initNotify = null;
  $.Params.updateNotify = null;
  $.Params.endedNotify = null;
  $.Params.value = 0;

  document.addEventListener("deviceready", onDeviceReady, false);

  $.initEvent = function (msg) {
      var evt =  document.createEvent('Event');
      evt.initEvent(msg, true, true);
      return evt;
  };

  $.notifyEvent = function (e) {
      var elm = document.body;
      elm.dispatchEvent(e);
  };

  $.initProgress = function (title, msg) {
      title = title || 'Please Wait...';
      msg = msg || 'Connecting to server...'
      cordova.plugin.pDialog.init({progressStyle : 'SPINNER', title: title, message : msg})
      .setProgress(0);
  };

  $.updateProgress = function (value) {
      cordova.plugin.pDialog.setProgress(value);
      if(value >= 100) {
        $.Params.value = 0;
      } else {
        $.notifyEvent($.Params.updateNotify);
      }
  };

  $.dismissProgress = function () {
      cordova.plugin.pDialog.dismiss();
  };

  function onDeviceReady() {

      if(!$.Params.isAndroid()) return;
      $.Params.initNotify = $.initEvent('rs.progress.init');
      $.Params.updateNotify = $.initEvent('rs.progress.update');
      $.Params.endedNotify = $.initEvent('rs.progress.end');

      $.initLoading = function () {
          $.initProgress('Loading', 'Now Loading');
      };

      $.updateLoading = function () {
          $.updateProgress($.Params.value++);
      };

      $.endLoading = function () {
          $.dismissProgress();
      };

      var alias_Graphics_startLoading = Graphics.startLoading;
      Graphics.startLoading = function () {
          alias_Graphics_startLoading.call(this);
          document.body.addEventListener('rs.progress.init', $.initLoading);
          document.body.addEventListener('rs.progress.update', $.updateLoading);
          document.body.addEventListener('rs.progress.end', $.endLoading);
      };

      var alias_Graphics_updateLoading = Graphics.updateLoading;
      Graphics.updateLoading = function() {
          alias_Graphics_updateLoading.call(this);
          $.notifyEvent($.Params.updateNotify);
      };

      var alias_Graphics_endLoading = Graphics.endLoading;
      Graphics.endLoading = function() {
          alias_Graphics_endLoading.call(this);
          $.notifyEvent($.Params.endedNotify);
          document.body.removeEventListener('rs.progress.init', $.initLoading);
          document.body.removeEventListener('rs.progress.update', $.updateLoading);
          document.body.removeEventListener('rs.progress.end', $.endLoading);
      };

  };

})(RS.AndroidProgressBar);
