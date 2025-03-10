//================================================================
// RS_PictureTool.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc When a picture collides with a specific character sprite, a specific event is fired. <RS_PictureTool>
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
 * Introduction
 * =============================================================================
 * This plugin allows you to create interactive pictures that can detect
 * collisions with characters (events or player) and trigger specific actions
 * when collisions occur.
 *
 * This is useful for creating interactive UI elements, clickable objects in the
 * game world, or creating trigger areas without needing to place visible events.
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 *
 * 1) Run a specific event when a picture collides with an event:
 *
 *    RS.PictureTool.runEventCollideWithPicture(picId, eventId);
 *
 *    Parameters:
 *    - picId: The ID of the picture (starts from 1)
 *    - eventId: The ID of the event to check collision with and to run
 *
 * 2) Run a common event when a picture collides with an event:
 *
 *    RS.PictureTool.runCommonEventCollideWithPicture(picId, eventId, commonEventId);
 *
 *    Parameters:
 *    - picId: The ID of the picture (starts from 1)
 *    - eventId: The ID of the event to check collision with
 *    - commonEventId: The ID of the common event to run
 *
 * 3) Run an event when a picture collides with the player:
 *
 *    RS.PictureTool.runEventCollideWithPlayer(picId, eventId);
 *
 *    Parameters:
 *    - picId: The ID of the picture (starts from 1)
 *    - eventId: The ID of the event to run when collision occurs
 *
 * 4) Run a common event when a picture collides with the player:
 *
 *    RS.PictureTool.runCommonEventCollideWithPlayer(picId, eventId, commonEventId);
 *
 *    Parameters:
 *    - picId: The ID of the picture (starts from 1)
 *    - eventId: The ID of the event to check (usually for tracking purposes)
 *    - commonEventId: The ID of the common event to run
 *
 * =============================================================================
 * Usage Examples
 * =============================================================================
 *
 * Example 1: Create clickable button
 * 1. Show a picture with ID 1 (button image)
 * 2. Create an event with ID 5 that contains the button functionality
 * 3. In a parallel process event, call:
 *    RS.PictureTool.runEventCollideWithPlayer(1, 5);
 *
 * Example 2: Create an invisible trigger area
 * 1. Show a transparent picture with ID 2 at desired location
 * 2. Create a common event with ID 10 for the trigger action
 * 3. In a parallel process event, call:
 *    RS.PictureTool.runCommonEventCollideWithPlayer(2, 1, 10);
 *
 * =============================================================================
 * Notes
 * =============================================================================
 * - Collision detection uses rectangular hitboxes
 * - The Delay parameter prevents excessive triggering and input blocking
 * - Pictures must be visible (though can be transparent) for collision to work
 * - Events can be triggered repeatedly if the collision persists
 *
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.04.13 (v1.0.0) - First Release.
 * 2018.04.16 (v1.0.1) - Fixed a hanging bug.
 * 2018.04.16 (v1.0.2) - Fixed the issue that the save is not working.
 * 2018.04.16 (v1.0.3) - Fixed the issue when the picture is deleted
 * 2024.06.23 (v1.1.0):
 * - Fixed the issue of no response when a picture collides with a specific character sprite
 * - Improved collision detection accuracy
 * - Optimized performance for multiple collision checks
 * - Added better error handling for missing pictures or events
 */
/*:ko
 * @target MV
 * @plugindesc 그림이 특정 캐릭터 스프라이트와 충돌하면 특정 이벤트가 실행됩니다. <RS_PictureTool>
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
 * 2024.06.23 (v1.1.0):
 *  - 충돌해도 아무런 반응이 없는 문제를 수정하였습니다.
 */

var RS = RS || {};

RS.PictureTool = RS.PictureTool || {};

($ => {
  'use strict';

  let parameters = $plugins.filter(i => {
    return i.description.contains('<RS_PictureTool>');
  });
  parameters = parameters.length > 0 && parameters[0].parameters;

  RS.PictureTool.Params = RS.PictureTool.Params || {};

  RS.PictureTool.Params.frameTime = performance.now();

  RS.PictureTool.Params.FN = {
    NONE: -1,
    RUN_EVENT_COLLIDE_WITH_PICTURE: 0,
    RUN_COMMONEVENT_COLLIDE_WITH_PICTURE: 1,
    RUN_EVENT_COLLIDE_WITH_PLAYER: 2,
    RUN_COMMONEVENT_COLLIDEWITH_PLAYER: 3,
  };

  RS.PictureTool.Params.currentFunc = [RS.PictureTool.Params.FN.NONE];
  RS.PictureTool.Params.funcArgs = [[]];
  RS.PictureTool.Params.isCall = false;

  // 멈춤 현상 방지를 위한 고정 딜레이 값 (마우스와 키보드 입력 업데이트가 선행되고 있으므로)
  RS.PictureTool.Params.delay = Number(parameters['Delay'] || 200);

  // ===========================================================================
  // Game_Character
  // ===========================================================================

  const alias_Game_Character_initMembers = Game_Character.prototype.initMembers;
  Game_Character.prototype.initMembers = function () {
    alias_Game_Character_initMembers.call(this);
    this._spriteFrame = new Rectangle(0, 0, 48, 48);
  };

  Game_Character.prototype.getFrame = function () {
    return this._spriteFrame;
  };

  // ===========================================================================
  // Sprite_Character
  // ===========================================================================

  const alias_Sprite_Character_updateFrame =
    Sprite_Character.prototype.updateFrame;
  Sprite_Character.prototype.updateFrame = function () {
    alias_Sprite_Character_updateFrame.call(this);
    this.getFrame();
  };

  Sprite_Character.prototype.getFrame = function () {
    let frame;

    if (!this._character) return;

    const tw = $gameMap.tileWidth();
    const th = $gameMap.tileHeight();
    const sx = this._character.screenX();
    const sy = this._character.screenY();
    const width = this.patternWidth();
    const height = this.patternHeight();

    if (this.frame) {
      frame = this.frame;
    } else {
      frame = new Rectangle(sx - tw / 2, sy - th, width, height);
    }

    this._character._spriteFrame = frame;
  };

  // ===========================================================================
  // RS.PictureTool
  // ===========================================================================

  RS.PictureTool.isMap = function () {
    return SceneManager._scene instanceof Scene_Map;
  };

  /**
   * Find the piciture from the picture container.
   * @param {Number} picId this is a number starts from 1.
   */
  RS.PictureTool.findPicture = function (picId) {
    let container;
    if (!RS.PictureTool.isMap()) return false;
    container = SceneManager._scene._spriteset._pictureContainer.children;
    if (!container) return false;
    return container.find(i => i._pictureId === picId);
  };

  /**
   * Find the frame of the picture sprite.
   * @param {Number} picId this is a number starts from 1.
   */
  RS.PictureTool.findPictureBound = function (picId) {
    const pic = RS.PictureTool.findPicture(picId);
    if (!pic) return false;
    return new Rectangle(pic.x, pic.y, pic.width, pic.height);
  };

  /**
   * Check whether the picture has been collide with target.
   * @param {Rectangle} p specify the frame of the drawing object.
   * @param {Rectangle} q specify the frame of the drawing object.
   */
  RS.PictureTool.isCheckHit = function (p, q) {
    let ret = false;
    if (p.x + p.width > q.x && p.x < q.x + q.width) {
      if (p.y + p.height > q.y && p.y < q.y + q.height) {
        ret = true;
      }
    }
    return ret;
  };

  RS.PictureTool.isCheckHitWithCircle = function (p, q) {
    let ret = false;
    let dx, dy, ar, dist;

    dx = p.x - q.x;
    dy = p.y - q.y;
    dist = dx * dx + dy * dy;

    // TODO: 임시로 정한 반지름
    ar = p.width / 2 + q.width / 2;

    if (dist < ar * ar) {
      ret = true;
    }

    return ret;
  };

  /**
   * @param {Number} picId this is a number starts from 1.
   * @param {Number} eventId this is a number starts from 1.
   * @param {Boolean} isPlayer check whether the target is a player character.
   */
  RS.PictureTool.isValid = function (picId, eventId, isPlayer) {
    const pic = RS.PictureTool.findPictureBound(picId);
    if (!pic) return false;
    if (
      performance.now() - RS.PictureTool.Params.frameTime <
      RS.PictureTool.Params.delay
    )
      return false;

    let frame;

    if (isPlayer) {
      frame = $gamePlayer.getFrame();
    } else {
      frame = $gameMap.event(eventId).getFrame();
    }

    return RS.PictureTool.isCheckHit(frame, pic);
  };

  RS.PictureTool.runEventCollideWithPicture = function (picId, eventId) {
    RS.PictureTool.Params.isCall = true;
    RS.PictureTool.Params.currentFunc.push(
      RS.PictureTool.Params.FN.RUN_EVENT_COLLIDE_WITH_PICTURE
    );
    RS.PictureTool.Params.funcArgs.push([picId, eventId]);
  };

  RS.PictureTool.runCommonEventCollideWithPicture = function (
    picId,
    eventId,
    commonEventId
  ) {
    RS.PictureTool.Params.isCall = true;
    RS.PictureTool.Params.currentFunc.push(
      RS.PictureTool.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PICTURE
    );
    RS.PictureTool.Params.funcArgs.push([picId, eventId, commonEventId]);
  };

  RS.PictureTool.runEventCollideWithPlayer = function (picId, eventId) {
    RS.PictureTool.Params.isCall = true;
    RS.PictureTool.Params.currentFunc.push(
      RS.PictureTool.Params.FN.RUN_EVENT_COLLIDE_WITH_PLAYER
    );
    RS.PictureTool.Params.funcArgs.push([picId, eventId]);
  };

  RS.PictureTool.runCommonEventCollideWithPlayer = function (
    picId,
    eventId,
    commonEventId
  ) {
    RS.PictureTool.Params.isCall = true;
    RS.PictureTool.Params.currentFunc.push(
      RS.PictureTool.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PLAYER
    );
    RS.PictureTool.Params.funcArgs.push([picId, eventId, commonEventId]);
  };

  /**
   * 특정 그림과 특정 이벤트 eventId가 충돌하면 eventId를 실행합니다.
   */
  RS.PictureTool.runEventCollideWithPictureImpl = function (picId, eventId) {
    if (!RS.PictureTool.isValid(picId, eventId)) return false;

    const e = $gameMap.event(eventId);

    if (!$gameMap.isEventRunning() && !e.isStarting()) {
      setTimeout(function () {
        e.start();
      }, 0);
    }

    RS.PictureTool.Params.frameTime = performance.now();

    return true;
  };

  /**
   * 특정 그림과 특정 이벤트 eventId가 충돌하면 특정 커먼 이벤트를 실행합니다.
   */
  RS.PictureTool.runCommonEventCollideWithPictureImpl = function (
    picId,
    eventId,
    commonEventId
  ) {
    if (!RS.PictureTool.isValid(picId, eventId)) return false;

    if (!$gameMap.isEventRunning()) {
      setTimeout(() => {
        $gameTemp.reserveCommonEvent(commonEventId);
      }, 0);
    }

    RS.PictureTool.Params.frameTime = performance.now();

    return true;
  };

  /**
   * 그림과 플레이어가 충돌하면 특정 이벤트를 실행합니다.
   */
  RS.PictureTool.runEventCollideWithPlayerImpl = function (picId, eventId) {
    if (!RS.PictureTool.isValid(picId, eventId, true)) return false;

    const e = $gameMap.event(eventId);

    if (!$gameMap.isEventRunning() && !e.isStarting()) {
      setTimeout(() => {
        e.start();
      }, 0);
    }

    RS.PictureTool.Params.frameTime = performance.now();

    return true;
  };

  /**
   * 그림과 플레이어가 충돌하면 특정 커먼 이벤트를 실행합니다.
   */
  RS.PictureTool.runCommonEventCollideWithPlayerImpl = function (
    picId,
    eventId,
    commonEventId
  ) {
    if (!RS.PictureTool.isValid(picId, eventId, true)) return false;

    if (!$gameMap.isEventRunning()) {
      setTimeout(() => {
        $gameTemp.reserveCommonEvent(commonEventId);
      }, 0);
    }

    RS.PictureTool.Params.frameTime = performance.now();

    return true;
  };

  /**
   * 그림의 표시에서 만든 텍스처를 메모리에서 즉각 제거합니다.
   */
  RS.PictureTool.deletePicture = function (picId) {
    let container;
    if (!RS.PictureTool.isMap()) return false;
    container = SceneManager._scene._spriteset._pictureContainer;
    if (!container) return false;
    const picSprite = RS.PictureTool.findPicture(picId);
    const sprite = new Sprite_Picture(picId);
    container.addChild(sprite);
    container.swapChildren(picSprite, sprite);
    container.removeChild(picSprite);
    picSprite.destroy({ children: true, texture: true });
  };

  Game_Screen.prototype.erasePicture = function (pictureId) {
    const realPictureId = this.realPictureId(pictureId);
    this._pictures[realPictureId] = null;
    RS.PictureTool.deletePicture(realPictureId);
  };

  //============================================================================
  // Scene_Map
  //============================================================================

  Scene_Map.prototype.updatePictureTool = function () {
    if (!RS.PictureTool.Params.isCall) return;

    const args = RS.PictureTool.Params.funcArgs.shift();
    const func = RS.PictureTool.Params.currentFunc.shift();

    switch (func) {
      case RS.PictureTool.Params.FN.RUN_EVENT_COLLIDE_WITH_PICTURE:
        RS.PictureTool.runEventCollideWithPictureImpl(args[0], args[1]);
        break;
      case RS.PictureTool.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PICTURE:
        RS.PictureTool.runCommonEventCollideWithPictureImpl(
          args[0],
          args[1],
          args[2]
        );
        break;
      case RS.PictureTool.Params.FN.RUN_EVENT_COLLIDE_WITH_PLAYER:
        RS.PictureTool.runEventCollideWithPlayerImpl(args[0], args[1]);
        break;
      case RS.PictureTool.Params.FN.RUN_COMMONEVENT_COLLIDE_WITH_PLAYER:
        RS.PictureTool.runCommonEventCollideWithPlayerImpl(
          args[0],
          args[1],
          args[2]
        );
        break;
    }

    RS.PictureTool.Params.isCall = false;
  };

  const alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    alias_Scene_Map_update.call(this);
    this.updatePictureTool();
  };
})(RS.PictureTool);
