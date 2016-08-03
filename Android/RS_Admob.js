/*:
 * RS_Admob.js
 * @plugindesc Admob
 * @author biud436
 *
 * @param --- Android ---
 * @desc
 * @default
 *
 * @param android Banner ID
 * @desc 배너 광고 ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param android Interstitial Ad ID
 * @desc 전면 광고 ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param --- IOS ---
 * @desc
 * @default
 *
 * @param ios Banner ID
 * @desc 배너 광고 ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param ios Interstitial Ad ID
 * @desc 전면 광고 ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param --- Settings ---
 * @desc
 * @default
 *
 * @param bannerAtTop
 * @desc 배너를 상단에 표시
 * true / false
 * @default false
 *
 * @param Testing
 * @desc
 * @default false
 *
 * @help
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * 배너광고 표시
 * 배너광고 제거
 * 전면광고 표시
 * =============================================================================
 * Credit
 * =============================================================================
 * https://github.com/sunnycupertino/cordova-plugin-admob-simple
 * by Liming Xie
 * by Sunny Cupertino
 */

 var Imported = Imported || {};
 Imported.RS_Admob = true;

 var RS = RS || {};
 RS.Admob = RS.Admob || {};
 RS.Admob.Params = RS.Admob.Params || {};

 (function () {

   var parameters = PluginManager.parameters('RS_Admob');
   RS.Admob.Params.andBannerID = String(parameters['android Banner ID'] || 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx');
   RS.Admob.Params.andInterstitialID = String(parameters['android Interstitial Ad ID'] || 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx');
   RS.Admob.Params.iosBannerID = String(parameters['ios Banner ID'] || 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx');
   RS.Admob.Params.iosInterstitialID = String(parameters['ios Interstitial Ad ID'] || 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx');

   RS.Admob.Params.isTesting = Boolean(parameters['Testing'] === 'true');
   RS.Admob.Params.bannerAtTop = Boolean(parameters['bannerAtTop'] === 'true');

   if(Utils.isNwjs()) {
     console.error('It is not found AdMob Plugin for Intel XDK');
     return false;
   }

   RS.Admob.init = function () {

     if(window.plugins && !window.plugins.AdMob) {
       throw new Error('It is not found AdMob Plugin for Intel XDK');
     }

     var admobid = RS.Admob.getAppID();
     window.plugins.AdMob.setOptions( {
         publisherId: admobid.banner,
         interstitialAdId: admobid.interstitial,
         adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,  //use SMART_BANNER, BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
         bannerAtTop: RS.Admob.Params.bannerAtTop, // set to true, to put banner at top
         overlap: true, // banner will overlap webview
         offsetTopBar: false, // set to true to avoid ios7 status bar overlap
         isTesting: RS.Admob.Params.isTesting, // receiving test ad
         autoShow: true // auto show interstitial ad when loaded
     });

   };

   RS.Admob.getAppID = function () {
     var result = {'banner': '', 'interstitial': ''};
     var isAndroid = /(android)/i.test(navigator.userAgent);
     var isIOS = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
     if(isAndroid)
     {
       result.banner = RS.Admob.Params.andBannerID;
       result.interstitial = RS.Admob.Params.andInterstitialID;
     } else if (isIOS) {
       result.banner = RS.Admob.Params.iosBannerID;
       result.interstitial = RS.Admob.Params.iosInterstitialID;
     }
     return result;
   };

   RS.Admob.showBanner = function (bannerAtTop) {
     if(!window.plugins && !window.plugins.AdMob) console.error('It is not found AdMob Plugin for Intel XDK');
     var options = {
       'publisherId': RS.Admob.getAppID().banner,
       'adSize': window.plugins.AdMob.AD_SIZE.SMART_BANNER,
       'bannerAtTop': RS.Admob.Params.bannerAtTop, // set to true, to put banner at top
       'overlap': true, // banner will overlap webview
       'offsetTopBar': false, // set to true to avoid ios7 status bar overlap
       'isTesting': RS.Admob.Params.isTesting, // receiving test ad
       'autoShow': true // auto show interstitial ad when loaded
     };
     window.plugins.AdMob.createBannerView(options);
   };

   RS.Admob.destroyBanner = function () {
     if(!window.plugins && !window.plugins.AdMob) console.error('It is not found AdMob Plugin for Intel XDK');
     window.plugins.AdMob.destroyBannerView();
   };

   RS.Admob.showInterstitial = function () {
     if(!window.plugins && !window.plugins.AdMob) console.error('It is not found a AdMob Plugin for Intel XDK');
     window.plugins.AdMob.createInterstitialView();
     window.plugins.AdMob.requestInterstitialAd();
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

   };
  };

  if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
      document.addEventListener('deviceready', RS.Admob.init, false);
  } else {
    RS.Admob.init();
  }

 })();
