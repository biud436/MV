/*:
 * @plugindesc <RS_FixedActSeqScreenZoom>
 * @author biud436
 *
 * @help
 * In the YEP_X_ActSeqPack3.js, 
 * This plugin allows you to show up the message window correctly when using zoom functionality.
 * But, I'm not sure why the x-coordinate of the window layer is to 400,000 or more when using zoom sequence.
 */

var Imported = Imported || {};
Imported.RS_FixedActSeqScreenZoom = true;

var RS = RS || {};
RS.FixedActSeqScreenZoom = RS.FixedActSeqScreenZoom || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_FixedActSeqScreenZoom>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    var alias_Spriteset_Battle_updatePosition = Spriteset_Battle.prototype.updatePosition;
    Spriteset_Battle.prototype.updatePosition = function() {
        alias_Spriteset_Battle_updatePosition.call(this);
        if(BattleManager._windowLayer) BattleManager._windowLayer.x = 0;
    };

})(RS.FixedActSeqScreenZoom);