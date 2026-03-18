import express from "express";
const router=express.Router()
import usercontroller from "../controllers/auth.controller.js"
import authController from "../controllers/auth.controller.js";
/*POST /api/auth/register*/
router.post("/register",usercontroller.userRegisterController)
/*POST /api/auth/login*/
router.post("/login",usercontroller.userLoginController)


router.post("/logout",authController.userLogoutController)
export default router