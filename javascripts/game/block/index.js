var pixiLib = require('pixi-lib')
var world = require('../world')
var Block = require('../physics').Block

var blockFactory = function(x, y) {
  var block = new Block({
    width: 100,
    height: 100,
    position: {x: 500, y: 50}
  })

  world.world.addBlock(block)
  var sprite = pixiLib.getIm({
    textures: pixiLib.getTextures('block'),
    "anchor.x": 0.5,
    "anchor.y": 0.5,
    x: x,
    y: y,
  })

  sprite.render = function() {
    block.position.x --
    sprite.x = block.position.x
    sprite.y = world.getY(block.position.y)
    if (sprite.x < 0) {
      sprite.parent.removeChild(sprite)
    }
  }
  return sprite
}

module.exports = blockFactory
