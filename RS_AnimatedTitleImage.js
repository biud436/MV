/*:ko
 * @plugindesc 일정한 시간이 지나면 타이틀 이미지를 자동으로 변경합니다.
 * @author biud436
 *
 * @param Title Image
 * @text 타이틀 이미지
 * @type struct<TitleImage>[]
 * @default ["{\"Image\":\"Book\",\"Time\":\"2.0\"}","{\"Image\":\"Night\",\"Time\":\"1.5\"}","{\"Image\":\"Sword\",\"Time\":\"1.2\"}","{\"Image\":\"Tower2\",\"Time\":\"3.4\"}"]
 *
 * @param Preload
 * @text 이미지 미리 불러오기
 * @type boolean
 * @desc 타이틀 이미지 파일을 미리 캐시 메모리에 할당할 지 여부를 결정합니다
 * @default true
 *
 * @help
 * =============================================================================
 * 버전 정보
 * =============================================================================
 * 2015.11.09 (v1.0.0) - 플러그인 공개일
 * 2016.07.16 (v1.0.1) - 타이틀 이미지를 미리 불러올 수 있는 매개변수를 추가했습니다.
 * 2016.10.30 (v1.0.2) :
 * - 잘못된 파일명을 수정했습니다.
 * - 메인 프로그램이 포커스를 잃었을 때 생기는 버그를 수정하였습니다.
 * 2017.06.08 (v1.0.3) :
 * - RMMV 1.5.0에서 플러그인이 잘 동작하지 않는 문제를 수정했습니다.
 * 2017.07.09 (v1.0.4) :
 * - 새로운 플러그인 매니저의 기능을 플러그인에 반영했습니다.
 */

/*~struct~TitleImage:ko
*
* @param Image
* @text 이미지
* @desc img/titles1 폴더에 있는 이미지를 불러옵니다
* @default
* @require 1
* @dir img/titles1/
* @type file
*
* @param Time
* @text 시간 간격
* @type number
* @decimals 1
* @desc 일정한 시간이 흐르면 타이틀 이미지를 변경합니다
* @default 2.0
* @min 1.0
*
 */
/*:
 * RS_AnimatedTitleImage.js
 * @plugindesc This plugin changes a title screen image at specific time intervals.
 * @author biud436
 *
 * @param Title Image
 * @type struct<TitleImage>[]
 * @default ["{\"Image\":\"Book\",\"Time\":\"2.0\"}","{\"Image\":\"Night\",\"Time\":\"1.5\"}","{\"Image\":\"Sword\",\"Time\":\"1.2\"}","{\"Image\":\"Tower2\",\"Time\":\"3.4\"}"]
 *
 * @param Preload
 * @type boolean
 * @desc Decides whether it will be preloading title images.
 * @default true
 *
 * @help
 * This plugin changes a title screen image at specific time intervals.
 *
 * - Change Log
 * 2015.11.09 (v1.0.0) - First Release.
 * 2016.07.16 (v1.0.1) - Added the plugin parameter that could be decided
 * whether it will be preloading title images.
 * 2016.10.30 (v1.0.2) :
 * - Fixed the name of the incorrect file.
 * - Fixed the bug that occurs when the main program lost focus.
 * 2017.06.08 (v1.0.3) :
 * - Fixed the bug that is not working in RMMV 1.5.0
 * 2017.07.09 (v1.0.4) :
 * - Added the feature that can add the title images dynamically via newly plugin manager features.
 */

/*~struct~TitleImage:
*
* @param Image
* @desc Specifies to import file in the path from img/titles1 folder.
* @default
* @require 1
* @dir img/titles1/
* @type file
*
* @param Time
* @type number
* @decimals 1
* @desc redraw the title screen image at specific time intervals.
* @default 2.0
* @min 1.0
*
*/

var Imported = Imported || {};
var RS = RS || {};
RS.Utils = RS.Utils || {};
RS.AnimatedTitleImage = RS.AnimatedTitleImage || {};
Imported.AnimatedTitleImage = true;

(function() {

  var parameters = PluginManager.parameters('RS_AnimatedTitleImage');

  RS.AnimatedTitleImage.Params = RS.AnimatedTitleImage.Params || {};
  RS.AnimatedTitleImage.Params.isPreload = Boolean(parameters['Preload'] === 'true');
  RS.AnimatedTitleImage.Params.images = [];

  if(Imported.RS_TitleManagerEx) {
    console.warn("Cannot use together with RS_TitleManagerEx.js plugin.");
    return false;
  }

  if(!Utils.RPGMAKER_VERSION || (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION < "1.3.5") ) {
    console.warn("This plugin needs to be used for RPG Maker MV v1.3.5 or higher.");
    return;
  }

  RS.Utils.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.Utils.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  var data = RS.Utils.jsonParse(parameters['Title Image']);
  data.forEach(function (e, i, a) {
    RS.AnimatedTitleImage.Params.images.push(e);
  });

  var alias_Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    alias_Scene_Boot_loadSystemImages.call(this);
    if(!RS.AnimatedTitleImage.Params.isPreload) return;
    RS.AnimatedTitleImage.Params.images.forEach(function(i) {
      ImageManager.loadTitle1(i['Image']);
    }, this);
  };

  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function () {
    alias_Scene_Title_create.call(this);
    this._spriteIndex = 0;
    PIXI.ticker.shared.add(this.chooseIndex, this);
    PIXI.ticker.shared.stop();
    PIXI.ticker.shared.start();
    this._nSavingTime = performance.now();
  };

  var alias_Scene_Title_terminate = Scene_Title.prototype.terminate;
  Scene_Title.prototype.terminate = function () {
    alias_Scene_Title_terminate.call(this);
    PIXI.ticker.shared.remove(this.chooseIndex, this);
  };

  Scene_Title.prototype.chooseIndex = function() {
    var collections = RS.AnimatedTitleImage.Params.images;
    var data = collections[this._spriteIndex];
    var next = (parseFloat(data['Time']) || 1) * 1000;
    var lastTime = PIXI.ticker.shared.lastTime;
    if( data && lastTime - this._nSavingTime >= next) {
      this._backSprite1.bitmap = ImageManager.loadTitle1(data['Image']);
      this._nSavingTime = lastTime;
      this._spriteIndex = Math.floor(this._nSavingTime) % collections.length;
    }
  };

})();
