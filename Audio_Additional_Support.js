/*:
 * Audio_Additional_Support.js
 * @plugindesc Audio Additional Support
 *
 */

(function() {

  WebAudio._createContext = function() {
    try {
        this._context =  new (AudioContext || webkitAudioContext || mozAudioContext)();
    } catch (e) {
        this._context = null;
    }
  };

  WebAudio._detectCodecs = function() {
    var audio = document.createElement('audio');
    if (audio.canPlayType) {
        this._canPlayOgg = audio.canPlayType('audio/ogg; codecs="vorbis"');
        this._canPlayM4a = audio.canPlayType('audio/x-m4a');
    }
  };

  AudioManager.audioFileExt = function() {
    if (WebAudio.canPlayOgg()) {
        return '.ogg';
    } else {
        return '.m4a';
    }
  };

})();
