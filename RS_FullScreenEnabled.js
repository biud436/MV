/*:
 * RS_FullScreenEnabled.js
 * @plugindesc full-screen-enabled (browser)
 * @author biud436
 */

var Imported = Imported || {};
var RS = RS || {};
Imported.RS_FullScreenEnabled = true;
RS.gFullScreen = RS.gFullScreen || false;

(function() {

  var alias_TouchInput_onMouseDown = TouchInput._onMouseDown;
  TouchInput._onMouseDown = function(event) {
      if (event.button >= 0 && !RS.gFullScreen) {

        // 전체 화면 권한 획득
        window.addEventListener('permissionrequest', function(e) {
          if (e.permission === 'fullscreen') {
            e.request.allow();
          }
        });
        // 전체 화면
        var el = document.querySelector('canvas'),
            rfs = el.requestFullScreen ||
            el.webkitRequestFullScreen ||
            el.mozRequestFullScreen;
        rfs.call(el);
        RS.gFullScreen = true;
      }
      alias_TouchInput_onMouseDown.call(this, event);
  };

})();
