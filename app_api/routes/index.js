var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

/* Users */
router.post('/register', require('../controllers/auth/register'));
router.post('/login', require('../controllers/auth/login'));
router.post('/confirmation', require('../controllers/auth/confirmation'));

/* Admin */
router.post('/admin/creare-user', require('../controllers/admin/creareUser'));

/* Proiect */
router.post('/proiect/creare-proiect', auth, require('../controllers/proiect/creareProiect'));
router.post('/proiect/:proiectId/alege-perioada', auth, require('../controllers/proiect/alegePerioada'));

module.exports = router;
