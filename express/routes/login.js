var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res){
  email = req.body.email;
  pass = req.body.pass;
  req.session.error = 'notImplementedYet';
  res.redirect('back');
});

module.exports = router;