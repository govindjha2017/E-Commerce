const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');

router.post('/products/:id/add',async (req,res)=>{
    const {id} = req.params;
    const {rating,comment} = req.body;
    const product = await Product.findById(id); 
    const review = await Review.create({rating,comment}); 
    product.reviews.push(review._id);
    product.save();
    res.redirect('back');
})

router.delete('/product/:productId/delete/:reviewId',async (req,res)=>{
   const {productId, reviewId} = req.params;
   const product = await Product.findById(productId); 
   let n = product.reviews.indexOf(reviewId);
   product.reviews.splice(n,1);
   product.save();
   await Review.findByIdAndDelete(reviewId);
   res.redirect('back');
})

module.exports = router;