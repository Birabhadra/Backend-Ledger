import nodemailer from "nodemailer";
import welcome from '../templates/welcomeEmail.js';
import txnsuccess from '../templates/transactionSuccess.js'
import txnfailed from '../templates/transactionFailed.js'
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        type: 'OAuth2',
        user:process.env.EMAIL_USER,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN
    },
});

transporter.verify((error,success)=>{
    if (error){
        console.error("Error connecting to email server:",error);
    }else{
        console.log("Email server is ready to send messages")
    }
});

const sendEmail=async(to,subject,text,html)=>{
    try{
        const info=await transporter.sendMail({
            from:`Backend Ledger <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log(`Message sent ${info.messageId}`);
        console.log(`preview URL ${nodemailer.getTestMessageUrl(info)}`)
    }catch(error){
        console.log("Error sending email",error)
    }
        
}
const sendRegistrationEmail= async (userName,userEmail)=>{
    try{
        const subject="Welcome to Backend Ledger"
        await sendEmail(
            userEmail,subject,welcome(userName),welcome(userName)
        )
    } catch(error){
        console.log("Error sending registration email:",error.message)
    }
}
const sendTransactionEmail= async (userEmail,name,fromAccount,toAccount,amount,idempotencyKey)=>{
    try{
        const subject="Transaction Alert"
        await sendEmail(
            userEmail,
            subject,
            txnsuccess("DEBIT",name,fromAccount,toAccount,amount,idempotencyKey),
            txnsuccess("DEBIT",name,fromAccount,toAccount,amount,idempotencyKey)
        )
    }catch(error){
        console.log("Error sending transactional email",error.message)
    }


}
const sendTransactionFailureEmail= async (userEmail,name,fromAccount,toAccount,amount)=>{
    try{
        const subject="Transaction Failed Alert"
        await sendEmail(
            userEmail,
            subject,
            txnfailed(name,fromAccount,toAccount,amount),
            txnfailed(name,fromAccount,toAccount,amount)
        )
    }catch(error){
        console.log("Error sending transaction failure email",error.message)
    }
}


export default {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
}