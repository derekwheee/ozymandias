var Board = require('./lib/board');
var chalk = require('chalk');
var spawn = require('child_process').spawn;

var board = new Board();

var modules = [
    {
        name : 'porch',
        script : 'modules/porch.js'
    },
];

modules.forEach(function (el) {
    el.spawn = spawn('node', [el.script]);

    el.spawn.stdout.on('data', function (data) {
        console.log(chalk.cyan.bold(el.name), data.toString());
    });

    el.spawn.stderr.on('data',function (data) {
         console.log(chalk.red.bold(el.name), data.toString());
    });

    el.spawn.on('close', function (data) {
        console.log(chalk.yellow.bold(el.name), 'exited with code', data.toString());
    });
});
