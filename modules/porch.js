#!/bin/env node

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

    process.send('ready');

    var button = new five.Button('D5');
    var doorbell = {
        lastText: null
    };

    button.on('up', function () {

        dispatch.send('porch', 'doorbell');

        if (doorbell.lastText < (Date.now() - 60000)) {
            dispatch.text('Someone is at the door.', function (err, message) {
                if (!err) {
                    doorbell.lastText = Date.now();
                }
            });
        }

    });

});
