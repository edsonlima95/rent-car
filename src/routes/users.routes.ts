import { Router } from "express";
import uploadConfig from "@config/upload";
import multer from 'multer';

import { authenticateMiddleware } from "../middlewares/authentication";
import { UsersContoller } from "@modules/account/useCases/createUser/UsersContoller";
import { UpdateUsersAvatarController } from "@modules/account/useCases/updateUserAvatar/UpdateUsersAvatarController";


const usersController = new UsersContoller();
const updateUsersAvatarController = new UpdateUsersAvatarController();
const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

usersRoutes.post("/users", usersController.handle)

usersRoutes.patch("/avatar",  authenticateMiddleware, uploadAvatar.single("avatar"), updateUsersAvatarController.handle)

export { usersRoutes }