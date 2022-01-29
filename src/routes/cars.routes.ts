import { CarsController } from "@modules/cars/controllers/CarsController";
import { Router } from "express";
import { adminVerify } from "middlewares/adminVerify";
import { authenticateMiddleware } from "middlewares/authentication";


import multer from 'multer';
import uploadConfig from "@config/upload";

const carsRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/cars"))


const carsController = new CarsController()


carsRoutes.post("/car", authenticateMiddleware, carsController.save)

carsRoutes.put("/car/:id", authenticateMiddleware, carsController.save)

carsRoutes.get("/cars/availables",authenticateMiddleware, carsController.availableCar)

carsRoutes.post("/cars/:id", authenticateMiddleware, uploadAvatar.array("files") ,carsController.uploadImages)

carsRoutes.post("/especifications/:id",authenticateMiddleware, carsController.saveCarEspecifications)

export { carsRoutes }

