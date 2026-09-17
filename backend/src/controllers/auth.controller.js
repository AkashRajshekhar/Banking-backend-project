const jwt = require("jsonwebtoken")

const UserModel = require("../models/user.model.js");


//register api

async function userRegisterController(req, res){ 
    const {email , name , password} = req.body; 
 
  const isEmailExist = await UserModel.findOne({email:email}); 

  if(isEmailExist){ 
   return  res.status(422).json({
        message:"User Already Exist",
        status:"failed"
    });
  }

  const  user = await UserModel.create({
    email , password , name
  })

  const  token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY , {expiresIn : "7d"}) 


  res.cookie("token", token); 

  res.status(201).json({
    user:{
        _id: user._id,
        email: user.email,
        name: user.name
    }, 
    token
    
   
  })

  
console.log(user);

}

 //login api 
async function userLoginController(req, res){ 
 const { email , password} = req.body;
    const user = await UserModel.findOne({email:email}).select("+password"); 

    if(!user){ 
      return res.status(401).json({ 
        message:"Email or password in INVALID"
      })  


    }
    const isValidPassword = await user.comparePassword(password)
  
    if(!isValidPassword){ 
        return res.status(401).json({ 
            message:"Email or password is INVALID"
        })
    }


      const  token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY , {expiresIn : "7d"}) 

       res.cookie("token", token); 

  res.status(200).json({
    user:{
        _id: user._id,
        email: user.email,
        name: user.name
    }, 
    token
    
   
  })
  

}


module.exports = { 
    userRegisterController,
    userLoginController
};