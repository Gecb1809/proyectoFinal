'use strict'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var User = require('../models/user');

function editUser(req, res) {
    var bodyInfo = req.body;
    var userId = req.params.id;

    if (req.params.id == 'admin') {
        /*delete bodyInfo.password;

        User.findByIdAndUpdate(userId, bodyInfo, { new: true }, (err, userActualizado) => {
            if (err) return res.status(500).send({ message: 'error en la peticion' })

            //if (!userActualizado) return res.status(404).send({ message: 'no se ha podido editar los datos del usuario' })

            return res.status(200).send({ user: userActualizado });
        })*/

        return res.status(500).send({ message: 'no se puede editar a un administrador' })

    } else {
        delete bodyInfo.password;

        User.findByIdAndUpdate(req.params.id, bodyInfo, { new: true }, (err, userActualizado) => {
            if (err) return res.status(500).send({ message: 'error en la peticion' })

            //if (!userActualizado) return res.status(404).send({ message: 'no se ha podido editar los datos del usuario' })

            return res.status(200).send({ user: userActualizado });
        })
    }


}

function createUser(req, res) {
    var bodyInfo = req.body;
    var user = new User();

    if (req.user.rol != 'admin') {
        return res.status(500).send({ message: 'Solo un administrador puede crear usuarios' })
    } else {
        if (bodyInfo.name && bodyInfo.email && bodyInfo.password) {
            user.name = bodyInfo.name;
            user.lastName = bodyInfo.lastName;
            user.email = bodyInfo.email;
            user.password = bodyInfo.password;
            //user.rol = 'cliente'
            user.rol = bodyInfo.rol

            //controlar duplicados

            User.find({
                $or: [
                    { name: user.name },
                    { email: user.email }
                ]
            }).exec((err, users) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' })

                if (users && users.length >= 1) {
                    return res.status(500).send({ message: 'El usuario ya existe' });
                } else {
                    bcrypt.hash(bodyInfo.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if (err) return res.status(500).send({ message: 'error al guardar el usuario' })

                            if (userStored) {
                                res.status(200).send({ user: userStored });
                            } else {
                                res.status(404).send({ message: 'no se ha registrado el usuario' });
                            }
                        })
                    })
                }
            })
        }
    }
}

function register(req, res) {
    var bodyInfo = req.body;
    var user = new User();

    if (bodyInfo.name && bodyInfo.email && bodyInfo.password) {
        user.name = bodyInfo.name;
        user.lastName = bodyInfo.lastName;
        user.email = bodyInfo.email;
        user.password = bodyInfo.password;
        user.rol = 'cliente'

        //controlar duplicados

        User.find({
            $or: [
                { name: user.name },
                { email: user.email }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' })

            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'El usuario ya existe' });
            } else {
                bcrypt.hash(bodyInfo.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'error al guardar el usuario' })

                        if (userStored) {
                            res.status(200).send({ user: userStored });
                        } else {
                            res.status(404).send({ message: 'no se ha registrado el usuario' });
                        }
                    })
                })
            }
        })
    }
}

function deleteUser(req, res) {
    var userId = req.params.id;

    if (req.user.rol == 'admin') {
        /*if (userId != req.user.sub) {
            User.findByIdAndDelete(userId, (err, usuarioBorrado) => {
                if (err) return res.status(404).send({ message: 'error en la peticion' })
                if (!usuarioBorrado) return res.status(500).send({ message: 'no se ha podido borrar usuario' })
                res.status(500).send({ message: 'usuario borrado' });
            })
        } else {
            res.status(500).send({ message: 'No se puede eliminar a uno mismo' });
        }*/
        return res.status(500).send({ message: 'no se pueden eliminar administradores' });
    } else {
        User.findByIdAndDelete(req.user.id, (err, usuarioBorrado) => {
            if (err) return res.status(404).send({ message: 'error en la peticion' })
            if (!usuarioBorrado) return res.status(500).send({ message: 'no se ha podido borrar usuario' })
            res.status(500).send({ message: 'usuario borrado' });
        })
    }

}

function findUsers(req, res) {
    User.find((err, datos) => {
        if (err) {
            return res.status(500).send({ message: 'no se encontro la base de datos' });
        }

        if (datos) {
            return res.status(200).send({ datos: datos });
        } else {
            return res.status(404).send({ message: 'no existen datos' });
        }
    })
}

function findUser(req, res) {
    var nameUser = req.params.name;
    User.find({ name: { $regex: nameUser, $options: 'i' } }).exec((err, usuario) => {
        if (err) return res.status(404).send({ message: 'error en la peticion' })
        if (!usuario) return res.status(500).send({ message: 'no se ha encontrado a ningun usuario' })
        res.status(200).send({ usuario });
    })
}



function login(req, res) {
    var bodyInfo = req.body;
    var email = bodyInfo.email;
    var password = bodyInfo.password;

    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (err) return res.status(404).send({ message: 'error al comparar la contraseña' });

                if (check) {
                    if (bodyInfo.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    } else {
                        user.password = undefined;
                        return res.status(200).send({ user })
                    }
                } else {
                    return res.status(404).send({ message: 'el usuario no se ha podido registrar' })
                }
            })
        } else {
            return res.status(404).send({ message: 'el usuario no se ha podido loggear' })
        }
    })
}


module.exports = {
    createUser,
    deleteUser,
    findUsers,
    editUser,
    register,
    findUser,
    login
}