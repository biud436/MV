/* eslint-disable no-eval */
//================================================================
// RS_EventTouch.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to make your events clickable from anywhere.
 * @author biud436
 *
 * @param Event Regex
 * @desc This is a regular expression to check the note tag.
 * @default /Event[ ]*Click/ig
 *
 * @help
 * This plugin allows you to make your events clickable from anywhere.
 * By adding specific note tags to your events, you can make them actionable regardless of distance.
 *
 * Note Tag (Comment):
 * Event Click
 *
 * You do this by simply writing the text `Event Click` without the < and > symbols to Event Comment.
 *
 * 1. Open the event editor and add a comment.
 * 2. Write the text "Event Click" in the comment (without the < and > symbols).
 * 3. Save the event.
 * 4. Now the event can be triggered from anywhere using the mouse or touch input.
 *
 * ===============================================================================
 * Change Log
 * ===============================================================================
 * 2016.07.03 (v1.0.0): First Release.
 * 2017.01.30 (v1.0.1): Fixed a bug that caused issues when using event starting conditions.
 * 2017.01.31 (v1.0.2): Fixed the bug is not working this plugin properly.
 * 2018.06.20 (v1.0.3): Resolved an issue where the plugin wouldn't properly check for events with invalid pages.
 * 2024.02.27 (v1.0.4): Updated description.
 */

(() => {
    const parameters = PluginManager.parameters('RS_EventTouch');
    const regex = eval(parameters['Event Regex']) || /Event[ ]*Click/gi;

    Game_Map.prototype.executeTouchEvent = function () {
        if (TouchInput.isTriggered()) {
            const x = $gameMap.canvasToMapX(TouchInput._x);
            const y = $gameMap.canvasToMapY(TouchInput._y);
            const id = $gameMap.eventIdXy(x, y);
            const evt = this.event(id);
            if (!evt) return false;
            if (evt.findProperPageIndex() < 0) return false;
            if (!evt.page()) return false;
            evt.list().forEach(i => {
                if (i.code === 108 || i.code === 408) {
                    if (i.parameters[0].match(regex)) {
                        if (evt._trigger < 3) evt.start();
                    }
                }
            });
        }

        return true;
    };

    const aliasGameMapUpdate = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        aliasGameMapUpdate.call(this, sceneActive);
        if (sceneActive) this.executeTouchEvent();
    };
})();
