/**
 * Created by zyg on 16/8/26.
 */
var _ = require('lodash');
var repeat = require('pixi-lib').utils.repeat;

var carFn = require('../../../images/car');
var blockFn = require('../../../images/block');

function blockFnWrapper(p) {
  return function () {
    return blockFn({
      position:p
    });
  }
}

function empty() {
  return false;
}

var roadArr = repeat([
  repeat(empty,2),
  [
    blockFnWrapper('l'),
    blockFnWrapper('m'),
    blockFnWrapper('h')
  ].concat(repeat(empty,2)),
  carFn,
],10);

function unzipArr(fromArr,arr) {
  if(fromArr.length > 0){
    var v = fromArr[0];

    if(_.isArray(v)){
      var unV = unzipArr(v,[]);
      arr = arr.concat(unV);
    }else{
      arr = arr.concat(v);
    }
    return unzipArr(fromArr.slice(1),arr);
  }else{
    return arr;
  }
}

var unzipRoadArr = unzipArr(roadArr,[]);
var index = 0;

window.ur = unzipRoadArr;

function blockManager() {

  var func = unzipRoadArr[index++];

  return  func ? func() : console.error('到终点了');
}

module.exports = blockManager;