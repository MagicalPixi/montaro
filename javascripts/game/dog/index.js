var pixiLib = require('pixi-lib')
var sprite = pixiLib.getMc({
  textures: pixiLib.getTextures('default'),
  "anchor.x": 0.5,
  "anchor.y": 0.5,
  x: 20,
  y: 900,
  animationSpeed: 0.1
})
module.exports = sprite
