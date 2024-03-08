const mongoose=require("mongoose");
const {Schema}=mongoose
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

//Model banayenge jisme 2 arguments hone 1st model ka naam (collection k name DB m) and 2nd Schema
const User=mongoose.model("users",UserSchema);

//if your application is repeatedly running queries on the same fields, you can create an index on those fields to improve performance for those queries
//User.createIndexes();
module.exports=User;