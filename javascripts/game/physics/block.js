var BlockType = {
  Enemy: 'Enemy',
  Block: 'Block'
}

var Block = function(option) {
  this.width = option.width || 10
  this.height = option.height || 10
  this.position = option.position || {x: 0, y: 0},
  this.block = option.block || true
  this.type = option.type || BlockType.Block
}

Block.BlockType = BlockType

module.exports = Block
