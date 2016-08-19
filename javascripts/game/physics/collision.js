var Block = require('./block')
var Type = {
  EnemyCollision: 'EnemyCollision',
  RewardCollision: 'RewardCollision',
  BlockCollisionTop: 'BlockCollisionTop',
  BlockCollisionBottom: 'BlockCollisionBottom',
  BlockCollisionLeft: 'BlockCollisionLeft',
  BlockCollisionRight: 'BlockCollisionRight'
}

var checkCollision = function(player, block) {
  var dx = player.position.x - block.position.x
  var dy = player.position.y - block.position.y
  if (block.type == Block.BlockType.Enemy) {
    if (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) {
      return Type.EnemyCollision
    }   
  } else if (block.type == Block.BlockType.Block) {
    return checkBlockCollision(player, block)
  } else {
   if (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) {
      return Type.EnemyCollision
    }   
  }
}

var checkBlockCollision = function (player, block) {
  var dx = player.position.x - block.position.x
  var dy = player.position.y - block.position.y
  if (Math.abs(dx) <= (player.width + block.width) / 2 && Math.abs(dy) <= (player.height + block.height) / 2) {
    var odx = player.origin.x - block.position.x
    var ody = player.origin.y - block.position.y
    if (Math.abs(odx) <= (player.width + block.width) / 2 && Math.abs(ody) > (player.height + block.height) / 2) {
      return dy < 0 ? Type.BlockCollisionBottom : Type.BlockCollisionTop
    } else if (Math.abs(ody) <= (player.height + block.height) / 2 && Math.abs(odx) > (player.width + block.width) / 2) {
      return dx < 0 ? Type.BlockCollisionLeft : Type.BlockCollisionRight
    }  
  }   
}

module.exports = {
 checkCollision: checkCollision,
 CollisionType: Type
}

