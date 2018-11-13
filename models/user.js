var mongoose = require("mongoose");

var usersSchema = new mongoose.Schema({
		nombre: {type: String, max: 25, required: true},
		apellido: {type: String, max: 25, required: true},
		email: {type: String, unique: true, required: true},
		password: {type: String, required: true},
		isAdmin: {type: Boolean, default: false},
		turnos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Turno"
		}
		]
});

module.exports = mongoose.model("User",usersSchema);