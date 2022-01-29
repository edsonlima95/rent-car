import { Router } from "express";
import { AuthenticateUserController } from "@modules/account/controllers/AuthenticateUserController";
import { RefreshTokenController } from "@modules/account/controllers/RefreshTokenController";

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()
const authenticateRoutes = Router();


authenticateRoutes.post("/auth",authenticateUserController.userAuthentication)

authenticateRoutes.post("/refresh-token", refreshTokenController.generateNewToken)

export { authenticateRoutes }