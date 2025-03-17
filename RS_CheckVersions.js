//================================================================
// RS_CheckVersions.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to open the market page in a boot scene if there has detected a new version for this game <RS_CheckVersions>
 * @author biud436
 *
 * @param target
 * @text Target
 * @type select
 * @desc self : Open the page to current page
 * blank : Open the page to a new window
 * @default _self
 * @option self
 * @value _self
 * @option blank
 * @value _blank
 *
 * @param url
 * @text Default URL
 * @desc Specify the url of the json file that has the version text.
 * @default https://github.com/biud436/MV/raw/master/Laboratory/Versions.json
 *
 * @param defaultMessage
 * @text Default Message
 * @desc Specify the default message in an alert window.
 * (The #{VERSION} text will be changed as real version value)
 * @default There has detected a new version<#{VERSION}> for this game.
 *
 * @param errorMessage
 * @text Error Message
 * @desc When you are not connected the Internet you get an warning message and exit the game.
 * @default Not connected to the Internet.
 *
 * @param marketUrl
 * @text Market Page URL
 * @desc Specify the market page url of each platform.
 * @type struct<MarketPage>
 * @default {"Android":"https://play.google.com/store/apps/details?id=<package-name>","iOS":"http://itunes.apple.com/<country>/app/<app–name>/id<app-ID>?mt=8"}
 *
 * @help
 * To be able to set up this plugin, You follow these steps. We need to create
 * the version file in a project folder and server.
 *
 * 1. We need to add the file called "Versions.json" to <your_project>/data/ folder
 * 2. Next we must add the file called "Versions.json" in your private site (or server),
 * for fetching the version data file in the site or server.
 * 3. The contents of each JSON file should then something like this.
 * If you need to update, please change the version value in the site or server.
 *
 * {
 * 	"version": "1.0.0"
 * }
 *
 * When you are not connected the Internet you get an warning message.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.11.29 (v1.0.0) - First Release
 */

/*~struct~MarketPage:
 *
 * @param Android
 * @desc Specify the market page url
 * Replace <package-name> text to a real package name.
 * @default https://play.google.com/store/apps/details?id=<package-name>
 *
 * @param iOS
 * @desc Specify the market page url
 * Replace queries like <country>, <app–name>, <app-ID> to a real value
 * @default http://itunes.apple.com/<country>/app/<app–name>/id<app-ID>?mt=8
 *
 */
(() => {
  const Imported = window.Imported || {};
  const RS = window.RS || {};

  Imported.RS_CheckVersions = true;
  RS.Net = RS.Net || {};

  let parameters = $plugins.filter(i => {
    return i.description.contains('<RS_CheckVersions>');
  });
  parameters = parameters.length > 0 && parameters[0].parameters;

  const defaultMessage =
    parameters.defaultMessage ||
    'There has detected a new version for this game.';
  const errorMessage =
    parameters.errorMessage || 'Not connected to the Internet';
  const windowTarget = parameters.target || '_self';
  const marketUrl = JSON.parse(parameters.marketUrl);

  const defaultUrl = `${
    parameters.url ||
    'https://github.com/biud436/MV/raw/master/Laboratory/Versions.json'
  }?${Date.now()}`;

  DataManager._databaseFiles.push({
    name: '$game_versions',
    src: 'Versions.json',
  });

  RS.Net.initVersion = function (callback) {
    fetch(defaultUrl)
      .then(response => response.json())
      .then(json => {
        RS.Net._dbVersion = json.version;
        const pageUrl = Utils.isMobileSafari()
          ? marketUrl.iOS
          : marketUrl.Android;
        const isNwJs = Utils.isNwjs();
        const isRequestedNewVersion =
          RS.Net._dbVersion !== $game_versions.version;
        const version = RS.Net._dbVersion || '0.0.0';
        const message = defaultMessage.replace('#{VERSION}', version);
        if (!isNwJs && isRequestedNewVersion) {
          // eslint-disable-next-line no-alert
          window.alert(message);
          window.open(pageUrl, windowTarget);
          return false;
        }
        return json();
      })
      .then(() => {
        callback();
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        window.alert(errorMessage);
        SceneManager.exit();
      });
  };

  const alias_Scene_Boot_initialize = Scene_Boot.prototype.initialize;
  const alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.initialize = function () {
    alias_Scene_Boot_initialize.call(this);
    RS.Net.initVersion(alias_Scene_Boot_start);
  };

  Scene_Boot.prototype.start = function () {};
})();
