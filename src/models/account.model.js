import mongoose from "mongoose";
import ledgerModel from "./ledger.model";
const accountSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Account must be associated with a user"],
        index:true
    },
    status:{
        type:String,
        enum:["ACTIVE","FROZEN","INACTIVE"],
        message:"Status can be either Active,Inactive or Frozen",
        default:"ACTIVE"
    },
    currency:{
        type:String,
        required:[true,"Currency is required for creating an account"],
        default:"INR"
    }
},{
    timestamps:true
})
accountSchema.index({user:1,status:1})

accountSchema.methods.getBalance=async function(){
    const balanceData= await ledgerModel.aggregate([
        {$match:{ account:this._id}},
        {
            $group:{
                _id:null,
                totalDebit: {
                    $cond:[
                        {$eq:["$type","DEBIT"]},
                        "$amount",
                        0
                    ]
                },
                totalCredit:{
                    $cond:[
                        {$eq:["$type","CREDIT"]},
                        "$amount",
                        0
                    ]
                }
            }
        },
        {
            $project:{
                _id:0,
                balance:{$subtract:["$totalDebit","$totalCredit"]}
            }
        }
    ]);
    if(balanceData.length===0){
        return 0
    }
    return balanceData[0].balance

};
const accountModel=mongoose.model("account",accountSchema)

export default accountModel