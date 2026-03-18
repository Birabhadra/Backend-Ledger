import mongoose from "mongoose";
const transactionSchema=mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be associated with a from account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be associated with a to account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["PENDING",'COMPLETED','FAILED','REVERTED'],
            message:"Status can be either pending,completed,failed  or reverted",
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating an transction"],
        min:[0,"Transation amount cannot be negative"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency key is required for creatting a transation"],
        index:true,
        unique:true
    }
},{
    timestamps:true
});

const transactionModel=mongoose.model("transaction",transactionSchema);

export default transactionModel;