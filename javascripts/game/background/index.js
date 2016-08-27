var _ = require('lodash');
var repeat = require('pixi-lib').utils.repeat;
var unfoldArray = require('pixi-lib').utils.unfoldArray;

var building0 = require('../../../images/building0');
var building1 = require('../../../images/building1');
var building2 = require('../../../images/building2');
var building3 = require('../../../images/building3');
var building4 = require('../../../images/building4');
var bush = require('../../../images/bush');
var cloud = require('../../../images/cloud');
var cloudSun = require('../../../images/cloudSun');
var tree = require('../../../images/tree');


var buildingArray = repeat([
  // building0,
  // building1,
  // building2,
  // building3,
  // building4,
  bush,
  cloud,
  cloudSun,
  tree,
],10);


var buildings = unfoldArray(buildingArray,[]);
var i = 0;

module.exports = function () {
  
  var f = buildings[i++];
  f = f ? f() : console.log('到终点了2');
  f.scale.x = 0.3;
  f.scale.y = 0.3;
  f.x = 1004
  f.anchor.y = 1;
  f.y = 640 - 265 - 5;
  f.render = function () {
    f.x -=2;
    if(f.x < 0){
      this.parent.removeChild(f);
    }
  }


  return f;
}