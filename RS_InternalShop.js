/*:
 * @plugindesc This plugin allows you to open up the internal shop in the map <RS_InternalShop>
 * @author biud436
 * @help 
 * This plugin does not provide plugin commands.
 */

var Imported = Imported || {};
Imported.RS_InternalShop = true;

var RS = RS || {};
RS.InternalShop = RS.InternalShop || {};

(function($) {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_InternalShop>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    //==============================================================
    // Scene_InternalShop
    //==============================================================

    class Scene_InternalShop extends Scene_Shop {

        createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = new Bitmap(1, 1);
            this.addChild(this._backgroundSprite);            
        }

        popScene() {
            if(this.parent) {
                this.parent.terminateSubShop();
            }
        }

        create() {
            super.create();
        }

    };


    //==============================================================
    // Game_System
    //==============================================================    

    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        alias_Game_System_initialize.call(this);
        this._isOpeningShop = false;
    };

    Game_System.prototype.openShop = function() {
        this._isOpeningShop = true;
    };

    Game_System.prototype.closeShop = function() {
        this._isOpeningShop = false;
    };    

    Game_System.prototype.isOpeningShop = function() {
        return this._isOpeningShop;
    };    

    //==============================================================
    // Game_Interpreter
    //==============================================================      

    Game_Interpreter.prototype.command302 = function() {
        if (!$gameParty.inBattle()) {
            var goods = [this._params];
            while (this.nextEventCode() === 605) {
                this._index++;
                goods.push(this.currentCommand().parameters);
            }
            if(SceneManager._scene instanceof Scene_Map) {
                SceneManager._scene.createSubShop(goods, this._params[4]);
            }
        }
        this.setWaitMode('shop');
        return true;
    };

    var alias_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {

        var waiting = false;
        
        switch (this._waitMode) {
        case 'shop':
            waiting = $gameSystem.isOpeningShop();
            break;
        }

        if(!waiting) {
            waiting = alias_Game_Interpreter_updateWaitMode.call(this);
        }

        return waiting;

    };

    //==============================================================
    // Scene_Map
    //==============================================================

    Scene_Map.prototype.createSubShop = function(goods, purchaseOnly) {
        if(this._shopScene) this.terminateSubShop();
        this._shopScene = new Scene_InternalShop();
        this._shopScene.prepare(goods, purchaseOnly);
        this._shopScene.create();
        this._shopScene.start();        
        this._shopScene.scale = new PIXI.Point(0.5, 0.5);
        this.addChild(this._shopScene);
        $gameSystem.openShop();
    };

    Scene_Map.prototype.updateSubShop = function() {
        if(!this._shopScene) return;
        this._shopScene.update();
    };

    Scene_Map.prototype.terminateSubShop = function() {
        if(!this._shopScene) return;
        this._shopScene.terminate();
        this.removeChild(this._shopScene);
        $gameSystem.closeShop();
    };
    
})(RS.InternalShop);