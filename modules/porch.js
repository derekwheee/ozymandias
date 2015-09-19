var five = require("johnny-five");
var Particle = require("particle-io");
var Dispatch = require('../lib/dispatch');

require('dotenv').load();

var dispatch = new Dispatch();
var params = {
    repl: false,
    debug: false,
    io: new Particle({
        token: process.env.PORCH_TOKEN,
        deviceId: process.env.PORCH_DEVICE_ID
    })
};
var board = new five.Board(params);

board.on("ready", function() {

    console.log('ready');

    var button = new five.Button('D5');

    button.on('up', function () {

        dispatch.send('doorbell');
        dispatch.text('Someone is at the door.');

    };

});
