/*:
 * RS_SetRendererType.js
 * @plugindesc This plugin sets WebGL preferentially.
 * @author biud436
 */

(function() {
  SceneManager.preferableRendererType = function() {
      if (Utils.isOptionValid('canvas')) {
          return 'canvas';
      } else if (Utils.isOptionValid('webgl') || Graphics.hasWebGL()) {
          return 'webgl';
      } else if (this.shouldUseCanvasRenderer()) {
          return 'canvas';
      } else {
          return 'auto';
      }
  };
})();
