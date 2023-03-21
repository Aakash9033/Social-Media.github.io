const mongoose=require("mongoose")
const Schema=mongoose.Schema
const userSchema=new Schema({
   
    FirstName:{
        type: String,
        required:true
    },
    
    SurName:{
        type: String,
        required:true
    },

    Email:{
        type: String,
        required:true
    },

    Password:{
       type:String,
       reuired:true
    },
   
    Gender:{
        type:String,
        required:true
    }
},
    {timestamps:true})

 const User=mongoose.model("User",userSchema)
 
 module.exports=User
