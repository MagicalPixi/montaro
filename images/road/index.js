/**
 * Created by zyg on 16/8/27.
 */

var roadBaseWidth = 1004;

var grassHeight = 15;
var grassHeight2 = 30;
var roadBaseHeight = 96;


function roadBaseFn() {

  var base = new PIXI.Container();

  var grass = new PIXI.Graphics();
  grass.beginFill(0x86b952)
  grass.drawRect(0,0,roadBaseWidth,grassHeight);
  grass.endFill()

  var grass1 = new PIXI.Graphics();
  grass1.beginFill(0xafe771)
  grass1.drawRect(0,grassHeight,roadBaseWidth,grassHeight2);
  grass1.endFill()


  var rect = new PIXI.Graphics();
  rect.beginFill(0x696969)
  rect.drawRect(0,grassHeight + grassHeight2,roadBaseWidth,roadBaseHeight)
  rect.endFill()

  base.addChild(rect)
  base.addChild(grass1)
  base.addChild(grass)

  return base;
}

function roadLightLine() {

  var line = new PIXI.Graphics();

  line.beginFill(0xf0f0f0)
  line.drawRect(0,grassHeight + grassHeight2 + roadBaseHeight/2 - 6 ,70,12)
  line.endFill();

  return line;
}

function roadDarkLine() {
  var line = new PIXI.Graphics()

  line.beginFill(0xaaaaaa)
  line.drawRect(0,grassHeight + grassHeight2 + roadBaseHeight/2 - 1,70,2)
  line.endFill()

  return line;
}

function roadFn(ignoreLine) {

  var container = new PIXI.Container();

  container.addChild(roadBaseFn())

  if(ignoreLine) {
    var i = 0;
    var lines = [roadLightLine, roadDarkLine];

    while ((i * 70) < roadBaseWidth) {

      var line = lines[i % 2]();
      line.x = (i * 70);

      container.addChild(line);

      i++;
    }
  }

  return container;
}

roadFn.grassHeight = grassHeight;
roadFn.grassHeight2 = grassHeight2;
roadFn.roadBaseHeight = roadBaseHeight;

roadFn.roadHeight = roadBaseHeight + grassHeight + grassHeight2;

module.exports = roadFn;