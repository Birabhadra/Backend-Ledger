import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import SendEmail from '../services/email.service.js'
dotenv.config()
async function userRegisterController(req,res){
    const {email,password,name}=req.body;
    const isExists=await userModel.findOne({email:email})
    if (isExists){
        res.status(400).json({
            message:"User already exists with email",
            status:"failed"
        })
    }
    const user=await userModel.create({email,password,name})
    const token=jwt.sign({userId:user},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token);
    res.status(201).json({
        user:{ 
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
    await SendEmail.sendRegistrationEmail(name,email)
}

async function userLoginController(req,res){
    const {email,password}=req.body;
    const user=await userModel.findOne({email:email}).select("+password")
    if(!user){
        return res.status(401).json({message:"No User found please Register to continue"})
    }
    const isvalidPassword=await user.comparePassword(password)
    if(!isvalidPassword){
        return res.status(401).json({
            message:"Please enter a valid Password"
        })
    }
    const token=jwt.sign({userId:user},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token)
    res.status(201).json({
        user:{ 
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

export default{
    userRegisterController,
    userLoginController
}