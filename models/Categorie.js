const { Schema, model } = require('mongoose');

const categorieSchema = new Schema({

    name: {
        type: String,
        unique: true,
        trim: true,
        maxLength: 100,
        required: true
    }
}, {
    collection: 'categories'
});

const Categorie = model('Categorie', categorieSchema);
module.exports = Categorie;