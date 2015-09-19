require('dotenv').load();

var socket = require('socket.io-client')('http://localhost:3000');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function Dispatch() {
    this.socketReady = false;

    socket.on('connect', function(){
        this.socketReady = true;
    }.bind(this));
}

Dispatch.prototype.send = function(name, data) {
    if (this.socketReady) {
        socket.emit('johnny', {
            name: name,
            data: data
        });
        return true;
    } else {
        return false;
    }
}

Dispatch.prototype.text = function(message) {
    twilio.messages.create({
        to: process.env.TWILIO_TO,
        from: process.env.TWILIO_FROM,
        body: message,
    }, function(err, message) {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = Dispatch;
