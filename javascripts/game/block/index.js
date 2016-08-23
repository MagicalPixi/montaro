var pixiLib = require('pixi-lib')
var world = require('../world')
var Block = require('../physics').Block

var randomPosition = [];

function createRandomPosition(max) {

  var  arr = [];

  for(var i = 0;i<max;i++){

    if(i%2===0){
      arr.push('low')
    }else if(i%5 === 0){
      arr.push('middle')
    }else{
      arr.push('');
    }
  }

  return arr;
}

randomPosition = createRandomPosition(100);

function getPosition(i) {

  return randomPosition[i] || '';
}

function getCoordinateByPosition(p) {
  var  m = {
    low:{
      x:1004,
      y:90
    },
    middle:{
      x:1004,
      y:290
    }
  };

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
    position = arg.position;

  i = parseInt(i/60);

  position = getCoordinateByPosition(getPosition(i));

  if(!position){
    return false;
  }

  var x = position.x;
    y = position.y;

  var sprite = pixiLib.getIm({
    textures: pixiLib.getTextures('block'),
    "anchor.x": 0.05,
    "anchor.y": 0.05,
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
    sprite.y = world.getY(block.position.y)

    if (sprite.x < 0) {
      sprite.parent.removeChild(sprite)
      block.world.removeBlock(block)
    }
  }
  return sprite
}

module.exports = blockFactory
