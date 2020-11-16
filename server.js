const express = require('express'),
    http = require('http'),
    path = require('path'),
    DynamicRoutes = require('./lib/dynamic-routes'),
    app = express(),
    bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const errorHandler = require('errorhandler')

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser('$anD@123#'));
app.use(session({
    secret: '$eS$!0n@21#',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
// app.use(app.router);
// console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(errorHandler());
}

DynamicRoutes(app, __dirname + '/routes/');
// or

/*
DynamicRoutes(app, {
	src: __dirname + '/routes/',
	ignore: [],
	pattern: /\.js$/
});
*/

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});