var screenHeight = 1004
var scale = 100
var world = new p2.World({
  gravity: [0, -10 * scale]
});

var dogShape = new p2.Box({ width: 100, height: 100 });
var dogBody = new p2.Body({
  mass:1,
  position:[320, 50],
});
dogBody.addShape(dogShape);
world.addBody(dogBody);

var floor = new p2.Body({
  position: [0, 1]
});

floor.addShape(new p2.Plane());
world.addBody(floor);

var getY = function(body) {
 return screenHeight - body.position[1]
}

module.exports = {
  world: world,
  dogBody: dogBody,
  getY: getY
}
