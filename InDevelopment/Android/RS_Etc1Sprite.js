//============================================================================
// RS_Etc1Sprite.js
//============================================================================

var Imported = Imported || {};
Imported.RS_Etc1Sprite = true;

/*:
 * @plugindesc <RS_Etc1Sprite>
 * @author biud436
 * @help
 *
 */

//============================================================================
// Etc1AlphaFilter
//============================================================================

function Etc1AlphaFilter() {
  var vertexSrc = [
    '#define GLSLIFY 1',

    'attribute vec2 aVertexPosition;',
    'attribute vec2 aTextureCoord;',
    'attribute vec4 aColor;',

    'uniform mat3 projectionMatrix;',

    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',

    'void main(void){',
    '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
    '    vTextureCoord = aTextureCoord;',
    '}'
  ].join('\n');

  var fragmentSrc = [
    '#define GLSLIFY 1',

    'precision mediump float;',

    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',

    'uniform sampler2D uSampler;',
    'uniform sampler2D uAlphaSampler;',

    'void main(void) {',
    '    vec4 texColor = texture2D(uSampler, vCoord);',
    '    vec4 retColor = vec4(texColor.rgb, texture2D(uAlphaSampler, vCoord).r);',
    '    retColor.rgb *= retColor.a;',
    '    gl_FragColor = texColor * vColor;',
    '}'
   ].join('\n');

  PIXI.Filter.call( this, vertexSrc, fragmentSrc );

};

Etc1AlphaFilter.prototype = Object.create(PIXI.Filter.prototype);
Etc1AlphaFilter.prototype.constructor = Etc1AlphaFilter;

Etc1AlphaFilter.prototype.setAlphaTexture = function(texture) {
  this.uniforms.uAlphaSampler = texture;
};

//============================================================================
// AlphaSprite
//============================================================================

function AlphaSprite() {
  this.initialize.apply(this, arguments);
};

AlphaSprite.prototype = Object.create(PIXI.Sprite.prototype);
AlphaSprite.prototype.constructor = AlphaSprite;

AlphaSprite.prototype.initialize = function(texture, alphaTexture) {
  PIXI.Sprite.call(this, texture);
  if(Graphics.isWebGL() && this.isEtc1() && Utils.isAndroidChrome()) {
    var isChr = /Chrome\/(.{11,})(?=\s)/i.test(navigator.userAgent);
    if(isChr && parseInt(RegExp.$1.substr(0, 2) > 50) {
      this._etc1Filter = new Etc1AlphaFilter();
      this._etc1Filter.setAlphaTexture(alphaTexture);
      this.filters = [this._etc1Filter];
    }
  }
};

AlphaSprite.prototype.isEtc1 = function() {
  var gl = Graphics._renderer.gl;
  var ext = gl.getExtension('WEBGL_compressed_texture_etc1');
  return !!ext.COMPRESSED_RGB_ETC1_WEBGL;
};

//============================================================================
// AlphaSpriteFactory
//============================================================================

function AlphaSpriteFactory() {
  this.initialize.apply(this, arguments);
};

AlphaSpriteFactory.prototype.constructor = AlphaSpriteFactory;

AlphaSpriteFactory.prototype.initialize = function (atlasName, jsonPath) {
  var renderer = Graphics._renderer;
  this._loader = new PIXI.loaders.Loader();
  this._atlasName = atlasName;
  this._jsonPath = jsonPath;
  this._children = {};
  this._atlasOptions = { metadata: { choice: [".json"] } };
  if(Utils.isAndroidChrome()) {
    this._atlasOptions = { metadata: { choice: [".json"], imagemetadata: { choice: [".etc1"]} } };
    loader.before(PIXI.compressedTextures.extensionChooser(PIXI.compressedTextures.detectExtensions(renderer)));
  }
};

AlphaSpriteFactory.prototype.destroyTexture = function (name) {
  if(self._children[name]) {
    // deletes the texture to texture cache, in pixi
    self._children[name].destory({'destroyBase': true});
  }
};

AlphaSpriteFactory.prototype.loadTexture = function (name) {
  var self = this;
  this._loader.add(this._atlasName, this._jsonPath, this._atlasOptions).load(function (loader, resources) {
    self._children[name] = PIXI.Texture.fromImage(name);
  });
};

AlphaSpriteFactory.prototype.getTexture = function (name) {
  var self = this;
  var texture = this._children[name];
  if(texture instanceof PIXI.Texture) {
    return texture;
  }
};
