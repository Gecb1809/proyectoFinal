'use strict'

var express = require('express');
var CategoryController = require('../controllers/category');
var md_auth = require('../middleware/autenticated');

var api = express.Router();

api.post('/crearCategoria', md_auth.ensureAuth, CategoryController.createCategory);
api.delete('/borrarCategoria', md_auth.ensureAuth, CategoryController.deleteCategory);
api.put('/editarCategoria', md_auth.ensureAuth, CategoryController.editCategory);
api.get('/verCategorias', md_auth.ensureAuth, CategoryController.readCategorys);
api.get('/verCategoria', md_auth.ensureAuth, CategoryController.readCategory);

module.exports = api;