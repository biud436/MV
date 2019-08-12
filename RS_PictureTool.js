//================================================================
// RS_PictureTool.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to run with two types of events when a certain picture collides with some sprites.
 * @author biud436
 *
 * @param Delay
 * @type number
 * @min 1
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
 * 2018.04.16 (v1.0.1) - Fixed a hanging bug.
 * 2018.04.16 (v1.0.2) - Fixed the issue that the save is not working.
 * 2018.04.16 (v1.0.3) - Fixed the issue when the picture is deleted
 */
 /*:ko
  * @plugindesc 그림이 특정 캐릭터 스프라이트와 충돌하면 특정 이벤트가 실행됩니다.
  * @author 러닝은빛(biud436)
  *
  * @param Delay
  * @type number
  * @min 1
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
  * 2018.04.16 (v1.0.1) - 멈춤 버그를 수정하였습니다.
  * 2018.04.16 (v1.0.2) - 세이브 불가 버그를 수정하였습니다.
  * 2018.04.16 (v1.0.3) - 그림 삭제 불가 버그를 수정하였습니다.
  */

var RS = RS || {};

RS.PictureTool = RS.PictureTool || {};

(function ($) {

  var parameters = PluginManager.parameters('RS_PictureTool');

  $.Params = $.Params || {};
  $.Params.frameTime = performance.now();

  $.Params.FN = {
    NONE: -1,
    RUN_EVENT_COLLIDE_WITH_PICTURE: 0,
    RUN_COMMONEVENT_COLLIDE_WITH_PICTURE: 1,
    RUN_EVENT_COLLIDE_WITH_PLAYER: 2,
    RUN_COMMONEVENT_COLLIDEWITH_PLAYER: 3
  };

  $.Params.currentFunc = [$.Params.FN.NONE];
  $.Params.funcArgs = [[]];
  $.Params.isCall = false;

  // 멈춤 현상 방지를 위한 고정 딜레이 값 (마우스와 키보드 입력 업데이트가 선행되고 있으므로)
  $.Params.delay = Number(parameters["Delay"] || 200);

  // ===========================================================================
  // Game_Character
  // ===========================================================================

  var alias_Game_Character_initMembers = Game_Character.prototype.initMembers;
  Game_Character.prototype.initMembers = function() {
    alias_Game_Character_initMembers.call(this);
    this._spriteFrame = new Rectangle(0, 0, 48, 48 );
  };

  Game_Character.prototype.getFrame = function () {
    return this._spriteFrame;
  };

  // ===========================================================================
  // Sprite_Character
  // ===========================================================================

  var alias_Sprite_Character_updateFrame = Sprite_Character.prototype.updateFrame;
  Sprite_Character.prototype.updateFrame = function() {
    alias_Sprite_Character_updateFrame.call(this);
    this.getFrame();
  };
  
  Sprite_Character.prototype.getFrame = function () {

    var frame;

    if(!this._character) return;

    var tw = $gameMap.tileWidth();
    var th = $gameMap.tileHeight();
    var sx = this._character.screenX();
    var sy = this._character.screenY();
    var width = this.patternWidth();
    var height = this.patternHeight();

    if(this.frame) {
      frame =  this.frame;
    } else {
      frame = new Rectangle(sx - tw / 2, sy - th, width, height);
    }

    this._character._spriteFrame = frame;

  };

  // ===========================================================================
  // RS.PictureTool
  // ===========================================================================

  $.isMap = function () {
    return SceneManager._scene instanceof Scene_Map;
  };

  /**
   * Find the piciture from the picture container.
   * @param {Number} picId this is a number starts from 1.
   */
  $.findPicture = function (picId) {
    var container;
    if(!$.isMap()) return false;
    container = SceneManager._scene._spriteset._pictureContainer.children;
    if(!container) return false;
    return container[picId];
  };

  /**
   * Find the frame of the picture sprite.
   * @param {Number} picId this is a number starts from 1.
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

  /**
   * Check whether the picture has been collide with target.
   * @param {Rectangle} p specify the frame of the drawing object.
   * @param {Rectangle} q specify the frame of the drawing object.
   */
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

  /**
   * @param {Number} picId this is a number starts from 1.
   * @param {Number} eventId this is a number starts from 1.
   * @param {Boolean} isPlayer check whether the target is a player character.
   */
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

  $.runEventCollideWithPicture = function (picId, eventId) {
    $.Params.isCall = true;
    $.Params.currentFunc.push($.Params.FN.RUN_EVENT_COLLIDE_WITH_PICTURE);
    $.Params.funcArgs.push([picId, eventId]);    
  };

  $.runCommonEventCollideWithPicture = function (picId, eventId, commonEventId) {
    $.Params.isCall = true;
    $.Params.currentFunc.push($.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PICTURE);
    $.Params.funcArgs.push([picId, eventId, commonEventId]);    
  };

  $.runEventCollideWithPlayer = function (picId, eventId) {
    $.Params.isCall = true;
    $.Params.currentFunc.push($.Params.FN.RUN_EVENT_COLLIDE_WITH_PLAYER);
    $.Params.funcArgs.push([picId, eventId]);    
  };

  $.runCommonEventCollideWithPlayer = function (picId, eventId, commonEventId) {
    $.Params.isCall = true;
    $.Params.currentFunc.push($.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PLAYER);
    $.Params.funcArgs.push([picId, eventId, commonEventId]);    
  };

  /**
   * 특정 그림과 특정 이벤트 eventId가 충돌하면 eventId를 실행합니다.
   */
  $.runEventCollideWithPictureImpl = function (picId, eventId) {

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
  $.runCommonEventCollideWithPictureImpl = function (picId, eventId, commonEventId) {

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
  $.runEventCollideWithPlayerImpl = function (picId, eventId) {

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
  $.runCommonEventCollideWithPlayerImpl = function (picId, eventId, commonEventId) {

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
    picSprite.destroy({children:true, texture:true});
  };

  Game_Screen.prototype.erasePicture = function(pictureId) {
    var realPictureId = this.realPictureId(pictureId);
    this._pictures[realPictureId] = null;
    $.deletePicture(realPictureId);
  };

  //============================================================================
  // Scene_Map
  //============================================================================

  Scene_Map.prototype.updatePictureTool = function () {
    if(!$.Params.isCall) return;
    
    var args = $.Params.funcArgs.shift();
    var func = $.Params.currentFunc.shift();

    switch (func) {
      case $.Params.FN.RUN_EVENT_COLLIDE_WITH_PICTURE:
        $.runEventCollideWithPictureImpl(args[0], args[1]);
        break;
      case $.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PICTURE:
        $.runCommonEventCollideWithPictureImpl(args[0], args[1], args[2]);
        break;
      case $.Params.FN.RUN_EVENT_COLLIDE_WITH_PLAYER:
        $.runEventCollideWithPlayerImpl(args[0], args[1]);
        break;
      case $.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PLAYER:
        $.runCommonEventCollideWithPlayerImpl(args[0], args[1], args[2]);
        break;
    }

    $.Params.isCall = false;

  };

  var alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    alias_Scene_Map_update.call(this);
    this.updatePictureTool();
  };

})(RS.PictureTool);
