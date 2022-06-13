const { findById } = require('../models/Offer');
const Offer = require('../models/Offer');
const User = require('../models/User');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectId;
class OffersController {
    getAll(req, res, next) {
        Offer.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })
    };

    get(req, res, next) {
        let { id } = req.params;
        Offer.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })

    }


    post(req, res, next) {
        let body = req.body;
        let image = [req.file.filename].toString();
        let offer = new Offer({ ...body, image });
        offer.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });
    }

    async patch(req, res, next) {

        let { id } = req.params;
        if (req.file === undefined) {
            var image = null

        } else {
            var image = [req.file.filename].toString();

        }
        await Offer.findById(id, (err, response) => {
            if (err) return next(err);
            console.log("response", response);
            if (image === null) {
                image = response.image;
            }
        })

        let body = { ...req.body, image };
        await Offer.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Offer.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });

    }
    getBlogUserByid(req, res, next) {
        let { id } = req.params;
        Offer.findById(id).populate('serviceProvider').exec((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    async getBlogUserByCity(req, res, next) {

        let city = req.params.city;

        let response = await Offer.aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'serviceProvider',
                    'foreignField': '_id',
                    'as': 'serviceProvider'
                }
            }, {
                '$unwind': {
                    'path': '$serviceProvider',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$match': {
                    'serviceProvider.city': city
                }
            }
        ]);
        if (!response.length) {
            return res.status(200).send({ message: "No offers provided in this city." });
        }
        res.status(200).send(response);

        // Offer.find({ city: "Tripoli" }).populate('serviceProvider').exec((err, response) => {
        //     if (err) return next(err);
        //     res.status(200).send(response);
        // });
    }

    async getBlogUserByCategorie(req, res, next) {

        let { categorie, city } = req.params;
        let response = await Offer.aggregate([
            {
                '$lookup':
                {
                    'from': 'users',
                    'localField': 'serviceProvider',
                    'foreignField': '_id',
                    'as': 'serviceProvider'
                }
            }, {
                '$unwind':
                {
                    'path': '$serviceProvider',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$match':
                {
                    'serviceProvider.categorie': ObjectID(categorie),
                    'serviceProvider.city': city

                }
            }])
            if (!response.length) {
                return res.status(200).send({ message: "No offers provided in this categorie." });
            }
        res.status(200).send(response);


    }

    getBySp(req, res, next) {
        let { id } = req.params
        Offer.find({ serviceProvider: id }, (err, response) => {
            if (err) return next(err);
            if (!response.length) {
                return res.status(200).send({ message: "You don't have any offers yet" });
            }
            res.status(200).send(response);

        })
    };

}

const offersController = new OffersController();
module.exports = offersController;