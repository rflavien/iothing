var Decorator = require('./decorator')
var util = require("util")

var EventEmitter = require('events').EventEmitter

module.exports = eventBehavior

function eventBehavior(component)
{
    eventBehavior.super_.call(this, component)

    EventEmitter.call(this.component)

    this.component.on = EventEmitter.prototype.on
    this.component.emit = EventEmitter.prototype.emit
}
util.inherits(eventBehavior, Decorator)
