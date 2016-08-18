var jsonResource = ['default']
var pngResource = ['block']
var stage = new PIXI.Container()
var loader = require('../loader')
var blockFactory = require('./block')
var physics = require('./p2')

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

    var block = blockFactory(500, 1004 - 50)
    stage.addChild(block)
    
    stage.interactive = true;
    stage.on('touchstart', function() {
      dog.jump()
    })
    stage.render = function() {
      physics.world.step(1 / 60)
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
