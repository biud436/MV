/*:
 * @plugindesc This plugin sets the renderer type is to as canvas mode in ARM Mali-400 GPU (Galaxy S2, Galaxy S3)
 * @help
 * 2018.03.16 (v1.0.0) - First Release.
 */ 
(function() {
  
  // http://www.html5gamedevs.com/topic/25507-phaserwebgl-flickering-on-chrome-for-android-v53/?page=2
  function MaliDetect() {
      var canv = document.createElement('canvas');
      canv.id = "MaliDetect";
      canv.setAttribute("width", "1");
      canv.setAttribute("height", "1");
      document.body.appendChild(canv);

      var canvas = document.getElementById('MaliDetect');
      var gl = canvas.getContext('webgl', { stencil: true });

      if (!gl)
          return false;

      var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
      var renderer;
      if (dbgRenderInfo != null)
          renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
      else return false;
        
      var n = renderer.search("Mali-400");
      document.body.removeChild(canv);
      if (n != -1)
          return true;
      else
          return false;
  };
  
  Graphics._createRenderer = function() {
    PIXI.dontSayHello = true;
    var width = this._width;
    var height = this._height;
    var options = { view: this._canvas};
    if(navigator.userAgent.match(/Android/) && MaliDetect()) {
      // if this line enables, The FPS will be locked at 5 or less :(
      // Object.assign(options, {preserveDrawingBuffer: true, antialias: true});
      this._rendererType = "canvas";
    }
    try {
        switch (this._rendererType) {
        case 'canvas':
            this._renderer = new PIXI.CanvasRenderer(width, height, options);
            break;
        case 'webgl':
            this._renderer = new PIXI.WebGLRenderer(width, height, options);
            break;
        default:
            this._renderer = PIXI.autoDetectRenderer(width, height, options);
            break;
        }

        if(this._renderer && this._renderer.textureGC)
            this._renderer.textureGC.maxIdle = 1;

    } catch (e) {
        this._renderer = null;
    }
};  
  
})();
 
