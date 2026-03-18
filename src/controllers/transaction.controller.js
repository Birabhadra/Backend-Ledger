import transactionModel from "../models/transaction.model.js";
import ledgerModel from "../models/ledger.model.js";
import accountModel from "../models/account.model.js";
import emailService from "../services/email.service.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";

/**
 * - Create a new Transaction
 * THE 10-STEP TRANSFER FLOW:
    * 1. Validate Request
    * 2. Validate Idempotency key
    * 3.Check account status
    * 4.Derive sender balance from ledger
    * 5.Create transaction(PENDING)
    * 6.Create DEBIT ledger entry
    * 7.Create CREDIT ledger entry
    * 8.mark transaction complete
    * 9. Commit MongoDB session
    * 10. Send Email notification
 */
async function createTransaction(req, res) {
    /**
     * 1.Validate User
     */
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body
    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "fromAccount,toaccount,amount,idempotencykey are required"
        })
    }
    const fromUserAccount = await accountModel.findOne({ _id: fromAccount })
    const toUserAccount = await accountModel.findOne({ _id: toAccount })
    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    /**
     * 2.Validate idempotency key
     */
    const isTransactionAlreadyExists = await transactionModel.findOne({ idempotencyKey: idempotencyKey })

    if (isTransactionAlreadyExists) {
        if (isTransactionAlreadyExists.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })
        }
        if (isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing",
                transaction: isTransactionAlreadyExists
            })
        }
        if (isTransactionAlreadyExists.status === "FAILED") {
            return res.status(200).json({
                message: "Transaction processing failed,please retry",
                transaction: isTransactionAlreadyExists
            })
        }
        if (isTransactionAlreadyExists.status === "REVERTED") {
            return res.status(200).json({
                message: "Transaction was reverted,please retry",
                transaction: isTransactionAlreadyExists
            })
        }
    }

    /**
     * 3.Check account Status
     */

    if (fromUserAccount.status !== 'ACTIVE' || toUserAccount.status !== 'ACTIVE') {
        return res.status(400).json({
            message: 'Both from Account and to account must be ACTIVE to process transaction'
        })
    }

    /**
     * 4.Derive sender balance from ledger
     */
    const balance = await fromUserAccount.getBalance()

    if (balance < amount) {
        return res.status(400).json({
            message: `Insufficient Balance.Currrent Balance is ${balance}.Requested balance is ${amount}`
        })
    }

    /**
     * 5.Create Transactions(PENDING)
     * 6.Create DEBIT ledger entry
     * 7.Create CREDIT ledger entry
     * 8.mark transaction complete
     * 9. Commit MongoDB session
    */
    const session = await mongoose.startSession()
    session.startTransaction()
    const transaction =(await transactionModel.create([{
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    }],{session}))[0]
    const debitLedgerEntry = await ledgerModel.create([{
        account: fromAccount,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    }], { session })
    const creditLedgerEntry = await ledgerModel.create([{
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    }], { session })
    
    await transactionModel.findOneAndUpdate(
        {_id:transaction._id},
        {status:"COMPLETED"},
        {session}
    )
    await session.commitTransaction()
    session.endSession()
    res.status(201).json({
        message:"Funds transferred successfully",
        transaction:transaction
    })
    /**
     * 10.Send Email notification
     */
    await emailService.sendTransactionEmail((fromUserAccount.email,fromUserAccount.name,fromAccount,toAccount,amount,idempotencyKey))
}

async function createInitalFunds(req,res){
    const {toAccount, amount, idempotencyKey } = req.body
    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toaccount,amount,idempotencykey are required"
        })
    }
    const toUserAccount = await accountModel.findOne({ _id: toAccount })
    if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid toAccount"
        })
    }
    const fromUserAccount = await accountModel.findOne({
        user:req.user._id

    })

    if(!fromUserAccount){
        return res.status(400).json({
            message: "System user account not found"
        })
    }
    const session=await mongoose.startSession()
    session.startTransaction()
    const transaction = new transactionModel({
        fromAccount:fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    })
    const debitLedgerEntry = await ledgerModel.create([{
        account: fromUserAccount,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    }], { session })
    const creditLedgerEntry = await ledgerModel.create([{
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    }], { session })
    transaction.status = "COMPLETED"
    await transaction.save({ session })
    await session.commitTransaction()
    session.endSession()
    res.status(201).json({
        message:"Funds transferred successfully",
        transaction:transaction
    })
    const sysUser= await userModel.findOne({_id:fromUserAccount.user})
    console.log(sysUser.email)


    await emailService.sendTransactionEmail(sysUser.email,sysUser.name,fromUserAccount._id,toAccount,amount,idempotencyKey)
}
export default{
    createTransaction,
    createInitalFunds
}