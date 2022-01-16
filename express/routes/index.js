var express = require('express');
var router = express.Router();
var data
var data2

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.logged){
		db.query("SELECT * FROM partidos_completo WHERE estado=0; SELECT * FROM partidos_completo WHERE TIMESTAMPDIFF(MINUTE, fecha, now()) > 0 AND TIMESTAMPDIFF(MINUTE, fecha, now()) < 130; select * from partidos_completo LIMIT 1;", [1, 2, 3], (err, data, campos) => {
            if(err) {
                req.session.error = "<strong>¡Error fatal con la base de datos!</strong> CODE: "+err.code;
                res.redirect('back');
            }
			console.log(data);
            res.render('home', { nombre: req.session.nombre, partidosProximos: data[0], partidosDirecto: data[1], partidoUsuario: data[2] });
        });

	} else {
		db.query("SELECT * FROM partidos_completo WHERE estado=0; SELECT * FROM partidos_completo WHERE TIMESTAMPDIFF(MINUTE, fecha, now()) > 0 AND TIMESTAMPDIFF(MINUTE, fecha, now()) < 130;", [1, 2], (err, data, campos) => {
            if(err) {
                req.session.error = "<strong>¡Error fatal con la base de datos!</strong> CODE: "+err.code;
                res.redirect('back');
            }
			console.log(data);
            res.render('index', { title: 'Express', partidosProximos: data[0], partidosDirecto: data[1]});
        });
  	}
});

router.get('/logout', function(req, res){
	if(req.session.logged){
		req.session.logged = false;
	  	delete req.session.id;
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
