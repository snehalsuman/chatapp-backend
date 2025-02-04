import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true,
        minLength:6
    },profilePic:{
        type:String,
        default:""
    }

},{
    timestamps:true
})

const User=mongoose.model("users",UserSchema)

export default User