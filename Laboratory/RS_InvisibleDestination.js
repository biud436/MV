/*:
 * @author biud436
 */

(function() {
  Spriteset_Map.prototype.createDestination = function() {
     this._destinationSprite = new Sprite();
     this._destinationSprite.z = 9;
     this._tilemap.addChild(this._destinationSprite);
  };
})();
