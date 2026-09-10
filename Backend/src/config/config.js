import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("Invornmental variable:PORT");
}
if (!process.env.MONGO_URI) {
  throw new Error("Invornmental variable:MONGO_URI");
}
if (!process.env.JWT_SECRET) {
  throw new Error("Invornmental variable:JWT_SECRET");
}
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Invornmental variable:GEMINI_API_KEY");
}
if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error("Invornmental variable:IMAGEKIT_PRIVATE_KEY");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_API_KEY:process.env.GEMINI_API_KEY,
  IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY
};

export default config;
