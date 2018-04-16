/*:
 * @plugindesc This plugin allows you to run with two types of events when a certain picture collides with some sprites.
 * @author biud436
 *
 * @param Delay
 * @type number
 * @min 100
 * @desc if it is less than the time you want a delay to take, it will wait the event to complete.
 * @default 200
 *
 * @help
 * =============================================================================
 * Script Calls
 * =============================================================================
 *
 * This command will run some event when it collides with certain picture:
 *
 *    RS.PictureTool.runEventCollideWithPicture(picId, eventId);
 *
 * This command will run the common event when it collides with a picId picture:
 *
 *    RS.PictureTool.runCommonEventCollideWithPicture(picId, eventId, commonEventId);
 *
 * This command will run a certain event when the picture collides with a game player:
 *
 *    RS.PictureTool.runEventCollideWithPlayer(picId, eventId);
 *
 * This command will run a certain common event when the picture collides with a game player:
 *
 *    RS.PictureTool.runCommonEventCollideWithPlayer(picId, eventId, commonEventId);
 *
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.04.13 (v1.0.0) - First Release.
 */
 /*:ko
  * @plugindesc 그림이 특정 캐릭터 스프라이트와 충돌하면 특정 이벤트가 실행됩니다.
  * @author 러닝은빛(biud436)
  *
  * @param Delay
  * @type number
  * @min 100
  * @desc 키보드와 마우스 이벤트 업데이트를 위한 딜레이 시간 (간격이 짧으면 키보드와 마우스가 먹통됩니다, 1000ms = 1초)
  * @default 200
  *
  * @help
  * =============================================================================
  * 스크립트 호출
  * =============================================================================
  *
  * 특정 그림과 특정 이벤트 eventId가 충돌하면 eventId를 실행합니다.
  *
  *    RS.PictureTool.runEventCollideWithPicture(picId, eventId);
  *
  * 특정 그림과 특정 이벤트 eventId가 충돌하면 특정 커먼 이벤트를 실행합니다.
  *
  *    RS.PictureTool.runCommonEventCollideWithPicture(picId, eventId, commonEventId);
  *
  * 그림과 플레이어가 충돌하면 특정 이벤트를 실행합니다.
  *
  *    RS.PictureTool.runEventCollideWithPlayer(picId, eventId);
  *
  * 그림과 플레이어가 충돌하면 특정 커먼 이벤트를 실행합니다.
  *
  *    RS.PictureTool.runCommonEventCollideWithPlayer(picId, eventId, commonEventId);
  *
  * =============================================================================
  * 버전 로그
  * =============================================================================
  * 2018.04.13 (v1.0.0) - 공개
  */

var RS = RS || {};

RS.PictureTool = RS.PictureTool || {};

(function ($) {

  var parameters = PluginManager.parameters('RS_PictureTool');

  $.Params = $.Params || {};
  $.Params.frameTime = performance.now();

  // 멈춤 현상 방지를 위한 고정 딜레이 값 (마우스와 키보드 입력 업데이트가 선행되고 있으므로)
  $.Params.delay = Number(parameters["Delay"] || 200);

  // ===========================================================================
  // Game_Character
  // ===========================================================================

  var alias_Game_Character_initMembers = Game_Character.prototype.initMembers;
  Game_Character.prototype.initMembers = function() {
    alias_Game_Character_initMembers.call(this);
    this._spritePointer = null;
  };

  Game_Character.prototype.getFrame = function () {
    var sx = this.screenX();
    var sy = this.screenY();

    if(this._spritePointer) {
      return this._spritePointer.getFrame(sx, sy);
    }

    return new Rectangle(sx, sy, $gameMap.tileWidth(), $gameMap.tileHeight() );
  };

  // ===========================================================================
  // Sprite_Character
  // ===========================================================================

  var alias_Sprite_Character_setCharacter = Sprite_Character.prototype.setCharacter;
  Sprite_Character.prototype.setCharacter = function(character) {
    alias_Sprite_Character_setCharacter.call(this, character);

    var self = this;

    this._character._spritePointer = this;

    this.on('removed', function () {
      self._character._spritePointer = null;
    }, this);

  };

  Sprite_Character.prototype.getFrame = function (sx, sy) {
    if (this._tileId > 0) {
        this.updateTileFrame();
    } else {
        this.updateCharacterFrame();
    }

    var tw = $gameMap.tileWidth();
    var th = $gameMap.tileHeight();

    if(this.frame) {
      return this.frame;
    } else {
      return new Rectangle(sx - tw / 2, sy - th, this.width, this.height);
    }

  };

  // ===========================================================================
  // RS.PictureTool
  // ===========================================================================

  $.isMap = function () {
    return SceneManager._scene instanceof Scene_Map;
  };

  /**
   * 픽처 찾기
   */
  $.findPicture = function (picId) {
    var container;
    if(!$.isMap()) return false;
    container = SceneManager._scene._spriteset._pictureContainer.children;
    if(!container) return false;
    return container[picId - 1];
  };

  /**
   * 그림의 영역 찾기
   */
  $.findPictureBound = function(picId) {
    var pic = $.findPicture(picId);
    if(!pic) return false;
    if(pic.frame) {
      return pic.frame;
    } else {
      return new Rectangle(pic.x, pic.y, pic.width, pic.height);
    }
  };

  $.isCheckHit = function (p, q) {
    var ret = false;
    if( (p.x + p.width > q.x) && (p.x < q.x + q.width)) {
      if( (p.y + p.height > q.y) && (p.y < q.y + q.height)) {
        ret = true;
      }
    }
    return ret;
  };

  $.isCheckHitWithCircle = function (p, q) {
    var ret = false;
    var dx, dy, ar, dist;

    dx = p.x - q.x;
    dy = p.y - q.y;
    dist = dx * dx + dy * dy;

    // TODO: 임시로 정한 반지름
    ar = (p.width / 2) + (q.width / 2);

    if ( dist < ar * ar ) {
      ret = true;
    }

    return ret;

  };

  $.isValid = function (picId, eventId, isPlayer) {

    var pic = $.findPictureBound(picId);
    if(!pic) return false;
    if(performance.now() - $.Params.frameTime < $.Params.delay) return false;

    var frame;

    if(isPlayer) {
      frame = $gamePlayer.getFrame();
    } else {
      frame = $gameMap.event(eventId).getFrame();
    }

    return $.isCheckHit(frame, pic);

  };

  /**
   * 특정 그림과 특정 이벤트 eventId가 충돌하면 eventId를 실행합니다.
   */
  $.runEventCollideWithPicture = function (picId, eventId) {

    if(!$.isValid(picId, eventId)) return false;

    var e = $gameMap.event(eventId);

    if(!$gameMap.isEventRunning() && !e.isStarting()) {

      setTimeout(function () {
        e.start();
      }, 0);

    }

    $.Params.frameTime = performance.now();

    return true;

  };

  /**
   * 특정 그림과 특정 이벤트 eventId가 충돌하면 특정 커먼 이벤트를 실행합니다.
   */
  $.runCommonEventCollideWithPicture = function (picId, eventId, commonEventId) {

    if(!$.isValid(picId, eventId)) return false;

    if(!$gameMap.isEventRunning()) {

      setTimeout(function () {
        $gameTemp.reserveCommonEvent(commonEventId);
      }, 0);

    }

    $.Params.frameTime = performance.now();

    return true;

  };


  /**
   * 그림과 플레이어가 충돌하면 특정 이벤트를 실행합니다.
   */
  $.runEventCollideWithPlayer = function (picId, eventId) {

    if(!$.isValid(picId, eventId, true)) return false;

    var e = $gameMap.event(eventId);

    if(!$gameMap.isEventRunning() && !e.isStarting()) {

      setTimeout(function () {
        e.start();
      }, 0);

    }

    $.Params.frameTime = performance.now();

    return true;

  };

  /**
   * 그림과 플레이어가 충돌하면 특정 커먼 이벤트를 실행합니다.
   */
  $.runCommonEventCollideWithPlayer = function (picId, eventId, commonEventId) {

    if(!$.isValid(picId, eventId, true)) return false;

    if(!$gameMap.isEventRunning()) {

      setTimeout(function () {
        $gameTemp.reserveCommonEvent(commonEventId);
      }, 0);

    }

    $.Params.frameTime = performance.now();

    return true;

  };

  /**
   * 그림의 표시에서 만든 텍스처를 메모리에서 즉각 제거합니다.
   */
  $.deletePicture = function (picId) {
    var container;
    if(!$.isMap()) return false;
    container = SceneManager._scene._spriteset._pictureContainer;
    if(!container) return false;
    var picSprite = $.findPicture(picId);
    var sprite = new Sprite_Picture(picId);
    container.addChild(sprite);
    container.swapChildren(picSprite, sprite);
    container.removeChild(picSprite);
    picSprite.destroy({children:true, texture:true, baseTexture:true});
  };

  Game_Screen.prototype.erasePicture = function(pictureId) {
    var realPictureId = this.realPictureId(pictureId);
    this._pictures[realPictureId] = null;
    $.deletePicture(realPictureId);
  };


})(RS.PictureTool);
