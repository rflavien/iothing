var fs = require('fs')

var subscriber_file_suffix = 'Subscriber.js'

module.exports = messageService

function messageService() {
    this.subscribers = []

    var files = fs.readdirSync(__dirname)

    files.filter((file) => {
        return file.substr(-subscriber_file_suffix.length) === subscriber_file_suffix
    }).forEach((file) => {
        var key = file.substr(0, (file.length - subscriber_file_suffix.length))
        var Subscriber = require(`${__dirname}/${file}`)
        this.subscribers[key] = new Subscriber()
    })
}

messageService.prototype.publish = function(subscriber, message) {
    if(subscriber in this.subscribers) {
        this.subscribers[subscriber].send(message)
    } else {
        throw `Not Found`
    }
}

messageService.prototype.broadcast = function(message) {
    var subscribers =  Object.keys(this.subscribers)
    subscribers.forEach((subscriber) => {
        this.subscribers[subscriber].send(message)
    })
}

messageService.prototype.has = function(name) {
    if (name in this.subscribers) {
        return true
    }
    return false
}

messageService.prototype.register = function(name, subscriber) {
    this.subscribers[name] = subscriber
}
