/**
 * Created by zyg on 16/8/29.
 */
var _ = require('lodash');
var repeat = require('pixi-lib').utils.repeat;
var unfoldArray = require('pixi-lib').utils.unfoldArray;

var fn = require('./fn');
var addChildren = fn.addChildren;
var arrFn = fn.arrFn;

var greenHill = require('../../../images/greenHill');
var greenMountains = require('../../../images/greenMountains');
var westLakeLantern = require('../../../images/westLakeLantern');
var westLakeHydrant = require('../../../images/westLakeHydrant');
var groupBuildings = require('../../../images/groupBuildings');
var smokeShop = require('../../../images/smokeShop');
var platformChair = require('../../../images/platformChair');
var westLakeBridgeWave = require('../../../images/westLakeBridgeWave');
var westLakeBridgeApproache = require('../../../images/westLakeBridgeApproache');
var westLakeBridge = require('../../../images/westLakeBridge');
var westLakeMansion = require('../../../images/westLakeMansion');

var roadFn = require('../../../images/road');

var tree = require('../../../images/tree');

var bush = require('../../../images/bush');
var building5 = require('../../../images/building5');
var building6 = require('../../../images/building6');

var maxY = 640 - roadFn.roadHeight;


function bushesFn() {

  var argArr = [
    {
      "scale.x": 0.08,
      "scale.y": 0.08,
      x: 840,
    },
    {
      "scale.x": 0.10,
      "scale.y": 0.10,
      x: 905,
    },
  ]

  return [argArr, bush]
}


function greenHillFn() {
  var args = [
    {
      'scale.x':0.15,
      'scale.y':0.15,
      x:50
    },
    {
      'scale.x':0.4,
      'scale.y':0.4,
      x:250
    },
    {
      'scale.x':0.25,
      'scale.y':0.25,
      x:670
    },
  ]

  return [args,greenHill]
}

function bridgeFn() {

  var args = [{
    'scale.x':0.3,
    'scale.y':0.3
  }]

  return [args,westLakeBridge]
}


function lanternFn(){
  var args = [{
    'scale.x':0.25,
    'scale.y':0.25,
    'x':100,
  }];

  return [args,westLakeLantern]
}

function waveFn() {
  var args = [{
    'scale.x':0.05,
    'scale.y':0.05,
    x:220,
    y:625,
  },{
    'scale.x':0.05,
    'scale.y':0.05,
    x:400,
    y:615
  },{
    'scale.x':0.05,
    'scale.y':0.05,
    x:580,
    y:625,
  },{
    'scale.x':0.05,
    'scale.y':0.05,
    x:750,
    y:615
  },{
    'scale.x':0.05,
    'scale.y':0.05,
    x:910,
    y:625
  }];

  return [args,westLakeBridgeWave]
}

function maxYAddChildren(stage,arrFnWrapper) {
  return addChildren(stage,arrFn(arrFnWrapper),maxY);
}

module.exports = function () {
  var stage = new PIXI.Container();

  maxYAddChildren(stage,greenHillFn)
  maxYAddChildren(stage,bushesFn)
  addChildren(stage,arrFn(bridgeFn),675)
  //maxYAddChildren(stage,lanternFn)
  addChildren(stage,arrFn(lanternFn),maxY + 47)

  addChildren(stage,arrFn(waveFn),620)

  console.log('group4');

  return stage;
};
