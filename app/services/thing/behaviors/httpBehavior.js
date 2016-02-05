var Decorator = require('./decorator')
var util = require("util")

var express = require('express')
var api = express()

var configurationService = require('../../configuration/configurationService')
var http_config = new configurationService().get('http')

var messageService = require('../../message/messageService')
var message_service = new messageService()

module.exports = httpBehavior;

function httpBehavior(component)
{
    httpBehavior.super_.call(this, component)

    api.use(function (req, res, next) {
      message_service.publish('log', `${req.method} ${req.url}`)
      next();
    });

    api.get('/', function (req, res) {
      res.json(this.component)
    })

    api.get('/gpios', function (req, res) {
      res.json(this.component.gpios)
    })

    api.get('/gpios/:pin', function (req, res) {
        try{
            res.json(this.component.gpio({"pin":req.params.pin}))
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/gpios/:pin/value', function (req, res) {
        try{
            res.json({"value":this.component.gpio({"pin":req.params.pin}).value()})
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/actions', function (req, res) {
        res.json(this.component.actions)
    })

    api.post('/actions/:slug', function (req, res) {
        try{
            this.component.run(req.params.slug)
            res.json({"message": "done"})
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/crons', function (req, res) {
        res.json(this.component.crons)
    })

    api.post('/crons/:slug', function (req, res) {
        try{
            if (req.query.do == 'stop') {
                res.json(this.component.stop(req.params.slug))
            } else if (req.query.do == 'start') {
                res.json(this.component.start(req.params.slug))
            } else {
                res.status(400).send('Bad Request')
            }
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    message_service.publish('log', `API listening on port ${http_config.port}`)
    api.listen(http_config.port)
};
util.inherits(httpBehavior, Decorator)
