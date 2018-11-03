var mongoose	= require("mongoose");

var turnosSchema = new mongoose.Schema({
		fecha: String,
		horario: String,
		medico: String,
		usuario: {
			id:{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"	
			}
		}
});

module.exports = mongoose.model("Turno",turnosSchema);