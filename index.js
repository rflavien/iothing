// module.exports = require(`${__dirname}/app/serviceManager`);

var iothing = require(`${__dirname}/app/serviceManager`)

// var iothing = require('iothing')
// Loading some services
var thing_service = iothing.get('thing')
var message_service = iothing.get('message')

// Getting a thing instance
var thing = thing_service.get('123-aze-456-rty')

// You can manage you gpio by overriding the value function
thing.gpio({"pin":1}).value = function(value) {
    if (typeof value === 'undefined') {
        return "light is off"
    }
    return "light is on"
}

// Then access your gpios value
message_service.publish('log', thing.gpio({"pin":1}).value())

// You can attach actions to your thing
thing.action('turn-on-garden-lights', function() {
    message_service.broadcast(thing.gpio({"pin":1}).value(1))
})

// You can attach crons to your thing
thing.cron('nights', '00 * * * * *', function () {
    // the thing can emit events
    thing.emit('night')
})

// You can attach listeners to your thing
thing.on('night', function () {
    thing.run('turn-on-garden-lights')
})