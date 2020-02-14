//================================================================
// RS_EX_ToolKit.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_EX_ToolKit>
 * @author biud436
 *          
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_EX_ToolKit = true;

var RS = RS || {};
RS.EX_ToolKit = RS.EX_ToolKit || {};

(function($) {
    
    "use strict";
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_EX_ToolKit>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;
    
    if(Imported.RS_HangulInput) {
            
        /**
         * 문자를 입력 받고 맵에서 특정 이름을 가진 이벤트를 찾아냅니다.
         * 찾아낸 이벤트의 위치까지 화면을 스크롤하고 말풍선을 띄웁니다.
         */
        Game_Interpreter.prototype.moveToTargetEvent = function() {
            let joinedText = $gameVariables.value(RS.HangulInput.Params.variableId);
            let ret = $gameMap.events().filter(e => e.event().name === joinedText);
            if(ret && ret[0]) {
                const target = ret[0];
                
                var sx = $gameMap.deltaX($gamePlayer.x, target.x);
                var sy = $gameMap.deltaY($gamePlayer.y, target.y);
                
                var dir = 0;
                var dist = 0;
                var speed = 6;     
                var minDist = 6;
                
                var dist2 = $gameMap.distance($gamePlayer.x, $gamePlayer.y, target.x, target.y);
                
                var addScroll = (...args) => {
                    
                    this._list.push({
                        "code": 204,
                        "indent": 0,
                        "parameters": [
                            args[0],
                            args[1],
                            args[2]
                        ]
                    });
                    
                };
                
                var addList = (...args) => {
                    args.forEach(e => {
                        this._list.push(e);
                    })
                };
                
                if(dist2 >= minDist) {
                    
                    this._list.splice(-1, 1);
                    
                    if(Math.abs(sx) >= minDist) {
                        dir = sx < 0 ? 6 : sx > 0 ? 4 : 0;
                        dist = Math.abs(sx);      
                        addScroll(dir, dist, speed);
                    }
                    
                    if(Math.abs(sy) >= minDist) {
                        dir = sy < 0 ? 2 : sy > 0 ? 8 : 0;
                        dist = Math.abs(sy);                   
                        addScroll(dir, dist, speed);
                    }
                    
                    addList(
                        { 
                            "code": 230, // 대기
                            "indent": 0,
                            "parameters": [60]
                        }, { 
                            "code": 101, // 문장의 표시
                            "indent": 0,
                            "parameters": [
                                "",
                                0,
                                0,
                                2
                            ]
                        }, {
                            "code": 101,
                            "indent": 0,
                            "parameters": [
                                "",
                                0,
                                0,
                                2
                            ]
                        }, {
                            "code": 401,
                            "indent": 0,
                            "parameters": [
                                `\\말풍선[${target.eventId()}] 아니 내 이름을 어떻게 알았지?`
                            ]
                        }, { // 끝
                            "code": 0,
                            "indent": 0,
                            "parameters": []
                        }
                        );
                    }
                }
        };    
    }

})(RS.EX_ToolKit);