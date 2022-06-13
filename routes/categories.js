var express = require('express');
var router = express.Router();
var categoriesController=require('../controllers/categoriesControllers')
/* GET users listing. */
router.get('/',categoriesController.getAll);
router.get('/:id',categoriesController.get);
router.post('/',categoriesController.post);
router.put('/:id',categoriesController.put);
router.delete('/:id',categoriesController.delete);
module.exports = router;


