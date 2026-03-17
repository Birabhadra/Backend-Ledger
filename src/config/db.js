import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import dns from "dns"
dns.setServers(['8.8.8.8'])
const connectMongo=async()=>{
    if(!process.env.MONGODB_URI){
        throw new Error("MongoDB Uri is missing")
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully")
    }catch(err){
        console.error("Mongoose client error:",err.message);
        process.exit(1)
    }
}
export default connectMongo;