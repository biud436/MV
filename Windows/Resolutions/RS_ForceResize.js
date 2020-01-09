//================================================================
// RS_ForceResize.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_ForceResize>
 * @author biud436
 *          
 * @param resizeFolders
 * @type string[]
 * @desc Specify the folder to resize the image.
 * @default []
 * 
 * @param ignoreFolders
 * @type string[]
 * @desc Specify the folder that wouldn't resize the image.
 * @default ["animations", "battlebacks1", "battlebacks2", "characters", "enemies", "faces", "parallaxes", "pictures", "sv_actors", "sv_enemies", "system", tilesets", "titles1", "titles2"]
 * 
 * @help
 * ================================================================
 * Change Log
 * ================================================================
 * 2020.01.06 (v1.0.0) - First Release.
 * 2020.01.09 (v1.0.1) : Fixed the bug
 */
/*~struct~ScreenSize:
 *
 * @param width
 * @type number
 * @min 0
 * @desc Specify the desired width
 * @default 320
 *
 * @param height
 * @type number
 * @min 0
 * @desc Specify the desired height
 * @default 240
 * 
 */

var Imported = Imported || {};
Imported.RS_ForceResize = true;

var RS = RS || {};
RS.ForceResize = RS.ForceResize || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_ForceResize>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    if(!Imported.RS_ScreenManager) {
        throw new Error("There is no plugin named RS_ScreenManager.js");
    }

    /**
     * @type {require('fs')}
     */
    var fs;

    var mainPath;
    var imgFolders;
    var path = require('path');

    if(Utils.isNwjs() && process.version >= "v9.11.1") {
      fs = require('fs-extra');
      mainPath = process.cwd().replace(/\\/g, "/");
      imgFolders = path.join(mainPath, "img");
    } else if(Utils.isNwjs() && process.version == "v1.2.0") {
      fs = require('fs');
      mainPath = path.dirname(process.mainModule.filename);
      process.chdir(mainPath);
      imgFolders = path.join(mainPath, "img");
    } else {
      throw new Error("This script is used only in Nwjs (PC)");
    }

    $.Params = {};
    $.Params.resizeFolders = JSON.parse(parameters["resizeFolders"]);
    $.Params.ignoreFolders = JSON.parse(parameters["ignoreFolders"]);

    $.Params.resizeFolders = $.Params.resizeFolders.map(function(e) {
      return path.join("img", e).replace(/\\/g, "/");
    });

    $.Params.ignoreFolders = $.Params.ignoreFolders.map(function(e) {
      return path.join("img", e).replace(/\\/g, "/");
    });


    /**
     * Get a list to read all files from the project folder.
     * @param  {String} root
     * @param  {Array<String>} files
     * @example 
     * var files = [];
     * RS.ForceResize.readAllFiles("img", files);
     */
    RS.ForceResize.readAllFiles = function(root, files) { 
      if(!root) return;
      var self = this;
      var contents = fs.readdirSync(root, 'utf8');

      contents = contents.map(function(e) {
        return path.join(root, e);
      });
      contents.forEach(function(sub) {
        if(fs.statSync(sub).isDirectory()) {
          // console.log(sub);
          RS.ForceResize.readAllFiles(sub, files);
        } else if(fs.statSync(sub).isFile()) {
          if(path.extname(sub) === ".png") {
            files.push(sub.replace(/\\/g, "/"));
          }
        }
      });
    };

    RS.ForceResize.create = function() {
      var spr = new Sprite();
      spr.bitmap = ImageManager.loadBitmap("img/test/", "resize400x305", 0, false);
      spr.x = 0;
      spr.y = 0;

      SceneManager._scene.addChild(spr);
    };

    Sprite.prototype.reqeustResizeImage = function() {
      var bitmap = this.bitmap;

      if(bitmap.width <= 0) return;
      if(bitmap.width <= 0) return;

      var originSX = this.scale.x;
      var originSY = this.scale.y;

      var originalViewWidth = parseInt(RS.ScreenManager.Params.originalPictureViewSize.width);
      var originalViewHeight = parseInt(RS.ScreenManager.Params.originalPictureViewSize.height);
      var scaleX = originSX;
      var scaleY = originSY;
  
      if(Graphics.boxWidth > originalViewWidth) {
        scaleX = Graphics.boxWidth / originalViewWidth;
      } else if(Graphics.boxWidth < originalViewWidth) {
        scaleX = originalViewWidth / Graphics.boxWidth;
      }
  
      scaleY = Graphics.boxHeight / originalViewHeight;

      // Perform re-scale and re-position.
      this.scale.x = scaleX;
      this.scale.y = scaleY;
      
      if(RS.ScreenManager.Params.picturePosType === "Virtual Coordinates") {
          var x = this.x;
          var y = this.y;
          var sw = bitmap.width * this.scale.x; // scale width and height
          var sh = bitmap.height * this.scale.y;
          var dw = bitmap.width; // original width and original height
          var dh = bitmap.height;
          
          if(dw == 0 || dh == 0) {
            return;
          }
      
          var dx = x * (sw / dw); // destination position
          var dy = y * (sh / dh);
      
          // position
          this.x = Math.floor(dx);
          this.y = Math.floor(dy);
      
        }      
    }

    Sprite.prototype.isValidResizing = function() {
      if(!this.bitmap) return false;
      if(this.bitmap.width <= 0) return false;
      if(this.bitmap.height <= 0) return false;
      if(!this.visible) return false;
      if(this.opacity <= 0) return false;
      if(!this.bitmap._url) return false;

      var targetFolder = path.dirname(this.bitmap._url);
      
      if($.Params.ignoreFolders.contains(targetFolder)) {
        return false;
      }
      
      if($.Params.resizeFolders.contains(targetFolder)) {
        return true;
      }

      return false;
    };

    Sprite.prototype.resizeImage = function() {
      if( this.isValidResizing() ) {
        this.reqeustResizeImage();
      }
    };

    var alias_Sprite_initialize = Sprite.prototype.initialize;
    Sprite.prototype.initialize = function(bitmap) {
      alias_Sprite_initialize.call(this, bitmap);
      this.on('resize', this.resizeImage, this);
      this.once('removed', function() {
        this.off('resize', this.resizeImage, this);
      }, this);
    };

    var alias_Sprite__onBitmapLoad = Sprite.prototype._onBitmapLoad;
    Sprite.prototype._onBitmapLoad = function(bitmapLoaded) {
      alias_Sprite__onBitmapLoad.call(this, bitmapLoaded);
      this.emit('resize');
    };
    
})(RS.ForceResize);