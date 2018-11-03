var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
var Turno		= require("../models/turno");

var middlewareObj = {};

middlewareObj.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "error: cabecera de autorización"});
  }
  
  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  
  if(payload.exp <= moment().unix()) {
     return res
     	.status(401)
        .send({message: "Token expirado"});
  }
  req.user = payload;
  next();
  console.log(req.user);
};

middlewareObj.ensureOwnership = function(req, res, next){
  Turno.find({}, function(err, turnoEncontrado){
    if(err || !turnoEncontrado){
      return res.status(404).send({message: "No hay turnos disponibles"});
    }else{
      if(turnoEncontrado.usuario.id.equals(req.user.payload) || req.user.isAdmin){
        next();
      }else{
        return res.status(401).send({message: "Usuario no autorizado"});
      }
    }
  });
};

module.exports = middlewareObj;