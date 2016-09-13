var Ob = function() {}

Ob.prototype.events = {
}

Ob.prototype.on = function(key, handler) {
  this.events[key] = handler
}

Ob.prototype.sendEvent = function(event, key) {
  key = event.key || key
  if (key && this.events[key]) {
    var handler = this.events[key]
    handler(event)
  }
}

module.exports = Ob
