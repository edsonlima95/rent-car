import { CarsController } from "@modules/cars/useCases/createCar/CarsController";
import { CreateCarsImageController } from "@modules/cars/useCases/createCarImage/CreateCarsImageController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { adminVerify } from "middlewares/adminVerify";
import { authenticateMiddleware } from "middlewares/authentication";


import uploadConfig from "@config/upload";
import multer from 'multer';
import { CreateCarEspecificationController } from "@modules/cars/useCases/createCarEspecification/CreateCarEspecificationController";

const carsRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/cars"))


const carsController = new CarsController()
const listCarsController = new ListAvailableCarsController()
const createCarsImageController = new CreateCarsImageController()
const createCarEspecificationController = new CreateCarEspecificationController();


carsRoutes.post("/cars", authenticateMiddleware, adminVerify, carsController.handle)

carsRoutes.get("/available", listCarsController.handle)

carsRoutes.post("/cars/:id", authenticateMiddleware,uploadAvatar.array("files") ,createCarsImageController.handle)


carsRoutes.post("/especifications/:id", createCarEspecificationController.handle)

export { carsRoutes }

