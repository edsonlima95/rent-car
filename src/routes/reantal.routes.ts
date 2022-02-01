import { RentalController } from "@modules/rental/controllers/RentalCarsController";
import { Router } from "express";
import { authenticateMiddleware } from "middlewares/authentication";

const rentalRoutes = Router()


const rentalController = new RentalController()

rentalRoutes.post("/rental", authenticateMiddleware, rentalController.rent)

rentalRoutes.post("/devolution/:id",authenticateMiddleware,rentalController.devolution)

rentalRoutes.post("/rentals-user", authenticateMiddleware ,rentalController.listRentals)


export { rentalRoutes }