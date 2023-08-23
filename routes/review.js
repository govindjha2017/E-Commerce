const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Product = require('../models/product');
router.post('/product/:id/review',async (req,res)=>{
    const {id} = req.params;
    const {rating , comment}= req.body;

    const newReview = await Review.create({rating,comment});
    const product = await Product.findById(id);
    product.reviews.push(newReview);
    product.save();
    res.redirect('back');
})


router.get('/product/:productId/:reviewId/delete',async(req,res)=>{
    const {productId,reviewId} = req.params;
    const product = await Product.findById(productId);
    const review = await Review.findById(reviewId);
    let n = product.reviews.indexOf(review._id);
    console.log(n);
    product.reviews.splice(n,1);
    product.save();
     await Review.findByIdAndDelete(reviewId);

     res.redirect('back');
})



module.exports= router;