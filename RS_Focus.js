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
 * @plugindesc This plugin allows you to maintain the window focus during the game. <RS_Focus>
 * @author biud436
 * @url https://biud436.tistory.com/
 *
 * @help
 * =======================================================================
 * Change Log
 * =======================================================================
 * 2021.05.08 (v1.0.1) :
 * - Removed the strikethrough on the KeyboardEvent.keycode.
 */
var Imported = Imported || {};
Imported.RS_Focus = true;

var RS = RS || {};
RS.Focus = RS.Focus || {};

(($) => {
    "use strict";

    const pluginParams = $plugins.filter((i) => {
        return i.description.contains("<RS_Focus>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    SceneManager.isGameActive = function () {
        try {
            if (Utils.isNwjs()) return true;
            return window.top.document.hasFocus();
        } catch (e) {
            // SecurityError
            return true;
        }
    };

    /**
     * @param {KeyboardEvent} event
     */
    SceneManager.onKeyDown = function (event) {
        const code = event.code || event.key;

        if (!event.ctrlKey && !event.altKey) {
            switch (code) {
                case "F5": // F5
                    this.reloadGame();
                    break;
                case "F8": // F8
                    this.showDevTools();
                    break;
                case "F12": // F12
                    event.preventDefault();
                    break;
            }
        }
    };
})(RS.Focus);
