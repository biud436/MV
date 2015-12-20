
**index.html**
---

Opal 라이브러리를 사용하기 위해서는 스크립트 로드가 필요합니다. 

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

구조적인 차이 때문에 아직 제대로 구현되지 않은 클래스는 회색으로 표시했습니다.

| RGSS Built-in Modules
| ----------------------
| Audio
| Graphics
| <span style='color:#D5D5D5'>Input </span>
| <span style='color:#D5D5D5'>RPG </span>

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
| <span style='color:#D5D5D5'>Plane </span>
| Rect
| Sprite
| <span style='color:#D5D5D5'>Table </span>
| <span style='color:#D5D5D5'>Tilemap </span>
| <span style='color:#D5D5D5'>Tone </span>
| <span style='color:#D5D5D5'>Viewport </span>
| Window
| RGSSError
| RGSSReset

| RGSS Built-in Functions
| ----------------------
| rgss_main { ... }
| rgss_stop
| <span style='color:#D5D5D5'>load_data(filename)</span>
| <span style='color:#D5D5D5'>save_data(obj, filename)</span>
| msgbox(*args)
| msgbox_p(*args)


[이 링크](http://biud436.blog.me/220567328766)에 있는 강좌를 바탕으로
프로젝트를 세팅해주신 다음 아래 함수를 호출하여 코어 스크립트를 로드 해주시기 바랍니다.

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

index.html 파일을 수정하는 방법을 쓸 수도 있습니다.

```html
<script type="text/ruby" src="rb/Game_Core.rb"></script>
```
