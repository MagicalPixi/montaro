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
var floorShape = new p2.Plane()
floor.addShape(floorShape);
world.addBody(floor);

dogShape.material = new p2.Material(dogShape.id)
floorShape.material = new p2.Material(floorShape.id)
world.addContactMaterial(
  new p2.ContactMaterial(
    dogShape.material, 
    floorShape.material, 
    {                
      restitution : 0.0,            
    }
  )
);

var getY = function(body) {
 return screenHeight - body.position[1]
}

module.exports = {
  world: world,
  dogBody: dogBody,
  getY: getY
}
