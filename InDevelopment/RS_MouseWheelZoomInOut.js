//==============================================================================
// RS_MouseWheelZoomInOut.js (PC only)
//==============================================================================

var Imported = Imported || {};
Imported.RS_MouseWheelZoomInOut = '1.0.0';

/*:
 * @plugindesc This plugin allows you to zoom in or zoom out in the current map via mouse wheel button.
 * @author biud436
 */

(function () {

  var timing = Date.now();

  var originTilemapWidth = 100;
  var originTilemapHeight = 100;

  // ms
  var refreshTime = 1500;

  var minZoom = 0.1;
  var zoomSpeed = 10.0;

  var alias_TouchInput_clear = TouchInput.clear;
  TouchInput.clear = function() {
    alias_TouchInput_clear.call(this);
    this._wheelDelta = 0;
  };

  var alias_TouchInput_onWheel = TouchInput._onWheel;
  TouchInput._onWheel = function(event) {
    alias_TouchInput_onWheel.call(this, event);
    TouchInput.GetWheelDelta(event);
  };

  TouchInput.GetWheelDelta = function (e) {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    this._wheelDelta = delta;
    if($gameMap) $gameMap.updateWheelDelta();
    event.preventDefault();
  };

  TouchInput.isCheckingTime = function (sec) {
    var rel = (Date.now() - timing) >= sec;
    timing = Date.now();
    return rel;
  };

  Object.defineProperty(TouchInput, 'wheelDelta', {
      get: function() {
          return this._wheelDelta;
      },
      configurable: true
  });

  Game_Map.prototype.updateWheelDelta = function() {
    var value = TouchInput.wheelDelta;
    var scale = $gameScreen.zoomScale();
    var zoom = 1.0 - (Math.abs(value) / zoomSpeed);
    if(value < 0) {
      zoom *= zoom;
      zoom *= scale;
    } else {
      scale /= zoom;
      zoom = scale;
    }
    if(scale < minZoom) {
      zoom = minZoom;
    } else {
      zoom = zoom;
    }
    $gameScreen.setZoom($gamePlayer.screenX(), $gamePlayer.screenY(), zoom);
    var scene = SceneManager._scene;
    if(scene instanceof Scene_Map) {
       var spriteset = scene._spriteset;
       var tilemap = spriteset._tilemap;
       var w = tilemap.width;
       var h = tilemap.height;
       var ww = Graphics.boxWidth / 2;
       var hh = Graphics.boxHeight / 2;
       var margin = tilemap._margin;
       var rw = w + Math.round(w * zoom) + (margin * 2) + ww * zoom;
       var rh = h + Math.round(h * zoom) + (margin * 2) + hh * zoom;
       if(scale > 1.0) {
         if(originTilemapWidth !== w || originTilemapHeight !== h) {
           if(TouchInput.isCheckingTime(refreshTime)) {
             // Regenerate tilemap
             tilemap._margin = rw;
             tilemap.width = originTilemapWidth;
             tilemap.height = originTilemapHeight;
           }
         }
       } else {
         if( value < 0 ) {
           if(TouchInput.isCheckingTime(refreshTime)) {
             // Regenerate tilemap
             tilemap._margin = rw;
             tilemap.width = rw;
             tilemap.height = rh;
           }
         } else {
          // Empty
         }
       }
    }
  };

  //============================================================================
  // Spriteset_Map
  //
  //

  var alias_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
  Spriteset_Map.prototype.createTilemap = function() {
    alias_Spriteset_Map_createTilemap.call(this);
    originTilemapWidth = this._tilemap.width;
    originTilemapHeight = this._tilemap.height;
  };

})();
