import { CarsController } from "@modules/cars/controllers/CarsController";
import { Router } from "express";


import multer from 'multer';
import uploadConfig from "@config/upload";
import { adminVerify } from "@middlewares/adminVerify";
import { authenticateMiddleware } from "@middlewares/authenticateMiddleware";

const carsRoutes = Router();

const uploadFiles = multer(uploadConfig)


const carsController = new CarsController()


carsRoutes.post("/car", authenticateMiddleware, adminVerify, carsController.save)

carsRoutes.put("/car/:id", authenticateMiddleware, adminVerify, carsController.save)

carsRoutes.get("/cars/availables", authenticateMiddleware, carsController.availableCar)

carsRoutes.post("/cars/:id", authenticateMiddleware, adminVerify, uploadFiles.array("files"), carsController.uploadImages)

carsRoutes.post("/especifications/:id", authenticateMiddleware, adminVerify, carsController.saveCarEspecifications)

export { carsRoutes }

