var helperService = require('../../helper/helperService')
var text_helper = new helperService().get('text')

var Gpio = require('./gpio')

module.exports = thing

function thing(options) {
    this.name = options.name
    this.ip = options.ip

    this.gpios = []
    options.gpios.forEach((gpio) => {
        if (this.pin_busy(gpio.pin)) {
            throw `Pin ${gpio.pin} is busy, can't create a new gpio`
        } else if (this.gpio_slug_already_in_use(text_helper.slug(gpio.name))) {
            throw `A gpio named '${gpio.name}' already exist`
        } else {
            this.gpios.push(new Gpio(gpio))
        }
    })
}

thing.prototype.pin_busy = function(pin) {
    var busy = false
    this.gpios.forEach((gpio) => {
        if (gpio.pin == pin) {
            busy = true
        }
    })
    return busy
}

thing.prototype.gpio_slug_already_in_use = function(slug) {
    var exist = false
    this.gpios.forEach((gpio) => {
        if (gpio.slug == slug) {
            exist = true
        }
    })
    return exist
}

thing.prototype.gpio = function(options)
{
    if(!options) {
        throw `Missing option search in call`
    }

    var index = -1
    var i = 0
    var available_search_option = ['name', 'pin']
    var valide_search_option = false

    for (propertie in available_search_option) {
        if (options.hasOwnProperty(available_search_option[propertie])) {
            valide_search_option = available_search_option[propertie]
        }
    }

    if(!valide_search_option) {
        throw `Invalide search option`
    }

    while(i < this.gpios.length) {
        if(options[valide_search_option] == this.gpios[i][valide_search_option]) {
            index = i
            i = this.gpios.length
        }
        i++
    }

    if(index > -1) {
        return this.gpios[index]
    } else {
        throw `Not Found`
    }
}
