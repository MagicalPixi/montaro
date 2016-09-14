var jsonResource = [
    'default',
    'dog',
    'car',
    'cat'
  ],
pngResource = [
    'star',
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
    'cloudSun',
    'game_background'
  ]
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
      var counter = 0
      world.reset()
      var score = 0
      stage.removeChildren();
      /**
       * direction button
       */
      var directionButtonFn = require('../../images/directionButton');
      var upButton = directionButtonFn()
      upButton.x = 10;
      upButton.y = 640 - 220;

      var downButton = directionButtonFn();
      downButton.x = 10;
      downButton.y = 640 - 110;
      
      upButton.on('touchstart',function (e) {
        dog.up();
        e.data.originalEvent.stopPropagation()
      });

      downButton.on('touchstart',function (e) {
        dog.down()
        e.data.originalEvent.stopPropagation()
      })

      var blockFactory = require('./block');
      var starFactory = require('../../images/star')

      /**
       * --> Private Method
       **/
      function addBlock(count) {
        var block = blockFactory();
        if (block) {
          stage.addChildAt(block,3)
        }
      }

      function addStar() { 
        var randomy = Math.random() * 200 + 300
        var star = starFactory({position: {x: 1004, y: randomy}})
        if (star) {
          stage.addChild(star)
        }
      }
      
      var road = require('./road');
      var gameBackground = require('../../images/game_background')()
      stage.addChild(gameBackground)
      stage.addChild(road);

      var dog = require('./dog')
      dog.finishCb = function() {
        var end = require('../end')
        end(renderer, score, false)
      }
      dog.reset()
      stage.addChild(dog)
      stage.interactive = true;
      stage.addChild(upButton)
      stage.addChild(downButton)
      stage.on('touchstart', function() {
        dog.jump()
      })
      
      world.on('enemyCollision', function (event) {
        dog.end()
      })
      world.on('rewardCollision', function(event) {
          event.reward.sprite.dismiss()
          score ++    
      })
      stage.render = function () {
        counter++
        world.step(1 / 60)
        if (counter % 60 === 0) {
          var i = counter / 25
          addBlock(counter)
        }
        if (counter % 30 === 0) {
          addStar(counter)
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
