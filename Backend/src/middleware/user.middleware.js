import config from "../config/config.js";
import tokenBlackListModel from "../model/tokenblacklisting.js";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized User",
      });
    }
   const isBlackListing = await tokenBlackListModel.findOne({
    token
   })

 if(isBlackListing){
    return res.status(400).json({
        success:false,
        message:"Invalid token"
    })
 }


    const decode = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decode.id).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not Found",
      });
    }

    req.user = user.id;
    next();
  } catch (error) {
    console.log("something went wrong form middleware");
    res.status(500).json({
      success: false,
      message: "something went wrong form middleware",
    });
  }
};


export default authMiddleware