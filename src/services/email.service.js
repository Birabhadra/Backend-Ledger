import nodemailer from "nodemailer";
import welcome from '../templates/welcomeEmail.js'
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
            from:`Backend-ledger${process.env.EMAIL_USER}`,
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

export default {
    sendRegistrationEmail
}