const {productSchema} = require('../joiValidation');

module.exports.validateProduct = async (req,res,next)=>{
    const {name, price , desc ,image} = req.body;

    try {
        const value = await productSchema.validateAsync({name:name,price:price,image:image,desc:desc});
        console.log(value);
        next();
    }
    catch (err) {
        console.log(err.message);
        res.render('error',{err:err.message});
     }
}