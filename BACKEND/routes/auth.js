const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser=require("../middleware/fetchUser");
//fetchUser is a middleware function which is used for authentication

// WE WILL BE APPLYING SECURITY TO OUR DATABASE BY USING bcryptjs module (npm i bcryptjs)
//1.When we login to any website out password is not stored as string in DB
//2.Hashing is appiled to our password
//3.Hash function is a one way function which gives you a ramdom string for your password
//4. example pass-dishita1506 after hashing-->fghjksd&2345
//5.But hackers have generated all hashing values for common password in a table called rainbow table which makes it easy for them to hack anyone's account
//6.So we will be applying salt and pepper to our password
//7.when our password is converted to hash value some random text is added to it called salt
//8. ex pass=ram123 hashedValue=as4@3jh salt=6d%2d  value to be stored in DB -->as4@3jh6d%2d
//9. hashing+salting makes difficult for Hackers to hack someone's account
const bcrypt = require("bcryptjs");

//WE WILL BE USING JSON WEB TOKEN HERE (npm i jsonwebtoken)
//1. Its is a meduim for securely transmitting information between parties.
//2.Majorly used for authorization Once the user is logged in he can access all resources until he logged out.
//3.Ek baar user n log in kr liya to usko token mil gya ek so next time jab bhi vo log in karega uske sath vo token bhi laayega to baar baar username and password check krne ki jaroorat nhi hogi (until he logged out)
//4.It contains 3 part header,playload,signature
//5.Playload contains user information
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hellothisisme@12#34";

//APPLYING VALIDATION USING express-validation package
const { body, validationResult } = require("express-validator");



//ROUTE: 1
//CREATING USER ENDPOINT USING POST
router.post(
  "/createUser",
  [
    //applyng validation rules
    body("name", "Enter a valid name of atleast 3 character").isLength({
      min: 3,
    }),
    body("password", "Enter a valid password of atleast 5 character").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email please").isEmail(),
  ],
  async (req, res) => {
     let success=false;
    console.log(req.body);
    //req s jo bhi data arra hai usko hum user variable m daal rhe hai by using User schema
    //Fir hum user.save() s data ko save krre hai apne database mai (mongodb);
    // const user=User(req.body);
    // user.save();
    // res.send("hello")

    //If there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //check whether user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });

      //If user with same email exist then give an error with 400 status code
      if (user) {
        
        return res
          .status(400)
          .json({ success,error: "Sorry user with same email already exist..." });
      }

      //Creating salt and hashed value
      const salt = await bcrypt.genSalt(10); //Returning promise that's why we have used await
      const securePass = await bcrypt.hash(req.body.password, salt);

      //else create a new user
      user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
      });

      //sending res that user added sucessully...
      // res.json({"User added successfully : " :user});

      const data = {
        user: {
          id: user.id,
        },
      };

      const authorizationToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authorizationToken});
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .send("Sorry for the inconvinience , Internal Server error occured...");
    }
    
  }
);


//ROUTE: 2
//LOGIN USER ENDPOINT

router.post("/login",[body("email", "Enter a valid email please").isEmail(),
  body("password", "Password cannot be blank..").exists()],
    


  async (req, res) => {
    let success=false;
    //If there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    console.log(req.body);
    try{
        let user=await User.findOne({email})
        console.log(user);
        if(!user){
            return res.status(400).json({error:"Please login with correct credentials..(email)"});

        }
        console.log(password,user.password);
        const comparePassword=await bcrypt.compare(password,user.password);

        console.log(comparePassword);
        if(!comparePassword){
          success=false;
            return res.status(400).json({success,error:"Please login with correct credentials..(pass)"});
        }

          
      const data = {
        user: {
          id: user.id,
        },
      };

      const authorizationToken = jwt.sign(data, JWT_SECRET);
       success=true;
      res.json({success,authToken:authorizationToken});

    }catch(error){
         console.error(error.message);
         res.status(500).send("Sorry for the inconvinience , Internal Server error occured...");
    }

  });


//ROUTE: 3
//Get logged in user detal using Post "/api/auth/getUser"
router.post("/getUser",fetchUser,

  async (req, res) => {
    
  try {
  //req m token pda hai usse id find krli
   const userId=req.user.id;
   //uss id k sare fields select kr liye except password and send as json response
    const user=await User.findById(userId).select("-password")
    res.send(user);
    
  } catch(error){
    console.error(error.message);
    res.status(500).send("Sorry for the inconvinience , Internal Server error occured...");
  }
})
















module.exports = router;
