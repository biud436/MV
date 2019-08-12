//================================================================
// RS_OnlyOGG.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
* @plugindesc This plugin can play OGG files only in the RPG Maker MV.
* @author biud436
* @help
* =============================================================================
* Version Log
* =============================================================================* 
* 2015.11.28 (v1.0.0) - First Release.
*/
/*:ko
* @plugindesc OGG 파일만 사용하여 앱 용량을 줄이고 M4A 오류를 제거합니다.
* @author biud436
* @help
* =============================================================================
* 동작 환경
* =============================================================================
* 안드로이드 킷캣 4.4.4
*
* 이 플러그인은 일부 안드로이드 기기에서 발생하는 M4A 관련 오류를 제거합니다.
* M4A을 포함하지 않아도 되기 때문에 게임 용량을 더 줄일 수 있습니다.
* =============================================================================
* 버전 로그
* =============================================================================
* 2015.11.28 (v1.0.0) - First Release.
*/

var Imported = Imported || {};
Imported.OnlyOGG = true;

(function() {
    
    // if this is used for <community-1.3> or higher, it will break.
    if(Utils.RPGMAKER_ENGINE && Utils.RPGMAKER_ENGINE.slice(-3) >= "1.3") {
        return;
    }

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
