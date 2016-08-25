var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('car'),

  

    

    "spriteName" :  "car" ,

    

  

    

    "animationSpeed" :  0.6 ,

    

  

    

    "loop" :  1 ,

    

  

    

    "play" :  1 ,

    

  
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

  var mySprite = pixiLib.getMc.apply(pixiLib,args);

  return mySprite;
}