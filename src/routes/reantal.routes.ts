import { RentalCarsController } from "@modules/rental/useCases/createRental/RentalCarsController";
import { DevolutionRentalController } from "@modules/rental/useCases/devolutionRental/DevolutionRentalController";
import { Router } from "express";
import { authenticateMiddleware } from "middlewares/authentication";

const rentalRoutes = Router()


const rentalCarsController = new RentalCarsController()

const devolutionController = new DevolutionRentalController()

rentalRoutes.post("/rental", authenticateMiddleware, rentalCarsController.handle)

rentalRoutes.post("/devolution/:id",devolutionController.handle)


export { rentalRoutes }