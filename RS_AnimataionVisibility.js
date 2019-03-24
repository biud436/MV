/*:
 * @plugindesc <RS_AnimataionVisibility>
 * @author biud436
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

  Sprite_Animation.prototype.processTimingData = function(timing) {
    var duration = timing.flashDuration * this._rate;
    switch (timing.flashScope) {
    case 1:
        this.startFlash(timing.flashColor, duration);
        break;
    case 2:
        this.startScreenFlash(timing.flashColor, duration);
        break;
    case 3:
        this.startHiding(duration);
        break;
    }
    if (!this._duplicated && timing.se && this.isTargetReady()) {
        AudioManager.playSe(timing.se);
    }
  };
  
})();