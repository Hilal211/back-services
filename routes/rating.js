var express = require('express');
var router = express.Router();
var ratingController = require('../controllers/ratingControllers')
    router.get('/', ratingController.getAll);
    // router.get('/:id', ratingController.get);
    router.post('/', ratingController.post);
    router.delete('/:id', ratingController.delete);
    router.get('/getbysp/:id', ratingController.getBySp);
    router.get('/v', ratingController.getStatistique);
    router.get('/getfiverate', ratingController.getFiveRate);

    

    module.exports = router;


