//================================================================
// RS_SimpleGameGuard.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_SimpleGameGuard>
 * @author biud436
 *          
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_SimpleGameGuard = true;

var RS = RS || {};
RS.SimpleGameGuard = RS.SimpleGameGuard || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_SimpleGameGuard>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    class Guard extends Scene_Boot {

        constructor() {
            super();
            this.run();
        }

        run() {
            if(!Utils.isNwjs()) return;
            if(Utils.isOptionValid("test")) return;

            chrome.webRequest.onBeforeRequest.addListener(details => {
                if (details.tabId < 0)
                    return;
                    
                console.log([
                    `  tabId: ${details.tabId}`,
                    `  ${details.method} ${details.url}`
                ].join('\n'));
            
                chrome.tabs.get(details.tabId, tab => {
                    if(!tab) {
                        throw new Error(`Cannot find tab ${details.tabId}`);
                    }

                    console.log(`탭 제목: ${tab.title}`);
                    console.log(`탭 URL: ${tab.url}`);
                    console.log(`리소스 URL : ${details.url}`);
            
                    const resUrl = details.url;

                    if( /\/img\/.*\/.*\.png/gi.exec(resUrl) ||
                        /\/audio\/.*\/.*\.(?:m4a|ogg|wav)/gi.exec(resUrl)) {
                        chrome.tabs.executeScript(details.tabId, { 
                            code: `throw new Error("암호화를 해제했군요. 게임을 이용할 수 없습니다.");` 
                        }, () => { console.log("스크립트를 삽입했습니다.")});
                    }               
                    
                });
            
            }, {urls: ["<all_urls>"]});
        }
    }

    window.Scene_Boot = Guard;
    
})(RS.SimpleGameGuard);