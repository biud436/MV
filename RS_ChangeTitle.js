/*:
 * RS_ChangeTitle.js
 * @plugindesc This plugin changes the title screen image after a certain time.
 * @author biud436
 * @date 2015.11.09
 *
 * @param FILE
 * @desc Write the list of the title screen image. (Distinguish to the blank)
 * @default Book Castle CrossedSwords Crystal DemonCastle
 *
 * @param TIME
 * @desc frame
 * @default 2
 *
 */

var Imported = Imported || {};
Imported.RS_ChangeTitle = true;

(function() {

  var parameters = PluginManager.parameters('RS_ChangeTitle');
  var titleFile = (function() {
    return parameters['FILE'].split(/[^\w]/gi);
  })();
  var titleTime = Number(parameters['Time'] || 2);

  var _Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function() {
    _Scene_Title_update.call(this);
    this.chooseIndex();
  };

  if(!!Graphics) {
    Graphics.frameRate = function() {
      return Graphics._fpsMeter.fps || 60;
    }
  }

  Scene_Title.prototype.getTime = function() {
    return ((Graphics.frameCount / Graphics.frameRate() ) | 0);
  };

  Scene_Title.prototype.chooseIndex = function() {
    if(this.getTime() % titleTime > 0) return;
    this._spriteIndex = (this.getTime() % titleFile.length) || 0;
    this._backSprite1.bitmap = ImageManager.loadTitle1(titleFile[this._spriteIndex]);
  };

})();
