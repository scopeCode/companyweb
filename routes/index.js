var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //û�е�¼������¼
  res.render('index', { title: 'Expressw'});
});

module.exports = router;
