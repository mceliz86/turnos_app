var express		= require("express");
var router		= express.Router();
var Turno		= require("../models/turno");
var User		= require("../models/user");
var middleware	= require("../middleware/authentication");
var config		= require('../config');
var service 	= require("../services");
var moment		= require("moment");


//TURNOS del usuario logueado
router.get("/", middleware.ensureAuthenticated, function(req, res){
    User.findById(req.user.sub).populate("turnos").exec(function(err,foundUser){
    	if(err || !foundUser){
    		return res
    		.status(404)
    		.send({message: "no hay datos para devolver"});
    	}else{
    		return res
    		.status(200)
    		.json(foundUser.turnos);
    	}	
    });
});


//NUEVO turno
router.post("/", middleware.ensureAuthenticated, function(req, res) {
	User.findById(req.user.sub, function(err, user){
		if(err){
			return res
			.status(404)
			.send({message: "no se encontro usuario"});
		}else{
			var data	= req.body;
			var fecha	= data.fecha,
				horario = data.horario,
				medico	= data.medico;
			
			// var validDate = Date.parse(fecha);
			// if(isNaN(validDate)){
			// 	return res
			// 	.status(400)
			// 	.send({message: "Debe ingresar fecha válida en este formato: dia/mes/año"});
			// }
			
			var validDate = moment(fecha, "DD-MM-YYYY");
			if(!validDate.isValid()){
				return res
				.status(400)
				.send({message: "Debe ingresar fecha válida en este formato: dia/mes/año"});
			}
			
			var validTime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(horario);
        	if (!validTime) {
            	return res
            	.status(400)
            	.send({message: "Debe ingresar una hora válida"});
        	}
        	
        	if(medico.length>25){
        		return res
        		.status(400)
        		.send({message: "El nombre del medico no debe superar los 25 caracteres"});
        	}
			
			var newTurno = {fecha: fecha, horario: horario, medico: medico};
			Turno.create(newTurno, function(err, turno){
				if(err){
					return res
					.status(500)
					.send({message: "no se ha podido crear el turno"});
				}else{
					turno.id=req.user.sub;
					turno.save();
					user.turnos.push(turno);
					user.save();
					return res
					.status(201)
					.send({message:"turno agregado con exito!"});
				}	
			});
		}
	});  
});


//SHOW - mostrar info del turno
router.get("/:id", function(req, res) {
    User.findById(req.params.id, function(err, turno) {
    	if(err){
    		return res
    		.status(400)
    		.send({message: "no se encontró turno"});
    	}else{
    		return res
    		.status(200)
    		.json(turno);
    	}
    });
});


//UPDATE - lógica del formulario de edición del turno
router.put("/:id", function(req, res){
	var data = req.body;
	var fecha	= data.fecha,
		horario = data.horario,
		medico	= data.medico;

		var validDate = moment(fecha, "DD-MM-YYYY");
			if(!validDate.isValid()){
				return res
				.status(400)
				.send({message: "Debe ingresar fecha válida en este formato: dia/mes/año"});
			}
			
			var validTime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(horario);
        	if (!validTime) {
            	return res
            	.status(400)
            	.send({message: "Debe ingresar una hora válida"});
        	}
        	
        	if(medico.length>25){
        		return res
        		.status(400)
        		.send({message: "El nombre del medico no debe superar los 25 caracteres"});
        	}
        	
        	var object = {
			fecha: data.fecha,
			horario: data.horario,
			medico: data.medico
			};
		
	Turno.findByIdAndUpdate(req.params.id, object, function(err, turno){
		if(err){
			return res
			.status(400)
			.send({message: "no se encontro turno"});
		}else{
			return res
			.status(201)
			.json(turno);
		}	
	});
});


//DESTROY - eliminar un turno en particular
router.delete("/:id", function(req, res){
	Turno.findByIdAndRemove(req.params.id, function(err){
		if(err){
			return res
			.status(400)
			.send({message: "no se encontro turno"});	
		}else{
			return res
			.status(204)
			.send({message: "registro eliminado"});
		}
	});
});

module.exports = router;