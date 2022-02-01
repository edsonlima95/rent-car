
import { authenticateMiddleware } from "@middlewares/authenticateMiddleware";
import { UsersContoller } from "@modules/account/controllers/UsersContoller";
import { Router } from "express";


const passwordRoutes = Router();

const usersContoller = new UsersContoller()

passwordRoutes.post("/password/forgot",authenticateMiddleware,usersContoller.forgotPassword)

passwordRoutes.post("/password/reset",authenticateMiddleware,usersContoller.resetPassword)

export {passwordRoutes}