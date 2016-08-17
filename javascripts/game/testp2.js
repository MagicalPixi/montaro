var resource = ['default']
var stage = new PIXI.Container()
var loader = require('../loader')

var render = function(renderer) {
  loader.add(resource, 'json').load(function() {
    // Init p2.js
    var world = new p2.World({
      gravity: [0, -100]
    });

    var boxShape = new p2.Box({ width: 50, height: 50 });
    var boxBody = new p2.Body({
      mass:1,
      position:[320, 1000],
    });
    boxBody.addShape(boxShape);
    world.addBody(boxBody);

    var floor = new p2.Body({
      angle: Math.PI / 4,
      position: [0, 1]
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
      graphics.y = 1004 - boxBody.position[1]
      graphics.rotation = boxBody.angle
    }
  })
}

module.exports = render
