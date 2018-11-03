var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    isAdmin: user.isAdmin,
    iat: moment().unix(),
    exp: moment().add(60, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};