/*:
 * @plugindesc This plugin adds undo functionality to Yanfly Grid Free Doodads plugin <GFDCtrlZAddon>
 * @author biud436
 *
 * @param maxCounts
 * @desc
 * @default 5
 *
 * @help
 * Ctrl + Z - Undo
 * Ctrl + Alt - Grid Lock
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2016.12.05 (v1.0.0) - First Release.
 * 2016.12.06 (v1.0.1) - Added New Key and description.
 */

 var Imported = Imported || {};
 Imported.GFDCtrlZAddon = true;

 var Yanfly = Yanfly || {};
 Yanfly.Param = Yanfly.Param || {};

(function() {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<GFDCtrlZAddon>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var gDoodadsStack = [];
  var keyboardManager = {};
  var isClicked = false;
  var isGridLockMode;

  var maxCounts = parseInt(parameters['maxCounts'] || 5);

  //============================================================================
  // DoodadManager
  //============================================================================

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
    isGridLockMode = Yanfly.Param.GFDGridSnap;
  };

  DoodadManager.revertOneStep = function() {
    // This executes when you press Ctrl + Z key
    if(keyboardManager[90] && keyboardManager[17] && !isClicked) {
      var d = gDoodadsStack.pop();
      if(d) DoodadManager.delete(d);
      isClicked = true;
    }
    // This executes when you press Ctrl + Alt key
    if(keyboardManager[17] && keyboardManager[18] && !isGridLockMode) {
      isGridLockMode = true;
      DoodadManager.setGridLockMode(isGridLockMode);
    }
  };

  //============================================================================
  // Scene_Map
  //============================================================================

  document.addEventListener('keydown', function(e) {
     keyboardManager[e.keyCode] = true;
  }, false);

  document.addEventListener('keyup', function(e) {
     keyboardManager[e.keyCode] = false;
     isClicked = false;
     if(isGridLockMode) {
       DoodadManager.setGridLockMode(false);
       isGridLockMode = false;
     }
  }, false);

  var alias_Scene_Map_update = Scene_Map.prototype.updateScene;
  Scene_Map.prototype.updateScene = function() {
    if ($gameTemp._modeGFD) {
      DoodadManager.revertOneStep();
      return;
    }
    alias_Scene_Map_update.call(this);
  };

  //============================================================================
  // Window_GFD_Canvas (Override)
  //============================================================================

  Window_GFD_Canvas.prototype.getMaxLines = function () {
      return 7;
  };

  Window_GFD_Canvas.prototype.__originalRefresh = function (dx, dy, dw, dh) {
    this.drawDarkRect(0, dy, this.contents.width, dh);
    dy += this.lineHeight() / 2;
    var text = 'Q E - Layer -/+';
    this.drawText(text, dx, dy + this.lineHeight() * 0, dw);
    var text = 'Layer: ' + this.currentLayer();
    this.drawText(text, dx, dy + this.lineHeight() * 0, dw, 'right');
    if (DoodadManager._editMode) {
      var text = 'G - Grid Settings';
    } else {
      var text = 'T - Tweak Settings';
    }
    this.drawText(text, dx, dy + this.lineHeight() * 1, dw);
    var text = 'W A S D - Move Screen';
    this.drawText(text, dx, dy + this.lineHeight() * 2, dw);
    var text = 'X: ' + Yanfly.Util.toGroup(this.currentDoodadX());
    this.drawText(text, dx, dy + this.lineHeight() * 2, dw, 'right');
    var text = '↑←↓→ - Precision Move';
    this.drawText(text, dx, dy + this.lineHeight() * 3, dw);
    var text = 'Y: ' + Yanfly.Util.toGroup(this.currentDoodadY());
    this.drawText(text, dx, dy + this.lineHeight() * 3, dw, 'right');
    var text = 'Z X - Place / Return';
    this.drawText(text, dx, dy + this.lineHeight() * 4, dw);
  };

  Window_GFD_Canvas.prototype.__multiplyText = function (dx, dy, dw, dh) {
    dy += this.lineHeight() / 2;
    var text = 'Ctrl + Z - Undo';
    this.drawText(text, dx, dy + this.lineHeight() * 1, dw, 'right');
    var text = 'Ctrl + Alt - Grid Lock';
    this.drawText(text, dx, dy + this.lineHeight() * 5, dw, 'left');
  };

  Window_GFD_Canvas.prototype.refresh = function() {
    this.contents.clear();
    var dh = this.lineHeight() * this.getMaxLines();
    var dy = this.contents.height - dh;
    var dx = Window_Base._faceWidth;
    var dw = this.contents.width - dx * 2;
    this.__originalRefresh(dx, dy, dw, dh);
    this.__multiplyText(dx, dy, dw, dh);
  };

  Window_GFD_Canvas.prototype.isReduceOpacity = function() {
    var y = this.contents.height - this.lineHeight() * this.getMaxLines();
    if (TouchInput._mouseOverY > y) return true;
    if (DoodadManager._manualMove && DoodadManager._manualY > y) return true;
    return false;
  };

})();
