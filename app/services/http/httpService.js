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

    /**
     * Middlewares
     */

    // Allow cross domain requests
    api.use(function(req, res, next)
    {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")
        next()
    })

    // Access log
    api.use(function (req, res, next) {
      message_service.publish('log', `${req.method} ${req.url}`)
      next()
    });

    // Get the thing
    api.param('id', function(req, res, next, id) {
        try {
            req.thing = thing_service.get(req.params.id)
        }
        catch(err) {
            res.status(404).end()
        }
        next();
    });

    /**
     * Routes
     */

    // Return all data
    api.get('/', function (req, res) {
      res.json(thing_service.things)
    })

    // Return the given thing data
    api.get('/:id', function (req, res) {
      res.json(req.thing)
    })

    // Return the given thing GPIOs data
    api.get('/:id/gpios', function (req, res) {
      res.json(thing_service.get(req.params.id).gpios)
    })

    // Return the thing GPIO data for the given pin
    api.get('/:id/gpios/:pin', function (req, res) {
        try{
            res.json(req.thing.gpio({"pin":req.params.pin}))
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    // Return the thing GPIO value data for the given pin
    api.get('/:id/gpios/:pin/value', function (req, res) {
        try{
            res.json({"value":req.thing.gpio({"pin":req.params.pin}).value()})
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/:id/actions', function (req, res) {
        res.json(req.thing.actions)
    })

    api.post('/:id/actions/:slug', function (req, res) {
        try{
            req.thing.run(req.params.slug)
            res.json({"message": "done"})
        } catch (e) {
            if (e == 'Not Found') {
                res.status(404).send(e)
            }
            res.status(500).send('Internal Server Error')
        }
    })

    api.get('/:id/crons', function (req, res) {
        res.json(req.thing.crons)
    })

    api.post('/:id/crons/:slug', function (req, res) {
        try{
            if (req.query.do == 'stop') {
                res.json(req.thing.stop(req.params.slug))
            } else if (req.query.do == 'start') {
                res.json(req.thing.start(req.params.slug))
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
