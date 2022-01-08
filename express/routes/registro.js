var express = require('express');
var router = express.Router();
var email_validator = require("email-validator");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro');
});

router.post('/', function(req, res){
  nombre = req.body.name;
  email = req.body.email;
  pass = req.body.pass;
  if(nombre && email && pass) {
  	if(email_validator.validate(email)){
	  	db.query("INSERT INTO users(nombre, email, password) VALUES(?, ?, SHA2(?, 256));", [nombre, email, pass], (err, result) => {
	  		if(err) {
	  			if(err.code == "ER_DUP_ENTRY"){
	  				//EL EMAIL YA ESTÁ EN USO
	  				req.session.danger ="El email introducido ya está registrado.";
	  			} else {
	  				//ALGO PASA
	  				req.session.error = "<strong>¡Error fatal con la base de datos!</strong> CODE: "+err.code;
	  			}
	  			res.redirect('back');
	  		} else {
	  			req.session.logged = true;
  				req.session.id_user = result.insertId;
  				req.session.nombre = nombre;
  				req.session.email = email;
  				req.session.tipo = 0;
	  			req.session.success = "Usuario registrado correctamente";
  				res.redirect("/");
	  		}
	  	});
	  } else {
	  	req.session.danger = "Introduzca un email valido";
	  	res.redirect("back");
	  }
  } else {
  	req.session.danger = "¡Campos incompletos!";
  	res.redirect('back');
  }
});

module.exports = router;