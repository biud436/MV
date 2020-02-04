//============================================================================
// Game_System
//============================================================================

var alias_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._lastScreenManagerItem = 0;
};