/*:
 * RS_ExitDialog.js
 * @plugindesc RS_ExitDialog.js
 * @author biud436
 *
 * @param Dialog Name
 * @desc Information Dialog
 * @default Information Dialog
 *
 * @param Show Custom Dialog Name
 * @desc Show Custom Dialog Name
 * @default false
 *
 * @param Exit Message
 * @desc Exit Message
 * @default Do you want to exit the game?
 *
 * @param OK Button
 * @desc OK Button's Name
 * @default OK
 *
 * @param Cancel Button
 * @desc Cancel Button's Name
 * @default Cancel
 *
 * @help
 *
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * This plugin does not provide plugin commands
 *
 * =============================================================================
 * Setup
 * =============================================================================
 * 1. Add the Notification plugin(cordova-plugin-dialogs) on Intel XDK.
 * 2. Edit an index.html file in your Game Directory using Text Editor such as Notepad++
 * You have to contain Cordova Script into <body> statement, It looks like this.
 *       ...
 *     <body style="background-color: black">
 *       <script type="text/javascript" src="cordova.js"></script>
 *       <script type="text/javascript" src="js/libs/pixi.js"></script>
 *       ...
 *     </body>
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.29 - The incorrect character fixed.
 */

(function() {

  var parameters = PluginManager.parameters('RS_ExitDialog');
  var message = String(parameters['Exit Message'] || "Do you want to exit the game?" );
  var okBtn = String(parameters['OK Button'] || "OK" );
  var cancelBtn = String(parameters['Cancel Button'] || "Cancel" );
  var dialogName = String(parameters['Dialog Name'] || "Information Dialog" );
  var isCustomDialog = Boolean(parameters['Show Custom Dialog Name'] === 'true')

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
      document.addEventListener("backbutton", SceneManager.detectScene, false);
  }

  function onBackKeyDown() {
      if(!Utils.isMobileDevice) return false;
      if(!isCustomDialog) dialogName = $dataSystem.gameTitle || "Information Dialog";
      navigator.notification.confirm(message, function(index) {
          if(index === 1) {
              SceneManager.exit();
          }
      }, dialogName, [okBtn, cancelBtn]);
  }

  SceneManager.detectScene = function() {
      if(SceneManager._scene instanceof Scene_Map) {
        SceneManager.goto(Scene_Title);
      } else if(SceneManager._scene instanceof Scene_Title) {
        onBackKeyDown();
      } else {
        SceneManager._scene.popScene();
      }
  }

})();
