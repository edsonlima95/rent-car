import { CreateCarEspecificationController } from "@modules/cars/useCases/createCarEspecification/CreateCarEspecificationController";
import { Router } from "express";


const testRoutes = Router();

const carsEspecifications = new CreateCarEspecificationController()

testRoutes.post("/test/:id",carsEspecifications.handle)


export {testRoutes}