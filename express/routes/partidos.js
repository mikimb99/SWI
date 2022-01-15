var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.logged) {
		res.render('partidos', {nombre: req.session.nombre});
	} else {
		req.session.danger = "Para acceder a la página debe estar logueado";
  		res.redirect("/login");
  	}
});


module.exports = router;
