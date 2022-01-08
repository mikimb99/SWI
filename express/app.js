var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/login');
var registroRouter = require('./routes/registro');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUnitialized: false,
  secret: 'm83fxFA_hJ7pngX'
}));
app.use(function(req, res, next){
  let danger = req.session.danger;
  let msg = req.session.success;
  let err = req.session.error;
  let info = req.session.info;
  delete req.session.danger;
  delete req.session.success;
  delete req.session.error;
  delete req.session.info;
  res.locals.alerta = '';
  if (danger) res.locals.alerta += '<div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">'+danger+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  if (msg) res.locals.alerta += '<div class="alert alert-success alert-dismissible fade show mt-2" role="alert">'+msg+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  if (err) res.locals.alerta += '<div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">'+err+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  if (info) res.locals.alerta += '<div class="alert alert-info alert-dismissible fade show mt-2" role="alert">'+info+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  next();
});




db = mysql.createConnection({
  host     : 'isw.tni.com.es',
  user     : 'web_user',
  password : 'm83fxFA_hJ7pngX',
  database : 'sw1'
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/contacto', contactoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
