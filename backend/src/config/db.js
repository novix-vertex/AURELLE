import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("MongoDB has been connected successfully");

    } catch (error) {
        console.error("Connection Failed:", error.message);
        process.exit(1);
    }

}

export default connectToDB;