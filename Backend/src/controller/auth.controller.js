import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import tokenBlackListModel from "../model/tokenblacklisting.js";

export const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    const userAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);
    const userDetail = user.toObject();

    delete userDetail.password;

    res.status(201).json({
      success: true,
      message: "user register successfully",
      userDetail,
    });
  } catch (error) {
    console.log("something went wrong from register controller", error);
    res.status(500).json({
      success: false,
      message: "something went wrong from register controller",
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User not found",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({
        success: false,
        message: "password Invalid",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    const userDetail = user.toObject();
    delete userDetail.password;

    res.status(200).json({
      success: true,
      message: "logged-In",
      userDetail,
    });
  } catch (error) {
    console.log("something went wrong from login controller", error);

    return res.status(500).json({
      success: false,
      message: "something went wrong from login controller",
    });
  }
};

export const logOutUserController = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token not provided",
      });
    }

    if (token) {
      await tokenBlackListModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "LogOut successfully",
    });
  } catch (error) {
    console.log("something went wrong from logout controller", error);
    res.status(500).json({
      success: false,
      message: "something went wrong from logout controller",
    });

    res.clearCookie("token");
  }
};

export const getMeUserController = async (req, res) => {
  try {
    const userId = req.user;

    const userDetail = await userModel.findById(userId);
    if (!userDetail) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "data fetched successfully",
      userDetail,
    });
  } catch (error) {
    console.log("something went wrong from getMe controller", error);
    res.status(500).json({
      success: false,
      message: "something went wrong from getMe controller",
    });
  }
};
