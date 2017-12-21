var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes');

require('./config/data-base-setup');
require('./config/passport-setup');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'String is to avoid a warning',
    resave: true,
    saveUninitialized: true,
    cookie : { httpOnly: true, maxAge: 2419200000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

//ROUTES -------------------------------------
app.use('/', authRoutes);
//-------------------------------------

app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
