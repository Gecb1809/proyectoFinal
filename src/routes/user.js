'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/autenticated');
var api = express.Router();

//api.get('/pruebas', AlumnoController.prueba);
api.post('/createUser', md_auth.ensureAuth, UserController.createUser);
api.post('/login', UserController.login);
api.post('/register', UserController.register);

api.get('/findUser/:name', UserController.findUser);
api.get('/findUsers', UserController.findUsers);

api.put('/editUser/:id', md_auth.ensureAuth, UserController.editUser);

api.delete('/deleteUser/:id', md_auth.ensureAuth, UserController.deleteUser);

module.exports = api;