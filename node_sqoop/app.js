var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var testconn = require('./routes/testconnection');
var creatconn = require('./routes/createconnection');
var fetchTables = require('./routes/fetchtables');
var modifyconnection = require('./routes/modifyconnection');
var deleteconnection = require('./routes/deleteconnection');
var committask = require('./routes/committask');
var refreshprocess = require('./routes/refreshprocess');
var fetchcompletedtask = require('./routes/fetchcompletedtask');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/snp/committask',committask);
app.use('/users', users);
app.use('/snp/testconnection',testconn);
app.use('/snp/createconnection',creatconn);
app.use('/snp/fetchtables',fetchTables);
app.use('/snp/modifyconnection',modifyconnection);
app.use('/snp/deleteconnection',deleteconnection);
app.use('/snp/refreshprocess',refreshprocess);
app.use('/snp/fetchcompletedtask',fetchcompletedtask)



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
    res.render('error');
});

var server = app.listen(3097, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
