const express = require('express');
const app = express();
const mongooose = require('mongoose');
const ejsmate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local')

mongooose.connect('mongodb://127.0.0.1:27017/E-com')
    .then(()=>console.log('E-com Conected'))
    .catch((err)=>console.log(err));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsmate)

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true, 
  }))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    console.log(req.user)
    res.locals.success = req.flash('success');
    next();
})

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res)=>{
    res.send('Working fine');
})

//---------  routes--------

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/user')

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

const PORT = 7000;
app.listen(PORT,()=>{
    console.log('server is up at port',PORT)
})