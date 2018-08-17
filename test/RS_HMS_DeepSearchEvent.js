/*:
 * @plugindesc <RS_HMS_DeepSearchEvent>
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_HMS_DeepSearchEvent = true;

var RS = RS || {};
RS.HMS_DeepSearchEvent = RS.HMS_DeepSearchEvent || {};

(function() {

    (function(fn) {

        // - DOM을 직접 다룰 수 없음
        // - Window의 기본 메서드와 속성을 사용할 수 없음
        // - Worker.postMessage() 메서드를 통해 데이터를 전송
        // - Worker.onmessage 이벤트 핸들러 Attribute를 통해 응답할 수 있습니다. (전송되는 데이터는 공유되지 않으며 복제를 통해 전달되게 됩니다)
        
        var blob = new Blob(['('+fn.toString()+')()'], {type: "text/javascript"});
        var fs = require('fs');
        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        var filename = path.join(base, 'js', 'plugins', 'RS_MessageSystem.js');  

        if(window.Worker && !fs.existsSync(filename)) {              
            var myWorker = new Worker(window.URL.createObjectURL(blob));

            myWorker.onmessage = function(e) {
                var data = e.data;
                if(data) {
                    fs.writeFile(filename, data, function(err) {
                        if(err) console.warn(err);
                        window.alert("다운로드 완료");
                    });                        
                }
                window.URL.revokeObjectURL(blob);
            };
        }

    })(function() {
        self.onmessage = function(e) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://github.com/biud436/MV/raw/master/RS_MessageSystem.js", false);
            xhr.overrideMimeType("text/javascript");
            xhr.onload = function() {
                if(xhr.status < 400) {
                    postMessage(xhr.responseText);                    
                }
            }
            xhr.send(null);
            return;
        }
    });

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
