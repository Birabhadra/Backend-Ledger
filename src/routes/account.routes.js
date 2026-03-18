import express from "express";
import authMiddleWare from "../middlewares/auth.middleware.js"
import accountController from "../controllers/account.controller.js";
const router=express.Router()

router.post("/",authMiddleWare.authMiddleWare,accountController.createAccountController)


router.get('/',authMiddleWare.authMiddleWare,accountController.getUserAccountController)

router.get('/balance/:accountId',authMiddleWare.authMiddleWare,accountController.getUserBalanceController)
export default router;