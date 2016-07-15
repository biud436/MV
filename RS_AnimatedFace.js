/*:
 * RS_AnimatedFace.js
 * @plugindesc RS_AnimatedFace (Add-on)
 * @author biud436
 *
 * @param isdeltaTime
 * @desc true : Slow Speed
 * false : Consistent Speed (Fast)
 * @default false
 *
 * @param destX Left
 * @desc
 * @default this.x + RS.__faceOX
 *
 * @param destX Right
 * @desc
 * @default (Graphics.boxWidth - this._faceBitmap.width) - this.x + RS.__faceOX
 *
 * @param destY
 * @desc
 * @default (Graphics.boxHeight - this._faceBitmap.height) - this.y + RS.__faceOY
 *
 * @param power
 * @desc
 * @default 200
 *
 * @param speed
 * @desc
 * @default 0.1
 *
 * @param limited time
 * @desc
 * @default 1.0
 *
 * @help
 * =============================================================================
 * Installation
 * =============================================================================
 * To run this plugin,
 * It requires plugins called "RS_MessageSystem.js" and "RS_Vector2.js"
 * =============================================================================
 * Plugin Command
 * =============================================================================
 * 
 * This plugin contains these three types the plugin commands.
 *
 * This plugin commands allows you to set the scroll-speed of the face
 * RS_AnimatedFace speed 0.1
 *
 * This plugin commands allows you to set the stream of time.
 *
 * If you set the delta to true,
 * The delta gets current time from the Date() object (The default value is to false)
 *
 * RS_AnimatedFace delta true
 * RS_AnimatedFace delta false
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.04.18 (v1.0.0) - First Release
 *
 */

var Imported = Imported || {};
Imported.RS_AnimatedFace = true;

(function() {

  var parameters = PluginManager.parameters('RS_AnimatedFace');

  var destXRightString = parameters['destX Right'];
  var destXLeftString = parameters['destX Left'];
  var destYString = parameters['destY'];
  var power = Number(parameters['power'] || 200);
  var speed = Number(parameters['speed'] || 0.1);
  var isdeltaTime = parameters['isdeltaTime'] === 'true';
  var limitedTime = Number(parameters['limited time'] || 1.0);

  // Is Updated
  var updated = true;

  // Time
  var time = 0.0;

  //Check Dependency

  var checkMS = !!Imported.RS_MessageSystem,
      checkVector2 = !!Imported.RS_Vector2;

  if(!checkMS) {
    var error_message = ["Failed to check the file : RS_MessageSystem.js",
      "This plugin needs the javascript file called RS_MessageSystem"
    ];
    console.error(error_message.join('\n'));
    return false;
  }

  if(!checkVector2) {
    var error_message = ["Failed to check the file : RS_Vector2.js",
      "This plugin needs the javascript file called RS_Vector2"
    ];
    console.error(error_message.join('\n'));
    return false;
  }

  // Destination Vector
  var destVec = Vector2.empty();

  // End Position
  var endPos = Vector2.empty();

  Window_Message.prototype.drawBigFace = function(faceName) {

      this._newContents.bitmap = ImageManager.loadFace(faceName);

      this._newContents.y = eval(destYString);

      if($gameMessage.faceIndex() > 0) {
          this._newContents.x = eval(destXRightString) - power;
      } else {
          this._newContents.x = eval(destXLeftString) + power;
      }

      destVec.x = this._newContents.x;
      destVec.y = this._newContents.y;

      updated = true;
      time = 0.0;

  };

  Window_Message.prototype.updateBigface = function() {
    if(!Imported.RS_Vector2) return;
    if(!this._newContents.bitmap) return;
    if(!updated) return;

    if(isdeltaTime) {
      // Slow Speed
      time = (Date.now() % 10000 / 10000);
    } else {
      // Consistent Speed (fast)
      time += speed;
    }

    if($gameMessage.faceIndex() > 0) {
      endPos.x = destVec.x + power;
      var d = Vector2.quadraticBezier({'x': destVec.x, 'y': destVec.y},
                                      {'x': destVec.x + power / 2, 'y': destVec.y},
                                      {'x': endPos.x, 'y': destVec.y}, time);
      this._newContents.x = d.x;
    } else {
      endPos.x = destVec.x - power;
      var d = Vector2.quadraticBezier({'x': destVec.x, 'y': destVec.y},
                                      {'x': destVec.x - power / 2, 'y': destVec.y},
                                      {'x': endPos.x, 'y': destVec.y}, time);
      this._newContents.x = d.x;
    }
    if(!isdeltaTime && time >= limitedTime) {
      updated = false;
    } else if (isdeltaTime && time >= 0.9) {
      updated = false;
    }
  };

  var alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    alias_Scene_Map_update.call(this);
    if(!this.isBusy()) this._messageWindow.updateBigface();
  };

  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);

      if(command === "RS_AnimatedFace") {
        switch (args[0].toLowerCase()) {
          case 'speed':
            speed = Number(args[1] || 0.1);
            break;
          case 'delta':
            isdeltaTime = args[1] === 'true';
            break;
        }
      }
  };

})();
