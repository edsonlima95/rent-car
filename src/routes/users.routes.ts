import { Router } from "express";
import uploadConfig from "@config/upload";
import multer from 'multer';

import { authenticateMiddleware } from "../middlewares/authentication";
import { UsersContoller } from "@modules/account/controllers/UsersContoller";

const usersController = new UsersContoller();
const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig)

usersRoutes.post("/user",usersController.save)

usersRoutes.put("/user/:id", authenticateMiddleware ,usersController.save)

usersRoutes.patch("/avatar",  authenticateMiddleware, uploadAvatar.single("avatar"), usersController.updateAvatar)

usersRoutes.get("/user/profile",authenticateMiddleware,usersController.userProfile)

export { usersRoutes }