'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas

var user_routes = require('./src/routes/user');
var product_routes = require('./src/routes/product');
var category_routes = require('./src/routes/category');
var carrito_routes = require('./src/routes/carrito');

//middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// cors

// rutas
app.use('/api', user_routes);
app.use('/api', product_routes);
app.use('/api', category_routes);
app.use('/api', carrito_routes);

//exportar
module.exports = app;