var pixiLib = require('pixi-lib')
var physics = require('../p2')

var sprite = pixiLib.getMc({
  textures: pixiLib.getTextures('default'),
  "anchor.x": 0.5,
  "anchor.y": 0.5,
  x: 20,
  y: 900,
  animationSpeed: 0.1
})

/**
 *  --> p2.js
 **/
var dogShape = new p2.Box({ width: 100, height: 100 });
var dogBody = new p2.Body({
  mass:1,
  position:[320, 50],
});
dogBody.addShape(dogShape);
physics.world.addBody(dogBody)

/**
 *  --> public method
 **/
sprite.render = function() {
  dogBody.position[0] = 320
  sprite.x = dogBody.position[0]
  sprite.y = physics.getY(dogBody)
}

sprite.jump = function() {
  dogBody.applyImpulse([0, 1000])
}

module.exports = sprite
