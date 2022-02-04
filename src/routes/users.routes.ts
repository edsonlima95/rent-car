import { adminVerify } from '@middlewares/adminVerify';
import { Router } from "express";
import uploadConfig from "@config/upload";
import multer from 'multer';

import { UsersContoller } from "@modules/account/controllers/UsersContoller";
import { authenticateMiddleware } from "@middlewares/authenticateMiddleware";

const usersController = new UsersContoller();
const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig)

usersRoutes.post("/user",usersController.save)

usersRoutes.put("/user/:id", authenticateMiddleware ,usersController.save)

usersRoutes.patch("/avatar",  authenticateMiddleware, uploadAvatar.single("avatar"), usersController.updateAvatar)

usersRoutes.get("/user/profile",authenticateMiddleware,usersController.userProfile)

usersRoutes.patch("/set-admin/:id",authenticateMiddleware, usersController.setAdmin)

export { usersRoutes }