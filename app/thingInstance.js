var fs = require('fs');
var thing_config = false;
try {
    fs.accessSync(`${process.cwd()}/config/thing.js`, fs.F_OK);
    console.log(`${process.cwd()}/config/thing`);
    thing_config = require(`${process.cwd()}/config/thing`);
} catch (e) {
    thing_config = require(`${__dirname}/../config/thing`);
}
var Gpio = require(`${__dirname}/gpioModel`);

function thingInstance()
{
    this.name = thing_config.name;
    this.ip = thing_config.ip;

    this.gpios = [];
    thing_config.gpios.forEach((gpio) => {
        this.gpios.push(new Gpio(gpio));
    });

};

thingInstance.instance = null;

thingInstance.getInstance = function(){
    if(this.instance === null){
        this.instance = new thingInstance();
    }
    return this.instance;
}

thingInstance.prototype.gpio = function(options)
{
    if(!options) {
        throw `Missing option search in call`;
    }

    var index = -1;
    var i = 0;
    var available_search_option = ['name', 'pin'];
    var valide_search_option = false;

    for (propertie in available_search_option) {
        if (options.hasOwnProperty(available_search_option[propertie])) {
            valide_search_option = available_search_option[propertie];
        }
    }

    if(!valide_search_option) {
        throw `Invalide search option`;
    }

    while(i < this.gpios.length) {
        if(options[valide_search_option] == this.gpios[i][valide_search_option]) {
            index = i;
            i = this.gpios.length;
        }
        i++;
    }

    if(index > -1) {
        return this.gpios[index];
    } else {
        throw `Gpio not found`;
    }
};

module.exports = thingInstance.getInstance();
