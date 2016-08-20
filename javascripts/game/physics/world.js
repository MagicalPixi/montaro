var Oberver = require('./observer')
var collision = require('./collision')

var World = function(option) {
  option = option || {}
  this.players = []
  this.blocks = []
  this.gravity = option.gravity || -10
}

var addPlayerEvent = function(player) {
  return {
    key: 'addPlayer',
    player: player
  }
}

var removePlayerEvent = function(player) {
  return {
    key: 'removePlayer',
    player: player
  }
}

var addBlockEvent = function (block) {
  return {
    key: 'addBlock',
    block: block
  }
}

var removeBlockEvent = function(block) {
  return {
    key: 'removeBlock',
    block: block
  }
}

var enemyCollisionEvent = function(player, enemy) {
  return {
    key: 'enemyCollision',
    player: player,
    enemy: enemy
  }
}

World.prototype = new Object(Oberver.prototype)

World.prototype.constructor = World

World.prototype.addPlayer = function(player) {
  this.players.push(player)
  this.sendEvent(addPlayerEvent(player))
}

World.prototype.addBlock = function(block) {
  block.world = this
  this.blocks.push(block)
  this.sendEvent(addBlockEvent(block))
}

World.prototype.remoteBlock = function(block) {
  block.world = null
  this.blocks.pop(block)
  this.sendEvent(removeBlockEvent(block))
}

World.prototype.step = function(dt) {
  for (var index in this.players) {
    var player = this.players[index]
    player.origin = player.position
    var dx = player.v.x * dt + 0.5 * player.a.x * dt * dt
    var dy = player.v.y * dt + 0.5 * (player.a.y + this.gravity) * dt * dt
    var position = {x: player.position.x + dx, y: player.position.y + dy}
    player.position = position
    if (player.position.y < player.height / 2) {
      player.position.y  = player.height / 2
    }
    player.v.x = player.v.x + player.a.x * dt
    player.v.y = player.v.y + (player.a.y + this.gravity) * dt
    for (var i in this.blocks) {
      var block = this.blocks[i]
      var type = collision.checkCollision(player, block)
      if (type == collision.CollisionType.EnemyCollision) {
        this.sendEvent(enemyCollisionEvent(player, block))
      } else if (type == collision.CollisionType.BlockCollisionTop) {
        player.position.y = block.position.y + (block.height + player.height) / 2
        player.v.y = 0
      } else if (type == collision.CollisionType.BlockCollisionBottom) {
        player.position.y = block.position.y - (block.height + player.height) / 2
        player.v.y = 0 
      } else if (type == collision.CollisionType.BlockCollisionLeft) {
        this.sendEvent(enemyCollisionEvent(player, block))
      } else if (type == collision.CollisionType.BlockCollisionRight) {
        this.sendEvent(enemyCollisionEvent(player, block))
      }
    }
  }
}

module.exports = World
