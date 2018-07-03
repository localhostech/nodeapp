var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var bodyParser   = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var server = require('http').createServer(app); 
var io = require('socket.io')(server);

mongoose.connect(configDB.url);

app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(cookieParser('nodetestapp')); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
app.use(session({
  secret: 'nodetestapp',
  store: require('mongoose-session')(mongoose)
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport);

require('./routes/index.js')(app, passport, io);

var totalUsers = 0;



/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/
server.listen(3000);  