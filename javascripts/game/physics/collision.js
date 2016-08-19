var Block = require('./block')
var Type = {
  EnemyCollision: 'EnemyCollision',
  RewardCollision: 'RewardCollision'
}

var checkCollision = function(player, block) {
  var dx = player.position.x - block.position.x
  var dy = player.position.y - block.position.y
  if (block.type == Block.BlockType.Enemy) {
    if (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) {
      return Type.EnemyCollision
    }   
  } else if (block.type == Block.BlockType.Block) {
   if (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) {
      return Type.EnemyCollision
    }   
  } else {
   if (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) {
      return Type.EnemyCollision
    }   
  }
}

module.exports = {
 checkCollision: checkCollision,
 CollisionType: Type
}

