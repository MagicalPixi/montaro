var bgFn = require('../../../images/bg');
var bgFn2 = require('../../../images/bg2');

var roadFn = require('../../../images/road')

var groupFn = require('../background/group')
var groupFn2 = require('../background/group2')
var groupFn3 = require('../background/group3')
var groupFn4 = require('../background/group4')
var groupFn5 = require('../background/group5')

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

module.exports = function () {

  var stage = new PIXI.Container();
  stage.speed = 2;
  stage.gameEnd = false;

  var bgs = repeatBackground(roadFn)

  bgs.map(function (bg) {
    stage.addChild(bg);
  });

  var buildingsArr = [
    groupFn,
    groupFn2,
    groupFn4,
    groupFn,
    groupFn2,
    groupFn3,
    groupFn,
    groupFn2,
    groupFn5
  ];


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

  stage.setGameEnd = function () {
    stage.gameEnd = true;
  }

  stage.isGameEnd = function () {
    return stage.gameEnd;
  }

  stage.render = function () {

    if (stage.gameEnd) {
      return true;
    }

    var newBuildings = [];

    stage.buildings.map(function (bg) {

      if (bg.removed) {
        return;
      }

      bg.x -= stage.speed;

      if (bg.x <= bg.sideX) {

        bg.removed = true;
        stage.removeChild(bg);

        //倒数第二个已经到达最边界,此时显示的是倒数最后一块。游戏结束
        if (buildingsArr.length === 0) {
          stage.setGameEnd();
        }

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

  };

  return stage;
}