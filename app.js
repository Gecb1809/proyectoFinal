'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas


//middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//exportar
module.exports = app;