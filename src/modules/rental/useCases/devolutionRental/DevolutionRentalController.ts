import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";


class DevolutionRentalController {

    async handle(req: Request, res: Response):Promise<Response>{

        const {id} = req.params

        const rental_id = id as unknown as number

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

        const rental = await devolutionRentalUseCase.execute(rental_id)

        return res.json(rental)
    }

}

export {DevolutionRentalController}