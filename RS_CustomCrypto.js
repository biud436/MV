//================================================================
// RS_CustomCrypto.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
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

(() => {
  const Imported = window.Imported || {};
  const RS = window.RS || {};
  const parameters = PluginManager.parameters('RS_CustomCrypto');

  Imported.RS_CustomCrypto = true;
  RS.CustomCrypto = RS.CustomCrypto || {};
  RS.CustomCrypto.userKey = String(parameters.UserKey || 'Secret Passphrase');

  const data = [
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js',
  ];

  data.forEach(i => {
    const _script = document.createElement('script');
    _script.src = encodeURI(i);
    _script.type = 'text/javascript';

    document.head.appendChild(_script);
  });

  RS.CustomCrypto.getKey = function () {
    return CryptoJS.MD5(RS.CustomCrypto.userKey).toString();
  };

  RS.CustomCrypto.isSetup = function () {
    const arr = document.querySelectorAll('script');
    let result = false;
    for (let i = 0; i < arr.length; i++) {
      if (data.contains(arr[i].url)) {
        result = true;
        break;
      }
    }
    return result;
  };

  RS.CustomCrypto.compress = LZString.compressToBase64;
  RS.CustomCrypto.decompress = LZString.decompressFromBase64;

  LZString.compressToBase64 = function (msg) {
    if (msg === null || undefined) {
      return '';
    }

    const encrypted = CryptoJS.AES.encrypt(msg, RS.CustomCrypto.getKey());

    return encrypted.toString();
  };

  LZString.decompressFromBase64 = function (encrypted) {
    if (encrypted === null || undefined) {
      return '';
    }
    const decrypted = CryptoJS.AES.decrypt(encrypted, RS.CustomCrypto.getKey());

    return decrypted.toString(CryptoJS.enc.Utf8);
  };
})();
