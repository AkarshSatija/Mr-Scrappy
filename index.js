'use strict';

var mongoose = require('mongoose');
var jsdom = require("jsdom");
var path = require('path');
var http = require("http");
require('./schema.js');

var url="https://www.kultureshop.in/papercut-a2-large.html/";

var config = require('./config');


//connecting mongoose

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



// calling mongoose schema and adding data
var Product = mongoose.model('Product');
var product_data = new Product();





//Crawling



    //INIT message
    console.log("Loading.... ", "URL: " + url);

    jsdom.env({
        url: url,
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function(errors, window) {
            if (errors) {
                console.log("Error: ", errors);
            } else {
                var $ = window.$;
               
                product_data.url = url;
                product_data.title = $("title").text();
                product_data.price = $(".productInfo .price:last").text();
                product_data.images = [];
                product_data.images.push($('.mainImgHolder > img').attr('src'));
                product_data.description=$(".productInfo .marB10").text();
                



                product_data.save(function(err) {
                    if (err) {
                        console.log("error");
                    } else {

                    	//server
                    	var server = http.createServer(function(req, res) {
                    	    res.writeHead(200, {"Content-Type": "text/json"});

                    	    Product.find().sort('-createdAt').exec(function(err, data) {
                    	        if (err) {
                    	            return res.status(400).send({
                    	                message: errorHandler.getErrorMessage(err)
                    	            });
                    	        } else {
                    	            res.write(JSON.stringify(data));
                    	            res.end();
                    	        }
                    	    });



                    	});

                    	server.listen(8000);
                    	console.log("Server is listening on port 8000");
                    }
                });
            }
        }
    });
