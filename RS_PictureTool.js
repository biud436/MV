/*:
 * @plugindesc 이벤트와 그림이 충돌했는 지를 확인하고 이벤트를 실행합니다.
 * @author 러닝은빛(biud436)
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
 *    RS.PictureTool.runCommonEventCollideWithPlayer(picId, commonEventId);
 *
 * =============================================================================
 * 버전 로그
 * =============================================================================
 * 2018.04.13 (v1.0.0) - 공개
 */
 /*:ko
  * @plugindesc 이벤트와 그림이 충돌했는 지를 확인하고 이벤트를 실행합니다.
  * @author 러닝은빛(biud436)
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
  *    RS.PictureTool.runCommonEventCollideWithPlayer(picId, commonEventId);
  *
  * =============================================================================
  * 버전 로그
  * =============================================================================
  * 2018.04.13 (v1.0.0) - 공개
  */

var RS = RS || {};

RS.PictureTool = RS.PictureTool || {};

(function ($) {

  $.Params = $.Params || {};

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
      return pic.frame
    } else {
      return new Rectangle(pic.x, pic.y, pic.width, pic.height);
    }
  };

  $.isValid = function (picId, eventId, isPlayer) {

    var pic = $.findPictureBound(picId);
    if(!pic) return false;

    var px = pic.x;
    var py = pic.y;
    var pw = pic.x + pic.width;
    var ph = pic.y + pic.height;
    var sx, sy;

    if(isPlayer) {
      sx = $gamePlayer.screenX();
      sy = $gamePlayer.screenY();
    } else {
      var e = $gameMap.event(eventId);

      if(!e) return false;

      sx = e.screenX();
      sy = e.screenY();

    }

    if( (sx < px) ||
    (sx > pw) ||
    (sy < py) ||
    (sy > ph)) {
      return false;
    }
    return true;
  };

  /**
   * 특정 그림과 특정 이벤트 eventId가 충돌하면 eventId를 실행합니다.
   */
  $.runEventCollideWithPicture = function (picId, eventId) {

    if(!$.isValid(picId, eventId)) return false;

    var e = $gameMap.event(eventId);

    if(!$gameMap.isEventRunning()) {
      e.start();
    }

    return true;

  };

  /**
   * 특정 그림과 특정 이벤트 eventId가 충돌하면 특정 커먼 이벤트를 실행합니다.
   */
  $.runCommonEventCollideWithPicture = function (picId, eventId, commonEventId) {

    if(!$.isValid(picId, eventId)) return false;

    if(!$gameMap.isEventRunning()) {
      $gameTemp.reserveCommonEvent(commonEventId);
    }

    return true;

  };


  /**
   * 그림과 플레이어가 충돌하면 특정 이벤트를 실행합니다.
   */
  $.runEventCollideWithPlayer = function (picId, eventId) {

    if(!$.isValid(picId, eventId, true)) return false;

    var e = $gameMap.event(eventId);

    if(!$gameMap.isEventRunning()) {
      e.start();
    }

    return true;

  };

  /**
   * 그림과 플레이어가 충돌하면 특정 커먼 이벤트를 실행합니다.
   */
  $.runCommonEventCollideWithPlayer = function (picId, eventId, commonEventId) {

    if(!$.isValid(picId, eventId, true)) return false;

    if(!$gameMap.isEventRunning()) {
      $gameTemp.reserveCommonEvent(commonEventId);
    }

    return true;

  };

})(RS.PictureTool);
