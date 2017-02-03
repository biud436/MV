//===================================================================================
// RS_Container.js
//===================================================================================

var Imported = Imported || {};
Imported.RS_Container = true;

/*:
 * @plugindesc <RS_Container>
 * @author biud436
 *
 * @help
 * ===================================================================================
 * Change Log
 * ===================================================================================
 * 2017.02.03 - Test out
 */

(function() {

    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_Container>');
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;

    function getParameter() {
        var k = Object.keys(arguments);
        var lastUsed = "";

        while(k.length > 0) {
            lastUsed = arguments[parseInt(k.pop())];
            if(parameters[lastUsed]) return parameters[lastUsed];
        }

        return "";

    };

    //======================================================================================
    // Scene_Base
    //======================================================================================

    var alias_Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function() {
        if(alias_Scene_Base_terminate) alias_Scene_Base_terminate.call(this);
        Stage.prototype.destory.call(this);
    };

})();
