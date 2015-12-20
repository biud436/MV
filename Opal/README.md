
### RGSS3 (Opal)

[Opal v0.9.0.beta2](http://opalrb.org/)

**Setup**
---

[Opal](http://opalrb.org/) 라이브러리를 사용하기 위해서는 index.html 파일의 수정이 필요합니다.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="viewport" content="user-scalable=no">
        <link rel="icon" href="icon/icon.png" type="image/png">
        <link rel="apple-touch-icon" href="icon/icon.png">
        <link rel="stylesheet" type="text/css" href="fonts/gamefont.css">

        <script src="http://cdn.opalrb.org/opal/current/opal.js"></script>
        <script src="http://cdn.opalrb.org/opal/current/opal-parser.js"></script>
        <script src="http://cdn.opalrb.org/opal/current/native.min.js"></script>
        <script type="text/javascript">Opal.load('opal-parser')</script>

        <title></title>
    </head>
    <body style="background-color: black">
        <script type="text/javascript" src="js/libs/pixi.js"></script>
        <script type="text/javascript" src="js/libs/fpsmeter.js"></script>
        <script type="text/javascript" src="js/libs/lz-string.js"></script>
        <script type="text/javascript" src="js/rpg_core.js"></script>
        <script type="text/javascript" src="js/rpg_managers.js"></script>
        <script type="text/javascript" src="js/rpg_objects.js"></script>
        <script type="text/javascript" src="js/rpg_scenes.js"></script>
        <script type="text/javascript" src="js/rpg_sprites.js"></script>
        <script type="text/javascript" src="js/rpg_windows.js"></script>
        <script type="text/javascript" src="js/plugins.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </body>
</html>

```


**Game Core**
---

| RGSS Built-in Modules
| ----------------------
| Audio
| Graphics
| ~~Input~~
| ~~RPG~~

<Enter>

| Modules
| ----------------------
| Cache

<Enter>

| RGSS Built-in Classes
| ----------------------
| Bitmap
| Color
| Font
| ~~Plane~~
| Rect
| Sprite
| ~~Table~~
| ~~Tilemap~~
| ~~Tone~~
| ~~Viewport~~
| Window
| RGSSError
| RGSSReset

<Enter>

| RGSS Built-in Functions
| ----------------------
| rgss_main { ... }
| rgss_stop
| ~~load_data(filename)~~
| ~~save_data(obj, filename)~~
| msgbox(*args)
| msgbox_p(*args)



**Load Ruby Script**
---

[이 링크](http://biud436.blog.me/220567328766)에 있는 강좌를 바탕으로
프로젝트를 Setting 해주신 아래와 같은 함수를 호출하여 스크립트를 로드해주시기 바랍니다.

```javascript
function loadRubyScript(scripts) {
  var result;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'rb/%1.rb'.format(scripts));
  xhr.overrideMimeType('text/ruby');
  xhr.onload = function() {
    if(xhr.status < 400) {
        result = xhr.responseText;
        Opal.eval(result);
    }    
  }
  xhr.send();
}

loadRubyScript('Game_Core');
```

index.html 파일을 수정하여 로드할 수도 있습니다

```html
<script type="text/ruby" src="rb/Game_Core.rb"></script>
```

**Reference**
---

'RGSS3 Hidden Class' 는 아래 소스를 참고했습니다.

[RM-Gosu](https://github.com/CaptainJet/RM-Gosu)
