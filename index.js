var Board = require('./lib/board');
var chalk = require('chalk');
var fork = require('child_process').fork;

var board = new Board();

var modules = [
    {
        name : 'porch',
        script : '/modules/porch.js'
    },
];

modules.forEach(function (el) {
    el.fork = fork(__dirname + el.script);

    el.fork.on('message', function(message) {
        console.log(chalk.cyan.bold(el.name), message);
    });

    el.fork.on('error', function (error) {
         console.log(chalk.red.bold(el.name), error);
    });

    el.fork.on('close', function (code) {
        console.log(chalk.yellow.bold(el.name), 'closed with code', code);
    });

    el.fork.on('exit', function (code) {
        console.log(chalk.yellow.bold(el.name), 'exited with code', code);
    });
});
