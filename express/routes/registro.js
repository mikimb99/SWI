var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro');
});

router.post('/', function(req, res){
  username = req.body.username;
});

module.exports = router;