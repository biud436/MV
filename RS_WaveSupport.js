//================================================================
// RS_WaveSupport.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_WaveSupport.js
 * @target MZ
 * @author biud436
 * @url https://github.com/biud436
 * @plugindesc This can be used to control playback of .wav files.(AudioManager supports addtional playing the wav file)
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
 * 2022.01.29 (v2.0.0) - RPG Maker MZ version is released.
 */
/*:ko
 * @target MZ
 * @plugindesc This can be used to control playback of .wav files.
 * (AudioManager supports addtional playing the wav file)
 * @author biud436
 * @url https://github.com/biud436
 *
 * @param Wave Volume Text
 * @text 웨이브 볼륨 텍스트
 * @desc 옵션 창에 볼륨 조절 기능이 추가됩니다. 버튼명을 수정하세요.
 * @default 웨이브 볼륨
 *
 * @help
 * ===============================================================
 * 소개
 * ===============================================================
 * audio/wav 폴더에 웨이브 파일을 넣고 스크립트 코드로 웨이브 파일을 재생할 수 있습니다.
 *
 * AudioManager.playWav('file_name');
 * AudioManager.stopWav();
 *
 * 게임 배포 시, 웨이브 파일을 암호화하려면 RS_WavFileEncrypter (웨이브 파일 인크립터)가 필요합니다.
 *
 * ===============================================================
 * 변동 사항
 * ===============================================================
 * 2015.12.25 (v1.0.0) - First Release Date.
 * 2022.01.29 (v2.0.0) - RPG Maker MZ version is released.
 */
(() => {
    const parameters = PluginManager.parameters("RS_WaveSupport");
    TextManager.wavText = parameters["Wave Volume Text"] || "Wave Volume Text";

    Utils.canPlayWav = function () {
        if (!Utils._audioElement) {
            Utils._audioElement = document.createElement("audio");
        }
        return !!(
            Utils._audioElement &&
            Utils._audioElement.canPlayType('audio/wav; codecs="1"')
        );
    };

    const alias_WebAudio_startLoading = WebAudio.prototype._startLoading;
    WebAudio.prototype._startLoading = function () {
        alias_WebAudio_startLoading.call(this);
        const url = this._url;
        // detroy vorbis decoder if the file is a wav file
        if (url.match(/\.wav$/i)) {
            this._destroyDecoder();
        }
    };

    AudioManager._wavVolume = 100;
    AudioManager._wavBuffers = [];

    Object.defineProperty(AudioManager, "wavVolume", {
        get: function () {
            return this._wavVolume;
        },
        set: function (value) {
            this._wavVolume = value;
        },
        configurable: true,
    });

    /**
     *
     * @param {String} folder
     * @param {String} name
     * @param {String} extension
     * @returns
     */
    AudioManager.createBuffer = function (folder, name, extension) {
        const ext = extension || this.audioFileExt();
        const url = this._path + folder + "/" + Utils.encodeURI(name) + ext;

        const buffer = new WebAudio(url);
        buffer.name = name;
        buffer.frameCount = Graphics.frameCount;

        return buffer;
    };

    const alias_stopAll = AudioManager.stopAll;
    AudioManager.stopAll = function () {
        alias_stopAll.call(this);
        this.stopWav();
    };

    const alias_checkErrors = AudioManager.checkErrors;
    AudioManager.checkErrors = function () {
        alias_checkErrors.call(this);
        this._wavBuffers.forEach((buffer) => {
            if (buffer && buffer.isError()) {
                this.throwLoadError(buffer);
            }
        });
    };

    AudioManager.playWav = function (wavName, vol) {
        var wav = {
            name: wavName,
            pan: 0,
            pitch: 100,
            volume: vol || ConfigManager.wavVolume,
        };
        if (wav.name) {
            const latestBuffers = this._wavBuffers.filter(
                (buffer) => buffer.frameCount === Graphics.frameCount
            );
            if (latestBuffers.find((buffer) => buffer.name === se.name)) {
                return;
            }
            const buffer = this.createBuffer("/wav", wav.name, ".wav");
            this.updateSeParameters(buffer, wav);
            buffer.play(false);
            this._wavBuffers.push(buffer);
            this.cleanupWav();
        }
    };

    AudioManager.cleanupWav = function () {
        for (const buffer of this._wavBuffers) {
            if (!buffer.isPlaying()) {
                buffer.destroy();
            }
        }
        this._wavBuffers = this._wavBuffers.filter((buffer) =>
            buffer.isPlaying()
        );
    };

    AudioManager.stopWav = function () {
        this._wavBuffers.forEach(function (buffer) {
            buffer.stop();
        });
        this._wavBuffers = [];
    };

    AudioManager.updateWavParameters = function (buffer, wav) {
        this.updateBufferParameters(buffer, this._wavVolume, wav);
    };

    Object.defineProperty(ConfigManager, "wavVolume", {
        get: function () {
            return AudioManager.wavVolume;
        },
        set: function (value) {
            AudioManager.wavVolume = value;
        },
        configurable: true,
    });

    const alias_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        const config = alias_makeData.call(this);
        config.wavVolume = this.wavVolume;
        return config;
    };

    const alias_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        alias_applyData.call(this, config);
        this.wavVolume = this.readVolume(config, "wavVolume");
    };

    const alias_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function () {
        alias_addVolumeOptions.call(this);
        this.addCommand(TextManager.wavText, "wavVolume");
    };

    const alias_Window_Options_isVolumeSymbol =
        Window_Options.prototype.isVolumeSymbol;
    Window_Options.prototype.isVolumeSymbol = function (symbol) {
        const isOriginalVolumeSymbol = alias_Window_Options_isVolumeSymbol.call(
            this,
            symbol
        );
        return symbol === TextManager.wavText || isOriginalVolumeSymbol;
    };
})();
