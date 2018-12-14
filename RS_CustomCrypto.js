/*:
 * @plugindesc (v1.0.1) This plugin allows you to ecrypt with AES method in your save file.
 * @date 2015.12.29
 * @author biud436
 *
 * @param UserKey
 * @desc Specify desired secret key.
 * @default Secret Passphrase
 * 
 * @help
 * ===================================================================
 * Version Log
 * ===================================================================
 * 2015.12.29 (v1.0.0) - First Release.
 * 2018.12.15 (v1.0.1) - Fixed the issue that couldn't find the CryptoJS library from google-cdn.
 */
/*:ko
 * @plugindesc (v1.0.1) 비밀키를 사용하여 세이브 파일을 AES 방식으로 암호화합니다.
 * @date 2015.12.29
 * @author biud436
 *
 * @param UserKey
 * @text 비밀 키
 * @desc 원하는 비밀키를 입력해주십시오.
 * @default Secret Passphrase
 * 
 * @help
 * ===================================================================
 * Version Log
 * ===================================================================
 * 2015.12.29 (v1.0.0) - First Release.
 * 2018.12.15 (v1.0.1) - Fixed the issue that couldn't find the CryptoJS library from google-cdn.
 */

var Imported = Imported || {};
Imported.RS_CustomCrypto = true;

var RS = RS || {};
RS.CustomCrypto = RS.CustomCrypto || {};

(function() {

  var parameters = PluginManager.parameters("RS_CustomCrypto");
  RS.CustomCrypto.userKey = String(parameters['UserKey'] || 'Secret Passphrase');

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

  RS.CustomCrypto.getKey = function() {
    return CryptoJS.MD5(RS.CustomCrypto.userKey).toString();
  };

  RS.CustomCrypto.isSetup = function() {
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

  RS.CustomCrypto.compress = LZString.compressToBase64;
  LZString.compressToBase64 = function(msg) {
    if(msg === null || undefined) { return; }
    var encrypted = CryptoJS.AES.encrypt(msg, RS.CustomCrypto.getKey());
    return encrypted.toString();
  };

  RS.CustomCrypto.decompress = LZString.decompressFromBase64;
  LZString.decompressFromBase64 = function(encrypted) {
    if(encrypted === null || undefined) { return; }
    var decrypted = CryptoJS.AES.decrypt(encrypted, RS.CustomCrypto.getKey());
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

})();
