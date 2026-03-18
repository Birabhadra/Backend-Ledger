import express from "express";
const router=express.Router();
import authMiddleware from '../middlewares/auth.middleware.js'

router.post('/',authMiddleware.authMiddleWare)

export default router;  