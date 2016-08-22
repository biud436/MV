/*:
 * RS_SetRendererType.js
 * @plugindesc This plugin sets WebGL preferentially.
 * @author biud436
 */
 
 /*:ko
  * RS_SetRendererType.js
  * @plugindesc 모바일에서 WebGL 모드를 기본으로 시작하게 만드는 플러그인입니다.
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
