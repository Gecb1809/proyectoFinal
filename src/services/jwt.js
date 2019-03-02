'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '1234';


exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix
    };

    return jwt.encode(payload, secret);

}