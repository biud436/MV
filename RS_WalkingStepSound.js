/*:
 * RS_WalkingStepSound
 * @plugindesc Whenever you are walking in your world, this plugin automatically
 * plays the walking footstep sound.
 *
 * @author biud436
 *
 * @param Dirt Terrain Tag
 * @desc 흙 길
 * @default 1
 *
 * @param Snow Terrain Tag
 * @desc 눈 밭
 * @default 2
 *
 * @param Stone Terrain Tag
 * @desc 돌 길
 * @default 3
 *
 * @param Water Terrain Tag
 * @desc 물
 * @default 4
 *
 * @param Wood Terrain Tag
 * @desc 나무 판자, 나무
 * @default 5
 *
 * @param Dirt Sound Name
 * @desc 흙 길 사운드 명
 * @default ['stepdirt_', 1, 8]
 *
 * @param Snow Sound Name
 * @desc 눈 밭 사운드 명
 * @default ['stepsnow_', 1, 2]
 *
 * @param Stone Sound Name
 * @desc 돌 길 사운드 명
 * @default ['stepstone_', 1, 8]
 *
 * @param Water Sound Name
 * @desc 물 사운드 명
 * @default ['stepwater_', 1 , 2]
 *
 * @param Wood Sound Name
 * @desc 나무 판자, 나무 사운드 명
 * @default ['stepwood_', 1, 2]
 *
 * @param Step Interval
 * @desc 보행 간격
 * @default 2
 *
 * @param Volume
 * @desc 볼륨
 * @default 30
 *
 * @param Step Sound
 * @desc 옵션
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
 */

var Imported = Imported || {};
Imported.RS_WalkingStepSound = true;

var RS = RS || {};
RS.WalkingStepSound = RS.WalkingStepSound || {};
RS.WalkingStepSound.params = {};

(function(){

  var parameters = PluginManager.parameters('RS_WalkingStepSound');
  RS.WalkingStepSound.params.stepInterval = Number(parameters['Step Interval'] || 2);
  RS.WalkingStepSound.params.volume = Number(parameters['Volume'] || 30);
  RS.WalkingStepSound.params.dirtSoundName = eval(parameters['Dirt Sound Name']);
  RS.WalkingStepSound.params.snowSoundName = eval(parameters['Snow Sound Name']);
  RS.WalkingStepSound.params.stoneSoundName = eval(parameters['Stone Sound Name']);
  RS.WalkingStepSound.params.waterSoundName = eval(parameters['Water Sound Name']);
  RS.WalkingStepSound.params.woodSoundName = eval(parameters['Wood Sound Name']);
  RS.WalkingStepSound.params.symbolName = String(parameters['Step Sound'] || 'Step Sound')

  RS.WalkingStepSound.ENUM_DIRT = Number(parameters['Dirt Terrain Tag'] || 1);
  RS.WalkingStepSound.ENUM_SNOW = Number(parameters['Snow Terrain Tag'] || 2);
  RS.WalkingStepSound.ENUM_STONE = Number(parameters['Stone Terrain Tag'] || 3);
  RS.WalkingStepSound.ENUM_WATER = Number(parameters['Water Terrain Tag'] || 4);
  RS.WalkingStepSound.ENUM_WOOD = Number(parameters['Wood Terrain Tag'] || 5);

  RS.WalkingStepSound.type = {
    'dirt': RS.WalkingStepSound.params.dirtSoundName,
    'snow': RS.WalkingStepSound.params.snowSoundName,
    'stone': RS.WalkingStepSound.params.stoneSoundName,
    'water': RS.WalkingStepSound.params.waterSoundName,
    'wood': RS.WalkingStepSound.params.woodSoundName
  };

  RS.WalkingStepSound.setState = function(value) {
    RS.WalkingStepSound._state = value;
  }

  RS.WalkingStepSound.isRunning = function() {
    RS.WalkingStepSound._init = false;
    RS.WalkingStepSound._state = false;
    RS.WalkingStepSound._steps = 0;
    var tileset = $gameMap.tileset();
    var note = tileset.note.split(/[\r\n]/);
    note.forEach(function(i) {
      if(i.match(/<Step Sounds>/i)) {
        RS.WalkingStepSound._init = true;
      }
    }.bind(this));
  }

  RS.WalkingStepSound.requestSound = function(type) {
    if(!Imported.RS_WaveSupport) { return; }
    var array = RS.WalkingStepSound.type[type];
    var min = array[1];
    var max = array[2];
    var index = (1 + (Math.random() * max) >> 0).clamp(min, max);
    var vol = (30 + Math.random() * 10) >> 0
    AudioManager.playWav("%1%2".format(array[0], index), vol);
  }

  RS.WalkingStepSound.isInit = function() {
    return RS.WalkingStepSound._init && !!ConfigManager.stepSound;
  }

  RS.WalkingStepSound.playSound = function() {
    if(RS.WalkingStepSound._state && this.isInit()) {
      switch ($gamePlayer.terrainTag()) {
        case RS.WalkingStepSound.ENUM_DIRT:
          this.requestSound('dirt');
          break;
        case RS.WalkingStepSound.ENUM_SNOW:
          this.requestSound('snow');
          break;
        case RS.WalkingStepSound.ENUM_STONE:
          this.requestSound('stone');
          break;
        case RS.WalkingStepSound.ENUM_WATER:
          this.requestSound('water');
          break;
        case RS.WalkingStepSound.ENUM_WOOD:
          this.requestSound('wood');
          break;
      }
      this.setState(false);
    }
  }

  var alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    alias_Scene_Map_start.call(this);
    RS.WalkingStepSound.isRunning();
  }

  RS.WalkingStepSound.update = function() {
    if(RS.WalkingStepSound._state &&
      $gameParty.steps() === RS.WalkingStepSound._steps) {
      this.playSound();
    } else {
      if(!RS.WalkingStepSound._state) {
        RS.WalkingStepSound._steps = $gameParty.steps() + this.getDistance();
        this.setState(true);
      }
    }
  };

  RS.WalkingStepSound.getDistance = function() {
    return RS.WalkingStepSound.params.stepInterval;
  }

  var alias_Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    alias_Game_Map_update.call(this, sceneActive);
    RS.WalkingStepSound.update();
  };

  //-----------------------------------------------------------------------------
  // ConfigManager
  //
  //

  ConfigManager.stepSound   = false;

  var alias_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
      var config = alias_makeData.call(this);
      config.stepSound = this.stepSound;
      return config;
  };

  var alias_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    alias_applyData.call(this, config);
    this.stepSound = this.readFlag(config, 'stepSound');
  };

  //-----------------------------------------------------------------------------
  // Window_Options
  //
  // The window for changing various settings on the options screen.

  var alias_addVolumeOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function() {
      alias_addVolumeOptions.call(this);
      this.addCommand(RS.WalkingStepSound.params.symbolName, 'stepSound');
  };

})();
