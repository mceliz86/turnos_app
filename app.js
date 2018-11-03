var express			= require("express"),
	app				= express(),
	cors			= require("cors"),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),

	authRoutes		= require("./controllers/auth"),
	turnosRoutes	= require("./controllers/turnos");
	
	//middleware = require('./middleware/authentication');
	//var	seedDB = require("./seeds");
	
//APP CONFIG	
//mongoose.connect("mongodb://localhost:27017/turnos_app", { useNewUrlParser: true });
//mongoose.connect("mongodb://matias:password1@ds151293.mlab.com:51293/turnos_app", { useNewUrlParser: true });
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//seedDB();

// app.use(function(req, res, next){
// 	res.locals.currentUser = req.user;
// 	next();
// });

app.use("/", authRoutes);
app.use("/turnos", turnosRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Servidor OK");
});