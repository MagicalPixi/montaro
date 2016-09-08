var screenHeight = 640
var World = require('./physics').World

var roadFn = require('../../images/road')

var world = new World({
  gravity: -4000,
  land:roadFn.roadBaseHeight,
})
module.exports = {
  speed: 2,
  world: world,
  getY: function(y) {
    return screenHeight - y
  }
}
