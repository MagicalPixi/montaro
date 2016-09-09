var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('cat'),

  
  "scale.x" : 0.5,
  
  "scale.y": 0.5,
    

    "spriteName" :  "cat" ,

    

  

    

    "animationSpeed" :  0.4 ,

    

  

    

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
