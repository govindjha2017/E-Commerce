const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E-com')
    .then(()=>{console.log('e-com-db connected!!')})
    .catch((err) => console.log(err));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    res.send('HEY WORKING Nah !!!');
})

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

// Product Routes
 const productRoutes = require('./routes/product');
 const ReviewRoutes = require('./routes/review');
 app.use(productRoutes);
 app.use(ReviewRoutes);
const PORT=4000;
app.listen(PORT,()=>{
    console.log('server up at port ',PORT);
})