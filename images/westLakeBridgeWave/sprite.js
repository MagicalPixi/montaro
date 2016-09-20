var pixiLib = require('pixi-lib');


module.exports = function spriteFn(arg){

  var args = [{

    textures:pixiLib.getTextures('westLakeBridgeWave'),





    "spriteName" :  "westLakeBridgeWave" ,




  }]



  args.push([


  ]);

  if(!arg){
     arg = {}
  }

  for(var k in arg){
   args[0][k] = arg[k]
  }

  console.log('yy:',args[0].y,arg.y)

  var mySprite = pixiLib.getIm.apply(pixiLib,args);

  return mySprite;
}