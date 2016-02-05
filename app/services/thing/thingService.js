var fs = require('fs')

var configurationService = require('../configuration/configurationService')
var things_config = new configurationService().get('thing')

var helperService = require('../helper/helperService')
var text_helper = new helperService().get('text')

var Thing = require('./models/thing')

var behavior_file_suffix = 'Behavior.js'
var behavior_folder = `${__dirname}/behaviors`

module.exports = thingService

function thingService() {
    this.things = []

    things_config.forEach((thing) => {
        this.things[text_helper.slug(thing.name)] = new Thing(thing)

        var files = fs.readdirSync(behavior_folder)

        files.filter((file) => {
            return file.substr(-behavior_file_suffix.length) === behavior_file_suffix
        }).forEach((file) => {
            var Behavior = require(`${behavior_folder}/${file}`)
            Behavior(this.things[text_helper.slug(thing.name)])
        })

    })
}

thingService.prototype.get = function(thing) {
    if(thing in this.things) {
        return this.things[thing]
    } else {
        throw `Not Found`
    }
}
