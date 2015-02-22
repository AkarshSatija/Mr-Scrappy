'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
    },
    url: {
        type: String,
        //default: '',
        trim: true,
        unique: 'URL already exists',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        default: '',
        trim: true,
    },

    price:{
        type: String,
        default: '',
        trim: true,
    },
    images:[{
        type: String,
        default: '',
        trim: true,
    }]
    ,other:{}

});

mongoose.model('Product', ProductSchema);
