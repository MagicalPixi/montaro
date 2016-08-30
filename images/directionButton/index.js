/**
 * Created by zyg on 16/8/30.
 */


module.exports = function () {

  var g = new PIXI.Graphics();

  g.beginFill(0x000000);
  g.drawRect(0,0,100,100);
  g.endFill()


  g.interactive = true;

  return g;
};