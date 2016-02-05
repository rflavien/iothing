var helperService = require('../../helper/helperService')
var text_helper = new helperService().get('text')

module.exports = gpio;

function gpio(options)
{
    this.name = options.name
    this.slug = text_helper.slug(options.name)
    this.pin = options.pin
    this.status = 'Not Ready'
    Object.observe(this, () => {
        try {
            this.value()
            this.status = 'Ready'
        } catch (e) {
            this.status = 'Not Ready'
        }
    })
}

gpio.prototype.value = function()
{
    throw `You must override the value function of the Gpio on pin ${this.pin}`
}
