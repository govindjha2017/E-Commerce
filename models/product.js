const mongoose = require('mongoose');
const Review = require('./review');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    desc:{
        type:String,
        trime:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

const Product = mongoose.model('Product',productSchema);

module.exports=Product;