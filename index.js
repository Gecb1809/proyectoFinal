'use strict'

var mongoose = require('mongoose');
var app = require('./app');

//conexion database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ControlVentas', { useNewUrlParser: true })
    .then(() => {
        console.log("la coneccion a la base de datos ControlTienda se ha realizado correctamente")

        app.set('port', process.env.PORT || 3000)
            //crear servidor
        app.listen(app.get('port'), () => {
            console.log(`servidor corriendo en '${app.get('port')}'`)
        })
    }).catch(err => console.log(err));