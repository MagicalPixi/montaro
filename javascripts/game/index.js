var resource = ['default']
var stage = new PIXI.Container()
var loader = require('../loader')
var blockFactory = require('./block')
var physics = require('./p2')

var render = function(renderer) {
  loader.add(resource, 'json').load(function() {
    var background = require('./background')
    stage.addChild(background)
    var dog = require('./dog')
    dog.play()
    stage.addChild(dog)
    stage.interactive = true;
    stage.on('touchstart', function() {
      var body = physics.dogBody
      body.applyImpulse([0, 1000])
    })
    stage.render = function() {
      physics.world.step(1 / 60)
      dog.x = physics.dogBody.position[0]
      dog.y = physics.getY(physics.dogBody)
    }
    renderer(stage)
  })
}

module.exports = render
