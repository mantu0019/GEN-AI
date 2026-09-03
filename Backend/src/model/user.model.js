import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"username should be unique"]

    },
    email:{
        type:String,
        unique:[true,"Email should be unique"],
        required:[true,"email should be required"]
    },
    password:{
        type:String,
        required:[true,'password should be required']
        ,select:false
    }
})

const userModel = mongoose.model("users",userSchema);

export default userModel