var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('game_background'),

  

    

    "spriteName" :  "game_background" ,

    

  

    

    "anchor.x" :  0.5 ,

    

  

    

    "anchor.y" :  0.5 ,

    

  

    

    "scale.x" :  1 ,

    

  

    

    "scale.y" :  1 ,

    

  

    

    "x" :  502 ,

    

  

    

    "y" :  320 ,

    

  
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