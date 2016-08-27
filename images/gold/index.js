/**
 * Created by zyg on 16/8/26.
 */

module.exports = function () {
  
  var g = new PIXI.Graphics();
  g.beginFill(0xF2D745)
  g.drawRect(0,0,100,100);
  g.endFill()
  
  return g;
}