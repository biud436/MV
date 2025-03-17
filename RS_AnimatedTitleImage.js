// ================================================================
// RS_AnimatedTitleImage.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
// ================================================================
// eslint-disable-next-line spaced-comment
/*:
 * RS_AnimatedTitleImage.js
 * @plugindesc This plugin changes a title screen image at specific time intervals.
 * @author biud436
 *
 * @param Title Image
 * @type struct<TitleImage>[]
 * @default ["{\"Image\":\"Book\",\"Time\":\"2.0\"}","{\"Image\":\"Night\",\"Time\":\"1.5\"}","{\"Image\":\"Sword\",\"Time\":\"1.2\"}","{\"Image\":\"Tower2\",\"Time\":\"3.4\"}"]
 *
 * @param Preload
 * @type boolean
 * @desc Decides whether it will be preloading title images.
 * @default true
 *
 * @help
 * This plugin changes a title screen image at specific time intervals.
 *
 * - Change Log
 * 2015.11.09 (v1.0.0) - First Release.
 * 2016.07.16 (v1.0.1) - Added the plugin parameter that could be decided
 * whether it will be preloading title images.
 * 2016.10.30 (v1.0.2) :
 * - Fixed the name of the incorrect file.
 * - Fixed the bug that occurs when the main program lost focus.
 * 2017.06.08 (v1.0.3) :
 * - Fixed the bug that is not working in RMMV 1.5.0
 * 2017.07.09 (v1.0.4) :
 * - Added the feature that can add the title images dynamically via newly plugin manager features.
 */

// eslint-disable-next-line spaced-comment
/*~struct~TitleImage:
 *
 * @param Image
 * @desc Specifies to import file in the path from img/titles1 folder.
 * @default
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param Time
 * @type number
 * @decimals 1
 * @desc redraw the title screen image at specific time intervals.
 * @default 2.0
 * @min 1.0
 *
 */

(() => {
  'use strict';

  const parameters = PluginManager.parameters('RS_AnimatedTitleImage');
  const RS = window.RS || {};
  RS.Utils = RS.Utils || {};
  RS.AnimatedTitleImage = RS.AnimatedTitleImage || {};

  RS.AnimatedTitleImage.Params = RS.AnimatedTitleImage.Params || {};
  RS.AnimatedTitleImage.Params.isPreload = Boolean(
    parameters.Preload === 'true'
  );
  RS.AnimatedTitleImage.Params.images = [];

  RS.Utils.jsonParse = function (str) {
    const retData = JSON.parse(str, (k, v) => {
      try {
        return RS.Utils.jsonParse(v);
      } catch (e) {
        return v;
      }
    });
    return retData;
  };

  function initWithImages() {
    const data = RS.Utils.jsonParse(parameters['Title Image']);
    data.forEach(e => RS.AnimatedTitleImage.Params.images.push(e));
  }

  const alias_Scene_Boot_loadSystemImages =
    Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function () {
    alias_Scene_Boot_loadSystemImages.call(this);
    if (!RS.AnimatedTitleImage.Params.isPreload) return;
    RS.AnimatedTitleImage.Params.images.forEach(i => {
      ImageManager.loadTitle1(i.Image);
    });
  };

  const alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function () {
    alias_Scene_Title_create.call(this);
    this._spriteIndex = 0;
    PIXI.ticker.shared.add(this.chooseIndex, this);
    PIXI.ticker.shared.stop();
    PIXI.ticker.shared.start();
    this._nSavingTime = performance.now();
  };

  const alias_Scene_Title_terminate = Scene_Title.prototype.terminate;
  Scene_Title.prototype.terminate = function () {
    alias_Scene_Title_terminate.call(this);
    PIXI.ticker.shared.remove(this.chooseIndex, this);
  };

  Scene_Title.prototype.chooseIndex = function () {
    const collections = RS.AnimatedTitleImage.Params.images;
    if (!collections || !Array.isArray(collections)) {
      return;
    }
    const index = this._spriteIndex;
    const data = collections[index];
    const next = (parseFloat(data.Time) || 1) * 1000;
    const { lastTime } = PIXI.ticker.shared;
    if (data && lastTime - this._nSavingTime >= next) {
      if (this._backSprite1) {
        this._backSprite1.bitmap = ImageManager.loadTitle1(data.Image);
      }
      this._nSavingTime = lastTime;
      this._spriteIndex = Math.floor(this._nSavingTime) % collections.length;
    }
  };

  initWithImages();
})();
