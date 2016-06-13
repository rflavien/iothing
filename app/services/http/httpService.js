var util = require("util")

var express = require('express')
var api = express()

var configurationService = require('../configuration/configurationService')
var http_config = new configurationService().get('http')

var messageService = require('../message/messageService')
var message_service = new messageService()

var thing_service = require('../thing/thingService')

module.exports = httpService

function httpService() {
    api.use(function (req, res, next) {
      message_service.publish('log', `${req.method} ${req.url}`)
      next();
    });

    api.get('/', function (req, res) {
      res.json(thing_service.things)
    })

    api.get('/:id', function (req, res) {
      res.json(thing_service.get(req.params.id))
    })

    api.get('/:id/gpios', function (req, res) {
      res.json(thing_service.get(req.params.id).gpios)
    })

    api.get('/:id/gpios/:pin', function (req, res) {
        try{
            res.json(thing_service.get(req.params.id).gpio({"pin":req.params.pin}))
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/:id/gpios/:pin/value', function (req, res) {
        try{
            res.json({"value":thing_service.get(req.params.id).gpio({"pin":req.params.pin}).value()})
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/:id/actions', function (req, res) {
        res.json(thing_service.get(req.params.id).actions)
    })

    api.post('/:id/actions/:slug', function (req, res) {
        try{
            thing_service.get(req.params.id).run(req.params.slug)
            res.json({"message": "done"})
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/:id/crons', function (req, res) {
        res.json(thing_service.get(req.params.id).crons)
    })

    api.post('/:id/crons/:slug', function (req, res) {
        try{
            if (req.query.do == 'stop') {
                res.json(thing_service.get(req.params.id).stop(req.params.slug))
            } else if (req.query.do == 'start') {
                res.json(thing_service.get(req.params.id).start(req.params.slug))
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
}
