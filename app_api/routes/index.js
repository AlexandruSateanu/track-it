var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

/* Users */
router.post('/register', require('../controllers/register'));
router.post('/login', require('../controllers/login'));
router.post('/confirmation', require('../controllers/confirmation'));

module.exports = router;
