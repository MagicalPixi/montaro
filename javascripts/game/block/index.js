var pixiLib = require('pixi-lib')
var physics = require('../p2')

var blockFactory = function(x, y) {
  var blockShape = new p2.Box({ width: 100, height: 100 });
  var blockBody = new p2.Body({
    position:[500, 50],
  });
  blockBody.addShape(blockShape);
  physics.world.addBody(blockBody)
  
  var sprite = pixiLib.getIm({
    textures: pixiLib.getTextures('block'),
    "anchor.x": 0.5,
    "anchor.y": 0.5,
    x: x,
    y: y,
  })

  sprite.render = function() {
    blockBody.position[0] --
    sprite.x = blockBody.position[0]
    sprite.y = physics.getY(blockBody)
    if (sprite.x < 0) {
      sprite.parent.removeChild(sprite)
      blockBody.removeShape(blockShape)
      blockBody.world.removeBody(blockBody)
    }
  }
  return sprite
}

module.exports = blockFactory
