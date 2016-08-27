var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('building1'),

  

    

    "spriteName" :  "building1" ,

    

  
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