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
    'game_background',
    "greenHill",
    "greenMountains",
    "westLakeLantern",
    "westLakeHydrant",
    "groupBuildings",
    "smokeShop",
    "platformChair",
    "westLakeBridgeWave",
    "westLakeBridgeApproache",
    "westLakeBridge",
    "westLakeMansion",
    "building5",
    "building6",
    "goldCoin",
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

var loading = pixiLib.loading.mpLoading();

var loadingEle = loading.el();
loadingEle.style.transformOrigin = 'top'
loadingEle.style.transform = 'rotate(90deg)';
loadingEle.style.webkitTransformOrigin = 'top'
loadingEle.style.webkitTransform = 'rotate(90deg)';
document.body.appendChild(loadingEle)

var si = setInterval(function () {

  if(!loading.progress()){
    clearInterval(si);
  }

},100);

/**
 *  --> Public Method
 **/
var render = function (renderer) {
  
  loader.add(jsonResource, 'json')
    .add(pngResource, 'png')
    .load(function () {

      loadingEle.remove();


      var counter = 0;
      world.reset();

      stage.removeChildren();
      /**
       * direction button
       */

      var blockFactoryFn = require('./block');
      var starFactory = require('../../images/star')
      var roadFn = require('./road');
      var gameBackground = require('../../images/game_background')();
      var goldCoinFn = require('../../images/goldCoin')

      var road = roadFn();

      var blockFactory = blockFactoryFn()
      /**
       * --> Private Method
       **/
      function addBlock(count) {
        var block = blockFactory();
        if (block ) {
          stage.addChildAt(block, 3);
        }else{
        }

        return !!block;
      }

      function addStar() {
        var randomy = Math.random() * 200 + 300
        var star = starFactory({position: {x: 1004, y: randomy}})
        if (star) {
          stage.addChild(star)
        }
      }

      stage.addChild(gameBackground);
      stage.addChild(road);


      var goldCoin = goldCoinFn();

      stage.addChild(goldCoin)


      var dogFn = require('./dog')
      var dog = dogFn();

      dog.finishCb = function (success) {
        
        var end = require('../end');
        console.log('结束');
        
        end(renderer, goldCoin.getScore(), success);
      }
      dog.reset()
      stage.addChild(dog)
      stage.interactive = true;
      stage.on('touchstart', function () {
        dog.jump()
      })

      world.on('enemyCollision', function (event) {

        gameFail = true;
        dog.end()
      })
      world.on('rewardCollision', function (event) {
        event.reward.sprite.dismiss()
        goldCoin.upScore()
      });

      //游戏失败,游戏结束
      var gameFail = false,
        gameOver = false;
      
      stage.render = function () {
        counter++;
        world.step(1 / 60);
        
        gameOver = road.isGameEnd();
        if(gameOver){
          dog.gogogo();
        }
        
        if (counter % 60 === 0 && !(gameOver && gameFail)) {
          var i = counter / 25;
          addBlock(counter);
        }
        if (counter % 30 === 0) {
          addStar(counter)
        }
        stage.children.forEach(function (child) {
          if (child.render) {
            child.render()
          }
        })
      };
      renderer(stage)
    })
}


module.exports = render
