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


  var fns = [].slice.call(arguments, 0, arguments.length);

  var num = fns.length;

  function build(fn, i) {

    var bg = fn();

    bg.x = bg.initX = i * 1004;
    bg.y = 640 - bg.height;
    bg.sideX = -(num - i) * 1004;

    return bg;
  }

  for (var i = 0; i < num; i++) {

    var fn = fns[i];

    var bg = build(fn, i);

    arr.push(bg);
  }
  //补尾部
  // arr.push(build(fns[0],num));


  return arr;
}


function getBg(bgFn, i) {

  if (i === undefined) {
    i = 1;
  }

  var bg = bgFn();

  bg.x = bg.initX = i * 1004;
  bg.sideX = -1 * 1004;

  return bg;
}


var stage = new PIXI.Container();
stage.speed = 2;

var bgs = repeatBackground(roadFn)

bgs.map(function (bg) {
  stage.addChild(bg);
});


// var buildings = repeatBackground(
//   groupFn,
//   groupFn2,
//   groupFn,
//   groupFn2,
//   groupFn4,
//   groupFn,
//   groupFn2,
//   groupFn3,
//   groupFn,
//   groupFn2);
var buildingsArr = [
  groupFn,
  groupFn2,
  groupFn,
  groupFn2,
  groupFn4,
  groupFn,
  groupFn2,
  groupFn3,
  groupFn,
  groupFn2
];
//
// buildings.map(function (b) {
//   b.y = 0;
//   stage.addChild(b);
// })


stage.buildings = [
  getBg(buildingsArr[0], 0),
  getBg(buildingsArr[1]),
];

stage.addChild(stage.buildings[0])
stage.addChild(stage.buildings[1])

buildingsArr = buildingsArr.slice(2);

stage.setSpeed = function (s) {
  stage.speed = s;
}

stage.render = function () {

  var newBuildings = [];

  stage.buildings.map(function (bg) {

    if (bg.removed) {
      return;
    }

    bg.x -= stage.speed;

    if (bg.x <= bg.sideX) {

      bg.removed = true;
      stage.removeChild(bg);

    } else {
      newBuildings.push(bg);
    }
  });

  if (newBuildings.length < 2 && buildingsArr.length > 0) {

    var newBg = getBg(buildingsArr[0]);

    newBuildings.push(newBg)

    stage.addChild(newBg);

    buildingsArr = buildingsArr.slice(1);

    stage.buildings = newBuildings.slice();
  }

}

module.exports = stage;
