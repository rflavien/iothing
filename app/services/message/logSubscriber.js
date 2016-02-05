module.exports = logSubscriber

function logSubscriber() {

}

logSubscriber.prototype.send = function(message) {
    console.log(`${new Date().toISOString()} [MESSAGE= ${message}]`)
}
