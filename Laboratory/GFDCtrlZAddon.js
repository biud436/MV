/*:
 * @plugindesc This plugin adds undo functionality to the Grid Free Doodads plugin <GFDCtrlZAddon>
 * @author biud436
 *
 * @param maxCounts
 * @desc
 * @default 5
 *
 * @help
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2016.12.05 (v1.0.0) - First Release.
 */

 var Imported = Imported || {};
 Imported.GFDCtrlZAddon = true;

(function() {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<GFDCtrlZAddon>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var gDoodadsStack = [];
  var keyboardManager = {};
  var isClicked = false;

  var maxCounts = parseInt(parameters['maxCounts'] || 5);

  var alias_DoodadManager_addNew = DoodadManager.addNew;
  DoodadManager.addNew = function(doodad) {
    if(gDoodadsStack.length >= maxCounts) gDoodadsStack.shift();
    gDoodadsStack.push(doodad);
    alias_DoodadManager_addNew.call(this, doodad);
  };

  var alias_DoodadManager_clearMap = DoodadManager.clearMap;
  DoodadManager.clearMap = function() {
    alias_DoodadManager_clearMap.call(this);
    // Empty Data
    gDoodadsStack = [];
    keyboardManager = {};
    isClicked = false;
  };

  document.addEventListener('keydown', function(e) {
     keyboardManager[e.keyCode] = true;
  }, false);

  document.addEventListener('keyup', function(e) {
     keyboardManager[e.keyCode] = false;
     isClicked = false;
  }, false);

  var alias_Scene_Map_update = Scene_Map.prototype.updateScene;
  Scene_Map.prototype.updateScene = function() {
    if ($gameTemp._modeGFD) {
      DoodadManager.revertOneStep();
      return;
    }
    alias_Scene_Map_update.call(this);
  };

  DoodadManager.revertOneStep = function() {
    if(keyboardManager[90] && keyboardManager[17] && !isClicked) {
      var d = gDoodadsStack.pop();
      if(d) DoodadManager.delete(d);
      isClicked = true;
    }
  };

})();
