var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.logged) {
		res.render('equipos', {nombre: req.session.nombre});
	} else {
  		req.session.danger = "NotImplementedYet";
  		res.redirect("/");
  	}
});


module.exports = router;
