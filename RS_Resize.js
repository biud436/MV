/*:
 * @plugindesc RPG Maker XP용으로 Character 이미지를 Resize합니다. <RS_Resize>
 * @author biud436
 * @help
 * 
 * RPG Maker XP용으로 Character 이미지를 Resize 하려면, 다음 코드를 호출하세요.
 * 
 * RS.Resize.convertCharacterImage();
 * 
 * 변환이 완료되면 파일이 생성된 변환 폴더가 뜹니다.
 * 
 * ===================================================================
 * Change Log
 * ===================================================================
 * 2018.11.24 (v1.0.0) - First Release.
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

      $.getImageDirPath = function() {
        if(!Utils.isNwjs()) return '';
        var path, base;
        path = require('path');
        base = path.dirname(process.mainModule.filename);
        return path.join(base, "img", "characters/");
      };

    //   $.convertTilesetA1Impl = function(filename) {
    //     var bitmap = ImageManager.loadTileset(filename);
    //     var resizeImage = new Sprite(new Bitmap(96 * 4, 128));
    //   };

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
      $.getImagefiles = function() {
        var path = $.getImageDirPath();
        var fileLists = [];
        walkSync(path, fileLists);
        return fileLists;
      };

      var _Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
      Scene_Boot.prototype.loadSystemWindowImage = function() {
        _Scene_Boot_loadSystemWindowImage.call(this);
        $.getImagefiles().forEach(function(fileName) { 
            ImageManager.reserveCharacter(fileName.replace(".png", ""));
        });
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
    
})(RS.Resize);