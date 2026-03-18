import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import tokenBlackListModel from "../models/blacklist.model.js";

async function authMiddleWare(req,res,next){
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(401).json({
            message:"Unauthorized access,token is missing"
        })
    }
    const isBlacklisted=await tokenBlackListModel({token:token})
    if (isBlacklisted){
        return res.status(401).json({
            message:"Please Login again to continue"
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

async function systemAuthMiddleware(req,res,next){
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(401).json({
            message:"Unauthorized access,token is missing"
        })
    }
    const isBlacklisted=await tokenBlackListModel({token:token})
    if (isBlacklisted){
        return res.status(401).json({
            message:"Please Login again to continue"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decoded.userId).select("+systemUser")
        if (user.systemUser!==true){
            return res.status(403).json({
                message:"Unauthorized access,Please contact admin"
            })
        }

        req.user=user
        return next()

    }catch(error){
        return res.status(401).json({
            message:`Unauthorized access,token is Invalid ${error.message}`
        })
    }
    

}
export default {
    authMiddleWare,
    systemAuthMiddleware
}