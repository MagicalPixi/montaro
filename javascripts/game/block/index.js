/**
 * Created by zyg on 16/8/26.
 */
var _ = require('lodash');
var repeat = require('pixi-lib').utils.repeat;
var unfoldArray = require('pixi-lib').utils.unfoldArray;

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


var unzipRoadArr = unfoldArray(roadArr,[]);
var index = 0;

function blockManager() {

  var func = unzipRoadArr[index++];

  return  func ? func() : console.error('到终点了');
}

module.exports = blockManager;
