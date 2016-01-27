# iothing
A Node Framework for IoT

[![iothing Logo](http://rflavien.github.io/images/iothing-logo.svg)](http://rflavien.github.io/iothing)

```js
var iothing = require('iothing')
var thing = iothing.get('thingInstance')

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
module.exports = {
    name: 'my object',
    ip: '127.0.0.1',
    gpios: [
        {name: 'light', pin :1}
    ]
}
```
Bootstrap in __index.js__ :
```js
// Loading the Framework
var iothing = require('iothing')
// Getting the thing instance
var thing = iothing.get('thingInstance')

// You can manage you gpio by overriding the value function
thing.gpio({"pin":1}).value = function(value) {
    if (typeof value === 'undefined') {
        return "light is off"
    }
    return "light is on"
}

// Then access your gpios
console.log(thing.gpio({"pin":1}).value());

// You can attach actions to your thing
thing.action('turn-on-garden-lights', function() {
    console.log(thing.gpio({"pin":1}).value(1))
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
