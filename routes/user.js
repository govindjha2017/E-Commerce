const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')

router.get('/signup',(req,res)=>{
    res.render('auth/signup')
})
router.post('/signup',async(req,res)=>{
    const {username, email , password , role} = req.body;
    const user = new User({username,email,password , role});
    await User.register(user,password);
    res.redirect('/login')
})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/products');
  });

  router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/products');
    });
  });

module.exports = router