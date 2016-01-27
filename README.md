# iothing
A Node Framework for IoT

[![iothing Logo](http://rflavien.github.io/images/iothing-logo.svg | height=200)](http://rflavien.github.io/iothing)

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
