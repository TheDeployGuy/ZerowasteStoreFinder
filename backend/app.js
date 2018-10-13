const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let config = {}

try {
  config = require('./config/database.js')
} catch(e) {
  console.log('INFO: Cannot find database.js file using, env files should be setup')
}

mongoose.connect(process.env.DB_URI || config.DB_URI);

const stores = require('./routes/stores');
const users = require('./routes/users');
const messages = require('./routes/messages');
const location = require('./routes/location');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('pug').renderFile);
app.set('view engine', 'html');
app.use(cors());

app.use('/api/stores', stores);
app.use('/api/location', location)
app.use('/admin', users);
app.use('/message', messages);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
