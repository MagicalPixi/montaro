var bgFn = require('../../../images/bg');
var bgFn2 = require('../../../images/bg2');


//生成背景
function repeatBackground() {
  var num = 3;
  var arr = [];

  var fns = [bgFn,bgFn2];

  function build(fn, i) {

    var bg = fn();

    bg.x = bg.initX = i * 1004;
    bg.y = 0;
    bg.sideX = -(num-i) * 1004;

    return bg;
  }

  for(var i=0;i<num;i++){

    var fn = fns[i%fns.length];

    var bg = build(fn,i);

    arr.push(bg);
  }

  arr.push(build(fns[0],num));


  return arr;
}


var stage = new PIXI.Container();
stage.speed = 2;

var bgs = repeatBackground()

bgs.map(function (bg) {
  stage.addChild(bg);
});


stage.setSpeed = function (s) {
  stage.speed = s;
}

stage.render = function () {
  bgs.map(function (bg) {
    bg.x -= stage.speed;
    if(bg.x <= bg.sideX){
      bg.x = bg.initX;
    }
  });
}

module.exports = stage;