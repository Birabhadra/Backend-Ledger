import accountModel from "../models/account.model.js";

async function createAccountController(req,res) {
    const user=req.user
    const account=await accountModel.create({
        user:user._id
    })
    res.status(200).json({
        account
    })
    
}
async function getUserAccountController(req,res){
    const accounts=await accountModel.find({user:req.user._id})
    res.status(200).json({
        accounts:accounts
    })
}

async function getUserBalanceController(req,res){
    const {accountId}=req.params
    const account=await accountModel.findOne({
        _id:accountId,
        user:req.user._id
    })
    if(!account){
        return res.status(404).json({
            message:"Account not found"
        })
    }
    const balance=await account.getBalance()

    res.status(200).json({
        accountId:account._id,
        balance:balance

    })
}
export default {
    createAccountController,
    getUserAccountController,
    getUserBalanceController
}