var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

/* Admin */
router.post('/admin/creare-user', require('../controllers/admin/creareUser'));

/* Auth */
router.post('/register', require('../controllers/auth/register'));
router.post('/login', require('../controllers/auth/login'));
router.post('/confirmation', require('../controllers/auth/confirmation'));

/* Proiect */
router.post('/proiect/creare-proiect', auth, require('../controllers/proiect/creareProiect'));
router.post('/proiect/:proiectId/alege-etape', auth, require('../controllers/proiect/alegeEtape'));
router.post('/proiect/:proiectId/alege-membri', auth, require('../controllers/proiect/alegeMembri'));

/* Useri */
router.get('/lista-useri', auth, require('../controllers/useri/listaUseri'));
router.get('/lista-roluri', auth, require('../controllers/useri/listaRoluri'));

module.exports = router;
