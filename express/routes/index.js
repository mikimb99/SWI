var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.logged){
		res.render('home', {nombre: req.session.nombre});
	} else {
  		res.render('index', { title: 'Express' });
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
