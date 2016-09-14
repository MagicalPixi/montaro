var pixiLib = require('pixi-lib')
var render = pixiLib.createRender(document.body)
var end = require('./end')
var game = require('./game')

// game(render)

end(render, 300, true)
