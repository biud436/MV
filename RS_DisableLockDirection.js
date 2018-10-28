/*:
* @plugindesc <RS_DisableLockDirection>
* @author biud436
* 
* @param Switches
* @type switch
* @desc Speicfy the index of desired swith.
* @default 1
*
* @help
* There is no description.
*/

var Imported = Imported || {};
Imported.RS_DisableLockDirection = true;

(function() {
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_DisableLockDirection>');
      });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;
    var switchNumber = Number(parameters['Switches'] || 1);
    
    Game_Event.prototype.lock = function() {
        if (!this._locked) {
            this._prelockDirection = this.direction();
            if($gameSwitches.value(switchNumber)) {
                this.turnTowardPlayer();
            }
            this._locked = true;
        }
    };
    
})();