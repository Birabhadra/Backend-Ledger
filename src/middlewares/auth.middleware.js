import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"


async function authMiddleWare(req,res,next){
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1]
    console.log(token)
    if (!token){
        return res.status(401).json({
            message:"Unauthorized access,token is missing"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decoded.userId)

        req.user=user
        return next()

    }catch(error){
        return res.status(401).json({
            message:"Unauthorized access,token is Invalid"
        })
    }
}

export default {
    authMiddleWare
}