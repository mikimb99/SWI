var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logged) {req.session.info = "No puedes iniciar sesión con una cuenta abierta, cierre sesión primero"; res.redirect('back');}
  else res.render('login');
});

router.post('/', function(req, res){
  email = req.body.email;
  pass = req.body.pass;
  if(email && pass) {
  	db.query("SELECT id, nombre, tipo FROM users WHERE email= ? AND password = SHA2(?, 256);", [email, pass], (err, data, campos) => {
  		if(err) {
  			console.log(err);
  			req.session.error = "<strong>¡Error fatal con la base de datos!</strong> CODE: "+err.code;
  			res.redirect('back');
  		}
  		else if(data.length > 0) {
  			req.session.logged = true;
  			req.session.id = data[0].id;
  			req.session.nombre = data[0].nombre;
  			req.session.email = email;
  			req.session.tipo = data[0].tipo;
  			res.redirect("/");
  		} else {
  			req.session.danger = "Usuario o contraseña incorrecto.";
  			res.redirect('back');
  		}
  	});
  } else {
  	req.session.danger = "¡Campos incompletos!";
  	res.redirect('back');
  }
});

module.exports = router;




