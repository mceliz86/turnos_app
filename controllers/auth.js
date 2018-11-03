var express		= require("express");
var router		= express.Router();
var User		= require("../models/user");
//var Turno		= require("../models/turno");
var service 	= require("../services");


//Registro
router.post("/user", function(req, res){
	var newUser = new User({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		email: req.body.email,
		password: req.body.password
	});
	
	newUser.save(function(err){
		if(err){
			console.log(err);
		}
    	return res
    		.status(201)
        	.send({token: service.createToken(newUser)});
    });
});


//Login - lógica login
router.post("/session", function(req, res){
	var data = req.body;
	console.log(data.email);
	console.log(data.password);
	// User.findOne({email: data.email.toLowerCase()}, function(err, user) {
	User.findOne({email: data.email}, function(err, user) {
        if(err){
        	return res
        	.status(400)
        	.send ({message: "usuario o contraseña incorrectos"});
        }else{
        	if(!user){
        	return res
        	.status(422)
        	.send({message: "no existe usuario"});
        	}else{
        		if(user.password === data.password){
        		return res
        		.status(201)
            	.send({token: service.createToken(user)});
        		}else{
        			return res
        			.status(400)
        			.send({message: "contraseña incorrecta"});
        		}
        	}
        }
    });
});

module.exports = router;
