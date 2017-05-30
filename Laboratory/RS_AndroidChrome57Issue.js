/**
 * @plugindesc Android Double Click Issues
 * @author biud436
 * @help
 * https://developers.google.com/web/updates/2017/01/scrolling-intervention
 */
 
var Imported = Imported || {};
Imported.RS_AndroidChrome57Issue = true;
 
(function() {
  
  if(Utils.isAndroidChrome() && navigator.userAgent.match(/chrome\/(\d+)\.\d+\.\d+\.\d+/i)[1] >= 57) {
    /**
     * @static
     * @method _onTouchStart
     * @param {TouchEvent} event
     * @private
     */
    TouchInput._onTouchStart = function(event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this._screenPressed = true;
                this._pressedTime = 0;
                if (event.touches.length >= 2) {
                    this._onCancel(x, y);
                } else {
                    this._onTrigger(x, y);
                }
                // event.preventDefault();
            }
        }
        // if (window.cordova || window.navigator.standalone) {
          // event.preventDefault();
        // }
    };

    /**
     * @static
     * @method _onTouchStart
     * @param {TouchEvent} event
     * @private
     */
    TouchInput._onTouchEnd = function(event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            this._screenPressed = false;
            this._onRelease(x, y);
            event.preventDefault();
        }
    };
    
  }
  
})();
