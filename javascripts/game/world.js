var screenHeight = 640
var World = require('./physics').World
var world = new World({
  gravity: -1000
})
module.exports = {
  speed: 2,
  world: world,
  getY: function(y) {
    return screenHeight - y
  }
}
