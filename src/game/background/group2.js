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


function treesFn() {
  var argArr = [
    {
      'scale.x':0.2,
      'scale.y':0.2,
      x:120,
    },
    {
      'scale.x':0.2,
      'scale.y':0.2,
      x:600,
    },
    {
      'scale.x':0.14,
      'scale.y':0.14,
      x:680
    }
  ];

  return [argArr,tree];
}

function bushesFn() {

  var argArr = [
    {
      "scale.x": 0.08,
      "scale.y": 0.08,
      x: 170,
    },
    {
      "scale.x": 0.08,
      "scale.y": 0.08,
      x: 420,
    },
    {
      "scale.x": 0.08,
      "scale.y": 0.08,
      x: 750,
    },
    {
      "scale.x": 0.10,
      "scale.y": 0.10,
      x: 925,
    },
  ]

  return [argArr, bush]
}

function platformChairFn() {

  var argArr = [
    {
      'scale.x':0.07,
      'scale.y':0.07,
      x:250
    },
    // {
    //   'scale.x':0.07,
    //   'scale.y':0.07,
    //   x:800
    // }
  ]

  return [argArr,platformChair];
}

function westLakeHydrantFn() {
  var arg = [
    {
      'scale.x':0.5,
      'scale.y':0.5,
      x:400
    },
    {
      'scale.x':0.5,
      'scale.y':0.5,
      x:700
    }
  ]

  return [arg,westLakeHydrant]
}

function building6Fn() {
  var arg = [
    {
      'scale.x':0.3,
      'scale.y':0.3,
      x:830
    }
  ]
  return [arg,building6];
}

function greenHillFn() {
  var args = [
    {
      'scale.x':0.35,
      'scale.y':0.35,
      x:350
    }
  ]

  return [args,greenHill]
}

function descrorateFn() {
  var arg = [
    {
      'scale.x':0.10,
      'scale.y':0.1,
      x:500
    },
    {
      'scale.x':0.08,
      'scale.y':0.08,
      x:555
    }
  ]
  return [arg,[
    building5,
    westLakeHydrant,
  ]]
}

function maxYAddChildren(stage,arrFnWrapper) {
  return addChildren(stage,arrFn(arrFnWrapper),maxY);
}

module.exports = function () {
  var stage = new PIXI.Container();

  maxYAddChildren(stage,greenHillFn)
  maxYAddChildren(stage,building6Fn)
  maxYAddChildren(stage,platformChairFn)
  maxYAddChildren(stage,bushesFn)
  maxYAddChildren(stage,descrorateFn)
  maxYAddChildren(stage,treesFn)

  return stage;
};
