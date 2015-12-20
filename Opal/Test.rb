
# Test.rb
@sprite = Sprite.new
@sprite.bitmap = Bitmap.new(Graphics.width / 2, Graphics.height / 2)

color1 = Color.new(255, 0, 0, 255)
color2 = Color.new(255, 0, 255, 128)
rect = @sprite.bitmap.rect

@sprite.bitmap.gradient_fill_rect(rect, color1, color2, true);

@sprite.x = Graphics.width / 2 - @sprite.width / 2
@sprite.y = Graphics.height / 2 - @sprite.height / 2
