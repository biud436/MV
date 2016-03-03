
** Wave Filter **

The following code sets the speed of the wave effects.

try this :

```javascript
// Lerp
Math.lerp = function(v0, v1, t) {
  return (1-t)*v0 + t*v1;
}

// Get FrameRate
Graphics.frameRate = function() {
  return Date.now() % 10000 / 10000;
}

// Create Sprite
var bitmap = ImageManager.loadSvEnemy('Death');
var sprite = new Sprite(bitmap);
SceneManager._scene.addChild(sprite);

// Enable Wave
sprite.wave = true;

// Texture Padding
sprite._waveFilter.padding = 512;

// Update UVSpeed & Sprite Position
var old_update = sprite.update;
sprite.update = function() {
 old_update.call(this);
 if(this.wave) {
   this.wave_speed = Math.lerp(0.5, 3.0, Graphics.frameRate() / 2);
 }
}
```
