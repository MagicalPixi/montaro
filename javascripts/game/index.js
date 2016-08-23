var jsonResource = ['default','dog'],
  pngResource = ['bg','bg2','block'],
  counter = 0;

var stage = new PIXI.Container()
stage.pivot = new PIXI.Point(502, 320)
stage.x = 320
stage.y = 502
stage.rotation = Math.PI / 2


window.W = 1004;
window.H = 640;

var loader = require('../loader')
var blockFactory = require('./block')
var world = require('./world').world

/**
 *  --> Public Method
 **/
var render = function(renderer) {
  loader.add(jsonResource, 'json').add(pngResource, 'png').load(function() {
    var background = require('./background')
    stage.addChild(background)
    
    var dog = require('./dog')
    dog.play()
    stage.addChild(dog)

    stage.interactive = true;
    stage.on('touchstart', function() {
      dog.jump()
    })
    world.on('enemyCollision', function(event) {
      console.log({event: event, message: 'game over'})
    })
    stage.render = function() {
      counter ++ 
      world.step(1 / 60)
      if (counter % 60 === 0) {
        var i = counter / 25 
        addBlock(counter)
      }
      stage.children.forEach(function(child) {
        if (child.render) {
          child.render()
        }
      })
    }
    renderer(stage)
  })
}

/**
 * --> Private Method
 **/
var addBlock = function(count) {
  var block = blockFactory({
    i:count,
  })
  if(block){
    stage.addChild(block)
  }
}

 
module.exports = render
