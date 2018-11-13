var mongoose	= require("mongoose");

var turnosSchema = new mongoose.Schema({
		fecha: {type: Date, required: true},
		horario: {type: Date, required: true},
		medico: {type: String, max: 25, required: true},
		usuario: {
			id:{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"	
			}
		}
});

module.exports = mongoose.model("Turno",turnosSchema);