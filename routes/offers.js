var express = require('express');
var router = express.Router();
var offerController = require('../controllers/offersController')
module.exports = (upload) => {

    router.get('/', offerController.getAll);
    router.get('/:id', offerController.get);
    router.post('/', upload.single('image'), offerController.post);
    router.put('/bb/:id', upload.single('image'),offerController.patch);
    router.delete('/:id', offerController.delete);
    router.get('/details/:id', offerController.getBlogUserByid);
    router.get('/city/:city', offerController.getBlogUserByCity);
    router.get('/categorie/:categorie/:city', offerController.getBlogUserByCategorie);
    router.get('/getbysp/:id', offerController.getBySp);



    return router;
}


