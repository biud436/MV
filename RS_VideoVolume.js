/*:
 * @plugindesc <RS_VideoVolume> 
 * @author biud436
 * 
 * @param Settings
 * 
 * @param Volume
 * @parent Settings
 * @type number
 * @min 0
 * @max 100
 * @desc Specify the video volume is the percent between 0 and 100.
 * @default 100
 * 
 * @param Type
 * @parent Settings
 * @type string
 * @desc Specify the name of the video option button to game option.
 * @default Video
 * 
 * @help
 * To change the volume of the video element in your game project, 
 * You can call the plugin command called 'SetVideoVolume' and easy to change.
 * 
 * SetVideoVolume volume
 * 
 * - volume : this value is the number between 0 and 100.
 * 
 * The volume of the video element is saved to global configurable file.
 */

var Imported = Imported || {};
Imported.RS_VideoVolume = true;

var RS = RS || {};
RS.VideoVolume = RS.VideoVolume || {};

(function($) {
    
    "use strict";
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_VideoVolume>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;
    
    // Sets this initial value you didn't set up the volume to game option.
    var volume = Number(parameters["Volume"]) || 0;
    
    /**
    * @method setVideoVolume
    * @param {Number} vol the volume is the number between 0 and 100
    */
    Graphics.setVideoVolume = function(vol) {
        vol = vol || 0;
        vol = vol.clamp(0, 100);
        if(!this._video) return;
        this._video.volume = vol * 0.01;
    };
    
    /**
     * Get the video volume can invoke in the game option and save it.
     * @return {Number} volume the value is the number between 0 and 100
     */
    Graphics.getVideoVolume = function() {
        if(!this._video) return null;
        return this._video.volume * 100;
    };
    
    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "SetVideoVolume") {
            var vol = Number(args[0]) || 0;
            Graphics.setVideoVolume(vol);
        }
    };
    
    //=====================================================================
    // ConfigManager
    //=====================================================================
    
    Object.defineProperty(ConfigManager, 'videoVolume', {
        get: function() {
            return Graphics.getVideoVolume();
        },
        set: function(value) {
            Graphics.setVideoVolume(value);
        },
        configurable: true
    });
    
    var alias_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = alias_makeData.call(this);
        config.videoVolume = this.videoVolume;
        return config;
    };
    
    var alias_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        alias_applyData.call(this, config);
        this.videoVolume = this.readVideoVolume(config, 'videoVolume');
    };

    ConfigManager.readVideoVolume = function(config, name) {
        var value = config[name];
        if (value !== undefined) {
            return Number(value).clamp(0, 100);
        } else {
            // if there is no changes in the game option, it sets with the initial volume you set up.
            return volume;
        }
    };    

    //=====================================================================
    // Window_Options
    //=====================================================================
    
    var alias_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function() {
        alias_addVolumeOptions.call(this);
        this.addCommand("Video", 'videoVolume');
    };  
    
})(RS.VideoVolume);