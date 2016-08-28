var bgFn = require('../../../images/bg');
var bgFn2 = require('../../../images/bg2');

var roadFn = require('../../../images/road')

var groupFn = require('../background/group')

//生成背景
function repeatBackground(spriteFn) {
  var num = 3;
  var arr = [];

  var fns = [spriteFn];

  function build(fn, i) {

    var bg = fn();

    bg.x = bg.initX = i * 1004;
    bg.y = 640 - bg.height;
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

var bgs = repeatBackground(roadFn)

bgs.map(function (bg) {
  stage.addChild(bg);
});


var buildings = repeatBackground(groupFn);

buildings.map(function (b) {
  b.y = 0;
  stage.addChild(b);
})


stage.setSpeed = function (s) {
  stage.speed = s;
}

stage.render = function () {
  [].concat(bgs).concat(buildings).map(function (bg) {
    bg.x -= stage.speed;
    if(bg.x <= bg.sideX){
      bg.x = bg.initX;
    }
  });


}

module.exports = stage;