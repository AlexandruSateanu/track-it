require('dotenv').load();
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var roluri = require('../config/roluri');

var proiectSchema = new mongoose.Schema({
  proiect: {type: Number, ref: 'Proiect', required: true},
  rol: {type: Number, min: 0, max: roluri.length, required: true}
});

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  numeIntreg: {
    type: String,
    required: true
  },
  proiecte: [proiectSchema],
  hash: String,
  salt: String,
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  usePushEach: true
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  
  return jwt.sign({
    _id: this._id,
    email: this.email,
    numeIntreg: this.numeIntreg,
    proiecte: this.proiecte,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET );
};

var verifySchema = new mongoose.Schema({
  _userId: { type: Number, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

userSchema.plugin(autoIncrement.plugin, {model: 'User', startAt: 1});

mongoose.model('User', userSchema);
mongoose.model('Verify', verifySchema);
