var express = require('express');
var router = express.Router();
var ultimoPartido, proximoPartido, proximosPartidos, partidosDirecto;

function logged_function(req, res, next) {
	db.query("SELECT * FROM partidos_completo_jugadores WHERE id_user= ? and estado=0 ORDER BY fecha ASC LIMIT 1; SELECT * FROM partidos_completo_jugadores WHERE id_user=? and estado=2 ORDER BY fecha DESC LIMIT 1;", [[req.session.id_user.toString()], [req.session.id_user.toString()]], (err, data, campos) => {
		if(err) {
			console.log(err);
			req.session.error = "<strong>¡Error fatal con la base de datos, se ha cerrado la sesión!</strong> CODE: "+err.code;
			req.session.logged = false;
			delete req.session.id_user;
			delete req.session.nombre;
			delete req.session.email;
			delete req.session.tipo;
	        res.redirect('/');
		}
		proximoPartido = data[0][0];
		ultimoPartido = data[1][0];
		next();
	});
}

function general_query(req, res, next) {
	db.query("SELECT * FROM partidos_completo WHERE estado=0 ORDER BY fecha ASC LIMIT 5;SELECT * FROM partidos_completo WHERE estado=1 LIMIT 5;", [], (err, data, campos) => {
		if(err) {
			proximosPartidos = [];
			partidosDirecto = [];
			req.session.error = "<strong>¡Error fatal con la base de datos, no se han podido obtener todos los partidos!</strong> CODE: "+err.code;
		} else {
			proximosPartidos = data[0];
			partidosDirecto = data[1];
		}
		next();
	})
}

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.logged) next();
	else next('route');
}, logged_function
);

router.get('/', general_query);
router.get('/', function(req, res, next) {
	if(req.session.logged) res.render('home', { nombre: req.session.nombre, partidosProximos: proximosPartidos, partidosDirecto: partidosDirecto, userProximoPartido: proximoPartido, userUltimoPartido: ultimoPartido });
	else res.render('home', {nombre: null, partidosProximos: proximosPartidos, partidosDirecto: partidosDirecto});
});

router.get('/logout', function(req, res){
	if(req.session.logged){
		req.session.logged = false;
	  	delete req.session.id_user;
	  	delete req.session.nombre;
	  	delete req.session.email;
	  	delete req.session.tipo;
	  	req.session.success = "Sesión cerrada correctamente";
	  	res.redirect("/");
	  } else {
	  	req.session.danger = "No puedes cerrar sesión sin haber iniciado sesión previamente";
	  	res.redirect("/login");
	  }
});



module.exports = router;
