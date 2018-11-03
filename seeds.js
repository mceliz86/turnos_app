var mongoose = require("mongoose");
var Turno = require("./models/turno");
var User = require("./models/user");

// var turnos=[
// 		{
// 			fecha: "05-10-2018",
// 			horario: "13:30",
// 			medico: "Medico 1",
// 			usuario: {
// 				id:	"5bca682ff60d211bae9f1dcd"
// 			}
// 		},
// 		{
// 			fecha: "06-10-2018",
// 			horario: "14:30",
// 			medico: "Medico 2",
// 			usuario: {
// 				id:	"5bca682ff60d211bae9f1dcd"
// 			}
// 		},
// 		{
// 			fecha: "07-10-2018",
// 			horario: "15:30",
// 			medico: "Medico 3",
// 			usuario: {
// 				id:	"5bca682ff60d211bae9f1dcf"
// 			}
// 		},
// 		{
// 			fecha: "08-10-2018",
// 			horario: "16:30",
// 			medico: "Medico 4",
// 			usuario: {
// 				id:	"5bca682ff60d211bae9f1dce"
// 			}
// 		},
// 		{
// 			fecha: "09-10-2018",
// 			horario: "17:30",
// 			medico: "Medico 5",
// 			usuario: {
// 				id:	"5bca682ff60d211bae9f1dce"
// 			}
// 		}
// 	];
	
 var usuarios=[
 		{
 			nombre: "usuario1",
 			apellido: "apellido1",
 			email: "up1@mail.com",
 			password: "password",
			turnos: [
			]
 		},
 		{
 			nombre: "usuario2",
 			apellido: "apellido2",
 			email: "up2@mail.com",
 			password: "password",
 			turnos: [
			]
 		},
 		{
 			nombre: "usuario3",
 			apellido: "apellido3",
 			email: "up3@mail.com",
 			password: "password",
 			turnos: [
			]
 		},
		{
 			nombre: "usuario4",
 			apellido: "apellido4",
 			email: "up4@mail.com",
 			password: "password",
 			isAdmin: true
 		}
 	];

 function seedDB(){
	// turnos.forEach(function(seed){
	// 	Turno.create(seed, function(err, turno){
	// 		if(err){
	// 			console.log(err);
	// 		}else{
	// 			console.log("turno agregado");
	// 		}
	// 	});
	// });
	
	usuarios.forEach(function(seed){
		User.create(seed, function(err, user){
			if(err){
				console.log(err);
			}else{
				console.log("usuario agregado");
			}
		});
	});
}	

module.exports = seedDB;