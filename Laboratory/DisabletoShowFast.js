/*:
 * DisabletoShowFast.js
 * @plugindesc Disable to show fast
 * @author biud436
 */
(function() {
  Window_Message.prototype.updateShowFast = function() {
    return false;
  };
})();
