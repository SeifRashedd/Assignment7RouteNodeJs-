import mongoose from "mongoose";
import dns from "dns";
import configService from "../config/config.service.js";

// Node on this machine picks 127.0.0.1 as DNS which refuses SRV lookups (mongodb+srv)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
    try {
        await mongoose.connect(configService.db_url);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
    }
} 