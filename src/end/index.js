var png = ['game_over_background', 'play_again_button']
var stage = new PIXI.Container()
var loader = require('../loader')

var textForScore = function(score, finish) {
  if (finish) {
    return '你获得了' + score + '的好成绩'
  } else {
    return '太差了，居然就这么被撞飞了'
  }
};

var ajax = require('../lib/ajax');

var loading = pixiLib.loading.mpLoading();
var loadingEle = loading.el();

document.body.appendChild(loadingEle);

var si = setInterval(function () {

  if(!loading.progress()){
    clearInterval(si);
  }

},100);

/**
 *  --> Public Method
 **/
var render = function (renderer, score, finish) {
  score = score || 0
  if (!finish) {
    var user = 'owuWAwWD7-YBp4Dl77zZcXmdQBnw'

    ajax('/api/game/57d64d81300869c24a825bfd/user/' + user + '/score')
      .post({
      score: score
    }).then(function(response) {
      console.log(response)
    });
  }
  loader.add(png, 'png').load(function () {

    loadingEle.remove();

    var background = require('../../images/game_over_background')()
    var button = require('../../images/play_again_button')({"scale.y": 0.8})
    var text = new PIXI.Text(
      textForScore(score, finish),
      {font: '30px Helvetica-Light', 
        fill: 'white'});
    text.anchor.x = text.anchor.y = 0.5
    text.x = 320
    text.y = 600
    stage.addChild(background)
    
    stage.addChild(button)
    stage.addChild(text)
    
    button.interactive = true
    button.on('touchstart', function() {
      var game = require('../game')
      game(renderer)
    });

    if(typeof wx !== 'undefined'){

      var config = {
        title:text,
        desc:' ',
        link:location.href,
        imgUrl:'http://o8c60jr2y.bkt.clouddn.com/1/cat_share_icon.png',
        type:'link',
        success:function () {
          alert('分享成功')
        },
        cancel:function () {
          alert('分享成功')
        }
      }

      wx.onMenuShareTimeline(config);
      wx.onMenuShareAppMessage(config);
    }



    
    renderer(stage)
  })
}


module.exports = render

