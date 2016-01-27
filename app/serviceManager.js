var fs = require('fs');
var config = false;
try {
    fs.accessSync(`${process.cwd()}/config/app.js`, fs.F_OK);
    console.log(`${process.cwd()}/config/app`);
    config = require(`${process.cwd()}/config/app`);
} catch (e) {
    config = require(`${__dirname}/../config/app`);
}

function serviceManager()
{
    this.services = [];

    this.services['thingInstance'] = require(`${__dirname}/thingInstance`);
    var thing = this.get('thingInstance');

    config.services.forEach((service) => {
        try {
            fs.accessSync(`${__dirname}/services/${service}.js`, fs.F_OK);
            this.services[service] = require(`${__dirname}/services/${service}`);
            this.get(service)(thing);
        } catch (e) {
            console.log(`Can't load service with name '${service}', file not accessible.`);
            process.exit(1);
        }
    });
}

serviceManager.instance = null;

serviceManager.prototype.get = function(service_name)
{
    if (!(service_name in this.services)) {
        throw `No service with name '${service_name}' found.`;
    }
    return this.services[service_name];
}

serviceManager.getInstance = function(){
    if(this.instance === null){
        this.instance = new serviceManager();
    }
    return this.instance;
}

module.exports = serviceManager.getInstance();
