/*:
 * @plugindesc This plugin allows you to set up the desired transparent color. <RS_TransparentFilter>
 * @author biud436
 * 
 * @help
 * ================================================================
 * How to Use
 * ================================================================
 * You execute the extension after extract the extension file 
 * and next then select the game project folder. 
 * it's done that you press the Add Extension button. 
 * if you have restarted RPG Maker MV, 
 * it would be created a new icon that indicates a stuff like as an eyedropper in the toolbar. 
 * 
 * - Note that it does not appear the project file select window if you have done settings. 
 * - To delete an extension, you must click the Remove Extension before you delete the extension.
 * ================================================================
 * Download
 * ================================================================
 * This plugin only supports Picture and Character images but 
 * it will be going to add a new sprite type in the next version (Maybe it is a Battler image)
 * 
 * - Plugin Link : https://raw.githubusercontent.com/biud436/MV/master/RS_TransparentFilter.js
 * - Extension (Windows Only) : https://github.com/biud436/MV/releases/download/1.0.0/NewResourceManager.zip
 * 
 * ## Required : 
 * - RPG Make MV 1.5.2 or above.
 * - .NET Framework 4.5.2 or above.
 * 
 * ## Supported Languages
 * - English
 * - Korean
 * ================================================================
 * Change Log
 * ================================================================
 * 2019.02.21 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_TransparentFilter = true;

var RS = RS || {};
RS.TransparentFilter = RS.TransparentFilter || {};

(function($) {

    "use strict";    

    var parameters = $plugins.filter(function(i) {
        return i.description.contains("<RS_TransparentFilter>");
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = $.Params || {};
    $.Params.TransparentKey = null;

    $.loadTransparentKey = function() {
        var path = "data/transparentKey.json";
        var xhr = new XMLHttpRequest();

        xhr.overrideMimeType("application/json");
        xhr.open("GET", path);
        xhr.onload = function() {
            if(xhr.status < 400) {
                RS.TransparentFilter.Params.TransparentKey = $.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    $.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
          try { return $.jsonParse(v); } catch (e) { return v; }
        });
        return retData;
    };

    $.parseColorData = function(data) {
        var ret;

        var color = data;
        var maxValue = 255.0;
        var r = parseInt(data["@red"]) / maxValue;
        var g = parseInt(data["@green"]) / maxValue;
        var b = parseInt(data["@blue"]) / maxValue;
        var a = parseInt(data["@alpha"]) / maxValue;
        ret = [r, g, b, a].map(function(i) { return i * 1.0});    
        
        return ret;
    }

    $.getTransparentColor = function(path, filename) {
        var imageGruop = $.Params.TransparentKey["imagegroup"];
        var items = imageGruop["object"];
        var name = `${filename}.png`;
        var data = [];
        var ret = [1.0, 1.0, 1.0, 1.0];

        if(Array.isArray(items)) {
            data = items.filter(function(i) {
                return i["@path"] == path && i["@name"] == name;
            }, this);

            if(data.length > 0) {
                ret = $.parseColorData(data[0]);
            }            
        } else {
            data = items;
            ret = $.parseColorData(data);
        }

        return ret;

    };

    //============================================================================
    // PIXI.filters.TransparentFilter
    //============================================================================    

    PIXI.filters.TransparentFilter = function() {
        var vertexSrc = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        
        uniform mat3 projectionMatrix;
        
        varying vec2 vTextureCoord;
        
        void main(void)
        {
            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vTextureCoord = aTextureCoord;
        }        
        `;

        var fragmentSrc = `
        varying vec2 vTextureCoord;

        uniform sampler2D uSampler;
        uniform vec4 alphaColor;

        
        void main(void)
        {
            vec4 baseColor = texture2D(uSampler, vTextureCoord).rgba;
            vec3 backgroundColor = baseColor.rgb;
            float d = abs(distance(backgroundColor, alphaColor.rgb));
            float alpha = baseColor.a;

            // Compare to epsilon value.
            if(d < 0.00001) {
                alpha = 0.0;
                backgroundColor.rgb *= alpha;
            }
            
           gl_FragColor = vec4(backgroundColor.rgb, alpha);
        }`;

        PIXI.Filter.call( this, vertexSrc, fragmentSrc );

        this.uniforms.alphaColor = [1.0, 1.0, 1.0, 1.0];

    };

    PIXI.filters.TransparentFilter.prototype = Object.create( PIXI.Filter.prototype );
    PIXI.filters.TransparentFilter.prototype.constructor = PIXI.filters.TransparentFilter; 
   
    $.addFilter = function(color) {

        var isValid = this._alphaFilter;

        if(!isValid) {
            this._alphaFilter = new PIXI.filters.TransparentFilter();
            if(!this.filters) {
                this.filters = [];
            }

            this._alphaFilter.uniforms.alphaColor = color;
            this.filters = [this._alphaFilter].concat(this.filters);

        } else {

            if(!this.filters) {
            this.filters = [];
            }      

            this.filters = this.filters.filter(function(filter) {
                return filter !== isValid;
            }, this);

        }

    };

    //============================================================================
    // Sprite_Character
    //============================================================================  

    Sprite_Character.prototype.applyTransparentFilter = function() {
        if (this.isImageChanged() && !this._alphaFilter) {
            var characterName = this._character.characterName();
            var characterIndex = this._character.characterIndex();    
            if(characterName !== "") {
                var color = $.getTransparentColor("img/characters", characterName);
                RS.TransparentFilter.addFilter.call(this, color);
            }
        }
    };    

    var alias_Sprite_Character_updateBitmap = Sprite_Character.prototype.updateBitmap;
    Sprite_Character.prototype.updateBitmap = function() {
        this.applyTransparentFilter();
        alias_Sprite_Character_updateBitmap.call(this);
    };

    //============================================================================
    // Sprite_Picture
    //============================================================================  

    var alias_Sprite_Base_initialize = Sprite_Base.prototype.initialize;
    Sprite_Base.prototype.initialize = function() {
        alias_Sprite_Base_initialize.call(this);
    };

    Sprite_Picture.prototype.applyTransparentFilter = function() {
        var picture = this.picture();
        if (picture) {
            if (this._pictureName !== "" && !this._alphaFilter) {
                this._isPicture = false;
                var color = $.getTransparentColor("img/pictures", this._pictureName);
                RS.TransparentFilter.addFilter.call(this, color);
            }            
        }        
    };

    var alias_Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        this.applyTransparentFilter();
        alias_Sprite_Picture_updateBitmap.call(this);
    };    


    $.loadTransparentKey();

})(RS.TransparentFilter);