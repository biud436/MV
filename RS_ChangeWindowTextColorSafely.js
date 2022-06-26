//================================================================
// RS_ChangeWindowTextColorSafely.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to change the text color for window as you desired. <RS_ChangeWindowTextColorSafely>
 * @author biud436
 *
 * @param windowList
 * @text Window List
 * @type note
 * @desc Refer to a help documentation
 * @default ""
 *
 * @help
 *
 * We're going to define each window a different special color. To quickly define,
 * We must use to define a notetag in the plugin parameter called 'Window List'
 *
 *    <Window_ItemList normalColor #ff0000>
 *    <Window_SkillList normalColor #ffff00>
 *    <Window_SkillList crisisColor #ff0000>
 *
 * Note tags provide the information likes as a class name and method name,
 * color value for window. You can see how the text color for window that is
 * changed in the game.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.12.21 (v1.0.0) - First Release.
 */

(() => {
    let parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_ChangeWindowTextColorSafely>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    const Imported = window.Imported || {};
    Imported.RS_ChangeWindowTextColorSafely = true;

    const RS = window.RS || {};
    RS.Utils = RS.Utils || {};

    RS.Utils.jsonParse = function (str) {
        const retData = JSON.parse(str, function (k, v) {
            try {
                return RS.Utils.jsonParse(v);
            } catch (e) {
                return v;
            }
        });
        return retData;
    };

    const defaultWindowClasses = RS.Utils.jsonParse(parameters.windowList);

    Utils.changeWindowTextColorSafely = function (NOTETAGS) {
        let clsName = '';
        let funcName = '';
        let color = '';
        let done = false;

        const notetags = NOTETAGS.split(/[\r\n]+/);

        notetags.forEach(note => {
            if (note.match(/<(.*)[ ](.*)[ ](.*)>/)) {
                clsName = String(RegExp.$1);
                funcName = String(RegExp.$2);
                color = String(RegExp.$3);
                done = true;
            }

            if (done) {
                const CLASS_NAME = window[clsName];
                const FUNC_NAME = funcName.slice(0);
                const COLOR_NAME = color.slice(0);

                if (typeof CLASS_NAME === 'function') {
                    const prototypeName = CLASS_NAME.prototype[FUNC_NAME];

                    if (typeof prototypeName === 'function') {
                        CLASS_NAME.prototype[funcName] = function () {
                            return COLOR_NAME;
                        };
                    }
                }
            }
        });
    };

    Utils.changeWindowTextColorSafely(defaultWindowClasses);
})();
