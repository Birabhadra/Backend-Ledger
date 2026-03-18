import mongoose from "mongoose";

const ledgerSchema=mongoose.Schema({
    account:{
        type:mongoose.Types.ObjectId,
        ref:"account",
        required:[true,"ledger must be assoicated with an account"],
        immutable:true,
        index:true
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating an ledger entry"],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.ObjectId,
        ref:"transaction",
        required:[true,"Ledger must be associated with a transaction"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["DEBIT","CREDIT"],
            message:"Type can be only debit or credit"
        },
        required:[true,"Ledger type is required"],
        immutable:true
    }
});


function preventLedgerModification(){
    throw new error("Ledger entries are immutable and cannot be modified")
}

ledgerSchema.pre('findOneAndUpdate',preventLedgerModification)
ledgerSchema.pre('findOneAndDelete',preventLedgerModification)
ledgerSchema.pre('findOneAndReplace',preventLedgerModification)
ledgerSchema.pre('updateOne',preventLedgerModification)
ledgerSchema.pre('deleteOne',preventLedgerModification)
ledgerSchema.pre('remove',preventLedgerModification)
ledgerSchema.pre('deleteMany',preventLedgerModification)
ledgerSchema.pre('updateMany',preventLedgerModification)


const ledgerModel=mongoose.model("ledger",ledgerSchema)

export default ledgerModel