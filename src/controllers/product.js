'use strict'

var jwt = require('../services/jwt');
var Product = require('../models/product');

function createProduct (req, res){
    var bodyInfo = req.body;
    var product = new Product();
    if (req.user.id == 'admin'){
        if (bodyInfo.name && bodyInfo.stock){
            product.name = bodyInfo.name;
            product.category = bodyInfo.category;
            product.stock = bodyInfo.stock;

            Product.find({name: product.name}, (err, dato) => {
                if (err) return res.status(500).send({message: 'error al crear producto'});

                if (dato && dato.length >= 1){
                    return res.status(500).send({message: 'este producto ya existe'});
                } else {
                    product.save((err, productStored) => {
                        if (err) return res.status(500).send({ message: 'error al guardar producto'});

                        if (productStored) {
                            return res.status(200).send({ product: productStored });
                        } else {
                            return res.status(404).send({ message: 'no se ha registrado el producto' });
                        }
                    })
                }
            })
        } else {
            return res.status(200).send({ message: 'envie todos los campos necesarios' })
        }
    } else {
        return res.status(200).send({message: 'solo un admin puede crear productos'});
    }
}

module.exports = {
    createProduct
}
