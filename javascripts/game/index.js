var resource = ['default']
var stage = new PIXI.Container()
var loader = require('../loader')

var render = function(renderer) {
  loader.add(resource, 'png').load(function() {
    
    // Init p2.js
    var world = new p2.World({
      gravity: [0, 200]
    });

    var boxShape = new p2.Box({ width: 50, height: 50 });
    var boxBody = new p2.Body({
      mass:1,
      position:[0,2],
      angularVelocity:1
    });
    boxBody.addShape(boxShape);
    world.addBody(boxBody);

    var floor = new p2.Body({
      
    });
    floor.addShape(new p2.Plane());
    world.addBody(floor);

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xff0000);
    graphics.drawRect(0, 2, 50, 50);
    stage.addChild(graphics);
    renderer(stage) 
    stage.render = function() {
      world.step(1 / 60)
      graphics.x = boxBody.position[0]
      graphics.y = boxBody.position[1]
    }
  })
}

module.exports = render
      // dog.x = circleBody.position[0]
