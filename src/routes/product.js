'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();

api.post('/crearProductos', ProductController.createProduct);

module.exports = api;