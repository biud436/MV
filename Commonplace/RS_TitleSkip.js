//================================================================
// RS_TitleSkip.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_TitleSkip.js
 * @plugindesc (v1.01) This plugin allows you to skip the title screen <RS_TitleSkip>
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
 * =================================================================
 * Version Log
 * =================================================================
 * 2017.10.09 (v1.01) - Added a new plugin parameter called 'Reload'
 */

var Imported = Imported || {};
Imported.RS_TitleSkip = true;

(function () {
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_TitleSkip>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  var isReload = Boolean(parameters['Reload'] === 'true');

  //============================================================================
  // Scene_Boot
  //============================================================================

  Scene_Boot.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
      DataManager.setupBattleTest();
      SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
      DataManager.setupEventTest();
      SceneManager.goto(Scene_Map);
    } else {
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
      Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
  };

  //============================================================================
  // Scene_GameEnd
  //============================================================================

  Scene_GameEnd.prototype.commandToTitle = function () {
    this.fadeOutAll();
    if (isReload) {
      location.reload();
    } else {
      SceneManager.goto(Scene_Boot);
    }
  };
})();
