const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rate:{
        type:String,
        required:true
    },
    serviceProvider:{
        type:Schema.Types.ObjectId,
        ref:'User'
    } 
}, {
    collection: 'ratings'
});

const Rating = model('Rating', ratingSchema);
module.exports = Rating;
    