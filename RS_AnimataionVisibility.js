/*:
 * @plugindesc <RS_AnimataionVisibility>
 * @author biud436
 * @help
 * =====================================================
 * Version Log
 * =====================================================
 * 2019.03.24 (v1.0.0) - First Release.
 */
 
var Imported = Imported || {};
Imported.RS_AnimataionVisibility = true;
 
(function() {
  
  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<RS_AnimataionVisibility>");
  })[0].parameters;
  
  var alias_Sprite_Animation_update = Sprite_Animation.prototype.update;
  Sprite_Animation.prototype.update = function() {
    alias_Sprite_Animation_update.call(this);
    this.updateVisibility();
  };

  Sprite_Animation.prototype.isTargetReady = function() {
    if(!this._target) return false;
    if(!(this._target instanceof Sprite_Character)) return false;
    var target = this._target._character;
    var isActivated = (target.findProperPageIndex() > -1);
    var isTransparent = target.isTransparent();
    var isErased = target._erased || !target._characterName;

    return isActivated && !isTransparent && !isErased;

  };
  
  Sprite_Animation.prototype.updateVisibility = function() {
    this.visible = this.isTargetReady();
  };

  var alias_Sprite_Animation_processTimingData = Sprite_Animation.prototype.processTimingData;
  Sprite_Animation.prototype.processTimingData = function(timing) {
    if(!this.isTargetReady()) return;
    alias_Sprite_Animation_processTimingData.call(this, timing);
  };
  
})();