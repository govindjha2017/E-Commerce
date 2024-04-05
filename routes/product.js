const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {validateProduct} = require('../middlewares/validation');

router.get('/products',async (req,res)=>{
    const products = await Product.find({});
    res.render('products/index',{products});
})
router.get('/product/new',(req,res)=>{
    res.render('products/new')
})

router.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('reviews');
    res.render('products/show',{product});
})

router.post('/products',validateProduct,async (req,res)=>{
     const {name,image,price,desc} = req.body;
     await Product.create({name,image,price,desc});
     req.flash('success','Product created sucessfully')
     res.redirect('/products')
})
router.delete('/products/:id',async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success','Product delete sucessfully')
    res.redirect('/products')
})

module.exports = router;