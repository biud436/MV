//==============================================================================
// RS_MouseWheelZoomInOut.js (PC only)
//==============================================================================

var Imported = Imported || {};
Imported.RS_MouseWheelZoomInOut = '1.0.0';

/*:
 * @plugindesc This plugin allows you to zoom in or zoom out in the current map via mouse wheel button.
 * @author biud436
 *
 */

(function () {

  "use strict";

  let timing = performance.now();

  let originTilemapWidth = 60;
  let originTilemapHeight = 50;

  // ms
  let refreshTime = 600;

  let minZoom = 0.1;
  let zoomSpeed = 10.0;

  //============================================================================
  // TouchInput
  //============================================================================

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

      let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      this._wheelDelta = delta;

      if($gameMap) $gameMap.updateWheelDelta();

      event.preventDefault();

  };

  TouchInput.isCheckingTime = function (sec) {
      let rel = (performance.now() - timing) >= sec;
      timing = performance.now();

      return rel;

  };

  Object.defineProperty(TouchInput, 'wheelDelta', {
      get: function() {
          return this._wheelDelta;
      },
      configurable: true
  });

  //============================================================================
  // Game_Map
  //============================================================================

  Game_Map.prototype.updateWheelDelta = function() {

      let scene = SceneManager._scene;
      if(!(scene instanceof Scene_Map)) return false;
      let spriteset = scene._spriteset;

      let tilemap = spriteset._tilemap;

      let value = TouchInput.wheelDelta;

      let scale = $gameScreen.zoomScale();
      let zoom = 1.0 - (Math.abs(value) / zoomSpeed);

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

      let w = tilemap.width;
      let h = tilemap.height;
      let ww = Graphics.boxWidth / 2;
      let hh = Graphics.boxHeight / 2;
      let margin = tilemap._margin;

      let sx = $gameMap.displayX() * zoom + (margin * 2);
      let sy = $gameMap.displayY() * zoom + (margin * 2);
      $gameScreen.setZoom(sx, sy, zoom);

      let rw = w + Math.ceil(w * zoom) + (margin * 2) + ww * zoom;
      let rh = h + Math.ceil(h * zoom) + (margin * 2) + hh * zoom;
      let m = rw;

      if(scale > 1.0) {

          if(originTilemapWidth !== w || originTilemapHeight !== h) {

              if(TouchInput.isCheckingTime(refreshTime)) {
                tilemap._margin = 20 + (20 * zoom);
                tilemap.width = w + (zoom * w) + 20 + (20 * zoom) * 2;
                tilemap.height = h + (zoom * h) + 20 + (20 * zoom) * 2;
              }

          }

      } else {

         if( value < 0 ) {

             if(TouchInput.isCheckingTime(refreshTime)) {

                 // Regenerate tilemap
                 tilemap._margin = 20 + (20 * zoom);
                 tilemap.width = w + (zoom * w) + 20 + (20 * zoom) * 2;
                 tilemap.height = h + (zoom * h) + 20 + (20 * zoom) * 2;

                 tilemap.refresh();

             }
         } else {
          // Empty
         }
      }
  };

  Game_Map.prototype.canvasToMapX = function(x) {
      var tileWidth = this.tileWidth();
      var originX = this._displayX * tileWidth;
      var mapX = Math.floor((originX + x) / tileWidth);
      return this.roundX(mapX);
  };

  Game_Map.prototype.canvasToMapY = function(y) {
      var tileHeight = this.tileHeight();
      var originY = this._displayY * tileHeight;
      var mapY = Math.floor((originY + y) / tileHeight);
      return this.roundY(mapY);
  };

  //============================================================================
  // Spriteset_Map
  //============================================================================

  var alias_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
  Spriteset_Map.prototype.createTilemap = function() {
      alias_Spriteset_Map_createTilemap.call(this);
      originTilemapWidth = this._tilemap.width;
      originTilemapHeight = this._tilemap.height;
  };

})();
