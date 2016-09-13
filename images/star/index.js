var pixiLib = require('pixi-lib')
var world = require('../../src/game/world')
var Block = require('../../src/game/physics/index').Block

var starFactory = function(arg) {
  var position = arg.position || {x: 0, y: 0};

  if(!position){
    throw new Error('no po')
  }

  var x = position.x,
    y = position.y;

  var sprite = pixiLib.getIm({
    textures: pixiLib.getTextures('star'),
    "anchor.x": 0.5,
    "anchor.y": 0.5,
    "scale.x" : 1,
    "scale.y" : 1,
    x: x,
    y: world.getY(y),
  });

  var block = new Block({
    type: Block.BlockType.Reward,
    width: sprite.width,
    height: sprite.height,
    position: {
      x: x,
      y: y
    }
  });
  world.world.addBlock(block);
  block.sprite = sprite
  sprite.render = function() {
    block.position.x -= world.speed
    sprite.x = block.position.x
    sprite.y = world.getY(block.position.y);
    if (sprite.x < 0) {
      sprite.parent.removeChild(sprite)
      block.world.removeBlock(block)
    }
  }
  sprite.dismiss = function() {
    sprite.parent.removeChild(sprite)
    block.sprite = null
    block.world.removeBlock(block)
  }
  return sprite
}

module.exports = starFactory
