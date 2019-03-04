'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/autenticated');
var api = express.Router();

//api.get('/pruebas', AlumnoController.prueba);
api.post('/crearUsuario', md_auth.ensureAuth, UserController.createUser);
api.post('/login', UserController.login);
api.post('/registrar', UserController.register);

api.get('/verUsuario/:name', UserController.findUser);
api.get('/verUsuarios', UserController.findUsers);

api.put('/editarUsuario/:id', md_auth.ensureAuth, UserController.editUser);

api.delete('/borrarUsuario/:id', md_auth.ensureAuth, UserController.deleteUser);

module.exports = api;