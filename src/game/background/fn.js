/**
 * Created by zyg on 16/9/8.
 */
function arrFn(argsFn) {

  return function () {

    var args = argsFn();

    var arr = args[0], fn = args[1];

    var fnArr = [].concat(fn);

    return arr.map(function (arg, i) {


      return fnArr[i % fnArr.length](arg);
    })
  }
}

function addChildren(stage, childrenFn,maxY) {
  childrenFn().map(function (c) {

    console.log(c.y,maxY);

    if (!c.y) {
      c.y = maxY;
    }
    c.anchor.y = 1;

    stage.addChild(c);
  })
}


module.exports = {
  arrFn:arrFn,
  addChildren:addChildren,
}
