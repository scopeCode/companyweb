var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multipart = require('connect-multiparty'); //文件模块


var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

//app.use(multipart()); //文件上传的模块
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*10
  }
}));

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message ="<div style='margin-bottom: 20px;color:red;'>"+ err + "</div>";
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
