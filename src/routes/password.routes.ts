
import { UsersContoller } from "@modules/account/controllers/UsersContoller";
import { Router } from "express";
import { authenticateMiddleware } from "middlewares/authentication";


const passwordRoutes = Router();

const usersContoller = new UsersContoller()

passwordRoutes.post("/password/forgot",authenticateMiddleware,usersContoller.forgotPassword)

passwordRoutes.post("/password/reset",authenticateMiddleware,usersContoller.resetPassword)

export {passwordRoutes}