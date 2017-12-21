
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var cors          = require('cors')

const passport    = require('passport');
const session     = require('express-session');
const indexRoutes = require('./routes/appRoutes/auth-routes');
const authRoutes  = require('./routes/appRoutes/auth-routes');

require('./config/database-setup');
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
app.use(cors({
  credentials: true, // allow poeple to send cookies
  origin: [ 'http://localhost:4200'] // connects to client side and allows only cookies comming from localhost:4200
}));

//ROUTES -------------------------------------
app.use('/', indexRoutes);
app.use('/app', authRoutes);
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

// const express      = require('express');
// const path         = require('path');
// const favicon      = require('serve-favicon');
// const logger       = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser   = require('body-parser');
// const mongoose     = require('mongoose');
// const session      = require('express-session');
// const passport     = require('passport');
// const cors         = require('cors');
//
// require('dotenv').config();
//
// require('./config/passport-setup');
//
// mongoose.connect(process.env.MONGODB_URI);
//
// const app = express();
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: 'angular and express and auth and shhhhh',
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cors({
//   credentials: true,                   // allow other domains to send cookies
//   origin: [ 'http://localhost:4200' ]  // these are the domains that are allowed
// }));
//
//
// // ROUTES ----------------------------------------------------------------------
// const myIndexRoutes = require('./routes/index-routes');
// app.use('/', myIndexRoutes);
//
// const myAuthRoutes = require('./routes/appRoutes/auth-routes');
// app.use('/', myAuthRoutes);
// // -----------------------------------------------------------------------------
//
//
// app.use((req, res, next) => {
//     // If no routes match, send them the Angular HTML.
//     res.sendFile(__dirname + '/public/index.html');
// });
//
//
// module.exports = app;
