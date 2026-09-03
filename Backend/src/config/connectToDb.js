import mongoose from "mongoose";
import config from "./config.js";

const connectToDb = async () => {
  try {
    mongoose.connect(config.MONGO_URI);
    console.log("Connect to database");
  } catch (error) {
    console.log("something went wrong from database connection", error);
  }
};


export default connectToDb;
