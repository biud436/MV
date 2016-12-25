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
