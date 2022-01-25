
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RentalCarsUseCase } from "./RentalCarsUseCase";


class RentalCarsController {

    async handle(req: Request, res: Response): Promise<Response> {

        const {car_id, expected_return_date} = req.body

        const {user_id} =  req.user

        const rentalCarsUseCase = container.resolve(RentalCarsUseCase)
        
        const rental = await rentalCarsUseCase.execute({ car_id,user_id, expected_return_date })

        return res.json(rental)

    }

}

export { RentalCarsController }