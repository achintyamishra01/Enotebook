const mongoose =require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
   name:{
       type:String,
       required:true,
   },
   email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
Date:{
    type:Date,
    default:Date.now
}
  });
const User=mongoose.model("user",UserSchema);

//this is done to create unique email and multiple same user should not be entered in the database.but we have specified this condition in auth.js file

// User.createIndexes();


module.exports=User;

