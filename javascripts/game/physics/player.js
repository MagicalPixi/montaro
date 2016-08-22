
var Player = function(option) {
  this.width = option.width || 10
  this.height = option.height || 10
  this.position = option.position || {x: 0, y: 0},
  this.v = option.v || {x: 0, y: 0}
  this.a = option.a || {x: 0, y: 0}
  this.inland = false
}

module.exports = Player


