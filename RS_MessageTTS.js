//================================================================
// RS_MessageTTS.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin adds text-to-speech (TTS) functionality for message windows in RPG Maker MV. <RS_MessageTTS>
 * @author biud436
 *
 * @param TTS Rate
 * @type number
 * @decimals 1
 * @min 0.1
 * @max 10.0
 * @desc Controls the speech rate for TTS. (Default: 1.2)
 * @default 1.2
 *
 * @param TTS Volume
 * @type number
 * @decimals 1
 * @min 0.0
 * @max 1.0
 * @desc Controls the speech volume for TTS. (Default: 1.0)
 * @default 1.0
 *
 * @help
 * =======================================================
 * RS_MessageTTS Plugin
 * =======================================================
 * This plugin enables text-to-speech (TTS) functionality for displaying messages in RPG Maker MV.
 * When a message appears, the plugin reads the text aloud using the Web Speech API (available only in NW.js environment).
 *
 * =======================================================
 * Plugin Parameters
 * =======================================================
 * Currently, the plugin has the following built-in parameters:
 * - rate: Controls the speech rate. The default value is 1.2.
 * - volume: Controls the speech volume. The default value is 1.0.
 *
 * These parameters can be modified directly in the script if needed.
 *
 * =======================================================
 * Plugin Commands
 * =======================================================
 * You can use the following plugin commands to control TTS:
 *
 * 1. Enable TTS:
 *    EnableTTF
 *    - This command enables the text-to-speech functionality.
 *
 * 2. Disable TTS:
 *    DisableTTF
 *    - This command disables the text-to-speech functionality.
 *
 * =======================================================
 * Usage Instructions
 * =======================================================
 * - The plugin automatically detects the user's language using the browser's language setting (navigator.language).
 * - If the detected language is Korean, it switches to 'ko-KR' for better pronunciation.
 * - Text-to-speech only works when the game is running in NW.js mode (desktop environment).
 * - If NW.js is not detected, the TTS feature is automatically disabled.
 *
 * =======================================================
 * Technical Details
 * =======================================================
 * - This plugin uses the Web Speech API provided by NW.js.
 * - TTS is executed via `chrome.tts.speak` method with specified language, rate, and volume.
 * - The plugin checks if TTS is currently speaking to prevent overlapping speech.
 *
 * =======================================================
 * Known Limitations
 * =======================================================
 * - TTS functionality is not supported in browser mode; it requires NW.js.
 * - The plugin does not provide an in-game configuration for speech rate or volume.
 *
 * =======================================================
 * Version History
 * =======================================================
 * v1.0.0 (2020) - First release.
 *
 * =======================================================
 * Tips
 * =======================================================
 * - Use the EnableTTF and DisableTTF commands to manage TTS in specific scenes.
 * - Adjust the rate and volume parameters in the script for different speaking styles.
 *
 */

var Imported = Imported || {};
Imported.RS_MessageTTS = true;

var RS = RS || {};
RS.MessageTTS = RS.MessageTTS || {};

(function ($) {
  'use strict';

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MessageTTS>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  RS.MessageTTS.Params = {};
  RS.MessageTTS.Params.rate = parseFloat(parameters['TTS Rate'] || 1.2);
  RS.MessageTTS.Params.volume = parseFloat(parameters['TTS Volume'] || 1.0);

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    alias_Game_System_initialize.call(this);
    this._isValidTTS = true;

    if (!Utils.isNwjs()) {
      this.disableTTF();
    }
  };

  Game_System.prototype.isValidTTS = function () {
    return this._isValidTTS;
  };

  Game_System.prototype.enableTTF = function () {
    this._isValidTTS = true;
  };

  Game_System.prototype.disableTTF = function () {
    this._isValidTTS = false;
  };

  var alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function (textState) {
    alias_Window_Message_newPage.call(this, textState);
    let lang = navigator.language;
    if ($gameSystem.isKorean()) lang = 'ko-KR';
    if (!Utils.isNwjs()) return;

    chrome.tts.isSpeaking(value => {
      if (!value) {
        const p = RS.MessageTTS.Params;
        chrome.tts.speak(textState.text, {
          lang: lang,
          rate: p.rate,
          volume: p.volume,
        });
      }
    });
  };

  var alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'EnableTTF') $gameSystem.enableTTF();
    if (command === 'DisableTTF') $gameSystem.disableTTF();
  };
})(RS.MessageTTS);
