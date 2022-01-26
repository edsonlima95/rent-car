import { Router } from "express";
import { AuthenticateUserController } from "@modules/account/useCases/authenticateUser/AuthenticateUserController";
import { UserRefreshTokenController } from "@modules/account/useCases/userRefreshToken/UserRefreshTokenController";

const authenticateUserController = new AuthenticateUserController()
const userRefreshTokenController = new UserRefreshTokenController()
const authenticateRoutes = Router();


authenticateRoutes.post("/session", authenticateUserController.handle)

authenticateRoutes.post("/refresh-token", userRefreshTokenController.handle)

export { authenticateRoutes }