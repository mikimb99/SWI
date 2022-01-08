var express = require('express');
var router = express.Router();
var email_validator = require("email-validator");

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session);
		res.render('contacto', {user: req.session.logged, nombre: req.session.nombre});
});

router.post('/', (req, res) => {
	msg = req.body.msg;
	if(req.session.logged) {
		nombre = req.session.nombre;
		email = req.session.email;
		id = req.session.id_user;
	} else {
		nombre = req.body.nombre;
		email = req.body.email;
		id = null;
		if(!(nombre && email)) {
			req.session.danger = "¡Campos incompletos!";
			res.redirect('back');
			return;
		}
		if(!email_validator.validate(email)) {
			req.session.danger = "Introduzca un email valido.";
			res.redirect('back');
			return;
		}
	}
	if(msg) {
		db.query("INSERT INTO contacto(nombre, email, msg, user_id, fecha) VALUES(?, ?, ?, ?, NOW());", [nombre, email, msg, id], (err, result) => {
			if(err) {
				console.log(err);
				req.session.error = "<strong>¡Error fatal con la base de datos!</strong> CODE: "+err.code;
				res.redirect('back');
			} else {
				req.session.success = "Mensaje enviado correctamente";
				res.redirect('back');
			}
		});
	} else {
		req.session.danger = "¡Campos incompletos!";
  		res.redirect('back');
	}
});



module.exports = router;
