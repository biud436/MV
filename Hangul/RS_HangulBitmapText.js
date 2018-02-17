/*:
 *
 */

var Imported = Imported || {};
Imported.RS_HangulBitmapText = true;

(function () {

  var init = false;

  PIXI.loader
      .add('나눔고딕', 'img/hangul/hangul.xml')
      .load(onAssetsLoaded);

  function onAssetsLoaded() {
    init = true;
  }

})();
