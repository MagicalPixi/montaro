var block = require('./block')
var blocks = function(length) {
  var array = [0, 0, 0, 0, 0]
  while(array.length < length) {
    var keys = Object.keys(block)
    var key = keys[parseInt(Math.random() * keys.length)]
    var fn = block[key]
    array = array.concat(fn())
  }
  return array
}
module.exports = {
  block: block,
  blocks: blocks
}
