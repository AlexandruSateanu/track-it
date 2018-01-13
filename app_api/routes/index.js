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
router.post('/proiect/:proiectId/alege-membru', auth, require('../controllers/proiect/alegeMembru'));
router.get('/proiect/:proiectId/info-proiect', auth, require('../controllers/proiect/infoProiect'));
router.put('/proiect/:proiectId/editeaza-perioada', auth, require('../controllers/proiect/editeazaPerioada'));
router.put('/proiect/:proiectId/editeaza-etape', auth, require('../controllers/proiect/editeazaEtape'));
router.put('/proiect/:proiectId/editeaza-membri', auth, require('../controllers/proiect/editeazaMembri'));
router.get('/proiect/:proiectId/membri-proiect', auth, require('../controllers/proiect/membriProiect'));

/* Activitate */
router.post('/proiect/:proiectId/creare-activitate', auth, require('../controllers/activitate/creareActivitate'));
router.get('/proiect/:proiectId/activitate/:activitateId', auth, require('../controllers/activitate/infoActivitate'));
// router.get('/proiect/:proiectId/listaActivitati', auth, require('../controllers/activitate/listaActivitati'));
// router.put('/proiect/:proiectId/activitate/:activitateId/editeaza-activitate', auth, require('../controllers/activitate/editeazaActivitate'));
// router.delete('/proiect/:proiectId/activitate/:activitateId/sterge-activitate', auth, require('../controllers/activitate/stergeActivitate'));
router.put('/proiect/:proiectId/activitate/:activitateId/schimba-status', auth, require('../controllers/activitate/schimbaStatus'));
// router.post('/proiect/:proiectId/activitate/:activitateId/adauga-comentariu', auth, require('../controllers/activitate/adaugaComentariu'));
// router.get('/proiect/:proiectId/activitate/:activitateId/lista-comentarii', auth, require('../controllers/activitate/listaComentarii'));
router.get('/lista-status', auth, require('../controllers/activitate/listaStatus'));

/* Useri */
router.get('/lista-useri', auth, require('../controllers/useri/listaUseri'));
router.get('/lista-roluri', auth, require('../controllers/useri/listaRoluri'));
router.get('/lista-proiecte-user/:userId', auth, require('../controllers/useri/listaProiecteUser'));

/* Tratarea cererilor gresite */
router.all( "/*", require('../controllers/helpers/cereriGresite'));

module.exports = router;
