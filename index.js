'use strict';

var mongoose = require('mongoose');
var jsdom = require("jsdom");
var path = require('path');
require('./schema.js');

var urls = ["https://www.kultureshop.in/papercut-mens-art-tees.html/"];

var config = {
    db: {
        uri: 'mongodb://localhost/task_wooplr',
        options: {
            user: '',
            pass: ''
        }
    }
};


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


for (var index in urls) {
    var url = urls[index];
    console.log();


    var data = {};

    //INIT message
    console.log("URL: "+url, "Loading.... ");

    jsdom.env({
        url: url,
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function(errors, window) {
            if (errors) {
                console.log("Error: ",errors);
            } else {
                var $ = window.$;
                //console.log(window.$("html").html());
                data.url = url;
                data.title=window.$("title").text();





                // calling mongoose schema and adding data
                var Product = mongoose.model('Product');
                var product_data = new Product(data);
                product_data.save(function(err) {
                    if (err) {
                        console.log("error");
                    } else {
                        console.log("success");
                        process.exit(1);
                    }
                });

                //console.log("HN Links");
                /*$(".title:not(:last)").each(function() {
                  console.log(" -", $(this).text());
                });*/
            }

        }
    });


}






// // exit program
