/*:
 * @plugindesc RS_LoaderTest.js
 * @author biud436
 *
 */

 var Imported = Imported || {};
 Imported.RS_LoaderTest = 'test';

(function () {

  "use strict";

  function onAssetsLoaded(loader, resources) {
    var textures = resources.config.textures;
    var items = Object.keys(textures);
    items.forEach(function (textureName) {
      var sprite = new Sprite();
      sprite.texture = textures[textureName];
      sprite.on('added', function (self) {
        self.x = 10;
        self.y = 15;
      });
      SceneManager._scene.addChild(sprite);
    }, this);
  }

  var alias_Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function () {
    alias_Scene_Title_start.call(this);
    let loader = new PIXI.loaders.Loader();
    loader.add("config", "img/pictures/config.json");
    loader.load(onAssetsLoaded);
  };

  var alias_Scene_Title_terminate = Scene_Title.prototype.terminate;
  Scene_Title.prototype.terminate = function () {
    alias_Scene_Title_terminate.call(this);
    this.removeChildren();
  };

})();
