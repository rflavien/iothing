var assert = require('chai').assert;

describe('HTTP Service', function() {

    describe('GET /', function () {
        it('should return all things data as JSON', function () {

        });
    });

    describe('GET /:id', function () {
        it('should return the given thing data as JSON', function () {

        });

        it('should return an HTTP 404 if the given id doesn\'t match any thing', function () {

        });
    });

    describe('GET /:id/gpios', function () {
        it('should return the gpios data for the given thing as JSON', function () {

        });
    });

    describe('GET /:id/gpios/:pin', function () {
        it('should return the gpio data for the given pin as JSON', function () {

        });

        it('should return an HTTP 404 if the pin is not used', function () {

        });
    });

    describe('GET /:id/actions', function () {
        it('should return the actions data for the given thing as JSON', function () {

        });
    });

    describe('GET /:id/actions/:slug', function () {
        it('should return the action data for the given slug as JSON', function () {

        });
    });

    describe('GET /:id/crons', function () {
        it('should return the crons data for the given thing as JSON', function () {

        });
    });

    describe('GET /:id/crons/:slug', function () {
        it('should return the cron data for the given slug as JSON', function () {

        });
    });

    describe('POST /:id/actions/:slug', function () {
        it('should run the action', function () {

        });
    });

    describe('POST /:id/crons/:slug', function () {
        it('should start the cron if the do param is set to start', function () {

        });
        it('should stop the cron if the do param is set to stop', function () {

        });
        it('should return an HTTP 400 if the do param is not send', function () {

        });
    });
});
