/*:
 * @plugindesc INI
 * @author biud436
 * @help
 * ==============================================================================
 * Terms of Use
 * ==============================================================================
 * Free for commercial and non-commercial use
 */
/*:ko
 * @plugindesc INI 모듈
 * @author biud436
 * @help
 * ==============================================================================
 * Terms of Use
 * ==============================================================================
 * Free for commercial and non-commercial use
 */

var Imported = Imported || {};
Imported.RS_INI = true;

var RS = RS || {};
RS.INI = RS.INI || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
       return i.description.contains("<RS_INI>");
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.writeString = function (appName, keyName, str, fileName) {
        
    };

    $.readString = function (appName, keyName, fileName) {
        
    };    

})(RS.INI);
