/*:
 * @plugindesc RS_LoadingProgressBar
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_LoadingProgressBar = true;

(function () {

  "use strict";

  class ProgressCanvas {

      constructor() {
          this._canvas = document.createElement('canvas');
          this._context = this._canvas.getContext('2d');
          this._rect = [0, 0, 100, 20];
      }

      realValue(value) {
          return value * (Graphics._perForLoading / 100);
      }

      render() {
          const rect = this._rect;
          const context = this._context;
          const x = this.rect[0];
          const y = this.rect[1];
          const w = this.rect[2];
          const h = this.rect[3];
          const w2 = realValue(w);
          context.save();
          context.clearRect(x, y, w, h);
          context.setTransform(w2, 0, 0, 1, 0, 0);
          context.fillStyle = '#ffffff';
          context.rect(x, y, w, h);
          context.fill();
          context.stroke();
          context.restore();
      }
  }

  //============================================================================
  // Utils
  //============================================================================

  Utils.setProgressBar = function (value) {
      if(Utils.isNwjs()) {
          const win = require('nw.gui').Window.get();
          win.setProgressBar(value);
      }
  };

  //============================================================================
  // Graphics
  //============================================================================

  var alias_Graphics_createUpperCanvas = Graphics._createUpperCanvas;
  Graphics._createUpperCanvas = function() {
      alias_Graphics_createUpperCanvas.call(this);
      const self = Graphics;
      self._perForLoading = 0;
  };

  Graphics._setPercentForLoading = function (e) {
      if(e instanceof ProgressEvent) {
          const self = Graphics;
          self._perForLoading = Math.floor((e.loaded / e.total) * 100);
          Utils.setProgressBar(e.loaded / e.total);
      }
  };

  Graphics._setEndedLoading = function (e) {
      if(e instanceof ProgressEvent) {
          const self = Graphics;
          self._setFailedLoading(e);
      }
  };

  Graphics._setFailedLoading = function (e) {
      if(e instanceof ProgressEvent) {
          const self = Graphics;
          self._perForLoading = 0;
          Utils.setProgressBar(0);
      }
  };

  Graphics._getPercentForLoading = function () {
      const self = Graphics;
      return self._perForLoading || Math.randomInt(100);
  };

  //============================================================================
  // XMLHttpRequest
  //============================================================================

  var alias_XMLHttpRequest_send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (obj) {
      alias_XMLHttpRequest_send.call(this);
      const self = this;
      const graphics = Graphics;
      self.addEventListener('progress', graphics._setPercentForLoading, false);
      self.addEventListener('load', graphics._setEndedLoading , false);
      self.addEventListener("error", graphics._setFailedLoading, false);
      self.addEventListener("abort", graphics._setFailedLoading, false);
  };

})();
