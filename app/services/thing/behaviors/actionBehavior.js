var Decorator = require('./decorator')
var util = require("util")

var helperService = require('../../helper/helperService')
var text_helper = new helperService().get('text')

module.exports = actionBehavior

function actionBehavior(component)
{
    actionBehavior.super_.call(this, component)

    this.component.actions = []
    this.component.nb_actions = 0

    this.component.action = function(name, action) {
        this.actions.push({"name": name, "slug": text_helper.slug(name), "function": action})
        this.nb_actions += 1
    }

    this.component.run = function(slug)
    {
        var i = 0
        var not_done = true
        while (not_done || (i < this.actions.length - 1)) {
            if(this.actions[i].slug == slug) {
                this.actions[i].function.apply(this)
                not_done = false
            }
            i++
        }
        if(not_done) {
            throw `Not Found`
        }
    }
}
util.inherits(actionBehavior, Decorator)
