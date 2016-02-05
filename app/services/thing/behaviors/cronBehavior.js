var CronJob = require('cron').CronJob
var util = require("util")

var Decorator = require('./decorator')

var helperService = require('../../helper/helperService')
var text_helper = new helperService().get('text')

var configurationService = require('../../configuration/configurationService')
var app_config = new configurationService().get('app')

module.exports = cronBehavior

function cronBehavior(component)
{
    cronBehavior.super_.call(this, component)

    this.component.crons = []

    this.component.cron = function(name, frequency, action) {
        var job = new CronJob(frequency, action, null, true, app_config.timezone)
        this.crons.push({"name": name, "slug": text_helper.slug(name), "frequency": frequency, "status": "Started", "function": () => {return job}})
    }

    this.component.stop = function(slug) {
        return manage_cron_status(slug, this.crons, 'stop')
    }

    this.component.start = function(slug) {
        return manage_cron_status(slug, this.crons, 'start')
    }
}

function manage_cron_status(slug, crons, status) {
    var i = 0
    var not_done = true
    while (not_done && (i < crons.length)) {
        if(crons[i].slug == slug) {
            if (status == 'stop') {
                crons[i].function().stop()
                crons[i].status = "Stopped"
            } else if (status == 'start') {
                crons[i].function().start()
                crons[i].status = "Started"
            }
            not_done = false
        } else {
            i++
        }
    }

    if(not_done) {
        throw `Not Found`
    }

    return crons[i]
}

util.inherits(cronBehavior, Decorator)
