var express = require('express');
var qn = require("../model/qiniu");

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
  var config ={
    ACCESS_KEY:'YYFZ8Mv3gARmlE8-MDc-zj8Yp0p__SoQj6u_Vjuc',
    SECRET_KEY:'Qpmmt-jax55bZxWVC0lLmE__QJgEAfAyGG1CUkVZ',
    BUCKETNAME:'baby',
  }
  //(key,filePath,bucketname,success,error)
  qn.uploadFile("img/"+req.files.uploadFile.name,req.files.uploadFile.path,config,function(ret){
    res.send(200,{key:ret.key,hash:ret.hash});
  },function(err){
    res.send(500,{err:err});
  });
});
module.exports = router;
