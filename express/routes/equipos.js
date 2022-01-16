var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.logged) {
		db.query("SELECT nombre FROM equipos;", [1], (err, data, campos) => {
            if(err) {
                req.session.error = "<strong>¡Error fatal con la base de datos!</strong> CODE: "+err.code;
                res.redirect('back');
            }
			console.log(data);
            res.render('equipos', { nombre: req.session.nombre, nombresEquipos: data[0] });
        });

	} else {
		req.session.danger = "Para acceder a la página debe estar logueado";
  		res.redirect("/login");
  	}
});


module.exports = router;
