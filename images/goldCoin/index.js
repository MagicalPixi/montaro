var mySpriteFn = require('./sprite.js');
var pixiLib = require('pixi-lib')


function scoreTextFn() {

  var t = new PIXI.Text('0 ',{
    font: 'bold 60px Arvo',
    fill: '#ffffff',
    align: 'center',
  })

  t.x = 95;
  t.y = 30;

  return {
    el:function () {
      return t;
    },
    setText:function (v) {
      v = parseInt(v)
      if(isNaN(v)){
        v = 0
      }
      t.text = v + ' ';
    }
  }
}

module.exports = function (arg) {

  var stage = new PIXI.Container();
  var score = 0;

  var scoreObj = scoreTextFn();

  var sp = mySpriteFn(arg)

  sp.render = function () {

  };


  stage.addChild(scoreObj.el())
  stage.addChild(sp);


  stage.upScore = function () {
    scoreObj.setText(++score)
  }

  stage.getScore = function () {
    return score;
  }
  
  return stage;
};