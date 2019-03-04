'use strict'

var jwt = require('../services/jwt');
var Product = require('../models/product');
var Category = require('../models/category');

function createProduct (req, res){
    var bodyInfo = req.body;
    var product = new Product();
    var verificarCategoria = boolean;
    if (req.user.rol == 'admin'){
        Category.find({ name: bodyInfo.category }, (err, dato) => {
            if (err) return res.status(404).send({ message: 'error al verificar la categoria' });

            if (dato && dato.length >= 1) return verificarCategoria = true;
        });
        if (verificarCategoria == true){
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
                return res.status(200).send({ message: 'porfavor envie todos los campos necesarios' })
            }
        } else {
            return res.status(500).send({ message: 'Esa categoria no existe' });
        }
        
    } else {
        return res.status(200).send({message: 'solo un admin puede crear productos'});
    }
}

function editProcuct(req, res){
    var bodyInfo = req.body;
    var product = new Product();
    if (req.user.rol == 'admin') {
        Product.findByIdAndUpdate(bodyInfo.id, (err, productUpdated) => {
            if (err) return res.status(404).send({ message: 'se ha producido un error al editar producto' });

            if (productUpdated) return res.status(200).send({ product: productUpdated });
        })
    } else {
        return res.status(500).send({ message: 'solo un administrador puede editar productos' });
    }
}

function deleteProduct(req, res){
    var bodyInfo = req.body;
    if (req.user.rol == 'admin'){
        Product.findByIdAndDelete( bodyInfo.id, (err, productRemoved) => {
            if (err) return res.status(404).send({ message: 'error al borrar producto' })

            if (productRemoved) return res.status(200).send({ message: 'Se ha eliminado el producto satisfactoriamente' })
        });
    }
}

function readProducts(req, res){
    var product = new Product();
    Product.find((err, datos) => {
        if (err) return res.status(404).send({ message: 'ocurrio un error al ver productos' });

        if (datos) {
            return res.status(200).send({ product: datos });
        }
    });
}

function readProduct(req, res){
    var productName = req.body.name;
    Product.findOne({ name: { $regex: productName, $options: 'i' } }, (err, dato) => {
        if (err) return res.status(404).send({ message: 'ocurrio un error al ver producto' });

        if (dato) return res.status(200).send({ dato })
    });
}

function findProductByCategory(req, res) {
    var bodyInfo = req.body;

    if (bodyInfo.category){
        Product.find({ category: bodyInfo.category }, (err, datos) => {
            if (err) return res.status(404).send({ message: 'ha ocurrido un error al buscar productos por categoria' });

            if (datos) return res.status(200).send({ datos });
        })
    }
    
}

module.exports = {
    createProduct,
    editProcuct,
    deleteProduct,
    readProducts,
    readProduct,
    findProductByCategory
}
