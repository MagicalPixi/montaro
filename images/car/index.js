var mySpriteFn = require('./sprite.js');
var pixiLib = require('pixi-lib')

var world = require('../../javascripts/game/world')
var Block = require('../../javascripts/game/physics/index').Block


module.exports = function (arg) {

  var sp = mySpriteFn({})

  var x = 1004,y = 60;

  sp.x = sp.initX = x
  sp.y = sp.initY = world.getY(y);
  sp.scale.x = sp.scale.y = 0.4;

  sp.anchor.x = sp.anchor.y = 0.5;

  var myBlock = new Block({
    width:sp.width,
    height:sp.height,
    position:{
      x:x,
      y:y
    }
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