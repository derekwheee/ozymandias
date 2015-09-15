var five = require("johnny-five");
var Particle = require("particle-io");

function TestBoard (dispatch, opts) {

    var params = {
        repl: false,
        debug: false,
        io: new Particle({
            token: process.env.TEST_TOKEN,
            deviceId: process.env.TEST_DEVICE_ID
        })
    };
    var board = new five.Board(params);

    board.on("ready", function() {
        var led = new five.Led("D7");
        led.blink();
    });

}

module.exports = TestBoard;
