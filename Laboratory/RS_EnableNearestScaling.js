/*:
 * RS_EnableNearestScaling.js
 * @plugindesc RS_EnableNearestScaling
 * @author biud436
 */

(function () {
  TileRenderer.prototype.initBounds = function() {
      var gl = this.renderer.gl;
      var tempCanvas = document.createElement('canvas');
      tempCanvas.width = 2048;
      tempCanvas.height = 2048;
      // tempCanvas.getContext('2d').clearRect(0, 0, 2048, 2048);
      for (var i=0;i<this.maxTextures; i++) {
          var glt = new glCore.GLTexture(gl, 2048, 2048);
          glt.premultiplyAlpha = true;
          glt.upload(tempCanvas);
          glt.enableWrapClamp();

          if(Utils.isMobileDevice()) {
            glt.enableNearestScaling();
          } else {
            glt.enableLinearScaling();
          }

          this.glTextures.push(glt);
          var bs = [];
          for (var j=0;j<4;j++) {
              var spr = new PIXI.Sprite();
              spr.position.x = 1024 * (j & 1);
              spr.position.y = 1024 * (j >> 1);
              bs.push(spr);
          }
          this.boundSprites.push(bs);
      }
  };
  //
  // RectTileLayer.prototype.addRect = function (textureId, u, v, x, y, tileWidth, tileHeight, animX, animY) {
  //    tileWidth = tileWidth + 1;
  //    tileHeight = tileHeight + 1;
  //     var pb = this.pointsBuf;
  //     this.hasAnim = this.hasAnim || animX > 0 || animY > 0;
  //     if (tileWidth == tileHeight) {
  //         pb.push(u);
  //         pb.push(v);
  //         pb.push(x);
  //         pb.push(y);
  //         pb.push(tileWidth);
  //         pb.push(tileHeight);
  //         pb.push(animX | 0);
  //         pb.push(animY | 0);
  //         pb.push(textureId);
  //     } else {
  //         var i;
  //         if (tileWidth % tileHeight === 0) {
  //             //horizontal line on squares
  //             for (i=0;i<tileWidth/tileHeight;i++) {
  //                 pb.push(u + i * tileHeight);
  //                 pb.push(v);
  //                 pb.push(x + i * tileHeight);
  //                 pb.push(y);
  //                 pb.push(tileHeight);
  //                 pb.push(tileHeight);
  //                 pb.push(animX | 0);
  //                 pb.push(animY | 0);
  //                 pb.push(textureId);
  //             }
  //         } else if (tileHeight % tileWidth === 0) {
  //             //vertical line on squares
  //             for (i=0;i<tileHeight/tileWidth;i++) {
  //                 pb.push(u);
  //                 pb.push(v + i * tileWidth);
  //                 pb.push(x);
  //                 pb.push(y + i * tileWidth);
  //                 pb.push(tileWidth);
  //                 pb.push(tileWidth);
  //                 pb.push(animX | 0);
  //                 pb.push(animY | 0);
  //                 pb.push(textureId);
  //             }
  //         } else {
  //             //ok, ok, lets use rectangle. but its not working with square shader yet
  //             pb.push(u);
  //             pb.push(v);
  //             pb.push(x);
  //             pb.push(y);
  //             pb.push(tileWidth);
  //             pb.push(tileHeight);
  //             pb.push(animX | 0);
  //             pb.push(animY | 0);
  //             pb.push(textureId);
  //         }
  //     }
  // };
  //
  // CompositeRectTileLayer.prototype.addRect = function (num, u, v, x, y, tileWidth, tileHeight) {
  //     tileWidth = tileWidth + 1;
  //     tileHeight = tileHeight + 1;
  //     if (this.children[num] && this.children[num].textures)
  //         this.children[num].addRect(0, u, v, x, y, tileWidth, tileHeight);
  // };

})();
