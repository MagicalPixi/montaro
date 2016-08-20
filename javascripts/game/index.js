var jsonResource = ['default']
var pngResource = ['block']
var stage = new PIXI.Container()
stage.pivot = new PIXI.Point(502, 320)
stage.x = 320
stage.y = 502
stage.rotation = Math.PI / 2
console.log({width: stage.width, height: stage.height})

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

    var block = blockFactory(1004, 502 - 50)
    stage.addChild(block)
    
    stage.interactive = true;
    stage.on('touchstart', function() {
      dog.jump()
    })
    world.on('enemyCollision', function(event) {
      console.log({event: event, message: 'game over'})
    })
    stage.render = function() {
      world.step(1 / 60)
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
var generateBlock = function() {
  
}

 
module.exports = render
