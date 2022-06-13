const { findById } = require('../models/Categorie');
const Categorie = require('../models/Categorie');

class CategoriesController {
    getAll(req, res, next) {
        Categorie.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })
    };

    get(req, res, next) {
        let { id } = req.params;
        Categorie.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })

    }


    post(req, res, next) {
        let body = req.body
        let categorie = new Categorie(body);
        categorie.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Categorie.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });
    }

    delete(req, res, next){
        let{id}=req.params;
        Categorie.deleteOne({_id:id},(err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });

    }
}

const categoriesController = new CategoriesController();
module.exports = categoriesController;