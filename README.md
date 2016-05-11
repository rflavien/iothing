# iothing
A Node Framework for IoT

```js
var iothing = require('iothing')
var thing_service = iothing.get('thing')
var thing = thing_service.get('my-object')

thing.action('turn-on-garden-lights', function() {
    console.log('garden lights on !!')
})

thing.cron('nights', '00 * * * * *', function () {
    thing.emit('night')
})

thing.on('night', function () {
    thing.run('turn-on-garden-lights')
})
```

## Installation
```bash
$ npm install iothing
```

## Getting started
Create the app :
```bash
$ mkdir -p /var/app/config && cd /var/app
$ touch index.js ./config/thing.js
```

Configuration in __config/thing.js__ :
```js
module.exports = [
    {
        name: 'my object',
        ip: '127.0.0.1',
        gpios: [
            {name: 'light', pin :1}
        ]
    }    
]
```
Bootstrap in __index.js__ :
```js
// Loading the Framework
var iothing = require('iothing')
// Loading some services
var thing_service = iothing.get('thing')
var message_service = iothing.get('message')

// Getting a thing instance
var thing = thing_service.get('my-object')

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
```

## Documentation
- [Documentation page](http://rflavien.github.io/iothing)
- [GitHub repository](https://github.com/rflavien/iothing)
