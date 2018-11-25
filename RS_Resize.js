/*:
* @plugindesc RPG Maker XP용으로 Character 이미지를 Resize합니다. <RS_Resize>
* @author biud436
* @help
* ===================================================================
* 사용법
* ===================================================================
* RPG Maker XP용으로 Character 이미지를 Resize 하려면 다음 코드를 호출하세요.
* 
* RS.Resize.convertCharacterImage();
* 
* 변환이 완료되면 파일이 생성된 변환 폴더가 뜹니다.
*
* 타일셋을 변환하려면 다음 플러그인 커맨드를 호출하십시오.
*
* CreateTilesets
* 
* ===================================================================
* Change Log
* ===================================================================
* 2018.11.26 (v1.0.0) - First Release.
*/

var Imported = Imported || {};
Imported.RS_Resize = true;

var RS = RS || {};
RS.Resize = RS.Resize || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_Resize>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;
    
    $.localFilePath = function (filename) {
        if(!Utils.isNwjs()) return '';
        var path, base;
        path = require('path');
        base = path.dirname(process.mainModule.filename);
        return path.join(base, 'convert_img', filename);
    };    
    
    /**
    * @param {String} filename
    * @param {PIXI.Sprite} imageData
    */
    $.savePngFile = function(filename, sprite) {
        var fs = require('fs');
        var path = require('path');
        var imageData = Graphics._renderer.extract.base64(sprite);
        console.log(imageData);
        var data = imageData.replace(/^data:image\/\w+;base64,/, "");
        filename = $.localFilePath(filename);
        var buf = new Buffer(data, 'base64');
        var targetDir = path.join(filename, "..");
        if(!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }
        fs.writeFile(filename + ".png", buf, function(err) {
            if(err) {
                console.warn(err);
            }
        });
    };
    
    /**
    * https://gist.github.com/kethinov/6658166
    * @param {String} dir 
    * @param {Array} filelist 
    */
    var walkSync = function(dir, filelist) {
        var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function(file) {
            if (fs.statSync(dir + file).isDirectory()) {
                filelist = walkSync(dir + file + '/', filelist);
            }
            else {
                filelist.push(file);
            }
        });
        return filelist;
    };    
    
    $.getImageDirPath = function(basedir) {
        basedir = basedir || "characters/";
        if(!Utils.isNwjs()) return '';
        var path, base;
        path = require('path');
        base = path.dirname(process.mainModule.filename);
        return path.join(base, "img", basedir);
    };
    
    $.convertCharacterImageImpl = function(filename) {
        var bitmap = ImageManager.loadCharacter(filename);
        var resizeImage = new Sprite(new Bitmap(128, 192));
        var isBigCharacter = ImageManager.isBigCharacter(filename);
        
        var sw, sh;
        var dw = 32;
        var dh = 48;          
        
        if(isBigCharacter) {
            
            sw = Math.floor(bitmap.width / 3);
            sh = Math.floor(bitmap.height / 4);
            
            for(var y = 0; y < 4; y++) {
                for(var x = 0; x < 3; x++) {
                    if(x === 1) {
                        resizeImage.bitmap.blt(bitmap, sw * x, sh * y, sw, sh, dw * 0, y * dh, dw, dh);
                        resizeImage.bitmap.blt(bitmap, sw * x, sh * y, sw, sh, dw * (x + 1), y * dh, dw, dh);
                    } else {
                        resizeImage.bitmap.blt(bitmap, sw * x, sh * y, sw, sh, dw * (x + 1), y * dh, dw, dh);
                    }
                }
            }
            
            $.savePngFile(filename, resizeImage);
            
        } else {
            
            sw = Math.floor(bitmap.width / 12);
            sh = Math.floor(bitmap.height / 8);    
            var bx = 0;
            var by = 0;
            var sx, sy;
            
            for(var index = 0; index < 8; index++) {
                
                resizeImage.bitmap = new Bitmap(128, 192);
                
                for(var y = 0; y < 4; y++) {
                    for(var x = 0; x < 3; x++) {
                        sx = (index % 4 * 3 + x) * sw;
                        sy = (Math.floor(index / 4) * 4 + y) * sh;                 
                        if(x === 1) {
                            resizeImage.bitmap.blt(bitmap, sx, sy, sw, sh, dw * 0, y * dh, dw, dh);
                            resizeImage.bitmap.blt(bitmap, sx, sy, sw, sh, dw * (x + 1), y * dh, dw, dh);
                        } else {
                            resizeImage.bitmap.blt(bitmap, sx, sy, sw, sh, dw * (x + 1), y * dh, dw, dh);
                        }
                    }
                }      
                
                $.savePngFile(filename + "_" + index, resizeImage);
                
            }
            
        }    
        
    };
    
    /**
    * @return {Array} fileLists
    */
    $.getImagefiles = function(dirname) {
        var path = $.getImageDirPath(dirname);
        var fileLists = [];
        walkSync(path, fileLists);
        return fileLists;
    };
    
    $.convertCharacterImage = function() {
        $.getImagefiles().forEach(function(fileName) { 
            $.convertCharacterImageImpl(fileName.replace(".png", ""));
        });
        if(process.platform.contains('win')) {
            var child_process = require('child_process');
            child_process.exec('cmd /K explorer ' + $.localFilePath(""))
        }
    };

    //============================================================================
    // TilesetManager
    //============================================================================    
    
    function TilesetManager() {
        this.initialize.apply(this, arguments);
    };

    TilesetManager.prototype.constructor = TilesetManager;

    TilesetManager.prototype.initialize = function(options) {
        this._filename = "";
        this._options = options;
        
        var size = 0x1400;

        if(this._options.contains('E')) {
            size = 0x1800;
        }

        this._offset = 0x000;

        this._compositeImage = new Sprite(new Bitmap(256, size));
        this._prevLevel = 0;
        this._level = 0;
    };

    TilesetManager.prototype.isNewTileset = function(filename) {
        if(this._filename !== "") {
            return false;
        } else {
            return this._filename !== filename;
        }
    };

    TilesetManager.prototype.flush = function(filename) {
        if(!filename) return this._filename = "";
        var tr = filename.split("_");
        this._filename = tr[0];
        if(this.isNewTileset(filename)) {
            this.flushTileset();
        }
    };

    TilesetManager.prototype.createAutotileFromTilesetA1 = function(filename) {
        var bitmap = ImageManager.loadTileset(filename);
        
        // 96 * 128
        var resizeImage = new Sprite(new Bitmap((32 * 3) * 4, 32 * 4));
        var animationTiles = [0, 1, 2, 1];
        
        for(var index = 0; index < 32; index++) {
            
            var tx = index % 8; // 0 ~ 7
            var ty = Math.floor(index / 8); // 0 ~ 3
            
            if((tx % 4) === 0) {
                
                var sw = 48;
                var sh = 48;
                var dw = 32;
                var dh = 32;
                var sx = sw * 0;
                var sy = sh * 0;
                var dx = dw * 0;
                var dy = dh * 0;
                
                // 시작 좌표
                var bx = tx * 96;
                var by = ty * 144;
                
                // 상단 타일 (가운데 타일 제외)
                for(var i = 0; i < 2; i++) {
                    
                    sx = bx + (sw * i);
                    sy = by + (sh * 0);
                    dx = (dw * i) * 2;
                    dy = dh * 0;
                    
                    for(var j = 0; j < 4; j++) {
                        resizeImage.bitmap.bltImage(bitmap, sx + (96 * animationTiles[j]), sy, sw, sh, dx + (96 * j), dy, dw, dh);               
                    }
                    
                }
                
                // 하단 타일 (그대로)
                sx = bx + (sw * 0);
                sy = by + (sh * 1);
                dx = (dw * 0);
                dy = (dh * 1);
                for(var i = 0; i < 4; i++) {
                    resizeImage.bitmap.bltImage(bitmap, sx + (96 * animationTiles[i]), sy, 96, 96, dx + (96 * i), dy, 96, 96);
                }
                
                $.savePngFile(filename + "_" + index, resizeImage);
                
            }
        }
        
        
        
    };

    TilesetManager.prototype.createAutotileFromTilesetA2 = function(filename) {

        var re = /(?:A2|A3|A4|)/;
        if(!re.exec(filename)) {
            return false;
        }

        var bitmap = ImageManager.loadTileset(filename);
        var resizeImage = new Sprite(new Bitmap(96, 128));

        for(var index = 0; index < 32; index++) {
            var tx = index % 8; // 0 ~ 7
            var ty = Math.floor(index / 8); // 0 ~ 3   
            
            var sw = 48;
            var sh = 48;
            var dw = 32;
            var dh = 32;
            var sx = sw * 0;
            var sy = sh * 0;
            var dx = dw * 0;
            var dy = dh * 0;
            
            // 시작 좌표
            var bx = tx * 96;
            var by = ty * 144;

            // 상단 타일 (가운데 타일 제외)
            for(var i = 0; i < 2; i++) {
                
                sx = bx + (sw * i);
                sy = by + (sh * 0);
                dx = (dw * i) * 2;
                dy = dh * 0;
                
                resizeImage.bitmap.bltImage(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);               
                
            }
                
            // 하단 타일 (그대로)
            sx = bx + (sw * 0);
            sy = by + (sh * 1);
            dx = (dw * 0);
            dy = (dh * 1);
            
            resizeImage.bitmap.bltImage(bitmap, sx, sy, 96, 96, dx, dy, 96, 96);
                
            $.savePngFile(filename + "_" + index, resizeImage);            
            resizeImage.bitmap.clear();

        };

    };    

    TilesetManager.prototype.flushTileset = function() {
        this.exportTilesets();
        this._level = 0;
        this._prevLevel = 0;
        this._offset = 0;
    };

    TilesetManager.prototype.createAutotileFromTilesetA3 = function(filename) {
        
        // A3 오토타일은 RMMV의 타일맵에서만 사용 가능하므로, 그냥 일반 타일로 넣는다.

        var bitmap = ImageManager.loadTileset(filename);
        if(bitmap.width <= 0) {
            return false;
        }

        if(this._level !== 0) {
            this._prevLevel = this._level;
        }

        var sw = 48;
        var sh = 48;
        var dw = 32;
        var dh = 32;   
        var lastSX = 0;
        var lastSY = 0; 
        
        // 768 x 384
        for(var y = 0; y < 8; y++) {
            for(var x = 0; x < 8; x++) {
               
                sx = sw * x;
                sy = sh * y;
                dx = dw * x;
                dy = dh * y;    

                this._compositeImage.bitmap.bltImage(bitmap, sx, sy, sw, sh, dx, this._offset + dy, dw, dh);
            }
        }

        this._offset += 0x80;

        for(var y = 0; y < 8; y++) {
            for(var x = 0; x < 8; x++) {
               
                sx = sw * (x + 8);
                sy = sh * (y + 8);
                dx = dw * x;
                dy = dh * y;    
                            
                this._compositeImage.bitmap.bltImage(bitmap, sx, sy, sw, sh, dx, this._offset + dy, dw, dh);
            }
        }     
        
        this._offset += 0x80;
        this._level = 1;        

    };        

    TilesetManager.prototype.createAutotileFromTilesetA4 = function(filename) {

        var re = /(?:A4|)/g;

        if(!re.exec(filename)) {
            return false;
        }

        var bitmap = ImageManager.loadTileset(filename);
        var resizeImage = new Sprite(new Bitmap(96, 128));

        for(var index = 0; index < 24; index++) {

            var tx = index % 8; // 0 ~ 7
            var ty = Math.floor(index / 8); // 0 ~ 2
            
            var sw = 48;
            var sh = 48;
            var dw = 32;
            var dh = 32;
            var sx = sw * 0;
            var sy = sh * 0;
            var dx = dw * 0;
            var dy = dh * 0;
            
            // 시작 좌표
            var bx = tx * 96;
            var by = ty * 240;

            // 상단 타일 (가운데 타일 제외)
            for(var i = 0; i < 2; i++) {
                
                sx = bx + (sw * i);
                sy = by + (sh * 0);
                dx = (dw * i) * 2;
                dy = dh * 0;
                
                resizeImage.bitmap.bltImage(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
                
            }
                
            // 하단 타일 (그대로)
            sx = bx + (sw * 0);
            sy = by + (sh * 1);
            dx = (dw * 0);
            dy = (dh * 1);
            
            resizeImage.bitmap.bltImage(bitmap, sx, sy, 96, 192, dx, dy, 96, 96);
                
            $.savePngFile(filename + "_" + index, resizeImage);            
            resizeImage.bitmap.clear();            

        };

    };            

    TilesetManager.prototype.createTilesetA5 = function(filename) {

        if(this._level !== 0) {     
            this._prevLevel = this._level;
        }

        var bitmap = ImageManager.loadTileset(filename);
        var sw = 48;
        var sh = 48;
        var dw = 32;
        var dh = 32;   
        
        for(var y = 0; y < 32; y++) {
            for(var x = 0; x < 8; x++) {
               
                sx = sw * x;
                sy = sh * y;
                dx = dw * x;
                dy = dh * y;                
                this._compositeImage.bitmap.bltImage(bitmap, sx, sy, sw, sh, dx, this._offset + dy, dw, dh);
            }
        }

        this._level = 3;
        this._offset += 0x200;

    };

    TilesetManager.prototype.createTilesetB = function(filename) { 

        if(this._level !== 0) {
            this._prevLevel = this._level;
        }
                
        var bitmap = ImageManager.loadTileset(filename);

        var sw = 48;
        var sh = 48;
        var dw = 32;
        var dh = 32;    
        var tx = 0;
        var ty = 0;
        var id = 0;

        this._compositeImage.bitmap.clearRect(0, this._offset, 256, 0x400);

        for(var y = 0; y < 16; y++) {
            for(var x = 0; x < 8; x++) {      
                sx = sw * x;
                sy = sh * y;
                dx = dw * x;
                dy = dh * y;                       
                this._compositeImage.bitmap.bltImage(bitmap, sx, sy, sw, sh, dx, this._offset + dy, dw, dh);                
            }
        }

        this._offset += 0x200;

        for(var y = 0; y < 16; y++) {
            for(var x = 0; x < 8; x++) {      
                sx = sw * (x + 8);
                sy = sh * y;
                dx = dw * x;
                dy = dh * y;                       
                this._compositeImage.bitmap.bltImage(bitmap, sx, sy, sw, sh, dx, this._offset + dy, dw, dh);                
            }
        }        

        this._offset += 0x200;

        this._filename = filename.split("_")[0];

        this._level++;

    };    

    TilesetManager.prototype.createTilesetC = function(filename, offset) {         
        this.createTilesetB(filename, offset);
    };

    TilesetManager.prototype.createTilesetD = function(filename, offset) {                  
        this.createTilesetB(filename, offset);
    };    

    TilesetManager.prototype.createTilesetE = function(filename, offset) {                           
        this.createTilesetB(filename, offset);
    };        

    TilesetManager.prototype.exportTilesets = function() {
        var filename = this._filename || new Date().getTime().toString();
        $.savePngFile(filename, this._compositeImage);
        this._compositeImage.bitmap.clear();
    };    
    
    //============================================================================
    // Scene_Boot
    //============================================================================
    
    var _Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
    Scene_Boot.prototype.loadSystemWindowImage = function() {
        _Scene_Boot_loadSystemWindowImage.call(this);
        $.getImagefiles().forEach(function(fileName) { 
            ImageManager.reserveCharacter(fileName.replace(".png", ""));
        });
    };
    
    //============================================================================
    // Scene_LoadTilesets
    //============================================================================
    
    function Scene_LoadTilesets() {
        this.initialize.apply(this, arguments);
    };

    Scene_LoadTilesets.prototype = Object.create(Scene_Base.prototype);
    Scene_LoadTilesets.prototype.constructor = Scene_LoadTilesets;
    
    Scene_LoadTilesets.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };
    
    Scene_LoadTilesets.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this._fileMap = {};

        $.getImagefiles("tilesets/").forEach(function(filename) { 

            var idx = filename.indexOf("_");
            var name = filename.slice(0, idx);
        
            if(filename.endsWith(".png")) {
                var _name = filename.replace(".png", "");
                ImageManager.loadTileset(_name);
                if(!this._fileMap[name]) {
                    this._fileMap[name] = [];
                }

                this._fileMap[name].push(_name);
            }

        }, this);

    };
    
    Scene_LoadTilesets.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };
    
    Scene_LoadTilesets.prototype.isReady = function() {
        return Scene_Base.prototype.isReady.call(this);
    };

    Scene_LoadTilesets.prototype.isValid = function(name, suffix) {
        var filename = name + suffix;
        return this._fileMap[name].contains(filename);
    };

    Scene_LoadTilesets.prototype.start = function() {
        Scene_Base.prototype.start.call(this);

        var keys = Object.keys(this._fileMap);

        keys.forEach(function(name) { 

            var options = [];

            if(this._fileMap[name].contains(name + "_E")) {
                options.push("E");
            }

            var tilesets = new TilesetManager(options);

            this._fileMap[name].forEach(function(filename) {
                var _imagename = filename.replace(".png", "");
                if(/(?:_A1)/g.exec(filename)) {
                    tilesets.createAutotileFromTilesetA1(_imagename);
                } else if(/(?:_A2)/g.exec(filename)) {
                    tilesets.createAutotileFromTilesetA2(_imagename);
                } else if(/(?:_A3)/g.exec(filename)) {
                    tilesets.createAutotileFromTilesetA3(_imagename);
                } else if(/(?:_A4)/g.exec(filename)) {
                    tilesets.createAutotileFromTilesetA4(_imagename);                    
                } else if(/(?:_A5)/g.exec(filename)) {
                    tilesets.createTilesetA5(_imagename);
                } else if(/(?:_B)/g.exec(filename)) {
                    tilesets.createTilesetB(_imagename);
                } else if(/(?:_C)/g.exec(filename)) {
                    tilesets.createTilesetC(_imagename);
                } else if(/(?:_D)/g.exec(filename)) {
                    tilesets.createTilesetD(_imagename);
                } else if(/(?:_E)/g.exec(filename)) {
                    tilesets.createTilesetE(_imagename);                
                }
            }, this);

            tilesets.exportTilesets();

        }, this);
        
        if(process.platform.contains('win')) {
            var child_process = require('child_process');
            child_process.exec('cmd /K explorer ' + $.localFilePath(""))
        }        

        SceneManager.pop();

    };

    //============================================================================
    // Game_Interpreter
    //============================================================================
    
    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "CreateTilesets") {
            SceneManager.push(Scene_LoadTilesets);
        }
    };
    
})(RS.Resize);