var Dispatch = require('./lib/dispatch');
var Board = require('./lib/board');
var TestBoard = require('./lib/modules/test');

require('dotenv').load();

var dispatch = new Dispatch();
var board = new Board(dispatch);
var test = new TestBoard(dispatch);
