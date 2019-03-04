'use strict'

var express = require('express');
var ProductController = require('../controllers/product');
var md_auth = require('../middleware/autenticated');

var api = express.Router();

api.post('/crearProducto', md_auth.ensureAuth, ProductController.createProduct);
api.put('/editarProducto/:id', md_auth.ensureAuth, ProductController.editProduct);
api.delete('/borrarProducto/:id', md_auth.ensureAuth, ProductController.deleteProduct);
api.get('/verProductos', md_auth.ensureAuth, ProductController.readProducts);
api.get('/verProducto:id', md_auth.ensureAuth, ProductController.readProduct);

module.exports = api;