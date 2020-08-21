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
 *
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
      
})(RS.Focus);