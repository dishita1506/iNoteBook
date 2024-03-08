const mongoose=require("mongoose");
const {Schema}=mongoose
const NotesSchema=new Schema({
    //Notes schema ko users schema s associate krna padega ye batane k liye ki konse notes konse user k hai
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'users'
    },
    title:{
    type:String,
    required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const Notes=mongoose.model("notes",NotesSchema)
module.exports=Notes;