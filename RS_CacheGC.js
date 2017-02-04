//==============================================================================
// RS_CacheGC.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_CacheGC = true;

/*:
 * @plugindesc (v1.0.0) <RS_CacheGC>
 * @author biud436
 *
 * @param GC Count Max
 * @desc Specifies the frequency that a  garbage collector runs.
 * (default = 300 frame)
 * @default 60 * 5
 *
 * @param GC Max Idle
 * @desc The bitmap cache will be deleted if there is no bitmap reuse request between certain frame.
 * (default = 600 frame)
 * @default 60 * 10
 *
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.02.04 (v1.0.0) - First Release
 */
 /*:ko
  * @plugindesc (v1.0.0) <RS_CacheGC>
  * @author biud436
  *
  * @param GC Count Max
  * @desc 가비지 컬렉션을 실행하는 주기
  * (기본값 = 300 frame)
  * @default 60 * 5
  *
  * @param GC Max Idle
  * @desc 특정 시간 동안 비트맵 재사용 요청이 없었을 경우, 해당 캐시를 비웁니다.
  * (기본값 : 600 frame)
  * @default 60 * 10
  *
  * @help
  * =============================================================================
  * Change Log
  * =============================================================================
  * 2017.02.04 (v1.0.0) - First Release
  */


var RS = RS || {};
RS.CacheGC = RS.CacheGC || {};
RS.CacheGC.Params = RS.CacheGC.Params || {};

(function($) {

    "use strict";

    let parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_CacheGC>');
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params.nCountMax = eval(parameters['GC Count Max'] || '60 * 5');
    $.Params.nMaxIdle = eval(parameters['GC Max Idle'] || '60 * 10');

    //==========================================================================
    // RS.CacheGC
    //==========================================================================

    class CacheGC {

        constructor(cache)
        {
            this.cache = cache;
            this.count = 0;
            this.checkCount = 0;
            this.checkCountMax = $.Params.nCountMax;
            this.maxIdle = $.Params.nMaxIdle;
            this.blacklist = [];
        }

        addBlacklist(key)
        {
            this.blacklist.push(key);
        }

        findBlacklist()
        {
          let cache = this.cache._inner;
          let len = Object.keys(cache).length;
          if(len === 0) return false;
          for (let key in cache) {
            this.addBlacklist(key);
          }
        }

        deleteBlacklist(key)
        {
            let idx = this.blacklist.indexOf(key);
            if(this.blacklist[idx]) delete this.blacklist[idx];
        }

        isBlacklist(key)
        {
            let idx = this.blacklist.indexOf(key);
            return idx >= 0;
        }

        update()
        {
            this.count++;
            this.checkCount++;
            if( this.checkCount > this.checkCountMax)
            {
                this.checkCount = 0;
                this.run();
            }
        }

        run()
        {
            let cache = this.cache._inner;
            let temp = [];
            for (let key in cache) {
                let entry = cache[key];
                if(this.isBlacklist(key)) continue;
                if(this.count - entry.touchSeconds > this.maxIdle)
                {
                    temp.push(entry);
                }
            }
            for (let i = 0; i < temp.length; i++) {
                temp[i].free(true);
            }
            temp.length = 0;
        }
    }

    //==========================================================================
    // Graphics
    //==========================================================================

    var alias_Graphics_initialize = Graphics.initialize;
    Graphics.initialize = function () {
        alias_Graphics_initialize.call(this);
        this.cacheGC = new CacheGC(ImageManager.cache);
    };

    //==========================================================================
    // SceneManager
    //==========================================================================

    var alias_SceneManager_updateInputData = SceneManager.updateInputData;
    SceneManager.updateInputData = function() {
        alias_SceneManager_updateInputData.call(this);
        Graphics.cacheGC.update();
    };

    //==========================================================================
    // Scene_Boot
    //==========================================================================

    var alias_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function() {
      alias_Scene_Boot_loadSystemImages.call(this);
      Graphics.cacheGC.findBlacklist();
    };

    //==========================================================================
    // CacheEntry
    //==========================================================================

    CacheEntry.prototype.touch = function () {
        var cache = this.cache;
        if (this.cached) {
            this.touchTicks = cache.updateTicks;
            this.touchSeconds = Graphics.cacheGC.count;
        } else if (this.freedByTTL) {
            this.freedByTTL = false;
            //TODO: shall we log this event? its not normal
            if (!cache._inner[this.key]) {
                cache._inner[this.key] = this;
            }
        }
    };

    //==========================================================================
    // ImageManager
    //==========================================================================

    var alias_ImageManager_clear = ImageManager.clear;
    ImageManager.clear = function() {
      alias_ImageManager_clear.call(this);
      Graphics.cacheGC.count = 0;
    };

})(RS.CacheGC);
