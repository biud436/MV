/*:
 * RS_CustomCrypto.js
 * @plugindesc This plugin allows you to compress a string by using the secret key.
 * @date 2015.12.29
 * @author biud436
 *
 * @param UserKey
 * @desc UserKey
 * @default Secret Passphrase
 *
 * @param  script_url
 * @desc script_url
 * @default http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js
 *
 */

var Imported = Imported || {};
Imported.RS_CustomCrypto = true;

var RS = RS || {};
RS.CustomCrypto = RS.CustomCrypto || {};

(function() {

  var parameters = PluginManager.parameters("RS_CustomCrypto");
  RS.CustomCrypto.URL = String(parameters['script_url'] || 'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js');
  RS.CustomCrypto.userKey = String(parameters['UserKey'] || 'Secret Passphrase');
  RS.CustomCrypto.subKey = null;

  RS.CustomCrypto.loadScript = function() {
    if(this.isSetup()) return;
    var _script = document.createElement('script');
    _script.url = this.URL;
    document.body.appendChild(_script);
  };

  RS.CustomCrypto.getKey = function() {
    return CryptoJS.MD5(RS.CustomCrypto.userKey).toString();
  };

  RS.CustomCrypto.isSetup = function() {
    var arr = document.querySelectorAll('script');
    var result = false;
    for(i = 0; i < arr.length; i++) {
     if(arr[i].url === this.URL) {
       result = true;
       break;
     }
    }
    return result;
  };

  var alias_Scene_Boot_init = Scene_Boot.prototype.initialize
  Scene_Boot.prototype.initialize = function() {
    RS.CustomCrypto.loadScript();
    alias_Scene_Boot_init .call(this);
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
