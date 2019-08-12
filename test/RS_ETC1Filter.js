/*:
 * @plugindesc <RS_ETC1Filter>
 * @author biud436
 * @help
 * 
 */

var RS = RS || {};
var Imported = Imported || {};
Imported.RS_ETC1Filter = true;
RS.ETC1Filter = RS.ETC1Filter || {};

(function() {

    var parameters = $plugins.filter(function(i) {
        return i.description.contains("<RS_ETC1Filter>");
    });

    if(!Utils.RPGMAKER_VERSION || (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION < "1.3.5") ) {
        console.warn("This plugin needs to be used for RPG Maker MV v1.3.5 or higher.");
        return;
    }

    if(!Graphics.isWebGL()) {
        console.warn("This plugin needs to be used a WebGL. Cannot supported in the canvas mode.");
        return;
    }

    PIXI.ETC1Filter = function(sprite)
    {
        var vertexSrc = PIXI.Filter.defaultVertexSrc.slice(0);
        var maskMatrix = new PIXI.Matrix();

        sprite.renderable = false;

        var fragmentSrc = [
        'varying vec2 vFilterCoord;',
        'varying vec2 vTextureCoord;'
        ,
        'uniform sampler2D uSampler;',
        'uniform sampler2D uAlphaTexture;',

        'void main(void)',
        '{',
        '   vec4 alpha = texture2D(uAlphaTexture, vFilterCoord);',
        '   vec4 texColor = vec4(texture2D(uSampler, vTextureCoord).rgb, alpha.r);',
        '   texColor.rgb *= texColor.a;',
        '   gl_FragColor = texColor;',
        '}        '
        ].join('\n');

        PIXI.Filter.call( this, vertexSrc, fragmentSrc );

        this.maskSprite = sprite;
        this.maskMatrix = maskMatrix;

        this.uniforms.uAlphaTexture = sprite._texture;
        this.uniforms.filterMatrix = maskMatrix;

    };

    PIXI.ETC1Filter.prototype = Object.create( PIXI.Filter.prototype );
    PIXI.ETC1Filter.prototype.constructor = PIXI.ETC1Filter;

    PIXI.ETC1Filter.prototype.apply = function(filterManager, input, output, clear)
    {
      this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite);

      // draw the filter...
      filterManager.applyFilter(this, input, output, clear);
    }

    PIXI.ETC1Filter.prototype.getAlphaTexture = function() {
        return this.uniforms.uAlphaTexture;
    }

    PIXI.ETC1Filter.prototype.setAlphaTexture = function(texture) {
        this.uniforms.uAlphaTexture = texture;
    }

    function test() {
        var scene, rgbTexture, alphaSprite, sprite, filter;

        scene = SceneManager._scene;
        rgbTexture = ImageManager.loadPicture('Actor1');
        sprite = new Sprite(rgbTexture);

        // 씬에 추가
        SceneManager._scene.addChild(sprite);

        // 알파 스프라이트 생성
        alphaSprite = new Sprite(ImageManager.loadPicture('Actor1-alpha'));
        sprite.addChild(alphaSprite);

        // 필터 생성
        filter = new PIXI.ETC1Filter(alphaSprite);

        // 필터 설정
        sprite.filters = [filter];

    };

    function getImgPath() {
      var path;

      if(Utils.isNwjs()) {
        path = StorageManager.localFileDirectoryPath();
        path = path.replace("save", "img");
      } else {
        path = window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/")) + "/img/";
      }

      return path;

    };

    function test2(name) {
      "use strict";
      var scene, alphaSprite, sprite, filter, path;

      scene = SceneManager._scene;
      path = getImgPath();
            
      sprite = PIXI.Sprite.fromImage(path + `pictures/${name}.jpg`);

      // 씬에 추가
      SceneManager._scene.addChild(sprite);

      // 알파 스프라이트 생성
      alphaSprite = PIXI.Sprite.fromImage(path + `pictures/${name}_alpha.jpg`);
      sprite.addChild(alphaSprite);

      // 필터 생성
      filter = new PIXI.ETC1Filter(alphaSprite);

      // 필터 설정
      sprite.filters = [filter];
    }

    //==================================================================================
    // Sprite
    //==================================================================================

    window.PIXI.ETC1Filter = PIXI.ETC1Filter;
    window.testCretingAlphaTextureWithPNG = test;
    window.testCretingAlphaTextureWithJPG = test2;

})();
