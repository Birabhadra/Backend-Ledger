import express from "express";
import authRouter from "./routes/auth.routes.js";
import accountRouter from "./routes/account.routes.js";
import transactionRouter from "./routes/transaction.routes.js"
import cookieParser from "cookie-parser";
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter);
app.use('/api/account',accountRouter)
app.use('/api/transaction',transactionRouter)
export default app;