/*:ko
 * RS_Admob.js
 * @plugindesc 광고 삽입 플러그인입니다.
 * @author biud436
 *
 * @param --- Android ---
 * @text 안드로이드
 *
 * @param android Banner ID
 * @text 안드로이드 배너 광고 ID
 * @parent --- Android ---
 * @desc 배너 광고 ID (반드시 수정하세요)
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param android Interstitial Ad ID
 * @text 안드로이드 전면 광고 ID
 * @parent --- Android ---
 * @desc 전면 광고 ID (반드시 수정하세요)
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param --- IOS ---
 * @text iOS
 *
 * @param ios Banner ID
 * @text iOS 배너 광고 ID
 * @parent --- IOS ---
 * @desc 배너 광고 ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param ios Interstitial Ad ID
 * @text iOS 전면 광고 ID
 * @parent --- IOS ---
 * @desc 전면 광고 ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param --- Settings ---
 * @text 설정
 *
 * @param bannerAtTop
 * @text 배너를 상단에 표시
 * @type boolean
 * @parent --- Settings ---
 * @desc 배너를 상단에 표시합니다.
 * true / false
 * @default false
 * @on 상단에 표시합니다.
 * @off 하단에 표시합니다.
 *
 * @param Testing
 * @text 광고 테스트 모드 설정
 * @type boolean
 * @parent --- Settings ---
 * @desc 테스트 광고를 표시합니다
 * true / false
 * @default false
 * @on 테스트 광고로 표시
 * @off 실제 광고로 표시
 *
 * @help
 * =============================================================================
 * 플러그인 동작 환경
 * =============================================================================
 * 안드로이드 킷캣(4.4.4)을 기준으로 테스트 되었습니다.
 *
 * 또한, 이 플러그인은 코르도바로 패키징된 앱에서만 동작하므로, 사용 전에 반드시 코르도바
 * 프로젝트를 새로 생성하시기 바랍니다. 어떻게 하는 지 모르겠다는 분들은 아래 글을
 * 참고해주세요.
 *
 * 링크 (네이버 블로그) - http://biud436.blog.me/220521625455
 *
 * 애드몹 설정 페이지에서 광고 단위를 설정한 후, 유효한 광고 ID 값을 매개변수에 적으시
 * 기 바랍니다.
 *
 * 인터넷에 연결되어있지 않거나, 광고 값이 틀린 경우 광고가 나오지 않습니다.
 *
 * 광고 ID 값은 반드시 유효한 상태여야 합니다, 이점 반드시 확인 하시기 바랍니다.
 *
 * - 초기 생성 시 인터넷에 연결되어있지 않으면 애드뷰가 생성되지 않는 것 같습니다.
 * - 광고 ID 값을 반드시 수정하세요, 수정하지 않으면 광고가 표시되지 않습니다.
 *
 * 코르도바 버전이 7이상이고, CLI 환경에서 빌드한다면, 명령 프롬프트에서 아래 명령어를
 * 호출하여 플러그인을 추가할 수 있습니다.
 *
 *    cordova plugin add cordova-plugin-admob-simple
 *
 * 동작하지 않거나 이전 버전이라면,
 * 'npm install -g cordova'로 최신 버전으로 업데이트 해보시기 바랍니다.
 * 아니면 다음 명령어를 호출해보세요.
 *
 *    cordova plugin add https://github.com/sunnycupertino/cordova-plugin-admob-simple
 *
 * =============================================================================
 * 안드로이드 스튜디오로 빌드하기
 * -----------------------------------------------------------------------------
 * 코르도바가 아닌 Xilefian님의 안드로이드 스튜디오 소스 코드를 사용하고 싶으시다면,
 * 아래 글을 참고하여 애드몹을 직접 부착하시기 바랍니다.
 *
 * 안드로이드 스튜디오에서 애드몹 광고 삽입하기 :
 *    http://cafe.naver.com/sonnysoft2004/68937
 *
 * 소스 코드는 계속되는 변경되는 사항으로 인하여 별도의 원격 저장소를 만들지 않았습니다.
 *
 * =============================================================================
 * 플러그인 커맨드
 * -----------------------------------------------------------------------------
 * 배너광고 표시
 * 배너광고 제거
 * 전면광고 표시
 * 인터넷체크 주소
 *
 * =============================================================================
 * 변경 사항
 * -----------------------------------------------------------------------------
 * 2016.08.06 (v1.0.0) - First Release.
 * 2016.10.05 (v1.0.1) - 인터넷 접속 체크를 할 수 있는 기능을 추가했습니다.
 *
 * =============================================================================
 * 크레딧
 * -----------------------------------------------------------------------------
 * Sunny Cupertino
 * Liming Xie
 */
/*:
 * RS_Admob.js
 * @plugindesc This plugin allows you to show up the Ads by using Google AdMob.
 * @author biud436
 *
 * @param --- Android ---
 *
 * @param android Banner ID
 * @parent --- Android ---
 * @desc Banner ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param android Interstitial Ad ID
 * @parent --- Android ---
 * @desc Interstitial Ad ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param --- IOS ---
 *
 * @param ios Banner ID
 * @parent --- IOS ---
 * @desc Banner ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param ios Interstitial Ad ID
 * @parent --- IOS ---
 * @desc Interstitial Ad ID
 * @default ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx
 *
 * @param --- Settings ---
 *
 * @param bannerAtTop
 * @parent --- Settings ---
 * @type boolean
 * @desc The banner shows up at the top of the screen.
 * true / false
 * @default false
 *
 * @param Testing
 * @parent --- Settings ---
 * @type boolean
 * @desc Show up the test ads.
 * true / false
 * @default false
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
 * CheckInternet url
 *
 * =============================================================================
 * Cordova Plugin URL
 * -----------------------------------------------------------------------------
 * To use this plugin, you should add intel xdk cordova plugin as follows.
 *
 * https://github.com/sunnycupertino/cordova-plugin-admob-simple
 *
 * if you would like to add required library in the command line interface and
 * then your cordova version is to 7 or more, You can add the plugin easily by
 * calling at the command line interface as below command:
 *
 *    cordova plugin add cordova-plugin-admob-simple
 *
 * if your cordova version is less than 7, You must call as below command in your
 * command line interface:
 *
 *    npm install -g cordova
 *    cordova plugin add cordova-plugin-admob-simple
 *
 * =============================================================================
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.08.06 (v1.0.0) - First Release
 * 2016.10.05 (v1.0.1) - Added the function that could be checking the internet.
 * =============================================================================
 * Credit
 * -----------------------------------------------------------------------------
 * Sunny Cupertino
 * Liming Xie
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
     console.error('On platforms such as PC and Mac, they are not supported.');
     return false;
   }

   RS.Admob.init = function () {

     if(window.plugins && !window.plugins.AdMob) {
       throw new Error('It is not found AdMob Plugin on your devices.');
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
     if(!window.plugins && !window.plugins.AdMob) console.error('It is not found AdMob Plugin on your devices.');
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
     if(!window.plugins && !window.plugins.AdMob) console.error('It is not found AdMob Plugin on your devices.');
     window.plugins.AdMob.destroyBannerView();
   };

   RS.Admob.showInterstitial = function () {
     if(!window.plugins && !window.plugins.AdMob) console.error('It is not found AdMob Plugin on your devices.');
     window.plugins.AdMob.createInterstitialView();
     window.plugins.AdMob.requestInterstitialAd();
   };

   Utils.checkInternet = function(url) {
     var xhr = new XMLHttpRequest();
     xhr.open('GET', url);
     xhr.onload = function() {
       if (xhr.status < 400) {
       }
     }.bind(this);
     xhr.onerror = function(err) {
       SceneManager.exit();
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
  };

  if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
      document.addEventListener('deviceready', RS.Admob.init, false);
  } else {
    RS.Admob.init();
  }

 })();
