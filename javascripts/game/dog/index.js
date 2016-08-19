var pixiLib = require('pixi-lib')
var world = require('../world')
var Player = require('../physics/player')

var sprite = pixiLib.getMc({
  textures: pixiLib.getTextures('default'),
  "anchor.x": 0.5,
  "anchor.y": 0.5,
  x: 20,
  y: 900,
  animationSpeed: 0.1
})

/**
 *  --> physics
 **/

var player = new Player({
  width: 100,
  height: 100,
  position: {x: 320, y: 50}
})
world.world.addPlayer(player)

/**
 *  --> public method
 **/
sprite.render = function() {
  sprite.x = player.position.x
  sprite.y = world.getY(player.position.y)
}

sprite.jump = function() {
  player.v.y = 500
}

module.exports = sprite
