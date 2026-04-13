require("dotenv").config();
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



function isStringInvalid(str){
return !str || str.trim().length === 0
}

function generateJsonToken (id,name)
{
 return jwt.sign({userId:id,name:name},process.env.JSON_KEY)   
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







const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ validation
    if (isStringInvalid(email) || isStringInvalid(password)) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory"
      });
    }

    // ✅ user check
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // ✅ password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is wrong"
      });
    }

    // ✅ token generate
    const token = generateJsonToken(user.id, user.name);

    // ✅ success response
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

 



module.exports = {
    signup,
    login
}