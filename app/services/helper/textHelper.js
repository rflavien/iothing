var slug = require('slug')

slug.defaults.mode = 'rfc3986'
slug.defaults.modes['rfc3986'] = {
    replacement: '-',
    symbols: true,
    remove: null,
    lower: true,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
}

module.exports = textHelper

function textHelper() {

}

textHelper.prototype.slug = function(string) {
    return slug(string)
}
