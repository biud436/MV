/*:
 * RS_ParallaxTitleEx.js
 * @plugindesc This plugin adds various text animations to the title screen.
 * @author biud436
 *
 * @param parallaxImage
 * @desc parallax Image
 * @default BlueSky
 * @require 1
 * @dir img/parallaxes
 * @type file
 *
 * @param TextAnimation
 * @desc Please fill out one of these styles.
 * (Push, Split)
 * @default Push
 *
 * @param Interval
 * @desc Specifies the distance difference between buttons.
 * @default 80
 *
 * @param Menu Size
 * @desc Specifies the number of menus.
 * @default 3
 *
 * @param Angle Speed
 * @desc Specify angular velocity.
 * @default 120.0
 *
 * @param Text outline Color
 * @desc Specify Text outline Color.
 * @default #6799FF
 *
 * @param Text Tone
 * @desc Specify Text Tone
 * @default  0xD9FF80
 *
 * @param Game Start
 * @desc Write the appropriate text for this button.
 * @default  Game Start
 *
 * @param Game Load
 * @desc  Write the appropriate text for this button.
 * @default  Game Load
 *
 * @param Game Exit
 * @desc  Write the appropriate text for this button.
 * @default  Game Exit
 *
 * @param ---------
 * @desc
 * @default
 *
 * @param Subtext
 * @desc Sets the content of the subtext of the game title text.
 * @default v1.0.0
 *
 * @help
 * =============================================================================
 * Text Animation
 * =============================================================================
 * The main game text has two text annimations as follows.
 * 'Push' animation that text becomes smaller and larger.
 * 'Split' animation that the text grows in the horizontal direction and becomes smaller.
 * The default animation of them is same as 'Push' animation.
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.03.04 (v1.0.1) - Added the comments for include used files.
 * 2016.11.21 (v1.0.2) - Fixed the bugs.
 */

var Imported = Imported || {};
Imported.RS_ParallaxTitleEx = true;

var RS = RS || {};
RS.ParallaxTitleEx = RS.ParallaxTitleEx || {};
RS.ParallaxTitleEx.Params = RS.ParallaxTitleEx.Params || {};
RS.Utils = RS.Utils || {};

(function($) {

  var parameters = PluginManager.parameters('RS_ParallaxTitleEx');
  var parallaxImage = $.parallaxImage = (parameters['parallaxImage'] || 'BlueSky');
  var textType = $.textType = parameters['TextAnimation'] || 'Push';
  var szExit = $.szExit = String(parameters['Game Exit'] || "Game Exit");
  var _x = $._x = null;
  var _y = $.parall_yaxImage = null;
  var _dist = $._dist = Number(parameters['Interval'] || 80);
  var _menuSize = $._menuSize = Number(parameters['Menu Size'] || 3);
  var _maxAngle = $._maxAngle =  360.0 / _menuSize;
  var _angleSpeed = $._angleSpeed = parseFloat(parameters['Angle Speed'] || 120.0);
  var _pi = $._pi = Math.PI;
  var _outLineColor = $._outLineColor = String(parameters['Text outline Color'] || '#6799FF');
  var _tintColor = $._tintColor = parseInt(parameters['Text Tone'] || 0xD9FF80);
  var _gameStart = $._gameStart = String(parameters['Game Start'] || "Game Start");
  var _gameContinue = $._gameContinue = String(parameters['Game Load'] || "Game Load");
  var _gameOptions = $._gameOptions = String(parameters['Game Exit'] || "Game Exit");

  $.defaultTextStyle = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    align: 'center',
    fontSize : 72,
    // Color
    fill : '#FFFFFF',
    // A number that represents the thickness of the stroke.
    strokeThickness : 0,
    // Shadow effect
    dropShadow : true,
    // Shadow color
    dropShadowColor : '#000000',
    // Shadow angle
    dropShadowAngle : Math.PI / 6,
    // Distance to shadow
    dropShadowDistance : 3,
    // Text wrap
    wordWrap : true,
    // width of the text wrap (wrapping the width automatically)
    wordWrapWidth : 400,
    textBaseline: 'alphabetic'
  };

  $.subtext = {
    text: parameters['Subtext'] || 'v1.0.0',
    fontSize: 24,
    dropShadow: true,
    fill: ['#888888','#FFFFFF'],
    align: 'right'
  };

  $.touchPoint = new PIXI.Point();

  $.ENUM = {
    'GAME_START': 0,
    'GAME_LOAD': 1,
    'GAME_EXIT': 2
  };

  //============================================================================
  // RS.Utils
  //
  //

  RS.Utils.convertToRadian = function(angle) {
    return (Math.PI / 180) * angle;
  };

  // This prevents the angular value from increasing continuously.
  RS.Utils.wrapMax = function(angle) {
    while(angle > 360.0) { angle -= 360.0; }
    while(angle < -360.0) { angle += 360.0; }
    return angle;
  };

// This prevents the angular value from increasing continuously.
  RS.Utils.wrapAngle = function(angle) {
    while(angle > 180.0) { angle -= 360.0; }
    while(angle < -180.0) { angle += 360.0; }
    return angle;
  };

  //============================================================================
  // Array
  //
  //

  Array.prototype.max = function() {
    return this.slice(0).sort().reverse()[0];
  };

  Array.prototype.min = function() {
    return this.slice(0).sort()[0];
  };

  //============================================================================
  // Window_TitleCommand
  //
  //

  Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    this.addCommand(szExit,   'exit');
  };

  //============================================================================
  // Scene_Title
  //
  //

  var alias_Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    alias_Scene_Title_start.call(this);
    this.initSpriteParameter();
    this.initTouchParameter();
    this.makeSprite();
    if(!DataManager.isAnySavefileExists()) this.text2.opacity = 128;
  };

  var alias_Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function() {
    this.updateSprite();
    this.updateTouchInput();
    this.updateKeyboardCheck();
    alias_Scene_Title_update.call(this);
  };

  var alias_Scene_Title_terminate = Scene_Title.prototype.terminate;
  Scene_Title.prototype.terminate = function () {
    if(alias_Scene_Title_terminate) alias_Scene_Title_terminate.call(this);
    // When there is already a title scene in the scene stack, this will remove the TilingSprite.
    this.removeChild(this._gameTitleSprite);
  };

  Scene_Title.prototype.createForeground = function() {

    var style = $.defaultTextStyle;

    var textStyle1 = new PIXI.TextStyle(style);
    var textStyle2 = new PIXI.TextStyle(style);
    textStyle2.fontSize = $.subtext.fontSize;
    textStyle2.dropShadow = $.subtext.dropShadow;
    textStyle2.fill = $.subtext.fill;
    textStyle2.align = $.subtext.align;

    this._gameTitleSprite = new PIXI.Text($dataSystem.gameTitle, textStyle1);
    this._gameTitleSprite.addChild( new PIXI.Text('\n' + $.subtext.text, textStyle2) );
    this.addChild(this._gameTitleSprite);

    if ($dataSystem.optDrawTitle) this.drawGameTitle();

  };

  Scene_Title.prototype.drawGameTitle = function() {

    // Set text initial position
    this._gameTitleSprite.x = Graphics.width / 2;
    this._gameTitleSprite.y = Graphics.height / 4;

    // Center of text origin
    this._gameTitleSprite.anchor.x = 0.5;
    this._gameTitleSprite.anchor.y = 0.5;

    // Initial value
    var power = 0;
    var scroll = 0.01;

    // Distort the text every frame.
    this._gameTitleSprite.update = function() {

      // Limit amplitude.
      if(power >= 1) {
        scroll = -scroll;
      } else if (power < 0) {
        scroll = -scroll;
      }

      // Calculate the frequency.
      power += scroll;

      // Distort the text by distortion type such as 'Push' and 'Split' types.
      this.scale.x = Math.sin(power);
      this.scale.y = (textType === "Push") ? Math.sin(power) : Math.cos(power);

      // Rotate the text.
      if(this.rotation <= Math.PI * 2) this.rotation += (2 * Math.PI ) / 90;

      // Update child objects.
      if(this.children) {
        this.children.forEach(function (e) {
          if(e.update) e.update();
        }, this);
      }

    };

  };

  Scene_Title.prototype.createBackground = function() {

    // Create tiling sprite
    this._backSprite1 = new TilingSprite(ImageManager.loadParallax($.parallaxImage));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));

    // Sets the x, y, width, and height all at once in tiling sprite.
    this._backSprite1.move(0,0,Graphics.boxWidth,Graphics.boxHeight);

    // Override the TilingSprite update function.
    var _backSprite1_update = this._backSprite1.update;
    this._backSprite1.update = function() {
      _backSprite1_update.call(this);

      // Move right every frame (...0, -1, -2, -3)
      this.origin.x--;

    };

    // Add to game screen.
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);

  };

  Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('exit',  this.commandExit.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_Title.prototype.commandExit = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    window.close();
  };

  Scene_Title.prototype.initSpriteParameter = function() {
    $._x = Graphics.width / 2;
    $._y = Graphics.height / 2 + $._dist;
    this._max = 1;
    this._rotateLeft = false;
    this._rotateRight = false;
    this._isGameStarted = false;
    this._originPosition = [$._x, $._y];
    this._r = 3;
    this._angle = 0.0;
  };

  Scene_Title.prototype.initTouchParameter = function() {
    this._firstPos = 0;
    this._lastPos = 0;
    this._touch_velocity = false;
  };

  Scene_Title.prototype.updateTouchInput = function() {
    if(TouchInput.isTriggered() && !this._touch_velocity) {
      this._firstPos = TouchInput.x;
      this._touch_velocity = true;
    } else  if(TouchInput.isReleased() && this._touch_velocity) {
      this._lastPos = TouchInput.x;
      this._velocity = this._lastPos - this._firstPos;
      this._velocity < 0 ? this.left(true) : this.right(true);
      this._touch_velocity = false;
    }
  };

  Scene_Title.prototype.updateKeyboardCheck = function() {

    this._wheelBegin = TouchInput.isPressed() && TouchInput.wheelY;

    // Key press check and mouse wheel detection.
    this.left(Input.isTriggered("left") || (TouchInput.wheelY - this._wheelBegin) < 0  );
    this.right(Input.isTriggered("right") || (TouchInput.wheelY - this._wheelBegin) > 0 );

    // When the decision key is pressed
    if( Input.isTriggered("ok") || TouchInput.isCancelled() ) {
      this.selectMenu();
    }

    this._wheelBegin = TouchInput.isPressed() && TouchInput.wheelY;

  };

  Scene_Title.prototype.isCheckDir = function(dir) {

    // Should the button rotate left?
    var isLeft = !this._rotateRight && this._rotateLeft;

    // Converts angles to radians.
    var radian = RS.Utils.convertToRadian(this._max);

    // Should the button rotate right?
    var isRight = this._rotateRight && !this._rotateLeft;

    // Set the result to null.
    var result = null;

    // Check the direction and maximum angle.
    return result = {
      'left': isLeft && (this._angle > radian),
      'right': isRight && (this._angle < radian)
    }[dir] && true;

  };

  Scene_Title.prototype.updateSprite = function() {

    if(!this._textCreated) return false;

    // Check the direction of rotation.
    if(this.isCheckDir('left')) {

      RS.Utils.wrapAngle( this._angle -= this.upAngle() );

    } else if(this.isCheckDir('right')) {

      RS.Utils.wrapAngle( this._angle += this.upAngle() );

    }

    // Moves the menu.
    this.moveMenu();

    // Change the scale of all graphic objects.
    this.updateScale();

  };

  var _alias_startFadeOut = Scene_Title.prototype.startFadeOut;
  Scene_Title.prototype.startFadeOut = function (duration, white) {
    _alias_startFadeOut.apply(this, arguments);
    this.text1.opacity = this.text2.opacity = this.text3.opacity = 0;
  };

  Scene_Title.prototype.updateScale = function() {
    var t = (Date.now() % 1000 / 1000);
    var a = 1.0;
    var b = 1.5;
    var d = a + t * (b - a);
    var e = b + t * (a - b);
    var p = d + t * (e - d);

    // Sort from near top
    var l = this.getTopItem();

    // Search the entire button.
    l.forEach( function(i) {

      // If the index value equals zero?
      if(l.indexOf(i) === 0) {

        // Increase size.
        i.scale.set(p, p);
        if(i.children[0]) i.children[0].style.fill = ['#6799FF','#FFFFFF'];

      } else {

        // Set the original size.
        i.scale.set(1.0, 1.0);
        if(i.children[0]) i.children[0].style.fill = ['#888888','#FFFFFF'];

      }
    }, this);

  };

  Scene_Title.prototype.getTopItem = function() {
    var list = [this.text1, this.text2, this.text3];
    list.sort(function(a, b) { return a.y - b.y } );
    return list;
  };

  Scene_Title.prototype.selectMenu = function() {

    // If the button has already been pressed.
    if(this._isGameStarted) return false;

    // Return menu index.
    var i = this.menuIndex();
    var result = null;

    // Plays the OK sound.
    SoundManager.playOk();

    result = [];
    result[$.ENUM.GAME_START] = function() {
        this.commandNewGame();
        this._isGameStarted = true;
    };
    result[$.ENUM.GAME_LOAD] = function() {
        if(DataManager.isAnySavefileExists()) {
          this.commandContinue();
        }
    };
    result[$.ENUM.GAME_EXIT] = function() {
        this.commandExit();
    };
    result[i].call(this);
  };

  Scene_Title.prototype.left= function(wrap) {

    if(wrap) {
      // Plays the cursor sound.
      SoundManager.playCursor();

      this._rotateLeft = true;
      this._rotateRight = false;

      // Check the range of angles.
      RS.Utils.wrapMax(this._max -= $._maxAngle);

    }

  };

  Scene_Title.prototype.right = function(wrap) {

    if(wrap) {

      // Plays the cursor sound.
      SoundManager.playCursor();

      this._rotateLeft = false;
      this._rotateRight = true;

      // Check the range of angles.
      RS.Utils.wrapMax(this._max += $._maxAngle);

    }

  };

  Scene_Title.prototype.upAngle = function() {
    return (2 * Math.PI ) / $._angleSpeed;
  };

  Scene_Title.prototype.moveMenu = function() {
    this.move(this.text1, this._r + $._dist, this._angle + 180);
    this.move(this.text2, this._r + $._dist, this._angle);
    this.move(this.text3, this._r + $._dist, this._angle + 90);
  };

  Scene_Title.prototype.menuIndex = function() {
    // If the element is not found, it returns the minimum value of the array.
    // TODO: Is it better to use the sort function?
    var n = this.spriteDistance();
    return n.indexOf(n.min());
  };

  Scene_Title.prototype.spriteDistance = function() {
    var a = this.text1.y;
    var b = this.text2.y;
    var c = this.text3.y;
    var result = [a,b,c];
    return result;
  };

  Scene_Title.prototype.move = function(sprite, r, angle) {
    var x = ( this._originPosition[0] )+ r * Math.sin(angle) - sprite.width / 2;
    var y = ( this._originPosition[1] ) + r * Math.sin(angle) - sprite.height / 2;
    sprite.position.x = x;
    sprite.position.y = y;
  };

  Scene_Title.prototype.makeSprite = function() {
    this.text1 = this.makeText($._gameStart);
    this.text2 = this.makeText($._gameContinue);
    this.text3 = this.makeText($._gameOptions);

    // This flag indicates that the text was successfully created.
    this._textCreated = true;

  };

  Scene_Title.prototype.makeText = function(str) {

    // Create sprite button
    var text = new Sprite_Button();
    var textStyle = new PIXI.TextStyle($.defaultTextStyle);
    textStyle.fontSize = 32;
    textStyle.strokeThickness = 1;
    textStyle.stroke = $._outLineColor;
    textStyle.fill = ['#888888','#FFFFFF'];

    var bmt = new PIXI.Text(str, textStyle);

    text.setClickHandler(this.selectMenu.bind(this));

    // Add text to the screen
    text.addChild(bmt);
    this.addChild(text);

    // Return a text object.
    return text;
  };

  var _alias_createCommandWindow = Scene_Title.prototype.createCommandWindow;
   Scene_Title.prototype.createCommandWindow = function() {
    _alias_createCommandWindow.call(this);
    this._commandWindow.x = (Graphics.width - this._commandWindow.width) - 20;
    this._commandWindow.opacity = 0;
    this._commandWindow.contentsOpacity = 0;
    this._commandWindow.active = false;
  };

})(RS.ParallaxTitleEx.Params);
