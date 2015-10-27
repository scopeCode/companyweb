var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login ' });
});




router.post('/login', function(req, res, next) {
    var uName = req.body.uName;
    var uPwd = req.body.uPwd;

    console.log(req.body);

    var user={
        username:'admin',
        password:'123456'
    };

    if(uName==user.username&&uPwd==user.password)
    {
        req.session.user = user;
        res.send(200);
    }else{
        res.send( 404 );
    }
});

router.get('/logout', function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('login');
});

module.exports = router;