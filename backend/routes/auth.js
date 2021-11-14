const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwt_secret="achintyamishra@@";
const fetchUser=require("../middleware/fetchUser")

                                                                        //Route 1create a user using : POST "/api/auth/createuser"


router.post('/createuser', [

  body('name', "Enter a valid Name").isLength({ min: 3 }),
  body('password', "Enter a valid password").isLength({ min: 5 }),
  body('email', "Enter a valid Email").isEmail()

], async (req, res) => {
  //code for error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //here we willl check whether the user exist already or not

  try {
    //checking whether a user is already present or not
    if (await User.findOne({ email: req.body.email })) {

      return res.status(400).json({ errors: "Sorry a user exist with entered email id already" })
    }
    //generating hashed password;
const salt = await bcrypt.genSaltSync(10);
const secured = await bcrypt.hashSync(req.body.password, salt);

//creating a new user
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secured,
    })

    //below code is commented becaise we have used promises syntax but afterward we have used async await syntax

    //   .then(user => res.json(user)).catch(err=>{console.log(err)
    // res.json({error: "Please enter a unique email id ",message:err.message})
    // }) 
    

    //authentication token 
    const data={
      user:{

        id:user.id
      }
    }
    
const authtoken=jwt.sign(data,jwt_secret);


    
    res.json({authtoken:authtoken })

  } 
  //catching errors
  catch (error) {
    res.status(500).send(error.message)
  }

})







                                                                                       //Route 2authenticating a user//

router.post('/login', [

body('email', "Enter a valid Email").isEmail(),
body('password', "Password cannot be blank").exists()

], async (req, res) => {
//code for error handling
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const{email,password}=req.body;
try {
  let user=await User.findOne({email});
  if(!User.findOne({email})){
    return res.status(400).json({error:"invalid credentials"})
  }
  const password_compare=await bcrypt.compare(password,user.password)
 if (!password_compare) {
   return res.status(400).json({error:"invalid credentials"})
 }
 const payload={
user:{
  id:user.id
}  
}
const authtoken=jwt.sign(payload,jwt_secret);
res.json({authtoken:authtoken })


} catch (error) {
  res.status(500).send("internal server error")
}

})


 //Route 3      getting user details    from authtoken
 router.post('/getuser',fetchUser,async (req, res) => {
    try {
      const userid=req.user.id;
      const user=await User.findById(userid).select("-password")
      res.status(200).send(user);
    } catch{
      res.status(500).send("internal server error")
    }
    
    })
    

  





module.exports = router;
