var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('play_again_button'),

  

    

    "anchor.x" :  0.5 ,

    

  

    

    "anchor.y" :  0.5 ,

    

  

    

    "x" :  320 ,

    

  

    

    "y" :  800 ,

    

  

    

    "spriteName" :  "play_again_button" ,

    

  
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