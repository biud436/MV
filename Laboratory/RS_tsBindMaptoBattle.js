/*:
 * @plugindesc RS_tsBindMaptoBattle
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_tsBindMaptoBattle = true;

(function () {

  Spriteset_Battle.prototype.createParallax = Spriteset_Map.prototype.createParallax;
  Spriteset_Battle.prototype.createTilemap = Spriteset_Map.prototype.createTilemap;
  Spriteset_Battle.prototype.loadTileset = Spriteset_Map.prototype.loadTileset;
  Spriteset_Battle.prototype.createShadow = Spriteset_Map.prototype.createShadow;
  Spriteset_Battle.prototype.createWeather = Spriteset_Map.prototype.createWeather;
  Spriteset_Battle.prototype.updateTileset = Spriteset_Map.prototype.updateTileset;
  Spriteset_Battle.prototype._canvasReAddParallax = Spriteset_Map.prototype._canvasReAddParallax;
  Spriteset_Battle.prototype.updateParallax = Spriteset_Map.prototype.updateParallax;
  Spriteset_Battle.prototype.updateTilemap = Spriteset_Map.prototype.updateTilemap;
  Spriteset_Battle.prototype.updateShadow = Spriteset_Map.prototype.updateShadow;
  Spriteset_Battle.prototype.updateWeather = Spriteset_Map.prototype.updateWeather;

  Spriteset_Battle.prototype.createLowerLayer = function() {
      Spriteset_Base.prototype.createLowerLayer.call(this);
      if(this.battleback1Name() === '') {
        this.createBackground();
        this.createParallax();
        this.createTilemap();
        this.createShadow();
        this.createWeather();
        this.createBattleField();
        this.createBattleback();
      } else {
        this.createBackground();
        this.createBattleField();
        this.createBattleback();
      }
      this.createEnemies();
      this.createActors();
  };

  Spriteset_Battle.prototype.update = function() {
      Spriteset_Base.prototype.update.call(this);
      this.updateActors();
      if(this.battleback1Name() !== '') {
        this.updateBattleback();
      } else {
        this.updateTileset();
        $gameMap.updateParallax();
        this.updateParallax();
        this.updateTilemap();
        this.updateShadow();
        this.updateWeather();
      }
  };

})();
