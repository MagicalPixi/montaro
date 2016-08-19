var Oberver = require('./observer')
var collision = require('./collision')

var World = function(option) {
  option = option || {}
  this.players = []
  this.blocks = []
  this.gravity = option.gravity || -10
}

var addPlayerEvent = {
  key: 'addPlayer',
  player: null
}

var removePlayerEvent = {
  key: 'removePlayer',
  player: null
}

var addBlockEvent = {
  key: 'addBlock',
  block: null
}

var removeBlockEvent = {
  key: 'removeBlock',
  block: null
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
  var event = addPlayerEvent
  event.player = player
  this.sendEvent(event)
}

World.prototype.addBlock = function(block) {
  this.blocks.push(block)
  var event = addBlockEvent
  event.block = block
  this.sendEvent(event)
}

World.prototype.remoteBlock = function(block) {
  this.blocks.pop(block)
  var event = removeBlockEvent
  event.block = block
  this.sendEvent(event)
}

World.prototype.step = function(dt) {
  for (var index in this.players) {
    var player = this.players[index]
    player.origin = player.position
    var dx = player.v.x * dt + 0.5 * player.a.x * dt * dt
    var dy = player.v.y * dt + 0.5 * (player.a.y + this.gravity) * dt * dt
    player.position.x = player.position.x + dx
    player.position.y = player.position.y + dy
    if (player.position.y < player.height / 2) {
      player.position.y  = player.height / 2
    }
    player.v.x = player.v.x + player.a.x * dt
    player.v.y = player.v.y + (player.a.y + this.gravity) * dt
    for (var i in this.blocks) {
      var block = this.blocks[i]
      var result = collision.checkCollision(player, block)
      if (result == collision.CollisionType.EnemyCollision) {
        this.sendEvent(enemyCollisionEvent(player, block))
      }
    }
  }
}

module.exports = World
