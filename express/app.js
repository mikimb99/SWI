var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const session = require('express-session');
var cookie = require('cookie');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/login');
var registroRouter = require('./routes/registro');
var partidosRouter = require('./routes/partidos');
var equiposRouter = require('./routes/equipos');
var sessionStore = new session.MemoryStore();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('m83fxFA_hJ7pngX'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'sid',
  store: sessionStore,
  resave: true,
  saveUnitialized: true,
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
app.use('/partidos', partidosRouter);
app.use('/equipos', equiposRouter);

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



var debug = require('debug')('express:server');
var http = require('http');
var server = app.server;
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server =require('http').Server(app);
var io = require('socket.io')(server);

io.use(function(socket, next) {
    try {
        var data = socket.handshake || socket.request;
        if (! data.headers.cookie) {
            return next(new Error('Missing cookie headers'));
        }
        var cookies = cookie.parse(data.headers.cookie);
        if (! cookies["sid"]) {
            return next(new Error('Missing cookie ' + "sid"));
        }
        var sid = cookieParser.signedCookie(cookies["sid"], "m83fxFA_hJ7pngX");
        if (! sid) {
            return next(new Error('Cookie signature is not valid'));
        }
        data.sid = sid;
        sessionStore.get(sid, function(err, session) {
            if (err) return next(err);
            if (! session) return next(new Error('session not found'));
            data.session = session;
            next();
        });
    } catch (err) {
        next(new Error('Internal server error'));
    }
});

var listener = io.listen(server);
listener.sockets.on('connection',function(socket){  
  socket.on('partido_update', function(data){  
      s = socket.handshake.session;
      //AQUI VA EL CODIGO QUE GESTIONA LOS UPDATED DE LOS PARTIDOS
       io.emit('data_update',data);  //AQUI SE ENVIA LA RESPUESTA A TO CRISTO
     });  
  });  

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
