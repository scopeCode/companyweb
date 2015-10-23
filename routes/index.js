var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //Ã»ÓĞµÇÂ¼ÔòÌøµÇÂ¼
  res.render('index', { title: 'Expressw'});
});

module.exports = router;
