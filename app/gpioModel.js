module.exports = gpioModel;

function gpioModel(options)
{
    this.name = options.name;
    this.pin = options.pin;
};

gpioModel.prototype.value = function()
{
    throw `You must override the value function of the Gpio on pin ${this.pin}`;
};
