var png = ['game_over_background', 'play_again_button']
var stage = new PIXI.Container()
var loader = require('../loader')

var textForScore = function(score, finish) {
  if (finish) {
    return '你获得了' + score + '的好成绩'
  } else {
    return '太差了，居然就这么被撞飞了, 太差了，居然就这么被撞飞了,太差了，居然就这么被撞飞了, 太差了，居然就这么被撞飞了'
  }
} 

/**
 *  --> Public Method
 **/
var render = function (renderer, score, finish) {
  score = score || 0
  loader.add(png, 'png').load(function () {
    var background = require('../../images/game_over_background')()
    var button = require('../../images/play_again_button')({"scale.y": 0.8})
    var text = new PIXI.Text(textForScore(score, finish), 
      {font: '30px Helvetica-Light', 
        fill: 'white'})
    text.anchor.x = text.anchor.y = 0.5
    text.x = 320
    text.y = 600
    stage.addChild(background)
    stage.addChild(button)
    stage.addChild(text)
    button.interactive = true
    button.on('touchstart', function() {
      var game = require('../game')
      game(renderer)
    })
    renderer(stage)
  })
}


module.exports = render

