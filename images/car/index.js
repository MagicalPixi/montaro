var mySpriteFn = require('./sprite.js');
var pixiLib = require('pixi-lib')

var world = require('../../javascripts/game/world')
var Block = require('../../javascripts/game/physics/index').Block

var roadFn = require('../road');

module.exports = function (arg) {

  var sp = mySpriteFn({})

  sp.scale.x = sp.scale.y = 0.4;

  sp.anchor.x = sp.anchor.y = 0.5;

  var x = 1004,y = roadFn.roadBaseHeight + sp.height * sp.anchor.y;

  sp.x = sp.initX = x;
  sp.y = sp.initY = world.getY(y);

  var myBlock = new Block({
    width:sp.width,
    height:sp.height,
    position:{
      x:x,
      y:y
    },
    type: Block.BlockType.Enemy
  })
  
  world.world.addBlock(myBlock);

  sp.render = function () {
    myBlock.position.x -= world.speed * 2
    sp.x = myBlock.position.x
    sp.y = world.getY(myBlock.position.y);

    if (sp.x < 0) {
      sp.parent.removeChild(sp)
      myBlock.world.removeBlock(myBlock)
    }

  };

  return sp;
};
