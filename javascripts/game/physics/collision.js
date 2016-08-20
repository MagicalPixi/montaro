var Block = require('./block')

var checkBottomCollision = function(player, block) {
  var dx = player.position.x - block.position.x
  var dy = player.position.y - block.position.y
  var odx = player.origin.x - block.position.x
  var ody = player.origin.y - block.position.y
  return (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) && (Math.abs(odx) <= (player.width + block.width) / 2 && Math.abs(ody) >= (player.height + block.height) / 2) && dy >= 0
}
var checkTopCollision = function(player, block) {
  var dx = player.position.x - block.position.x
  var dy = player.position.y - block.position.y
  var odx = player.origin.x - block.position.x
  var ody = player.origin.y - block.position.y
  return (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) && (Math.abs(odx) <= (player.width + block.width) / 2 && Math.abs(ody) >= (player.height + block.height) / 2) && dy < 0
}


var checkEnemyCollision = function(player, block) {
  var dx = player.position.x - block.position.x
  var dy = player.position.y - block.position.y
  var odx = player.origin.x - block.position.x
  var ody = player.origin.y - block.position.y
  if (block.type == Block.BlockType.Block) {
    return (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2) && (Math.abs(ody) <= (player.height + block.height) / 2 && Math.abs(odx) >= (player.width + block.width) / 2)
  } else {
    return (Math.abs(dx) < (player.width + block.width) / 2 && Math.abs(dy) < (player.height + block.height) / 2)
  }
}

module.exports = {
  checkEnemyCollision: checkEnemyCollision,
  checkTopCollision: checkTopCollision,
  checkBottomCollision: checkBottomCollision,
}

