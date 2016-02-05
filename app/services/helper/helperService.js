var fs = require('fs')

module.exports = helperService

var helper_file_suffix = 'Helper.js'

function helperService() {
    this.helpers = []

    var files = fs.readdirSync(__dirname)

    files.filter((file) => {
        return file.substr(-helper_file_suffix.length) === helper_file_suffix
    }).forEach((file) => {
        var key = file.substr(0, (file.length - helper_file_suffix.length))
        var Helper = require(`${__dirname}/${file}`)
        this.helpers[key] = new Helper()
    })
}

helperService.prototype.get = function(helper) {
    if(helper in this.helpers) {
        return this.helpers[helper]
    } else {
        throw `Not Found`
    }
}
