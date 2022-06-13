const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    userName: {
        type: String,
        unique: false,
        lowercase: true,
        trim: true,
        maxLength: 100,
    },
 
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        maxLength: 100,
        required: true
    },
    password: {
        type: String,
        unique: false,
        trim: false,
        maxLength: 100,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        maxLength: 20
    },
    instagram:{
        type:String,
    },
    facebook:{
        type:String,
    },
    magor:{
        type:String
    },
    description: {
        type: String,
        unique: false,
        trim: false,
        maxLength: 300,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    categorie:{
        type:Schema.Types.ObjectId,
        ref:'Categorie'
    },
    Token:{
        type:String
    }
}, {
    collection: 'users'
});

const User = model('User', userSchema);
module.exports = User;