var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.logged) {
		db.query("SELECT * FROM partidos_completo WHERE estado=0; SELECT * FROM partidos_completo WHERE TIMESTAMPDIFF(MINUTE, fecha, now()) > 0 AND TIMESTAMPDIFF(MINUTE, fecha, now()) < 130; select * from partidos_completo;", [1, 2, 3], (err, data, campos) => {
            if(err) {
                req.session.error = "<strong>¡Error fatal con la base de datos!</strong> CODE: "+err.code;
                res.redirect('back');
            }
			console.log(data);
            res.render('partidos', { nombre: req.session.nombre, partidosProximos: data[0], partidosDirecto: data[1], partidoUsuario: data[2] });
        });
		
	} else {
		req.session.danger = "Para acceder a la página debe estar logueado";
  		res.redirect("/login");
  	}
});


module.exports = router;
