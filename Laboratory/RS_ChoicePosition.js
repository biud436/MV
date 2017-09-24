/*:
 * @plugindesc This plugin allows you to set up the position of choice list window.
 * @author biud436
 *
 * @param x
 * @type number
 * @desc Specify the x position for choices window
 * @default 0
 *
 * @param y
 * @type number
 * @desc Specify the y position for choices window
 * @default 0
 *
 * @param Auto Disable
 * @type boolean
 * @desc
 * @default false
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 * This plugin command can change the position of the choice list window,
 * you need to decide values of two parameters as integer.
 * Choice pos x y
 * Choice pos event id
 * Choice pos player
 *
 * You can deactivate or activate plugin itself through these plugin commands
 * Choice enable
 * Choice disable
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.02.03 (v1.0.1) :
 * - Added the function allows the choice window to move linearly from a current position to the destination.
 * - It could automatically set the position of the choice window when the player is loading the save data.
 * 2017.02.08 (v1.0.2)
 * - Optimized for motion.
 * 2017.09.24 (v1.0.3)
 * - Fixed the bug that is not working the plugin command named 'Choice pos'
 */

var Imported = Imported || {};
Imported.Window_ChoiceListPosition = true;

(function() {

  var parameters = PluginManager.parameters('RS_ChoicePosition');
  var mx = Number(parameters['x']);
  var my = Number(parameters['y']);
  var isAudoDisable = Boolean(parameters['Auto Disable'] === 'true');

  var alias_Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function(messageWindow) {
      alias_Window_ChoiceList_initialize.call(this, messageWindow);
  };

  var alias_Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {
      this.width = this.windowWidth();
      this.height = this.windowHeight();
      if($gameSystem.isChoiceMoveable()) {
          this.setCustomPosition();
      } else {
          alias_Window_ChoiceList_updatePlacement.call(this);
      }
  };

  Window_ChoiceList.prototype.setCustomPosition = function() {

      var mx = $gameSystem.getChoiceWindowX();
      var my = $gameSystem.getChoiceWindowY();

      if(mx === undefined || mx === null || isNaN(mx)) mx = this.getChoiceX();
      if(my === undefined || my === null || isNaN(my)) my = this.getChoiceY();

      this.moveLenear( mx, my );

  };

  Window_ChoiceList.prototype.moveLenear = function (tx, ty) {
      if(this.x >= tx - 0.001 && this.y >= ty - 0.001 && isAudoDisable) {
        $gameSystem.setChoiceMoveable(false);
      }
      var t = performance.now();
      var dt = (t % 10000 / 10000) * 0.5;
      this.x = this.x + dt * (tx - this.x);
      this.y = this.y + dt * (ty - this.y);
  };

  Window_ChoiceList.prototype.getChoiceX = function () {
      var x = 0;
      switch ($gameMessage.choicePositionType()) {
      case 0:
          x = 0;
          break;
      case 1:
          x = (Graphics.boxWidth - this.width) / 2;
          break;
      case 2:
          x = Graphics.boxWidth - this.width;
          break;
      }
      return x;
  };

  Window_ChoiceList.prototype.getChoiceY = function () {
      var y = 0;
      if (messageY >= Graphics.boxHeight / 2) {
          y = messageY - this.height;
      } else {
          y = messageY + this._messageWindow.height;
      }
      return y;
  };

  var alias_Window_ChoiceList_update = Window_ChoiceList.prototype.update;
  Window_ChoiceList.prototype.update = function () {
      if(alias_Window_ChoiceList_update) alias_Window_ChoiceList_update.call(this);
      if($gameMessage.choices().length > 0 && $gameSystem.isChoiceMoveable()) {
        this.updatePlacement();
      }
  };

  //===========================================================================
  // Game_Temp
  //===========================================================================
  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
      alias_Game_System_initialize.call(this);
      this._isChoiceMoveable = false;
      this._choiceWindowTempPosition = new Point(0, 0);
  };

  Game_System.prototype.getChoiceWindowX = function () {
      return this._choiceWindowTempPosition.x;
  };

  Game_System.prototype.getChoiceWindowY = function () {
      return this._choiceWindowTempPosition.y;
  };

  Game_System.prototype.setChoiceWindowPos = function () {

      if(arguments.length < 2) {
          var id = parseInt(arguments[0]);
          if(id > 0) {
            this._choiceWindowTempPosition.x = $gameMap.event(id).screenX();
            this._choiceWindowTempPosition.y = $gameMap.event(id).screenY();
          } else {
            this._choiceWindowTempPosition.x = $gamePlayer.screenX();
            this._choiceWindowTempPosition.y = $gamePlayer.screenY();
          }

      } else {
          this._choiceWindowTempPosition.x = arguments[0];
          this._choiceWindowTempPosition.y = arguments[1];
      }

  };

  Game_System.prototype.setChoiceMoveable = function (enabled) {
      this._isChoiceMoveable = enabled;
  };

  Game_System.prototype.isChoiceMoveable = function () {
      return this._isChoiceMoveable;
  };

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Choice") {
        switch(args[0]) {
          case 'pos':
              switch (args[1]) {
                case 'event':
                  $gameSystem.setChoiceWindowPos(Number(args[1]));
                  break;
                case 'player':
                  $gameSystem.setChoiceWindowPos(-1);
                  break;
                default:
                  $gameSystem.setChoiceWindowPos(Number(args[1]), Number(args[2]));
              }
              break;
          case 'enable':
              $gameSystem.setChoiceMoveable(true);
              break;
          case 'disable':
              $gameSystem.setChoiceMoveable(false);
              break;
        }
      }
  };

})()
