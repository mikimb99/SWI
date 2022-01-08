var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro');
});

router.post('/', function(req, res){
  nombre = req.body.name;
  email = req.body.email;
  pass = req.body.pass;
  req.session.error = 'notImplementedYet';
  res.redirect('back');
});

module.exports = router;