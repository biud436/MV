//================================================================
// RS_Focus.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc <RS_Focus>
 * @author biud436
 * @url https://biud436.tistory.com/
 *          
 * @help
 */
/*:ko
 * @target MZ
 * @plugindesc <RS_Focus>
 * @author biud436
 * @url https://biud436.tistory.com/
 *          
 * @help
 * 이 플러그인을 사용하면 포커스가 아닌 상태에서도 게임 루프가 중단되지 않습니다.
 * 또한 F12 버튼을 눌렀을 때 개발자 도구가 뜨는 것을 방지합니다.
 */
var Imported = Imported || {};
Imported.RS_Focus = true;

var RS = RS || {};
RS.Focus = RS.Focus || {};

(($) => {
    
    "use strict";

    const pluginParams = $plugins.filter(i => {
        return i.description.contains('<RS_Focus>');
    });

    const pluginName = (pluginParams.length > 0) && pluginParams[0].name;
    const parameters = (pluginParams.length > 0) && pluginParams[0].parameters;    

    SceneManager.isGameActive = function() {
        try {
            if(Utils.isNwjs()) return true;
            return window.top.document.hasFocus();
        } catch (e) {
            // SecurityError
            return true;
        }
    };

    SceneManager.onKeyDown = function(event) {
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 116: // F5
                    this.reloadGame();
                    break;
                case 119: // F8
                    this.showDevTools();
                    break;
                case 123: // F12 
                    event.preventDefault();
                    break;
            }
        }
    };
    
      
})(RS.Focus);