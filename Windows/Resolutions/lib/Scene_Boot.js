//============================================================================
// Scene_Boot
//============================================================================

var alias_Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function () {
    alias_Scene_Boot_create.call(this);
    SceneManager.initResolution();
};