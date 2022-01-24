import { RentalCarsController } from "@modules/rental/useCases/RentalCarsController";
import { Router } from "express";
import { authenticateMiddleware } from "middlewares/authentication";

const rentalRoutes = Router()


const rentalCarsController = new RentalCarsController()



rentalRoutes.post("/rental", authenticateMiddleware, rentalCarsController.handle)


export { rentalRoutes }