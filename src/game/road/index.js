var bgFn = require('../../../images/bg');
var bgFn2 = require('../../../images/bg2');

var roadFn = require('../../../images/road')

var groupFn = require('../background/group')
var groupFn2 = require('../background/group2')
var groupFn3 = require('../background/group3')
var groupFn4 = require('../background/group4')

//生成背景
function repeatBackground(spriteFn) {
  var arr = [];


  var fns = [].slice.call(arguments,0,arguments.length);

  var num = fns.length;

  function build(fn, i) {

    var bg = fn();

    bg.x = bg.initX = i * 1004;
    bg.y = 640 - bg.height;
    bg.sideX = -(num-i) * 1004;

    return bg;
  }

  for(var i=0;i<num;i++){

    var fn = fns[i];

    var bg = build(fn,i);

    arr.push(bg);
  }
  //补尾部
  arr.push(build(fns[0],num));


  return arr;
}


var stage = new PIXI.Container();
stage.speed = 2;

var bgs = repeatBackground(roadFn)

bgs.map(function (bg) {
  stage.addChild(bg);
});


//var buildings = repeatBackground(groupFn,groupFn2,groupFn3);
var buildings = repeatBackground(groupFn4);

buildings.map(function (b) {
  b.y = 0;
  stage.addChild(b);
})


stage.setSpeed = function (s) {
  stage.speed = s;
}

// stage.render = function () {
//   [].concat(bgs).concat(buildings).map(function (bg) {
//     bg.x -= stage.speed;
//     if(bg.x <= bg.sideX){
//       bg.x = bg.initX;
//     }
//   });
// }

module.exports = stage;
