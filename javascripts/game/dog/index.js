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


/**
 *  --> physics
 **/

var player = new Player({
  width: sprite.width,
  height: sprite.height,
  position: {x: 320, y: 0}
})
world.world.addPlayer(player)

/**
 *  --> public method
 **/
sprite.render = function() {
  sprite.x = player.position.x;
  sprite.y = world.getY(player.position.y)
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

container.addChild(sprite);

container.render = sprite.render.bind(sprite)

module.exports = container
