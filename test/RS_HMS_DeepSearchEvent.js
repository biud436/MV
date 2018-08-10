/*:
 * @plugindesc <RS_HMS_DeepSearchEvent>
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_HMS_DeepSearchEvent = true;

var RS = RS || {};
RS.HMS_DeepSearchEvent = RS.HMS_DeepSearchEvent || {};

(function() {

    (function() {

        var fs = require('fs');
        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        var filename = path.join(base, 'js', 'plugins', 'RS_MessageSystem.js');       
        
        if(!fs.existsSync(filename)) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://github.com/biud436/MV/raw/master/RS_MessageSystem.js", true);
            xhr.overrideMimeType("text/javascript");
            xhr.onload = function() {
                if(xhr.status < 400) {
                    fs.writeFile(filename, xhr.responseText, function(err) {
                        if(err) console.warn(err);
                        alert("다운로드 완료!\r\n플러그인 관리에서 RS_MessageSystem를 추가하세요!");
                    });
                }
            }
            xhr.send(null);
            return;
        }
    })();

    Window_Message.prototype.setupOwner = function(sign) {
        var self = this;
        switch(sign) {
          case -1: // 플레이어
          $gameMap.setMsgOwner($gamePlayer);
          break;
          case 0: // 이 이벤트
          $gameMap.setMsgOwner($gameMap.getMsgEvent());
          break;
          default:
          if(SceneManager._scene instanceof Scene_Battle) { // 전투 중인가?
            if(/(?:ENEMIES)[ ]*:(.*)/.test(sign)) { // 적
              $gameMap.setMsgOwner( self.getSpriteEnemies(parseInt(RegExp.$1)) );
            }
            if(/(?:ACTORS)[ ]*:(.*)/.test(sign)) { // 아군
              $gameMap.setMsgOwner( self.getSpriteActors(parseInt(RegExp.$1)) );
            }
          } else { // 맵 이벤트
            var events = $gameMap.events();
            var event = events.filter(function(ev) { return ev.eventId() === sign; }, this)[0];
            if(event) $gameMap.setMsgOwner(event);
          }
          break;
        }
      };
 
})();
