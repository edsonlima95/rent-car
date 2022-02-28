
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "../services/rental/DevolutionRentalUseCase";
import { ListUserRentalsUseCase } from "../services/rental/ListUserRentalsUseCase";
import { RentalCarsUseCase } from "../services/rental/RentalCarsUseCase";


class RentalController {

    async rent(req: Request, res: Response): Promise<Response> {

        const {car_id, expected_return_date} = req.body

        const {user_id} =  req.user

        const rentalCarsUseCase = container.resolve(RentalCarsUseCase)
        
        const rental = await rentalCarsUseCase.execute({ car_id,user_id, expected_return_date })

        return res.json(rental)

    }

    async devolution(req: Request, res: Response):Promise<Response>{

        const {id} = req.params

        const rental_id = parseInt(id)

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

        const rental = await devolutionRentalUseCase.execute(rental_id)

        return res.json(rental)
    }

    async listRentals(req: Request, res: Response): Promise<Response> {

        const { user_id } = req.user

        const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase)

        const rentals = await listUserRentalsUseCase.execute(user_id)

        return res.json(rentals)


    }

}

export { RentalController }