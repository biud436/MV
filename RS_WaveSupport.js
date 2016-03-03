/*:
 * RS_WaveSupport.js
 *
 * @plugindesc This can be used to control playback of .wav files.
 * (AudioManager supports addtional playing the wav file)
 * @author biud436
 * @date 2015.12.25
 *
 * @param Wave Volume Text
 * @desc
 * @default Wave Volume
 *
 * @help
 *
 * You can play the wav files by using the following code.
 *
 * - Start playing the sound.
 * The string parameter specifies a WAV file name. (Download the .wav file and place it in your Audio/wav folder)
 * AudioManager.playWav('file_name');
 *
 * - Stop a previously played sound.
 * AudioManager.stopWav();
 *
 * - Change Log
 * 2015.12.25 (v1.0.0) - First Release Date.
 */

var Imported = Imported || {};
Imported.RS_WaveSupport = true;

(function() {

  var parameters = PluginManager.parameters('RS_WaveSupport');
  var _wavText = parameters['Wave Volume Text'] || 'Wave Volume Text';

  //-----------------------------------------------------------------------------
  // WebAudio
  //
  //
  var alias_detectCodecs = WebAudio._detectCodecs;
  WebAudio._detectCodecs = function() {
      alias_detectCodecs.call(this);
      var audio = document.createElement('audio');
      if (audio.canPlayType) {
          this._canPlayWav = audio.canPlayType('audio/wav; codecs="1"');
      }
  };

  WebAudio.canPlayWav = function() {
      if (!this._initialized) {
          this.initialize();
      }
      return !!this._canPlayWav;
  };

  //-----------------------------------------------------------------------------
  // AudioManager
  //
  //

  AudioManager._wavVolume       = 100;
  AudioManager._wavBuffers      = [];

  Object.defineProperty(AudioManager, 'wavVolume', {
      get: function() {
          return this._wavVolume;
      },
      set: function(value) {
          this._wavVolume = value;
      },
      configurable: true
  });

  AudioManager.createBuffer = function(folder, name, extension) {
      var ext = extension || this.audioFileExt();
      var url = this._path + folder + '/' + encodeURIComponent(name) + ext;
      if (this.shouldUseHtml5Audio() && folder === 'bgm') {
          Html5Audio.setup(url);
          return Html5Audio;
      } else {
          return new WebAudio(url);
      }
  };

  var alias_stopAll = AudioManager.stopAll;
  AudioManager.stopAll = function() {
      alias_stopAll.call(this);
      this.stopWav();
  };

  var alias_checkErrors = AudioManager.checkErrors;
  AudioManager.checkErrors = function() {
      alias_checkErrors.call(this);
      this._wavBuffers.forEach(function(buffer) {
        this.checkWebAudioError(buffer);
      }.bind(this));
  };

  // Wave

  AudioManager.playWav = function(wavName, vol) {
      var wav = {"name":wavName, "pan":0, "pitch":100, "volume": vol || ConfigManager.wavVolume};
      if (wav.name) {
          this._wavBuffers = this._wavBuffers.filter(function(audio) {
              return audio.isPlaying();
          });
          var buffer = this.createBuffer('wav', wav.name, '.wav');
          this.updateSeParameters(buffer, wav);
          buffer.play(false);
          this._wavBuffers.push(buffer);
      }
  };

  AudioManager.stopWav = function() {
      this._wavBuffers.forEach(function(buffer) {
          buffer.stop();
      });
      this._wavBuffers = [];
  };

  AudioManager.updateWavParameters = function(buffer, wav) {
      this.updateBufferParameters(buffer, this._wavVolume, wav);
  };

  //-----------------------------------------------------------------------------
  // ConfigManager
  //
  //

  Object.defineProperty(ConfigManager, 'wavVolume', {
      get: function() {
          return AudioManager.wavVolume;
      },
      set: function(value) {
          AudioManager.wavVolume = value;
      },
      configurable: true
  });

  var alias_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
      var config = alias_makeData.call(this);
      config.wavVolume = this.wavVolume;
      return config;
  };

  var alias_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    alias_applyData.call(this, config);
    this.wavVolume = this.readVolume(config, 'wavVolume');
  };

  //-----------------------------------------------------------------------------
  // Window_Options
  //
  // The window for changing various settings on the options screen.

  var alias_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
  Window_Options.prototype.addVolumeOptions = function() {
    alias_addVolumeOptions.call(this);
    this.addCommand(_wavText, 'wavVolume');
  };

})();
