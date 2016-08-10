/*:
 * SimpleEncryptionSystemFixes.js
 * @plugindesc This plugin fixes the bug of simple encryption system
 * of RPG Maker MV 1.3.0.
 * @author biud436
 */

var Imported = Imported || {};
Imported.EncryptionFixes = true;

(function () {

  if(Utils.RPGMAKER_VERSION === '1.3.0') {
    Decrypter.REMAIN = "0000000020";
  }

})();
