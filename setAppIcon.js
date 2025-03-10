/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
//================================================================
// setAppIcon.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <setAppIcon>
 * @author biud436
 *
 * @help
 *
 */

function setAppIcon(filename) {
  'use strict';

  if (!Utils.isNwjs()) {
    return;
  }

  const fs = require('fs');
  const path = require('path');
  const cp = require('child_process');
  const root = path.dirname(process.mainModule.filename);
  const relativePath = name => {
    return path.join(root, name);
  };

  if (!fs.existsSync(relativePath(filename))) {
    console.warn(`Cannot find the icon image at ${filename}`);
    return;
  }

  // Copies the manifest.
  const data = {
    name: '',
    main: 'index.html',
    'js-flags': '--expose-gc',
    window: {
      title: '',
      toolbar: false,
      width: 816,
      height: 624,
      icon: filename,
    },
  };

  // Stringify the data that changed app icon
  const contents = JSON.stringify(data, null, '\t');

  fs.writeFileSync(relativePath('package.json'), contents, 'utf8');

  // Restart the game.
  chrome.runtime.reload();
}
