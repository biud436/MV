/*:
 * RS_SetRendererOption.js
 * @plugindesc Modifying the Context creation parameters of the WebGL.
 * @author biud436
 *
 * @param transparent
 * @type boolean
 * @desc If the value is false, no alpha buffer is available.
 * @default false
 *
 * @param antialias
 * @type boolean
 * @desc If the value is false or the implementation does not support antialiasing, no antialiasing is performed.
 * @default false
 *
 * @param preserveDrawingBuffer
 * @type boolean
 * @desc See the help
 * @default false
 *
 * @help
 *
 * preserveDrawingBuffer : If the value is true the buffers will not be cleared
 * and will preserve their values until cleared or overwritten by the author.
 *
 * Graphics._getShaderVersion();
 * Graphics._getRenderer();
 * Graphics._getWebGLVersion();
 * Graphics._getWebGLVendor();
 * Graphics._getViewport();
 */

var Imported = Imported || {};
Imported.RS_SetRendererOption = true;

(function () {

  var parameters = PluginManager.parameters('RS_SetRendererOption');
  var bTransparent = Boolean(parameters['transparent'] === true);
  var bAntialias = Boolean(parameters['antialias'] === true);
  var bPreserveDrawingBuffer = Boolean(parameters['preserveDrawingBuffer'] === true);

  Graphics._getShaderVersion = function() {
    if(!this.isWebGL()) return false;
    var gl = Graphics._renderer.gl;
    return gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
  };

  // Returns the name of the renderer.
  Graphics._getRenderer = function() {
    if(!this.isWebGL()) return false;
    var gl = Graphics._renderer.gl;
    return gl.getParameter(gl.RENDERER);
  };

  Graphics._getWebGLVersion = function() {
    if(!this.isWebGL()) return false;
    var gl = Graphics._renderer.gl;
    return gl.getParameter(gl.VERSION);
  };

  // Returns the company responsible for this WebGL implementation.
  Graphics._getWebGLVendor = function() {
    if(!this.isWebGL()) return false;
    var gl = Graphics._renderer.gl;
    return gl.getParameter(gl.VENDOR);
  };

  Graphics._getViewport = function() {
    if(!this.isWebGL()) return false;
    var gl = Graphics._renderer.gl;
    return gl.getParameter(gl.VIEWPORT);
  }

})();
