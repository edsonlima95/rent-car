import { RentalCarsController } from "@modules/rental/useCases/createRental/RentalCarsController";
import { DevolutionRentalController } from "@modules/rental/useCases/devolutionRental/DevolutionRentalController";
import { ListUserRentalsController } from "@modules/rental/useCases/listRentalUser/ListUserRentalsController";
import { Router } from "express";
import { authenticateMiddleware } from "middlewares/authentication";

const rentalRoutes = Router()


const rentalCarsController = new RentalCarsController()
const devolutionController = new DevolutionRentalController()
const listUserRentalsController = new ListUserRentalsController()

rentalRoutes.post("/rental", authenticateMiddleware, rentalCarsController.handle)

rentalRoutes.post("/devolution/:id",devolutionController.handle)

rentalRoutes.post("/rentals-user", authenticateMiddleware ,listUserRentalsController.handle)


export { rentalRoutes }