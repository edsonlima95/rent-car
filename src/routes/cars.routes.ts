import { CarsController } from "@modules/cars/useCases/createCar/CarsController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { adminVerify } from "middlewares/adminVerify";
import { authenticateMiddleware } from "middlewares/authentication";


const carsRoutes = Router();

const carsController = new CarsController()

const listCarsController = new ListAvailableCarsController()

carsRoutes.post("/cars",authenticateMiddleware, adminVerify, carsController.handle)


carsRoutes.get("/available",listCarsController.handle)

export {carsRoutes}

