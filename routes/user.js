const express=require('express');
const router=express.Router();

const User=require("../models/user")

router.get('/signin',(req,res)=>{
    res.render("signin")
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/signup',async(req,res)=>{
  const {fullName,email,password}=req.body;

    await User.create({
        fullName,
        email,
        password
    })
  
    res.redirect('/');
    
})

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.matchedPassword(email,password);


    console.log("User", user);

    res.redirect('/');


})

module.exports=router;