module.exports = publisherBehavior;

function publisherBehavior(thing)
{
    thing.send = function (message) {
        console.log(message);
    };
};
