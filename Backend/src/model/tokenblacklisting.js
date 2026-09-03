import mongoose from "mongoose";

const tokenBlackListingSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token should be required"]
    }
},{timestamps:true});

const tokenBlackListModel = mongoose.model("blackList",tokenBlackListingSchema);

export default tokenBlackListModel;