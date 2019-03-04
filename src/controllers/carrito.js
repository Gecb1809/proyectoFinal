'use strict'

var jwt = require('../services/jwt');
var Carrito = require('../models/carrito');

function addCarrito(req, res){
    var bodyInfo = req.body;
    var carrito = new Carrito;
    if(bodyInfo.productoAComprar && bodyInfo.cantidadAComprar){
        Carrito.findOne({productoAComprar: bodyInfo.productoAComprar}, (err, dato) => {
            if (err) return res.status(404).send({ message: 'error al encontrar carrito' });

            if (dato) {
                ///////////////////
                bodyInfo.cantidadAComprar = carrito.cantidadAComprar + bodyInfo.cantidadAComprar;
                Carrito.findOneAndUpdate({productoAComprar: bodyInfo.productoAComprar}, bodyInfo, (err, carritoStored) => {
                    if (err) return res.status(404).send({ message: 'error al guardar carrito' })
    
                    if (carritoStored) return res.status(200).send({ carritoStored });
                })
            } else {
                carrito.usuario = req.user.id;
                carrito.productoAComprar = bodyInfo.productoAComprar;
                carrito.cantidadAComprar = bodyInfo.cantidadAComprar;

                carrito.save((err, carritoStored) => {
                    if (err) return res.status(404).send({ message: 'error al guardar carrito' })
    
                    if (carritoStored) return res.status(200).send({ carritoStored });
                })
            } 
        })
        
    } else {
        return res.status(500).send({ message: 'porfavor, envie todos los datos necesarios' })
    }
    /* usuario: String,
    productoAComprar: String,
    cantidadAComprar: Number */
}

function verCarritos(req, res){
    Carrito.find((err, datos) => {
        if (err) return res.status(404).send({ message: 'error a; buscar carritos' });

        if (datos) return res.status(200).send({ datos });
    })
}

module.exports = {
    addCarrito,
    verCarritos
}