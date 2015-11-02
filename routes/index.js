var express = require('express');
var qn = require("scj/qiniu");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页 '});
  return;
  if(req.session.user){
    res.render('index', { title: '首页 '});
  }else{
    req.session.error = "请先登录"
    res.redirect('login');
  }
});

router.post('/upload', function (req,res,next) {
  //(key,filePath,bucketname,success,error)
  try{
    qn.putWithoutKey(req.files.uploadFile.path,null,function(ret){
      res.send(200,{key:ret.key,hash:ret.hash});
    },function(err){
      res.send(500,{err:err});
    });
  }catch(ex){
    console.error(ex);
  }

});
module.exports = router;
