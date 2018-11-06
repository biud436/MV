/*:
 * @plugindesc 투명색 지정을 위한 테스트 플러그인.
 * @author biud436
 */

(function() {

    if(PIXI.VERSION !== "4.5.4-custom") {
        console.warn("이 플러그인을 구동하려면 커스텀으로 빌드한 PIXI v4.5.4 버전이 필요.");
        return;
    }

    var alias_Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
    Sprite_Picture.prototype.initialize = function(pictureId) {
        alias_Sprite_Picture_initialize.call(this, pictureId);
        this.applyBlackAlphaColor();
    };    

    Sprite_Picture.prototype.applyBlackAlphaColor = function() {
        // pixi-picture로 렌더링될 경우에는 필터가 잘 먹히지 않으므로 false로 설정.
        this._isPicture = false;
        // 커스텀 빌드에 포함한 투명색 지정용 알파 필터.
        this._alphaFilter = new PIXI.filters.AlphaFilter();
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

    var alias_Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        alias_Scene_Title_create.call(this);
        // 셰이더 기본 예제를 타이틀 씬에 적용해본 것.
        // 물방울이 호숫가에 떨어진 것처럼 원형의 파동이 퍼져나간다.
        this._circleFilter = new PIXI.filters.CircleFilter();
        this._ticker = new PIXI.ticker.Ticker();
        this._ticker.add(function(delta) {
            this._circleFilter.uniforms.time += 0.2 * delta;
        }, this);
        this._gameTitleSprite.filters = [this._circleFilter];
        this._ticker.start();
        // 평가 : 게임에 쓰기에는 부적절한 이펙트로 보여짐
    };

    var alias_Scene_Map_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
        alias_Scene_Map_create.call(this);
        this._circleFilter = new PIXI.filters.CircleFilter();
        this._ticker = new PIXI.ticker.Ticker();
        this._ticker.add(function(delta) {
            this._circleFilter.uniforms.time += 0.2 * delta;
        }, this);
        this.filters = [this._circleFilter];
        this._ticker.start();
        // 평가 : 게임에 쓰기에는 부적절한 이펙트로 보여짐
    };


})();