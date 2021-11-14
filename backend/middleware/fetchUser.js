
const jwt=require("jsonwebtoken");
const jwt_secret="achintyamishra@@";


//writng middleware function which takes three arguments 
//here next means calling another middleware which is async in our auth.js file (written next to fetchUser)
const fetchUser=(req,res,next)=>{
// getting the user details from authtoken ,when we place a request in header in thunderclient useing our authtoken
const token=req.header("auth-token");
if(!token){
    res.status(401).send({error:"Please authenticate using valid credentials"})

}
 try {
     const data=jwt.verify(token,jwt_secret);
    req.user=data.user
    next()
 } catch (error) {
    res.status(401).send({error:"Please authenticate using valid credentials"})
 }  
   
    

}

module.exports=fetchUser;