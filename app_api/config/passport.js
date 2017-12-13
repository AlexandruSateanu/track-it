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
        message: 'Email-ul nu exista in baza de date.'
      });
    }

    if (!user.isVerified) {
      return done(null, false, {
        message: 'Contul nu a fost verificat.'
      });
    } 

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Parola este incorecta.'
      });
    }
  
    return done(null, user);
  });
}));
