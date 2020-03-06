//================================================================
// RS_SimpleGameGuard.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to reject requesting a specific file during the game. <RS_SimpleGameGuard>
 * @author biud436
 * 
 * @param Message
 * @type string
 * @desc Specify the error message
 * @default Abnormal behavior (unencrypted) was detected.
 * 
 * @param Test Mode
 * @type boolean
 * @desc Check that whether the test mode is valid
 * @default true
 * @on true
 * @off false
 * 
 * @param File Rules
 * @type string[]
 * @desc Specify the File Rules
 * @default ["\\/img\\/.*\\/.*\\.png","\\/audio\\/.*\\/.*\\.(?:m4a|ogg|wav)"]
 * 
 * @help
 * ================================================================
 * Version Log
 * ================================================================
 * 2020.03.06 (v1.0.0) - First Release.
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

    RS.SimpleGameGuard.Params = {};

    RS.SimpleGameGuard.Params.message = parameters["Message"];
    RS.SimpleGameGuard.Params.isValidTestMode = Boolean(parameters["Test Mode"] === "true");
    
    RS.SimpleGameGuard.Params.fileNotes = JSON.parse(parameters["File Rules"]);

    class Guard extends Scene_Boot {

        constructor() {
            super();
            this.run();
        }

        run() {
            if(!Utils.isNwjs()) return;
            if(RS.SimpleGameGuard.Params.isValidTestMode) return;

            chrome.webRequest.onBeforeRequest.addListener(details => {

                if (details.tabId < 0) {
                    return;
                }
                    
                chrome.tabs.get(details.tabId, tab => {
                    if(!tab) {
                        chrome.tabs.executeScript(details.tabId, { 
                            code: `throw new Error("Cannot find the tab ${tab.id}");` 
                        }, () => { console.log("Injected"); });
                    }
            
                    const method = details.method; // GET, POST
                    const resUrl = details.url;

                    RS.SimpleGameGuard.Params.fileNotes.forEach(rules => {
                        const re = new RegExp(rules, 'gi');
                        if(re.exec(resUrl)) {
                            chrome.tabs.executeScript(details.tabId, { 
                                code: `throw new Error("${RS.SimpleGameGuard.Params.message}");` 
                            }, () => { console.log("Injected"); });                            
                        }
                    });
                    
                });
            
            }, {urls: ["<all_urls>"]});
        }
    }

    window.Scene_Boot = Guard;
    
})(RS.SimpleGameGuard);