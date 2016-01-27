var CronJob = require('cron').CronJob;
var fs = require('fs');
var config = false;
try {
    fs.accessSync(`${process.cwd()}/config/app.js`, fs.F_OK);
    config = require(`${process.cwd()}/config/app`);
} catch (e) {
    config = require(`${__dirname}/../../config/app`);
}

module.exports = cronBehavior;

function cronBehavior(thing)
{
    thing.crons = [];

    thing.cron = function(name, frequency, action) {
        this.crons[name] = new CronJob(frequency, action, null, true, config.timezone);
    };
};
