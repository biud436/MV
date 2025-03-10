//================================================================
// RS_ModeTextCurosrFixes.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin can prevent changing cursor in the mode box.
 * @author biud436
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin fixes an issue where the cursor changes its appearance when
 * hovering over mode boxes in RPG Maker MV. It maintains a consistent default
 * cursor style throughout the game interface.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 * Simply install this plugin and it will automatically apply the fix.
 * No additional configuration is required.
 *
 * ============================================================================
 * Technical Details
 * ============================================================================
 * The plugin works by modifying the CSS cursor style of all div elements
 * in the document to 'default', ensuring a consistent cursor appearance.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2016.10.06 (v1.0.0) - First Release.
 */
var Imported = Imported || {};
Imported.RS_ModeTextCurosrFixes = true;

(function () {
  var alias_SceneManager_initGraphics = SceneManager.initGraphics;
  SceneManager.initGraphics = function () {
    alias_SceneManager_initGraphics.call(this);
    var child = document.querySelectorAll('div');
    var len = child.length;
    for (var i = 0; i < len; i++) {
      child.item(i).style.cursor = 'default';
    }
  };
})();
