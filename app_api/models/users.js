require('dotenv').load();
var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

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
  hash: String,
  salt: String,
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  
  return jwt.sign({
    _id: this._id,
    email: this.email,
    numeIntreg: this.numeIntreg,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET );
};

var verifySchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

mongoose.model('User', userSchema);
mongoose.model('Verify', verifySchema);
