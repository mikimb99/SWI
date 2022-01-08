var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
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
  let err = req.session.error;
  let msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.messages = '';
  if (err) res.locals.messages += '<p>' + err + '</p>';
  if (msg) res.locals.messages += '<p>' + msg + '</p>';
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter)
app.use('/registro', registroRouter)

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
