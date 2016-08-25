var pixiLib = require('pixi-lib')
var world = require('../../javascripts/game/world')
var Block = require('../../javascripts/game/physics/index').Block

function getCoordinateByPosition(p) {
  var  m = {
    low:{
      x:1004,
      y:57
    },
    middle:{
      x:1004,
      y:180
    },
    high:{
      x:1004,
      y:290
    },
  };

  //别名
  m.l = m.low;
  m.m = m.middle;
  m.h = m.high;

  return m[p];
}

/**
 * @param arg
 *   i 调用个数
 *   position 障碍物位置
 *      low 最低处
 * @returns {*}
 */
var blockFactory = function(arg) {

  var i = arg.i,
    position = arg.position || 'l';

  position = getCoordinateByPosition(position);

  if(!position){
    throw new Error('no p')
  }

  var x = position.x;
    y = position.y;

  var sprite = pixiLib.getIm({
    textures: pixiLib.getTextures('block'),
    "anchor.x": 0.5,
    "anchor.y": 0.5,
    x: x,
    y: world.getY(y),
  });

  var block = new Block({
    width: sprite.width,
    height: sprite.height,
    position: {
      x: x,
      y: y
    }
  });

  world.world.addBlock(block);

  sprite.render = function() {
    block.position.x -= world.speed
    sprite.x = block.position.x
    sprite.y = world.getY(block.position.y);

    if (sprite.x < 0) {
      sprite.parent.removeChild(sprite)
      block.world.removeBlock(block)
    }
  }
  return sprite
}

module.exports = blockFactory
