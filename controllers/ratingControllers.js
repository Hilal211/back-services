const { findById } = require('../models/Rating');
const Rating = require('../models/Rating');
class RatingController {
    getAll(req, res, next) {
        Rating.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })
    };

    get(req, res, next) {
        let { id } = req.params;
        Rating.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })

    }


    post(req, res, next) {
        let body = req.body
        let rating = new Rating(body);
        rating.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });
    }


    delete(req, res, next) {
        let { id } = req.params;
        Rating.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });

    }

    getBySp(req, res, next) {
        let {id}=req.params
        Rating.find({serviceProvider:id}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })
    };


    getStatistique(req,res,next){
        // let {id}=req.params;
        Rating.count(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })
    }

    getFiveRate(req, res, next) {
        Rating.find({rate:"5"}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })
    };
  
  

}

const ratingController = new RatingController();
module.exports = ratingController;