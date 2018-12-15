/*:
 * @plugindesc <RS_SimpleProtector>
 * @author biud436
 * 
 * @help
 * There is no description.
 */
/*:ko
 * @plugindesc <RS_SimpleProtector>
 * @author biud436
 * 
 * @help
 * 플러그인을 바이너리 코드로 컴파일해야 비교적 안전합니다.
 * 속도 저하를 피하려면 RPG Maker MV를 1.6.1 버전으로 업데이트 해야 합니다.
 * 
 * 설치된 폴더로 가면 nwjs-win-test 폴더에 nwjc라는 프로그램이 있습니다.
 * 이 파일을 명령 프롬프트(cmd)로 실행할 때 플러그인 파일 이름을 적으면, 
 * 플러그인 파일의 소스 코드가 바이너리화 되며, 소스 코드를 극적으로 보호할 수 있습니다.
 * 
 * 단 V8 버전 별로 다르기 때문에, NWJS 버전에 맞는 툴을 사용해야 합니다.
 * 
 * 바이너리 파일은 다음과 같이 로드 할 수 있습니다.
 * 먼저 경로를 획득해야 합니다.
 * 1.6.1 버전부터는 파일 경로가 전과 달라지므로 다음과 같은 방법을 써야 합니다.
 * 
 * <script>
 * (function() {
 *    var path = require('path');
 *    var mainPath = path.join(process.mainModule.filename, "..");
 * 
 *    nw.Window.get().evalNWBin(null, path.join(mainPath, 'js/plugins/RS_SimpleProtector.bin'));
 * 
 * })();
 * 
 * </script>
 * 
 * 위 소스 코드를 index.html 파일의 <body></body> 사이에 추가하십시오.
 * 
 * =====================================
 * Version Log
 * =====================================
 * 2018.12.15 (v1.0.1) - 암호화 방법 변경
 */

var Imported = Imported || {};
Imported.RS_SimpleProtector = true; 

var RS = RS || {};
RS.SimpleProtector = RS.SimpleProtector || {};

(function() {

  var parameters = $plugins.filter(function(i) {
    i.description.contains("<RS_SimpleProtector>");
  });
  
  parameters = (parameters.length > 0) && parameters[0].parameters;  

  RS.SimpleProtector.Params = RS.SimpleProtector.Params || {};

  var data = [
    "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core.js",
    "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js",
    "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js",
  ];
  
  data.forEach(function(i) {
    var _script = document.createElement('script');
    _script.src = encodeURI(i);
    document.body.appendChild(_script);    
  })

  RS.SimpleProtector.getKey = function(key) {
    if(!window.CryptoJS) {
      return new Error("Could not find the CryptoJS library.");
    }    
    return CryptoJS.MD5(key).toString();
  };

  RS.SimpleProtector.isSetup = function() {
    var arr = document.querySelectorAll('script');
    var result = false;
    for(i = 0; i < arr.length; i++) {
     if(data.contains(arr[i].url)) {
       result = true;
       break;
     }
    }
    return result;
  };  

  RS.SimpleProtector.encrypt = function(key, unsafety_msg) {
    if(!window.CryptoJS) {
      return new Error("Could not find the CryptoJS library.");
    }
    if(!unsafety_msg) {
      return;
    }
    var encrypted = CryptoJS.AES.encrypt(unsafety_msg, RS.SimpleProtector.getKey(key));

    return encrypted.toString();

  };

  RS.SimpleProtector.decrypt = function(key, encrypted) {
    if(!window.CryptoJS) {
      return new Error("Could not find the CryptoJS library.");
    }
    if(!encrypted) {
      return;
    }    
    var decrypted = CryptoJS.AES.decrypt(encrypted, RS.SimpleProtector.getKey(key));

    return decrypted.toString(CryptoJS.enc.Utf8);    

  };
  
  //==============
  // Game_System
  //==============

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._checkPartyGoldData = {
        hashKey: Date.now(),
        value: 0,
        init: false
    };    
  };
  
  Game_System.prototype.initPartyGoldData = function() {
    this._checkPartyGoldData.init = true;
  };
  
  Game_System.prototype.isInitPartyGoldData = function() {
    return this._checkPartyGoldData.init;
  };  
  
  Game_System.prototype.setPartyGoldData = function(value) {
    var key = String(this._checkPartyGoldData.hashKey);
    this._checkPartyGoldData.value = RS.SimpleProtector.encrypt(key, String(value));
  };
  
  Game_System.prototype.getHashedPartyGoldData = function(value) {

    var key = String(this._checkPartyGoldData.hashKey);
    var value = RS.SimpleProtector.decrypt(key, this._checkPartyGoldData.value);
    value = parseInt(value);

    if(!isNaN(value)) {
      return value;
    }

    return 0;

  };  

  //==============
  // Game_Party
  //==============  
    
  var alias_Game_Party_gainGold = Game_Party.prototype.gainGold;
  Game_Party.prototype.gainGold = function(amount) {
      alias_Game_Party_gainGold.call(this, amount);
      $gameSystem.setPartyGoldData(this._gold);
      if(!$gameSystem.isInitPartyGoldData()) $gameSystem.initPartyGoldData();
  };
  
  Game_Party.prototype.isValidGold = function() {
      var hashedValue = 0;
      if($gameSystem.isInitPartyGoldData()) {
        hashedValue = $gameSystem.getHashedPartyGoldData();
      }
      if(hashedValue !== $gameParty.gold()) {
        return false;
      }
      if($gameParty.gold() > $gameParty.maxGold()) {
        return false;
      }    
      return true;
  };

  //==============
  // Scene_Map
  //==============   
  
  Scene_Map.prototype.updateCheckPartyGold = function() {
    if(!$gameParty.isValidGold()) {
      console.warn("Memory hacking has detected.");
      alert("Memory hacking has detected.");
      SceneManager.exit();
    }
  };
   
  var alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    alias_Scene_Map_update.call(this);
    this.updateCheckPartyGold();
  };
 
})();