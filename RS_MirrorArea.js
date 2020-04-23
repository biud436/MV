//================================================================
// RS_MirrorArea.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to indicate the mirror image the character on the screen <RS_MirrorArea>
 * @author biud436
 *
 * @param Mirrors
 * @desc Define the mirror as you want
 * @default ["{\"note\":\"MIRROR_NORMAL\",\"w\":\"28\",\"h\":\"42\",\"mask_ox\":\"10\",\"mask_oy\":\"25\",\"char_ox\":\"10\",\"char_oy\":\"25\"}","{\"note\":\"MIRROR_DRESSER\", \"w\": \"34\",\"h\":\"15\", \"mask_ox\": \"10\", \"mask_oy\": \"-5\", \"char_ox\": \"10\", \"char_oy\": \"70\"}"]
 * @type struct<MirrorBase>[]
 *
 * @help
 * =============================================================================
 * How to Use
 * =============================================================================
 * You can set up the comment in your mirror event and change an image as mirror.
 *
 *   Try to set up this comment to player and player's followers :
 *       <MIRROR_NORMAL : 0>
 *
 *   Try to set up this comment to certain event :
 *       <MIRROR_NORMAL : EVENT_ID>
 *
 *   Try to set up this comment to player and player's followers :
 *       <MIRROR_DRESSER : 0>
 *
 *   Try to set up this comment to certain event :
 *       <MIRROR_DRESSER : EVENT_ID>
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * Mirror Show
 * Mirror Hide
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.12.07 (v0.0.1) - Beta.
 * 2016.12.08 (v0.0.4) :
 * - Fixed an issue that events are not displayed in the mirror.
 * - Added a dresser for a decoration.
 * - Added a toggle functionality in blur filter.
 * - Changed the name of the plugin command.
 * 2016.12.08 (v0.0.5) - Fixed an error that could not find a list of events when there was an erased event.
 * 2016.12.09 (v0.0.6) - Fixed an error that could not find deleted events in the event list.
 * 2016.12.10 (v0.0.7) - Fixed the problem that could not find event ID of an event when you loaded saved file.
 * 2016.12.16 (v0.0.8) - Fixed a scale and the scale mode in the mirror sprite.
 * 2017.06.10 (v0.0.9) - Fixed the bug that is not working fine on RMMV 1.5.0 or more
 * 2018.08.21 (v0.0.10) - Fixed the bug that causes a new error after dissecting a long method as small pieces of code.
 */
 /*~struct~MirrorBase:
  *
  * @param note
  * @desc This plugin finds out a target character via this note string on the map
  * @default MIRROR_TYPE
  * @type string
  *
  * @param w
  * @type number
  * @desc Specify the width of the mask bitmap
  * @min 1
  *
  * @param h
  * @type number
  * @desc Specify the height of the mask bitmap
  * @min 1
  *
  * @param mask_ox
  * @type number
  * @desc Specify the offset-x of the mask bitmap
  * @default 0
  *
  * @param mask_oy
  * @type number
  * @desc Specify the offset-x of the mask bitmap
  * @default 0
  *
  * @param char_ox
  * @type number
  * @desc Specify the offset-x of the target character
  * @default 0
  *
  * @param char_oy
  * @type number
  * @desc Specify the offset-x of the target character
  * @default 0
  *
  */
/*:ko
 * @plugindesc 캐릭터가 비치는 완벽한 거울 오브젝트를 만들 수 있습니다. <RS_MirrorArea>
 * @author 러닝은빛(biud436)
 *
 * @param Mirrors
 * @text 거울 오브젝트 설정
 * @desc 거울 오브젝트에 필요한 마스크 영역을 설정하세요. 에디터가 없어 조금 복잡할 수 있습니다.
 * @default ["{\"note\":\"MIRROR_NORMAL\",\"w\":\"28\",\"h\":\"42\",\"mask_ox\":\"10\",\"mask_oy\":\"25\",\"char_ox\":\"10\",\"char_oy\":\"25\"}","{\"note\":\"MIRROR_DRESSER\", \"w\": \"34\",\"h\":\"15\", \"mask_ox\": \"10\", \"mask_oy\": \"-5\", \"char_ox\": \"10\", \"char_oy\": \"70\"}"]
 * @type struct<MirrorBase>[]
 *
 * @help
 * =============================================================================
 * 노트태그 사용법
 * =============================================================================
 * 거울 오브젝트가 설정된 타일에 이벤트를 만들고 메모 커맨드로 노트 태그를 설정하세요.
 *
 *   거울 {NORMAL}에 플레이어와 파티원 캐릭터들을 표시합니다.
 *       <MIRROR_NORMAL : 0>
 *
 *   특정 이벤트 캐릭터를 거울 {NORMAL}에 표시합니다.
 *       <MIRROR_NORMAL : EVENT_ID>
 *
 *   거울 {DRESSER}에 플레이어와 파티원 캐릭터들을 표시합니다.
 *       <MIRROR_DRESSER : 0>
 *
 *   특정 이벤트 캐릭터를 거울 {DRESSER}에 표시합니다.
 *       <MIRROR_DRESSER : EVENT_ID>
 * 
 * =============================================================================
 * 플러그인 명령에 대하여...
 * =============================================================================
 * 
 * Mirror Show
 * Mirror Hide
 * 
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.12.07 (v0.0.1) - 베타 버전 출시
 * 2016.12.08 (v0.0.4) :
 * - 거울에 이벤트 캐릭터가 표시되지 않는 문제를 수정하였습니다.
 * - 화장대 장식품을 추가하였습니다.
 * - 가우시안 블러 필터를 토글할 수 있는 기능을 추가하였습니다.
 * - 플러그인 명령의 이름을 변경하였습니다.
 * 2016.12.08 (v0.0.5) - 일시 삭제된 이벤트가 있을 때 이벤트 목록을 찾을 수 없는 오류를 수정하였습니다.
 * 2016.12.09 (v0.0.6) - 이벤트 목록에서 삭제 된 이벤트를 찾을 수없는 오류가 수정되었습니다.
 * 2016.12.10 (v0.0.7) - 저장된 파일을 불러올 때 이벤트의 이벤트 ID를 찾을 수없는 문제가 수정되었습니다.
 * 2016.12.16 (v0.0.8) - 거울 스프라이트의 스케일 및 스케일 모드가 수정되었습니다.
 * 2017.06.10 (v0.0.9) - RMMV 1.5.0 이상에서 제대로 작동하지 않는 버그가 수정되었습니다.
 * 2018.08.21 (v0.0.10) - 긴 메소드를 작은 메소드로 분리하는 리팩토링 과정에서 문제가 있었는데 수정되었습니다.
 */
 /*~struct~MirrorBase:ko
  *
  * @param note
  * @text 노트 태그
  * @desc 노트 태그를 검출할 때 여기에 적힌 문자를 기준으로 찾습니다
  * @default MIRROR_TYPE
  * @type string
  *
  * @param w
  * @text 거울 내부의 가로 크기
  * @type number
  * @desc 거울 내부(마스크) 영역의 가로 크기를 지정해주세요.
  * @min 1
  *
  * @param h
  * @text 거울 내부의 세로 크기
  * @type number
  * @desc 거울 내부(마스크) 영역의 세로 크기를 지정해주세요.
  * @min 1
  *
  * @param mask_ox
  * @text 거울 내부의 오프셋 좌표 X
  * @type number
  * @desc 거울 내부(마스크) 영역의 오프셋 좌표를 지정합니다.
  * @default 0
  *
  * @param mask_oy
  * @text 거울 내부의 오프셋 좌표 Y
  * @type number
  * @desc 거울 내부(마스크) 영역의 오프셋 좌표를 지정합니다.
  * @default 0
  *
  * @param char_ox
  * @text 대상 캐릭터 오프셋 좌표 X
  * @type number
  * @desc 거울 내부에 비춰지는 대상 캐릭터의 좌표에 오프셋 좌표를 더합니다.
  * @default 0
  *
  * @param char_oy
  * @text 대상 캐릭터 오프셋 좌표 Y
  * @type number
  * @desc 거울 내부에 비춰지는 대상 캐릭터의 좌표에 오프셋 좌표를 더합니다.
  * @default 0
  *
  */

var Imported = Imported || {};
Imported.RS_MirrorArea = true;

var RS = RS || {};
RS.MirrorArea = RS.MirrorArea || {};
RS.MirrorArea.Params = RS.MirrorArea.Params || {};

function Sprite_Mirror() {
  this.initialize.apply(this, arguments);
}

(function ($) {

  "use strict";

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MirrorArea>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  $.allMirrors = JSON.parse(parameters['Mirrors']);

  // $.oMirror = JSON.parse(parameters['Mirror']);
  // $.oDresser = JSON.parse(parameters['Dresser']);
  $.fBlur = parseFloat(parameters['Blur'] || 0.0);
  $.allImagesVisible = true;
  $.allScale = new PIXI.Point(0.8, 0.8);

  //============================================================================
  // Game_Map
  //============================================================================

  /**
   * 
   * @param {Number} eventId 
   */
  Game_Map.prototype.findEventInMap = function (eventId) {
      var events = [];
      if(eventId === 0) return $gamePlayer;
      events = this._events.filter(function (e, i, a) {
        if(e && e.eventId() === eventId) return true;
        return false;
      });
      return events[0];
  };

  /**
   * 이벤트 목록 반환
   * @return {Array} result
   */
  Game_Map.prototype.getRealEvents = function () {
      var events = this._events;
      var last = events.slice(-1);
      var maxId = (last[0] || 0) && last[0].eventId();
      var result = [];
      for (var i = 0; i <= maxId; i++) {
        if(events[i]) {
          result.push(events[i]);
        } else {
          result.push(null);
        }
      }
      return result;
  };

  //============================================================================
  // Sprite_Mirror
  //============================================================================

  Sprite_Mirror.prototype = Object.create(Sprite_Character.prototype);
  Sprite_Mirror.prototype.constructor = Sprite_Mirror;

  Sprite_Mirror.prototype.initialize = function (character) {
      Sprite_Character.prototype.initialize.call(this, character);
      this._offset = {};
      this.scale = $.allScale;
  };

  Sprite_Mirror.prototype.setCharacterBitmap = function() {
      var smooth = true;
      this.bitmap = ImageManager.loadBitmap('img/characters/', this._characterName, null, smooth);
      this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
  };

  Sprite_Mirror.prototype.updateVisibility = function () {
      Sprite_Character.prototype.updateVisibility.call(this);
      this.visible = this.mask && $.allImagesVisible;
  };

  Sprite_Mirror.prototype.updatePosition = function() {
      var maskY = parseInt(this._offset['h']);
      this.x = this._character.screenX();
      this.y = this._character.screenY() - maskY - parseInt(this._offset['char_oy'] / 2);
      this.z = this._character.screenZ() + 4;
      this.updateMask();
  };

  var alias_Sprite_Mirror_characterPatternY = Sprite_Mirror.prototype.characterPatternY;
  Sprite_Mirror.prototype.characterPatternY = function() {
      var idx = alias_Sprite_Mirror_characterPatternY.call(this);
      return (3 ^ idx) === 1 ? 2 : (3 ^ idx) === 2 ? 1 : (3 ^ idx);
  };

  var alias_Sprite_Mirror_destroy = Sprite_Mirror.prototype.destroy;
  Sprite_Mirror.prototype.destroy = function () {
      alias_Sprite_Mirror_destroy.call(this);
      this._targetEvent = null;
      SceneManager._scene.getMirrorSprite().removeChild(this._maskSprite);
      this.mask = null;
  };

  Sprite_Mirror.prototype.setProperties = function (mask, targetEvent, offset) {

      this._targetEvent = targetEvent;
      this._offset = offset;

      var version = PIXI.VERSION || "4.5.4";
      version = version.replace(/[Vv]/, "");

      // MV v1.5.1 => PIXI v4.5.4
      // MV v1.4.1 => PIXI v4.0.3
      // MV v1.3.5 => PIXI v4.0.3
      // MV v1.2.0 => PIXI v2.2.9
      // MV v1.1.0 => PIXI v2.2.10
      // MV v1.0.1 => PIXI v2.2.9
      if(version >= '5.0.0') {
        this._maskSprite = mask;
      } else if(version >= "4.5.4") {
        if(Graphics._renderer) {
          this._maskSprite = new Sprite();          
          this._maskSprite.texture = Graphics._renderer.generateTexture(mask);
        } else {
          this._maskSprite = mask;
        }
      } else {
        this._maskSprite = mask;
      }

      SceneManager._scene.getMirrorSprite().addChild(this._maskSprite);

      this.mask = this._maskSprite;
  };

  Sprite_Mirror.prototype.updateMask = function () {
      if(this._targetEvent && this._maskSprite) {
        var x = this._targetEvent.screenX() - $gameMap.tileWidth() / 2 + parseInt(this._offset['mask_ox']);
        var y = this._targetEvent.screenY() - $gameMap.tileHeight() - parseInt(this._offset['mask_oy']);
        this._maskSprite.x = x;
        this._maskSprite.y = y;
      }
  };

  //============================================================================
  // Scene_Map
  //============================================================================

  var alias_Scene_Map_create = Scene_Map.prototype.create;
  Scene_Map.prototype.create = function () {
      alias_Scene_Map_create.call(this);
      this.createMirrorSprite();
  };

  Scene_Map.prototype.createMirrorSprite = function () {
      this._mirrorSprite = new Sprite();
      this.addChild(this._mirrorSprite);
  };

  Scene_Map.prototype.getMirrorSprite = function () {
      return this._mirrorSprite;
  };

  var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function () {
      alias_Scene_Map_terminate.call(this);
      this.removeChild(this._mirrorSprite);
  };

  //============================================================================
  // Spriteset_Map
  //============================================================================

  var alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer
  Spriteset_Map.prototype.createLowerLayer = function() {
      alias_Spriteset_Map_createLowerLayer.call(this);
      this.initMirrorMembers();
      this.findAllTypeMirrors();
  };

  Spriteset_Map.prototype.destroyMirrorTexture = function () {
      this._mirrorRenderTexture.destroy(true);
  };

  Spriteset_Map.prototype.initMirrorMembers = function () {
      this._mirrorCharacters = [];
      this._mirrorInitialized = false;
  };

  /**
   * Bitmap.snap 호출 시 캐릭터 스프라이트를 숨긴다.
   */
  var alias_Spriteset_Map_hideCharacters = Spriteset_Map.prototype.hideCharacters;
  Spriteset_Map.prototype.hideCharacters = function() {
      alias_Spriteset_Map_hideCharacters.call(this);
      for (var i = 0; i < this._mirrorCharacters.length; i++) {
          var sprite = this._mirrorCharacters[i];
          if (!sprite.isTile()) {
              sprite.hide();
          }
      }
  };

  /**
   * 마스크를 많이 사용하면 성능이 하락할 수 있다는 단점이 있다.
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} w 
   * @param {Number} h 
   */
  RS.MirrorArea.makeRoundedRect = function (x, y, w, h) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff, 0.9 );
    graphics.x = x;
    graphics.y = y;
    graphics.drawRoundedRect( 0, 0, w, h, 1 );
    graphics.endFill();
    return graphics;
  };

  Spriteset_Map.prototype.addChildMirrorImage = function(target, graphics, event, offset) {
    if(!this._mirrorCharacters) return false; // 객체 풀이 없으면
    if(!this._tilemap) return false; // 타일맵이 없으면

    // 좌우 반전 캐릭터 스프라이트를 생성한다.
    var child = new Sprite_Mirror( target );
    child.setProperties( graphics, event, offset );    

    // 캐릭터 객체 풀과 타일맵에 추가한다.
    this._mirrorCharacters.push( child );
    this._tilemap.addChild( child );

    return child;
    
  };

  Spriteset_Map.prototype.createMirrorImage = function (event, type, id) {

      var offset = type;
      var target = $gameMap.findEventInMap(id); // 이벤트를 찾는다.

      var x = event.screenX() - parseInt(offset['mask_ox']);
      var y = event.screenY() - parseInt(offset['mask_oy']);
      var w = parseInt(offset['w']);
      var h = parseInt(offset['h']);

      // 마스크 영역을 생성한다.
      var graphics = RS.MirrorArea.makeRoundedRect(x, y, w, h);

      this.addChildMirrorImage( target, graphics, event, offset);

      // 게임 플레이어라면 followers까지 모두 감안한다.
      if(target instanceof Game_Player) {
        $gamePlayer._followers.forEach(function (e, i, a) {
            this.addChildMirrorImage( e, graphics, event, offset);
        }, this);
      }

  };

  Spriteset_Map.prototype.findAllTypeMirrors = function() {
      var self = this;
      var id = -1;

      $gameMap.getRealEvents().forEach(function (event) {
          
        if(event === null || event === undefined) return false; // 이벤트가 정의되었는가
        if(event._erased) return false; // 이벤트 일시 삭제
        if(event.findProperPageIndex() < 0) return false; // 이벤트 시간 조건
        if(!event.page()) return false; // 페이지 존재 여부
        var eventlist = event.list();
        if(!eventlist) return false; // 이벤트 목록 존재 여부

        // 전체 이벤트 목록을 검색한다.
        eventlist.forEach(function (list, i ,a) {
          if(list.code === 108 || list.code === 408) {
            $.allMirrors.forEach(function (mirror) {
              var data = JSON.parse(mirror);
              // 노트 태그를 검색하고 ID 값을 추출한다.
              if(typeof data === 'object' && data.hasOwnProperty('note')) {
                if(list.parameters[0].match(new RegExp(`<(?:${data.note}).W*\:.\W*(.+?)>`, 'gi'))) {
                  id = parseInt(RegExp.$1);
                  // 유효한 ID라면 이미지 생성 성공.
                  if(id >= 0) self.createMirrorImage(event, data, id);
                }
              }

            }, this);
          }

        });

      }, this);

  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Mirror") {
        switch(args[0]) {
          case 'Show':
            $.allImagesVisible = true;
          break;
          case 'Hide':
            $.allImagesVisible = false;
          break;
        }
      }
  };

})(RS.MirrorArea.Params);
