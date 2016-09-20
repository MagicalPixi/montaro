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
var westLakeMansion = require('../../../images/westLakeMansion');

var roadFn = require('../../../images/road');

var tree = require('../../../images/tree');

var bush = require('../../../images/bush');
var building5 = require('../../../images/building5');

var maxY = 640 - roadFn.roadHeight;


function treesFn() {
  var argArr = [
    {
      'scale.x':0.2,
      'scale.y':0.2,
      x:170,
    },
    {
      'scale.x':0.15,
      'scale.y':0.15,
      x:750,
    },
  ];

  return [argArr,tree];
}

function bushesFn() {

  var argArr = [
    {
      "scale.x": 0.08,
      "scale.y": 0.08,
      x: 150,
    },
  ]

  return [argArr, bush]
}

function platformChairFn() {

  var argArr = [
    {
      'scale.x':0.07,
      'scale.y':0.07,
      x:00
    },
  ]

  return [argArr,platformChair];
}

function greenHillFn() {
  var args = [
    {
      'scale.x':0.25,
      'scale.y':0.25,
      x:50
    },
    {
      'scale.x':0.35,
      'scale.y':0.35,
      x:500
    }
  ]

  return [args,greenHill]
}

function westLakeMansionFn() {
  var argArr = [
    {
      'scale.x':0.5,
      'scale.y':0.5,
      'x':260,
    },
  ]

  return [argArr,westLakeMansion]
}

function smokeShopFn() {
  var arg=[
    {
      'scale.x':0.3,
      'scale.y':0.3,
      x:810,
    }
  ]
  return [arg,smokeShop]
}

function maxYAddChildren(stage,arrFnWrapper) {
  return addChildren(stage,arrFn(arrFnWrapper),maxY);
}

module.exports = function () {
  var stage = new PIXI.Container();

  maxYAddChildren(stage,greenHillFn)

  maxYAddChildren(stage,platformChairFn)
  maxYAddChildren(stage,westLakeMansionFn)
  maxYAddChildren(stage,smokeShopFn)

  maxYAddChildren(stage,bushesFn)
  maxYAddChildren(stage,treesFn)


  console.log('!!!')

  return stage;
};
