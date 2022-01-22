import { Request, Response } from "express"
import { container } from "tsyringe"
import { CarsUseCase } from "./CarsUseCase"


class CarsController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { name, description, daily_rate, license_plate, brand, category_id, especifications, id } = req.body
        
        const carsUseCase = container.resolve(CarsUseCase)

        const car = await carsUseCase.execute({ name, description, daily_rate, license_plate, brand, category_id, especifications, id })

        return res.send(car)

    }

}



export { CarsController }