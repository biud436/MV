/*:
 * @plugindesc <RS_TransparentFilterTest>
 * @author biud436
 * 
 * @param Title
 * @type boolean
 * @desc
 * @default true
 * @on true
 * @off false
 * 
 * @param Map
 * @type boolean
 * @desc
 * @default true
 * @on true
 * @off false
 * 
 * @param Picture
 * @type boolean
 * @desc
 * @default true
 * @on true
 * @off false
 * 
 * @help
 * 
 */

var Imported = Imported || {};
Imported.RS_TransparentFilterTest = true;

var RS = RS || {};
RS.TransparentFilterTest = RS.TransparentFilterTest || {};

(function($) {

    "use strict";    

    var parameters = $plugins.filter(function(i) {
        return i.description.contains("<RS_TransparentFilterTest>");
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = $.Params || {};
    $.Params.isValid = {
        'Title': Boolean(parameters["Title"] === "true"),
        'Map': Boolean(parameters["Map"] === "true"),
        'Picture': Boolean(parameters["Picture"] === "true")
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

        /**
         * https://stackoverflow.com/questions/47072304/opengles-how-to-change-black-pixels-to-transparent-pixels
         */

        var fragmentSrc = `
        varying vec2 vTextureCoord;

        uniform sampler2D uSampler;
        uniform vec4 alphaColor;
        uniform float thresh;
        uniform float slope;
        
        void main(void)
        {
           vec3 backgroundColor = texture2D(uSampler, vTextureCoord).rgb;
           float d = abs(length(abs(alphaColor.rgb - backgroundColor.rgb)));
           float edge0 = thresh * (1.0 - slope);
           float alpha = smoothstep(edge0, thresh, d);
           gl_FragColor = vec4(backgroundColor, alpha);
        }`;

        PIXI.Filter.call( this, vertexSrc, fragmentSrc );

        this.uniforms.thresh = 0.45; 
        this.uniforms.slope = 0.1; 
        this.uniforms.alphaColor = [1.0, 1.0, 1.0, 1.0];

    };

    PIXI.filters.TransparentFilter.prototype = Object.create( PIXI.Filter.prototype );
    PIXI.filters.TransparentFilter.prototype.constructor = PIXI.filters.TransparentFilter; 
    
    //============================================================================
    // PIXI.filters.CircleFilter
    //============================================================================  

    PIXI.filters.CircleFilter = function() {

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
        
        uniform float time;
        uniform vec2 resolution;
        
        void main(void)
        {
           float mx = max(resolution.x, resolution.y);
           vec2 uv = gl_FragCoord.xy / mx;
           vec2 center = resolution / mx * 0.5;
           float t = time * 10.0;
        
           vec4 backColor = texture2D(uSampler, vTextureCoord.xy);
        
           gl_FragColor = mix(vec4(vec3(sin(t - distance(uv, center) * 255.0)) * 0.2, 0.5), backColor.rgba, 0.7);
        }
        `;

        PIXI.Filter.call( this, vertexSrc, fragmentSrc );

        this.uniforms.time = 0.0;
        this.uniforms.resolution = [816.0, 624.0];        

    };

    PIXI.filters.CircleFilter.prototype = Object.create( PIXI.Filter.prototype );
    PIXI.filters.CircleFilter.prototype.constructor = PIXI.filters.CircleFilter;     

    //============================================================================
    // PIXI.filters.ScratchFilter
    //============================================================================  

    PIXI.filters.ScratchFilter = function() {

        var vertexSrc = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        
        uniform mat3 projectionMatrix;    
        uniform mat3 mirrorMatrix; 
        
        varying vec2 vTextureCoord;
        
        void main(void)
        {
            gl_Position = vec4((projectionMatrix * mirrorMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vTextureCoord = aTextureCoord;
        }        
        `;

        var fragmentSrc = `
        varying vec2 vTextureCoord; 

        uniform sampler2D uSampler;
        
        uniform vec2 resolution;
        uniform float time;        
        
        void main(void)
        {
            float mx = max(resolution.x, resolution.y);
            vec2 uv = gl_FragCoord.xy / mx;
            vec2 center = resolution / mx * 0.5;
            float t = time * 2.0;

            vec4 backColor = texture2D(uSampler, vTextureCoord.xy);
          
            gl_FragColor = mix(vec4(vec3(sin(t - distance(uv, center) * 0.25)) * 0.2, 0.2), backColor.rgba, 0.2);
        }
        `;

        PIXI.Filter.call( this, vertexSrc, fragmentSrc );

        this.uniforms.time = 0.0;
        this.uniforms.resolution = [816.0, 624.0]; 

        var a = -1;
        var c = 0;
        var b = 0;
        var d = 1;
        var tx = 816.0 / 2.0;
        var ty = 624.0 / 2.0;

        this.uniforms.mirrorMatrix = [
            a, c, tx,
            b, d, ty,
            0, 0, 1
        ];

    };

    PIXI.filters.ScratchFilter.prototype = Object.create( PIXI.Filter.prototype );
    PIXI.filters.ScratchFilter.prototype.constructor = PIXI.filters.ScratchFilter;        

    PIXI.filters.ScratchFilter.prototype.updateMirrorMatrix = function() {
        var a = 1;
        var c = 0;
        var b = 0;
        var d = 1;
        var tx = 4.0 * Math.randomInt(12);
        var ty = -4.0 * Math.randomInt(12);

        this.uniforms.mirrorMatrix = [
            a, c, tx,
            b, d, ty,
            0, 0, 1
        ];

    };

    //============================================================================
    // Sprite_Picture
    //============================================================================  

    var alias_Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
    Sprite_Picture.prototype.initialize = function(pictureId) {
        alias_Sprite_Picture_initialize.call(this, pictureId);
        this.applyBlackAlphaColor();
    };    

    Sprite_Picture.prototype.applyBlackAlphaColor = function() {
        if(!$.Params.isValid.Picture) {
            return;
        }
        // pixi-picture로 렌더링될 경우에는 필터가 잘 먹히지 않으므로 false로 설정.
        this._isPicture = false;
        // 커스텀 빌드에 포함한 투명색 지정용 알파 필터.
        this._alphaFilter = new PIXI.filters.TransparentFilter();
        // 검은색을 제거한다.
        // 흰색은 제거가 안된다.
        this._alphaFilter.uniforms.alphaColor = [0.0, 0.0, 0.0, 1.0];
        // 임계값
        this._alphaFilter.uniforms.thresh = 0.45;
        // 값이 높으면 경계면이 깔끔하게 절단된다.
        // 낮으면 포토샵의 디졸브(dissolve)처럼 경계면이 흩뿌려진다.
        this._alphaFilter.uniforms.slope = 0.8;
        // 블렌드 모드가 노말일 경우에만 동작함.
        this.filters = [this._alphaFilter];
        // 평가 : 상용 게임에 쓰기에는 부적절.
    };

    //============================================================================
    // Scene_Title
    //============================================================================     

    var alias_Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        alias_Scene_Title_create.call(this);

        if(!$.Params.isValid.Title) {
            return;
        }        

        // 셰이더 기본 예제를 타이틀 씬에 적용해본 것.
        // 물방울이 호숫가에 떨어진 것처럼 원형의 파동이 퍼져나간다.
        // this._circleFilter = new PIXI.filters.CircleFilter();
        this._circleFilter = new PIXI.filters.ScratchFilter();
        this._ticker = new PIXI.ticker.Ticker();
        this._ticker.add(function(delta) {
            this._circleFilter.uniforms.time += 0.2 * delta;
            this._circleFilter.updateMirrorMatrix();
        }, this);
        this._gameTitleSprite.filters = [this._circleFilter];
        this._ticker.start();
        // 평가 : 게임에 쓰기에는 부적절한 이펙트로 보여짐
    };

    //============================================================================
    // Scene_Map
    //============================================================================     

    var alias_Scene_Map_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
        alias_Scene_Map_create.call(this);

        if(!$.Params.isValid.Map) {
            return;
        }    

        this._circleFilter = new PIXI.filters.CircleFilter();
        this._ticker = new PIXI.ticker.Ticker();
        this._ticker.add(function(delta) {
            this._circleFilter.uniforms.time += 0.2 * delta;
        }, this);
        this.filters = [this._circleFilter];
        this._ticker.start();
        // 평가 : 게임에 쓰기에는 부적절한 이펙트로 보여짐
    };


})(RS.TransparentFilterTest);