var socket = require('socket.io-client')('http://localhost:3000');

function Dispatch() {
    this.socketReady = false;

    socket.on('connect', function(){
        this.socketReady = true;
    }.bind(this));
}

Dispatch.prototype.Send = function(name, data) {
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

module.exports = Dispatch;
