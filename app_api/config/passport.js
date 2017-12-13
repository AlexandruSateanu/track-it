var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'parola' }, function(username, password, done) {
  User.findOne({ email: username }, function (err, user) {
    if (err) { 
      return done(err); 
    }

    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }

    if (!user.isVerified) {
      return done(null, false, {
        message: 'Account has not been verified.'
      });
    } 

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
  
    return done(null, user);
  });
}));
