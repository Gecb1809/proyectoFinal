'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FacturaSchema = Schema ({
    usuario: String,
    productosComprados: Array,
    
})

module.exports = mongoose.model('Factura', FacturaSchema);