let jwt=require("jsonwebtoken");
const JWT_SECRET = "hellothisisme@12#34";
const fetchUser=(req,res,next)=>{
//get user from jwt taken and add id to request token

//token variable mai token daal diya jo ki req.header m store hai
  const token=req.header('auth-token');

  //if token not found give an error
  if(!token){
    res.status(401).send({error:"Please aurhenticate using a valid token"});

  }
  //else token verify krke req mai vo token daal diya and next function ko call kr diya
  try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
  }catch(error){
    res.status(401).send({error:"Please aurhenticate using a valid token"});
  }
 
   
}


module.exports=fetchUser;