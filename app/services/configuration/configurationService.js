var fs = require('fs')

var core_config_path = `${__dirname}/../../../config`
var app_config_path = `${process.cwd()}/config`

var all_core_config_files = fs.readdirSync(core_config_path)
var all_app_config_files = fs.readdirSync(app_config_path)

var to_load_from_app = intersect(all_core_config_files, all_app_config_files)
var to_load_from_core = all_core_config_files.filter((file) => {
    return to_load_from_app.indexOf(file) < 0
})

to_load_from_app.forEach((file, index, array) => {
    array[index] = `${app_config_path}/${file}`
})
to_load_from_core.forEach((file, index, array) => {
    array[index] = `${core_config_path}/${file}`
})

var config_files = to_load_from_core.concat(to_load_from_app)

module.exports = configurationService

function configurationService() {
    this.data = {}
    config_files.forEach((filepath) => {
        var filename = filepath.replace(/^.*[\\\/]/, '')
        var index = filename.substr(0, (filename.length - 3))
        this.data[index] = require(filepath)
    })
}

configurationService.prototype.get = function(key) {
    return this.data[key]
}

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t;
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    }).filter(function (e, i, c) {
        return c.indexOf(e) === i;
    })
}
