import express from "express";
const router=express.Router();
import authMiddleware from '../middlewares/auth.middleware.js'
import transactionController from "../controllers/transaction.controller.js";
router.post('/',authMiddleware.authMiddleWare,transactionController.createTransaction)
router.post('/system/initial-funds',authMiddleware.systemAuthMiddleware,transactionController.createInitalFunds)
export default router;  