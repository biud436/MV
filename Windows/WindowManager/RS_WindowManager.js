//==============================================================================
// RS_WindowManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_WindowManager = true;

/*:
 * @plugindesc (v1.0.0) <RS_WindowManager>
 * @author biud436
 */

var RS = RS || {};

function WindowManager() {
  throw new Error("This is a static class");
}

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_WindowManager>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;
  
  if( Utils.isNwjs() ) {
    if(process && process.platform && process.platform === 'win32') {
      RS.WindowManager = require('./js/libs/WindowManager.node');
    } else {
      console.error('This plugin is not supported in Mac OS');
      return false;
    }
  }  
    
  if(!!RS.WindowManager) {
    Object.defineProperty(WindowManager, 'alpha', {
      set: function(value) {
        RS.WindowManager.setAlpha(value);
      }
    });    
  }

})();
