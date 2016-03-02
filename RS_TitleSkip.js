/*:
 * RS_TitleSkip.js
 * @plugindesc Title Skip
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_TitleSkip = true;

(function() {

  Scene_Boot.prototype.start = function() {
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
  
})()
