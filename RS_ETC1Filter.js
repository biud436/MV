/*: 
 * @plugindesc <RS_ETC1Filter>
 * @author biud436
 */

var RS = RS || {};
var Imported = Imported || {};
Imported.RS_ETC1Filter = true;
RS.ETC1Filter = RS.ETC1Filter || {};

(function() {

    var parameters = $plugin.filter(function(i) {
        return i.description.contains("<RS_ETC1Filter>");
    });

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

    //==================================================================================
    // Sprite
    //==================================================================================

    window.PIXI.ETC1Filter = PIXI.ETC1Filter;
    window.testETC1 = test;

})();

(function () {
    
    /**
     * @method readProjectDir
     */
    function readProjectDir() {
        if(!Utils.isNwjs()) return '';
        var path, fs, base, allFiles, dir;
        path = require('path');
        fs = require('fs');
        base = path.dirname(process.mainModule.filename);

        allFiles = fs.readdirSync(base);
        dir = allFiles.filter(function(path) {
            return fs.statSync(path.join(base, path)).isDirectory();
        }, this);

        return dir;
    };

    /**
     * @method createExportFolder
     */
    function getExportFolder(name) {
        var fs, path, base, exportPath;
        fs = require('fs');
        base = path.dirname(process.mainModule.filename);
        exportPath = path.join(base, "export");
        return path.join(exportPath, name);
    };    

    /**
     * @method createExportFolder
     */
    function createExportFolder() {
        var fs, path, base, exportPath;
        fs = require('fs');
        base = path.dirname(process.mainModule.filename);
        exportPath = path.join(base, "export");
        return fs.existsSync(exportPath) || fs.mkdirSync(exportPath);
    };

    function extractAlphaChannel(name) {
        "use strict";

        if( !Utils.isNwjs() ) return;

        createExportFolder();
        var targetFileName = getExportFolder(`${name}.png`);
        var exportRGBFileName = getExportFolder(`export/${name}.png`);
        var exportAlphaFileName = getExportFolder(`export/${name}-alpha.png`);
        var commands = [];

        commands.push(`magick ${targetFileName}.png -flatten -alpha off ${exportRGBFileName}.png`);
        commands.push(`magick ${targetFileName}.png -alpha extract ${exportAlphaFileName}-alpha.png`);

        // etc1 파일 생성
        commands.push(`etc1tool ${exportRGBFileName} --encode -o ${exportRGBFileName}.etc1`);
        commands.push(`etc1tool ${targetFileName} --encode -o ${targetFileName}.etc1`);
    };

    function startCommandLine(name) {
        "use strict";

        var commands = extractAlphaChannel(name);

        var terminal = require('child_process').spawn('cmd', ['/K'], { timeout : 1000*60*60*24 });
        terminal.stdin.setEncoding = 'utf-8';
        
        for(var i=0; i<commands.length; i++) {
            terminal.stdin.write(new Buffer( commands[i] + '\r\n' ) );
        }

        terminal.stdin.write(new Buffer( 'taskkill /pid ' + terminal.pid + ' /T /F' ) );
        
        terminal.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        terminal.on('exit', function (code) {
        });

    };    

})();