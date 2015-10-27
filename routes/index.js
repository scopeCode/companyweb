var express = require('express');
var qiniu = require('qiniu');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);

  if(req.session.user){
    res.render('index', { title: '首页 '});
  }else{
    req.session.error = "请先登录"
    res.redirect('login');
  }

});

qiniu.conf.ACCESS_KEY = 'YYFZ8Mv3gARmlE8-MDc-zj8Yp0p__SoQj6u_Vjuc';
qiniu.conf.SECRET_KEY = '<Qpmmt-jax55bZxWVC0lLmE__QJgEAfAyGG1CUkVZ';

function uptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  return putPolicy.token();
}

function uploadFile(localFile, key, bucketname) {
  var extra = new qiniu.io.PutExtra();
  var _uptoken  = uptoken(bucketname);
  qiniu.io.putFile(_uptoken, key, localFile, extra, function(err, ret) {
    if(!err) {
      console.log(ret.key, ret.hash);
      // ret.key & ret.hash
    } else {
      console.log(err);
    }
  });
}


router.post('/upload', function (req,res,next) {
  console.log('123123123123');
  uploadFile(req.files['loadFile'],'img/'+req.files['loadFile'].name,'body');
});

module.exports = router;
