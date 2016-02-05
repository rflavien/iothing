var fs = require('fs')

module.exports = serviceManager

var service_file_suffix = 'Service.js'
var service_path = `${__dirname}/services`

function serviceManager() {
    this.services = []

    var services = fs.readdirSync(`${__dirname}/services`)

    services.forEach((service) => {
        var Service = require(`${service_path}/${service}/${service}${service_file_suffix}`)
        this.services[service] = new Service()
    })
}

serviceManager.instance = null

serviceManager.prototype.get = function(service) {
    if(service in this.services) {
        return this.services[service]
    } else {
        throw `Not Found`
    }
}

serviceManager.getInstance = function(){
    if(this.instance === null){
        this.instance = new serviceManager()
    }
    return this.instance
}

module.exports = serviceManager.getInstance()
