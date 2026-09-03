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

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
