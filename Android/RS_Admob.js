//================================================================
// RS_Admob.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_Admob.js
 * @plugindesc This plugin allows you to show up the Ads by using Google AdMob <RS_Admob>
 * @author biud436
 *
 * @param [Android]
 *
 * @param android Banner ID
 * @text Banner
 * @parent [Android]
 * @desc Banner ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param android Interstitial Ad ID
 * @text Interstitial
 * @parent [Android]
 * @desc Interstitial Ad ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 * 
 * @param android Reward Video Ad ID
 * @text Reward Video
 * @parent [Android]
 * @desc Reward Video Ad ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param [IOS]
 *
 * @param ios Banner ID
 * @text Banner
 * @parent [IOS]
 * @desc Banner ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param ios Interstitial Ad ID
 * @text Interstitial
 * @parent [IOS]
 * @desc Interstitial Ad ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 * 
 * @param ios Reward Video Ad ID
 * @text Reward Video
 * @parent [IOS]
 * @desc Reward Video Ad ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param [Settings]
 *
 * @param bannerAtTop
 * @parent [Settings]
 * @type boolean
 * @desc The banner shows up at the top of the screen.
 * @default false
 * @on true
 * @off false
 *
 * @param Testing
 * @parent [Settings]
 * @type boolean
 * @desc Show up the test ads.
 * @default false
 * @on true
 * @off false
 * 
 * @param [Rewards]
 * 
 * @param Fail Event
 * @parent [Rewards]
 * @text Fail Event
 * @type note
 * @desc Specify to run the certain code block when failed to load reward video.
 * @default "console.log(\"ad fail\");"
 * 
 * @param Load Event
 * @parent [Rewards]
 * @text Load Event
 * @type note
 * @desc Specify to run the certain code block when loaded reward video.
 * @default "console.log(\"ad loaded\");"
 * 
 * @param Close Event
 * @parent [Rewards]
 * @text Close Event
 * @type note
 * @desc Specify to run the certain code block when closing reward video.
 * @default "// reward\nconsole.log(\"reward\");"
 * 
 * @param Reward Event
 * @parent [Rewards]
 * @text Reward Event
 * @type note
 * @desc Specify to run the certain reward code block after ended the reward video.
 * @default "console.log(\"reward : +100 gold\");"
 * 
 * @help
 *
 * 1. Join and setup the AdMob:
 * - You must set up the id of the ads type at the google AdMob setup page.
 * If its id doesn't exist and invalid, then it doesn't work properly so you must
 * check it.
 *
 * 2. Check whether the internet connects:
 * - You should also connect the internet while the ads is showing up. if not,
 * then Ads-View may not seem create it.
 *
 * =============================================================================
 * Plugin Commands
 * -----------------------------------------------------------------------------
 * There are four functions here. you can use them. They could be created new Ads
 * and could already be hidden the created Ads.
 *
 * Banner show
 * Banner remove
 * Interstitial show
 * 
 * ShowRewardVideo
 * 
 * CheckInternet url
 *
 * =============================================================================
 * Cordova
 * -----------------------------------------------------------------------------
 * You must add plugin using cordova CLI.
 * 
 *    cordova plugin add cordova-plugin-admob-free --save --variable ADMOB_APP_ID="<YOUR_ANDROID_ADMOB_APP_ID_AS_FOUND_IN_ADMOB>"
 * 
 * Notice that you have to change the text called <YOUR_ANDROID_ADMOB_APP_ID_AS_FOUND_IN_ADMOB>
 * 
 * =============================================================================
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.08.06 (v1.0.0) - First Release
 * 2016.10.05 (v1.0.1) - Added the function that could be checking the internet.
 * 2019.11.06 (v1.0.2) :
 * - Fixed the bug that is not working.
 * - Changed as the cordova plugin(extension) that works fine.
 * - Added reward video.
 * - Changed SceneManager.exit() to navigator.app.exitApp();
 */

var Imported = Imported || {};
Imported.RS_Admob = true;

var RS = RS || {};
RS.Admob = RS.Admob || {};

(function () {
  
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_Admob>');
  });
  
  parameters = (parameters.length > 0) && parameters[0].parameters;

  if(Utils.isNwjs()) {
    console.error('This plugin is not available on the PC.');
    return false;
  }  

  var jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };  
  
  // Setting plugin parameters
  RS.Admob.Params = {
    andBannerID  : parameters['android Banner ID'],
    andInterstitialID  : parameters['android Interstitial Ad ID'],
    andRewardVideoID   : parameters["android Reward Video Ad ID "],
    iosBannerID  : parameters['ios Banner ID'],
    iosInterstitialID  : parameters['ios Interstitial Ad ID'],
    iosRewardVideoID   : parameters["ios Reward Video Ad ID "],
    isTesting  : Boolean(parameters['Testing'] === 'true'),
    bannerAtTop  : Boolean(parameters['bannerAtTop'] === 'true'),
    failEvent  : jsonParse(parameters["Fail Event"]),
    loadEvent  : jsonParse(parameters["Load Event"]),
    closeEvent   : jsonParse(parameters["Close Event"]),
    rewardEvent   : jsonParse(parameters["Reward Event"]),
    failMsg : "Cannot be found AdMob on the current device.",
  };

  // Reward Event
  RS.Admob.Event = {
    fail: function(event) {
      eval(RS.Admob.Params.failEvent);
    },
    load: function(event) {
      eval(RS.Admob.Params.loadEvent);
    },
    close: function(event) {
      eval(RS.Admob.Params.closeEvent);
    },
    reward: function(event) {
      eval(RS.Admob.Params.rewardEvent);
    },
  };

  RS.Admob.getAppID = function () {

    "use strict";

    var isAndroid = /(android)/i.test(navigator.userAgent);
    var isIOS = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
    var platformName = isAndroid ? 'and' : (isIOS ? 'ios' : '');

    var result = {
      'banner': RS.Admob.Params[`${platformName}BannerID`] || '', 
      'interstitial': RS.Admob.Params[`${platformName}InterstitialID`] || '', 
      'rewardVideo': RS.Admob.Params[`${platformName}RewardVideoID`] || '',
    };

    return result;
  };
    
  /**
   * @method RS.Admob.init
   */
  RS.Admob.init = function () {
    
    if(window.plugins && !window.plugins.AdMob) {
      throw new Error(RS.Admob.Params.failMsg);
    }
    
    /**
     * @see https://ratson.github.io/cordova-plugin-admob-free/function/index.html#static-function-setOptions
     */
    var admobid = RS.Admob.getAppID();

    window.plugins.AdMob.setOptions( {
      publisherId: admobid.banner,
      interstitialAdId: admobid.interstitial,
      bannerAtTop: RS.Admob.Params.bannerAtTop,
      overlap: true,
      offsetTopBar: false,
      isTesting: RS.Admob.Params.isTesting,
      autoShow: true
    });

    admob.banner.config({
      id: RS.Admob.getAppID().banner,
      isTesting: RS.Admob.Params.isTesting,
      autoShow: true,
    });
    admob.banner.prepare();
    
    admob.interstitial.config({
      id: RS.Admob.getAppID().interstitial,
      isTesting: true,
      autoShow: false,
    })
    admob.interstitial.prepare();    

    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', RS.Admob.Event.fail);
    document.addEventListener('admob.rewardvideo.events.LOAD', RS.Admob.Event.load);
    document.addEventListener('admob.rewardvideo.events.CLOSE', RS.Admob.Event.close);    
    document.addEventListener('admob.rewardvideo.events.REWARD', RS.Admob.Event.reward);
    
  };

  RS.Admob.remove = function() {
    document.removeEventListener('admob.rewardvideo.events.LOAD_FAIL', RS.Admob.Event.fail);
    document.removeEventListener('admob.rewardvideo.events.LOAD', RS.Admob.Event.load);
    document.removeEventListener('admob.rewardvideo.events.CLOSE', RS.Admob.Event.close);  
    document.removeEventListener('admob.rewardvideo.events.REWARD', RS.Admob.Event.reward);      
  };
  
  RS.Admob.showBanner = function (bannerAtTop) {
    if(!window.plugins && !window.plugins.AdMob) console.error(RS.Admob.Params.failMsg);

    admob.banner.config({
      id: RS.Admob.getAppID().banner,
      isTesting: RS.Admob.Params.isTesting,
      bannerAtTop: bannerAtTop,
      autoShow: true,
    });

    admob.banner.prepare();    
    admob.banner.show();
  };
  
  RS.Admob.destroyBanner = function () {
    if(!window.plugins && !window.plugins.AdMob) console.error(RS.Admob.Params.failMsg);
    admob.banner.hide();
  };
  
  RS.Admob.showInterstitial = function () {
    if(!window.plugins && !window.plugins.AdMob) console.error(RS.Admob.Params.failMsg);
    admob.interstitial.config({
      id: RS.Admob.getAppID().interstitial,
      isTesting: RS.Admob.Params.isTesting,
      autoShow: true,
    })
    admob.interstitial.prepare();   
    admob.interstitial.show();
  };

  RS.Admob.showRewardVideo = function() {
    var admobid = RS.Admob.getAppID;
    
    admob.rewardvideo.config({
      id: admobid.rewardVideo,
      isTesting: RS.Admob.Params.isTesting,
      autoShow: true
    });

    admob.rewardvideo.prepare();
    admob.rewardvideo.show();
  };
  
  Utils.checkInternet = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status < 400) {
      }
    }.bind(this);
    xhr.onerror = function(err) {
      navigator.app.exitApp();
    }.bind(this);
    xhr.send();
  };
  
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    
    if(command === "Banner" || command === "배너광고") {
      switch (args[0]) {
        case 'show':
        case '표시':
        var bannerAtTop
        if(args[1] === '' || args[1] === null || args[1] === undefined) {
          bannerAtTop = RS.Admob.Params.bannerAtTop;
        } else {
          bannerAtTop = Boolean(args[1] === 'true');
        }
        RS.Admob.showBanner(bannerAtTop);
        break;
        case 'remove':
        case '제거':
        RS.Admob.destroyBanner();
        break;
      }
    }
    
    if(command === "Interstitial" || command === "전면광고") {
      switch (args[0]) {
        case 'show':
        case '표시':
        RS.Admob.showInterstitial();
        break;
      }
      
      if(command === "RewardVideoAd" || command === "보상형광고") {
        switch (args[0]) {
          
          case 'show':
          case '표시':
          break;
          
        }
      }
      
      if(command === "CheckInternet" || command === "인터넷체크") {
        Utils.checkInternet(args[0]);
      }
      
    };

    if(command === "ShowRewardVideo") {
      RS.Admob.showRewardVideo();
    }

  };
  
  if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', RS.Admob.init, false);
  } else {
    RS.Admob.init();
  }
  
})();
