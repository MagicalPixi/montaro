var pixiLib = require('pixi-lib')
var world = require('../world')
var Player = require('../physics/player')

var dogFn = require('../../../images/dog');

var sprite = dogFn({
  "anchor.x": 0.5,
  "anchor.y": 0.5,
  x: 20,
  y: 500,
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
    if (player.inland) player.v.y = 500
}

module.exports = sprite
