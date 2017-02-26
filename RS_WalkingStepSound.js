/*:
 * RS_WalkingStepSound
 * @plugindesc Whenever you are walking in your world, this plugin automatically plays the walking footstep sound.
 *
 * @author biud436
 *
 * @param --- Sound Range
 * @desc
 * @default
 *
 * @param Dirt Sound Name
 * @desc Array
 * @default ['stepdirt_', 1, 8]
 *
 * @param Snow Sound Name
 * @desc Array
 * @default ['stepsnow_', 1, 2]
 *
 * @param Stone Sound Name
 * @desc Array
 * @default ['stepstone_', 1, 8]
 *
 * @param Water Sound Name
 * @desc Array
 * @default ['stepwater_', 1 , 2]
 *
 * @param Wood Sound Name
 * @desc Array
 * @default ['stepwood_', 1, 2]
 *
 * @param --- Dirt SE
 * @desc
 * @default
 *
 * @param Audio Assets 1
 * @desc If you have an audio, you must edit this
 * @default stepdirt_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 2
 * @desc If you have an audio, you must edit this
 * @default stepdirt_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 3
 * @desc If you have an audio, you must edit this
 * @default stepdirt_3
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 4
 * @desc If you have an audio, you must edit this
 * @default stepdirt_4
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 5
 * @desc If you have an audio, you must edit this
 * @default stepdirt_5
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 6
 * @desc If you have an audio, you must edit this
 * @default stepdirt_6
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 7
 * @desc If you have an audio, you must edit this
 * @default stepdirt_7
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 8
 * @desc If you have an audio, you must edit this
 * @default stepdirt_8
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Snow SE
 * @desc
 * @default
 *
 * @param Audio Assets 9
 * @desc If you have an audio, you must edit this
 * @default stepsnow_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 10
 * @desc If you have an audio, you must edit this
 * @default stepsnow_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Stone SE
 * @desc
 * @default
 *
 * @param Audio Assets 11
 * @desc If you have an audio, you must edit this
 * @default stepstone_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 12
 * @desc If you have an audio, you must edit this
 * @default stepstone_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 13
 * @desc If you have an audio, you must edit this
 * @default stepstone_3
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 14
 * @desc If you have an audio, you must edit this
 * @default stepstone_4
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 15
 * @desc If you have an audio, you must edit this
 * @default stepstone_5
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 16
 * @desc If you have an audio, you must edit this
 * @default stepstone_6
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 17
 * @desc If you have an audio, you must edit this
 * @default stepstone_7
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 18
 * @desc If you have an audio, you must edit this
 * @default stepstone_8
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Water SE
 * @desc
 * @default
 *
 * @param Audio Assets 19
 * @desc If you have an audio, you must edit this
 * @default stepwater_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 20
 * @desc If you have an audio, you must edit this
 * @default stepwater_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Wood SE
 * @desc
 * @default
 *
 * @param Audio Assets 21
 * @desc If you have an audio, you must edit this
 * @default stepwood_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 22
 * @desc If you have an audio, you must edit this
 * @default stepwood_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Sound Tags
 * @desc
 * @default
 *
 * @param Dirt Terrain Tag
 * @desc
 * @default 1
 *
 * @param Snow Terrain Tag
 * @desc
 * @default 2
 *
 * @param Stone Terrain Tag
 * @desc
 * @default 3
 *
 * @param Water Terrain Tag
 * @desc
 * @default 4
 *
 * @param Wood Terrain Tag
 * @desc
 * @default 5
 *
 * @param --- Settings
 * @desc
 * @default
 *
 * @param Step Interval
 * @desc
 * @default 2
 *
 * @param Volume
 * @desc
 * @default 30
 *
 * @param Step Sound
 * @desc This is a command name in the menu option.
 * @default Step Sound
 *
 * @help
 *
 * Before you start downloading this plugin, should know that this plugin will require some sound effects.
 * That file type of sound effects is the .wav file. But, Wav types does not supported by RPG Maker MV.
 * However, You can solve it by adding a wav plugin. wav plugin can download via this link.
 *
 * 1. First step is to add sound effect files on the audio/wav folder.
 * Sound effects files of YouTube video can download via this link.
 *
 * 2. Second step is to add this plugin file on the js/plugin folder.
 *
 * 3. Third step is to set the following note tag on the database-tileset-note.
 *
 * <Step Sounds>
 *
 * 4. Fourth step is to set the following terrain tag on the database-tileset.
 * (This plugin distinguishes the footstep sound effects via the terrain tag)
 *
 * Dirt Terrain / 1
 * Snow Terrain / 2
 * Stone Terrain / 3
 * Water Terrain / 4
 * Wood Terrain / 5
 *
 * - Change Log
 * 2015.12.26 (v1.0.0)- First Release.
 * 2016.03.04 (v1.0.1)- Added the comments for include used files.
 * 2016.03.05 (v1.0.2) - Fixed the class structure.
 * 2016.03.10 (v1.0.3) - Fixed the sound option.
 * 2016.09.14 (v1.0.4) - Fixed the issue that the step sound property is initialized to the false in ConfigManager.
 * 2016.12.05 (v1.0.5) - Fixed the value of ConfigManager.stepSound
 * 2017.02.26 (v1.0.6) - Fixed a bug that is not configurable the config value called 'stepSound' as true when starting the game.
 */

var Imported = Imported || {};
Imported.RS_WalkingStepSound = true;

(function(){

  // private static class
  function RSMatch() {
      throw new Error('This is a static class');
  }

  RSMatch.params = RSMatch.params || {};

  var parameters = PluginManager.parameters('RS_WalkingStepSound');
  RSMatch.params.stepInterval = Number(parameters['Step Interval'] || 2);
  RSMatch.params.volume = Number(parameters['Volume'] || 30);
  RSMatch.params.dirtSoundName = eval(parameters['Dirt Sound Name']);
  RSMatch.params.snowSoundName = eval(parameters['Snow Sound Name']);
  RSMatch.params.stoneSoundName = eval(parameters['Stone Sound Name']);
  RSMatch.params.waterSoundName = eval(parameters['Water Sound Name']);
  RSMatch.params.woodSoundName = eval(parameters['Wood Sound Name']);
  RSMatch.params.symbolName = String(parameters['Step Sound'] || 'Step Sound')

  RSMatch.ENUM_DIRT = Number(parameters['Dirt Terrain Tag'] || 1);
  RSMatch.ENUM_SNOW = Number(parameters['Snow Terrain Tag'] || 2);
  RSMatch.ENUM_STONE = Number(parameters['Stone Terrain Tag'] || 3);
  RSMatch.ENUM_WATER = Number(parameters['Water Terrain Tag'] || 4);
  RSMatch.ENUM_WOOD = Number(parameters['Wood Terrain Tag'] || 5);

  RSMatch.type = {
    'dirt': RSMatch.params.dirtSoundName,
    'snow': RSMatch.params.snowSoundName,
    'stone': RSMatch.params.stoneSoundName,
    'water': RSMatch.params.waterSoundName,
    'wood': RSMatch.params.woodSoundName
  };

  RSMatch.setState = function(value) {
    this._state = value;
  }

  RSMatch.isRunning = function() {
    RSMatch._init = false;
    RSMatch._state = false;
    RSMatch._steps = 0;
    var tileset = $gameMap.tileset();
    var note = tileset.note.split(/[\r\n]/);
    note.forEach(function(i) {
      if(i.match(/<Step Sounds>/i)) {
        RSMatch._init = true;
        ConfigManager.save();
      }
    }, this);
  }

  RSMatch.requestSound = function(type) {
    if(!Imported.RS_WaveSupport) { return; }
    var array = RSMatch.type[type];
    var min = array[1];
    var max = array[2];
    var index = (1 + (Math.random() * max) >> 0).clamp(min, max);
    var vol = (30 + Math.random() * 10) >> 0
    AudioManager.playWav("%1%2".format(array[0], index), vol);
  }

  RSMatch.isInit = function() {
    return RSMatch._init && !!ConfigManager.stepSound;
  }

  RSMatch.playSound = function() {
    if(RSMatch._state && this.isInit()) {
      switch ($gamePlayer.terrainTag()) {
        case RSMatch.ENUM_DIRT:
          this.requestSound('dirt');
          break;
        case RSMatch.ENUM_SNOW:
          this.requestSound('snow');
          break;
        case RSMatch.ENUM_STONE:
          this.requestSound('stone');
          break;
        case RSMatch.ENUM_WATER:
          this.requestSound('water');
          break;
        case RSMatch.ENUM_WOOD:
          this.requestSound('wood');
          break;
      }
      this.setState(false);
    }
  }

  var alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    alias_Scene_Map_start.call(this);
    RSMatch.isRunning();
  }

  RSMatch.update = function() {
    if(RSMatch._state &&
      $gameParty.steps() === RSMatch._steps) {
      this.playSound();
    } else {
      if(!RSMatch._state) {
        RSMatch._steps = $gameParty.steps() + this.getDistance();
        this.setState(true);
      }
    }
  };

  RSMatch.getDistance = function() {
    return RSMatch.params.stepInterval;
  }

  var alias_Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    alias_Game_Map_update.call(this, sceneActive);
    RSMatch.update();
  };

  //-----------------------------------------------------------------------------
  // ConfigManager
  //
  //

  ConfigManager.stepSound = true;

  var alias_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = alias_makeData.call(this);
    config.stepSound = ConfigManager.stepSound;
    return config;
  };

  var alias_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    alias_applyData.call(this, config);
    var ret = config['stepSound'];
    var temp = ConfigManager.stepSound;
    if(ret !== undefined) {
      this.stepSound = ret;
    } else {
      this.stepSound = temp;
    }
  };


  //-----------------------------------------------------------------------------
  // Window_Options
  //
  // The window for changing various settings on the options screen.

  var alias_addVolumeOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function() {
    alias_addVolumeOptions.call(this);
    this.addCommand(RSMatch.params.symbolName, 'stepSound');
  };

})();
