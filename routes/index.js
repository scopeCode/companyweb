var express = require('express');
var formidable = require('formidable');
var util = require('util');
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

    var path = "";
    for(var key in req.files){
      path = req.files[key].path;
    }
    console.log({path:path});

    qn.putWithoutKey(path,null,function(ret){
      res.send(200,{key:ret.key,hash:ret.hash});
    },function(err){
      res.send(500,{err:err});
    });
  }catch(ex){
    console.error(ex);
  }
});

router.post('/uploada', function (req,res,next) {
  try{
    //创建表单上传
    var form = new formidable.IncomingForm();
    console.log(form);
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    //form.uploadDir = "uploads/images/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制
    //form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function(err, fields, files) {
      var path = "";
      for(var key in files){
        path = files[key].path;
      }
      console.log({path:path});

      qn.putWithoutKey(path,null,function(ret){
        res.send(200,{key:ret.key,hash:ret.hash});
      },function(err){
        res.send(500,{err:err});
      });

    });

  }catch(ex){
    console.error(ex);
  }
});


module.exports = router;
