var EventEmitter = require('events').EventEmitter;

module.exports = eventBehavior;

function eventBehavior(thing)
{
    EventEmitter.call(thing);

    thing.on = EventEmitter.prototype.on;
    thing.emit = EventEmitter.prototype.emit;
};
