var mongoose = require("mongoose");

var usersSchema = new mongoose.Schema({
		nombre: String,
		apellido: String,
		email: String,
		password: String,
		isAdmin: {type: Boolean, default: false},
		turnos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Turno"
		}
		]
});

module.exports = mongoose.model("User",usersSchema);