var pixiLib = require('pixi-lib')
var world = require('../world')
var Player = require('../physics/player')

var dogFn = require('../../../images/cat');
var roadFn = require('../../../images/road')

var sprite = dogFn({
  "anchor.x": 0.5,
  "anchor.y": 0.5,
  x: 320,
  y: 0,
})
sprite.alive = true
sprite.finish = false
/**
 *  --> physics
 **/

var player = new Player({
  width: sprite.width,
  height: sprite.height,
  position: {x: 320, y: 0}
})

/**
 *  --> public method
 **/
var flyoutSpeed = {x: 2, y: 8}
var position = {x: 0, y: 0}
var g = 0.1 
 
sprite.render = function() {
  if (!sprite.finish) {
    if (sprite.alive) {
      sprite.x = player.position.x;
      sprite.y = world.getY(player.position.y)
    } else {
      sprite.rotation += 0.2
      position.x += flyoutSpeed.x
      position.y += flyoutSpeed.y
      flyoutSpeed.y -= g
      sprite.x = position.x
      sprite.y = world.getY(position.y)
      if (position.y < -150) {
        sprite.finish = true
        if (container.finishCb) {
          container.finishCb()
        }
      }
    }
  }
}
sprite.play();



var upY = -55;
var downY = 55;
var distance = 55;

var container = new PIXI.Container();
container.y = 0;

container.jump = function () {
  if (player.inland){
    player.v.y = 1500
  }
};

container.end = function() {
  if (sprite.alive) {
    sprite.alive = false
    sprite.stop()
    position = player.position
  }
}

container.up = function () {
  if(this.y > upY){
    this.y -= distance;
  }
}
container.down = function () {
  if(this.y <  downY){
    this.y += distance
  }
}

container.addChild(sprite)

container.reset = function() {
  player = new Player({
    width: sprite.width,
    height: sprite.height,
    position: {x: 320, y: 0}
  })
  world.world.addPlayer(player)
  sprite.alive = true;
  sprite.finish = false;
  sprite.rotation = 0
  sprite.play()
  flyoutSpeed = {x: 2, y: 8}
  position = {x: 0, y: 0}
  g = 0.1 
}

container.render = sprite.render.bind(sprite)

module.exports = container
