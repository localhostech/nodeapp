
var User = require('../models/user');
var Message = require('../models/message');

var totalUsers = 0;

module.exports = function(app, passport, io) {
    io.on('connection', function(socket){
      totalUsers += 1;
      socket.broadcast.emit('newtotal',totalUsers);
      socket.on('disconnect', function(){
        totalUsers -= 1;
        socket.broadcast.emit('newtotal',totalUsers);
      });
      console.log('Total', totalUsers);
      socket.on('messages', function(data) {
               //socket.emit('newmsg', data);
               socket.broadcast.emit('newmsg',data);
       });
    });

    app.post('/register', function(req, res) {
      console.log(req.body);
      User.register(new User({username : req.body.login}), req.body.password, function(err, account) {
          if (err) {
            console.log('Error or username taken! Sorry(');
            res.send({'result': {'success': false, 'message': err}});
          } else {
            res.send({'result': {'success': true}});
            //res.redirect('/');
          }
      });
    });
    
    app.post('/login', passport.authenticate('local'), function(req, res) {
        console.log(req.user);
        res.send({'result':{'success':true}})
        //res.redirect('/');
    });
    app.post('/send', function(req, res) {
        //console.log(req.body);
        var message = new Message({text: req.body.text, author: req.user.username});
        message.save(function(err, message) {
          //console.log(err, message);
        })
    });

   
    app.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
    });

    app.get('/', function (req, res) {
        if (req.user) {
          Message.find({}, function(err, messages) {
            //console.log(err,messages);
            res.render('index', {user: req.user.username, messages: messages, totalUsers: totalUsers});
          })
        } else {
          res.render('index')
        }
    });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
