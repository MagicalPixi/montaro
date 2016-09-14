var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('game_over_background'),

  

    

    "spriteName" :  "game_over_background" ,

    

  
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