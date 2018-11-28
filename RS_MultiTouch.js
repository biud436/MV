/*:
 * @plugindesc <RS_MultiTouch>
 * @author biud436
 * @help
 * This plugin is not completed a development yet.
 */

var Imported = Imported || {};
Imported.RS_MultiTouch = true;

var RS = RS || {};
RS.MultiTouch = RS.MultiTouch || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_MultiTouch>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = RS.MultiTouch.Params || {};
    $.Params.MAX_TOUCH = 4;

    function duplicate(x) {
        var _x = x;
        return _x;
    };        

    //=======================================================
    // TouchInput (New)
    //=======================================================    

    TouchInput._initTouch = function() {
        this._eventTouches = [];
        this._touches = [];
        var max = RS.MultiTouch.Params.MAX_TOUCH;
        for(var i = 0; i < max; i++) {
            this._eventTouches[i] = {
                x: 0,
                y: 0,
                phase: 'none',
                touched: false,
                screenPressed: false,
                pressedTime: 0
            };
        }
        this._touches = this._eventTouches.slice(0);
    };    

    TouchInput._updateTouch = function() {
        var max = RS.MultiTouch.Params.MAX_TOUCH;
        for(var i = 0; i < max; i++) {
            this._touches[i].x = duplicate(this._eventTouches[i].x);
            this._touches[i].y = duplicate(this._eventTouches[i].y);
            this._touches[i].phase = duplicate(this._eventTouches[i].phase);
            this._touches[i].touched = duplicate(this._eventTouches[i].touched);
            this._touches[i].screenPressed = duplicate(this._eventTouches[i].screenPressed);
            this._touches[i].pressedTime = duplicate(this._eventTouches[i].pressedTime);
            this._touches[i].started = duplicate(this._eventTouches[i].started);
            this._touches[i].moved = duplicate(this._eventTouches[i].moved);
            this._touches[i].clicked = duplicate(this._eventTouches[i].clicked);
            
            if(this._eventTouches[i].screenPressed) {
                this._eventTouches[i].pressedTime >= 0;
            }
        }        
    };

    /**
     * 업데이트와 렌더링 이후 터치 변수를 클리어 한다.
     */
    TouchInput._clearTouch = function() {
        var max = RS.MultiTouch.Params.MAX_TOUCH;
        for(var i = 0; i < max; i++) {
            this._eventTouches[i].x = 0;
            this._eventTouches[i].y = 0;
            this._eventTouches[i].phase = 'none';
            this._eventTouches[i].touched = false;                
        }        
    };

    var alias_SceneManager_tickEnd = SceneManager.tickEnd;
    SceneManager.tickEnd = function() {
        alias_SceneManager_tickEnd.call(this);
        TouchInput._clearTouch();
    };    

    TouchInput.getTouch = function(index) {
        var max = RS.MultiTouch.Params.MAX_TOUCH;
        if(index > max || index < 0) return;
        return this._touches[index];
    };    

    TouchInput.__touch__isRepeated = function(index) {
        var max = RS.MultiTouch.Params.MAX_TOUCH;
        if(index > max || index < 0) return false;        
        var touch = this._touches[index];
        return (touch.screenPressed &&
                (touch.touched ||
                 (touch.pressedTime >= this.keyRepeatWait &&
                    touch.pressedTime % this.keyRepeatInterval === 0)));
    };
    
    TouchInput.__touch__isLongPressed = function(index) {
        var max = RS.MultiTouch.Params.MAX_TOUCH;
        if(index > max || index < 0) return false;        
        var touch = this._touches[index];
        return touch.screenPressed && touch.pressedTime >= this.keyRepeatWait;
    };    

    TouchInput.__touch__setTouch = function(index, x, y, phase, touched) {
        var max = RS.MultiTouch.Params.MAX_TOUCH;
        if(index > max || index < 0) return;
        this._eventTouches[index].x = x;
        this._eventTouches[index].y = y;
        this._eventTouches[index].phase = phase;
        this._eventTouches[index].touched = touched;
    };

    TouchInput.__touch__touched = function(index, x, y) {
        this.__touch__setTouch(index, x, y, 'touched', true);
        this._eventTouches[index].screenPressed = true;
        this._eventTouches[index].started = true;
    };

    TouchInput.__touch__moved = function(index, x, y) {
        this.__touch__setTouch(index, x, y, 'moved', true);
        if(this._eventTouches[index].started) {
            this._eventTouches[index].moved = true;
        }
    }

    TouchInput.__touch__released = function(index, x, y) {
        this.__touch__setTouch(index, x, y, 'released', false);
        this._eventTouches[index].screenPressed = false;
        if(this._eventTouches[index].started && !this._eventTouches[index].moved) {
            this._eventTouches[index].started = false;
            this._eventTouches[index].moved = false;
        }
    };

    //=======================================================
    // TouchInput (Override)
    //=======================================================        

    var _alias_TouchInput_clear = TouchInput.clear;
    TouchInput.clear = function() {
        _alias_TouchInput_clear.call(this);
        this._initTouch();
    };

    var _alias_TouchInput_update = TouchInput.update;
    TouchInput.update = function() {
        _alias_TouchInput_update.call(this);
        this._updateTouch();
    };      
    
    TouchInput._onTouchStart = function(event) {
        var isValid = false;
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
                isValid = true;             
            }
        }
        if (window.cordova || window.navigator.standalone) {
            isValid = true;
        }
        for (var i = 0; i < event.touches.length; i++) {
            var touch = event.touches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this.__touch__touched(touch.identifier, x, y);
                isValid = true;
            }
        }
        if(isValid) {
            event.preventDefault();
        }
    };

    
    TouchInput._onTouchMove = function(event) {
        var isValid = false;
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            this._onMove(x, y);
            isValid = true;
        }
        for (var i = 0; i < event.touches.length; i++) {
            var touch = event.touches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this.__touch__moved(touch.identifier, x, y);
                isValid = true;
            }
        }        
        if(isValid) {
            event.preventDefault();
        }
    };

    TouchInput._onTouchEnd = function(event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            this._screenPressed = false;
            this._onRelease(x, y);        
        }
        for (var i = 0; i < event.touches.length; i++) {
            var touch = event.touches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this.__touch__released(touch.identifier, x, y);    
            }
        }        
    };        

    //=======================================================
    // RS.MultiTouch
    //=======================================================

    $.isTriggered = function(index) {
        var touch = TouchInput.getTouch(index);
        if(index === 0) {
            return this._triggered;
        } else {
            return touch.touched || touch.started;
        }
    };

    $.isReleased = function(index) {
        var touch = TouchInput.getTouch(index);
        return touch.phase === "released";
    };        

    $.isPressed = function(index) {
        var touch = TouchInput.getTouch(index);
        return touch.touched && touch.screenPressed;
    };    

    $.isRepeated = function(index) {
        return TouchInput.__touch__isRepeated(index);
    };        

    $.isLongPressed = function(index) {
        return TouchInput.__touch__isLongPressed(index);
    };    

    
})(RS.MultiTouch);