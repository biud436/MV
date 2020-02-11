/*:
 * @plugindesc <RS_InternalMenu>
 * @author biud436
 * @help 
 * This plugin does not provide plugin commands.
 */

var Imported = Imported || {};
Imported.RS_InternalMenu = true;

var RS = RS || {};
RS.InternalMenu = RS.InternalMenu || {};

(function($) {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_InternalMenu>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    //==============================================================
    // Scene_InternalMenu
    //==============================================================

    class Scene_InternalMenu extends Scene_Menu {

        /**
         * @param {Scene_Map} parent 
         */
        prepare() {
            this.create();
            this.start();               
        }

        createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = new Bitmap(1, 1);
            this.addChild(this._backgroundSprite);            
        }

        update() {
            /**
             * @type {Scene_Map} parent
             */
            const parent = this.parent;
            if(!parent) return;
            const active = parent.isActive();
            if(active) super.update();
        }

        popScene() {
            /**
             * @type {Scene_Map} parent
             */            
            const parent = this.parent;
            if(parent) parent.terminateSubMenu();
        }

    };


    //==============================================================
    // Game_System
    //==============================================================    

    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        alias_Game_System_initialize.call(this);
        this._isOpeningMenu = false;
    };

    Game_System.prototype.openMenu = function() {
        this._isOpeningMenu = true;
    };

    Game_System.prototype.closeMenu = function() {
        this._isOpeningMenu = false;
    };    

    Game_System.prototype.isOpeningMenu = function() {
        return this._isOpeningMenu;
    };    

    //==============================================================
    // Game_Interpreter
    //==============================================================      

    Game_Interpreter.prototype.command351 = function() {
        if (!$gameParty.inBattle()) {
            SceneManager._scene.createSubMenu();
        }
        return true;
    };    

    //==============================================================
    // Scene_Map
    //==============================================================

    Scene_Map.prototype.createSubMenu = function() {
        if(this._menuScene) this.terminateSubMenu();

        this._menuScene = new Scene_InternalMenu();
        this._menuScene.prepare();
        
        Window_MenuCommand.initCommandPosition();     

        this._menuScene._active = true;
        
        this.addChild(this._menuScene);

        $gameSystem.openMenu();
    };

    Scene_Map.prototype.terminateSubMenu = function() {
        if(!this._menuScene) return;

        this._menuScene._active = false;
        this._menuScene.terminate();
        this.removeChild(this._menuScene);
        
        $gameSystem.closeMenu();
    };

    Scene_Map.prototype.callMenu = function() {
        if(this._menuScene) {
           return; 
        }

        SoundManager.playOk();

        this.createSubMenu();
        
        if($gameTemp.isDestinationValid()) {
            $gameTemp.clearDestination();
        }

        if(this._mapNameWindow) {
            this._mapNameWindow.hide();
        }

        this._waitCount = 2;
        
    };

    var alias_Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function() {
        if($gameSystem.isOpeningMenu()) return;
        alias_Scene_Map_processMapTouch.call(this);
    };
    
})(RS.InternalMenu);