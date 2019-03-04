'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarritoSchema = Schema ({
    usuario: String,
    productoAComprar: String,
    cantidadAComprar: Number
});

module.exports = mongoose.model('Carrito', CarritoSchema);