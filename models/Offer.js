const { Schema, model } = require('mongoose');

const offerSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    image:{
        type:String,
    },
    serviceProvider:{
        type:Schema.Types.ObjectId,
        
        ref:'User'
    } 
}, {
    collection: 'offers'
});

const Offer = model('Offer', offerSchema);
module.exports = Offer;
    