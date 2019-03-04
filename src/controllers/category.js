'use strict'

var Category = require('../models/category');

function createCategory(req, res){
    var bodyInfo = req.body;
    var category = new Category();
    if(req.user.rol == 'admin'){
        if (bodyInfo.name) {
            category.name = bodyInfo.name;
            Category.findOne({name: bodyInfo.name}, (err, categoryFounded) => {
                if (err) return res.status(404).send({ message: 'error al crear categorias' });
    
                if (categoryFounded) {
                    return res.status(500).send({ message: 'Esta categoria ya existe' })
                } else {
                    category.save((err, categoryStored) => {
                        if (err) return res.status(404).send({ message: 'error al almacenar categoria' });
    
                        if (createCategory) {
                            return res.status(200).send({ category: categoryStored });
                        } else {
                            return res.status(500).send({ message: 'no se almaceno la categoria' });
                        }
                    });
                }
            })
        }else{
            return res.status(400).send({ message: 'porfavor proporcione todos los campos necesarios' })
        }
    } else {
        return res.status(500).send({ message: 'solo los admins pueden crear una categoria' })
    }
}

function deleteCategory(req, res){
    var bodyInfo = req.body;

    if (req.user.rol == 'admin'){
        Category.findByIdAndDelete((err, categoryDeleted) => {
            if (err) return res.status(404).send({ message: 'error al borrar categorias' });

            if (categoryDeleted) return res.status(200).send({ message:  'La categoria se ha eliminado exitosamente' })
        })
    } else {
        return res.status(500).send({ message: 'solo los administradores pueden borrar categorias' });
    }
}

function editCategory(req, res){
    var bodyInfo = req.body;
    var category = new Category();

    if (req.user.rol == 'admin'){
        if (bodyInfo.name && bodyInfo.idCategoriaACambiar){
            Category.findByIdAndUpdate(bodyInfo.idCategoriaACambiar, (err, categoryUpdated) => {
                if (err) return res.status(404).send({ message: 'error al editar categoria' });

                if (categoryUpdated) return res.status(200).send({ category: categoryUpdated });
            });
        } else {
            return res.status(200).send({ message: 'porfavor, envie todos los datos necesarios' })
        }
    } else {
        return res.status(500).send({ message: 'solo los administradores pueden editar categorias' });
    }
}

function readCategorys(req, res){
    var bodyInfo = req.body;
    Category.find((err, categoryReaded) => {
        if (err) return res.status(404).send({ message: 'error al leer categorias' })

        if (categoryReaded) return res.status(200).send({ categoryReaded })
    });
}

function readCategory(req, res){
    var bodyInfo = req.body;
    //var nameCategory = bodyInfo.name;
    Category.findById(bodyInfo.id, (err, categoryReaded) => {
        if (err) return res.status(404).send({ message: 'error al leer categoria' })

        if (categoryReaded) return res.status(200).send({ categoryReaded })
    });
    
    /*Category.find({ name: { $regex: nameCategory, $options: 'i' } }, (err, categoryReaded) => {
        if (err) return res.status(404).send({ message: 'error al leer categoria' })

        if (categoryReaded) return res.status(200).send({ categoryReaded })
    });*/
    
}


module.exports = {
    createCategory,
    deleteCategory,
    editCategory,
    readCategorys,
    readCategory
}