import { CreateCarEspecificationController } from "@modules/cars/useCases/createCarEspecification/CreateCarEspecificationController";
import { RentalCarsController } from "@modules/rental/useCases/RentalCarsController";
import { Router } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)


const testRoutes = Router();

const carsEspecifications = new CreateCarEspecificationController()

const rentalCarController = new RentalCarsController()

testRoutes.post("/test/:id",carsEspecifications.handle)

testRoutes.post("/rental-test",rentalCarController.handle)


export {testRoutes}