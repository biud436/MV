
# **What is Opal?**
Opal includes a ruby compiler (Ruby to JavaScript Compiler). This library will use to include the Ruby in the RPG Maker MV. This document has been prepared for Opal beginners. It is assumed that the reader has a prior knowledge of HTML coding and JavaScript.

---

## **How to install opal.js**
From now on, you need to add a [Opal-library](http://opalrb.org/) in the html file. Allows you to modify 'index.html' by launching the text editor. This index.html should change to look like the below.

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

## **Game Core**
This script provides game's core. By default, each Ruby script binds with Native JavaScript Object of RPG Maker MV. However, this has not yet been completed.

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

---
## **How to import a ruby file form game directory**

Allows you to load the ruby scripts by writing the following code at the beginning of your plugin.

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
Using this code allows you to import ruby script files into your games. When you will have started the game, this code will only execute the file once.

An example code is:


```html
<script type="text/ruby" src="rb/Game_Core.rb"></script>
```
---
## **How to write ruby classes**

In the ruby object, calling native JavaScript function is a method.

```ruby
#================================================
# ** Rect
#================================================
class Rect

  def initialize(x=0, y=0, width=0, height=0)
    @x = x
    @y = y
    @width = width
    @height = height
    """
    If you have used to instance variables in the Ruby Object by
    associating a JavaScript object and ruby object that can be very
    useful. When you write ruby script, If using this code, you can
    declare a native JavaScript object.
    """
    @js = `new Rectangle(#{@x}, #{@y}, #{@width}, #{@height})`
    @rect = Native(@js)
  end
  
  def empty
    self.x = self.y = self.width = self.height = 0
  end

  def set(*args)
    case args.size
    when 1, 4
      if args[0].is_a?(Rect)
        @x, @y, @width, @height = args[0].to_a
      else
        @x, @y, @width, @height = *args
      end
    else
      raise ArgumentError
    end
    match
  end

  def to_a
    [@x, @y, @width, @height]
  end

  def x=(n)
    @rect.x = @x = n
    match
  end

  def x
    @rect.x
  end

  def y=(n)
    @rect.y = @y = n
    match
  end

  def y
    @rect.y
  end

  def width=(n)
    @rect.width = @width = n
    match
  end

  def width
    @rect.width
  end

  def height=(n)
    @rect.height = @height = n
    match
  end

  def height
    @rect.height
  end

  private

  def match
    @rect.x, @rect.y, @rect.width, @rect.height = *(self.to_a)
  end

end
```

---
## **Reference**

The hidden sources has referenced the link below.

[RM-Gosu](https://github.com/CaptainJet/RM-Gosu)
