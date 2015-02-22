'use strict'


var mongoose = require('mongoose');

var path = require('path');
var http = require("http");
require('./schema.js');

var config = require('./config');
console.log(config);


var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }
});

mongoose.connection.on('error', function(err) {
    console.error(chalk.red('MongoDB connection error: ' + err));
    process.exit(-1);
});




/*
var server = http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/json"});
  res.json(config);
  
});
 
server.listen(8000);
console.log("Server is listening");*/

