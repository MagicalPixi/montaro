var jsonResource = [
    'default',
    'dog',
    'car',
  ],
  pngResource = [
    'bg',
    'bg2',
    'block',
    'building0',
    'building1',
    'building2',
    'building3',
    'building4',
    'bush',
    'tree',
    'cloud',
    'cloudSun'
  ],
  counter = 0;

var stage = new PIXI.Container()
stage.pivot = new PIXI.Point(502, 320)
stage.x = 320
stage.y = 502
stage.rotation = Math.PI / 2


window.W = 1004;
window.H = 640;

var loader = require('../loader')
var world = require('./world').world

/**
 *  --> Public Method
 **/
var render = function (renderer) {
  loader.add(jsonResource, 'json')
    .add(pngResource, 'png')
    .load(function () {

      var directionButtonFn = require('../../images/directionButton');
      var upButton = directionButtonFn()
      upButton.x = 10;
      upButton.y = 640 - 220;

      var downButton = directionButtonFn();
      downButton.x = 10;
      downButton.y = 640 - 110;

      var goldFn = require('../../images/gold');

      var blockFactory = require('./block');
      // var backgroundFn = require('./background')

      /**
       * --> Private Method
       **/
      function addBlock(count) {
        var block = blockFactory();
        // var building = backgroundFn();

        if (block) {
          stage.addChildAt(block,3)
        }
        // if(building){
        //   stage.addChild(building)
        // }
      }

      var road = require('./road');
      stage.addChild(road);

      var dog = require('./dog')

      window.dog = dog;

      stage.addChild(dog)

      stage.addChild(goldFn())

      stage.interactive = true;

      stage.addChild(upButton)
      stage.addChild(downButton)

      upButton.on('touchstart',function (e) {
        dog.up();

        e.data.originalEvent.stopPropagation()
      });

      downButton.on('touchstart',function (e) {
        dog.down()

        e.data.originalEvent.stopPropagation()
      })

      // stage.on('touchstart', function () {
      // });
      document.body.ontouchstart = function () {
        dog.jump()
      };

      world.on('enemyCollision', function (event) {
        console.log({event: event, message: 'game over'})
      })
      stage.render = function () {
        counter++
        world.step(1 / 60)
        if (counter % 60 === 0) {
          var i = counter / 25
          addBlock(counter)
        }
        stage.children.forEach(function (child) {
          if (child.render) {
            child.render()
          }
        })
      }


      renderer(stage)
    })
}


module.exports = render
