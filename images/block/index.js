var pixiLib = require('pixi-lib')
var world = require('../../src/game/world')
var Block = require('../../src/game/physics/index').Block

var roadFn = require('../road')

function getCoordinateByPosition(p) {


  var h = 35; //anchor.y = 0.5 折算高度

  var  m = {
    low:{
      x:1004,
      y:roadFn.roadBaseHeight + h
    },
    middle:{
      x:1004,
      y:roadFn.roadBaseHeight + h
    },
    high:{
      x:1004,
      y:roadFn.roadBaseHeight + h
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
    throw new Error('no po')
  }

  var x = position.x;
    y = position.y;

  var sprite = pixiLib.getIm({
    textures: pixiLib.getTextures('block'),
    "anchor.x": 0.5,
    "anchor.y": 0.5,
    "scale.x" : 0.5,
    "scale.y" : 0.5,
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
