/**
 * Created by zyg on 16/8/29.
 */
var _ = require('lodash');
var repeat = require('pixi-lib').utils.repeat;
var unfoldArray = require('pixi-lib').utils.unfoldArray;

var fn = require('./fn');
var addChildren = fn.addChildren;
var arrFn = fn.arrFn;

var greenHill = require('../../images/greenHill');
var greenMountains = require('../../images/greenMountains');
var westLakeLantern = require('../../images/westLakeLantern');
var westLakeHydrant = require('../../images/westLakeHydrant');
var groupBuildings = require('../../images/groupBuildings');
var smokeShop = require('../../images/smokeShop');
var platformChair = require('../../images/platformChair');
var westLakeBridgeWave = require('../../images/westLakeBridgeWave');
var westLakeBridgeApproache = require('../../images/westLakeBridgeApproache');
var westLakeBridge = require('../../images/westLakeBridge');
var westLakeMansion = require('../../images/westLakeMansion');

var roadFn = require('../../../images/road');

var maxY = 640 - roadFn.roadHeight;





module.exports = function () {
  var stage = new PIXI.Container();

  return stage;
};