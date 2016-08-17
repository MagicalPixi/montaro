var pixiLib = require('pixi-lib')

var blockFactory = function(x, y) {
  var sprite = pixiLib.getMc({
    textures: pixiLib.getTextures('default'),
    x: x,
    y: y,
    animationSpeed: 0.1
  })
}

module.exports = blockFactory
