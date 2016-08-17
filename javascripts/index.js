var pixiLib = require('pixi-lib')
var render = pixiLib.createRender(document.body)

var game = require('./game')

game(render)
