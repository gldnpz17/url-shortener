require('dotenv').config();

var config = require('./config');

const mongoose = require('mongoose');
mongoose.connect(config.mongoDbUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var childProcess = require('child_process');

var cron = require('cron');

const Models = require('./models/models');

var apiRouter = require('./routes/api');
const { stringify } = require('querystring');
const { stderr } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

if (config.environment === 'production') {
  app.use(express.static(path.join(__dirname, 'client-app', 'build')));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-app', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(JSON.stringify(err.stack));

  // render the error page
  res.status(err.status || 500);
  res.send(`${err.status};${err};${err.stack}`);
});

if (config.environment === 'production') {
  app.listen(80, () => {
    console.log('Server started on port 80');
  });
} else {
  app.listen(4000, () => {
    console.log('Server started on port 4000');
  });
}

//routine cleanup
var urlCleanUpJob = new cron.CronJob(
  '1 0 * * *',
  async () => {
    await Models.ShortenedUrl.deleteMany({expiryDate: {$lt: new Date(Date.now())} });
  },
);

urlCleanUpJob.start();

module.exports = app;