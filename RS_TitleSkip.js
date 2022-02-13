//================================================================
// RS_TitleSkip.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc (v1.0.0) This plugin allows you to skip the title screen <RS_TitleSkip>
 * @author biud436
 *
 * @param Extra Option
 *
 * @param Reload
 * @parent Extra Option
 * @type select
 * @desc Set whether reload the page named index.html when pressing
 * the button called 'To Title' in the 'Game End' scene.
 * @default false
 * @option true (maybe this takes a long period of the time)
 * @value true
 * @option false
 * @value false
 *
 * @help
 */
(() => {
    const pluginParams = $plugins.filter((i) => {
        return i.description.contains("<RS_TitleSkip>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    const params = {
        isReload: Boolean(parameters["Reload"] === "true"),
    };

    Scene_Boot.prototype.startNormalGame = function () {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
        Window_TitleCommand.initCommandPosition();
    };

    Scene_GameEnd.prototype.commandToTitle = function () {
        this.fadeOutAll();
        if (params.isReload) {
            SceneManager.reloadGame();
        } else {
            SceneManager.goto(Scene_Boot);
        }
    };
})();
