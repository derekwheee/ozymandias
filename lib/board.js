var five = require('johnny-five');

function Board (dispatch, opts) {

    var isArduino = process.argv[2] === 'arduino';
    var params = {
        repl: false,
        debug: false
    };

    if (isArduino) {
        board = new five.Board(params);
    } else {
        var raspi = require('raspi-io');
        params.io = new raspi();
        board = new five.Board(params);
    }

    board.on('ready', function () {

        // This is where host IO stuff goes

    });
}

module.exports = Board;
