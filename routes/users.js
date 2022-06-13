var express = require('express');
var router = express.Router();
var usersController=require('../controllers/usersController')
/* GET users listing. */
router.get('/',usersController.getAll);
router.get('/:id',usersController.get);
router.post('/',usersController.post);
router.put('/:id',usersController.put);
router.delete('/:id',usersController.delete);
router.post('/register',usersController.register);
router.post('/login',usersController.login);
router.get('/logout/:id',usersController.logoutAction);
router.get('/getbycategorie/:id/:city', usersController.getByCategorie);
router.get('/bycity/:city',usersController.getByCity);

module.exports = router;


