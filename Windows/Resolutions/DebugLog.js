/*:
 * @plugindesc <DebugLog>
 * @author biud436
 * 
 * @param texts
 * @type note
 * @desc Specify the text and you can use text code too.
 * @default "\\c[1]Screen Size : \\c[0]${a} x ${b}\n\\c[1]To press ESC Button, \\c[0]Open the Menu\n\\c[1]Aspect Ratio : \\c[0](${config.getRatioAsString(a, b)})"
 * 
 * @help
 */
/*:ko
 * @plugindesc <DebugLog>
 * @author biud436
 * 
 * @param texts
 * @type note
 * @desc Specify the text and you can use text code too.
 * @default "\\c[1]Screen Size : \\c[0]${a} x ${b}\n\\c[1]To press ESC Button, \\c[0]Open the Menu\n\\c[1]Aspect Ratio : \\c[0](${config.getRatioAsString(a, b)})"
 * 
 * @help
 */

var Imported = Imported || {};
Imported.DebugLog = true;

var RS = RS || {};
RS.DebugLog = RS.DebugLog || {};

(function($) {
  
  "use strict";

  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<DebugLog>");
  })[0].parameters;

  $.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return $.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  $.Params = {};
  $.Params.texts = $.jsonParse(parameters["texts"]);

  //=============================================================
  // Utils
  //=============================================================

  class Utils {
    static prepare(cb, __this) {
      var a = Graphics.boxWidth;
      var b = Graphics.boxHeight;
      var dir = Graphics.getOrientation(false);
      var config = new ScreenConfig(a, b, dir);
    
      var s = $.Params.texts.slice(0);

      var re = /(\$\{([a-zA-Z.,()\s]*)\})/igm;
      while(re.exec($.Params.texts) != null) {
        s = s.replace(RegExp.$1, eval(RegExp.$2));
      }
      
      cb.call(__this, a, b, s);
    }
  }

  //=============================================================
  // Scene_Map
  //=============================================================  

  var alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    alias_Scene_Map_start.call(this);
    this.createDebugLog();
  };

  Scene_Map.prototype.createDebugLog = function() {

    Utils.prepare(function(a, b, s) {
      this._debug = new Window_Base(0, 0, a / 2, b / 2);
      this._debug._isWindow = false; 
      this._debug.opacity = 0; 
      this._debug.drawTextEx(s, 0, 0);
      
      this.addChild(this._debug);
    }, this);

  };

  Scene_Map.prototype.refreshDebugLog = function() {
    if(!this._debug) {
      this.createDebugLog();
    }

    Utils.prepare(function(a, b, s) {
      this._debug.contents.clear();
      this._debug.drawTextEx(s, 0, 0);
    }, this);

  };

  //=============================================================
  // Event Listeners
  //=============================================================  

  (function() {

    // If the nwjs's version is 1.6.x or more, it could use the 'nw' instead of require('nw.gui')
    var win = nw.Window.get();

    // When resizing on the screen, it will be emitted the event called 'resize',
    // So I've added a callback function because it must refresh debug texts on the screen.    
    win.on('resize', function(width, height) {
      if(!SceneManager._scene) return;
      if(SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene.refreshDebugLog();
      }
    });

  })();
  
})(RS.DebugLog);
