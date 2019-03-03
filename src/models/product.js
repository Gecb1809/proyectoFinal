'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema ({
    name: String,
    category: {
        type: String,
        default: 'Uncategorized'
    },
    stock: Number,

});

module.exports = mongoose.model('Product', ProductSchema);

