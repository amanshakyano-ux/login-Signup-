const User = require("../models/user")
const bcrypt = require("bcrypt")

function isStringInvalid(str){
return !str || str.trim().length === 0

}
const signup = async(req,res)=>{

    //checking data formate
   try { const {name,email,password} = req.body;
     if(isStringInvalid(name)||isStringInvalid(email)||isStringInvalid(password))
     {
        return res.status(404).json({
            message:"All fields are mandatory",
            success:false
        })
     }
 
     //checking data in DB
     const user = await User.findOne({
        where:{
            email:email
        }
     })
     if(user)
     {
        return res.status(400).json({success:false,message:"User is already exists"})
     }

     
    const hash = await bcrypt.hash(password, 10);
      
      await  User.create({
            name:name,
            email:email,
            password:hash
        })

    res.json({
        success:true,
        message:"User signedup Successfully"
    })}
    catch(err){
        res.json(500).json({
            success:false,
            message:err.message
        })
    }
     

}
const login = (req,res)=>{
    res.json("Login successfully")
}
module.exports = {
    signup,
    login
}