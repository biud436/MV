//================================================================
// RS_ViewportCulling.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:ko
 * @plugindesc 이 플러그인은 실험 용도입니다. <RS_ViewportCulling>
 * @author biud436
 *
 * @param Use Tilemap
 * @text 타일맵 생성 여부
 * @type boolean
 * @desc 미사용으로 선택하면 타일맵 객체가 생성되지 않습니다.
 * 타일맵 객체를 생성하지 않으면 메모리를 많이 확보할 수 있습니다.
 * @default false
 * @on 사용
 * @off 미사용
 *
 * @param Use Culling
 * @text 화면 바깥 오브젝트 렌더링 여부
 * @type boolean
 * @desc 사용으로 선택하면 화면 바깥에 있는 스프라이트가 그려지지 않으며 공간 변환식도 수행하지 않습니다.
 * @default true
 * @on 사용
 * @off 미사용
 *
 * @help
 * =============================================================================
 * 플러그인 동작 환경
 * =============================================================================
 * 모바일에서 타일맵을 생성하지 않고 화면 바깥 오브젝트를 렌더링하지 않기 위해 도입된
 * 것으로 RMMV 1.6.0 최신 버전에서 잘 동작합니다.
 * =============================================================================
 * 버전 로그
 * =============================================================================
 * 2018.05.02 - 알파 블렌드 방지
 */
/*:
 * @plugindesc This plugin is for experimentation purposes. <RS_ViewportCulling>
 * @author biud436
 *
 * @param Use Tilemap
 * @type boolean
 * @desc if false, it can reduce the memory as 78 MB or more.
 * @default false
 *
 * @param Use Culling
 * @type boolean
 * @desc if true, it doesn't be rendering an object that is an out of the screen.
 * @default true
 *
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_ViewportCulling = true;

(function () {
  var parameters = PluginManager.parameters('RS_ViewportCulling');

  var useTilemap = Boolean(parameters['Use Tilemap'] === 'true');
  var useCulling = Boolean(parameters['Use Culling'] === 'true');

  //============================================================================
  // PIXI.DisplayObject
  //============================================================================

  /**
   * @author Alex Harrison
   * @refer https://github.com/pixijs/pixi.js/pull/956/commits/fadb9badfe18812f5471fa17574f916a9ed707da
   */
  PIXI.DisplayObject.prototype.viewportCheck = function (renderer) {
    var bounds = this.getBounds();

    var stageW = renderer.width;
    var stageH = renderer.height;

    if (
      bounds.x > stageW ||
      bounds.y > stageH ||
      bounds.x + bounds.width < 0 ||
      bounds.y + bounds.height < 0
    ) {
      return false;
    }
    return true;
  };

  //============================================================================
  // Sprite
  //============================================================================

  Sprite.prototype._renderWebGL = function (renderer) {
    if (this.bitmap) {
      this.bitmap.touch();
    }
    if (this.bitmap && !this.bitmap.isReady()) {
      return;
    }
    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
      if (this._bitmap) {
        this._bitmap.checkDirty();
      }

      if (useCulling && !this.viewportCheck(renderer)) return;

      //copy of pixi-v4 internal code
      this.calculateVertices();

      if (this._isPicture) {
        // use heavy renderer, which reduces artifacts and applies corrent blendMode,
        // but does not use multitexture optimization
        this._speedUpCustomBlendModes(renderer);
        renderer.setObjectRenderer(renderer.plugins.picture);
        renderer.plugins.picture.render(this);
      } else {
        // use pixi super-speed renderer
        renderer.setObjectRenderer(renderer.plugins.sprite);
        renderer.plugins.sprite.render(this);
      }
    }
  };

  Sprite.prototype._renderCanvas = function (renderer) {
    if (this.bitmap) {
      this.bitmap.touch();
    }
    if (this.bitmap && !this.bitmap.isReady()) {
      return;
    }

    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
      if (useCulling && !this.viewportCheck(renderer)) return;

      this._renderCanvas_PIXI(renderer);
    }
  };

  //============================================================================
  // PIXI.Graphics
  //============================================================================

  var alias_PIXI_Graphics_renderWebGL = PIXI.Graphics.prototype._renderWebGL;
  PIXI.Graphics.prototype._renderWebGL = function (renderer) {
    if (useCulling && !this.viewportCheck(renderer)) return;
    alias_PIXI_Graphics_renderWebGL.call(this, renderer);
  };

  var alias_PIXI_Graphics__renderCanvas = PIXI.Graphics.prototype._renderCanvas;
  PIXI.Graphics.prototype._renderCanvas = function (renderer) {
    if (useCulling && !this.viewportCheck(renderer)) return;
    alias_PIXI_Graphics__renderCanvas.call(this, renderer);
  };

  //============================================================================
  // Spriteset_Map
  // It can reduce the memory for 78 MB or more.
  //============================================================================

  if (!useTilemap) {
    Spriteset_Map.prototype.createTilemap = function () {
      this._tilemap = new Sprite();
      this._baseSprite.addChild(this._tilemap);
    };
    Spriteset_Map.prototype.loadTileset = function () {};
    Spriteset_Map.prototype.updateTilemap = function () {
      this._tilemap.pivot.x = $gameMap.displayX() * $gameMap.tileWidth();
      this._tilemap.pivot.y = $gameMap.displayY() * $gameMap.tileHeight();
    };
  }

  //============================================================================
  // SceneManager
  //============================================================================

  SceneManager._deltaTime = 1.0 / 60.0;

  SceneManager.getDistancePerFrame = function (d) {
    d = d || 256;
    var deltaTime = this._deltaTime;
    var defaultDeltaTime = parseFloat(1.0 / 60.0);
    var retValue = d * (defaultDeltaTime / deltaTime);
    return retValue;
  };

  //============================================================================
  // Game_CharacterBase
  //============================================================================

  Game_CharacterBase.prototype.distancePerFrame = function () {
    return (
      Math.pow(2, this.realMoveSpeed()) / SceneManager.getDistancePerFrame(256)
    );
  };

  //============================================================================
  // Game_Map
  //============================================================================

  Game_Map.prototype.scrollDistance = function () {
    return (
      Math.pow(2, this._scrollSpeed) / SceneManager.getDistancePerFrame(256)
    );
  };

  //============================================================================
  // Scene_Map
  //============================================================================

  var alias_Scene_Base_startFadeOut = Scene_Base.prototype.startFadeOut;
  Scene_Base.prototype.startFadeOut = function (duration, white) {
    var isMobile = Utils.isMobileDevice();
    if (isMobile) {
      if (this._fadeSprite) {
        this._fadeSprite.visible = false;
      }
      return false;
    }
    alias_Scene_Base_startFadeOut.call(this, duration, white);
  };

  var alias_Scene_Map_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function () {
    var isMobile = Utils.isMobileDevice();
    if (isMobile) return;
    alias_Scene_Map_callMenu.call(this);
  };

  //============================================================================
  // Sprite_Destination
  //============================================================================

  var alias_Sprite_Destination_createBitmap =
    Sprite_Destination.prototype.createBitmap;
  Sprite_Destination.prototype.createBitmap = function () {
    alias_Sprite_Destination_createBitmap.call(this);
    // 가산 혼합을 방지하기 위해 노말로 되돌린다.
    this.blendMode = Graphics.BLEND_NORMAL;
  };
})();
