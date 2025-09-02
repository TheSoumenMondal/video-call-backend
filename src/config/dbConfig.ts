import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(serverConfig.MONGO_URI!);
    console.log("Connected to MongoDB: ", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

export default connectDB;
