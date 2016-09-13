var Oberver = require('./observer')
var collision = require('./collision')
var Block = require('./block')

var World = function(option) {
  option = option || {}
  this.players = []
  this.blocks = []
  this.gravity = option.gravity || -10
  this.land = option.land || 0
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

var rewardCollisionEvent = function(player, reward) {
  return {
    key: 'rewardCollision',
    player: player,
    reward: reward
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

World.prototype.removeBlock = function(block) {
  block.world = null
  var i = this.blocks.indexOf(block)
  if (i != -1) {
    this.blocks.splice(i, 1)
  }
  this.sendEvent(removeBlockEvent(block))
}

World.prototype.step = function(dt) {
  for (var index in this.players) {
    var player = this.players[index]
    player.inland = false
    player.origin = player.position
    var dx = player.v.x * dt + 0.5 * player.a.x * dt * dt
    var dy = player.v.y * dt + 0.5 * (player.a.y + this.gravity) * dt * dt
    var position = {x: player.position.x + dx, y: player.position.y + dy}
    player.position = position
    if (player.position.y < player.height / 2 + this.land) {
      player.position.y  = player.height / 2 + this.land;
      player.inland = true
    }
    player.v.x = player.v.x + player.a.x * dt
    player.v.y = player.v.y + (player.a.y + this.gravity) * dt
    var result = checkEnemyCollision(this, this.blocks, player)
    if (result.enemy) {
      if (result.enemy.type == Block.BlockType.Enemy) {
        this.sendEvent(enemyCollisionEvent(player, result.enemy))
      }
    } else {
      if (result.topBlock && result.bottomBlock){
        if (collision.checkBottomCollision(player, result.topBlock)) {
          player.position.y = result.topBlock.position.y + (result.topBlock.height + player.height) / 2
          player.inland = true
          player.v.y = 0
        } else if (collision.checkTopCollision(player, result.bottomBlock)) {
          player.position.y = result.bottomBlock.position.y - (result.bottomBlock.height + player.height) / 2
          player.v.y = 0
        }
      }
    }
  }
}

var checkEnemyCollision = function(world, blocks, player) {
  var enemy = null
  var topBlock = null
  var bottomBlock = null
  for (var i in blocks) {
    var current = blocks[i]
    if (current.type == Block.BlockType.Block && current.position.x < player.position.x + player.width && current.position.x >= player.position.x - current.width) {
      if (!topBlock || current.position.y >= topBlock.position.y) topBlock = current
      if (!bottomBlock || current.position.y <= bottomBlock.position.y) bottomBlock = current
    }
    if (current.type == Block.BlockType.Reward) {
      if (collision.checkEnemyCollision(player, current)) {
        world.sendEvent(rewardCollisionEvent(player, current))
        if (!enemy) enemy = current
      }
    } else {
      if (collision.checkEnemyCollision(player, current)) {
        enemy = current
        break
      }
    }
  }
  return {
    enemy: enemy,
    topBlock: topBlock,
    bottomBlock: bottomBlock
  }
}

module.exports = World
