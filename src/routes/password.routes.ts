import { ResetUserPasswordController } from "@modules/account/useCases/resetPassword/ResetUserPasswordController";
import { UsersPasswordForgotController } from "@modules/account/useCases/sendEmailForgotPassword/UsersPasswordForgotController";
import { Router } from "express";


const passwordRoutes = Router();

const usersPasswordForgotController = new UsersPasswordForgotController()
const resetUserPasswordController = new ResetUserPasswordController()

passwordRoutes.post("/password/forgot",usersPasswordForgotController.handle)

passwordRoutes.post("/password/reset",resetUserPasswordController.handle)

export {passwordRoutes}