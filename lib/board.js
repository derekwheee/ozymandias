var five = require('johnny-five');
var socket = require('socket.io-client')('http://localhost:3000');
var boardReady = false;
var socketReady = false;

socket.on('connect', function(){
    socketReady = true;
});

function Board (opts) {

    var isArduino = process.argv[2] === 'arduino';
    var params = {
        repl: false,
        debug: false
    };

    boardReady = true;

    if (isArduino) {
        board = new five.Board(params);
    } else {
        var raspi = require('raspi-io');
        params.io = new raspi();
        board = new five.Board(params);
    }

    board.on('ready', function () {

        var proximity = new five.Proximity({
            controller: 'GP2Y0A41SK0F',
            pin: 'A0',
            freq: 2000
        });

        proximity.on('data', function() {

            sendData('proximity', this.cm);

        });

    });
}

function sendData(name, data) {
    if (socketReady) {
        socket.emit('johnny', {
            name: 'proximity',
            data: this.cm
        });
        return true;
    } else {
        return false;
    }
}

module.exports = Board;
