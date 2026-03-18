import express from "express";
import authMiddleWare from "../middlewares/auth.middleware.js"
import accountController from "../controllers/account.controller.js";
const router=express.Router()

router.post("/",authMiddleWare.authMiddleWare,accountController.createAccountController)

export default router;