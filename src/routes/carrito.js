'use strict'

var express = require('express');
var CarritoController = require('../controllers/carrito')
var md_auth = require('../middleware/autenticated');

var api = express.Router();

api.post('/agregarAlCarrito', md_auth.ensureAuth, CarritoController.addCarrito);
api.get('/verCarritos', md_auth.ensureAuth, CarritoController.verCarritos);

module.exports = api;


//addCarrito