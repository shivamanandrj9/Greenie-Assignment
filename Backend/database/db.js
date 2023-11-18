import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGODB_URL;
    // console.log(process.env.JWT_SECRET);
  const server = "127.0.0.1:27017";
  const database = "ShivamAssign1";
  try {
    await mongoose.connect(`mongodb://${server}/${database}`);
    console.log("DB Connected Successfully!!");
  } catch (err) {
    console.log("Error Connecting Database", err.message);
  }
};

export default DBConnection;
