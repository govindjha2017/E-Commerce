const express = require('express');
const router = express.Router();
const Product = require('../models/product')
router.get('/products',async (req,res)=>{
    // res.send("hellow from products");
    const products =await Product.find({});
    res.render('index',{products});
})

router.get('/product/new',(req,res)=>{
    res.render('new');
})
router.post('/product',async (req,res)=>{
    const {name ,image ,price ,desc} = req.body;
    await Product.create({name,image,price,desc});
    res.redirect('/products');
})

router.get('/product/:id/edit',async (req,res)=>{
    const {id }= req.params;
    const {name ,image ,price ,desc} = req.body;
    const product = await Product.findById(id);

    res.render('edit',{product});
})
router.patch('/product/:id',async(req,res)=>{
    const {id}= req.params;
    const {name ,image ,price ,desc} = req.body;
    await Product.findByIdAndUpdate(id,{name ,image ,price ,desc});
    res.redirect(`/product/${id}`);
})
 
router.delete('/product/:id',async (req,res)=>{
    const {id}= req.params;
    const {name ,image ,price ,desc} = req.body;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

router.get('/product/:id',async (req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id).populate("reviews");
    res.render('show',{product});
})



module.exports= router;