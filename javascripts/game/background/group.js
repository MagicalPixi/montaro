/**
 * Created by zyg on 16/8/29.
 */
var _ = require('lodash');
var repeat = require('pixi-lib').utils.repeat;
var unfoldArray = require('pixi-lib').utils.unfoldArray;

var fn = require('./fn');
var addChildren = fn.addChildren;
var arrFn = fn.arrFn;

var building0 = require('../../../images/building0');
var building1 = require('../../../images/building1');
var building2 = require('../../../images/building2');
var building3 = require('../../../images/building3');
var building4 = require('../../../images/building4');
var bush = require('../../../images/bush');
var cloud = require('../../../images/cloud');
var cloudSun = require('../../../images/cloudSun');
var tree = require('../../../images/tree');


var roadFn = require('../../../images/road');

var maxY = 640 - roadFn.roadHeight;



function cloudFn() {

  var argArr = [{
    "scale.x": 0.25,
    "scale.y": 0.25,
    x: 50,
    y: 180
  }, {
    "scale.x": 0.25,
    "scale.y": 0.25,
    x: 700,
    y: 70
  }];


  return [argArr, [
    cloud,
    cloudSun
  ]]
}

function bushesFn() {
  var argArr = [
    {
      "scale.x": 0.15,
      "scale.y": 0.15,
      x: 10,
    },
    {
      "scale.x": 0.05,
      "scale.y": 0.05,
      x: 160,
    },
    {
      "scale.x": 0.08,
      "scale.y": 0.08,
      x: 520,
    },
    {
      "scale.x": 0.10,
      "scale.y": 0.10,
      x: 675,
    },
  ]

  return [argArr, bush]
}

function treesFn() {

  var argArr = [
    {
      "scale.x": 0.15,
      "scale.y": 0.15,
      x: 120,
    },
    {
      "scale.x": 0.20,
      "scale.y": 0.20,
      x: 175,
    },
    {
      "scale.x": 0.20,
      "scale.y": 0.20,
      x: 730,
    },
  ]

  return [argArr, tree]
}


function buildingFn() {


  var argArr = [
    {
      "scale.x": 0.5,
      "scale.y": 0.5,
      x: 330,
    },
    {
      "scale.x": 0.3,
      "scale.y": 0.3,
      x: 280,
    },
    {
      "scale.x": 0.20,
      "scale.y": 0.20,
      x: 570,
    },
    {
      "scale.x": 0.25,
      "scale.y": 0.25,
      x: 615,
    },
    {
      "scale.x": 0.25,
      "scale.y": 0.25,
      x: 860,
    },
  ]

  return [argArr, [
    building0,
    building2,
    building3,
    building4,
    building1,
  ]]
}

module.exports = function () {
  var stage = new PIXI.Container();

  addChildren(stage, arrFn(cloudFn),maxY)
  addChildren(stage, arrFn(buildingFn),maxY)
  addChildren(stage, arrFn(bushesFn),maxY)
  addChildren(stage, arrFn(treesFn),maxY)

  return stage;
};