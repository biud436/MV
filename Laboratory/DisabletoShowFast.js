/*:
 * DisabletoShowFast.js
 * @plugindesc In Message Box, Disable the ability to show a text quick.
 * @author biud436
 *
 * @help
 * This plugin does not provide plugin commands
 *
 */
(function() {
  Window_Message.prototype.updateShowFast = function() {
    return false;
  };
})();
