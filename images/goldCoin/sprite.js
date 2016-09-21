var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('goldCoin'),

  

    

    "spriteName" :  "goldCoin" ,

    

  

    

    "scale.x" :  0.25 ,

    

  

    

    "scale.y" :  0.25 ,

    

  

    

    "anchor.x" :  0 ,

    

  

    

    "x" :  20 ,

    

  

    

    "y" :  20 ,

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(arg){

  if(!arg){
     arg = {}
  }

  for(var k in arg){
   args[0][k] = arg[k]
  }

  var mySprite = pixiLib.getIm.apply(pixiLib,args);

  return mySprite;
}